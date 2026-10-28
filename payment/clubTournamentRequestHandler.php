<?php
// HPRC club tournaments (members only, individual players, fixed fee) — payment
// request handler, shared by every edition. The form posts a hidden `tournament`
// slug; name, fee, open/closed state and the redirect page come from
// club_tournaments.php, never from the browser. Table `club_tournament_entries`.
// CCAvenue credentials are the shared HDFC MID (same as tsec2026).

set_time_limit(120);
ini_set('default_socket_timeout', 30);

include('crypto.php');
require("dbconnect.php");
require_once("club_tournaments.php");

$slug = isset($_POST['tournament']) ? trim($_POST['tournament']) : '';
$tournament = club_tournament($slug);
if (!$tournament) {
    error_log("CLUB_TOURNAMENT: Rejected unknown tournament '" . $slug . "'.");
    http_response_code(400);
    exit('Unknown tournament.');
}
if (empty($tournament['registrationOpen'])) {
    header("Location: " . $tournament['pagePath'] . "#register");
    exit();
}

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$mobile = isset($_POST['mobile']) ? trim($_POST['mobile']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$membershipNo = isset($_POST['membershipNo']) ? trim($_POST['membershipNo']) : '';
$handicap = isset($_POST['handicap']) ? trim($_POST['handicap']) : '';

// Fee is fixed server-side; never trust a posted amount.
$amount = (int)$tournament['fee'];
$currency = "INR";

if ($name === '' || $mobile === '' || $email === '' || $membershipNo === '' || $handicap === '') {
    error_log("CLUB_TOURNAMENT ($slug): Rejected incomplete submission.");
    http_response_code(400);
    exit('Missing required fields.');
}

// Player photo upload: images only, max 5 MB, validated by content not just name.
$photoPath = '';
if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
    $ext = strtolower(pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION));
    $info = @getimagesize($_FILES['photo']['tmp_name']);
    if (in_array($ext, ['jpg', 'jpeg', 'png', 'webp']) && $info !== false && $_FILES['photo']['size'] <= 5 * 1024 * 1024) {
        $uploadDir = __DIR__ . '/uploads/club_tournaments/photos/';
        if (!is_dir($uploadDir) && !mkdir($uploadDir, 0755, true)) {
            error_log("CLUB_TOURNAMENT: Failed to create upload directory: " . $uploadDir);
        }
        $fileName = $slug . '_' . preg_replace('/[^a-zA-Z0-9]/', '_', $name) . '_' . time() . '.' . $ext;
        if (move_uploaded_file($_FILES['photo']['tmp_name'], $uploadDir . $fileName)) {
            $photoPath = 'uploads/club_tournaments/photos/' . $fileName;
        } else {
            error_log("CLUB_TOURNAMENT: Failed to move photo to " . $uploadDir . $fileName);
        }
    } else {
        error_log("CLUB_TOURNAMENT ($slug): Rejected photo upload for $name (type/size).");
    }
}

$sql = "INSERT INTO club_tournament_entries (tournament, name, mobile, email, membershipNo, handicap, photoPath, amount, currency)
        VALUES ('".$conn->real_escape_string($slug)."',
                '".$conn->real_escape_string($name)."',
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
$merchant_data.='redirect_url=https://hprc.in/payment/clubTournamentResponseHandler.php&';
$merchant_data.='cancel_url=https://hprc.in/payment/clubTournamentResponseHandler.php&';
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
