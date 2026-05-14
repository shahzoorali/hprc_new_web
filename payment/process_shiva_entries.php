<?php
// Process manual entries — Shiva (Billionaire Polo & Riding Club + Horse Riding Stars Academey)
// 29 entries, all under mohammedabdulmubeen172@gmail.com

require("dbconnect.php");
require("mailer.php");

$webhook_url = "https://script.google.com/macros/s/AKfycbzw65SAMdxZpVqp5TcIKvcLIZVdDDcybqkMAUnjM7-wSqvjmo0Pw2Lgz7nC_2ttDN33/exec";

$entries = [
    ["sno"=>1,  "name"=>"Khaja Kashifuddin", "dob"=>"02/01/2014","parentName"=>"Khaja Moinuddn",           "mobile"=>"9700731424","clubName"=>"Horse Riding Stars Academey",       "events"=>"SJ 80cm - Children II",     "eventHorses"=>"Eternity",      "amount"=>2000],
    ["sno"=>2,  "name"=>"Ritika Reddy",       "dob"=>"",          "parentName"=>"Chandrakanth Reddy",       "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"SJ 40cm - Under 12",         "eventHorses"=>"Velocity",      "amount"=>2000],
    ["sno"=>3,  "name"=>"L Samara Reddy",     "dob"=>"22/04/2012","parentName"=>"Lachi Reddy Poornachand",  "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"SJ 60cm - Under 14",         "eventHorses"=>"Star",          "amount"=>2000],
    ["sno"=>4,  "name"=>"L Samara Reddy",     "dob"=>"22/04/2012","parentName"=>"Lachi Reddy Poornachand",  "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"SJ 60cm - Under 14",         "eventHorses"=>"Leeyounee",     "amount"=>2000],
    ["sno"=>5,  "name"=>"Samana Murtuza",     "dob"=>"05/03/2012","parentName"=>"Gulam Dildar Murtuza",     "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"SJ 60cm - Under 14",         "eventHorses"=>"Eternity",      "amount"=>2000],
    ["sno"=>6,  "name"=>"Samana Murtuza",     "dob"=>"05/03/2012","parentName"=>"Gulam Dildar Murtuza",     "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"SJ 60cm - Under 14",         "eventHorses"=>"Velocity",      "amount"=>2000],
    ["sno"=>7,  "name"=>"Amaar Murtuza",      "dob"=>"10/10/2010","parentName"=>"Gulam Dildar Murtuza",     "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"SJ 60cm - Open",             "eventHorses"=>"Veeru",         "amount"=>2000],
    ["sno"=>8,  "name"=>"Amaar Murtuza",      "dob"=>"10/10/2010","parentName"=>"Gulam Dildar Murtuza",     "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"SJ 40cm - Open",             "eventHorses"=>"Star",          "amount"=>2000],
    ["sno"=>9,  "name"=>"Shashank Reddy",     "dob"=>"",          "parentName"=>"Raj Reddy",                "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"SJ 80cm - Open",             "eventHorses"=>"Veeru",         "amount"=>2000],
    ["sno"=>10, "name"=>"Abdul Mubeen",       "dob"=>"",          "parentName"=>"Abdul Moheeth",            "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"SJ 40cm - Open",             "eventHorses"=>"Leyounee",      "amount"=>2000],
    ["sno"=>11, "name"=>"Samra Murtuza",      "dob"=>"29/07/2018","parentName"=>"Gulam Dildar Murtuza",     "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"Hacks - 12y & Under",        "eventHorses"=>"Veeru",         "amount"=>1500],
    ["sno"=>12, "name"=>"L Samara Reddy",     "dob"=>"22/04/2012","parentName"=>"Lachi Reddy Poornachand",  "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"Top Score - 14y & Below",    "eventHorses"=>"Star",          "amount"=>2000],
    ["sno"=>13, "name"=>"Hussain Zaid",       "dob"=>"08/12/2009","parentName"=>"Zaid Ahmed",               "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"SJ 90cm - Open",             "eventHorses"=>"Star",          "amount"=>2000],
    ["sno"=>14, "name"=>"Srayes Reddy",       "dob"=>"10/05/1998","parentName"=>"Ravinder Reddy",           "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"SJ 40cm - Open",             "eventHorses"=>"Velocity",      "amount"=>2000],
    ["sno"=>15, "name"=>"Srayes Reddy",       "dob"=>"10/05/1998","parentName"=>"Ravinder Reddy",           "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"SJ 60cm - Open",             "eventHorses"=>"Eternity",      "amount"=>2000],
    ["sno"=>16, "name"=>"Muneefuddin",        "dob"=>"",          "parentName"=>"Kahaja Moinuddin",         "mobile"=>"9700731424","clubName"=>"Horse Riding Stars Academey",       "events"=>"SJ 60cm - Open",             "eventHorses"=>"Joyful Thunder","amount"=>2000],
    ["sno"=>17, "name"=>"Dhruva",             "dob"=>"",          "parentName"=>"Swetha",                   "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"SJ 40cm - Under 12",         "eventHorses"=>"Thar",          "amount"=>2000],
    ["sno"=>18, "name"=>"Nikki",              "dob"=>"",          "parentName"=>"Monica",                   "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"SJ 40cm - Open",             "eventHorses"=>"Thar",          "amount"=>2000],
    ["sno"=>19, "name"=>"Nikki",              "dob"=>"",          "parentName"=>"Monica",                   "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"SJ 40cm - Open",             "eventHorses"=>"Joyful Thunder","amount"=>2000],
    ["sno"=>20, "name"=>"Teja",               "dob"=>"",          "parentName"=>"Ayiti Krishna",            "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"SJ 40cm - Open",             "eventHorses"=>"Dior",          "amount"=>2000],
    ["sno"=>21, "name"=>"Jeetu",              "dob"=>"",          "parentName"=>"J Krishna Yadav",          "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"SJ 60cm - Open",             "eventHorses"=>"Thar",          "amount"=>2000],
    ["sno"=>22, "name"=>"Jeetu",              "dob"=>"",          "parentName"=>"J Krishna Yadav",          "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"SJ 60cm - Open",             "eventHorses"=>"Joyful Thunder","amount"=>2000],
    ["sno"=>23, "name"=>"Darsheel",           "dob"=>"",          "parentName"=>"A Devendar Reddy",         "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"SJ 80cm - Open",             "eventHorses"=>"Dior",          "amount"=>2000],
    ["sno"=>24, "name"=>"L Samara Reddy",     "dob"=>"22/04/2012","parentName"=>"Lachi Reddy Poornachand",  "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"SJ 60cm - Under 14",         "eventHorses"=>"Star",          "amount"=>2000],
    ["sno"=>25, "name"=>"Shashank Reddy",     "dob"=>"",          "parentName"=>"Raj Reddy",                "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"SJ 90cm - Open",             "eventHorses"=>"Dior",          "amount"=>2000],
    ["sno"=>26, "name"=>"Satvik",             "dob"=>"",          "parentName"=>"C Srinivas",               "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"Top Score - Open",           "eventHorses"=>"Dior",          "amount"=>2000],
    ["sno"=>27, "name"=>"L Samara Reddy",     "dob"=>"22/04/2012","parentName"=>"Lachi Reddy Poornachand",  "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"Top Score - 14y & Below",    "eventHorses"=>"Dior",          "amount"=>2000],
    ["sno"=>28, "name"=>"Ritika Reddy",       "dob"=>"",          "parentName"=>"Chandrakanth Reddy",       "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"Hacks - 12y & Under",        "eventHorses"=>"Velocity",      "amount"=>1500],
    ["sno"=>29, "name"=>"Hussain Zaid",       "dob"=>"08/12/2009","parentName"=>"Zaid Ahmed",               "mobile"=>"8106638172","clubName"=>"Billionaire Polo & Riding Club","events"=>"SJ 60cm - Open",             "eventHorses"=>"Leeyounee",     "amount"=>2000],
];

$email = "mohammedabdulmubeen172@gmail.com";
$total = array_sum(array_column($entries, 'amount'));

// ─── STEP 1: SEND TO GOOGLE SHEETS ───────────────────────────────────────────
echo "=== STEP 1: Sending to Google Sheets ===\n";
$sent = 0; $failed = 0;
foreach ($entries as $e) {
    $payload = [
        "name"              => $e['name'],
        "dob"               => $e['dob'],
        "parentName"        => $e['parentName'],
        "address"           => "",
        "mobile"            => $e['mobile'],
        "email"             => $email,
        "emergencyContact"  => "",
        "emergencyRelation" => "",
        "clubName"          => $e['clubName'],
        "events"            => $e['events'],
        "eventHorses"       => $e['eventHorses'],
        "stablingType"      => "NONE",
        "stablingCount"     => 0,
        "stablingFrom"      => "2026-05-13",
        "stablingTo"        => "2026-05-18",
        "ageProofLink"      => "",
        "amount"            => $e['amount'],
        "tracking_id"       => "MANUAL-SHIVA-" . str_pad($e['sno'], 3, '0', STR_PAD_LEFT),
    ];

    $ch = curl_init($webhook_url);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type:application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_NOSIGNAL, 1);
    $res = curl_exec($ch);
    $err = curl_error($ch);
    curl_close($ch);

    if ($err) {
        echo "  FAIL #{$e['sno']} {$e['name']} - {$e['events']}: $err\n";
        $failed++;
    } else {
        echo "  OK   #{$e['sno']} {$e['name']} - {$e['events']} ({$e['eventHorses']}) Rs.{$e['amount']}\n";
        $sent++;
    }
    usleep(300000); // 300ms gap to avoid Sheets rate limit
}
echo "\nSheets: $sent sent, $failed failed\n\n";

// ─── STEP 2: BUILD CONSOLIDATED EMAIL ────────────────────────────────────────
echo "=== STEP 2: Building consolidated email ===\n";

$byClub = [];
foreach ($entries as $e) {
    $byClub[$e['clubName']][] = $e;
}

$clubRows = "";
foreach ($byClub as $club => $rows) {
    $clubTotal = array_sum(array_column($rows, 'amount'));
    $clubRows .= "
    <h3 style='color:#1a1a1a;font-size:15px;margin:25px 0 8px;padding-bottom:6px;border-bottom:2px solid #b19355;'>
        " . htmlspecialchars($club) . " &nbsp;<span style='font-size:12px;color:#666;font-weight:normal;'>(" . count($rows) . " entries — Rs." . number_format($clubTotal) . ")</span>
    </h3>
    <table style='width:100%;border-collapse:collapse;font-size:13px;'>
        <thead>
            <tr style='background:#f5f5f5;'>
                <th style='padding:8px 10px;text-align:left;border:1px solid #e0e0e0;'>#</th>
                <th style='padding:8px 10px;text-align:left;border:1px solid #e0e0e0;'>Rider</th>
                <th style='padding:8px 10px;text-align:left;border:1px solid #e0e0e0;'>DOB</th>
                <th style='padding:8px 10px;text-align:left;border:1px solid #e0e0e0;'>Event</th>
                <th style='padding:8px 10px;text-align:left;border:1px solid #e0e0e0;'>Horse</th>
                <th style='padding:8px 10px;text-align:right;border:1px solid #e0e0e0;'>Amount</th>
            </tr>
        </thead>
        <tbody>";
    $i = 1;
    foreach ($rows as $r) {
        $dobDisplay = $r['dob'] ?: '—';
        $bg = ($i % 2 === 0) ? "#fafafa" : "#ffffff";
        $clubRows .= "
            <tr style='background:$bg;'>
                <td style='padding:7px 10px;border:1px solid #e0e0e0;color:#999;'>$i</td>
                <td style='padding:7px 10px;border:1px solid #e0e0e0;font-weight:600;'>" . htmlspecialchars($r['name']) . "</td>
                <td style='padding:7px 10px;border:1px solid #e0e0e0;color:#666;'>" . htmlspecialchars($dobDisplay) . "</td>
                <td style='padding:7px 10px;border:1px solid #e0e0e0;'>" . htmlspecialchars($r['events']) . "</td>
                <td style='padding:7px 10px;border:1px solid #e0e0e0;'>" . htmlspecialchars($r['eventHorses']) . "</td>
                <td style='padding:7px 10px;border:1px solid #e0e0e0;text-align:right;'>Rs." . number_format($r['amount']) . "</td>
            </tr>";
        $i++;
    }
    $clubRows .= "</tbody></table>";
}

$htmlBody = "
<div style='font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6;color:#333;max-width:720px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;background:#fff;'>
    <div style='background:#1a1a1a;padding:30px;text-align:center;border-bottom:4px solid #b19355;'>
        <img src='https://hprc.in/hprc_logo.png' alt='HPRC Logo' style='max-width:180px;height:auto;'>
    </div>
    <div style='padding:40px;'>
        <h2 style='color:#1a1a1a;margin-top:0;font-size:22px;font-weight:700;border-bottom:2px solid #f0f0f0;padding-bottom:15px;'>
            Registrations Confirmed!
        </h2>
        <p style='font-size:15px;'>Dear <strong>Mohammed Abdul Mubeen</strong>,</p>
        <p style='font-size:15px;'>Thank you for registering your riders for the <strong>HPRC Equestrian Challenge 2026</strong>. Your payment has been received and all registrations below are confirmed.</p>

        <div style='background:#fdfaf4;border:1px solid #f1e6cc;padding:18px 20px;border-radius:8px;margin:25px 0;'>
            <table style='width:100%;'>
                <tr>
                    <td style='color:#666;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;padding-bottom:4px;width:33%;'>Total Entries</td>
                    <td style='color:#666;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;padding-bottom:4px;width:33%;'>Total Amount</td>
                    <td style='color:#666;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;padding-bottom:4px;width:33%;'>Payment Mode</td>
                </tr>
                <tr>
                    <td style='font-size:22px;font-weight:800;color:#1a1a1a;'>" . count($entries) . " entries</td>
                    <td style='font-size:22px;font-weight:800;color:#b19355;'>Rs." . number_format($total) . "</td>
                    <td style='font-size:18px;font-weight:700;color:#1a1a1a;'>Offline ✅</td>
                </tr>
            </table>
        </div>

        <h3 style='color:#1a1a1a;font-size:16px;margin:25px 0 5px;'>Registration Details</h3>
        $clubRows

        <div style='margin-top:30px;padding:15px;background:#e8f5e9;border:1px solid #a5d6a7;border-radius:6px;font-size:13px;color:#2e7d32;'>
            <strong>Event Dates:</strong> 13th to 18th May 2026 &nbsp;|&nbsp;
            <strong>Venue:</strong> Hyderabad Polo &amp; Riding Club
        </div>

        <div style='margin-top:30px;padding-top:25px;border-top:1px solid #f0f0f0;color:#777;font-size:13px;text-align:center;'>
            <p>For any queries, please contact the club office.</p>
            <p style='margin-top:20px;font-weight:bold;color:#1a1a1a;'>Team HPRC</p>
        </div>
    </div>
    <div style='background:#f9f9f9;padding:20px;text-align:center;border-top:1px solid #eee;font-size:11px;color:#aaa;text-transform:uppercase;letter-spacing:0.1em;'>
        Hyderabad Polo &amp; Riding Club &copy; 2026
    </div>
</div>";

// ─── STEP 3: SEND TO PARTICIPANT ──────────────────────────────────────────────
echo "=== STEP 3: Sending email to participant ===\n";
send_hprc_email(
    $email,
    "Mohammed Abdul Mubeen",
    "Registrations Confirmed - HPRC Equestrian Challenge 2026",
    $htmlBody
);
echo "  OK   Sent to: $email\n\n";

// ─── STEP 4: SEND TO ADMINS ───────────────────────────────────────────────────
echo "=== STEP 4: Sending to admins ===\n";
$adminNote = "<div style='background:#fff3cd;border:1px solid #ffc107;padding:12px 16px;border-radius:6px;font-size:13px;color:#856404;margin-bottom:20px;'>
    <strong>Admin Copy</strong> — Manual offline payment batch (Shiva entries).<br>
    Contact: $email | Entries: " . count($entries) . " | Total: Rs." . number_format($total) . "
</div>";
$adminHtml = $adminNote . $htmlBody;

$admins = [
    ['email' => 'info@hprc.co.in',         'name' => 'HPRC Info'],
    ['email' => 'hprc@bbin.in',             'name' => 'HPRC Admin'],
    ['email' => 'vinitha.venkat@gmail.com', 'name' => 'Vinitha Venkat'],
];
foreach ($admins as $admin) {
    send_hprc_email($admin['email'], $admin['name'], "NEW BATCH REGISTRATION - Shiva Entries (" . count($entries) . " riders) Rs." . number_format($total), $adminHtml);
    echo "  OK   Sent to: {$admin['email']}\n";
}

echo "\n=== ALL DONE ===\n";
echo "  Sheets rows : $sent / " . count($entries) . " sent\n";
echo "  Emails      : " . (1 + count($admins)) . " (1 participant + " . count($admins) . " admins)\n";
echo "  Total       : Rs." . number_format($total) . "\n";
