<?php
// GET ?event=nq|ec&file=<stored ageProofPath or filename>
// Token-guarded document server. Generalizes view_proof.php to resolve
// uploads/{nq2026|ecaug2026}/age_proofs/ + the stored filename. Same
// basename() sanitisation + MIME allowlist. The public view_proof.php is left
// untouched.

require_once __DIR__ . '/_auth.php';
require_once __DIR__ . '/_event_maps.php';

require_admin_token();

$event = isset($_GET['event']) ? $_GET['event'] : '';
$file  = isset($_GET['file']) ? $_GET['file'] : '';
$cfg = admin_event_config($event);

if (!$cfg || $file === '') {
    http_response_code(400);
    die('Bad request.');
}

// Strip any directory components — only the bare filename is trusted.
$filename = basename($file);

// payment/api/admin -> payment/uploads/{dir}/age_proofs/{filename}
$filePath = __DIR__ . '/../../uploads/' . $cfg['uploadDir'] . '/age_proofs/' . $filename;

if (!file_exists($filePath)) {
    http_response_code(404);
    error_log("Admin document: file not found at " . $filePath);
    die('File not found.');
}

$mimeType = mime_content_type($filePath);
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
if (!in_array($mimeType, $allowedTypes)) {
    http_response_code(415);
    die('Invalid file type.');
}

header('Content-Type: ' . $mimeType);
header('Content-Length: ' . filesize($filePath));
header('Cache-Control: private, no-store');
readfile($filePath);
exit;
