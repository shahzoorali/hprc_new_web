<?php
// Rebuild October Camp 2026 stabling inventory JSON from MySQL nq_oct_2026 table.
//
// CLI: php rebuild_oct_camp_inventory.php
// HTTP: /payment/scripts/rebuild_oct_camp_inventory.php?token=...

require_once __DIR__ . '/../api/admin/_auth.php';
require_once __DIR__ . '/../dbconnect.php';
require_once __DIR__ . '/../InventoryManagerOctCamp.php';

if (php_sapi_name() !== 'cli') {
    require_admin_token();
}

$im = new InventoryManagerOctCamp();
list($ok, $message) = $im->rebuildFromDB($conn);

$stamp = date('Y-m-d H:i:s');
if ($ok) {
    echo "[$stamp] Rebuild OK — $message\n";
    exit(0);
} else {
    echo "[$stamp] Rebuild FAILED — $message\n";
    exit(1);
}
