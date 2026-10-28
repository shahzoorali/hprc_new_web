<?php
// GET  ->  every club-tournament edition with its entry totals, for the admin
// overview / editions index: [{ slug, name, label, sport, dates, fee, pagePath,
// total, success, failed, pending, revenue }].

require_once __DIR__ . '/_auth.php';
require_once __DIR__ . '/_event_maps.php';
require_once __DIR__ . '/_tournaments.php';
require_once __DIR__ . '/../../dbconnect.php';

require_admin_token();
admin_json_headers();

$out = [];
foreach (club_tournaments() as $slug => $cfg) {
    $stats = ['total' => 0, 'success' => 0, 'failed' => 0, 'pending' => 0, 'revenue' => 0.0];

    $stmt = $conn->prepare("SELECT order_status, amount FROM `club_tournament_entries` WHERE tournament = ?");
    if ($stmt) {
        $stmt->bind_param('s', $slug);
        $stmt->execute();
        $result = $stmt->get_result();
        while ($result && $row = $result->fetch_assoc()) {
            $stats['total']++;
            if (admin_is_success($row['order_status'])) {
                $stats['success']++;
                $stats['revenue'] += (float)$row['amount'];
            } elseif ($row['order_status'] === null) {
                $stats['pending']++;
            } else {
                $stats['failed']++;
            }
        }
    }

    $out[] = array_merge([
        'slug'     => $slug,
        'name'     => $cfg['name'],
        'label'    => $cfg['label'],
        'sport'    => $cfg['sport'],
        'dates'    => $cfg['dates'],
        'fee'      => $cfg['fee'],
        'pagePath' => $cfg['pagePath'],
    ], $stats);
}

echo json_encode($out);
