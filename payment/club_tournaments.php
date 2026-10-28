<?php
// Registry of HPRC club tournaments (members-only, individual players, fixed fee).
// One entry per edition, keyed by slug "{sport}-{YYYY}-{MM}". Every edition shares
// the `club_tournament_entries` table and the clubTournament*Handler.php pair; the
// form posts its slug in the hidden `tournament` field and everything else
// (name, dates, fee, redirect page) is looked up here server-side.
//
// To add the next edition: add an entry below, then add the matching entry in
// src/content/club-tournaments.ts and a thin page under src/app/(site)/events/.
// Keep `fee` and `registrationOpen` in sync with the TS file.

function club_tournaments() {
    return [
        'polo-2026-10' => [
            'name'             => 'HPRC Club Championship',
            'label'            => 'Polo Tournament',
            'sport'            => 'polo',
            'dates'            => '29th October to 1st November 2026',
            'fee'              => 5000,
            'registrationOpen' => true,
            'pagePath'         => '/events/hprc-club-championship-oct-26',
        ],
    ];
}

// Returns the edition config for a slug, or null if unknown.
function club_tournament($slug) {
    $all = club_tournaments();
    return isset($all[$slug]) ? $all[$slug] : null;
}
