<?php
require 'public/payment/dbconnect.php';
$res = $conn->query('SELECT name, dob, tracking_id FROM ec2026 WHERE dob IS NOT NULL AND dob != ""');
$mapping = [];
while($row = $res->fetch_assoc()) {
    $mapping[] = [
        "name" => $row['name'],
        "dob" => $row['dob'],
        "tracking_id" => $row['tracking_id']
    ];
}
echo json_encode($mapping, JSON_PRETTY_PRINT);
?>
