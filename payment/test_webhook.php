<?php
/**
 * Quick Test script for Google Sheets Webhook
 */

$webhook_url = "https://script.google.com/macros/s/AKfycbzw65SAMdxZpVqp5TcIKvcLIZVdDDcybqkMAUnjM7-wSqvjmo0Pw2Lgz7nC_2ttDN33/exec";

$data = array(
    "name" => "Antigravity Test Rider",
    "parentName" => "Test Parent",
    "dob" => "2010-05-16",
    "address" => "HPRC Grounds, Hyderabad",
    "mobile" => "9999988888",
    "email" => "test@hprc.in",
    "emergencyContact" => "8888877777",
    "emergencyRelation" => "Coach",
    "clubName" => "Hyderabad Polo & Riding Club",
    "events" => "[6, 9]", // SJ 40cm, SJ 60cm
    "eventHorses" => '{"6":"Thunderbolt","9":"Spirit"}',
    "stablingType" => "TEMPORARY",
    "stablingCount" => 1,
    "stablingFrom" => "2026-05-14",
    "stablingTo" => "2026-05-17",
    "ageProofLink" => "https://hprc.in/payment/uploads/test_id.jpg",
    "amount" => "4600",
    "tracking_id" => "TRK_TEST_BETA_001"
);

echo "Sending test data to Google Sheets...<br>";
echo "<pre>" . json_encode($data, JSON_PRETTY_PRINT) . "</pre>";

$options = array(
    'http' => array(
        'header'  => "Content-type: application/json\r\n",
        'method'  => 'POST',
        'content' => json_encode($data),
        'follow_location' => true
    )
);

$context  = stream_context_create($options);
$response = @file_get_contents($webhook_url, false, $context);

if ($response === FALSE) {
    $error = error_get_last();
    echo "<b>Error:</b> " . $error['message'];
} else {
    echo "<br><b>Server Response:</b> " . htmlspecialchars($response);
}
?>
