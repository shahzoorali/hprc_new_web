<?php
include('crypto.php');
require("dbconnect.php");
require("mailer.php");
require("email_templates.php");
error_reporting(0);

$workingKey='D21542B21357F51DA6027649B1E12DFE';		
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
    // 1. Update the local MySQL EC2026 Database
    $updatesql = "UPDATE ec2026 SET tracking_id='".$conn->real_escape_string($tracking_id)."',
                    bank_ref_no='".$conn->real_escape_string($bank_ref_no)."',
                    payment_mode='".$conn->real_escape_string($payment_mode)."',
                    status_message='".$conn->real_escape_string($status_message)."',
                    order_status='".$conn->real_escape_string($order_status)."',
                    trans_date='".$conn->real_escape_string($trans_date)."'
                    WHERE id='".$conn->real_escape_string($order_id)."'";

    $conn->query($updatesql);

    // 2. Send Email Alerts via SES
    $userResult = $conn->query("SELECT name, email, selectedEvents FROM ec2026 WHERE id='".$conn->real_escape_string($order_id)."'");
    $userData = ($userResult && $userResult->num_rows > 0) ? $userResult->fetch_assoc() : null;

    if ($userData && !empty($userData['email'])) {
        if ($order_status === "Success" || $order_status === "Successful") {
            // 2a. Fetch all details for Webhook & Detailed Email
            $result = $conn->query("SELECT name, parentName, dob, address, mobile, email, emergencyContact, emergencyRelation, clubName, selectedEvents, eventHorses, stablingType, stablingCount, stablingFrom, stablingTo, ageProofPath FROM ec2026 WHERE id='".$conn->real_escape_string($order_id)."'");
            
            if ($result && $row = $result->fetch_assoc()) {
                $webhook_url = "https://script.google.com/macros/s/AKfycbzw65SAMdxZpVqp5TcIKvcLIZVdDDcybqkMAUnjM7-wSqvjmo0Pw2Lgz7nC_2ttDN33/exec";
                $ageProofLink = !empty($row['ageProofPath']) ? "https://hprc.in/payment/view_proof.php?file=" . urlencode(basename($row['ageProofPath'])) : "";
                
                $eventMapping = [
                    1 => "Hacks - 12y & Under", 2 => "Hacks - 13-16y",
                    3 => "Dressage - Children II", 4 => "Dressage - Children I", 5 => "Dressage - Juniors",
                    6 => "SJ 40cm - Under 12", 8 => "SJ 40cm - Open",
                    9 => "SJ 60cm - Under 14", 11 => "SJ 60cm - Open",
                    12 => "SJ 80cm - Children II", 13 => "SJ 80cm - Open",
                    14 => "SJ 90cm - Children I", 15 => "SJ 90cm - Open",
                    16 => "SJ 105cm - Juniors", 17 => "SJ 105cm - Open",
                    20 => "SJ 105-110cm Two-Phase",
                    18 => "Top Score - 14y & Below", 19 => "Top Score - Open"
                ];

                $selectedIds = json_decode($row['selectedEvents'], true) ?: [];
                $horseData = json_decode($row['eventHorses'], true) ?: [];
                $readableEvents = []; $readableHorses = [];
                
                foreach ($selectedIds as $id) {
                    $category = isset($eventMapping[$id]) ? $eventMapping[$id] : "Event #$id";
                    $readableEvents[] = $category;
                    $horses = isset($horseData[$id]) ? (is_array($horseData[$id]) ? $horseData[$id] : [$horseData[$id]]) : ["N/A"];
                    $readableHorses[] = $category . ": (" . implode(", ", $horses) . ")";
                }

                // 2b. Send Success Email via SES (BEFORE Webhook to avoid timeouts)
                $details = ["events" => implode(" | ", $readableEvents)];
                $htmlBody = get_success_email_body($userData['name'], $order_id, $mer_amount, $tracking_id, $details);
                send_hprc_email($userData['email'], $userData['name'], "Registration Confirmed - HPRC Equestrian Challenge 2026", $htmlBody);

                // 2c. Send Detailed Admin Notification
                $adminData = $row; 
                $adminData['events'] = implode(" | ", $readableEvents);
                $adminData['eventHorses'] = implode(" | ", $readableHorses);
                $adminData['amount'] = $mer_amount;
                $adminHtml = get_admin_notification_body($adminData, $order_id, $tracking_id);
                
                // Attach Age Proof if exists
                $attachment = !empty($row['ageProofPath']) ? __DIR__ . '/' . $row['ageProofPath'] : null;
                send_admin_notification("NEW REGISTRATION: {$userData['name']} (#{$order_id})", $adminHtml, $attachment);

                // 2d. Transmit success data to Google Sheets (Webhook last as it can be slow)
                $webhookData = array(
                    "name" => $row['name'], "parentName" => $row['parentName'], "dob" => $row['dob'],
                    "address" => $row['address'], "mobile" => $row['mobile'], "email" => $row['email'],
                    "emergencyContact" => $row['emergencyContact'], "emergencyRelation" => $row['emergencyRelation'],
                    "clubName" => $row['clubName'], "events" => implode(" | ", $readableEvents),
                    "eventHorses" => implode(" | ", $readableHorses), "stablingType" => $row['stablingType'],
                    "stablingCount" => $row['stablingCount'], "stablingFrom" => $row['stablingFrom'],
                    "stablingTo" => $row['stablingTo'], "ageProofLink" => $ageProofLink,
                    "amount" => $mer_amount, "tracking_id" => $tracking_id
                );
                
                $ch = curl_init($webhook_url);
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($webhookData));
                curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
                curl_exec($ch); curl_close($ch);
            }
        } else {
            // 2c. Send Failure Email via SES
            $htmlBody = get_failed_email_body($userData['name'], $order_id, $status_message);
            send_hprc_email($userData['email'], $userData['name'], "Payment Notification - HPRC Equestrian Challenge 2026", $htmlBody);

            // 2d. Send Admin Failure Alert
            $adminHtml = get_admin_failed_notification_body($userData['name'], $order_id, $status_message, $userData['email']);
            send_admin_notification("PAYMENT FAILED: {$userData['name']} (#{$order_id})", $adminHtml);
        }
    }
}

// 3. Redirect back to React/Next.js UI success screen
$redirect_url = '/events/equestrian-challenge-2026/success?status=' . urlencode($order_status) . 
                '&order_id=' . urlencode($order_id) . 
                '&amount=' . urlencode($mer_amount) . 
                '&tracking_id=' . urlencode($tracking_id) .
                '&status_message=' . urlencode($status_message);

header("Location: " . $redirect_url);
exit();
?>
