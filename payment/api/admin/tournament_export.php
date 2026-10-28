<?php
// GET ?tournament=<slug>&status=&q=&from=&to=  ->  text/csv download of one
// edition's entries, same filters as tournament_entries.php.

require_once __DIR__ . '/_auth.php';
require_once __DIR__ . '/_event_maps.php';
require_once __DIR__ . '/_tournaments.php';
require_once __DIR__ . '/../../dbconnect.php';

require_admin_token();

list($slug, $cfg) = (function () {
    $slug = isset($_GET['tournament']) ? $_GET['tournament'] : '';
    $cfg = club_tournament($slug);
    if (!$cfg) {
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Unknown tournament']);
        exit;
    }
    return [$slug, $cfg];
})();

$result = $conn->query("SELECT * FROM `club_tournament_entries` " . admin_tournament_where($conn, $slug) . " ORDER BY id DESC");

header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename="' . $slug . '_entries_' . date('Ymd_His') . '.csv"');
header('Cache-Control: no-store');

$out = fopen('php://output', 'w');
fputcsv($out, [
    'ID', 'Name', 'Mobile', 'Email', 'Membership No', 'Handicap / Level', 'Amount', 'Currency',
    'Status', 'Tracking ID', 'Bank Ref', 'Payment Mode', 'Trans Date', 'Photo Path', 'Created At',
]);

if ($result) {
    while ($row = $result->fetch_assoc()) {
        fputcsv($out, [
            $row['id'], $row['name'], $row['mobile'], $row['email'], $row['membershipNo'],
            $row['handicap'], $row['amount'], $row['currency'], $row['order_status'],
            $row['tracking_id'], $row['bank_ref_no'], $row['payment_mode'], $row['trans_date'],
            $row['photoPath'], $row['created_at'],
        ]);
    }
}

fclose($out);
exit;
