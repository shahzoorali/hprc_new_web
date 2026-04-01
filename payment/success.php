<?php
include('crypto.php');
require("dbconnect.php");

error_reporting(0);

$workingKey='D21542B21357F51DA6027649B1E12DFE';		//Working Key
$encResponse=$_POST["encResp"];			//Response from CCAvenue
$rcvdString=decrypt($encResponse,$workingKey);		
$order_status="";
$decryptValues=explode('&', $rcvdString);
$dataSize=sizeof($decryptValues);

for($i = 0; $i < $dataSize; $i++) {
    $information=explode('=',$decryptValues[$i]);
    if($i==3) $order_status=$information[1];
}

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
}

if ($order_id) {
    $updatesql = "UPDATE orders SET tracking_id='".$conn->real_escape_string($tracking_id)."',
                    bank_ref_no='".$conn->real_escape_string($bank_ref_no)."',
                    payment_mode='".$conn->real_escape_string($payment_mode)."',
                    status_message='".$conn->real_escape_string($status_message)."',
                    order_status='".$conn->real_escape_string($order_status)."',
                    trans_date='".$conn->real_escape_string($trans_date)."'
                    WHERE order_id='".$conn->real_escape_string($order_id)."'";

    $conn->query($updatesql);
}

// Redirect to Next.js success page
$redirect_url = '/pay-now/success?status=' . urlencode($order_status) . 
                '&order_id=' . urlencode($order_id) . 
                '&amount=' . urlencode($mer_amount) . 
                '&tracking_id=' . urlencode($tracking_id) .
                '&status_message=' . urlencode($status_message);

header("Location: " . $redirect_url);
exit();
?>