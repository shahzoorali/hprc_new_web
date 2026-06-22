<?php
// National Qualifier (NQ) 2026 — payment request handler.
// Isolated table `nq2026`; SHARED stabling ledger via InventoryManagerCamp.
// Redirects to /events/nq-2026. No post/spot entries.
//
// NOTE: CCAvenue credentials are the shared HDFC MID (same as ec2026/ecaug2026).
// NOTE: $webhook_url is the shared Google Sheets endpoint; rows are tagged
// "HPRC NQ 2026" via the `edition` field.

set_time_limit(120);
ignore_user_abort(true);
ini_set('max_execution_time', 120);
ini_set('default_socket_timeout', 30);

include('crypto.php');
require("dbconnect.php");
require("mailer.php");
require("email_templates.php");
require_once("InventoryManagerCamp.php");

$name = isset($_POST['name']) ? $_POST['name'] : '';
$parentName = isset($_POST['parentName']) ? $_POST['parentName'] : '';
$dob = isset($_POST['dob']) ? $_POST['dob'] : '';
$address = isset($_POST['address']) ? $_POST['address'] : '';
$mobile = isset($_POST['mobile']) ? $_POST['mobile'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$emergencyContact = isset($_POST['emergencyContact']) ? $_POST['emergencyContact'] : '';
$emergencyRelation = isset($_POST['emergencyRelation']) ? $_POST['emergencyRelation'] : '';
$clubName = isset($_POST['clubName']) ? $_POST['clubName'] : '';
$efiRiderId = isset($_POST['efiRiderId']) ? $_POST['efiRiderId'] : '';
$isIndian = isset($_POST['isIndian']) ? $_POST['isIndian'] : 'no';
$selectedEvents = isset($_POST['selectedEvents']) ? $_POST['selectedEvents'] : '';
$eventHorses = isset($_POST['eventHorses']) ? $_POST['eventHorses'] : '';
$eventHorseEfi = isset($_POST['eventHorseEfi']) ? $_POST['eventHorseEfi'] : '';
$stablingType = isset($_POST['stablingType']) ? $_POST['stablingType'] : 'NONE';
$stablingCount = isset($_POST['stablingCount']) ? $_POST['stablingCount'] : 0;
$stablingFrom = isset($_POST['stablingFrom']) ? $_POST['stablingFrom'] : '';
$stablingTo = isset($_POST['stablingTo']) ? $_POST['stablingTo'] : '';
$amount = isset($_POST['amount']) ? $_POST['amount'] : 0;
$currency = "INR";

// Handle Age & Nationality Proof Upload
$ageProofPath = '';
if (isset($_FILES['ageProof']) && $_FILES['ageProof']['error'] == 0) {
    $uploadDir = __DIR__ . '/uploads/nq2026/age_proofs/';
    if (!is_dir($uploadDir)) {
        if (!mkdir($uploadDir, 0755, true)) {
            error_log("NQ2026: Failed to create upload directory: " . $uploadDir);
        }
    }

    $safeName = preg_replace('/[^a-zA-Z0-9]/', '_', $name);
    $fileExtension = pathinfo($_FILES['ageProof']['name'], PATHINFO_EXTENSION);
    $fileName = $safeName . '_age_proof_' . time() . '.' . $fileExtension;
    $targetPath = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES['ageProof']['tmp_name'], $targetPath)) {
        $ageProofPath = 'uploads/nq2026/age_proofs/' . $fileName;
    } else {
        error_log("NQ2026: Failed to move uploaded file. Error Code: " . $_FILES['ageProof']['error'] . " | Target: " . $targetPath);
    }
} else if (isset($_FILES['ageProof']) && $_FILES['ageProof']['error'] != 4) {
    error_log("NQ2026: File upload error detected. Code: " . $_FILES['ageProof']['error']);
}

// Pre-flight inventory check against the SHARED camp ledger.
if ($stablingType !== 'NONE' && (int)$stablingCount > 0 && !empty($stablingFrom) && !empty($stablingTo)) {
    $im = new InventoryManagerCamp();
    $check = $im->canBook((int)$stablingCount, $stablingFrom, $stablingTo);
    if (!$check['ok']) {
        $reason = isset($check['reason']) ? $check['reason'] : 'Stables unavailable for selected dates';
        error_log("NQ2026: Stabling rejected for $name — $reason");
        $back = '/events/nq-2026?stabling_error=' . urlencode($reason);
        header("Location: $back");
        exit();
    }
}

$sql = "INSERT INTO nq2026 (name, parentName, dob, address, mobile, email, emergencyContact, emergencyRelation, clubName, efiRiderId, isIndian, selectedEvents, eventHorses, eventHorseEfi, stablingType, stablingCount, stablingFrom, stablingTo, ageProofPath, amount, currency)
        VALUES ('".$conn->real_escape_string($name)."',
                '".$conn->real_escape_string($parentName)."',
                '".$conn->real_escape_string($dob)."',
                '".$conn->real_escape_string($address)."',
                '".$conn->real_escape_string($mobile)."',
                '".$conn->real_escape_string($email)."',
                '".$conn->real_escape_string($emergencyContact)."',
                '".$conn->real_escape_string($emergencyRelation)."',
                '".$conn->real_escape_string($clubName)."',
                '".$conn->real_escape_string($efiRiderId)."',
                '".$conn->real_escape_string($isIndian)."',
                '".$conn->real_escape_string($selectedEvents)."',
                '".$conn->real_escape_string($eventHorses)."',
                '".$conn->real_escape_string($eventHorseEfi)."',
                '".$conn->real_escape_string($stablingType)."',
                '".(int)$stablingCount."',
                '".$conn->real_escape_string($stablingFrom)."',
                '".$conn->real_escape_string($stablingTo)."',
                '".$conn->real_escape_string($ageProofPath)."',
                '".$conn->real_escape_string($amount)."',
                '$currency')";

$conn->query($sql);
$order_id = $conn->insert_id;

error_reporting(1);

$merchant_data='order_id='.$order_id.'&';
$merchant_data.='merchant_id=4447589&';
$merchant_data.='amount='.$amount.'&';
$merchant_data.='currency=INR&';
$merchant_data.='redirect_url=https://hprc.in/payment/nq2026ResponseHandler.php&';
$merchant_data.='cancel_url=https://hprc.in/payment/nq2026ResponseHandler.php&';
$merchant_data.='language=EN&';
$working_key='00A39923BC821061266C29348FF5A3F0';//HDFC CCAvenue
$access_code='AVPP92NE85CC15PPCC';//HDFC CCAvenue

$merchant_data.='billing_name='.$name.'&';
$merchant_data.='billing_address='.$address.'&';
$merchant_data.='billing_tel='.$mobile.'&';
$merchant_data.='billing_email='.$email.'&';

$encrypted_data=encrypt($merchant_data,$working_key);

// NQ event labels.
$eventMapping = [
    1 => "Dressage - Children II", 2 => "Dressage - Children I", 3 => "Dressage - Junior", 4 => "Dressage - Young Rider",
    5 => "SJ Children II (0.80m)", 6 => "SJ Children I (0.90m)", 7 => "SJ Junior (1.05m)", 8 => "SJ Young Rider (1.15m)",
    9 => "Practice Round 0.80-0.90m"
];

$webhook_url = "https://script.google.com/macros/s/AKfycbzw65SAMdxZpVqp5TcIKvcLIZVdDDcybqkMAUnjM7-wSqvjmo0Pw2Lgz7nC_2ttDN33/exec";

// --- COMPLIMENTARY / CHEAT CODE BYPASS ---
if ($amount <= 0) {
    $conn->query("UPDATE nq2026 SET order_status='Success', payment_mode='COMPLIMENTARY', trans_date='".date('Y-m-d H:i:s')."', status_message='Cheat Code Used' WHERE id='$order_id'");

    if ($stablingType !== 'NONE' && (int)$stablingCount > 0 && !empty($stablingFrom) && !empty($stablingTo)) {
        $imComp = new InventoryManagerCamp();
        $imComp->deductInventory($order_id, $name, (int)$stablingCount, $stablingFrom, $stablingTo, 'nq');
    }

    $selectedIds = json_decode($selectedEvents, true) ?: [];
    $horseData = json_decode($eventHorses, true) ?: [];
    $efiData = json_decode($eventHorseEfi, true) ?: [];

    $ageProofLink = !empty($ageProofPath) ? "https://hprc.in/payment/view_proof.php?file=" . urlencode(basename($ageProofPath)) : "";

    $webhookPayloads = [];
    foreach ($selectedIds as $id) {
        $category = isset($eventMapping[$id]) ? $eventMapping[$id] : "Event #$id";
        $horses = isset($horseData[$id]) ? (is_array($horseData[$id]) ? $horseData[$id] : [$horseData[$id]]) : ["N/A"];
        $regs = isset($efiData[$id]) ? (is_array($efiData[$id]) ? $efiData[$id] : [$efiData[$id]]) : [];

        foreach ($horses as $jumpIdx => $horse) {
            $webhookPayloads[] = array(
                "edition" => "HPRC NQ 2026",
                "name" => $name, "dob" => $dob, "parentName" => $parentName, "address" => $address,
                "mobile" => $mobile, "email" => $email, "emergencyContact" => $emergencyContact,
                "emergencyRelation" => $emergencyRelation, "clubName" => $clubName,
                "efiRiderId" => $efiRiderId,
                "events" => $category,
                "eventHorses" => $horse,
                "horseEfiReg" => isset($regs[$jumpIdx]) ? $regs[$jumpIdx] : "",
                "stablingType" => $stablingType, "stablingCount" => $stablingCount,
                "stablingFrom" => $stablingFrom, "stablingTo" => $stablingTo,
                "amount" => "0 (COMP)", "tracking_id" => "HPRCNQCHEAT-" . $id,
                "ageProofLink" => $ageProofLink
            );
        }
    }

    $readableEvents = []; $readableHorses = [];
    foreach ($selectedIds as $id) {
        $category = isset($eventMapping[$id]) ? $eventMapping[$id] : "Event #$id";
        $readableEvents[] = $category;
        $horses = isset($horseData[$id]) ? (is_array($horseData[$id]) ? $horseData[$id] : [$horseData[$id]]) : ["N/A"];
        $readableHorses[] = $category . ": (" . implode(", ", $horses) . ")";
    }

    if (!empty($email)) {
        $details = ["events" => implode(" | ", $readableEvents)];
        $htmlBody = get_success_email_body($name, $order_id, "0 (COMP)", "COMP-ENTRY", $details);
        send_hprc_email($email, $name, "Registration Confirmed - National Qualifier (NQ) 2026", $htmlBody, "", "");
    }

    $adminData = [
        "name" => $name, "parentName" => $parentName, "dob" => $dob, "address" => $address,
        "mobile" => $mobile, "email" => $email, "emergencyContact" => $emergencyContact,
        "emergencyRelation" => $emergencyRelation, "clubName" => $clubName . " | EFI Rider ID: " . $efiRiderId,
        "events" => implode(" | ", $readableEvents), "eventHorses" => implode(" | ", $readableHorses),
        "stablingType" => $stablingType, "stablingCount" => $stablingCount,
        "stablingFrom" => $stablingFrom, "stablingTo" => $stablingTo,
        "amount" => "0 (COMP)", "ageProofPath" => $ageProofPath
    ];
    $adminHtml = get_admin_notification_body($adminData, $order_id, "COMP-ENTRY");
    $attachment = !empty($ageProofPath) ? __DIR__ . '/' . $ageProofPath : null;
    send_admin_notification("COMPLIMENTARY REGISTRATION (NQ): $name (#$order_id)", $adminHtml, $attachment);

    foreach ($webhookPayloads as $payload) {
        $ch = curl_init($webhook_url);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
        curl_setopt($ch, CURLOPT_TIMEOUT, 8);
        curl_setopt($ch, CURLOPT_NOSIGNAL, 1);
        curl_exec($ch);
        curl_close($ch);
    }

    header("Location: /events/nq-2026/success?status=Success&order_id=$order_id&amount=0&tracking_id=COMP-ENTRY");
    exit();
}
?>
<html>
<head>
<title>CCAvenue Payment</title>
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "wotx268kq9");
</script>
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
