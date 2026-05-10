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
    // 0. Check if order has already been processed with this exact status (to prevent duplicate webhooks/emails on refresh)
    $checkResult = $conn->query("SELECT order_status FROM ec2026 WHERE id='".$conn->real_escape_string($order_id)."'");
    $currentData = ($checkResult && $checkResult->num_rows > 0) ? $checkResult->fetch_assoc() : null;
    $isDuplicateHit = ($currentData && $currentData['order_status'] === $order_status);

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

    // 2. Process Notifications & External Sync
    if ($userData && !$isDuplicateHit) {
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
                    20 => "Table C 105-110cm",
                    18 => "Top Score - 14y & Below", 19 => "Top Score - Open",
                    21 => "Practice Round 50cm", 22 => "Practice Round 90cm"
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

                $eventList = implode(" | ", $readableEvents);
                $horseList = implode(" | ", $readableHorses);

                // 2b. Send Rider Confirmation Email (Only if email exists)
                if (!empty($userData['email'])) {
                    $details = ["events" => $eventList];
                    $htmlBody = get_success_email_body($userData['name'], $order_id, $mer_amount, $tracking_id, $details);
                    $etiquettePath = __DIR__ . '/../public/events/ec2026/HPRC_Equestrian_Challenge_2026_Etiquette_Conduct_Guidelines.pdf';
                    send_hprc_email($userData['email'], $userData['name'], "Registration Confirmed - HPRC Equestrian Challenge 2026", $htmlBody, "", $etiquettePath);
                }

                // 2c. Send Detailed Admin Notification (ALWAYS)
                $adminData = $row; 
                $adminData['events'] = $eventList;
                $adminData['eventHorses'] = $horseList;
                $adminData['amount'] = $mer_amount;
                $adminHtml = get_admin_notification_body($adminData, $order_id, $tracking_id);
                
                // Attach Age Proof if exists
                $attachment = !empty($row['ageProofPath']) ? __DIR__ . '/' . $row['ageProofPath'] : null;
                send_admin_notification("NEW REGISTRATION: {$userData['name']} (#{$order_id})", $adminHtml, $attachment);

                // 2d. Transmit success data to Google Sheets (One row per event)
                // Calculate itemized fees to bundle stabling into the first row
                $baseFees = [
                    1 => 1500, 2 => 1500, // Hacks
                    3 => 2000, 4 => 2000, 5 => 2000, // Dressage
                    6 => 2000, 8 => 2000, 9 => 2000, 11 => 2000, 12 => 2000, // SJ
                    13 => 2000, 14 => 2000, 15 => 2000, 16 => 2000, 17 => 2000, 20 => 2000, // SJ
                    18 => 2000, 19 => 2000, // Top Score
                    21 => 1000, 22 => 1000 // Practice
                ];

                $deadline = strtotime('2026-05-14 18:00:00');
                // CCAvenue often sends dd/mm/yyyy. strtotime treats slashes as m/d/y. 
                // Replacing slashes with hyphens forces d-m-y parsing.
                $currentTime = !empty($trans_date) ? strtotime(str_replace('/', '-', $trans_date)) : time();
                $surcharge = ($currentTime > $deadline) ? 500 : 0;

                $eventTotal = 0;
                $calculatedFees = [];
                foreach ($selectedIds as $id) {
                    $base = isset($baseFees[$id]) ? $baseFees[$id] : 2000;
                    $count = isset($horseData[$id]) ? (is_array($horseData[$id]) ? count($horseData[$id]) : 1) : 1;
                    $fee = ($base + $surcharge) * $count;
                    $calculatedFees[$id] = $fee;
                    $eventTotal += $fee;
                }

                $stablingBalance = (float)$mer_amount - $eventTotal;
                $isFirstRow = true;

                foreach ($selectedIds as $id) {
                    $category = isset($eventMapping[$id]) ? $eventMapping[$id] : "Event #$id";
                    $horses = isset($horseData[$id]) ? (is_array($horseData[$id]) ? $horseData[$id] : [$horseData[$id]]) : ["N/A"];

                    // Bundle stabling into the first event row
                    $displayAmount = $calculatedFees[$id];
                    if ($isFirstRow) {
                        $displayAmount += $stablingBalance;
                        $isFirstRow = false;
                    }

                    $webhookData = array(
                        "name" => $row['name'], 
                        "dob" => $row['dob'], 
                        "parentName" => $row['parentName'],
                        "address" => $row['address'], "mobile" => $row['mobile'], "email" => $row['email'],
                        "emergencyContact" => $row['emergencyContact'], "emergencyRelation" => $row['emergencyRelation'],
                        "clubName" => $row['clubName'], 
                        "events" => $category,
                        "eventHorses" => implode(", ", $horses), 
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
                    curl_exec($ch); 
                    curl_close($ch);
                }

            }
        } else {
            // 2e. Send Failure Email via SES (Only if email exists)
            if (!empty($userData['email'])) {
                $htmlBody = get_failed_email_body($userData['name'], $order_id, $status_message);
                send_hprc_email($userData['email'], $userData['name'], "Payment Notification - HPRC Equestrian Challenge 2026", $htmlBody);
            }

            // 2f. Send Admin Failure Alert (ALWAYS)
            $adminHtml = get_admin_failed_notification_body($userData['name'], $order_id, $status_message, $userData['email'] ?: "No Email Provided");
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
