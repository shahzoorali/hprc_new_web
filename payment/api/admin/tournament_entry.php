<?php
// GET ?id=  ->  one club-tournament entry with every column, the edition's
// display config, and a photoPath pointer (the Next.js proxy resolves it through
// document.php with event=club&dir=photos).

require_once __DIR__ . '/_auth.php';
require_once __DIR__ . '/_event_maps.php';
require_once __DIR__ . '/_tournaments.php';
require_once __DIR__ . '/../../dbconnect.php';

require_admin_token();
admin_json_headers();

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Bad request']);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM `club_tournament_entries` WHERE id = ? LIMIT 1");
$stmt->bind_param('i', $id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result ? $result->fetch_assoc() : null;

if (!$row) {
    http_response_code(404);
    echo json_encode(['error' => 'Not found']);
    exit;
}

$cfg = club_tournament($row['tournament']);

$row['id']         = (int)$row['id'];
$row['isSuccess']  = admin_is_success($row['order_status']);
$row['photoPath']  = !empty($row['photoPath']) ? $row['photoPath'] : null;
$row['tournamentName'] = $cfg ? $cfg['name'] . ' — ' . $cfg['label'] : $row['tournament'];

echo json_encode($row);
