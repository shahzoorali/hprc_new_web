<?php
// National Qualifier (NQ) October 2026 — payment request handler.
// Isolated table `nq_oct_2026`; Isolated stabling ledger via InventoryManagerOctCamp.
// Redirects to /events/oct-nq-2026. No post/spot entries.

set_time_limit(120);
ignore_user_abort(true);
ini_set('max_execution_time', 120);
ini_set('default_socket_timeout', 30);

include('crypto.php');
require("dbconnect.php");
require("mailer.php");
require("email_templates.php");
require_once("InventoryManagerOctCamp.php");

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

if ($name === '' || $mobile === '' || $email === '' || $selectedEvents === '') {
    error_log("OCT_NQ2026: Rejected incomplete submission (missing required fields).");
    http_response_code(400);
    exit('Missing required fields.');
}

// Entries close at 23:59 IST on Tuesday, 13 October 2026 per October Prospectus.
date_default_timezone_set('Asia/Kolkata');
$closingDeadline = strtotime('2026-10-13 23:59:59');
if (time() > $closingDeadline) {
    error_log("OCT_NQ2026: Rejected submission after closing deadline — $name <$email>.");
    http_response_code(403);
    exit('Registration Closed. Entries closed at 23:59 hrs on Tuesday, 13 October 2026. No post-entries or spot entries are accepted.');
}

// Handle Age & Nationality Proof Uploads
$uploadDir = __DIR__ . '/uploads/oct_nq2026/age_proofs/';

$handleProofUpload = function ($fileKey, $suffix) use ($name, $uploadDir) {
    if (!isset($_FILES[$fileKey]) || $_FILES[$fileKey]['error'] != 0) {
        if (isset($_FILES[$fileKey]) && $_FILES[$fileKey]['error'] != 4) {
            error_log("OCT_NQ2026: File upload error on $fileKey. Code: " . $_FILES[$fileKey]['error']);
        }
        return '';
    }
    if (!is_dir($uploadDir) && !mkdir($uploadDir, 0755, true)) {
        error_log("OCT_NQ2026: Failed to create upload directory: " . $uploadDir);
        return '';
    }
    $safeName = preg_replace('/[^a-zA-Z0-9]/', '_', $name);
    $fileExtension = pathinfo($_FILES[$fileKey]['name'], PATHINFO_EXTENSION);
    $fileName = $safeName . '_age_proof' . $suffix . '_' . time() . '.' . $fileExtension;
    $targetPath = $uploadDir . $fileName;
    if (move_uploaded_file($_FILES[$fileKey]['tmp_name'], $targetPath)) {
        return 'uploads/oct_nq2026/age_proofs/' . $fileName;
    }
    error_log("OCT_NQ2026: Failed to move uploaded file $fileKey to " . $targetPath);
    return '';
};

$ageProofPath  = $handleProofUpload('ageProof', '');
$ageProofPath2 = $handleProofUpload('ageProof2', '_2');

// Pre-flight inventory check against October camp ledger.
if ($stablingType !== 'NONE' && (int)$stablingCount > 0 && !empty($stablingFrom) && !empty($stablingTo)) {
    $im = new InventoryManagerOctCamp();
    $check = $im->canBook((int)$stablingCount, $stablingFrom, $stablingTo);
    if (!$check['ok']) {
        $reason = isset($check['reason']) ? $check['reason'] : 'Stables unavailable for selected dates';
        error_log("OCT_NQ2026: Stabling rejected for $name — $reason");
        $redirect_url_error = '/events/oct-nq-2026?stabling_error=' . urlencode($reason);
        header("Location: " . $redirect_url_error);
        exit;
    }
}

$sql = "INSERT INTO nq_oct_2026 (name, parentName, dob, address, mobile, email, emergencyContact, emergencyRelation, clubName, efiRiderId, isIndian, selectedEvents, eventHorses, eventHorseEfi, stablingType, stablingCount, stablingFrom, stablingTo, ageProofPath, ageProofPath2, amount, currency) 
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
                '".$conn->real_escape_string($ageProofPath2)."', 
                '".$conn->real_escape_string($amount)."', 
                '".$conn->real_escape_string($currency)."')";

if ($conn->query($sql) === TRUE) {
    $order_id = $conn->insert_id;
} else {
    error_log("OCT_NQ2026 Database Insert Error: " . $conn->error);
    die("Database Error: " . $conn->error);
}

// CCAvenue parameters
$merchant_data='';
$working_key='00A39923BC821061266C29348FF5A3F0';
$access_code='AVDF80MG88BY84FDYB';

$merchant_data.='merchant_id=4481024&';
$merchant_data.='order_id='.$order_id.'&';
$merchant_data.='amount='.$amount.'&';
$merchant_data.='currency=INR&';
$merchant_data.='redirect_url=https://hprc.in/payment/octNq2026ResponseHandler.php&';
$merchant_data.='cancel_url=https://hprc.in/payment/octNq2026ResponseHandler.php&';
$merchant_data.='language=EN&';
$merchant_data.='billing_name='.$name.'&';
$merchant_data.='billing_email='.$email.'&';
$merchant_data.='billing_tel='.$mobile.'&';
$merchant_data.='merchant_param1=National Qualifier October 2026&';
$merchant_data.='merchant_param2='.$selectedEvents.'&';

$encrypted_data=encrypt($merchant_data,$working_key);

// Complimentary entry bypass
if ($amount <= 0) {
    if ($stablingType !== 'NONE' && (int)$stablingCount > 0 && !empty($stablingFrom) && !empty($stablingTo)) {
        $im = new InventoryManagerOctCamp();
        $im->deductInventory(
            $order_id,
            $name,
            (int)$stablingCount,
            $stablingFrom,
            $stablingTo,
            'oct_nq'
        );
    }

    $conn->query("UPDATE nq_oct_2026 SET order_status='Success', payment_mode='COMPLIMENTARY', trans_date='".date('Y-m-d H:i:s')."', status_message='Cheat Code Used' WHERE id='$order_id'");

    $redirect_url_early = '/events/oct-nq-2026/success?status=Success' .
                          '&order_id=' . urlencode($order_id) .
                          '&amount=0' .
                          '&tracking_id=COMPLIMENTARY' .
                          '&status_message=' . urlencode('Cheat Code Used');
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
    $ageProofLink = !empty($ageProofPath) ? "https://hprc.in/payment/view_proof.php?file=" . urlencode(basename($ageProofPath)) : "";
    $ageProofLink2 = !empty($ageProofPath2) ? "https://hprc.in/payment/view_proof.php?file=" . urlencode(basename($ageProofPath2)) : "";

    $eventMapping = [
        1 => "Dressage - Children II", 2 => "Dressage - Children I", 3 => "Dressage - Junior", 4 => "Dressage - Young Rider",
        5 => "SJ Children II (0.80m)", 6 => "SJ Children I (0.90m)", 7 => "SJ Junior (1.05m)", 8 => "SJ Young Rider (1.15m)",
        9 => "Practice Round 0.80-0.90m"
    ];

    $selectedIds = json_decode($selectedEvents, true) ?: [];
    $horseData = json_decode($eventHorses, true) ?: [];
    $efiData = json_decode($eventHorseEfi, true) ?: [];
    $readableEvents = []; $readableHorses = [];

    foreach ($selectedIds as $id) {
        $category = isset($eventMapping[$id]) ? $eventMapping[$id] : "Event #$id";
        $readableEvents[] = $category;
        $horses = isset($horseData[$id]) ? (is_array($horseData[$id]) ? $horseData[$id] : [$horseData[$id]]) : ["N/A"];
        $efis = isset($efiData[$id]) ? (is_array($efiData[$id]) ? $efiData[$id] : [$efiData[$id]]) : [];

        $formattedHorses = [];
        $isMultiple = count($horses) > 1;
        foreach ($horses as $idx => $hName) {
            $label = $isMultiple ? ("Horse " . ($idx + 1) . ": " . $hName) : $hName;
            if (!empty($efis[$idx])) {
                $label .= " (EFI: " . $efis[$idx] . ")";
            }
            $formattedHorses[] = $label;
        }
        $readableHorses[] = $category . ": [" . implode(" | ", $formattedHorses) . "]";
    }

    $fullData = [
        'order_id' => $order_id,
        'tracking_id' => 'COMPLIMENTARY',
        'bank_ref_no' => 'N/A',
        'order_status' => 'Success',
        'failure_message' => 'Cheat Code Used',
        'payment_mode' => 'COMPLIMENTARY',
        'card_name' => 'N/A',
        'status_code' => 'N/A',
        'status_message' => 'Cheat Code Used',
        'currency' => 'INR',
        'amount' => 0,
        'billing_name' => $name,
        'billing_address' => $address,
        'billing_city' => '',
        'billing_state' => '',
        'billing_zip' => '',
        'billing_country' => 'India',
        'billing_tel' => $mobile,
        'billing_email' => $email,
        'delivery_name' => $parentName,
        'delivery_address' => '',
        'delivery_city' => '',
        'delivery_state' => '',
        'delivery_zip' => '',
        'delivery_country' => '',
        'delivery_tel' => $emergencyContact,
        'merchant_param1' => $clubName,
        'merchant_param2' => $dob,
        'merchant_param3' => implode(", ", $readableEvents),
        'merchant_param4' => implode(" | ", $readableHorses),
        'merchant_param5' => "Stables: $stablingType ($stablingCount) from $stablingFrom to $stablingTo",
        'vault' => 'N',
        'offer_type' => 'null',
        'offer_code' => 'null',
        'discount_value' => '0.0',
        'mer_amount' => 0,
        'eci_value' => 'null',
        'retry' => 'N',
        'response_code' => '0',
        'billing_notes' => "Emergency: $emergencyContact ($emergencyRelation)",
        'trans_date' => date('d/m/Y H:i:s'),
        'age_proof_link' => $ageProofLink,
        'age_proof_link2' => $ageProofLink2,
        'efi_rider_id' => $efiRiderId,
        'is_indian' => $isIndian,
        'event_horse_efi' => $eventHorseEfi,
        'edition' => 'HPRC NQ October 2026'
    ];

    $ch = curl_init($webhook_url);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fullData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $webhook_response = curl_exec($ch);
    curl_close($ch);

    $emailData = [
        'name' => $name,
        'parentName' => $parentName,
        'dob' => $dob,
        'email' => $email,
        'mobile' => $mobile,
        'clubName' => $clubName,
        'emergencyContact' => $emergencyContact,
        'emergencyRelation' => $emergencyRelation,
        'events' => implode(" | ", $readableEvents),
        'eventHorses' => implode("<br>", $readableHorses),
        'stablingType' => $stablingType,
        'stablingCount' => $stablingCount,
        'stablingFrom' => $stablingFrom,
        'stablingTo' => $stablingTo,
        'ageProofPath' => $ageProofPath,
        'ageProofPath2' => $ageProofPath2,
        'amount' => 0,
        'efiRiderId' => $efiRiderId,
        'isIndian' => $isIndian
    ];

    $userSubject = "Entry Confirmation - National Qualifier (NQ) October 2026 - Order #$order_id";
    $userBody = get_success_email_body($name, $order_id, 0, 'COMPLIMENTARY', $emailData);
    $attachments = [];
    $etiquettePath = __DIR__ . '/../public/events/oct-nq2026/HPRC_National_Qualifier_2026_Etiquette_Conduct_Guidelines.pdf';
    if (file_exists($etiquettePath)) {
        $attachments[] = [
            'path' => $etiquettePath,
            'name' => 'HPRC_National_Qualifier_2026_Etiquette_Conduct_Guidelines.pdf'
        ];
    }
    send_hprc_email($email, $name, $userSubject, $userBody, $attachments);

    $adminSubject = "New Entry (Complimentary): National Qualifier October 2026 - $name (Order #$order_id)";
    $adminBody = get_admin_notification_body($emailData, $order_id, 'COMPLIMENTARY');
    send_hprc_email('info@hprc.co.in', 'HPRC Admin', $adminSubject, $adminBody);

    exit;
}
?>
<form method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"> 
<?php
echo "<input type=hidden name=encRequest value=$encrypted_data>";
echo "<input type=hidden name=access_code value=$access_code>";
?>
</form>
<script language='javascript'>document.redirect.submit();</script>
