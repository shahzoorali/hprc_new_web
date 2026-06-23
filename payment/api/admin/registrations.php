<?php
// GET ?event=nq|ec&status=&q=&from=&to=
// Returns a JSON array of registrations, newest first, with parsed entries +
// readable event labels. Server-side filters: order_status, free-text search,
// and created_at date range.

require_once __DIR__ . '/_auth.php';
require_once __DIR__ . '/_event_maps.php';
require_once __DIR__ . '/../../dbconnect.php';

require_admin_token();
admin_json_headers();

$event = isset($_GET['event']) ? $_GET['event'] : '';
$cfg = admin_event_config($event);
if (!$cfg) {
    http_response_code(400);
    echo json_encode(['error' => 'Unknown event']);
    exit;
}

$table = $cfg['table'];
$map   = $cfg['map'];
$isNq  = $event === 'nq';

$where = [];

// Status filter: success (Success|Successful), failed (anything non-success,
// non-null), pending (NULL — payment never completed).
$status = isset($_GET['status']) ? $_GET['status'] : '';
if ($status === 'success') {
    $where[] = "(order_status = 'Success' OR order_status = 'Successful')";
} elseif ($status === 'failed') {
    $where[] = "(order_status IS NOT NULL AND order_status <> 'Success' AND order_status <> 'Successful')";
} elseif ($status === 'pending') {
    $where[] = "order_status IS NULL";
}

// Free-text search across name/email/mobile/clubName.
$q = isset($_GET['q']) ? trim($_GET['q']) : '';
if ($q !== '') {
    $like = "%" . $conn->real_escape_string($q) . "%";
    $where[] = "(name LIKE '$like' OR email LIKE '$like' OR mobile LIKE '$like' OR clubName LIKE '$like')";
}

// created_at date range (inclusive).
$from = isset($_GET['from']) ? trim($_GET['from']) : '';
$to   = isset($_GET['to'])   ? trim($_GET['to'])   : '';
if ($from !== '') {
    $where[] = "created_at >= '" . $conn->real_escape_string($from) . " 00:00:00'";
}
if ($to !== '') {
    $where[] = "created_at <= '" . $conn->real_escape_string($to) . " 23:59:59'";
}

$whereSql = $where ? ('WHERE ' . implode(' AND ', $where)) : '';
$sql = "SELECT * FROM `$table` $whereSql ORDER BY id DESC";

$result = $conn->query($sql);
if (!$result) {
    http_response_code(500);
    echo json_encode(['error' => 'Query failed']);
    exit;
}

$rows = [];
while ($row = $result->fetch_assoc()) {
    $entries = admin_parse_entries(
        $map,
        $row['selectedEvents'] ?? null,
        $row['eventHorses'] ?? null,
        $isNq ? ($row['eventHorseEfi'] ?? null) : null
    );

    $rows[] = [
        'id'          => (int)$row['id'],
        'name'        => $row['name'],
        'email'       => $row['email'],
        'mobile'      => $row['mobile'],
        'clubName'    => $row['clubName'],
        'amount'      => $row['amount'],
        'order_status'=> $row['order_status'],
        'isSuccess'   => admin_is_success($row['order_status']),
        'entriesCount'=> count($entries),
        'entries'     => $entries,
        'stablingType'=> $row['stablingType'],
        'stablingCount'=> (int)$row['stablingCount'],
        'created_at'  => $row['created_at'],
        'hasDocument' => !empty($row['ageProofPath']),
    ];
}

echo json_encode($rows);
