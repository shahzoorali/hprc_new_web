<?php
// Shared helpers for the club-tournament admin endpoints (tournaments.php,
// tournament_entries.php, tournament_entry.php, tournament_export.php).
// Editions are defined in payment/club_tournaments.php; entries live in the single
// `club_tournament_entries` table, keyed by the edition slug.

require_once __DIR__ . '/../../club_tournaments.php';

// Resolve ?tournament= to its config, or respond 400 and exit.
function admin_require_tournament() {
    $slug = isset($_GET['tournament']) ? $_GET['tournament'] : '';
    $cfg = club_tournament($slug);
    if (!$cfg) {
        http_response_code(400);
        echo json_encode(['error' => 'Unknown tournament']);
        exit;
    }
    return [$slug, $cfg];
}

// WHERE clause for one edition plus the optional status / search / date filters
// (same query params as the horse-event registrations list).
function admin_tournament_where($conn, $slug) {
    $where = ["tournament = '" . $conn->real_escape_string($slug) . "'"];

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
        $where[] = "(name LIKE '$like' OR email LIKE '$like' OR mobile LIKE '$like' OR membershipNo LIKE '$like')";
    }

    $from = isset($_GET['from']) ? trim($_GET['from']) : '';
    $to   = isset($_GET['to'])   ? trim($_GET['to'])   : '';
    if ($from !== '') {
        $where[] = "created_at >= '" . $conn->real_escape_string($from) . " 00:00:00'";
    }
    if ($to !== '') {
        $where[] = "created_at <= '" . $conn->real_escape_string($to) . " 23:59:59'";
    }

    return 'WHERE ' . implode(' AND ', $where);
}
