<?php
// National Qualifier (NQ) 2026 — payment response handler.
// Table `nq2026`; SHARED stabling ledger via InventoryManagerCamp (source 'nq').
// No post-entry surcharge — fees are flat.

set_time_limit(120);
ignore_user_abort(true);
ini_set('max_execution_time', 120);
ini_set('default_socket_timeout', 30);

include('crypto.php');
require("dbconnect.php");
require("mailer.php");
require("email_templates.php");
require_once("InventoryManagerCamp.php");
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
    $checkResult = $conn->query("SELECT order_status FROM nq2026 WHERE id='".$conn->real_escape_string($order_id)."'");
    $currentData = ($checkResult && $checkResult->num_rows > 0) ? $checkResult->fetch_assoc() : null;
    $isDuplicateHit = ($currentData && $currentData['order_status'] === $order_status);

    $updatesql = "UPDATE nq2026 SET tracking_id='".$conn->real_escape_string($tracking_id)."',
                    bank_ref_no='".$conn->real_escape_string($bank_ref_no)."',
                    payment_mode='".$conn->real_escape_string($payment_mode)."',
                    status_message='".$conn->real_escape_string($status_message)."',
                    order_status='".$conn->real_escape_string($order_status)."',
                    trans_date='".$conn->real_escape_string($trans_date)."'
                    WHERE id='".$conn->real_escape_string($order_id)."'";

    $conn->query($updatesql);

    $userResult = $conn->query("SELECT name, email, selectedEvents FROM nq2026 WHERE id='".$conn->real_escape_string($order_id)."'");
    $userData = ($userResult && $userResult->num_rows > 0) ? $userResult->fetch_assoc() : null;

    if ($userData && !$isDuplicateHit) {
        if ($order_status === "Success" || $order_status === "Successful") {
            $result = $conn->query("SELECT name, parentName, dob, address, mobile, email, emergencyContact, emergencyRelation, clubName, efiRiderId, selectedEvents, eventHorses, eventHorseEfi, stablingType, stablingCount, stablingFrom, stablingTo, ageProofPath FROM nq2026 WHERE id='".$conn->real_escape_string($order_id)."'");

            if ($result && $row = $result->fetch_assoc()) {
                if ($row['stablingType'] !== 'NONE'
                    && (int)$row['stablingCount'] > 0
                    && !empty($row['stablingFrom'])
                    && !empty($row['stablingTo'])) {
                    $im = new InventoryManagerCamp();
                    $im->deductInventory(
                        $order_id,
                        $row['name'],
                        (int)$row['stablingCount'],
                        $row['stablingFrom'],
                        $row['stablingTo'],
                        'nq'
                    );
                }

                $redirect_url_early = '/events/nq-2026/success?status=' . urlencode($order_status) .
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

                $webhook_url = "https://script.google.com/macros/s/AKfycbzw65SAMdxZpVqp5TcIKvcLIZVdDDcybqkMAUnjM7-wSqvjmo0Pw2Lgz7nC_2ttDN33/exec";
                $ageProofLink = !empty($row['ageProofPath']) ? "https://hprc.in/payment/view_proof.php?file=" . urlencode(basename($row['ageProofPath'])) : "";

                $eventMapping = [
                    1 => "Dressage - Children II", 2 => "Dressage - Children I", 3 => "Dressage - Junior", 4 => "Dressage - Young Rider",
                    5 => "SJ Children II (0.80m)", 6 => "SJ Children I (0.90m)", 7 => "SJ Junior (1.05m)", 8 => "SJ Young Rider (1.15m)",
                    9 => "Practice Round 0.80-0.90m"
                ];

                $selectedIds = json_decode($row['selectedEvents'], true) ?: [];
                $horseData = json_decode($row['eventHorses'], true) ?: [];
                $efiData = json_decode($row['eventHorseEfi'], true) ?: [];
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
                    send_hprc_email($userData['email'], $userData['name'], "Registration Confirmed - National Qualifier (NQ) 2026", $htmlBody, "", "");
                }

                $adminData = $row;
                $adminData['clubName'] = $row['clubName'] . " | EFI Rider ID: " . $row['efiRiderId'];
                $adminData['events'] = $eventList;
                $adminData['eventHorses'] = $horseList;
                $adminData['amount'] = $mer_amount;
                $adminHtml = get_admin_notification_body($adminData, $order_id, $tracking_id);

                $attachment = !empty($row['ageProofPath']) ? __DIR__ . '/' . $row['ageProofPath'] : null;
                send_admin_notification("NEW REGISTRATION (NQ): {$userData['name']} (#{$order_id})", $adminHtml, $attachment);

                // Itemized fees (flat — no post-entry surcharge for NQ).
                $baseFees = [
                    1 => 3000, 2 => 3000, 3 => 3000, 4 => 3000, // Dressage
                    5 => 3000, 6 => 3000, 7 => 3000, 8 => 3000, // Show Jumping
                    9 => 1000 // Practice
                ];

                $eventTotal = 0;
                foreach ($selectedIds as $id) {
                    $base = isset($baseFees[$id]) ? $baseFees[$id] : 3000;
                    $count = isset($horseData[$id]) ? (is_array($horseData[$id]) ? count($horseData[$id]) : 1) : 1;
                    $eventTotal += $base * $count;
                }

                $stablingBalance = (float)$mer_amount - $eventTotal;
                $isFirstRow = true;

                foreach ($selectedIds as $id) {
                    $category = isset($eventMapping[$id]) ? $eventMapping[$id] : "Event #$id";
                    $horses = isset($horseData[$id]) ? (is_array($horseData[$id]) ? $horseData[$id] : [$horseData[$id]]) : ["N/A"];
                    $regs = isset($efiData[$id]) ? (is_array($efiData[$id]) ? $efiData[$id] : [$efiData[$id]]) : [];
                    $base = isset($baseFees[$id]) ? $baseFees[$id] : 3000;

                    foreach ($horses as $jumpIdx => $horse) {
                        $displayAmount = $base;
                        if ($isFirstRow) {
                            $displayAmount += $stablingBalance;
                            $isFirstRow = false;
                        }

                        $webhookData = array(
                            "edition" => "HPRC NQ 2026",
                            "name" => $row['name'],
                            "dob" => $row['dob'],
                            "parentName" => $row['parentName'],
                            "address" => $row['address'], "mobile" => $row['mobile'], "email" => $row['email'],
                            "emergencyContact" => $row['emergencyContact'], "emergencyRelation" => $row['emergencyRelation'],
                            "clubName" => $row['clubName'], "efiRiderId" => $row['efiRiderId'],
                            "events" => $category,
                            "eventHorses" => $horse,
                            "horseEfiReg" => isset($regs[$jumpIdx]) ? $regs[$jumpIdx] : "",
                            "stablingType" => $row['stablingType'],
                            "stablingCount" => $row['stablingCount'], "stablingFrom" => $row['stablingFrom'],
                            "stablingTo" => $row['stablingTo'], "ageProofLink" => $ageProofLink,
                            "amount" => $displayAmount, "tracking_id" => $tracking_id . " (#$id)"
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
                send_hprc_email($userData['email'], $userData['name'], "Payment Notification - National Qualifier (NQ) 2026", $htmlBody);
            }

            $adminHtml = get_admin_failed_notification_body($userData['name'], $order_id, $status_message, $userData['email'] ?: "No Email Provided");
            send_admin_notification("PAYMENT FAILED (NQ): {$userData['name']} (#{$order_id})", $adminHtml);
        }
    }

}

$redirect_url = '/events/nq-2026/success?status=' . urlencode($order_status) .
                '&order_id=' . urlencode($order_id) .
                '&amount=' . urlencode($mer_amount) .
                '&tracking_id=' . urlencode($tracking_id) .
                '&status_message=' . urlencode($status_message);

header("Location: " . $redirect_url);
exit();
?>
