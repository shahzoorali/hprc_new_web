<?php
/**
 * HPRC SES Mailer Utility
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Aws\SecretsManager\SecretsManagerClient;
use Aws\Exception\AwsException;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';
require __DIR__ . '/vendor/autoload.php';

function hprc_get_ses_config() {
    static $cache = null;
    if ($cache !== null) {
        return $cache;
    }
    $client = new SecretsManagerClient([
        'region'  => 'ap-south-1',
        'version' => 'latest',
    ]);
    $result = $client->getSecretValue(['SecretId' => 'hprc']);
    $cache = json_decode($result['SecretString'], true);
    return $cache;
}

function send_hprc_email($toEmail, $toName, $subject, $htmlBody, $plainBody = "", $attachmentPath = null) {
    try {
        $env = hprc_get_ses_config();
    } catch (AwsException $e) {
        error_log("hprc mailer: Secrets Manager fetch failed: " . $e->getAwsErrorMessage());
        return ["success" => false, "error" => "config unavailable"];
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = $env['SES_SMTP_HOST'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $env['SES_SMTP_USER'];
        $mail->Password   = $env['SES_SMTP_PASS'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = $env['SES_SMTP_PORT'];

        $mail->setFrom($env['SES_SENDER_EMAIL'], 'HPRC Events');
        $mail->addAddress($toEmail, $toName);
        $mail->addReplyTo($env['SES_SENDER_EMAIL'], 'HPRC Events');
        if ($attachmentPath && file_exists($attachmentPath)) {
            $mail->addAttachment($attachmentPath);
        }

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $htmlBody;
        $mail->AltBody = !empty($plainBody) ? $plainBody : strip_tags($htmlBody);

        $mail->send();
        return ["success" => true];
    } catch (Exception $e) {
        return ["success" => false, "error" => $mail->ErrorInfo];
    }
}

function send_admin_notification($subject, $htmlBody, $attachmentPath = null) {
    try {
        $env = hprc_get_ses_config();
    } catch (AwsException $e) {
        error_log("hprc admin mailer: Secrets Manager fetch failed: " . $e->getAwsErrorMessage());
        return;
    }

    if (empty($env['SES_ADMIN_EMAIL'])) return;

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = $env['SES_SMTP_HOST'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $env['SES_SMTP_USER'];
        $mail->Password   = $env['SES_SMTP_PASS'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = $env['SES_SMTP_PORT'];

        $mail->setFrom($env['SES_SENDER_EMAIL'], 'HPRC Admin Bot');

        $admins = explode(',', $env['SES_ADMIN_EMAIL']);
        foreach ($admins as $admin) {
            $email = trim($admin);
            if (!empty($email)) {
                $mail->addAddress($email);
            }
        }

        if ($attachmentPath && file_exists($attachmentPath)) {
            $mail->addAttachment($attachmentPath);
        }

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $htmlBody;
        $mail->AltBody = strip_tags($htmlBody);

        $mail->send();
    } catch (Exception $e) {
        // Fail silently for admin notifications
    }
}
