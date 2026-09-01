import type { Endpoint, PayloadRequest } from "payload";

// Server endpoint behind the "Import results" admin screen.
//
// Typing 21 classes of riders into admin forms after a competition weekend is
// not something anyone will do twice, so results are loaded from the scoring
// spreadsheet instead. The importer replaces a class's entries wholesale, which
// is also what you want when a correction lands after prize-giving.

export interface ParsedEntry {
  pos?: string;
  rider: string;
  horse: string;
  club?: string;
  ageGroup?: string;
  score?: string;
  penalties?: string;
  prize?: string;
}

// Column aliases, so the scoring sheet does not have to be renamed by hand.
const COLUMN_ALIASES: Record<string, keyof ParsedEntry> = {
  pos: "pos",
  position: "pos",
  place: "pos",
  placing: "pos",
  rank: "pos",
  rider: "rider",
  name: "rider",
  "rider name": "rider",
  competitor: "rider",
  horse: "horse",
  "horse name": "horse",
  pony: "horse",
  club: "club",
  team: "club",
  "club name": "club",
  age: "ageGroup",
  agegroup: "ageGroup",
  "age group": "ageGroup",
  "age band": "ageGroup",
  category: "ageGroup",
  score: "score",
  percentage: "score",
  "%": "score",
  penalties: "penalties",
  faults: "penalties",
  "total penalties": "penalties",
  prize: "prize",
  award: "prize",
};

// Guard rails. The importer is behind a login, but an editor pasting a huge
// file — or a compromised session — would otherwise have the whole thing parsed
// into memory on a 3.7 GB box that runs the site, the payment app and PHP-FPM.
// A class is a few dozen riders; these ceilings are far above any real sheet.
export const MAX_CSV_BYTES = 1_000_000; // 1 MB
export const MAX_ROWS = 2_000;

// Minimal RFC4180-ish parser: handles quoted fields, escaped quotes and commas
// inside quotes. Enough for a spreadsheet export, and avoids a dependency.
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  const src = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  for (let i = 0; i < src.length; i++) {
    const ch = src[i];

    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += ch;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

export interface ParseResult {
  entries: ParsedEntry[];
  mapped: string[];
  ignored: string[];
  warnings: string[];
}

// A dressage sheet may print "66.12%" or "66.12" where the site stores the raw
// decimal 0.6612 (results-types.ts documents this). Normalise on the way in so
// the rendered percentage does not silently change by a factor of 100.
function normaliseScore(raw: string): { value: string; warning?: string } {
  const t = raw.trim().replace("%", "");
  if (t === "") return { value: "" };
  const n = Number(t);
  if (Number.isNaN(n)) return { value: t };
  if (n > 1) return { value: String(n / 100) };
  return { value: t };
}

export function parseResultsCsv(text: string): ParseResult {
  const bytes = Buffer.byteLength(text, "utf8");
  if (bytes > MAX_CSV_BYTES) {
    return {
      entries: [],
      mapped: [],
      ignored: [],
      warnings: [
        `That file is ${(bytes / 1_000_000).toFixed(1)} MB. Import one class at a time — the limit is ${MAX_CSV_BYTES / 1_000_000} MB.`,
      ],
    };
  }

  const rows = parseCsv(text);
  const warnings: string[] = [];

  if (rows.length > MAX_ROWS + 1) {
    return {
      entries: [],
      mapped: [],
      ignored: [],
      warnings: [
        `That sheet has ${rows.length - 1} rows. A single class takes at most ${MAX_ROWS}; check you are not importing the whole competition at once.`,
      ],
    };
  }

  if (rows.length < 2) {
    return {
      entries: [],
      mapped: [],
      ignored: [],
      warnings: ["Need a header row and at least one entry."],
    };
  }

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const mapping: Array<keyof ParsedEntry | null> = header.map((h) => COLUMN_ALIASES[h] ?? null);

  const mapped: string[] = [];
  const ignored: string[] = [];
  header.forEach((h, i) => {
    if (mapping[i]) mapped.push(`${rows[0][i].trim()} → ${mapping[i]}`);
    else if (h !== "") ignored.push(rows[0][i].trim());
  });

  if (!mapping.includes("rider") || !mapping.includes("horse")) {
    warnings.push(
      "A 'rider' and a 'horse' column are required. Recognised headers include: pos, rider, horse, club, age group, score, penalties, prize.",
    );
    return { entries: [], mapped, ignored, warnings };
  }

  const entries: ParsedEntry[] = [];

  rows.slice(1).forEach((cells, idx) => {
    const e: Record<string, string> = {};
    mapping.forEach((key, i) => {
      if (!key) return;
      const raw = (cells[i] ?? "").trim();
      if (raw === "") return;
      if (key === "score") {
        const { value } = normaliseScore(raw);
        if (value) e.score = value;
      } else {
        e[key] = raw;
      }
    });

    if (!e.rider || !e.horse) {
      warnings.push(`Row ${idx + 2} skipped — missing rider or horse.`);
      return;
    }
    entries.push(e as unknown as ParsedEntry);
  });

  return { entries, mapped, ignored, warnings };
}

export const importResultsEndpoint: Endpoint = {
  path: "/import-results",
  method: "post",
  handler: async (req: PayloadRequest) => {
    if (!req.user) {
      return Response.json({ error: "Not authorised" }, { status: 401 });
    }

    let body: { classId?: string; csv?: string; dryRun?: boolean };
    try {
      body = (await req.json?.()) ?? {};
    } catch {
      return Response.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { classId, csv, dryRun } = body;
    if (!csv || typeof csv !== "string") {
      return Response.json({ error: "No CSV provided" }, { status: 400 });
    }
    if (Buffer.byteLength(csv, "utf8") > MAX_CSV_BYTES) {
      return Response.json(
        { error: `CSV too large — the limit is ${MAX_CSV_BYTES / 1_000_000} MB.` },
        { status: 413 },
      );
    }

    const parsed = parseResultsCsv(csv);

    // Preview mode — parse and report, change nothing.
    if (dryRun || !classId) {
      return Response.json({
        preview: true,
        count: parsed.entries.length,
        entries: parsed.entries.slice(0, 50),
        mapped: parsed.mapped,
        ignored: parsed.ignored,
        warnings: parsed.warnings,
      });
    }

    if (parsed.entries.length === 0) {
      return Response.json(
        { error: "Nothing to import.", warnings: parsed.warnings },
        { status: 400 },
      );
    }

    const existing = await req.payload.findByID({
      collection: "result-classes",
      id: classId,
      depth: 0,
    });

    if (!existing) {
      return Response.json({ error: "Result class not found" }, { status: 404 });
    }

    const replaced = existing.entries?.length ?? 0;

    await req.payload.update({
      collection: "result-classes",
      id: classId,
      data: { entries: parsed.entries },
    });

    return Response.json({
      preview: false,
      imported: parsed.entries.length,
      replaced,
      warnings: parsed.warnings,
      className: existing.title,
    });
  },
};
