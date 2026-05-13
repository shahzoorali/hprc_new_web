<?php
require("dbconnect.php");
require("mailer.php");
require("email_templates.php");

$order_id = isset($argv[1]) ? (int)$argv[1] : 0;
$proof_file = isset($argv[2]) ? $argv[2] : '';

if (!$order_id) {
    echo "Usage: php send_recovery_email.php <order_id> [proof_file]\n";
    echo "Example: php send_recovery_email.php 62 /home/ubuntu/shahzoor/hprc.in/payment/proof_62.jpg\n";
    exit(1);
}

// Fetch order
$result = $conn->query("SELECT * FROM ec2026 WHERE id='$order_id'");
if (!$result || $result->num_rows === 0) {
    echo "❌ Order not found: $order_id\n";
    exit(1);
}

$row = $result->fetch_assoc();

// Check if email exists
if (empty($row['email'])) {
    echo "❌ No email address for rider\n";
    exit(1);
}

// Prepare event details
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

$selectedIds = json_decode($row['selectedEvents'], true) ?: [];
$readableEvents = [];
foreach ($selectedIds as $id) {
    $category = isset($eventMapping[$id]) ? $eventMapping[$id] : "Event #$id";
    $readableEvents[] = $category;
}

// Prepare email body from template
$details = ["events" => implode(" | ", $readableEvents)];
$htmlBody = get_success_email_body(
    $row['name'],
    $order_id,
    $row['amount'],
    $row['tracking_id'] ?: 'Manual-Recovery',
    $details
);

// BUILD STABLING SECTION
$stablingSection = "";
if ($row['stablingType'] === 'PERMANENT' && (int)$row['stablingCount'] > 0) {
    $stablingSection = "
    <div style='background: #e8f5f7; border: 1px solid #b3e5fc; padding: 15px; border-radius: 6px; margin: 25px 0;'>
        <h3 style='color: #01579b; margin-top: 0; font-size: 16px;'>🏇 Stabling Booking</h3>
        <table style='width: 100%;'>
            <tr>
                <td style='padding: 8px; color: #666; font-size: 13px; font-weight: bold;'>Type:</td>
                <td style='padding: 8px; color: #1a1a1a;'>" . htmlspecialchars($row['stablingType']) . "</td>
            </tr>
            <tr>
                <td style='padding: 8px; color: #666; font-size: 13px; font-weight: bold;'>Stables:</td>
                <td style='padding: 8px; color: #1a1a1a;'>" . (int)$row['stablingCount'] . " stable(s)</td>
            </tr>
            <tr>
                <td style='padding: 8px; color: #666; font-size: 13px; font-weight: bold;'>Dates:</td>
                <td style='padding: 8px; color: #1a1a1a;'>" . htmlspecialchars($row['stablingFrom']) . " to " . htmlspecialchars($row['stablingTo']) . "</td>
            </tr>
        </table>
    </div>
    ";
}

// BUILD RECOVERY NOTE
$recoveryNote = "<p style='color: #666; font-size: 13px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;'>
    <strong>Payment Recovery Note:</strong><br>
    This registration was processed offline and recovered on " . date('Y-m-d H:i') . ". Your payment has been confirmed and your registration is now active.
</p>";

// COMBINE ALL SECTIONS
$htmlBody .= $stablingSection . $recoveryNote;

// Check attachment
$attachment = null;
if ($proof_file && file_exists($proof_file)) {
    $attachment = $proof_file;
}

// LIST OF RECIPIENTS
$recipients = [
    ['email' => $row['email'], 'name' => $row['name'], 'type' => 'Rider'],
    ['email' => 'info@hprc.co.in', 'name' => 'HPRC Info', 'type' => 'Admin'],
    ['email' => 'hprc@bbin.in', 'name' => 'HPRC Admin', 'type' => 'Admin'],
    ['email' => 'vinitha.venkat@gmail.com', 'name' => 'Vinitha Venkat', 'type' => 'Admin']
];

// SEND TO ALL RECIPIENTS
echo "📧 Sending confirmation email...\n\n";
$successCount = 0;
foreach ($recipients as $recipient) {
    $toName = ($recipient['type'] === 'Rider') ? $recipient['name'] : $recipient['name'];
    
    send_hprc_email(
        $recipient['email'],
        $toName,
        "Registration Confirmed - HPRC Equestrian Challenge 2026",
        $htmlBody,
        "",
        $attachment
    );
    
    echo "✅ Sent to {$recipient['type']}: {$recipient['email']}\n";
    $successCount++;
}

echo "\n✅ CONFIRMATION EMAIL SENT TO {$successCount} RECIPIENTS\n";
echo "   Rider: {$row['email']}\n";
echo "   Admin: info@hprc.co.in\n";
echo "   Admin: hprc@bbin.in\n";
echo "   Admin: vinitha.venkat@gmail.com\n";
echo "\n   Order: $order_id\n";
echo "   Rider: {$row['name']}\n";
echo "   Amount: ₹{$row['amount']}\n";
echo "   Stabling: {$row['stablingCount']} stables ({$row['stablingFrom']} to {$row['stablingTo']})\n";
if ($attachment) echo "   Proof attached: ✓\n";
?>
