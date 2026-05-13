<?php
// EC2026 Stabling Inventory Admin Dashboard
// Access: https://hprc.in/payment/admin/stabling-dashboard.php?key=YOUR_KEY
//
// Set STABLING_ADMIN_KEY in server env. As a fallback, the constant below is used.
// Change FALLBACK_KEY immediately and ideally remove it after the env var is set on the server.

define('FALLBACK_KEY', 'shahzoor);

$envKey = getenv('STABLING_ADMIN_KEY');
$expectedKey = $envKey ?: FALLBACK_KEY;
$providedKey = isset($_GET['key']) ? $_GET['key'] : '';

if (!hash_equals($expectedKey, $providedKey)) {
    http_response_code(403);
    header('Content-Type: text/html');
    echo '<h1>403 — Forbidden</h1><p>Access requires a valid key.</p>';
    exit;
}

require_once __DIR__ . '/../InventoryManager.php';
require_once __DIR__ . '/../dbconnect.php';

$im = new InventoryManager();

// Handle manual reserve form submission.
$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    if ($_POST['action'] === 'reserve') {
        $date = isset($_POST['date']) ? $_POST['date'] : '';
        $count = isset($_POST['count']) ? (int)$_POST['count'] : 0;
        $reason = isset($_POST['reason']) ? $_POST['reason'] : '';
        if ($date && $count > 0) {
            $im->addManualReserve($date, $count, $reason, 'admin');
            $message = "Reserved $count stable(s) on $date.";
        } else {
            $message = "Reserve failed: provide date and positive count.";
        }
    } elseif ($_POST['action'] === 'rebuild') {
        list($ok, $msg) = $im->rebuildFromDB($conn);
        $message = $ok ? "Rebuild OK — $msg" : "Rebuild FAILED — $msg";
    }
}

$data = $im->loadInventory();
$capacity = $data['permanentCapacity'];
$days = $data['dailyOccupancy'];
ksort($days);

function fmt_dt($iso) {
    if (empty($iso)) return '—';
    $t = strtotime($iso);
    return $t ? date('Y-m-d H:i', $t) : $iso;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>EC2026 Stabling Inventory Dashboard</title>
<style>
  body { font-family: -apple-system, system-ui, sans-serif; margin: 20px; background: #f5f5f7; color: #222; }
  h1 { margin: 0 0 8px; color: #b91c1c; }
  .meta { font-size: 12px; color: #666; margin-bottom: 24px; }
  .card { background: white; padding: 20px; margin-bottom: 20px; border: 1px solid #e5e5e5; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
  h2 { margin-top: 0; font-size: 18px; color: #333; }
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th, td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #eee; }
  th { background: #fafafa; font-weight: 600; color: #555; }
  .bar { display: inline-block; height: 12px; background: #b91c1c; border-radius: 2px; vertical-align: middle; }
  .bar-bg { display: inline-block; width: 150px; height: 12px; background: #f0f0f0; border-radius: 2px; vertical-align: middle; margin-right: 8px; overflow: hidden; }
  .bar-bg .bar { display: block; height: 100%; }
  .pill { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
  .pill-ok { background: #d1fae5; color: #065f46; }
  .pill-low { background: #fef3c7; color: #92400e; }
  .pill-full { background: #fee2e2; color: #991b1b; }
  form { display: inline-block; margin: 0; }
  input[type=text], input[type=date], input[type=number] { padding: 6px 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 13px; }
  button { padding: 7px 14px; background: #b91c1c; color: white; border: 0; border-radius: 4px; font-weight: 600; cursor: pointer; font-size: 13px; }
  button:hover { background: #991b1b; }
  .msg { padding: 10px 14px; background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; border-radius: 6px; margin-bottom: 16px; font-size: 13px; }
  .nav a { color: #b91c1c; text-decoration: none; font-weight: 600; }
</style>
</head>
<body>
<h1>EC2026 Stabling Inventory</h1>
<div class="meta">
  Capacity: <strong><?= htmlspecialchars((string)$capacity) ?></strong> per day &nbsp;|&nbsp;
  Last updated: <?= htmlspecialchars(fmt_dt($data['lastUpdated'] ?? '')) ?> &nbsp;|&nbsp;
  Last rebuilt from DB: <?= htmlspecialchars(fmt_dt($data['lastRebuiltFromDB'] ?? '')) ?>
</div>

<?php if ($message): ?>
  <div class="msg"><?= htmlspecialchars($message) ?></div>
<?php endif; ?>

<div class="card">
  <h2>Daily Occupancy</h2>
  <table>
    <thead>
      <tr><th>Date</th><th>Booked</th><th>Manual Reserved</th><th>Available</th><th>Occupancy</th><th>Status</th></tr>
    </thead>
    <tbody>
    <?php foreach ($days as $date => $d):
      $used = $d['booked'] + $d['manualReserved'];
      $pct = $capacity > 0 ? round($used / $capacity * 100) : 0;
      $status = $d['available'] === 0 ? 'pill-full' : ($pct >= 80 ? 'pill-low' : 'pill-ok');
      $label = $d['available'] === 0 ? 'FULL' : ($pct >= 80 ? 'Limited' : 'OK');
    ?>
      <tr>
        <td><strong><?= htmlspecialchars($date) ?></strong></td>
        <td><?= (int)$d['booked'] ?></td>
        <td><?= (int)$d['manualReserved'] ?></td>
        <td><strong><?= (int)$d['available'] ?></strong> / <?= (int)$capacity ?></td>
        <td>
          <span class="bar-bg"><span class="bar" style="width: <?= $pct ?>%;"></span></span>
          <?= $pct ?>%
        </td>
        <td><span class="pill <?= $status ?>"><?= $label ?></span></td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
</div>

<div class="card">
  <h2>Manual Reserve</h2>
  <p style="font-size: 13px; color: #666; margin: 0 0 12px;">Hold capacity for VIPs, offline bookings, or special arrangements. Persists across nightly rebuilds.</p>
  <form method="POST">
    <input type="hidden" name="action" value="reserve">
    Date: <input type="date" name="date" min="2026-05-13" max="2026-05-18" required>
    Count: <input type="number" name="count" min="1" max="<?= (int)$capacity ?>" required style="width: 70px;">
    Reason: <input type="text" name="reason" placeholder="e.g. VIP booking pending" style="width: 280px;">
    <button type="submit">Reserve</button>
  </form>
</div>

<div class="card">
  <h2>Bookings (<?= count($data['bookings']) ?>)</h2>
  <table>
    <thead>
      <tr><th>Order ID</th><th>Name</th><th>Stables</th><th>From</th><th>To</th><th>Booked At</th><th>Status</th></tr>
    </thead>
    <tbody>
    <?php if (empty($data['bookings'])): ?>
      <tr><td colspan="7" style="text-align: center; color: #999; padding: 20px;">No bookings yet.</td></tr>
    <?php else: foreach (array_reverse($data['bookings']) as $b): ?>
      <tr>
        <td><?= (int)$b['orderId'] ?></td>
        <td><?= htmlspecialchars($b['name']) ?></td>
        <td><?= (int)$b['stablesCount'] ?></td>
        <td><?= htmlspecialchars($b['fromDate']) ?></td>
        <td><?= htmlspecialchars($b['toDate']) ?></td>
        <td><?= htmlspecialchars(fmt_dt($b['bookingDate'] ?? '')) ?></td>
        <td><?= htmlspecialchars($b['status'] ?? 'success') ?></td>
      </tr>
    <?php endforeach; endif; ?>
    </tbody>
  </table>
</div>

<?php if (!empty($data['manualReserves'])): ?>
<div class="card">
  <h2>Manual Reserves (<?= count($data['manualReserves']) ?>)</h2>
  <table>
    <thead><tr><th>Date</th><th>Count</th><th>Reason</th><th>By</th><th>At</th></tr></thead>
    <tbody>
    <?php foreach (array_reverse($data['manualReserves']) as $r): ?>
      <tr>
        <td><?= htmlspecialchars($r['date']) ?></td>
        <td><?= (int)$r['count'] ?></td>
        <td><?= htmlspecialchars($r['reason'] ?? '') ?></td>
        <td><?= htmlspecialchars($r['by'] ?? '') ?></td>
        <td><?= htmlspecialchars(fmt_dt($r['at'] ?? '')) ?></td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
</div>
<?php endif; ?>

<div class="card">
  <h2>Maintenance</h2>
  <form method="POST" onsubmit="return confirm('Rebuild inventory from MySQL? Manual reserves will be preserved.')">
    <input type="hidden" name="action" value="rebuild">
    <button type="submit">Rebuild from Database Now</button>
  </form>
  <p style="font-size: 12px; color: #666; margin-top: 8px;">
    Nightly cron should keep this fresh automatically. Use this if you suspect drift.
  </p>
</div>

</body>
</html>
