<?php
// HPRC Club Championship (Polo Tournament) 30-31 Oct 2026 — payment request handler.
// Members only, individual players, fixed fee. Table `polo_oct2026`.
// CCAvenue credentials are the shared HDFC MID (same as tsec2026).

set_time_limit(120);
ini_set('default_socket_timeout', 30);

include('crypto.php');
require("dbconnect.php");

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$mobile = isset($_POST['mobile']) ? trim($_POST['mobile']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$membershipNo = isset($_POST['membershipNo']) ? trim($_POST['membershipNo']) : '';
$handicap = isset($_POST['handicap']) ? trim($_POST['handicap']) : '';

// Fee is fixed server-side; never trust a posted amount.
$amount = 5000;
$currency = "INR";

if ($name === '' || $mobile === '' || $email === '' || $membershipNo === '' || $handicap === '') {
    error_log("POLO_OCT2026: Rejected incomplete submission.");
    http_response_code(400);
    exit('Missing required fields.');
}

// Player photo upload: images only, max 5 MB, validated by content not just name.
$photoPath = '';
if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
    $ext = strtolower(pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION));
    $info = @getimagesize($_FILES['photo']['tmp_name']);
    if (in_array($ext, ['jpg', 'jpeg', 'png', 'webp']) && $info !== false && $_FILES['photo']['size'] <= 5 * 1024 * 1024) {
        $uploadDir = __DIR__ . '/uploads/polo_oct2026/photos/';
        if (!is_dir($uploadDir) && !mkdir($uploadDir, 0755, true)) {
            error_log("POLO_OCT2026: Failed to create upload directory: " . $uploadDir);
        }
        $fileName = preg_replace('/[^a-zA-Z0-9]/', '_', $name) . '_photo_' . time() . '.' . $ext;
        if (move_uploaded_file($_FILES['photo']['tmp_name'], $uploadDir . $fileName)) {
            $photoPath = 'uploads/polo_oct2026/photos/' . $fileName;
        } else {
            error_log("POLO_OCT2026: Failed to move photo to " . $uploadDir . $fileName);
        }
    } else {
        error_log("POLO_OCT2026: Rejected photo upload for $name (type/size).");
    }
}

$sql = "INSERT INTO polo_oct2026 (name, mobile, email, membershipNo, handicap, photoPath, amount, currency)
        VALUES ('".$conn->real_escape_string($name)."',
                '".$conn->real_escape_string($mobile)."',
                '".$conn->real_escape_string($email)."',
                '".$conn->real_escape_string($membershipNo)."',
                '".$conn->real_escape_string($handicap)."',
                '".$conn->real_escape_string($photoPath)."',
                '$amount', '$currency')";
$conn->query($sql);
$order_id = $conn->insert_id;

error_reporting(1);

$merchant_data='order_id='.$order_id.'&';
$merchant_data.='merchant_id=4447589&';
$merchant_data.='amount='.$amount.'&';
$merchant_data.='currency=INR&';
$merchant_data.='redirect_url=https://hprc.in/payment/poloOct2026ResponseHandler.php&';
$merchant_data.='cancel_url=https://hprc.in/payment/poloOct2026ResponseHandler.php&';
$merchant_data.='language=EN&';
$working_key='00A39923BC821061266C29348FF5A3F0';//HDFC CCAvenue
$access_code='AVPP92NE85CC15PPCC';//HDFC CCAvenue

$merchant_data.='billing_name='.$name.'&';
$merchant_data.='billing_tel='.$mobile.'&';
$merchant_data.='billing_email='.$email.'&';

$encrypted_data=encrypt($merchant_data,$working_key);
?>
<html>
<head><title>CCAvenue Payment</title></head>
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
