<?php
include('crypto.php');
require("dbconnect.php");
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

    // 2. Transmit success data automatically to Google Sheets via Webhook
    if($order_status === "Success" || $order_status === "Successful") {
        $result = $conn->query("SELECT name, parentName, dob, address, mobile, email, emergencyContact, emergencyRelation, clubName, selectedEvents, eventHorses, stablingType, stablingCount, stablingFrom, stablingTo, ageProofPath FROM ec2026 WHERE id='".$conn->real_escape_string($order_id)."'");
        if ($result && $row = $result->fetch_assoc()) {
            
            $webhook_url = "https://script.google.com/macros/s/AKfycbzw65SAMdxZpVqp5TcIKvcLIZVdDDcybqkMAUnjM7-wSqvjmo0Pw2Lgz7nC_2ttDN33/exec";
            $ageProofLink = !empty($row['ageProofPath']) ? "https://hprc.in/payment/" . $row['ageProofPath'] : "";
            
            $data = array(
                "name" => $row['name'],
                "parentName" => $row['parentName'],
                "dob" => $row['dob'],
                "address" => $row['address'],
                "mobile" => $row['mobile'],
                "email" => $row['email'],
                "emergencyContact" => $row['emergencyContact'],
                "emergencyRelation" => $row['emergencyRelation'],
                "clubName" => $row['clubName'],
                "events" => $row['selectedEvents'],
                "eventHorses" => $row['eventHorses'],
                "stablingType" => $row['stablingType'],
                "stablingCount" => $row['stablingCount'],
                "stablingFrom" => $row['stablingFrom'],
                "stablingTo" => $row['stablingTo'],
                "ageProofLink" => $ageProofLink,
                "amount" => $mer_amount,
                "tracking_id" => $tracking_id
            );
            
            $ch = curl_init($webhook_url);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_exec($ch);
            curl_close($ch);
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
