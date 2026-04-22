<?php
include('crypto.php');
require("dbconnect.php");
require("mailer.php");
require("email_templates.php");

// DEBUG LOGGING
function hlog_req($msg) {
    file_put_contents(__DIR__ . '/handler_debug.log', "[" . date('Y-m-d H:i:s') . "] REQ_HANDLER: " . $msg . "\n", FILE_APPEND);
}

hlog_req("Request Handler Started");

$workingKey='D21542B21357F51DA6027649B1E12DFE';		//Shared by CCAvenues
$access_code='AVBH27LC84AH13HBAH';		//Shared by CCAvenues

$merchant_data='';
foreach ($_POST as $key => $value){
    $merchant_data.=$key.'='.$value.'&';
}

$encrypted_data=encrypt($merchant_data,$workingKey); 

$amount = isset($_POST['amount']) ? $_POST['amount'] : 0;
$name = isset($_POST['name']) ? $_POST['name'] : 'Unknown';
$email = isset($_POST['email']) ? $_POST['email'] : '';

hlog_req("Processing Request. Name: $name, Email: $email, Amount: $amount");

// Special handling for complimentary entries (₹0)
if ($amount <= 0) {
    hlog_req("Cheat Code Detected. Bypassing Payment Gateway.");
    
    // 1. Insert into database immediately
    $parentName = isset($_POST['parentName']) ? $_POST['parentName'] : '';
    $dob = isset($_POST['dob']) ? $_POST['dob'] : '';
    $address = isset($_POST['address']) ? $_POST['address'] : '';
    $mobile = isset($_POST['mobile']) ? $_POST['mobile'] : '';
    $emergencyContact = isset($_POST['emergencyContact']) ? $_POST['emergencyContact'] : '';
    $emergencyRelation = isset($_POST['emergencyRelation']) ? $_POST['emergencyRelation'] : '';
    $clubName = isset($_POST['clubName']) ? $_POST['clubName'] : '';
    $selectedEvents = isset($_POST['selectedEvents']) ? $_POST['selectedEvents'] : '[]';
    $eventHorses = isset($_POST['eventHorses']) ? $_POST['eventHorses'] : '{}';
    $stablingType = isset($_POST['stablingType']) ? $_POST['stablingType'] : 'NONE';
    $stablingCount = isset($_POST['stablingCount']) ? $_POST['stablingCount'] : 0;
    $stablingFrom = isset($_POST['stablingFrom']) ? $_POST['stablingFrom'] : '';
    $stablingTo = isset($_POST['stablingTo']) ? $_POST['stablingTo'] : '';
    $ageProofPath = isset($_POST['ageProofPath']) ? $_POST['ageProofPath'] : '';

    $sql = "INSERT INTO ec2026 (name, parentName, dob, address, mobile, email, emergencyContact, emergencyRelation, clubName, selectedEvents, eventHorses, stablingType, stablingCount, stablingFrom, stablingTo, ageProofPath, order_status, status_message) 
            VALUES ('".$conn->real_escape_string($name)."', '".$conn->real_escape_string($parentName)."', '".$conn->real_escape_string($dob)."', '".$conn->real_escape_string($address)."', '".$conn->real_escape_string($mobile)."', '".$conn->real_escape_string($email)."', '".$conn->real_escape_string($emergencyContact)."', '".$conn->real_escape_string($emergencyRelation)."', '".$conn->real_escape_string($clubName)."', '".$conn->real_escape_string($selectedEvents)."', '".$conn->real_escape_string($eventHorses)."', '".$conn->real_escape_string($stablingType)."', $stablingCount, '".$conn->real_escape_string($stablingFrom)."', '".$conn->real_escape_string($stablingTo)."', '".$conn->real_escape_string($ageProofPath)."', 'Success', 'Cheat Code Used')";

    if ($conn->query($sql)) {
        $order_id = $conn->insert_id;
        hlog_req("DB Insert Successful. Order ID: $order_id");
    } else {
        hlog_req("DB Insert FAILED: " . $conn->error);
    }

    // Prepare data for email & webhook
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

    $selectedIds = json_decode($selectedEvents, true) ?: [];
    $horseData = json_decode($eventHorses, true) ?: [];
    $readableEvents = []; $readableHorses = [];
    foreach ($selectedIds as $id) {
        $category = isset($eventMapping[$id]) ? $eventMapping[$id] : "Event #$id";
        $readableEvents[] = $category;
        $horses = isset($horseData[$id]) ? (is_array($horseData[$id]) ? $horseData[$id] : [$horseData[$id]]) : ["N/A"];
        $readableHorses[] = $category . ": (" . implode(", ", $horses) . ")";
    }

    $webhook_url = "https://script.google.com/macros/s/AKfycbzw65SAMdxZpVqp5TcIKvcLIZVdDDcybqkMAUnjM7-wSqvjmo0Pw2Lgz7nC_2ttDN33/exec";
    $ageProofLink = !empty($ageProofPath) ? "https://hprc.in/payment/" . $ageProofPath : "";
    $webhookData = array(
        "name" => $name, "parentName" => $parentName, "dob" => $dob,
        "address" => $address, "mobile" => $mobile, "email" => $email,
        "emergencyContact" => $emergencyContact, "emergencyRelation" => $emergencyRelation,
        "clubName" => $clubName, "events" => implode(" | ", $readableEvents),
        "eventHorses" => implode(" | ", $readableHorses), "stablingType" => $stablingType,
        "stablingCount" => $stablingCount, "stablingFrom" => $stablingFrom,
        "stablingTo" => $stablingTo, "ageProofLink" => $ageProofLink,
        "amount" => "0 (COMP)", "tracking_id" => "HPRCCHEAT1"
    );

    // 4. Send Success Email via SES (BEFORE Webhook)
    if (!empty($email)) {
        hlog_req("Attempting Rider Email Send...");
        $details = ["events" => implode(" | ", $readableEvents)];
        $htmlBody = get_success_email_body($name, $order_id, "0 (COMP)", "COMP-ENTRY", $details);
        $res = send_hprc_email($email, $name, "Registration Confirmed - HPRC Equestrian Challenge 2026", $htmlBody);
        hlog_req("Rider Email Result: " . ($res['success'] ? 'OK' : 'FAIL: '.$res['error']));
        
        hlog_req("Attempting Admin Email Send...");
        $adminData = [
            "name" => $name, "parentName" => $parentName, "dob" => $dob, "address" => $address,
            "mobile" => $mobile, "email" => $email, "emergencyContact" => $emergencyContact,
            "emergencyRelation" => $emergencyRelation, "clubName" => $clubName,
            "events" => implode(" | ", $readableEvents), "eventHorses" => implode(" | ", $readableHorses),
            "stablingType" => $stablingType, "stablingCount" => $stablingCount,
            "stablingFrom" => $stablingFrom, "stablingTo" => $stablingTo,
            "amount" => "0 (COMP)", "ageProofPath" => $ageProofPath
        ];
        $adminHtml = get_admin_notification_body($adminData, $order_id, "COMP-ENTRY");
        send_admin_notification("COMPLIMENTARY REGISTRATION: $name (#$order_id)", $adminHtml);
        hlog_req("Admin Notification Sent");
    }

    hlog_req("Triggering Webhook...");
    // 2. Trigger Google Sheets Webhook (Webhook last as it can be slow)
    $ch = curl_init($webhook_url);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($webhookData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_exec($ch); curl_close($ch);
    hlog_req("Webhook complete");

    hlog_req("Handler finished. Redirecting...");
    // 3. Redirect to Success Page
    header("Location: /events/equestrian-challenge-2026/success?status=Success&order_id=$order_id&amount=0&tracking_id=COMP-ENTRY");
    exit();
}

hlog_req("Proceeding to CCAvenue Gateway...");
?>
<html>
<head>
<title>CCAvenue Payment</title>
</head>
<body>
<center>
<form method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"> 
<input type=hidden name=encRequest value="<?php echo $encrypted_data; ?>">
<input type=hidden name=access_code value="<?php echo $access_code; ?>">
</form>
</center>
<script language='javascript'>document.redirect.submit();</script>
</body>
</html>
