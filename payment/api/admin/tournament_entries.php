<?php
// GET ?tournament=<slug>&status=&q=&from=&to=
// Entries for one club-tournament edition, newest first.

require_once __DIR__ . '/_auth.php';
require_once __DIR__ . '/_event_maps.php';
require_once __DIR__ . '/_tournaments.php';
require_once __DIR__ . '/../../dbconnect.php';

require_admin_token();
admin_json_headers();

list($slug, $cfg) = admin_require_tournament();

$result = $conn->query("SELECT * FROM `club_tournament_entries` " . admin_tournament_where($conn, $slug) . " ORDER BY id DESC");
if (!$result) {
    http_response_code(500);
    echo json_encode(['error' => 'Query failed']);
    exit;
}

$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = [
        'id'           => (int)$row['id'],
        'name'         => $row['name'],
        'email'        => $row['email'],
        'mobile'       => $row['mobile'],
        'membershipNo' => $row['membershipNo'],
        'handicap'     => $row['handicap'],
        'amount'       => $row['amount'],
        'order_status' => $row['order_status'],
        'isSuccess'    => admin_is_success($row['order_status']),
        'hasPhoto'     => !empty($row['photoPath']),
        'created_at'   => $row['created_at'],
    ];
}

echo json_encode($rows);
