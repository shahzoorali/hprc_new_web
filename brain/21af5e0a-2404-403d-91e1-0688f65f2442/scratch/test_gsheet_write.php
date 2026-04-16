<?php
$webhook_url = "https://script.google.com/macros/s/AKfycbzw65SAMdxZpVqp5TcIKvcLIZVdDDcybqkMAUnjM7-wSqvjmo0Pw2Lgz7nC_2ttDN33/exec";

$test_data = array(
    "name" => "Antigravity Test",
    "mobile" => "1234567890",
    "amount" => "1500.00",
    "tracking_id" => "TEST_" . time()
);

echo "Sending test data to Google Sheet via Webhook...\n";
echo "Data: " . json_encode($test_data) . "\n\n";

$ch = curl_init($webhook_url);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($test_data));
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Important for Google Apps Script redirects

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    echo "CURL Error: " . curl_error($ch) . "\n";
} else {
    echo "HTTP Status Code: " . $http_code . "\n";
    echo "Response: " . $response . "\n";
}

curl_close($ch);
?>
