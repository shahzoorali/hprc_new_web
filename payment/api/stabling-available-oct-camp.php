<?php
// Public API: daily stabling availability for the ISOLATED October 2026 camp ledger
// (National Qualifier October 2026).
// GET /payment/api/stabling-available-oct-camp.php?from=2026-10-14&to=2026-10-19

header('Content-Type: application/json');
header('Cache-Control: no-store, must-revalidate');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/../InventoryManagerOctCamp.php';

$from = isset($_GET['from']) ? $_GET['from'] : '2026-10-14';
$to = isset($_GET['to']) ? $_GET['to'] : '2026-10-19';

if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $from) || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $to)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid date format. Expected YYYY-MM-DD']);
    exit;
}

try {
    $im = new InventoryManagerOctCamp();
    $result = $im->getAvailability($from, $to);
    echo json_encode($result);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to load inventory']);
    error_log('Stabling API (oct camp) error: ' . $e->getMessage());
}
