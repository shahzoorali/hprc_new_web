<?php
/**
 * HPRC SES Mailer Utility (with Debug Logging)
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

function send_hprc_email($toEmail, $toName, $subject, $htmlBody, $plainBody = "") {
    // Load .env
    $envPath = __DIR__ . '/../.env';
    if (!file_exists($envPath)) {
        return ["success" => false, "error" => ".env file not found"];
    }
    
    $env = parse_ini_file($envPath);
    
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->SMTPDebug = 2; 
        $mail->Debugoutput = function($str, $level) {
            file_put_contents(__DIR__ . '/smtp_debug.log', "[" . date('Y-m-d H:i:s') . "] " . $str . "\n", FILE_APPEND);
        };

        $mail->Host       = $env['SES_SMTP_HOST'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $env['SES_SMTP_USER'];
        $mail->Password   = $env['SES_SMTP_PASS'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = $env['SES_SMTP_PORT'];

        // Recipients
        $mail->setFrom($env['SES_SENDER_EMAIL'], 'HPRC Events');
        $mail->addAddress($toEmail, $toName);
        $mail->addReplyTo($env['SES_SENDER_EMAIL'], 'HPRC Events');
        
        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $htmlBody;
        $mail->AltBody = !empty($plainBody) ? $plainBody : strip_tags($htmlBody);

        $mail->send();
        return ["success" => true];
    } catch (Exception $e) {
        file_put_contents(__DIR__ . '/smtp_debug.log', "[" . date('Y-m-d H:i:s') . "] FATAL ERROR: " . $mail->ErrorInfo . "\n", FILE_APPEND);
        return ["success" => false, "error" => $mail->ErrorInfo];
    }
}

function send_admin_notification($subject, $htmlBody) {
    // Load .env
    $envPath = __DIR__ . '/../.env';
    if (!file_exists($envPath)) return;
    $env = parse_ini_file($envPath);
    
    if (empty($env['SES_ADMIN_EMAIL'])) return;

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->SMTPDebug = 2; 
        $mail->Debugoutput = function($str, $level) {
            file_put_contents(__DIR__ . '/smtp_debug.log', "[" . date('Y-m-d H:i:s') . "] ADMIN_SEND: " . $str . "\n", FILE_APPEND);
        };

        $mail->Host       = $env['SES_SMTP_HOST'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $env['SES_SMTP_USER'];
        $mail->Password   = $env['SES_SMTP_PASS'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = $env['SES_SMTP_PORT'];

        $mail->setFrom($env['SES_SENDER_EMAIL'], 'HPRC Admin Bot');
        
        // Add multiple admin emails if present (comma separated)
        $admins = explode(',', $env['SES_ADMIN_EMAIL']);
        foreach ($admins as $admin) {
            $email = trim($admin);
            if (!empty($email)) {
                $mail->addAddress($email);
            }
        }

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $htmlBody;
        $mail->AltBody = strip_tags($htmlBody);

        $mail->send();
    } catch (Exception $e) {
        file_put_contents(__DIR__ . '/smtp_debug.log', "[" . date('Y-m-d H:i:s') . "] ADMIN_FATAL: " . $mail->ErrorInfo . "\n", FILE_APPEND);
    }
}
