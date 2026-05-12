<?php
require("dbconnect.php");

// Find order by name and email
$name = isset($_GET['name']) ? $_GET['name'] : 'Faizan khan';
$email = isset($_GET['email']) ? $_GET['email'] : 'stallionhorseridingacademy.shra@gmail.com';

$result = $conn->query("SELECT id, name, email, mobile, amount, order_status FROM ec2026 WHERE name LIKE '%$name%' OR email LIKE '%$email%' ORDER BY id DESC LIMIT 10");

if (!$result || $result->num_rows === 0) {
    die("No orders found for: $name / $email");
}

echo "<h2>Found Orders:</h2>";
echo "<table border='1' cellpadding='10'>";
echo "<tr><th>Order ID</th><th>Name</th><th>Email</th><th>Mobile</th><th>Amount</th><th>Status</th></tr>";

while ($row = $result->fetch_assoc()) {
    $id = $row['id'];
    $link = "resend_webhook.php?order_id=$id";
    echo "<tr>";
    echo "<td><a href='$link' target='_blank'><strong>$id</strong></a></td>";
    echo "<td>{$row['name']}</td>";
    echo "<td>{$row['email']}</td>";
    echo "<td>{$row['mobile']}</td>";
    echo "<td>₹{$row['amount']}</td>";
    echo "<td>{$row['order_status']}</td>";
    echo "</tr>";
}
echo "</table>";
?>
