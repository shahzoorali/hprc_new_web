<?php
// HPRC Club Championship (Polo Tournament) 29 Oct - 1 Nov 2026 — payment response handler.
// Table `polo_oct2026`; redirects to /events/hprc-club-championship-oct-26/success.

set_time_limit(120);
ini_set('default_socket_timeout', 30);

include('crypto.php');
require("dbconnect.php");
require("mailer.php");
require("email_templates.php");
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

$eventName = "HPRC Club Championship (Polo Tournament)";

if ($order_id) {
    $oid = $conn->real_escape_string($order_id);
    $checkResult = $conn->query("SELECT order_status FROM polo_oct2026 WHERE id='$oid'");
    $currentData = ($checkResult && $checkResult->num_rows > 0) ? $checkResult->fetch_assoc() : null;
    $isDuplicateHit = ($currentData && $currentData['order_status'] === $order_status);

    $conn->query("UPDATE polo_oct2026 SET tracking_id='".$conn->real_escape_string($tracking_id)."',
                    bank_ref_no='".$conn->real_escape_string($bank_ref_no)."',
                    payment_mode='".$conn->real_escape_string($payment_mode)."',
                    status_message='".$conn->real_escape_string($status_message)."',
                    order_status='".$conn->real_escape_string($order_status)."',
                    trans_date='".$conn->real_escape_string($trans_date)."'
                    WHERE id='$oid'");

    $res = $conn->query("SELECT name, email, mobile, membershipNo, handicap, photoPath FROM polo_oct2026 WHERE id='$oid'");
    $row = ($res && $res->num_rows > 0) ? $res->fetch_assoc() : null;

    if ($row && !$isDuplicateHit) {
        if ($order_status === "Success" || $order_status === "Successful") {
            if (!empty($row['email'])) {
                $details = ["events" => "Polo Tournament, Handicap: " . $row['handicap']];
                $htmlBody = get_success_email_body($row['name'], $order_id, $mer_amount, $tracking_id, $details, $eventName, "29th October to 1st November 2026");
                send_hprc_email($row['email'], $row['name'], "Registration Confirmed - $eventName", $htmlBody);
            }
            $n = htmlspecialchars($row['name']);
            $m = htmlspecialchars($row['mobile']);
            $e = htmlspecialchars($row['email']);
            $mn = htmlspecialchars($row['membershipNo']);
            $h = htmlspecialchars($row['handicap']);
            $attachment = !empty($row['photoPath']) ? __DIR__ . '/' . $row['photoPath'] : null;
            $adminHtml = "<h3>New polo registration (#$order_id)</h3><table cellpadding='6'>"
                . "<tr><td>Name</td><td>$n</td></tr><tr><td>Mobile</td><td>$m</td></tr>"
                . "<tr><td>Email</td><td>$e</td></tr><tr><td>Membership No.</td><td>$mn</td></tr>"
                . "<tr><td>Handicap / level</td><td>$h</td></tr>"
                . "<tr><td>Amount</td><td>Rs $mer_amount</td></tr><tr><td>Tracking ID</td><td>$tracking_id</td></tr></table>";
            send_admin_notification("NEW REGISTRATION (POLO): {$row['name']} (#$order_id)", $adminHtml, $attachment);
        } else if (!empty($row['email'])) {
            $htmlBody = get_failed_email_body($row['name'], $order_id, $status_message, $eventName);
            send_hprc_email($row['email'], $row['name'], "Payment Notification - $eventName", $htmlBody);
        }
    }
}

header("Location: /events/hprc-club-championship-oct-26/success?status=" . urlencode($order_status) .
    '&order_id=' . urlencode($order_id) . '&amount=' . urlencode($mer_amount) .
    '&tracking_id=' . urlencode($tracking_id) . '&status_message=' . urlencode($status_message));
exit();
?>
