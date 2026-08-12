<?php
// ── ONE-OFF MANUAL RECONCILIATION SCRIPT ────────────────────────────────────
// Use this ONLY when CCAvenue's callback to ecaug2026ResponseHandler.php never
// landed, but the bank/gateway dashboard confirms the payment actually
// succeeded (Bank Message: SUCCESS). It replays the exact same success path
// as ecaug2026ResponseHandler.php: DB update, stabling deduction, rider email,
// admin email, and the Google Sheet webhook — for ONE specific order id.
//
// SAFETY:
//   - Refuses to run unless order_status IS NULL (won't double-process).
//   - Refuses to run unless the email you pass matches the row's email.
//   - Does NOT touch any other row.
//
// USAGE (run on the server, from the payment/ directory):
//   php reconcileOrderEcAug.php <order_id> <email> <bank_ref_no> <tracking_id> <trans_date "YYYY-MM-DD HH:MM:SS">
//
// Example (using the HDFC dashboard data for this incident):
//   php reconcileOrderEcAug.php 10 bujjipiku@yahoo.com 163023449214 163023449214 "2026-08-07 19:42:22"
//
// If CCAvenue's own tracking ID is different from the bank ref, pass that as
// <tracking_id> instead of repeating the bank ref.

if (php_sapi_name() !== 'cli') {
    http_response_code(403);
    die("This script is CLI-only. Run it via `php reconcileOrderEcAug.php ...` on the server.\n");
}

if ($argc < 6) {
    fwrite(STDERR, "Usage: php reconcileOrderEcAug.php <order_id> <email> <bank_ref_no> <tracking_id> <trans_date>\n");
    exit(1);
}

[$scriptName, $order_id, $expectedEmail, $bank_ref_no, $tracking_id, $trans_date] = $argv;
$order_id = (int)$order_id;
$payment_mode = 'UPI';
$order_status = 'Success';
$status_message = 'Manually reconciled — bank/gateway dashboard confirmed SUCCESS, CCAvenue callback never landed.';

require("dbconnect.php");
require("mailer.php");
require("email_templates.php");
require_once("InventoryManagerCamp.php");

$checkResult = $conn->query("SELECT * FROM ecaug2026 WHERE id='" . $conn->real_escape_string($order_id) . "'");
if (!$checkResult || $checkResult->num_rows === 0) {
    fwrite(STDERR, "No row found in ecaug2026 with id=$order_id\n");
    exit(1);
}
$row = $checkResult->fetch_assoc();

if (strcasecmp($row['email'], $expectedEmail) !== 0) {
    fwrite(STDERR, "Email mismatch: row has '{$row['email']}', you passed '$expectedEmail'. Aborting — wrong order id?\n");
    exit(1);
}

if (!is_null($row['order_status']) && $row['order_status'] !== '') {
    fwrite(STDERR, "order_status is already '{$row['order_status']}' — refusing to reprocess. Remove this guard manually if you're certain.\n");
    exit(1);
}

echo "Row found: #{$order_id} — {$row['name']} <{$row['email']}> — amount {$row['amount']}\n";
echo "About to mark this as Success and fire the full success flow (email, admin notice, webhook, stabling deduction). Ctrl+C now to abort.\n";
echo "Continuing in 5 seconds...\n";
sleep(5);

$mer_amount = $row['amount'];

$updatesql = "UPDATE ecaug2026 SET tracking_id='" . $conn->real_escape_string($tracking_id) . "',
                bank_ref_no='" . $conn->real_escape_string($bank_ref_no) . "',
                payment_mode='" . $conn->real_escape_string($payment_mode) . "',
                status_message='" . $conn->real_escape_string($status_message) . "',
                order_status='" . $conn->real_escape_string($order_status) . "',
                trans_date='" . $conn->real_escape_string($trans_date) . "'
                WHERE id='" . $conn->real_escape_string($order_id) . "'";
$conn->query($updatesql);
echo "DB row updated.\n";

// Stabling deduction (only if this order booked stables).
if ($row['stablingType'] !== 'NONE'
    && (int)$row['stablingCount'] > 0
    && !empty($row['stablingFrom'])
    && !empty($row['stablingTo'])) {
    $im = new InventoryManagerCamp();
    $im->deductInventory(
        $order_id,
        $row['name'],
        (int)$row['stablingCount'],
        $row['stablingFrom'],
        $row['stablingTo'],
        'ec'
    );
    echo "Stabling inventory deducted.\n";
}

$ageProofLink = !empty($row['ageProofPath']) ? "https://hprc.in/payment/view_proof.php?file=" . urlencode(basename($row['ageProofPath'])) : "";

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

$selectedIds = json_decode($row['selectedEvents'], true) ?: [];
$horseData = json_decode($row['eventHorses'], true) ?: [];
$breedMap = json_decode($row['horseBreeds'], true) ?: [];
$readableEvents = []; $readableHorses = [];

foreach ($selectedIds as $id) {
    $category = isset($eventMapping[$id]) ? $eventMapping[$id] : "Event #$id";
    $readableEvents[] = $category;
    $horses = isset($horseData[$id]) ? (is_array($horseData[$id]) ? $horseData[$id] : [$horseData[$id]]) : ["N/A"];
    $readableHorses[] = $category . ": (" . implode(", ", $horses) . ")";
}

$eventList = implode(" | ", $readableEvents);
$horseList = implode(" | ", $readableHorses);

// Rider confirmation email.
if (!empty($row['email'])) {
    $details = ["events" => $eventList];
    $htmlBody = get_success_email_body($row['name'], $order_id, $mer_amount, $tracking_id, $details);
    $etiquettePath = __DIR__ . '/../public/events/ecaug2026/HPRC_Equestrian_Challenge_2026_Etiquette_Conduct_Guidelines.pdf';
    send_hprc_email($row['email'], $row['name'], "Registration Confirmed - HPRC Equestrian Challenge 2026 (August)", $htmlBody, "", $etiquettePath);
    echo "Rider confirmation email sent to {$row['email']}.\n";
}

// Admin notification.
$adminData = $row;
$adminData['events'] = $eventList;
$adminData['eventHorses'] = $horseList;
$adminData['amount'] = $mer_amount;
$adminHtml = get_admin_notification_body($adminData, $order_id, $tracking_id);
$attachment = !empty($row['ageProofPath']) ? __DIR__ . '/' . $row['ageProofPath'] : null;
send_admin_notification("NEW REGISTRATION (AUG, MANUALLY RECONCILED): {$row['name']} (#{$order_id})", $adminHtml, $attachment);
echo "Admin notification sent.\n";

// Google Sheet webhook — same itemization as the real handler.
$webhook_url = "https://script.google.com/macros/s/AKfycbynK3pTkRLw4Oqp04kAlX0dh0C7_ed6G8P8f3LNrdbpHMTpmI-Q64XyuBDNKMsnuJeN/exec";
$baseFees = [
    1 => 1500, 2 => 1500,
    3 => 2000, 4 => 2000, 5 => 2000,
    6 => 2000, 7 => 2000, 8 => 2000, 9 => 2000, 10 => 2000, 11 => 2000,
    12 => 2000, 13 => 2000, 14 => 2000, 15 => 2000,
    16 => 1000
];

$deadline = strtotime('2026-08-13 18:00:00');
$currentTime = !empty($trans_date) ? strtotime(str_replace('/', '-', $trans_date)) : time();
$postEntry = ($currentTime > $deadline);

$eventTotal = 0;
foreach ($selectedIds as $id) {
    $base = isset($baseFees[$id]) ? $baseFees[$id] : 2000;
    $surcharge = ($postEntry && $id != 16) ? 500 : 0;
    $count = isset($horseData[$id]) ? (is_array($horseData[$id]) ? count($horseData[$id]) : 1) : 1;
    $eventTotal += ($base + $surcharge) * $count;
}

$stablingBalance = (float)$mer_amount - $eventTotal;
$isFirstRow = true;

foreach ($selectedIds as $id) {
    $category = isset($eventMapping[$id]) ? $eventMapping[$id] : "Event #$id";
    $horses = isset($horseData[$id]) ? (is_array($horseData[$id]) ? $horseData[$id] : [$horseData[$id]]) : ["N/A"];
    $base = isset($baseFees[$id]) ? $baseFees[$id] : 2000;
    $surcharge = ($postEntry && $id != 16) ? 500 : 0;
    $perJumpFee = $base + $surcharge;

    foreach ($horses as $jumpIdx => $horse) {
        $displayAmount = $perJumpFee;
        if ($isFirstRow) {
            $displayAmount += $stablingBalance;
            $isFirstRow = false;
        }

        $jumpNumber = $jumpIdx + 1;
        $jumpLabel = (count($horses) > 1) ? " - Jump $jumpNumber" : "";

        $webhookData = array(
            "edition" => "HPRC EC Aug 2026",
            "name" => $row['name'],
            "dob" => $row['dob'],
            "parentName" => $row['parentName'],
            "address" => $row['address'], "mobile" => $row['mobile'], "email" => $row['email'],
            "emergencyContact" => $row['emergencyContact'], "emergencyRelation" => $row['emergencyRelation'],
            "clubName" => $row['clubName'],
            "events" => $category . $jumpLabel,
            "eventHorses" => $horse,
            "breed" => isset($breedMap[$horse]) ? $breedMap[$horse] : "",
            "stablingType" => $row['stablingType'],
            "stablingCount" => $row['stablingCount'], "stablingFrom" => $row['stablingFrom'],
            "stablingTo" => $row['stablingTo'], "ageProofLink" => $ageProofLink,
            "amount" => $displayAmount, "tracking_id" => $tracking_id . " (#$id-J$jumpNumber) [MANUAL RECONCILE]"
        );

        $ch = curl_init($webhook_url);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($webhookData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_exec($ch);
        curl_close($ch);
    }
}

echo "Google Sheet webhook fired.\n";
echo "Done. Order #$order_id reconciled as Success.\n";
