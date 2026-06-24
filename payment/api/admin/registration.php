<?php
// GET ?event=nq|ec&id=  ->  one full registration record with every column,
// parsed entries, and a documentUrl pointer (the stored relative path; the
// Next.js proxy resolves it through document.php).

require_once __DIR__ . '/_auth.php';
require_once __DIR__ . '/_event_maps.php';
require_once __DIR__ . '/../../dbconnect.php';

require_admin_token();
admin_json_headers();

$event = isset($_GET['event']) ? $_GET['event'] : '';
$id    = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$cfg = admin_event_config($event);
if (!$cfg || $id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Bad request']);
    exit;
}

$table = $cfg['table'];
$map   = $cfg['map'];
$isNq  = $event === 'nq';

$stmt = $conn->prepare("SELECT * FROM `$table` WHERE id = ? LIMIT 1");
$stmt->bind_param('i', $id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result ? $result->fetch_assoc() : null;

if (!$row) {
    http_response_code(404);
    echo json_encode(['error' => 'Not found']);
    exit;
}

$entries = admin_parse_entries(
    $map,
    $row['selectedEvents'] ?? null,
    $row['eventHorses'] ?? null,
    $isNq ? ($row['eventHorseEfi'] ?? null) : null
);

// Expose every column raw, plus the derived fields. Documents are referenced by
// their stored relative path; the caller routes that through document.php.
$row['id']           = (int)$row['id'];
$row['isSuccess']    = admin_is_success($row['order_status']);
$row['entries']      = $entries;
$row['entriesCount'] = count($entries);
$row['documentPath'] = !empty($row['ageProofPath']) ? $row['ageProofPath'] : null;
$row['documentPath2'] = !empty($row['ageProofPath2']) ? $row['ageProofPath2'] : null;

echo json_encode($row);
