<?php
// Performance hardening: prevent timeout during slow ops (DB + email + webhook).
set_time_limit(120);
ignore_user_abort(true);
ini_set('max_execution_time', 120);
ini_set('default_socket_timeout', 30);

include('crypto.php');
require("dbconnect.php");
require("mailer.php");
require("email_templates.php");
require_once("InventoryManager.php");

$name = isset($_POST['name']) ? $_POST['name'] : '';
$parentName = isset($_POST['parentName']) ? $_POST['parentName'] : '';
$dob = isset($_POST['dob']) ? $_POST['dob'] : '';
$address = isset($_POST['address']) ? $_POST['address'] : '';
$mobile = isset($_POST['mobile']) ? $_POST['mobile'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$emergencyContact = isset($_POST['emergencyContact']) ? $_POST['emergencyContact'] : '';
$emergencyRelation = isset($_POST['emergencyRelation']) ? $_POST['emergencyRelation'] : '';
$clubName = isset($_POST['clubName']) ? $_POST['clubName'] : '';
$selectedEvents = isset($_POST['selectedEvents']) ? $_POST['selectedEvents'] : ''; 
$eventHorses = isset($_POST['eventHorses']) ? $_POST['eventHorses'] : ''; 
$stablingType = isset($_POST['stablingType']) ? $_POST['stablingType'] : 'NONE';
$stablingCount = isset($_POST['stablingCount']) ? $_POST['stablingCount'] : 0;
$stablingFrom = isset($_POST['stablingFrom']) ? $_POST['stablingFrom'] : '';
$stablingTo = isset($_POST['stablingTo']) ? $_POST['stablingTo'] : '';
$amount = isset($_POST['amount']) ? $_POST['amount'] : 0;
$currency = "INR";

// Handle Age Proof Upload
$ageProofPath = '';
if (isset($_FILES['ageProof']) && $_FILES['ageProof']['error'] == 0) {
    $uploadDir = __DIR__ . '/uploads/ec2026/age_proofs/';
    if (!is_dir($uploadDir)) {
        if (!mkdir($uploadDir, 0755, true)) {
            error_log("EC2026: Failed to create upload directory: " . $uploadDir);
        }
    }
    
    $safeName = preg_replace('/[^a-zA-Z0-9]/', '_', $name);
    $fileExtension = pathinfo($_FILES['ageProof']['name'], PATHINFO_EXTENSION);
    $fileName = $safeName . '_age_proof_' . time() . '.' . $fileExtension;
    $targetPath = $uploadDir . $fileName;
    
    if (move_uploaded_file($_FILES['ageProof']['tmp_name'], $targetPath)) {
        // Store relative path for database consistency
        $ageProofPath = 'uploads/ec2026/age_proofs/' . $fileName;
    } else {
        error_log("EC2026: Failed to move uploaded file. Error Code: " . $_FILES['ageProof']['error'] . " | Target: " . $targetPath);
    }
} else if (isset($_FILES['ageProof']) && $_FILES['ageProof']['error'] != 4) {
    // Error 4 means no file was uploaded, which is fine. Other errors should be logged.
    error_log("EC2026: File upload error detected. Code: " . $_FILES['ageProof']['error']);
}

// Pre-flight inventory check for PERMANENT stables before creating the order.
// Prevents orders we can't honour. Form already checks, this is the authoritative server-side gate.
if ($stablingType === 'PERMANENT' && (int)$stablingCount > 0 && !empty($stablingFrom) && !empty($stablingTo)) {
    $im = new InventoryManager();
    $check = $im->canBook((int)$stablingCount, $stablingFrom, $stablingTo);
    if (!$check['ok']) {
        $reason = isset($check['reason']) ? $check['reason'] : 'Stables unavailable for selected dates';
        error_log("EC2026: Stabling rejected for $name — $reason");
        $back = '/events/equestrian-challenge-2026?stabling_error=' . urlencode($reason);
        header("Location: $back");
        exit();
    }
}

$sql = "INSERT INTO ec2026 (name, parentName, dob, address, mobile, email, emergencyContact, emergencyRelation, clubName, selectedEvents, eventHorses, stablingType, stablingCount, stablingFrom, stablingTo, ageProofPath, amount, currency)
        VALUES ('".$conn->real_escape_string($name)."', 
                '".$conn->real_escape_string($parentName)."', 
                '".$conn->real_escape_string($dob)."', 
                '".$conn->real_escape_string($address)."', 
                '".$conn->real_escape_string($mobile)."', 
                '".$conn->real_escape_string($email)."', 
                '".$conn->real_escape_string($emergencyContact)."', 
                '".$conn->real_escape_string($emergencyRelation)."', 
                '".$conn->real_escape_string($clubName)."', 
                '".$conn->real_escape_string($selectedEvents)."', 
                '".$conn->real_escape_string($eventHorses)."', 
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
$merchant_data.='merchant_id=195053&';
$merchant_data.='amount='.$amount.'&';
$merchant_data.='currency=INR&';
$merchant_data.='redirect_url=https://hprc.in/payment/ec2026ResponseHandler.php&';
$merchant_data.='cancel_url=https://hprc.in/payment/ec2026ResponseHandler.php&';
$merchant_data.='language=EN&';
$working_key='D21542B21357F51DA6027649B1E12DFE';//Shared by CCAVENUES
$access_code='AVWW81FJ19BV33WWVB';//Shared by CCAVENUES

// Send billing payload specifically to CCAvenue:
$merchant_data.='billing_name='.$name.'&';
$merchant_data.='billing_address='.$address.'&';
$merchant_data.='billing_tel='.$mobile.'&';
$merchant_data.='billing_email='.$email.'&';

$encrypted_data=encrypt($merchant_data,$working_key); 

// --- COMPLIMENTARY / CHEAT CODE BYPASS ---
if ($amount <= 0) {
    // 1. Mark as success in DB
    $conn->query("UPDATE ec2026 SET order_status='Success', payment_mode='COMPLIMENTARY', trans_date='".date('Y-m-d H:i:s')."', status_message='Cheat Code Used' WHERE id='$order_id'");

    // 1b. Deduct stabling inventory for complimentary booking
    if ($stablingType === 'PERMANENT' && (int)$stablingCount > 0 && !empty($stablingFrom) && !empty($stablingTo)) {
        $imComp = new InventoryManager();
        $imComp->deductInventory($order_id, $name, (int)$stablingCount, $stablingFrom, $stablingTo);
    }
    
    // 2. Trigger Google Sheets Webhook (Shared logic with Response Handler)
    $webhook_url = "https://script.google.com/macros/s/AKfycbzw65SAMdxZpVqp5TcIKvcLIZVdDDcybqkMAUnjM7-wSqvjmo0Pw2Lgz7nC_2ttDN33/exec";
    
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

    $selectedIds = json_decode($selectedEvents, true) ?: [];
    $horseData = json_decode($eventHorses, true) ?: [];
    
    $ageProofLink = !empty($ageProofPath) ? "https://hprc.in/payment/view_proof.php?file=" . urlencode(basename($ageProofPath)) : "";

    // Prepare an array of webhook payloads (one per jump)
    $webhookPayloads = [];
    foreach ($selectedIds as $id) {
        $category = isset($eventMapping[$id]) ? $eventMapping[$id] : "Event #$id";
        $horses = isset($horseData[$id]) ? (is_array($horseData[$id]) ? $horseData[$id] : [$horseData[$id]]) : ["N/A"];

        foreach ($horses as $jumpIdx => $horse) {
            $jumpNumber = $jumpIdx + 1;
            $jumpLabel = (count($horses) > 1) ? " - Jump $jumpNumber" : "";

            $webhookPayloads[] = array(
                "name" => $name,
                "dob" => $dob,
                "parentName" => $parentName,
                "address" => $address,
                "mobile" => $mobile, "email" => $email, "emergencyContact" => $emergencyContact,
                "emergencyRelation" => $emergencyRelation, "clubName" => $clubName,
                "events" => $category . $jumpLabel,
                "eventHorses" => $horse,
                "stablingType" => $stablingType, "stablingCount" => $stablingCount,
                "stablingFrom" => $stablingFrom, "stablingTo" => $stablingTo,
                "amount" => "0 (COMP)", "tracking_id" => "HPRCCHEAT1-" . $id . "-J" . $jumpNumber,
                "ageProofLink" => $ageProofLink
            );
        }
    }

    // For backward compatibility or other logic, keeping these for emails
    $readableEvents = []; $readableHorses = [];
    foreach ($selectedIds as $id) {
        $category = isset($eventMapping[$id]) ? $eventMapping[$id] : "Event #$id";
        $readableEvents[] = $category;
        $horses = isset($horseData[$id]) ? (is_array($horseData[$id]) ? $horseData[$id] : [$horseData[$id]]) : ["N/A"];
        $readableHorses[] = $category . ": (" . implode(", ", $horses) . ")";
    }

    
    // 4. Send Rider Confirmation Email (Only if email exists)
    if (!empty($email)) {
        $details = ["events" => implode(" | ", $readableEvents)];
        $htmlBody = get_success_email_body($name, $order_id, "0 (COMP)", "COMP-ENTRY", $details);
        $etiquettePath = __DIR__ . '/../public/events/ec2026/HPRC_Equestrian_Challenge_2026_Etiquette_Conduct_Guidelines.pdf';
        send_hprc_email($email, $name, "Registration Confirmed - HPRC Equestrian Challenge 2026", $htmlBody, "", $etiquettePath);
    }

    // 4b. Send Detailed Admin Notification (ALWAYS)
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
    
    // Attach Age Proof if exists
    $attachment = !empty($ageProofPath) ? __DIR__ . '/' . $ageProofPath : null;
    send_admin_notification("COMPLIMENTARY REGISTRATION: $name (#$order_id)", $adminHtml, $attachment);

    // 2. Trigger Google Sheets Webhook for each event entry
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


    // 3. Redirect to Success Page
    header("Location: /events/equestrian-challenge-2026/success?status=Success&order_id=$order_id&amount=0&tracking_id=COMP-ENTRY");
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
