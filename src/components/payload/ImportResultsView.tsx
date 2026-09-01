"use client";

import { useEffect, useState } from "react";

// "Import results" screen inside the Payload admin.
//
// Results arrive as a scoring spreadsheet after a competition weekend. Retyping
// 21 classes by hand is the difference between this feature being used and
// abandoned, so this screen takes a CSV, shows exactly how the columns were
// understood, and only writes once someone has looked at the preview.

interface ResultClassOption {
  id: string;
  title: string;
  setTitle: string;
  entryCount: number;
}

interface PreviewEntry {
  pos?: string;
  rider: string;
  horse: string;
  club?: string;
  ageGroup?: string;
  score?: string;
  penalties?: string;
  prize?: string;
}

interface PreviewState {
  count: number;
  entries: PreviewEntry[];
  mapped: string[];
  ignored: string[];
  warnings: string[];
}

const EXAMPLE = `pos,rider,horse,club,age group,score
1st,Gautam Sanjay Sujanaani,Airstrike,HPRC,14-18 yrs,66.12
2nd,Kumbham Sai Tanvi Reddy,Centaur,HPRC,14-18 yrs,53.75`;

export function ImportResultsView() {
  const [classes, setClasses] = useState<ResultClassOption[]>([]);
  const [classId, setClassId] = useState("");
  const [csv, setCsv] = useState("");
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<{
    imported: number;
    replaced: number;
    className: string;
  } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/cms-api/result-class-index", {
          credentials: "include",
        });
        const data = await res.json();
        setClasses(data.classes ?? []);
      } catch {
        setError("Could not load result classes.");
      }
    })();
  }, []);

  async function post(dryRun: boolean) {
    setBusy(true);
    setError("");
    if (dryRun) setDone(null);
    try {
      const res = await fetch("/cms-api/import-results", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csv, classId: dryRun ? undefined : classId, dryRun }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Import failed.");
        return;
      }
      if (dryRun) {
        setPreview(data);
      } else {
        setDone({
          imported: data.imported,
          replaced: data.replaced,
          className: data.className,
        });
        setPreview(null);
        setCsv("");
        setClasses((prev) =>
          prev.map((c) => (c.id === classId ? { ...c, entryCount: data.imported } : c)),
        );
      }
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCsv(String(reader.result ?? ""));
      setPreview(null);
      setDone(null);
    };
    reader.readAsText(file);
  }

  const selected = classes.find((c) => c.id === classId);

  return (
    <div style={{ padding: "var(--base, 24px)", maxWidth: 900 }}>
      <h1 style={{ marginBottom: 8 }}>Import results</h1>
      <p style={{ marginBottom: 24, opacity: 0.75, maxWidth: "60ch" }}>
        Paste or upload the scoring spreadsheet for one class. You will see how the columns were
        read before anything is saved. Importing <strong>replaces</strong> every entry in the chosen
        class, so it is also the way to correct a class after prize-giving.
      </p>

      {error ? (
        <div
          style={{
            border: "1px solid var(--theme-error-500, #a33)",
            background: "var(--theme-error-50, rgba(170,51,51,.08))",
            padding: "12px 14px",
            marginBottom: 20,
            borderRadius: 4,
          }}
        >
          {error}
        </div>
      ) : null}

      {done ? (
        <div
          style={{
            border: "1px solid var(--theme-success-500, #2c7a54)",
            background: "var(--theme-success-50, rgba(44,122,84,.08))",
            padding: "12px 14px",
            marginBottom: 20,
            borderRadius: 4,
          }}
        >
          Imported <strong>{done.imported}</strong> entries into <strong>{done.className}</strong>
          {done.replaced > 0 ? `, replacing ${done.replaced} previous entries` : ""}. The results
          page has been updated.
        </div>
      ) : null}

      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Class</label>
      <select
        value={classId}
        onChange={(e) => {
          setClassId(e.target.value);
          setDone(null);
        }}
        style={{ width: "100%", padding: 8, marginBottom: 20 }}
      >
        <option value="">Choose a class…</option>
        {classes.map((c) => (
          <option key={c.id} value={c.id}>
            {c.setTitle ? `${c.setTitle} — ` : ""}
            {c.title} ({c.entryCount} entries)
          </option>
        ))}
      </select>

      <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>CSV</label>
      <input
        type="file"
        accept=".csv,text/csv,text/plain"
        onChange={onFile}
        style={{ marginBottom: 10, display: "block" }}
      />
      <textarea
        value={csv}
        onChange={(e) => {
          setCsv(e.target.value);
          setPreview(null);
          setDone(null);
        }}
        placeholder={EXAMPLE}
        rows={10}
        spellCheck={false}
        style={{
          width: "100%",
          fontFamily: "monospace",
          fontSize: 13,
          padding: 10,
          marginBottom: 8,
        }}
      />
      <p style={{ fontSize: 13, opacity: 0.7, marginBottom: 20 }}>
        Recognised headers: pos, rider, horse, club, age group, score, penalties, prize. Rider and
        horse are required. Dressage scores may be written as 66.12 or 66.12% — both are stored as
        0.6612 so the site prints 66.12%.
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
        <button type="button" onClick={() => post(true)} disabled={!csv.trim() || busy}>
          {busy ? "Working…" : "Preview"}
        </button>
        <button
          type="button"
          onClick={() => post(false)}
          disabled={!preview || !classId || busy || preview.entries.length === 0}
        >
          {selected
            ? `Replace ${selected.entryCount} entries in "${selected.title}"`
            : "Choose a class first"}
        </button>
      </div>

      {preview ? (
        <div>
          <h2 style={{ marginBottom: 10 }}>Preview — {preview.count} entries</h2>

          {preview.mapped.length > 0 ? (
            <p style={{ fontSize: 13, marginBottom: 6 }}>
              <strong>Columns read:</strong> {preview.mapped.join(", ")}
            </p>
          ) : null}
          {preview.ignored.length > 0 ? (
            <p style={{ fontSize: 13, marginBottom: 6, opacity: 0.75 }}>
              <strong>Ignored:</strong> {preview.ignored.join(", ")}
            </p>
          ) : null}
          {preview.warnings.length > 0 ? (
            <ul style={{ fontSize: 13, marginBottom: 12, paddingLeft: 18 }}>
              {preview.warnings.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          ) : null}

          {preview.entries.length > 0 ? (
            <div style={{ overflowX: "auto", border: "1px solid var(--theme-elevation-150)" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
                <thead>
                  <tr>
                    {["Pos", "Rider", "Horse", "Club", "Age", "Score", "Penalties", "Prize"].map(
                      (h) => (
                        <th
                          key={h}
                          style={{
                            textAlign: "left",
                            padding: "8px 10px",
                            borderBottom: "1px solid var(--theme-elevation-150)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {preview.entries.map((e, i) => (
                    <tr key={i}>
                      {[
                        e.pos,
                        e.rider,
                        e.horse,
                        e.club,
                        e.ageGroup,
                        e.score,
                        e.penalties,
                        e.prize,
                      ].map((v, j) => (
                        <td
                          key={j}
                          style={{
                            padding: "7px 10px",
                            borderBottom: "1px solid var(--theme-elevation-100)",
                          }}
                        >
                          {v ?? "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
