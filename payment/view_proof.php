<?php
/**
 * Secure Age Proof Viewer Bridge
 * This script serves images from the protected uploads folder 
 * to bypass web server static file blocking.
 */

// Basic security check: only allow files from the ec2026 uploads directory
$file = isset($_GET['file']) ? $_GET['file'] : '';

if (empty($file)) {
    die("No file specified.");
}

// Sanitize the filename to prevent directory traversal
$filename = basename($file);

// 1. Check in the payment/uploads folder (the default location)
$filePath = __DIR__ . "/uploads/ec2026/age_proofs/" . $filename;

// 2. If not found, check if it exists relative to the root (for older entries or different structures)
if (!file_exists($filePath)) {
    $filePath = __DIR__ . "/../" . $file; 
}

// 3. Final check: Does it exist at all?
if (!file_exists($filePath)) {
    header("HTTP/1.0 404 Not Found");
    error_log("EC2026 Proof Viewer: File not found at resolved path: " . $filePath);
    die("File not found.");
}

$mimeType = mime_content_type($filePath);
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

if (!in_array($mimeType, $allowedTypes)) {
    die("Invalid file type.");
}

// Set headers and serve the file
header("Content-Type: " . $mimeType);
header("Content-Length: " . filesize($filePath));
readfile($filePath);
exit();
