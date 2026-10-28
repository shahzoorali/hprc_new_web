<?php
// HPRC club tournaments — payment response handler, shared by every edition.
// The edition is read back from the stored row (`tournament` column), so the
// confirmation email and the redirect page match the form the player used.

set_time_limit(120);
ini_set('default_socket_timeout', 30);

include('crypto.php');
require("dbconnect.php");
require("mailer.php");
require("email_templates.php");
require_once("club_tournaments.php");
error_reporting(0);

$workingKey='00A39923BC821061266C29348FF5A3F0'; //HDFC CCAvenue
$encResponse=$_POST["encResp"];
$rcvdString=decrypt($encResponse,$workingKey);
$decryptValues=explode('&', $rcvdString);

$tracking_id = ''; $bank_ref_no = ''; $payment_mode = ''; $status_message = '';
$trans_date = ''; $order_id = ''; $mer_amount = ''; $order_status = '';

foreach ($decryptValues as $pair) {
    $information = explode('=', $pair);
    $label = $information[0];
    $val = isset($information[1]) ? $information[1] : '';
    if ($label == 'order_id') $order_id = $val;
    else if ($label == 'tracking_id') $tracking_id = $val;
    else if ($label == 'mer_amount') $mer_amount = $val;
    else if ($label == 'trans_date') $trans_date = $val;
    else if ($label == 'bank_ref_no') $bank_ref_no = $val;
    else if ($label == 'payment_mode') $payment_mode = $val;
    else if ($label == 'status_message') $status_message = $val;
    else if ($label == 'order_status') $order_status = $val;
}

$pagePath = '/events';

if ($order_id) {
    $oid = $conn->real_escape_string($order_id);
    $checkResult = $conn->query("SELECT order_status FROM club_tournament_entries WHERE id='$oid'");
    $currentData = ($checkResult && $checkResult->num_rows > 0) ? $checkResult->fetch_assoc() : null;
    $isDuplicateHit = ($currentData && $currentData['order_status'] === $order_status);

    $conn->query("UPDATE club_tournament_entries SET tracking_id='".$conn->real_escape_string($tracking_id)."',
                    bank_ref_no='".$conn->real_escape_string($bank_ref_no)."',
                    payment_mode='".$conn->real_escape_string($payment_mode)."',
                    status_message='".$conn->real_escape_string($status_message)."',
                    order_status='".$conn->real_escape_string($order_status)."',
                    trans_date='".$conn->real_escape_string($trans_date)."'
                    WHERE id='$oid'");

    $res = $conn->query("SELECT tournament, name, email, mobile, membershipNo, handicap, photoPath FROM club_tournament_entries WHERE id='$oid'");
    $row = ($res && $res->num_rows > 0) ? $res->fetch_assoc() : null;
    $tournament = $row ? club_tournament($row['tournament']) : null;

    if ($tournament) {
        $pagePath = $tournament['pagePath'];
        $eventName = $tournament['name'] . ' (' . $tournament['label'] . ')';
        $tag = strtoupper($tournament['sport']);

        if (!$isDuplicateHit) {
            if ($order_status === "Success" || $order_status === "Successful") {
                if (!empty($row['email'])) {
                    $details = ["events" => $tournament['label'] . ", Handicap: " . $row['handicap']];
                    $htmlBody = get_success_email_body($row['name'], $order_id, $mer_amount, $tracking_id, $details, $eventName, $tournament['dates']);
                    send_hprc_email($row['email'], $row['name'], "Registration Confirmed - $eventName", $htmlBody);
                }
                $n = htmlspecialchars($row['name']);
                $m = htmlspecialchars($row['mobile']);
                $e = htmlspecialchars($row['email']);
                $mn = htmlspecialchars($row['membershipNo']);
                $h = htmlspecialchars($row['handicap']);
                $attachment = !empty($row['photoPath']) ? __DIR__ . '/' . $row['photoPath'] : null;
                $adminHtml = "<h3>New registration: " . htmlspecialchars($eventName) . " (#$order_id)</h3><table cellpadding='6'>"
                    . "<tr><td>Name</td><td>$n</td></tr><tr><td>Mobile</td><td>$m</td></tr>"
                    . "<tr><td>Email</td><td>$e</td></tr><tr><td>Membership No.</td><td>$mn</td></tr>"
                    . "<tr><td>Handicap / level</td><td>$h</td></tr>"
                    . "<tr><td>Amount</td><td>Rs $mer_amount</td></tr><tr><td>Tracking ID</td><td>$tracking_id</td></tr></table>";
                send_admin_notification("NEW REGISTRATION ($tag): {$row['name']} (#$order_id)", $adminHtml, $attachment);
            } else if (!empty($row['email'])) {
                $htmlBody = get_failed_email_body($row['name'], $order_id, $status_message, $eventName);
                send_hprc_email($row['email'], $row['name'], "Payment Notification - $eventName", $htmlBody);
            }
        }
    }
}

header("Location: " . $pagePath . "/success?status=" . urlencode($order_status) .
    '&order_id=' . urlencode($order_id) . '&amount=' . urlencode($mer_amount) .
    '&tracking_id=' . urlencode($tracking_id) . '&status_message=' . urlencode($status_message));
exit();
?>
