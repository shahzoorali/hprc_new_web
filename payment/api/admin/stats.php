<?php
// GET ?event=nq|ec|all  ->  summary totals driving the overview cards:
// counts by status, confirmed revenue, stables booked, entries count.

require_once __DIR__ . '/_auth.php';
require_once __DIR__ . '/_event_maps.php';
require_once __DIR__ . '/../../dbconnect.php';

require_admin_token();
admin_json_headers();

$event = isset($_GET['event']) ? $_GET['event'] : '';

// Compute the stats bundle for one event table.
function admin_event_stats($conn, $cfg) {
    $table = $cfg['table'];

    $out = [
        'total'       => 0,
        'success'     => 0,
        'failed'      => 0,
        'pending'     => 0,
        'revenue'     => 0.0,
        'stablesBooked'=> 0,
        'entries'     => 0,
    ];

    $result = $conn->query("SELECT order_status, amount, selectedEvents, stablingCount FROM `$table`");
    if (!$result) {
        return $out;
    }

    while ($row = $result->fetch_assoc()) {
        $out['total']++;
        $status = $row['order_status'];
        if (admin_is_success($status)) {
            $out['success']++;
            $out['revenue'] += (float)$row['amount'];
            $out['stablesBooked'] += (int)$row['stablingCount'];
            $selected = json_decode($row['selectedEvents'] ?? '', true) ?: [];
            $out['entries'] += count($selected);
        } elseif ($status === null) {
            $out['pending']++;
        } else {
            $out['failed']++;
        }
    }

    return $out;
}

// TSEC stabling shares the October camp ledger; count it the way the ledger rebuild does.
function admin_tsec_camp_stables($conn) {
    $total = 0;
    $result = $conn->query("SELECT order_status, stablingCount, stablingFrom, stablingTo FROM `tsec2026` WHERE stablingType <> 'NONE' AND stablingCount > 0");
    if (!$result) {
        return 0;
    }
    while ($row = $result->fetch_assoc()) {
        if (!admin_is_success($row['order_status'])) continue;
        if (empty($row['stablingFrom']) || empty($row['stablingTo'])) continue;
        $total += (int)$row['stablingCount'];
    }
    return $total;
}

$nqCfg = admin_event_config('nq');
$octNqCfg = admin_event_config('oct_nq');
$ecCfg = admin_event_config('ec');

if ($event === 'nq') {
    echo json_encode(['nq' => admin_event_stats($conn, $nqCfg)]);
} elseif ($event === 'oct_nq') {
    echo json_encode(['oct_nq' => admin_event_stats($conn, $octNqCfg)]);
} elseif ($event === 'ec') {
    echo json_encode(['ec' => admin_event_stats($conn, $ecCfg)]);
} elseif ($event === 'all' || $event === '') {
    echo json_encode([
        'oct_nq' => admin_event_stats($conn, $octNqCfg),
        'nq' => admin_event_stats($conn, $nqCfg),
        'ec' => admin_event_stats($conn, $ecCfg),
        'tsecCampStables' => admin_tsec_camp_stables($conn),
    ]);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Unknown event']);
}
