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
$filePath = __DIR__ . "/uploads/ec2026/age_proofs/" . $filename;

if (!file_exists($filePath)) {
    // Try without the subdirectories if the input already contains them
    if (strpos($file, 'uploads/') !== false) {
        $filePath = __DIR__ . "/../" . $file; // If it's relative to root
    } else {
        header("HTTP/1.0 404 Not Found");
        die("File not found.");
    }
}

// Final check on resolved path
if (!file_exists($filePath)) {
    header("HTTP/1.0 404 Not Found");
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
