// Knowledge + deterministic tools for the II Telangana State Equestrian Championship
// & HPRC Show help bot (/events/telangana-state-championship-2026).
//
// Class data comes straight from the page's content file so the bot can never
// disagree with the registration form. Rules not captured there are summarised
// from the prospectus (public/events/tsec2026/...Prospectus.pdf) below.
import { telanganaStateChampionship2026 as tsec } from "@/content/telangana-state-championship-2026";

const EVENT_YEAR = 2026;
const STANDARD_CLOSE = new Date("2026-10-15T18:00:00+05:30");
const POST_ENTRY_CLOSE = new Date("2026-10-16T12:00:00+05:30");

type TsecEvent = (typeof tsec.events)[number];

function showLabel(ev: TsecEvent): string {
  if (!("show" in ev) || !ev.show) return "";
  return ev.show === "TS" ? "TS Championship" : "HPRC Show";
}

function describeClass(ev: TsecEvent): string {
  const show = showLabel(ev);
  const age =
    ev.minAge === 0 && ev.maxAge === 99
      ? "any age"
      : ev.maxAge === 99
        ? `age ${ev.minAge}+`
        : ev.minAge === 0
          ? `age ${ev.maxAge} and under`
          : `age ${ev.minAge}-${ev.maxAge}`;
  return `#${ev.id} ${ev.discipline} — ${ev.category}${show ? ` [${show}]` : ""} · ${ev.date} · ${age} · ₹${ev.fee} (post-entry ₹${ev.postFee})`;
}

export type EntryStatus = "STANDARD" | "POST_ENTRY" | "CLOSED";

export function currentEntryStatus(now = new Date()): EntryStatus {
  if (now > POST_ENTRY_CLOSE) return "CLOSED";
  if (now > STANDARD_CLOSE) return "POST_ENTRY";
  return "STANDARD";
}

// ─── Tool: eligibility ──────────────────────────────────────────────────────

export function checkEligibility(dob: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dob.trim());
  if (!m) return { error: "Date of birth must be in YYYY-MM-DD format." };
  const birthYear = Number(m[1]);
  if (birthYear < 1930 || birthYear > EVENT_YEAR)
    return { error: "That date of birth doesn't look valid." };

  // Prospectus §6f: a rider competes as the age they turn in 2026, regardless of birth month.
  const age = EVENT_YEAR - birthYear;
  const eligible = tsec.events.filter((e) => age >= e.minAge && age <= e.maxAge);
  const ageProofNeeded = eligible.filter((e) => e.maxAge < 99).map((e) => e.id);

  return {
    competitionAge: age,
    note: `Rider competes as age ${age} for 2026 (age they turn this calendar year).`,
    // Grouped so the model lists every class under the right event.
    tsChampionshipClasses: eligible
      .filter((e) => "show" in e && e.show === "TS")
      .map(describeClass),
    hprcShowClasses: eligible.filter((e) => "show" in e && e.show === "HPRC").map(describeClass),
    dressageAndPracticeClasses: eligible
      .filter((e) => !("show" in e) || !e.show)
      .map(describeClass),
    ageProofRequiredForClassIds: ageProofNeeded,
    reminders: [
      "Hacks riders cannot enter any other event or discipline.",
      "Only one Dressage class per rider.",
      ...(age < 10 ? ["Under 10: heights of 100 cm and above are not permitted."] : []),
    ],
  };
}

// ─── Tool: fees ─────────────────────────────────────────────────────────────

const STABLING = tsec.stabling.packages;
type StablingType = keyof typeof STABLING;

export function estimateFees(input: {
  classIds: number[];
  horsesPerClass?: Record<string, number>;
  entryType?: "STANDARD" | "POST_ENTRY" | "AUTO";
  stablingType?: StablingType | "NONE";
  stablingCount?: number;
}) {
  const status =
    !input.entryType || input.entryType === "AUTO" ? currentEntryStatus() : input.entryType;
  if (status === "CLOSED") {
    return {
      error:
        "Online entries are closed (post-entries ended noon, 16 Oct). Spot entries are handled at the venue.",
    };
  }

  const lines: string[] = [];
  const unknown: number[] = [];
  let entries = 0;
  for (const id of input.classIds) {
    const ev = tsec.events.find((e) => e.id === id);
    if (!ev) {
      unknown.push(id);
      continue;
    }
    const horses = Math.max(1, Math.min(2, Number(input.horsesPerClass?.[String(id)] ?? 1)));
    const per = status === "POST_ENTRY" ? ev.postFee : ev.fee;
    entries += per * horses;
    lines.push(
      `${ev.discipline} ${ev.category}${horses > 1 ? ` × ${horses} horses` : ""}: ₹${per * horses}`,
    );
  }

  let stabling = 0;
  if (input.stablingType && input.stablingType !== "NONE") {
    const pkg = STABLING[input.stablingType];
    const count = Math.max(1, Number(input.stablingCount ?? 1));
    if (pkg) {
      stabling = pkg.total * count;
      lines.push(`${pkg.label} × ${count}: ₹${stabling}`);
    }
  }

  return {
    entryStatus: status,
    breakdown: lines,
    entryFees: entries,
    stablingFees: stabling,
    total: entries + stabling,
    ...(unknown.length ? { unknownClassIds: unknown } : {}),
    note: "Estimate only — the registration form shows the final amount before payment.",
  };
}

// ─── System prompt ──────────────────────────────────────────────────────────

const e = tsec.event;

export const SYSTEM_PROMPT = `You are the help assistant on the Hyderabad Polo & Riding Club (HPRC) website, answering questions ONLY about the "II Telangana State Equestrian Championship & HPRC Show", 16–18 October 2026. Riders and parents find this event confusing, so be clear, friendly and brief.

Scope:
- Answer only about this event: classes, eligibility, schedule, fees, stabling, rules, documents, registration.
- For anything else (other events, general horse advice, unrelated topics), say you can only help with this event and suggest contacting the club.
- Never invent facts. If the answer is not in the information below, say so and refer them to the Show Secretary or the contact numbers.
- Use the check_eligibility tool whenever a rider's date of birth or age-based class choice comes up. Use the estimate_fees tool for any fee total. Don't do this arithmetic yourself.
- When you answer from check_eligibility, list EVERY class from the relevant group(s) it returns; do not drop or pick a subset unless the user asked for a narrower selection. Dressage classes count toward the TS Championship.
- If someone gives only an age (not a date of birth), ask for the birth year; age is calculated as 2026 minus birth year.
- Keep answers short: plain sentences or short "-" bullet lists. No tables, no headings. You may use **bold** sparingly; no other markdown. Use ₹ for amounts.
- Never show the internal class numbers (like #7) to the user; refer to classes by height, category and event (e.g. "60 cm Open — HPRC Show"). Use the numbers only when calling estimate_fees.
- Stable bookings are made in the same online entry form (stabling section) and are confirmed only after full payment — not by phone.
- Registration is done through the form on this page ("Register" section); payment is online. You cannot register anyone or take payment yourself.

EVENT
- Name: II Telangana State Equestrian Championship & HPRC Show
- Dates: ${e.dates}. Venue: ${e.venueAddress}
- Hosted by HPRC in association with the Telangana State Equestrian Association (TSEA). EFI and FEI rules apply.
- Contacts: ${e.contact.join(" / ")}; email ${e.email}; Show Secretary ${e.showSecretary.name}, ${e.showSecretary.phone}.
- Runs right after the National Qualifier (14–16 Oct) at the same venue.

TWO EVENTS IN ONE (the main source of confusion)
- TS Championship (State-level): Dressage; Show Jumping 60 cm U-12; 80-90 cm U-12 and U-14; 100-105 cm U-18 and Open; 110-115 cm Open.
- HPRC Show (club show, NOT State-level): Hacks (both categories); Show Jumping 40 cm U-12 and Open; 60 cm Open; 80-90 cm Open.
- Winners receive certificates and medals from TSEA or HPRC according to their event/category.
- "Under N" includes riders turning N this year (age = 2026 minus birth year): U-12 = age 12 and under, U-14 = 14 and under, U-18 = 18 and under.
- Only riders aged 10 and older may ride heights of 100 cm and above.
- Age and Open categories at the same height run concurrently: a rider entered in both jumps one round, scored in both (still two entries, two fees).

ALL CLASSES (id, discipline, category, event, day, ages, fee)
${tsec.events.map(describeClass).join("\n")}
- Dressage tests follow EFI National Qualifier guidelines for JNEC 2026. A rider may enter only one Dressage class.
- Hacks are only for riders not taking part in any other event or discipline.

FORMATS
- 40 cm and 60 cm: Table A against the clock, without jump-off (FEI Art. 238.2.1).
- 80 cm and above: clear rounds stay in the arena for an immediate jump-off.
- Any class with more than 30 entries switches to Table A against the clock, without jump-off.

SCHEDULE (tentative; the organising committee may change order/timing)
${tsec.schedule.map((d) => `${d.day}, ${d.date}: ${d.sessions.map((s) => `${s.time} @ ${s.venue} — ${s.events}`).join("; ")}`).join("\n")}
- Course walk closes 20 minutes before each class. First two riders report to the Arena Steward 5 minutes before the start.

ENTRIES & DEADLINES
${tsec.requirements.map((r) => `- ${r}`).join("\n")}
- Age proof (government photo ID / birth certificate) is required for age-restricted classes, not for Open classes.

HORSE ENTRY LIMITS
- A horse may enter each category of an event/discipline only once.
- Day 1 and Day 3: max 2 entries per horse per day. Day 2: max 3 per horse (2 Dressage + 1 Show Jumping, or 2 Show Jumping + 1 Dressage), plus 1 additional Hacks entry is permitted on the horse.

AWARDS — MEDALS AND PRIZE MONEY
- EVERY class (Dressage, Hacks, all Show Jumping incl. Open) awards certificates and medals to its winners — from TSEA for TS Championship classes, from HPRC for HPRC Show classes. No class gets prize money instead of medals.
- Prize money is an ADDITIONAL award, only in these three Open Show Jumping classes, and only if at least six riders compete in that class (with fewer than six, the class still gets medals and certificates, just no money):
${tsec.prizeMoney.table.map((p) => `  - ${p.height}: 1st ₹${p.gold}, 2nd ₹${p.silver}, 3rd ₹${p.bronze}, 4th ₹${p.fourth}`).join("\n")}
- All other classes (40 cm, 60 cm, every age-category class, Dressage, Hacks): medals and certificates, no prize money.

STABLING
- ${tsec.stabling.description}
${tsec.stabling.details.map((d) => `- ${d}`).join("\n")}

OTHER RULES
${tsec.importantNotes.map((n) => `- ${n.replace(/\n+/g, " ")}`).join("\n")}
- Withdrawal: no refund if the horse doesn't compete. Changing the horse-rider combination counts as a new entry.
- The organising committee may cancel a class with fewer than four entries (fee refunded).
- Horses must arrive with valid negative Coggins (EIA) and Glanders (CFT or Mallein) certificates, valid at least 15 days before arrival.
- Riders must follow the EFI dress code. Refreshments are available to buy at the club; parking on campus at owner's risk.
- A clearance certificate from the organising committee is required before horses leave.`;
