<?php
// Event id => label maps for the two open events. Copied verbatim from the
// inline maps in nq2026ResponseHandler.php and ecaug2026ResponseHandler.php so
// the admin API can render human-readable event names without touching the
// handlers. Keep these in sync if the handler maps ever change.

$NQ_EVENT_MAP = [
    1 => "Dressage - Children II", 2 => "Dressage - Children I", 3 => "Dressage - Junior", 4 => "Dressage - Young Rider",
    5 => "SJ Children II (0.80m)", 6 => "SJ Children I (0.90m)", 7 => "SJ Junior (1.05m)", 8 => "SJ Young Rider (1.15m)",
    9 => "Practice Round 0.80-0.90m"
];

$EC_EVENT_MAP = [
    1 => "Hacks - 12y & Under", 2 => "Hacks - 13-16y",
    3 => "Dressage - Children II", 4 => "Dressage - Children I", 5 => "Dressage - Juniors",
    6 => "SJ 40cm - Under 12", 7 => "SJ 40cm - Open",
    8 => "SJ 60cm - Under 14", 9 => "SJ 60cm - Open",
    10 => "SJ 80cm - Children II", 11 => "SJ 80cm - Open",
    12 => "SJ 90cm - Children I", 13 => "SJ 90cm - Open",
    14 => "SJ 105-110cm - Juniors", 15 => "SJ 105-110cm - Open",
    16 => "Practice Round 80-90cm"
];

// Resolve the ?event= query param to a config bundle: table name, event map, and
// the uploads subdirectory for documents. Returns null for an unknown event.
function admin_event_config($event) {
    global $NQ_EVENT_MAP, $EC_EVENT_MAP;
    if ($event === 'nq') {
        return ['table' => 'nq2026', 'map' => $NQ_EVENT_MAP, 'uploadDir' => 'nq2026'];
    }
    if ($event === 'ec') {
        return ['table' => 'ecaug2026', 'map' => $EC_EVENT_MAP, 'uploadDir' => 'ecaug2026'];
    }
    return null;
}

// Treat both "Success" and "Successful" as a confirmed payment (both appear in
// the handlers). NULL / anything else is not confirmed.
function admin_is_success($status) {
    return $status === 'Success' || $status === 'Successful';
}

// Build the readable entries for one registration row: an array of
// { event, horses[], efi[] } using the supplied event map. NQ rows carry
// eventHorseEfi; EC rows pass null for $efiJson.
function admin_parse_entries($map, $selectedJson, $horsesJson, $efiJson) {
    $selectedIds = json_decode($selectedJson ?? '', true) ?: [];
    $horseData   = json_decode($horsesJson ?? '', true) ?: [];
    $efiData     = $efiJson !== null ? (json_decode($efiJson, true) ?: []) : [];

    $entries = [];
    foreach ($selectedIds as $id) {
        $label  = isset($map[$id]) ? $map[$id] : "Event #$id";
        $horses = isset($horseData[$id])
            ? (is_array($horseData[$id]) ? $horseData[$id] : [$horseData[$id]])
            : [];
        $efi = isset($efiData[$id])
            ? (is_array($efiData[$id]) ? $efiData[$id] : [$efiData[$id]])
            : [];
        $entries[] = [
            'id'     => $id,
            'event'  => $label,
            'horses' => array_values($horses),
            'efi'    => array_values($efi),
        ];
    }
    return $entries;
}
