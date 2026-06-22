<?php
// Public API: daily stabling availability for the SHARED August camp ledger
// (National Qualifier + Equestrian Challenge). Both forms call this endpoint.
// GET /payment/api/stabling-available-camp.php?from=2026-08-12&to=2026-08-17

header('Content-Type: application/json');
header('Cache-Control: no-store, must-revalidate');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/../InventoryManagerCamp.php';

$from = isset($_GET['from']) ? $_GET['from'] : '2026-08-12';
$to = isset($_GET['to']) ? $_GET['to'] : '2026-08-17';

if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $from) || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $to)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid date format. Expected YYYY-MM-DD']);
    exit;
}

try {
    $im = new InventoryManagerCamp();
    $result = $im->getAvailability($from, $to);
    echo json_encode($result);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to load inventory']);
    error_log('Stabling API (camp) error: ' . $e->getMessage());
}
