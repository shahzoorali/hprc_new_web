// Masks personal data in bot transcripts for display. The club's own published
// numbers and email are left alone — the bot quotes them in most answers.

const CLUB_VALUES = ["9949000085", "7799259000", "9100033323", "ridingschool@bbin.in"];

const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
// Phone-like runs: optional +, then 10+ digits allowing spaces/dashes between.
const PHONE = /\+?\d(?:[\s-]?\d){9,}/g;
// Card / Aadhaar / ID-like digit runs of 8+ that survived the phone pass.
const LONG_DIGITS = /\b\d{8,}\b/g;
// Opaque tokens / keys.
const TOKEN = /\b[A-Za-z0-9_-]{28,}\b/g;

function keep(match: string): boolean {
  const digits = match.replace(/\D/g, "");
  return CLUB_VALUES.some(
    (v) => match.toLowerCase().includes(v) || (digits.length >= 10 && digits.endsWith(v)),
  );
}

export function maskPii(text: string): string {
  return text
    .replace(EMAIL, (m) => (keep(m) ? m : "[email]"))
    .replace(PHONE, (m) => (keep(m) ? m : "[phone]"))
    .replace(LONG_DIGITS, (m) => (keep(m) ? m : "[number]"))
    .replace(TOKEN, "[token]");
}

export function containsPii(text: string): boolean {
  return maskPii(text) !== text;
}
