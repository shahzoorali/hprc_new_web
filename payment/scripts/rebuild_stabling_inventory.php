<?php
// Rebuild EC2026 stabling inventory JSON from MySQL ec2026 table.
// Run manually for first-time init, or via cron nightly:
//   0 0 * * * php /path/to/payment/scripts/rebuild_stabling_inventory.php
//
// CLI: php rebuild_stabling_inventory.php
// HTTP: /payment/scripts/rebuild_stabling_inventory.php?key=YOUR_ADMIN_KEY

$isCli = (php_sapi_name() === 'cli');

if (!$isCli) {
    $envKey = getenv('STABLING_ADMIN_KEY');
    $providedKey = isset($_GET['key']) ? $_GET['key'] : '';
    if (!$envKey || $providedKey !== $envKey) {
        http_response_code(403);
        die('Forbidden');
    }
    header('Content-Type: text/plain');
}

require_once __DIR__ . '/../dbconnect.php';
require_once __DIR__ . '/../InventoryManager.php';

$im = new InventoryManager();
list($ok, $message) = $im->rebuildFromDB($conn);

$stamp = date('Y-m-d H:i:s');
if ($ok) {
    echo "[$stamp] Rebuild OK — $message\n";
    exit(0);
} else {
    echo "[$stamp] Rebuild FAILED — $message\n";
    exit(1);
}
