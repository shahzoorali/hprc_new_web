<?php
/**
 * Email Templates for Equestrian Challenge 2026
 */

function get_success_email_body($name, $orderId, $amount, $trackingId, $details = []) {
    $eventsHtml = "";
    if (!empty($details['events'])) {
        $eventsHtml = "<div style='margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;'>
                        <p style='margin-bottom: 5px;'><strong>Selected Events:</strong></p>
                        <p style='color: #555; margin-top: 0;'>" . str_replace(" | ", "<br>", $details['events']) . "</p>
                      </div>";
    }

    $logoUrl = "https://hprc.in/hprc_logo.png";

    return "
    <div style='font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background-color: #ffffff;'>
        <div style='background-color: #1a1a1a; padding: 30px; text-align: center; border-bottom: 4px solid #b19355;'>
            <img src='{$logoUrl}' alt='HPRC Logo' style='max-width: 180px; height: auto;'>
        </div>
        
        <div style='padding: 40px;'>
            <h2 style='color: #1a1a1a; margin-top: 0; font-size: 24px; font-weight: 700; border-bottom: 2px solid #f0f0f0; padding-bottom: 15px;'>Registration Confirmed!</h2>
            <p style='font-size: 16px;'>Dear <strong>{$name}</strong>,</p>
            <p style='font-size: 16px;'>Thank you for registering for the <strong>HPRC Equestrian Challenge 2026</strong>. Your payment was successful and your entry has been secured.</p>
            
            <div style='background: #fdfaf4; border: 1px solid #f1e6cc; padding: 20px; border-radius: 8px; margin: 30px 0;'>
                <table style='width: 100%;'>
                    <tr><td style='color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; padding-bottom: 4px;'>Order Reference</td></tr>
                    <tr><td style='font-size: 18px; font-weight: bold; color: #1a1a1a; padding-bottom: 15px;'>#{$orderId}</td></tr>
                    
                    <tr><td style='color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; padding-bottom: 4px;'>Transaction ID</td></tr>
                    <tr><td style='font-size: 15px; font-weight: 600; color: #1a1a1a; padding-bottom: 15px;'>{$trackingId}</td></tr>
                    
                    <tr><td style='color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; padding-bottom: 4px;'>Amount Paid</td></tr>
                    <tr><td style='font-size: 22px; font-weight: 800; color: #b19355;'>₹{$amount}</td></tr>
                </table>

                {$eventsHtml}
            </div>

            <p style='font-size: 16px;'>We look forward to seeing you at the event on <strong>16th & 17th May 2026</strong>.</p>
            
            <div style='margin-top: 40px; padding-top: 25px; border-top: 1px solid #f0f0f0; color: #777; font-size: 14px; text-align: center;'>
                <p style='margin-bottom: 5px;'>If you have any questions, please contact us:</p>
                <p style='margin-top: 0;'>
                    +91 9177000056
                </p>
                <p style='margin-top: 25px; font-weight: bold; color: #1a1a1a;'>Team HPRC</p>
            </div>
        </div>
        
        <div style='background-color: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #eee; font-size: 11px; color: #aaa; text-transform: uppercase; letter-spacing: 0.1em;'>
            Hyderabad Polo & Riding Club &copy; 2026
        </div>
    </div>
    ";
}

function get_failed_email_body($name, $orderId, $statusMessage) {
    $logoUrl = "https://hprc.in/hprc_logo.png";
    
    return "
    <div style='font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background-color: #ffffff;'>
        <div style='background-color: #1a1a1a; padding: 30px; text-align: center; border-bottom: 4px solid #e74c3c;'>
            <img src='{$logoUrl}' alt='HPRC Logo' style='max-width: 180px; height: auto;'>
        </div>
        
        <div style='padding: 40px;'>
            <h2 style='color: #e74c3c; margin-top: 0; font-size: 24px; font-weight: 700; border-bottom: 2px solid #f0f0f0; padding-bottom: 15px;'>Payment Notification</h2>
            <p style='font-size: 16px;'>Dear <strong>{$name}</strong>,</p>
            <p style='font-size: 16px;'>We noticed that your payment attempt for the <strong>HPRC Equestrian Challenge 2026</strong> (Order #{$orderId}) was unsuccessful.</p>
            
            <div style='background: #fff8f8; border: 1px solid #ffebeb; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #e74c3c;'>
                <p style='margin: 0; color: #666; font-size: 13px; text-transform: uppercase; font-weight: bold;'>Reason for failure:</p>
                <p style='margin: 5px 0 0 0; color: #1a1a1a; font-weight: 600;'>{$statusMessage}</p>
            </div>

            <p style='font-size: 16px;'>Don't worry, your registration details are still saved. You can try registering again or contact our support team if you believe this was an error.</p>
            
            <div style='margin-top: 40px; padding-top: 25px; border-top: 1px solid #f0f0f0; color: #777; font-size: 14px; text-align: center;'>
                <p style='margin-bottom: 5px;'>For assistance, please contact us:</p>
                <p style='margin-top: 0;'>
                    +91 9177000056
                </p>
                <p style='margin-top: 25px; font-weight: bold; color: #1a1a1a;'>Team HPRC</p>
            </div>
        </div>
        
        <div style='background-color: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #eee; font-size: 11px; color: #aaa; text-transform: uppercase; letter-spacing: 0.1em;'>
            Hyderabad Polo & Riding Club &copy; 2026
        </div>
    </div>
    ";
}

function get_admin_notification_body($data, $orderId, $trackingId) {
    $events = !empty($data['events']) ? $data['events'] : "N/A";
    $horses = !empty($data['eventHorses']) ? $data['eventHorses'] : "N/A";
    $ageProof = !empty($data['ageProofPath']) ? "https://hprc.in/payment/" . $data['ageProofPath'] : "None uploaded";
    $logoUrl = "https://hprc.in/hprc_logo.png";

    return "
    <div style='font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #333; max-width: 700px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; background-color: #fff;'>
        <div style='background-color: #1a1a1a; padding: 20px; border-bottom: 4px solid #b19355;'>
            <table style='width: 100%;'>
                <tr>
                    <td><img src='{$logoUrl}' alt='HPRC Logo' style='max-width: 120px; height: auto;'></td>
                    <td style='text-align: right; color: #fff; vertical-align: middle; font-weight: bold; text-transform: uppercase; font-size: 14px;'>New Registration Received</td>
                </tr>
            </table>
        </div>
        
        <div style='padding: 30px;'>
            <h3 style='color: #1a1a1a; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 0;'>Rider Profile</h3>
            <table style='width: 100%; border-collapse: collapse; margin-bottom: 25px;'>
                <tr style='background-color: #f8f9fa;'><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 160px; font-size: 13px; color: #666;'>Full Name</td><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: 600;'>{$data['name']}</td></tr>
                <tr><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; font-size: 13px; color: #666;'>Parent/Guardian</td><td style='padding: 10px; border-bottom: 1px solid #eee;'>{$data['parentName']}</td></tr>
                <tr style='background-color: #f8f9fa;'><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; font-size: 13px; color: #666;'>Email Address</td><td style='padding: 10px; border-bottom: 1px solid #eee;'><a href='mailto:{$data['email']}' style='color: #b19355;'>{$data['email']}</a></td></tr>
                <tr><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; font-size: 13px; color: #666;'>Mobile Number</td><td style='padding: 10px; border-bottom: 1px solid #eee;'>{$data['mobile']}</td></tr>
                <tr style='background-color: #f8f9fa;'><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; font-size: 13px; color: #666;'>Club / Unit</td><td style='padding: 10px; border-bottom: 1px solid #eee;'>{$data['clubName']}</td></tr>
                <tr><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; font-size: 13px; color: #666;'>Emergency Info</td><td style='padding: 10px; border-bottom: 1px solid #eee;'>{$data['emergencyContact']} ({$data['emergencyRelation']})</td></tr>
            </table>

            <h3 style='color: #1a1a1a; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 0;'>Entry & Stabling</h3>
            <table style='width: 100%; border-collapse: collapse; margin-bottom: 25px;'>
                <tr style='background-color: #f8f9fa;'><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 160px; font-size: 13px; color: #666;'>Classes Selected</td><td style='padding: 10px; border-bottom: 1px solid #eee;'>{$events}</td></tr>
                <tr><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; font-size: 13px; color: #666;'>Horse Names</td><td style='padding: 10px; border-bottom: 1px solid #eee;'>{$horses}</td></tr>
                <tr style='background-color: #f8f9fa;'><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; font-size: 13px; color: #666;'>Stabling Type</td><td style='padding: 10px; border-bottom: 1px solid #eee;'>{$data['stablingType']} ({$data['stablingCount']} stables)</td></tr>
                <tr><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; font-size: 13px; color: #666;'>Booking Dates</td><td style='padding: 10px; border-bottom: 1px solid #eee;'>{$data['stablingFrom']} to {$data['stablingTo']}</td></tr>
                <tr style='background-color: #f8f9fa;'><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; font-size: 13px; color: #666;'>Age Proof Link</td><td style='padding: 10px; border-bottom: 1px solid #eee;'><a href='{$ageProof}' style='color: #b19355; font-weight: bold;'>View Document &rarr;</a></td></tr>
            </table>

            <h3 style='color: #1a1a1a; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 0;'>Financial Records</h3>
            <table style='width: 100%; border-collapse: collapse;'>
                <tr style='background-color: #f8f9fa;'><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 160px; font-size: 13px; color: #666;'>Order ID</td><td style='padding: 10px; border-bottom: 1px solid #eee;'>#{$orderId}</td></tr>
                <tr><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; font-size: 13px; color: #666;'>Transaction ID</td><td style='padding: 10px; border-bottom: 1px solid #eee;'>{$trackingId}</td></tr>
                <tr style='background-color: #fdfaf4;'><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; font-size: 13px; color: #666;'>Final Amount</td><td style='padding: 10px; border-bottom: 1px solid #eee; color: #b19355; font-weight: 800; font-size: 18px;'>₹{$data['amount']}</td></tr>
            </table>
        </div>

        <div style='background-color: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #eee; font-size: 11px; color: #aaa; text-transform: uppercase; letter-spacing: 0.1em;'>
            Automated System Notification &bull; HPRC Web Server
        </div>
    </div>
    ";
}

function get_admin_failed_notification_body($name, $orderId, $statusMessage, $email) {
    $logoUrl = "https://hprc.in/hprc_logo.png";
    return "
    <div style='font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; background-color: #fff;'>
        <div style='background-color: #e74c3c; padding: 20px;'>
            <table style='width: 100%;'>
                <tr>
                    <td><img src='{$logoUrl}' alt='HPRC Logo' style='max-width: 120px; height: auto;'></td>
                    <td style='text-align: right; color: #fff; vertical-align: middle; font-weight: bold; text-transform: uppercase; font-size: 14px;'>Payment Failed Alert</td>
                </tr>
            </table>
        </div>
        
        <div style='padding: 30px;'>
            <p>Admin,</p>
            <p>A payment attempt has failed for the following registration:</p>
            
            <table style='width: 100%; border-collapse: collapse; margin: 20px 0;'>
                <tr style='background-color: #f8f9fa;'><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;'>Rider Name</td><td style='padding: 10px; border-bottom: 1px solid #eee;'>{$name}</td></tr>
                <tr><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Rider Email</td><td style='padding: 10px; border-bottom: 1px solid #eee;'>{$email}</td></tr>
                <tr style='background-color: #f8f9fa;'><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Order ID</td><td style='padding: 10px; border-bottom: 1px solid #eee;'>#{$orderId}</td></tr>
                <tr style='background-color: #fff8f8;'><td style='padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;'>Status Msg</td><td style='padding: 10px; border-bottom: 1px solid #eee; color: #e74c3c; font-weight: bold;'>{$statusMessage}</td></tr>
            </table>

            <p style='font-size: 13px; color: #666;'>The rider has been notified of the failure via email.</p>
        </div>
        <div style='background-color: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #eee; font-size: 11px; color: #aaa; text-transform: uppercase; letter-spacing: 0.1em;'>
            Automated System Alert &bull; HPRC Web Server
        </div>
    </div>
    ";
}
