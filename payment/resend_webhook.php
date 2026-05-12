<?php
require("dbconnect.php");

// Usage: call with ?order_id=114503884259
$order_id = isset($_GET['order_id']) ? (int)$_GET['order_id'] : 0;

if (!$order_id) {
    die("Error: order_id required (e.g., ?order_id=114503884259)");
}

// Fetch order details
$result = $conn->query("SELECT name, parentName, dob, address, mobile, email, emergencyContact, emergencyRelation, clubName, selectedEvents, eventHorses, stablingType, stablingCount, stablingFrom, stablingTo, ageProofPath, amount as mer_amount, tracking_id FROM ec2026 WHERE id='$order_id'");

if (!$result || $result->num_rows === 0) {
    die("Error: Order not found");
}

$row = $result->fetch_assoc();

// Event mapping
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

// Base fees
$baseFees = [
    1 => 1500, 2 => 1500, // Hacks
    3 => 2000, 4 => 2000, 5 => 2000, // Dressage
    6 => 2000, 8 => 2000, 9 => 2000, 11 => 2000, 12 => 2000, // SJ
    13 => 2000, 14 => 2000, 15 => 2000, 16 => 2000, 17 => 2000, 20 => 2000, // SJ
    18 => 2000, 19 => 2000, // Top Score
    21 => 1000, 22 => 1000 // Practice
];

$selectedIds = json_decode($row['selectedEvents'], true) ?: [];
$horseData = json_decode($row['eventHorses'], true) ?: [];

$ageProofLink = !empty($row['ageProofPath']) ? "https://hprc.in/payment/view_proof.php?file=" . urlencode(basename($row['ageProofPath'])) : "";

// Webhook URL
$webhook_url = "https://script.google.com/macros/s/AKfycbzw65SAMdxZpVqp5TcIKvcLIZVdDDcybqkMAUnjM7-wSqvjmo0Pw2Lgz7nC_2ttDN33/exec";

// Calculate per-jump fees
$eventTotal = 0;
$calculatedFees = [];
foreach ($selectedIds as $id) {
    $base = isset($baseFees[$id]) ? $baseFees[$id] : 2000;
    $count = isset($horseData[$id]) ? (is_array($horseData[$id]) ? count($horseData[$id]) : 1) : 1;
    $calculatedFees[$id] = $base * $count;
    $eventTotal += $calculatedFees[$id];
}

$stablingBalance = (float)$row['mer_amount'] - $eventTotal;
$isFirstRow = true;

// Fire webhooks (one per jump)
$count = 0;
foreach ($selectedIds as $id) {
    $category = isset($eventMapping[$id]) ? $eventMapping[$id] : "Event #$id";
    $horses = isset($horseData[$id]) ? (is_array($horseData[$id]) ? $horseData[$id] : [$horseData[$id]]) : ["N/A"];
    $base = isset($baseFees[$id]) ? $baseFees[$id] : 2000;

    foreach ($horses as $jumpIdx => $horse) {
        $displayAmount = $base;
        if ($isFirstRow) {
            $displayAmount += $stablingBalance;
            $isFirstRow = false;
        }

        $jumpNumber = $jumpIdx + 1;
        $jumpLabel = (count($horses) > 1) ? " - Jump $jumpNumber" : "";

        $webhookData = array(
            "name" => $row['name'],
            "dob" => $row['dob'],
            "parentName" => $row['parentName'],
            "address" => $row['address'], "mobile" => $row['mobile'], "email" => $row['email'],
            "emergencyContact" => $row['emergencyContact'], "emergencyRelation" => $row['emergencyRelation'],
            "clubName" => $row['clubName'],
            "events" => $category . $jumpLabel,
            "eventHorses" => $horse,
            "stablingType" => $row['stablingType'],
            "stablingCount" => $row['stablingCount'], "stablingFrom" => $row['stablingFrom'],
            "stablingTo" => $row['stablingTo'], "ageProofLink" => $ageProofLink,
            "amount" => $displayAmount, "tracking_id" => $row['tracking_id'] . " (RESENT-#$id-J$jumpNumber)"
        );

        $ch = curl_init($webhook_url);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($webhookData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        $response = curl_exec($ch);
        curl_close($ch);

        $count++;
        echo "✓ Row $count: {$category}{$jumpLabel} | {$horse} | ₹{$displayAmount}<br>";
    }
}

echo "<br><strong>Total rows sent: $count</strong>";
?>
