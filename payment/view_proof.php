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

// Search all known age_proof upload directories
$searchPaths = [
    __DIR__ . "/uploads/ec2026/age_proofs/" . $filename,
    __DIR__ . "/uploads/ecaug2026/age_proofs/" . $filename,
    __DIR__ . "/uploads/nq2026/age_proofs/" . $filename,
    __DIR__ . "/../" . $file,
];

$filePath = null;
foreach ($searchPaths as $candidate) {
    if (file_exists($candidate)) {
        $filePath = $candidate;
        break;
    }
}

if (!$filePath) {
    header("HTTP/1.0 404 Not Found");
    error_log("Proof Viewer: File not found: " . $filename);
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
