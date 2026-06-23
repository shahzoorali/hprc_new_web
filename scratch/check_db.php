<?php
require 'public/payment/dbconnect.php';
$res = $conn->query('SELECT * FROM ec2026 ORDER BY id DESC LIMIT 5');
while($row = $res->fetch_assoc()) {
    echo "ID: " . $row['id'] . "\n";
    echo "Name: " . $row['name'] . "\n";
    echo "Events: " . $row['selectedEvents'] . "\n";
    echo "Horses: " . $row['eventHorses'] . "\n";
    echo "DOB: " . $row['dob'] . "\n";
    echo "Tracking ID: " . $row['tracking_id'] . "\n";
    echo "--------------------------\n";
}
?>
