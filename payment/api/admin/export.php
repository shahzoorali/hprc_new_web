<?php
// GET ?event=nq|ec&status=&q=&from=&to=  ->  text/csv download.
// One row per registration with a flattened entries column. Same filters as
// registrations.php. Streamed with fputcsv.

require_once __DIR__ . '/_auth.php';
require_once __DIR__ . '/_event_maps.php';
require_once __DIR__ . '/../../dbconnect.php';

require_admin_token();

$event = isset($_GET['event']) ? $_GET['event'] : '';
$cfg = admin_event_config($event);
if (!$cfg) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Unknown event']);
    exit;
}

$table = $cfg['table'];
$map   = $cfg['map'];
$isNq  = ($event === 'nq' || $event === 'oct_nq');

$where = [];

$status = isset($_GET['status']) ? $_GET['status'] : '';
if ($status === 'success') {
    $where[] = "(order_status = 'Success' OR order_status = 'Successful')";
} elseif ($status === 'failed') {
    $where[] = "(order_status IS NOT NULL AND order_status <> 'Success' AND order_status <> 'Successful')";
} elseif ($status === 'pending') {
    $where[] = "order_status IS NULL";
}

$q = isset($_GET['q']) ? trim($_GET['q']) : '';
if ($q !== '') {
    $like = "%" . $conn->real_escape_string($q) . "%";
    $where[] = "(name LIKE '$like' OR email LIKE '$like' OR mobile LIKE '$like' OR clubName LIKE '$like')";
}

$from = isset($_GET['from']) ? trim($_GET['from']) : '';
$to   = isset($_GET['to'])   ? trim($_GET['to'])   : '';
if ($from !== '') {
    $where[] = "created_at >= '" . $conn->real_escape_string($from) . " 00:00:00'";
}
if ($to !== '') {
    $where[] = "created_at <= '" . $conn->real_escape_string($to) . " 23:59:59'";
}

$whereSql = $where ? ('WHERE ' . implode(' AND ', $where)) : '';
$result = $conn->query("SELECT * FROM `$table` $whereSql ORDER BY id DESC");

$filename = $table . '_registrations_' . date('Ymd_His') . '.csv';
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('Cache-Control: no-store');

$out = fopen('php://output', 'w');

$header = [
    'ID', 'Name', 'Parent', 'DOB', 'Mobile', 'Email', 'Emergency Contact',
    'Emergency Relation', 'Club',
];
if ($isNq) { $header[] = 'EFI Rider ID'; $header[] = 'Indian'; }
$header = array_merge($header, [
    'Entries', 'Stabling Type', 'Stabling Count', 'Stabling From', 'Stabling To',
    'Amount', 'Currency', 'Status', 'Tracking ID', 'Bank Ref', 'Payment Mode',
    'Trans Date', 'Document Path', 'Created At',
]);
fputcsv($out, $header);

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $entries = admin_parse_entries(
            $map,
            $row['selectedEvents'] ?? null,
            $row['eventHorses'] ?? null,
            $isNq ? ($row['eventHorseEfi'] ?? null) : null
        );

        // Flatten entries: "Event (Horse [EFI], Horse2) | NextEvent (...)".
        $parts = [];
        foreach ($entries as $e) {
            $horseStrs = [];
            foreach ($e['horses'] as $i => $h) {
                $efi = isset($e['efi'][$i]) && $e['efi'][$i] !== '' ? " [{$e['efi'][$i]}]" : '';
                $horseStrs[] = $h . $efi;
            }
            $parts[] = $e['event'] . ' (' . implode(', ', $horseStrs) . ')';
        }
        $entriesFlat = implode(' | ', $parts);

        $line = [
            $row['id'], $row['name'], $row['parentName'], $row['dob'], $row['mobile'],
            $row['email'], $row['emergencyContact'], $row['emergencyRelation'], $row['clubName'],
        ];
        if ($isNq) { $line[] = $row['efiRiderId'] ?? ''; $line[] = $row['isIndian'] ?? ''; }
        $line = array_merge($line, [
            $entriesFlat, $row['stablingType'], $row['stablingCount'], $row['stablingFrom'],
            $row['stablingTo'], $row['amount'], $row['currency'], $row['order_status'],
            $row['tracking_id'], $row['bank_ref_no'], $row['payment_mode'], $row['trans_date'],
            $row['ageProofPath'], $row['created_at'],
        ]);
        fputcsv($out, $line);
    }
}

fclose($out);
exit;
