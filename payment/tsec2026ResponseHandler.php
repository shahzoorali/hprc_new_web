<?php
// IInd Telangana State Equestrian Championship 2026 — payment response handler.
// Table `tsec2026`, InventoryManagerOctCamp (source 'tsec'), Championship fee/
// deadline rules, and /events/telangana-state-championship-2026 redirects.

set_time_limit(120);
ignore_user_abort(true);
ini_set('max_execution_time', 120);
ini_set('default_socket_timeout', 30);

include('crypto.php');
require("dbconnect.php");
require("mailer.php");
require("email_templates.php");
require_once("InventoryManagerOctCamp.php");
error_reporting(0);

$workingKey='00A39923BC821061266C29348FF5A3F0'; //HDFC CCAvenue
$encResponse=$_POST["encResp"];
$rcvdString=decrypt($encResponse,$workingKey);
$order_status="";
$decryptValues=explode('&', $rcvdString);
$dataSize=sizeof($decryptValues);

$tracking_id = '';
$bank_ref_no = '';
$payment_mode = '';
$status_message = '';
$trans_date = '';
$order_id = '';
$mer_amount = '';

for($i = 0; $i < $dataSize; $i++) {
    $information=explode('=',$decryptValues[$i]);
    $lable = $information[0];
    if($lable =='order_id') $order_id = $information[1];
    else if($lable =='tracking_id') $tracking_id = $information[1];
    else if($lable =='mer_amount') $mer_amount = $information[1];
    else if($lable =='trans_date') $trans_date = $information[1];
    else if($lable =='bank_ref_no') $bank_ref_no = $information[1];
    else if($lable =='payment_mode') $payment_mode = $information[1];
    else if($lable =='status_message') $status_message = $information[1];
    else if($lable =='order_status') $order_status = $information[1];
}

if ($order_id) {
    $checkResult = $conn->query("SELECT order_status FROM tsec2026 WHERE id='".$conn->real_escape_string($order_id)."'");
    $currentData = ($checkResult && $checkResult->num_rows > 0) ? $checkResult->fetch_assoc() : null;
    $isDuplicateHit = ($currentData && $currentData['order_status'] === $order_status);

    $updatesql = "UPDATE tsec2026 SET tracking_id='".$conn->real_escape_string($tracking_id)."',
                    bank_ref_no='".$conn->real_escape_string($bank_ref_no)."',
                    payment_mode='".$conn->real_escape_string($payment_mode)."',
                    status_message='".$conn->real_escape_string($status_message)."',
                    order_status='".$conn->real_escape_string($order_status)."',
                    trans_date='".$conn->real_escape_string($trans_date)."'
                    WHERE id='".$conn->real_escape_string($order_id)."'";

    $conn->query($updatesql);

    $userResult = $conn->query("SELECT name, email, selectedEvents FROM tsec2026 WHERE id='".$conn->real_escape_string($order_id)."'");
    $userData = ($userResult && $userResult->num_rows > 0) ? $userResult->fetch_assoc() : null;

    if ($userData && !$isDuplicateHit) {
        if ($order_status === "Success" || $order_status === "Successful") {
            $result = $conn->query("SELECT name, parentName, dob, address, mobile, email, emergencyContact, emergencyRelation, clubName, selectedEvents, eventHorses, horseBreeds, stablingType, stablingCount, stablingFrom, stablingTo, ageProofPath FROM tsec2026 WHERE id='".$conn->real_escape_string($order_id)."'");

            if ($result && $row = $result->fetch_assoc()) {
                if ($row['stablingType'] !== 'NONE'
                    && (int)$row['stablingCount'] > 0
                    && !empty($row['stablingFrom'])
                    && !empty($row['stablingTo'])) {
                    $im = new InventoryManagerOctCamp();
                    $im->deductInventory(
                        $order_id,
                        $row['name'],
                        (int)$row['stablingCount'],
                        $row['stablingFrom'],
                        $row['stablingTo'],
                        'tsec'
                    );
                }

                $redirect_url_early = '/events/telangana-state-championship-2026/success?status=' . urlencode($order_status) .
                                      '&order_id=' . urlencode($order_id) .
                                      '&amount=' . urlencode($mer_amount) .
                                      '&tracking_id=' . urlencode($tracking_id) .
                                      '&status_message=' . urlencode($status_message);
                header("Location: " . $redirect_url_early);
                header("Content-Length: 0");
                header("Connection: close");
                if (function_exists('ob_get_level') && ob_get_level() > 0) {
                    @ob_end_flush();
                }
                @flush();
                if (function_exists('fastcgi_finish_request')) {
                    fastcgi_finish_request();
                }

                // Reuses the ecaug2026 spreadsheet's existing Apps Script deployment — the sheet
                // was cleared and repurposed for this event, so the /exec URL didn't change.
                $webhook_url = "https://script.google.com/macros/s/AKfycbynK3pTkRLw4Oqp04kAlX0dh0C7_ed6G8P8f3LNrdbpHMTpmI-Q64XyuBDNKMsnuJeN/exec";
                $ageProofLink = !empty($row['ageProofPath']) ? "https://hprc.in/payment/view_proof.php?file=" . urlencode(basename($row['ageProofPath'])) : "";

                $eventMapping = [
                    1 => "Hacks - 12y & Under", 2 => "Hacks - 13-16y",
                    3 => "Dressage - Children II", 4 => "Dressage - Children I", 5 => "Dressage - Juniors",
                    6 => "SJ 40-45cm - Under 12", 7 => "SJ 40-45cm - Open",
                    8 => "SJ 60cm - Under 14", 9 => "SJ 60cm - Open",
                    10 => "SJ 80-90cm - Children II", 11 => "SJ 80-90cm - Open",
                    12 => "SJ 100-105cm - Children I", 13 => "SJ 100-105cm - Open",
                    14 => "SJ 110-115cm - Juniors", 15 => "SJ 110-115cm - Open",
                    16 => "Practice Round 80-90cm"
                ];

                $selectedIds = json_decode($row['selectedEvents'], true) ?: [];
                $horseData = json_decode($row['eventHorses'], true) ?: [];
                $breedMap = json_decode($row['horseBreeds'], true) ?: [];
                $readableEvents = []; $readableHorses = [];

                foreach ($selectedIds as $id) {
                    $category = isset($eventMapping[$id]) ? $eventMapping[$id] : "Event #$id";
                    $readableEvents[] = $category;
                    $horses = isset($horseData[$id]) ? (is_array($horseData[$id]) ? $horseData[$id] : [$horseData[$id]]) : ["N/A"];
                    $readableHorses[] = $category . ": (" . implode(", ", $horses) . ")";
                }

                $eventList = implode(" | ", $readableEvents);
                $horseList = implode(" | ", $readableHorses);

                if (!empty($userData['email'])) {
                    $details = ["events" => $eventList];
                    $htmlBody = get_success_email_body($userData['name'], $order_id, $mer_amount, $tracking_id, $details);
                    $etiquettePath = __DIR__ . '/../public/events/tsec2026/IInd_Telangana_State_Equestrian_Championship_Etiquette_Conduct_Guidelines.pdf';
                    send_hprc_email($userData['email'], $userData['name'], "Registration Confirmed - IInd Telangana State Equestrian Championship", $htmlBody, "", $etiquettePath);
                }

                $adminData = $row;
                $adminData['events'] = $eventList;
                $adminData['eventHorses'] = $horseList;
                $adminData['amount'] = $mer_amount;
                $adminHtml = get_admin_notification_body($adminData, $order_id, $tracking_id);

                $attachment = !empty($row['ageProofPath']) ? __DIR__ . '/' . $row['ageProofPath'] : null;
                send_admin_notification("NEW REGISTRATION (TSEC): {$userData['name']} (#{$order_id})", $adminHtml, $attachment);

                // Itemized fees. Base fees per event ID; Hacks/Dressage/SJ carry a
                // +500 post-entry surcharge, the Practice Round (id 16) carries none.
                $baseFees = [
                    1 => 1500, 2 => 1500, // Hacks
                    3 => 2000, 4 => 2000, 5 => 2000, // Dressage
                    6 => 2000, 7 => 2000, 8 => 2000, 9 => 2000, 10 => 2000, 11 => 2000, // SJ
                    12 => 2000, 13 => 2000, 14 => 2000, 15 => 2000, // SJ
                    16 => 1000 // Practice
                ];

                $deadline = strtotime('2026-10-15 18:00:00');
                $currentTime = !empty($trans_date) ? strtotime(str_replace('/', '-', $trans_date)) : time();
                $postEntry = ($currentTime > $deadline);

                $eventTotal = 0;
                foreach ($selectedIds as $id) {
                    $base = isset($baseFees[$id]) ? $baseFees[$id] : 2000;
                    $surcharge = ($postEntry && $id != 16) ? 500 : 0;
                    $count = isset($horseData[$id]) ? (is_array($horseData[$id]) ? count($horseData[$id]) : 1) : 1;
                    $eventTotal += ($base + $surcharge) * $count;
                }

                $stablingBalance = (float)$mer_amount - $eventTotal;
                $isFirstRow = true;

                foreach ($selectedIds as $id) {
                    $category = isset($eventMapping[$id]) ? $eventMapping[$id] : "Event #$id";
                    $horses = isset($horseData[$id]) ? (is_array($horseData[$id]) ? $horseData[$id] : [$horseData[$id]]) : ["N/A"];
                    $base = isset($baseFees[$id]) ? $baseFees[$id] : 2000;
                    $surcharge = ($postEntry && $id != 16) ? 500 : 0;
                    $perJumpFee = $base + $surcharge;

                    foreach ($horses as $jumpIdx => $horse) {
                        $displayAmount = $perJumpFee;
                        if ($isFirstRow) {
                            $displayAmount += $stablingBalance;
                            $isFirstRow = false;
                        }

                        $jumpNumber = $jumpIdx + 1;
                        $jumpLabel = (count($horses) > 1) ? " - Jump $jumpNumber" : "";

                        $webhookData = array(
                            "edition" => "IInd Telangana State Equestrian Championship",
                            "name" => $row['name'],
                            "dob" => $row['dob'],
                            "parentName" => $row['parentName'],
                            "address" => $row['address'], "mobile" => $row['mobile'], "email" => $row['email'],
                            "emergencyContact" => $row['emergencyContact'], "emergencyRelation" => $row['emergencyRelation'],
                            "clubName" => $row['clubName'],
                            "events" => $category . $jumpLabel,
                            "eventHorses" => $horse,
                            "breed" => isset($breedMap[$horse]) ? $breedMap[$horse] : "",
                            "stablingType" => $row['stablingType'],
                            "stablingCount" => $row['stablingCount'], "stablingFrom" => $row['stablingFrom'],
                            "stablingTo" => $row['stablingTo'], "ageProofLink" => $ageProofLink,
                            "amount" => $displayAmount, "tracking_id" => $tracking_id . " (#$id-J$jumpNumber)"
                        );

                        $ch = curl_init($webhook_url);
                        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($webhookData));
                        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
                        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
                        curl_setopt($ch, CURLOPT_TIMEOUT, 8);
                        curl_setopt($ch, CURLOPT_NOSIGNAL, 1);
                        curl_exec($ch);
                        curl_close($ch);
                    }
                }

            }
        } else {
            if (!empty($userData['email'])) {
                $htmlBody = get_failed_email_body($userData['name'], $order_id, $status_message);
                send_hprc_email($userData['email'], $userData['name'], "Payment Notification - IInd Telangana State Equestrian Championship", $htmlBody);
            }

            $adminHtml = get_admin_failed_notification_body($userData['name'], $order_id, $status_message, $userData['email'] ?: "No Email Provided");
            send_admin_notification("PAYMENT FAILED (TSEC): {$userData['name']} (#{$order_id})", $adminHtml);
        }
    }

}

$redirect_url = '/events/telangana-state-championship-2026/success?status=' . urlencode($order_status) .
                '&order_id=' . urlencode($order_id) .
                '&amount=' . urlencode($mer_amount) .
                '&tracking_id=' . urlencode($tracking_id) .
                '&status_message=' . urlencode($status_message);

header("Location: " . $redirect_url);
exit();
?>
