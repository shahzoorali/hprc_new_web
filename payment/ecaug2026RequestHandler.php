<?php
// 2nd HPRC Equestrian Challenge 2026 (August Season) — payment request handler.
// Isolated from ec2026: writes to the `ecaug2026` table, uses InventoryManagerAug,
// and redirects to /events/2nd-equestrian-challenge-2026.
//
// NOTE: CCAvenue credentials below are the shared HDFC MID (same as ec2026). If a
// separate settlement account is desired for August, swap merchant_id/working_key/
// access_code here and in ecaug2026ResponseHandler.php.
// NOTE: $webhook_url currently points at the shared Google Sheets endpoint. Replace
// with a dedicated August sheet endpoint if you want the data separated.

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
$selectedEvents = isset($_POST['selectedEvents']) ? $_POST['selectedEvents'] : '';
$eventHorses = isset($_POST['eventHorses']) ? $_POST['eventHorses'] : '';
$horseBreeds = isset($_POST['horseBreeds']) ? $_POST['horseBreeds'] : '';
$stablingType = isset($_POST['stablingType']) ? $_POST['stablingType'] : 'NONE';
$stablingCount = isset($_POST['stablingCount']) ? $_POST['stablingCount'] : 0;
$stablingFrom = isset($_POST['stablingFrom']) ? $_POST['stablingFrom'] : '';
$stablingTo = isset($_POST['stablingTo']) ? $_POST['stablingTo'] : '';
$amount = isset($_POST['amount']) ? $_POST['amount'] : 0;
$currency = "INR";

// Reject junk/automated requests (scanners, empty POSTs) before they can hit the
// amount<=0 complimentary bypass below. A real form submission always has these.
if ($name === '' || $mobile === '' || $email === '' || $selectedEvents === '') {
    error_log("ECAUG2026: Rejected incomplete submission (missing required fields).");
    http_response_code(400);
    exit('Missing required fields.');
}

// Handle Age Proof Upload
$ageProofPath = '';
if (isset($_FILES['ageProof']) && $_FILES['ageProof']['error'] == 0) {
    $uploadDir = __DIR__ . '/uploads/ecaug2026/age_proofs/';
    if (!is_dir($uploadDir)) {
        if (!mkdir($uploadDir, 0755, true)) {
            error_log("ECAUG2026: Failed to create upload directory: " . $uploadDir);
        }
    }

    $safeName = preg_replace('/[^a-zA-Z0-9]/', '_', $name);
    $fileExtension = pathinfo($_FILES['ageProof']['name'], PATHINFO_EXTENSION);
    $fileName = $safeName . '_age_proof_' . time() . '.' . $fileExtension;
    $targetPath = $uploadDir . $fileName;

    if (move_uploaded_file($_FILES['ageProof']['tmp_name'], $targetPath)) {
        $ageProofPath = 'uploads/ecaug2026/age_proofs/' . $fileName;
    } else {
        error_log("ECAUG2026: Failed to move uploaded file. Error Code: " . $_FILES['ageProof']['error'] . " | Target: " . $targetPath);
    }
} else if (isset($_FILES['ageProof']) && $_FILES['ageProof']['error'] != 4) {
    error_log("ECAUG2026: File upload error detected. Code: " . $_FILES['ageProof']['error']);
}

// Handle Rider Headshot Upload
$headshotPath = '';
if (isset($_FILES['headshot']) && $_FILES['headshot']['error'] == 0) {
    $headshotDir = __DIR__ . '/uploads/ecaug2026/headshots/';
    if (!is_dir($headshotDir)) {
        if (!mkdir($headshotDir, 0755, true)) {
            error_log("ECAUG2026: Failed to create headshot directory: " . $headshotDir);
        }
    }

    $safeName = preg_replace('/[^a-zA-Z0-9]/', '_', $name);
    $fileExtension = pathinfo($_FILES['headshot']['name'], PATHINFO_EXTENSION);
    $fileName = $safeName . '_headshot_' . time() . '.' . $fileExtension;
    $targetPath = $headshotDir . $fileName;

    if (move_uploaded_file($_FILES['headshot']['tmp_name'], $targetPath)) {
        $headshotPath = 'uploads/ecaug2026/headshots/' . $fileName;
    } else {
        error_log("ECAUG2026: Failed to move headshot. Error Code: " . $_FILES['headshot']['error'] . " | Target: " . $targetPath);
    }
} else if (isset($_FILES['headshot']) && $_FILES['headshot']['error'] != 4) {
    error_log("ECAUG2026: Headshot upload error detected. Code: " . $_FILES['headshot']['error']);
}

// Pre-flight inventory check for stable bookings before creating the order.
if ($stablingType !== 'NONE' && (int)$stablingCount > 0 && !empty($stablingFrom) && !empty($stablingTo)) {
    $im = new InventoryManagerCamp();
    $check = $im->canBook((int)$stablingCount, $stablingFrom, $stablingTo);
    if (!$check['ok']) {
        $reason = isset($check['reason']) ? $check['reason'] : 'Stables unavailable for selected dates';
        error_log("ECAUG2026: Stabling rejected for $name — $reason");
        $back = '/events/2nd-equestrian-challenge-2026?stabling_error=' . urlencode($reason);
        header("Location: $back");
        exit();
    }
}

$sql = "INSERT INTO ecaug2026 (name, parentName, dob, address, mobile, email, emergencyContact, emergencyRelation, clubName, selectedEvents, eventHorses, horseBreeds, stablingType, stablingCount, stablingFrom, stablingTo, ageProofPath, headshotPath, amount, currency)
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
                '".$conn->real_escape_string($horseBreeds)."',
                '".$conn->real_escape_string($stablingType)."',
                '".(int)$stablingCount."',
                '".$conn->real_escape_string($stablingFrom)."',
                '".$conn->real_escape_string($stablingTo)."',
                '".$conn->real_escape_string($ageProofPath)."',
                '".$conn->real_escape_string($headshotPath)."',
                '".$conn->real_escape_string($amount)."',
                '$currency')";

$conn->query($sql);
$order_id = $conn->insert_id;

error_reporting(1);

$merchant_data='order_id='.$order_id.'&';
$merchant_data.='merchant_id=4447589&';
$merchant_data.='amount='.$amount.'&';
$merchant_data.='currency=INR&';
$merchant_data.='redirect_url=https://hprc.in/payment/ecaug2026ResponseHandler.php&';
$merchant_data.='cancel_url=https://hprc.in/payment/ecaug2026ResponseHandler.php&';
$merchant_data.='language=EN&';
$working_key='00A39923BC821061266C29348FF5A3F0';//HDFC CCAvenue
$access_code='AVPP92NE85CC15PPCC';//HDFC CCAvenue

$merchant_data.='billing_name='.$name.'&';
$merchant_data.='billing_address='.$address.'&';
$merchant_data.='billing_tel='.$mobile.'&';
$merchant_data.='billing_email='.$email.'&';

$encrypted_data=encrypt($merchant_data,$working_key);

// Event labels for August (new IDs).
$eventMapping = [
    1 => "Hacks - 12y & Under", 2 => "Hacks - 13-16y",
    3 => "Dressage - Children II", 4 => "Dressage - Children I", 5 => "Dressage - Juniors",
    6 => "SJ 40cm - Under 12", 7 => "SJ 40cm - Open",
    8 => "SJ 60cm - Under 14", 9 => "SJ 60cm - Open",
    10 => "SJ 80cm - Children II", 11 => "SJ 80cm - Open",
    12 => "SJ 90cm - Children I", 13 => "SJ 90cm - Open",
    14 => "SJ 105-110cm - Juniors", 15 => "SJ 105-110cm - Open",
    16 => "Practice Round 80-90cm"
];

$webhook_url = "https://script.google.com/macros/s/AKfycbynK3pTkRLw4Oqp04kAlX0dh0C7_ed6G8P8f3LNrdbpHMTpmI-Q64XyuBDNKMsnuJeN/exec";

// --- COMPLIMENTARY / CHEAT CODE BYPASS ---
if ($amount <= 0) {
    $conn->query("UPDATE ecaug2026 SET order_status='Success', payment_mode='COMPLIMENTARY', trans_date='".date('Y-m-d H:i:s')."', status_message='Cheat Code Used' WHERE id='$order_id'");

    if ($stablingType !== 'NONE' && (int)$stablingCount > 0 && !empty($stablingFrom) && !empty($stablingTo)) {
        $imComp = new InventoryManagerCamp();
        $imComp->deductInventory($order_id, $name, (int)$stablingCount, $stablingFrom, $stablingTo, 'ec');
    }

    $selectedIds = json_decode($selectedEvents, true) ?: [];
    $horseData = json_decode($eventHorses, true) ?: [];
    $breedMap = json_decode($horseBreeds, true) ?: [];

    $ageProofLink = !empty($ageProofPath) ? "https://hprc.in/payment/view_proof.php?file=" . urlencode(basename($ageProofPath)) : "";

    $webhookPayloads = [];
    foreach ($selectedIds as $id) {
        $category = isset($eventMapping[$id]) ? $eventMapping[$id] : "Event #$id";
        $horses = isset($horseData[$id]) ? (is_array($horseData[$id]) ? $horseData[$id] : [$horseData[$id]]) : ["N/A"];

        foreach ($horses as $jumpIdx => $horse) {
            $jumpNumber = $jumpIdx + 1;
            $jumpLabel = (count($horses) > 1) ? " - Jump $jumpNumber" : "";

            $webhookPayloads[] = array(
                "edition" => "HPRC EC Aug 2026",
                "name" => $name,
                "dob" => $dob,
                "parentName" => $parentName,
                "address" => $address,
                "mobile" => $mobile, "email" => $email, "emergencyContact" => $emergencyContact,
                "emergencyRelation" => $emergencyRelation, "clubName" => $clubName,
                "events" => $category . $jumpLabel,
                "eventHorses" => $horse,
                "breed" => isset($breedMap[$horse]) ? $breedMap[$horse] : "",
                "stablingType" => $stablingType, "stablingCount" => $stablingCount,
                "stablingFrom" => $stablingFrom, "stablingTo" => $stablingTo,
                "amount" => "0 (COMP)", "tracking_id" => "HPRCAUGCHEAT-" . $id . "-J" . $jumpNumber,
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
        $etiquettePath = __DIR__ . '/../public/events/ecaug2026/HPRC_Equestrian_Challenge_2026_Etiquette_Conduct_Guidelines.pdf';
        send_hprc_email($email, $name, "Registration Confirmed - HPRC Equestrian Challenge 2026 (August)", $htmlBody, "", $etiquettePath);
    }

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

    $attachment = !empty($ageProofPath) ? __DIR__ . '/' . $ageProofPath : null;
    send_admin_notification("COMPLIMENTARY REGISTRATION (AUG): $name (#$order_id)", $adminHtml, $attachment);

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

    header("Location: /events/2nd-equestrian-challenge-2026/success?status=Success&order_id=$order_id&amount=0&tracking_id=COMP-ENTRY");
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
