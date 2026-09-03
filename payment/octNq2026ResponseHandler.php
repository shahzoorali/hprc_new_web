<?php
// National Qualifier (NQ) October 2026 — payment response handler.
// Table `nq_oct_2026`; Isolated stabling ledger via InventoryManagerOctCamp (source 'oct_nq').

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
    $checkResult = $conn->query("SELECT order_status FROM nq_oct_2026 WHERE id='".$conn->real_escape_string($order_id)."'");
    $currentData = ($checkResult && $checkResult->num_rows > 0) ? $checkResult->fetch_assoc() : null;
    $isDuplicateHit = ($currentData && $currentData['order_status'] === $order_status);

    $updatesql = "UPDATE nq_oct_2026 SET tracking_id='".$conn->real_escape_string($tracking_id)."',
                    bank_ref_no='".$conn->real_escape_string($bank_ref_no)."',
                    payment_mode='".$conn->real_escape_string($payment_mode)."',
                    status_message='".$conn->real_escape_string($status_message)."',
                    order_status='".$conn->real_escape_string($order_status)."',
                    trans_date='".$conn->real_escape_string($trans_date)."'
                    WHERE id='".$conn->real_escape_string($order_id)."'";

    $conn->query($updatesql);

    $userResult = $conn->query("SELECT name, email, selectedEvents FROM nq_oct_2026 WHERE id='".$conn->real_escape_string($order_id)."'");
    $userData = ($userResult && $userResult->num_rows > 0) ? $userResult->fetch_assoc() : null;

    if ($userData && !$isDuplicateHit) {
        if ($order_status === "Success" || $order_status === "Successful") {
            $result = $conn->query("SELECT name, parentName, dob, address, mobile, email, emergencyContact, emergencyRelation, clubName, efiRiderId, selectedEvents, eventHorses, eventHorseEfi, stablingType, stablingCount, stablingFrom, stablingTo, ageProofPath, ageProofPath2 FROM nq_oct_2026 WHERE id='".$conn->real_escape_string($order_id)."'");

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
                        'oct_nq'
                    );
                }

                $redirect_url_early = '/events/oct-nq-2026/success?status=' . urlencode($order_status) .
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

                $webhook_url = "https://script.google.com/macros/s/AKfycbx7Mdp6_XTnil1Kny4A7c1O9BJDbXBqoVMDcf-G2sKVQpbkTKTKlTowpPi3N9z_zVjX/exec";
                $ageProofLink = !empty($row['ageProofPath']) ? "https://hprc.in/payment/view_proof.php?file=" . urlencode(basename($row['ageProofPath'])) : "";
                $ageProofLink2 = !empty($row['ageProofPath2']) ? "https://hprc.in/payment/view_proof.php?file=" . urlencode(basename($row['ageProofPath2'])) : "";

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

                $emailData = [
                    'name' => $row['name'],
                    'parentName' => $row['parentName'],
                    'dob' => $row['dob'],
                    'email' => $row['email'],
                    'mobile' => $row['mobile'],
                    'clubName' => $row['clubName'],
                    'emergencyContact' => $row['emergencyContact'],
                    'emergencyRelation' => $row['emergencyRelation'],
                    'events' => implode(" | ", $readableEvents),
                    'eventHorses' => implode("<br>", $readableHorses),
                    'stablingType' => $row['stablingType'],
                    'stablingCount' => $row['stablingCount'],
                    'stablingFrom' => $row['stablingFrom'],
                    'stablingTo' => $row['stablingTo'],
                    'ageProofPath' => $row['ageProofPath'],
                    'ageProofPath2' => $row['ageProofPath2'],
                    'amount' => $mer_amount,
                    'efiRiderId' => $row['efiRiderId'],
                    'isIndian' => $row['isIndian']
                ];

                $userSubject = "Entry Confirmation - National Qualifier (NQ) October 2026 - Order #$order_id";
                $userBody = get_success_email_body($row['name'], $order_id, $mer_amount, $tracking_id, $emailData);
                $attachments = [];
                $etiquettePath = __DIR__ . '/../public/events/oct-nq2026/HPRC_National_Qualifier_2026_Etiquette_Conduct_Guidelines.pdf';
                if (file_exists($etiquettePath)) {
                    $attachments[] = [
                        'path' => $etiquettePath,
                        'name' => 'HPRC_National_Qualifier_2026_Etiquette_Conduct_Guidelines.pdf'
                    ];
                }
                send_hprc_email($row['email'], $row['name'], $userSubject, $userBody, $attachments);

                $adminSubject = "New Paid Entry: National Qualifier October 2026 - {$row['name']} (Order #$order_id)";
                $adminBody = get_admin_notification_body($emailData, $order_id, $tracking_id);
                send_hprc_email('info@hprc.co.in', 'HPRC Admin', $adminSubject, $adminBody);

                $fullData = [];
                for($i = 0; $i < $dataSize; $i++) {
                    $information=explode('=',$decryptValues[$i]);
                    $fullData[$information[0]] = isset($information[1]) ? $information[1] : '';
                }
                $fullData['merchant_param1'] = $row['clubName'];
                $fullData['merchant_param2'] = $row['dob'];
                $fullData['merchant_param3'] = implode(", ", $readableEvents);
                $fullData['merchant_param4'] = implode(" | ", $readableHorses);
                $fullData['merchant_param5'] = "Stables: {$row['stablingType']} ({$row['stablingCount']}) from {$row['stablingFrom']} to {$row['stablingTo']}";
                $fullData['delivery_name']   = $row['parentName'];
                $fullData['billing_notes']   = "Emergency: {$row['emergencyContact']} ({$row['emergencyRelation']})";
                $fullData['age_proof_link']  = $ageProofLink;
                $fullData['age_proof_link2'] = $ageProofLink2;
                $fullData['efi_rider_id']    = $row['efiRiderId'];
                $fullData['is_indian']       = $row['isIndian'];
                $fullData['event_horse_efi'] = $row['eventHorseEfi'];
                $fullData['edition']         = 'HPRC NQ October 2026';

                $ch = curl_init($webhook_url);
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fullData));
                curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
                curl_setopt($ch, CURLOPT_TIMEOUT, 10);
                $webhook_response = curl_exec($ch);
                curl_close($ch);
            }
        } else {
            $redirect_url_failed = '/events/oct-nq-2026/success?status=' . urlencode($order_status) .
                                   '&order_id=' . urlencode($order_id) .
                                   '&amount=' . urlencode($mer_amount) .
                                   '&tracking_id=' . urlencode($tracking_id) .
                                   '&status_message=' . urlencode($status_message);
            header("Location: " . $redirect_url_failed);
            header("Content-Length: 0");
            header("Connection: close");
            if (function_exists('ob_get_level') && ob_get_level() > 0) {
                @ob_end_flush();
            }
            @flush();
            if (function_exists('fastcgi_finish_request')) {
                fastcgi_finish_request();
            }

            $userSubject = "Action Required: Payment " . $order_status . " - National Qualifier October 2026 - Order #" . $order_id;
            $userBody = get_failed_email_body($userData['name'], $order_id, $status_message);
            send_hprc_email($userData['email'], $userData['name'], $userSubject, $userBody);

            $adminSubject = "Payment Alert: " . $order_status . " - National Qualifier October 2026 - " . $userData['name'] . " (Order #" . $order_id . ")";
            $adminBody = get_admin_failed_notification_body($userData['name'], $order_id, $status_message, $userData['email']);
            send_hprc_email('info@hprc.co.in', 'HPRC Admin', $adminSubject, $adminBody);
        }
    }
} else {
    header("Location: /events/oct-nq-2026/success?status=Aborted");
    exit;
}
?>
