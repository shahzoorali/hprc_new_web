<?php
// Shared guard for the admin JSON API.
// Compares the X-Admin-Token request header to the ADMIN_API_TOKEN server env
// with a constant-time comparison. On mismatch: 403 + JSON error and exit.
//
// The Next.js server is the only intended caller (server-to-server). The browser
// never sees this token.

function require_admin_token() {
    $expected = getenv('ADMIN_API_TOKEN');

    // Header arrives as HTTP_X_ADMIN_TOKEN in $_SERVER; some SAPIs also expose it
    // via getallheaders(). Check both for robustness.
    $provided = '';
    if (isset($_SERVER['HTTP_X_ADMIN_TOKEN'])) {
        $provided = $_SERVER['HTTP_X_ADMIN_TOKEN'];
    } elseif (function_exists('getallheaders')) {
        foreach (getallheaders() as $k => $v) {
            if (strcasecmp($k, 'X-Admin-Token') === 0) { $provided = $v; break; }
        }
    }

    if (empty($expected) || !is_string($provided) || !hash_equals($expected, $provided)) {
        http_response_code(403);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Forbidden']);
        exit;
    }
}

// Emit the standard no-store JSON headers for every admin API response.
function admin_json_headers() {
    header('Content-Type: application/json');
    header('Cache-Control: no-store, no-cache, must-revalidate');
    header('Pragma: no-cache');
}
