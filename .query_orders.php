<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require('/home/ubuntu/shahzoor/hprc.in/payment/dbconnect.php');

// Revert test data
$conn->query("UPDATE orders SET tracking_id=NULL, bank_ref_no=NULL, payment_mode=NULL, status_message=NULL, order_status=NULL, trans_date=NULL WHERE order_id=3262");
echo "Reverted order 3262\n";

// Check last orders again to see if any have data
$r = $conn->query("SELECT order_id, name, order_status, tracking_id, payment_mode, record_date FROM orders ORDER BY order_id DESC LIMIT 10");
echo "\nLast 10 orders:\n";
while ($row = $r->fetch_assoc()) {
    $has_status = $row['order_status'] ? 'YES' : 'NO';
    echo "  #{$row['order_id']} | {$row['name']} | status={$row['order_status']} | tracking={$row['tracking_id']} | has_callback={$has_status} | {$row['record_date']}\n";
}
?>
