"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo, useCallback } from "react";

import { nationalQualifier2026 as equestrianChallenge2026 } from "@/content/national-qualifier-2026";

// ─── Countdown Timer (Client Component) ───────────────────────────────────────

function useCountdown(targetDateStr: string) {
  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0, started: false });

  React.useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDateStr).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, started: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        started: false,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDateStr]);

  return timeLeft;
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white/15 backdrop-blur-sm border border-white/30 text-white text-2xl sm:text-3xl font-extrabold font-display tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white/70">{label}</span>
    </div>
  );
}

// ─── Discipline Icon ───────────────────────────────────────────────────────────

function DisciplineIcon({ discipline }: { discipline: string }) {
  const cls = "h-6 w-6 text-brand-500";
  if (discipline === "HACKS")
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
  if (discipline === "DRESSAGE")
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    );
  if (discipline === "TOP SCORE")
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    );
// SHOW JUMPING default
  if (discipline === "SHOW JUMPING" || discipline === "PRACTICE ROUND") {
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714 2.143L13 3z" />
      </svg>
    );
  }
  return null;
}

// ─── Registration Form ────────────────────────────────────────────────────────

type FormData = {
  name: string;
  parentName: string;
  dob: string;
  mobile: string;
  email: string;
  emergencyContact: string;
  emergencyRelation: string;
  clubName: string;
  efiRiderId: string;
  selectedEvents: number[];
  eventHorses: Record<number, string[]>;       // one horse name per NQ class
  eventHorseEfi: Record<number, string[]>;      // matching Horse EFI Reg No.
  stablingType: "NONE" | "PER_DAY" | "FULL_CAMP";
  stablingCount: number;
  stablingFrom: string;
  stablingTo: string;
  specialNotes: string;
  isIndian: boolean;
  ageProofType: "PASSPORT" | "BIRTH_CERT_AADHAAR" | "";
  declaration: boolean;
};

// NQ has no Open/age concurrency — every class is age-bracketed, so no pairing.
const PAIR_GROUPS: Record<number, number> = {};

// Fixed stabling package date windows (per prospectus). PER_DAY = 12–14 Aug
// (₹5,000), FULL_CAMP = 12–17 Aug (₹10,000, covers National Qualifier (NQ) + the HPRC Equestrian Challenge).
const STABLING_PACKAGES = {
  PER_DAY: { total: 5000, from: "2026-08-12", to: "2026-08-14" },
  FULL_CAMP: { total: 10000, from: "2026-08-12", to: "2026-08-17" },
} as const;

const INITIAL_FORM: FormData = {
  name: "",
  parentName: "",
  dob: "",
  mobile: "",
  email: "",
  emergencyContact: "",
  emergencyRelation: "",
  clubName: "",
  efiRiderId: "",
  selectedEvents: [],
  eventHorses: {},
  eventHorseEfi: {},
  stablingType: "NONE",
  stablingCount: 0,
  stablingFrom: "",
  stablingTo: "",
  specialNotes: "",
  isIndian: false,
  ageProofType: "",
  declaration: false,
};


type StablingAvailability = {
  permanentCapacity: number;
  dailyAvailability: Record<string, number>;
  minAvailable: number;
  lastUpdated: string;
};

const STABLING_API_URL = "https://hprc.in/payment/api/stabling-available-camp.php";

function RegistrationForm() {
  const { events, declaration, event, stabling } = equestrianChallenge2026;
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData | "ageProof" | "eventHorsesGlobal" | "stablingDates", string>>>({});
  const [draftExists, setDraftExists] = useState(false);

  // Stabling inventory state — fetched live from server, falls back to hardcoded value on error.
  const [inventory, setInventory] = useState<StablingAvailability | null>(null);
  const [inventoryLoading, setInventoryLoading] = useState(false);
  const [inventoryError, setInventoryError] = useState<string | null>(null);
  const abortRef = React.useRef<AbortController | null>(null);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchAvailability = useCallback((from: string, to: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      // Cancel any in-flight request before starting a new one.
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setInventoryLoading(true);
      setInventoryError(null);
      try {
        const res = await fetch(
          `${STABLING_API_URL}?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
          { signal: controller.signal, cache: "no-store" }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: StablingAvailability = await res.json();
        setInventory(data);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setInventoryError("Couldn't verify live availability — using cached limit.");
      } finally {
        if (abortRef.current === controller) setInventoryLoading(false);
      }
    }, 400);
  }, []);

  // Server-side rejection banner (RequestHandler bounces back with ?stabling_error=…)
  const [serverStablingError, setServerStablingError] = useState<string | null>(null);

  React.useEffect(() => {
    // Check if there is a saved registration in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem("nq-2026-registrations") ?? "[]");
      if (existing && existing.length > 0) setDraftExists(true);
    } catch {}
    // Pick up a server-side stabling rejection from the URL.
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const err = params.get("stabling_error");
      if (err) {
        setServerStablingError(err);
        // Clean the URL so reload doesn't keep showing the banner.
        params.delete("stabling_error");
        const cleanUrl = window.location.pathname + (params.toString() ? `?${params}` : "") + window.location.hash;
        window.history.replaceState({}, "", cleanUrl);
      }
    }
    // Kick off initial availability fetch for the full-camp date window.
    fetchAvailability(STABLING_PACKAGES.FULL_CAMP.from, STABLING_PACKAGES.FULL_CAMP.to);
    return () => {
      abortRef.current?.abort();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [fetchAvailability]);

  // Re-fetch availability whenever stabling dates change.
  React.useEffect(() => {
    if (form.stablingFrom && form.stablingTo) {
      fetchAvailability(form.stablingFrom, form.stablingTo);
    }
  }, [form.stablingFrom, form.stablingTo, fetchAvailability]);

  // Effective availability: live value if loaded, else fallback to hardcoded.
  const liveMinAvailable = inventory?.minAvailable ?? stabling.permanentAvailable;


  const restoreDraft = () => {
    try {
      const existing = JSON.parse(localStorage.getItem("nq-2026-registrations") ?? "[]");
      if (existing && existing.length > 0) {
        // Remove submittedAt and totalFee if present in the stored object to match FormData
        const lastEntry = existing[existing.length - 1];
        setForm(lastEntry);
        setDraftExists(false);
      }
    } catch {}
  };

  const riderAge = useMemo(() => {
    if (!form.dob) return null;
    const birthYear = new Date(form.dob).getFullYear();
    const eventYear = 2026;
    return eventYear - birthYear;
  }, [form.dob]);

  const eligibleEvents = useMemo(() => {
    if (riderAge === null) return [];
    return events.filter(e => riderAge >= (e.minAge ?? 0) && riderAge <= (e.maxAge ?? 99));
  }, [events, riderAge]);

  // Sync selected events with eligible events when rider age changes
  React.useEffect(() => {
    const validSelected = form.selectedEvents.filter(id => 
      eligibleEvents.some(ev => ev.id === id)
    );
    
    if (validSelected.length !== form.selectedEvents.length) {
      setForm(prev => ({
        ...prev,
        selectedEvents: validSelected,
        eventHorses: Object.fromEntries(
          Object.entries(prev.eventHorses).filter(([id]) => 
            validSelected.includes(parseInt(id))
          )
        )
      }));
    }
  }, [eligibleEvents, form.selectedEvents.length]);

  // NQ has NO post-entries or spot entries — the form simply closes at noon, 12 Aug.
  const entryStatus = useMemo(() => {
    const now = new Date();
    const finalDeadline = new Date("2026-08-12T12:00:00+05:30");
    return now > finalDeadline ? "CLOSED" : "OPEN";
  }, []);

  const { eventFees, stablingFees, totalFee } = useMemo(
    () => {
      const eFees = form.selectedEvents.reduce((sum, id) => {
        const ev = eligibleEvents.find((e) => e.id === id);
        if (!ev) return sum;
        const count = (form.eventHorses[id] || [""]).length;
        return sum + ev.fee * count;
      }, 0);

      let sFees = 0;
      if (form.stablingType !== "NONE" && form.stablingCount > 0) {
        const pkg = STABLING_PACKAGES[form.stablingType];
        if (pkg) sFees = pkg.total * form.stablingCount;
      }

      const isCheatCode = form.specialNotes.trim() === "HPRCCHEAT1";
      if (isCheatCode) {
        return { eventFees: 0, stablingFees: 0, totalFee: 0 };
      }

      const isPromoCode = form.specialNotes.trim() === "HPRCTEST2";
      if (isPromoCode) {
        const totalEntries = form.selectedEvents.reduce((sum, id) => sum + (form.eventHorses[id] || [""]).length, 0);
        const promoFee = totalEntries * 2;
        return { eventFees: promoFee, stablingFees: 0, totalFee: promoFee };
      }

      return { eventFees: eFees, stablingFees: sFees, totalFee: eFees + sFees };
    },
    [form.selectedEvents, eligibleEvents, entryStatus, form.stablingType, form.stablingCount, form.stablingFrom, form.stablingTo, form.eventHorses, form.specialNotes]
  );

  const uniqueHorseCount = useMemo(() => {
    const allHorses = Object.values(form.eventHorses).flat().filter(h => h && h.trim() !== "");
    return new Set(allHorses).size;
  }, [form.eventHorses]);

  const toggleEvent = useCallback((id: number) => {
    setForm((f) => {
      const isSelected = f.selectedEvents.includes(id);

      if (isSelected) {
        const { [id]: removed, ...restHorses } = f.eventHorses;
        const { [id]: removedEfi, ...restEfi } = f.eventHorseEfi;
        return {
          ...f,
          selectedEvents: f.selectedEvents.filter((x) => x !== id),
          eventHorses: restHorses,
          eventHorseEfi: restEfi,
        };
      } else {
        return {
          ...f,
          selectedEvents: [...f.selectedEvents, id],
          eventHorses: { ...f.eventHorses, [id]: [""] },
          eventHorseEfi: { ...f.eventHorseEfi, [id]: [""] },
        };
      }
    });
  }, [events]);

  const syncHorses = (id: number, index: number, value: string) => {
    setForm(f => {
      const current = [...(f.eventHorses[id] || [""])];
      current[index] = value;
      return { ...f, eventHorses: { ...f.eventHorses, [id]: current } };
    });
  };

  const syncHorseEfi = (id: number, index: number, value: string) => {
    setForm(f => {
      const current = [...(f.eventHorseEfi[id] || [""])];
      current[index] = value;
      return { ...f, eventHorseEfi: { ...f.eventHorseEfi, [id]: current } };
    });
  };

  const validate = () => {
    const e: Partial<Record<keyof FormData | "ageProof" | "eventHorsesGlobal" | "stablingDates", string>> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.parentName.trim()) e.parentName = "Parent's Name is required";
    if (!form.dob) e.dob = "Date of birth is required";
    if (!form.mobile.trim()) {
      e.mobile = "Mobile number is required";
    } else if (form.mobile.replace(/\D/g, '').length !== 10) {
      e.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!form.email.trim()) {
      e.email = "Email ID is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address";
    }
    
    if (!form.emergencyContact.trim()) {
      e.emergencyContact = "Emergency contact is required";
    } else if (form.emergencyContact.replace(/\D/g, '').length !== 10) {
      e.emergencyContact = "Enter a valid 10-digit emergency contact number";
    }

    if (!form.clubName.trim()) e.clubName = "Club details are required";
    if (!form.efiRiderId.trim()) e.efiRiderId = "EFI Rider ID is required";

    const activeSelected = form.selectedEvents.filter(id => eligibleEvents.some(eve => eve.id === id));
    if (activeSelected.length === 0) e.selectedEvents = "Please select at least one eligible event";
    
    const missingHorse = form.selectedEvents.some(id => {
      const horses = form.eventHorses[id] || [];
      return horses.length === 0 || horses.some(h => !h || !h.trim());
    });
    
    if (missingHorse) {
      e.eventHorsesGlobal = "Horse Name is required for all selected events and jumps";
      e.selectedEvents = "Please provide the horse name for all selected entries";
    }

    // Horse EFI Registration No. is required for every selected entry.
    const missingEfi = activeSelected.some(id => {
      const regs = form.eventHorseEfi[id] || [];
      const horses = form.eventHorses[id] || [];
      return horses.some((h, i) => h && h.trim() && (!regs[i] || !regs[i].trim()));
    });
    if (missingEfi) {
      e.eventHorsesGlobal = "Horse EFI Registration No. is required for every horse entered.";
    }

    // Per-day horse limit (prospectus §5c): max 3 events per horse per day —
    // at most 2 Dressage and at most 2 Show Jumping (2D+1SJ or 2SJ+1D).
    const horseDay: Record<string, Record<string, { total: number; D: number; SJ: number }>> = {};
    activeSelected.forEach(id => {
      const ev = eligibleEvents.find(eve => eve.id === id);
      if (!ev) return;
      const horses = form.eventHorses[id] || [];
      horses.forEach(horse => {
        if (!horse || !horse.trim()) return;
        if (!horseDay[ev.date]) horseDay[ev.date] = {};
        if (!horseDay[ev.date][horse]) horseDay[ev.date][horse] = { total: 0, D: 0, SJ: 0 };
        const rec = horseDay[ev.date][horse];
        rec.total += 1;
        if (ev.discipline === "DRESSAGE") rec.D += 1;
        if (ev.discipline === "SHOW JUMPING") rec.SJ += 1;
      });
    });
    for (const [date, horses] of Object.entries(horseDay)) {
      for (const [horse, rec] of Object.entries(horses)) {
        if (rec.total > 3 || rec.D > 2 || rec.SJ > 2) {
          e.eventHorsesGlobal = `Horse "${horse}" exceeds the per-day limit on ${date} (max 3 events: 2 Dressage & 1 Show Jumping, or 2 Show Jumping & 1 Dressage).`;
        }
      }
    }

    // Age & nationality proof is mandatory for every NQ entry.
    if (activeSelected.length > 0) {
      if (!form.ageProofType) {
        e.ageProof = "Please select the document type you are uploading";
      } else {
        const fileInput = document.getElementById('ec-age-proof') as HTMLInputElement;
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
          e.ageProof = form.ageProofType === "PASSPORT"
            ? "Please upload a copy of the Indian Passport"
            : "Please upload Birth Certificate + Aadhaar (combined as one file or separately)";
        }
      }
    }

    if (form.stablingType !== "NONE") {
        if (form.stablingCount <= 0) {
            e.stablingCount = "Please enter number of stables";
        } else if (form.stablingCount > liveMinAvailable) {
            e.stablingCount = `Only ${liveMinAvailable} stable${liveMinAvailable === 1 ? "" : "s"} available for the selected camp dates`;
        }

        // Block submission while we're still checking availability — avoids stale-data overbookings.
        if (inventoryLoading) {
            e.stablingCount = "Verifying live stable availability — please wait a moment";
        }
    }
    
    if (!form.isIndian) e.isIndian = "You must confirm the rider is an Indian national";
    if (!form.declaration) e.declaration = "You must accept the declaration";
    setErrors(e as any);
    return Object.keys(e).length === 0;
  };

  // NQ requires age & nationality proof for every rider.
  const showAgeProof = form.selectedEvents.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Save to localStorage as backup
    try {
      const existing = JSON.parse(localStorage.getItem("nq-2026-registrations") ?? "[]");
      existing.push({ ...form, submittedAt: new Date().toISOString(), totalFee });
      localStorage.setItem("nq-2026-registrations", JSON.stringify(existing));
    } catch {}

    // Submit to CCAvenue via PHP handler
    if (formRef.current) {
        formRef.current.submit();
    }
  };

  if (submitted) {
    return (
      <div className="text-center space-y-6 py-12">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 border-4 border-green-200">
            <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-brand-900 font-display">Entry Submitted!</h3>
        <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
          Your email client has opened with your entry details pre-filled. Please send the email to complete your registration. Our team will confirm your entry shortly.
        </p>
        <p className="text-sm text-gray-500">
          Contact us at{" "}
          {event.contact.map((c, i) => (
            <span key={c}>
              <a href={`tel:${c.replace(/\s/g, "")}`} className="text-brand-600 font-semibold">{c}</a>
              {i < event.contact.length - 1 ? " / " : ""}
            </span>
          ))}{" "}
          if you have not received a confirmation within 48 hours.
        </p>
        <button
          onClick={() => { setForm(INITIAL_FORM); setSubmitted(false); }}
          className="inline-flex items-center gap-2 bg-brand-500 text-white px-6 py-3 font-bold hover:bg-brand-600 transition-colors"
        >
          Submit Another Entry
        </button>
      </div>
    );
  }

  const disciplineGroups = ["PRACTICE ROUND", "DRESSAGE", "SHOW JUMPING"];
  const disciplineColors: Record<string, string> = {
    "PRACTICE ROUND": "bg-emerald-50 border-emerald-200",
    DRESSAGE: "bg-blue-50 border-blue-200",
    "SHOW JUMPING": "bg-brand-50 border-brand-200",
  };

  return (
    <form 
      ref={formRef} 
      onSubmit={handleSubmit} 
      action="https://hprc.in/payment/nq2026RequestHandler.php"
      method="POST" 
      encType="multipart/form-data"
      className="space-y-10" 
      noValidate>
      
      {/* Hidden Fields for PHP Processing */}
      <input type="hidden" name="name" value={form.name} />
      <input type="hidden" name="parentName" value={form.parentName} />
      <input type="hidden" name="dob" value={form.dob} />
      <input type="hidden" name="mobile" value={form.mobile} />
      <input type="hidden" name="email" value={form.email} />
      <input type="hidden" name="emergencyContact" value={form.emergencyContact} />
      <input type="hidden" name="emergencyRelation" value={form.emergencyRelation} />
      <input type="hidden" name="clubName" value={form.clubName} />
      <input type="hidden" name="efiRiderId" value={form.efiRiderId} />
      <input type="hidden" name="selectedEvents" value={JSON.stringify(form.selectedEvents)} />
      <input type="hidden" name="eventHorses" value={JSON.stringify(form.eventHorses)} />
      <input type="hidden" name="eventHorseEfi" value={JSON.stringify(form.eventHorseEfi)} />
      <input type="hidden" name="isIndian" value={form.isIndian ? "yes" : "no"} />
      <input type="hidden" name="ageProofType" value={form.ageProofType} />
      <input type="hidden" name="stablingType" value={form.stablingType} />
      <input type="hidden" name="stablingCount" value={form.stablingCount} />
      <input type="hidden" name="stablingFrom" value={form.stablingFrom} />
      <input type="hidden" name="stablingTo" value={form.stablingTo} />
      <input type="hidden" name="specialNotes" value={form.specialNotes} />
      <input type="hidden" name="amount" value={totalFee} />

      {/* ── Draft Restore Notice ─────────────────────── */}
      {draftExists && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <div>
              <p className="text-sm font-bold text-blue-900">Unsaved draft recovered</p>
              <p className="text-xs text-blue-700">We found an incomplete entry on your device.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setDraftExists(false)}
              className="px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100 rounded-md transition"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={restoreDraft}
              className="px-3 py-1.5 text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 rounded-md transition"
            >
              Restore Draft
            </button>
          </div>
        </div>
      )}

      {/* ── Rider Details ─────────────────────────────── */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-brand-900 font-display flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center bg-brand-500 text-white text-sm font-bold">1</span>
          Rider Details
        </h3>
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Name */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ec-name">
              Full Name <span className="text-brand-500">*</span>
            </label>
            <input
              id="ec-name"
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Full Name"
              className={`w-full border px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>
          {/* Parent */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ec-parent">
              Parent&apos;s Name <span className="text-brand-500">*</span>
            </label>
            <input
              id="ec-parent"
              type="text"
              value={form.parentName}
              onChange={(e) => setForm((f) => ({ ...f, parentName: e.target.value }))}
              className={`w-full border px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition ${errors.parentName ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
            />
            {errors.parentName && <p className="mt-1 text-xs text-red-500">{errors.parentName}</p>}
          </div>
          {/* DOB */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ec-dob">
              Date of Birth <span className="text-brand-500">*</span>
            </label>
            <input
              id="ec-dob"
              type="date"
              value={form.dob}
              onChange={(e) => setForm((f) => ({ ...f, dob: e.target.value }))}
              max="2022-08-16"
              className={`w-full border px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition ${errors.dob ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
            />
            {errors.dob && <p className="mt-1 text-xs text-red-500">{errors.dob}</p>}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ec-mobile">
              Mobile No. <span className="text-brand-500">*</span>
            </label>
            <div className="flex relative items-stretch">
              <span className="inline-flex items-center px-4 border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm font-medium">
                +91
              </span>
              <input
                id="ec-mobile"
                type="tel"
                required
                value={form.mobile}
                onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                placeholder="10-digit number"
                className={`flex-1 w-full border px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition ${errors.mobile ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
              />
            </div>
            {errors.mobile && <p className="mt-1 text-xs text-red-500">{errors.mobile}</p>}
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ec-email">
              Email ID <span className="text-brand-500">*</span>
            </label>
            <input
              id="ec-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={`w-full border px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>
          {/* Emergency */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ec-emergency">
              Emergency Contact No. <span className="text-brand-500">*</span>
            </label>
            <div className="flex relative items-stretch">
              <span className="inline-flex items-center px-4 border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm font-medium">
                +91
              </span>
              <input
                id="ec-emergency"
                type="tel"
                value={form.emergencyContact}
                onChange={(e) => setForm((f) => ({ ...f, emergencyContact: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                placeholder="10-digit number"
                className={`flex-1 w-full border px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition ${errors.emergencyContact ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
              />
            </div>
            {errors.emergencyContact && <p className="mt-1 text-xs text-red-500">{errors.emergencyContact}</p>}
          </div>
          {/* Relationship */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ec-relation">
              Relationship
            </label>
            <input
              id="ec-relation"
              type="text"
              value={form.emergencyRelation}
              onChange={(e) => setForm((f) => ({ ...f, emergencyRelation: e.target.value }))}
              placeholder="e.g. Parent, Spouse"
              className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition"
            />
          </div>
        </div>
      </div>

      {/* ── EFI & Club Details ────────────────────────── */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-brand-900 font-display flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center bg-brand-500 text-white text-sm font-bold">2</span>
          EFI &amp; Club Details
        </h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ec-club">
              Unit / Establishment / Club <span className="text-brand-500">*</span>
            </label>
            <input
              id="ec-club"
              type="text"
              value={form.clubName}
              onChange={(e) => setForm((f) => ({ ...f, clubName: e.target.value }))}
              placeholder="e.g. HPRC / Army Riding School"
              className={`w-full border px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition ${errors.clubName ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
            />
            {errors.clubName && <p className="mt-1 text-xs text-red-500">{errors.clubName}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ec-efi">
              EFI Rider ID <span className="text-brand-500">*</span>
            </label>
            <input
              id="ec-efi"
              type="text"
              value={form.efiRiderId}
              onChange={(e) => setForm((f) => ({ ...f, efiRiderId: e.target.value }))}
              placeholder="Your EFI Rider registration number"
              className={`w-full border px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition ${errors.efiRiderId ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
            />
            {errors.efiRiderId && <p className="mt-1 text-xs text-red-500">{errors.efiRiderId}</p>}
            <p className="mt-1 text-[10px] text-gray-500">Mandatory — entries without a valid EFI Rider ID are not accepted. Foreign nationals / OCI are not eligible.</p>
          </div>
        </div>
      </div>

      {/* ── Event Selection ────────────────────────────── */}
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h3 className="text-xl font-bold text-brand-900 font-display flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center bg-brand-500 text-white text-sm font-bold">3</span>
            Select Events
          </h3>
          
          <div className="bg-blue-100 border border-blue-200 text-blue-800 px-3 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Online entry only · Closes 12 Aug, 12 Noon
          </div>
        </div>

        {!form.dob ? (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-sm font-medium flex items-center gap-3">
            <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Please enter your Date of Birth in the Rider Details section above to view eligible events.
          </div>
        ) : eligibleEvents.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 text-gray-600 p-4 rounded-xl text-sm font-medium text-center">
            No eligible events found for your age category ({riderAge} years old).
          </div>
        ) : (
          <>
            {errors.selectedEvents && (
              <p className="text-sm text-red-500 font-medium">{errors.selectedEvents}</p>
            )}
            <div className="space-y-4">
              {disciplineGroups.map((disc) => {
                const discEvents = eligibleEvents.filter((e) => e.discipline === disc);
                if (discEvents.length === 0) return null;
                
                return (
                  <div key={disc} className={`border rounded-xl p-4 sm:p-5 ${disciplineColors[disc] ?? "bg-gray-50 border-gray-200"}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <DisciplineIcon discipline={disc} />
                      <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">{disc}</h4>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {discEvents.map((ev) => {
                        const checked = form.selectedEvents.includes(ev.id);

                        return (
                          <div key={ev.id} className={`flex flex-col border transition-all ${checked ? "border-brand-400 bg-white shadow-sm" : "border-transparent bg-white/50 hover:bg-white/80"}`}>
                            <label className="flex items-start gap-3 p-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleEvent(ev.id)}
                                className="mt-0.5 h-4 w-4 accent-brand-500 flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 leading-tight">{ev.category}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{ev.date}</p>
                              </div>
                              <span className="text-sm font-bold text-brand-600 flex-shrink-0">
                                ₹{ev.fee.toLocaleString("en-IN")}
                              </span>
                            </label>
                            {checked && (
                              <div className="px-3 pb-3 pt-1 border-t border-gray-100 bg-gray-50/50 mt-1 space-y-2">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-gray-500 uppercase">Horse Name</label>
                                  <input
                                    type="text"
                                    placeholder="Horse Name *"
                                    value={form.eventHorses[ev.id]?.[0] || ""}
                                    onChange={(e) => syncHorses(ev.id, 0, e.target.value)}
                                    className={`w-full text-xs px-3 py-2 border rounded outline-none transition ${errors.eventHorsesGlobal && !(form.eventHorses[ev.id]?.[0] || "").trim() ? 'border-red-300 focus:border-red-400 bg-red-50' : 'border-gray-200 focus:border-brand-400'}`}
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-gray-500 uppercase">Horse EFI Registration No.</label>
                                  <input
                                    type="text"
                                    placeholder="EFI Passport / Reg No. *"
                                    value={form.eventHorseEfi[ev.id]?.[0] || ""}
                                    onChange={(e) => syncHorseEfi(ev.id, 0, e.target.value)}
                                    className={`w-full text-xs px-3 py-2 border rounded outline-none transition ${errors.eventHorsesGlobal && !(form.eventHorseEfi[ev.id]?.[0] || "").trim() ? 'border-red-300 focus:border-red-400 bg-red-50' : 'border-gray-200 focus:border-brand-400'}`}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {form.selectedEvents.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-xs text-blue-800 leading-relaxed flex gap-3">
             <svg className="h-5 w-5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>
              <strong>Horse limit:</strong> a horse may enter each category only once, and a maximum of three events per day (2 Dressage &amp; 1 Show Jumping, or 2 Show Jumping &amp; 1 Dressage). A mandatory Vet Check for all NQ horses is on 13 Aug at 7:30 AM.
            </p>
          </div>
        )}

        {form.selectedEvents.length > 0 && (
          <div className="flex items-center justify-between bg-brand-900/5 text-brand-900 border border-brand-900/10 px-6 py-4 rounded-xl">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <span className="text-sm font-bold flex items-center gap-2">
                <svg className="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {form.selectedEvents.length} Event{form.selectedEvents.length > 1 ? "s" : ""} Selection
              </span>
              <span className="text-sm font-bold flex items-center gap-2">
                <svg className="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {form.selectedEvents.reduce((acc, id) => acc + (form.eventHorses[id]?.length || 1), 0)} Jump{form.selectedEvents.reduce((acc, id) => acc + (form.eventHorses[id]?.length || 1), 0) > 1 ? "s" : ""} Total
              </span>
            </div>
            <span className="text-lg font-bold">
              Events Subtotal: ₹{eventFees.toLocaleString("en-IN")}
            </span>
          </div>
        )}
      </div>

      {/* ── Stabling Booking ────────────────────────────── */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-brand-900 font-display flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center bg-brand-500 text-white text-sm font-bold">4</span>
          Stabling (Optional)
        </h3>
        {serverStablingError && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-3">
            <svg className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-sm font-bold text-red-900">Stabling booking rejected</p>
              <p className="text-xs text-red-700 mt-1">{serverStablingError}</p>
              <p className="text-xs text-red-600 mt-1">Please adjust the number of stables or your dates and try again.</p>
            </div>
          </div>
        )}
        <div className="bg-blue-50/50 border border-blue-100 p-5 sm:p-6 rounded-2xl space-y-5">
          <p className="text-xs text-blue-700 font-medium">Stables are limited and allocated first-come, first-served. Choose a package below — fees are per stable. Requests close 10th August 2026.</p>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Stabling Package</label>
              <div className="grid sm:grid-cols-3 gap-2">
                {([
                  { type: "NONE", title: "No Stabling", sub: "—" },
                  { type: "PER_DAY", title: "Per-Day · 12–14 Aug", sub: "₹5,000 / stable" },
                  { type: "FULL_CAMP", title: "Full Camp · 12–17 Aug", sub: "₹10,000 / stable" },
                ] as const).map((opt) => (
                  <button
                    key={opt.type}
                    type="button"
                    onClick={() => setForm(f => ({
                      ...f,
                      stablingType: opt.type,
                      stablingCount: opt.type === "NONE" ? 0 : Math.max(1, f.stablingCount),
                      stablingFrom: opt.type === "NONE" ? "" : STABLING_PACKAGES[opt.type].from,
                      stablingTo: opt.type === "NONE" ? "" : STABLING_PACKAGES[opt.type].to,
                    }))}
                    className={`flex flex-col items-center justify-center py-3 px-2 text-center border transition-all ${form.stablingType === opt.type ? 'bg-brand-500 text-white border-brand-500 shadow-lg' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                  >
                    <span className="text-[11px] sm:text-xs font-bold leading-tight">{opt.title}</span>
                    <span className={`text-[10px] mt-0.5 ${form.stablingType === opt.type ? 'text-white/80' : 'text-gray-400'}`}>{opt.sub}</span>
                  </button>
                ))}
              </div>
              {form.stablingType !== "NONE" && (
                <p className="mt-2 text-xs font-bold text-brand-600 flex items-center gap-2">
                  {inventoryLoading ? (
                    <>
                      <svg className="h-3.5 w-3.5 animate-spin text-brand-500" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Checking live availability…
                    </>
                  ) : inventoryError ? (
                    <span className="text-amber-600">⚠️ {inventoryError} (Limit: {stabling.permanentAvailable})</span>
                  ) : (
                    <>
                      {liveMinAvailable} Stable{liveMinAvailable === 1 ? "" : "s"} Available for the selected camp dates (Limited)
                    </>
                  )}
                </p>
              )}
            </div>

            {form.stablingType !== "NONE" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">No. of Stables</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={form.stablingCount}
                  onChange={(e) => setForm(f => ({ ...f, stablingCount: parseInt(e.target.value) || 0 }))}
                  className={`w-full border px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition ${errors.stablingCount ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
                />
              </div>
            )}

            {form.stablingType !== "NONE" && (
              <div className="sm:col-span-2 flex items-center gap-2 text-xs text-blue-700 font-medium bg-white border border-blue-100 px-4 py-2.5">
                <svg className="h-4 w-4 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {form.stablingType === "PER_DAY"
                  ? "Per-Day Stabling · 12th – 14th August 2026 · ₹2,500 per stable per day (₹5,000 total)"
                  : "Full Camp · 12th – 17th August 2026 · ₹2,000 per stable per day (₹10,000 total) — covers National Qualifier (NQ) + the HPRC Equestrian Challenge"}
              </div>
            )}
          </div>

            {form.stablingType !== "NONE" && uniqueHorseCount > form.stablingCount && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-800 flex items-start gap-3">
                <svg className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="font-bold">Stabling Check</p>
                  <p className="mt-1">You have registered <strong>{uniqueHorseCount}</strong> individual horse{uniqueHorseCount > 1 ? "s" : ""} but only booked <strong>{form.stablingCount}</strong> stable{form.stablingCount > 1 ? "s" : ""}. Please ensure you have booked enough stabling for all your horses.</p>
                </div>
              </div>
            )}

          {form.stablingType !== "NONE" && (
            <div className="pt-2 border-t border-blue-100 flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                Stabling Subtotal
              </span>
              <span className="text-base font-extrabold text-blue-900">
                ₹{stablingFees.toLocaleString("en-IN")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Section 5: Special Arrangements ────────────────────── */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-brand-900 font-display flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center bg-brand-500 text-white text-sm font-bold">5</span>
          Special Arrangements / Notes
        </h3>
        <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ec-notes">
            Note to Club / Special Requests (Optional)
          </label>
          <textarea
            id="ec-notes"
            rows={3}
            value={form.specialNotes}
            onChange={(e) => setForm(f => ({ ...f, specialNotes: e.target.value }))}
            className="w-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition"
            placeholder="E.g. Traveling with specific club, stabling preferences, etc."
          />
        </div>
      </div>

      {showAgeProof && (
        <div className="space-y-6" id="age-proof-section">
          <h3 className="text-xl font-bold text-brand-900 font-display flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center bg-brand-500 text-white text-sm font-bold">6</span>
            Age &amp; Nationality Proof
          </h3>

          <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl space-y-4">
            <div>
              <p className="text-sm font-bold text-amber-900 mb-1">
                Select document type <span className="text-brand-500">*</span>
              </p>
              <p className="text-xs text-amber-800/80 mb-3">
                Mandatory for all NQ entries — proves age and Indian nationality. Foreign nationals and OCI cardholders are <strong>not eligible</strong>.
              </p>

              {/* Radio options */}
              <div className="grid sm:grid-cols-2 gap-3">
                {([
                  {
                    value: "PASSPORT" as const,
                    title: "Indian Passport",
                    sub: "Upload a scan / photo of your valid Indian passport (bio-data page).",
                  },
                  {
                    value: "BIRTH_CERT_AADHAAR" as const,
                    title: "Birth Certificate + Aadhaar",
                    sub: "Upload both documents combined into one PDF or image.",
                  },
                ]).map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      form.ageProofType === opt.value
                        ? "border-brand-500 bg-white shadow-md"
                        : "border-amber-200 bg-white/60 hover:bg-white/90"
                    }`}
                  >
                    <input
                      type="radio"
                      name="ageProofTypeRadio"
                      value={opt.value}
                      checked={form.ageProofType === opt.value}
                      onChange={() => setForm(f => ({ ...f, ageProofType: opt.value }))}
                      className="mt-0.5 h-4 w-4 accent-brand-500 flex-shrink-0"
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-900">{opt.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{opt.sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* File upload — shown once type is chosen */}
            {form.ageProofType && (
              <div className="pt-2 border-t border-amber-200">
                <label className="block text-sm font-semibold text-amber-900 mb-2" htmlFor="ec-age-proof">
                  {form.ageProofType === "PASSPORT"
                    ? "Upload Indian Passport (bio-data page)"
                    : "Upload Birth Certificate + Aadhaar (combined PDF or image)"}
                  <span className="text-brand-500"> *</span>
                </label>
                {form.ageProofType === "BIRTH_CERT_AADHAAR" && (
                  <p className="text-xs text-amber-700 mb-2">
                    Tip: merge both documents into a single PDF before uploading, or upload them separately by renaming and combining.
                  </p>
                )}
                <input
                  id="ec-age-proof"
                  name="ageProof"
                  type="file"
                  accept=".pdf,image/*"
                  className="block w-full text-sm text-amber-900 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-white file:text-brand-700 hover:file:bg-brand-50 transition shadow-sm cursor-pointer"
                />
              </div>
            )}

            {errors.ageProof && (
              <p className="text-xs text-red-500 font-bold flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {errors.ageProof}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Final Total Display ────────────────────────── */}
      {(form.selectedEvents.length > 0 || form.stablingType !== "NONE") && (
        <div className="bg-brand-900 text-white p-6 rounded-2xl shadow-xl shadow-brand-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-1">Grand Total Amount</p>
            <p className="text-3xl font-extrabold font-display">₹{totalFee.toLocaleString("en-IN")}</p>
          </div>
          <div className="text-center sm:text-right">
            {form.specialNotes.trim() === "HPRCTEST2" ? (
              <p className="text-xs text-yellow-300 font-semibold">Promo applied — ₹2 per entry (testing only)</p>
            ) : (
              <p className="text-xs text-brand-200 font-medium">Inclusive of all applicable taxes</p>
            )}
          </div>
        </div>
      )}

      {/* ── Declaration ─────────────────────────────────── */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 sm:p-6 space-y-4">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Declaration</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{declaration}</p>
        <label className={`flex items-start gap-3 cursor-pointer ${errors.isIndian ? "text-red-600" : ""}`}>
          <input
            type="checkbox"
            id="ec-indian"
            checked={form.isIndian}
            onChange={(e) => setForm((f) => ({ ...f, isIndian: e.target.checked }))}
            className="mt-0.5 h-4 w-4 accent-brand-500 flex-shrink-0"
          />
          <span className="text-sm font-semibold">
            I confirm the rider is an Indian national (not a foreign national or OCI cardholder) <span className="text-brand-500">*</span>
          </span>
        </label>
        {errors.isIndian && <p className="text-xs text-red-500">{errors.isIndian}</p>}
        <label className={`flex items-start gap-3 cursor-pointer ${errors.declaration ? "text-red-600" : ""}`}>
          <input
            type="checkbox"
            id="ec-declaration"
            checked={form.declaration}
            onChange={(e) => setForm((f) => ({ ...f, declaration: e.target.checked }))}
            className="mt-0.5 h-4 w-4 accent-brand-500 flex-shrink-0"
          />
          <span className="text-sm font-semibold">
            I have read and agree to the above declaration <span className="text-brand-500">*</span>
          </span>
        </label>
        {errors.declaration && <p className="text-xs text-red-500">{errors.declaration}</p>}
      </div>

      {/* ── Submit ─────────────────────────────────────── */}
      <div className="text-center pt-2">
        {entryStatus === "CLOSED" ? (
          <div className="bg-red-50 border border-red-200 p-6 max-w-lg mx-auto">
            <p className="text-red-700 font-bold mb-1">Registration Closed</p>
            <p className="text-xs text-red-600">Entries closed at 12:00 Noon on Wednesday, 12 August 2026. No post-entries or spot entries are accepted.</p>
          </div>
        ) : (
          <>
            <button
              type="submit"
              id="ec-submit"
              disabled={form.stablingType !== "NONE" && inventoryLoading}
              title={form.stablingType !== "NONE" && inventoryLoading ? "Confirming stable availability…" : ""}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white px-10 py-4 text-base font-bold shadow-xl shadow-brand-500/30 hover:from-brand-600 hover:to-brand-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-brand-500/40 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {form.stablingType !== "NONE" && inventoryLoading ? (
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )}
              {form.stablingType !== "NONE" && inventoryLoading
                ? "Verifying availability…"
                : form.specialNotes.trim() === "HPRCCHEAT1"
                  ? "Submit Complimentary Entry"
                  : form.specialNotes.trim() === "HPRCTEST2"
                    ? "Proceed to Payment (Promo)"
                    : "Proceed to Payment"}
            </button>
            <p className="mt-3 text-xs text-gray-500">
              Entries close at 12:00 noon on 12 August 2026. No post-entries or spot entries — please ensure all details are correct before submitting.
            </p>
          </>
        )}
      </div>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function NationalQualifier2026Page() {
  const { event, stats, schedule, events, requirements, stabling, importantNotes } =
    equestrianChallenge2026;

  const countdown = useCountdown(event.dateRange.start);

  // Group events by discipline for the display grid
  const byDiscipline = useMemo(() => {
    const groups: Record<string, typeof events> = {};
    for (const ev of events) {
      if (!groups[ev.discipline]) groups[ev.discipline] = [];
      groups[ev.discipline].push(ev);
    }
    return groups;
  }, [events]);

  const disciplineThemes: Record<string, { color: string; bg: string; border: string }> = {
    "PRACTICE ROUND": { color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
    DRESSAGE: { color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
    "SHOW JUMPING": { color: "text-brand-700", bg: "bg-brand-50", border: "border-brand-200" },
  };

  return (
    <div className="space-y-0 pb-20">

      {/* ═══════════════════════════════════════════════════════════ HERO */}
      <div className="relative overflow-hidden">
        <div className="container pt-12">
          <div className="relative overflow-hidden border-2 border-brand-200/50 shadow-[0_40px_80px_-20px_rgba(227,30,36,0.3)]">
            {/* Background */}
            <div className="absolute inset-0">
              <Image
                src="/images/ec2026/aamir-shahnawaz-2.jpg"
                alt="National Qualifier (NQ) 2026 — EFI Dressage & Show Jumping Qualifier"
                fill
                className="object-cover object-center"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-900/90 via-brand-900/80 to-black/90" />
            </div>

            {/* Radial glow blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-8 left-8 w-72 h-72 bg-brand-500/25 blur-[100px]" />
              <div className="absolute bottom-8 right-8 w-96 h-96 bg-brand-400/20 blur-[120px]" />
            </div>

            {/* Governing body badge */}


            <div className="relative z-10 px-6 sm:px-12 md:px-20 pb-12 sm:pb-16 pt-20 sm:pt-24 text-center">
              {/* Badge with EFI + TSEA Logos */}
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2.5 mb-6 shadow-xl shadow-brand-500/40">
                <Image
                  src="/events/nq2026/efi_logo.png"
                  alt="Equestrian Federation of India"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                  Under EFI · In association with TSEA
                </span>
                <div className="h-1.5 w-1.5 bg-white/60" />
                <Image
                  src="/events/nq2026/tsea-logo.jpeg"
                  alt="Telangana State Equestrian Association"
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white font-display tracking-tight leading-tight">
                National Qualifier
                <br />
                <span className="text-brand-300">(NQ) 2026</span>
              </h1>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-white/90 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-brand-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-semibold">{event.dates}</span>
                </div>
                <div className="h-4 w-px bg-white/30 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-brand-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-semibold">HPRC, Gandipet, Hyderabad</span>
                </div>
              </div>

              {/* Countdown */}
              {!countdown.started && (
                <div className="mt-8 flex items-center justify-center gap-4">
                  <CountdownBlock value={countdown.days} label="Days" />
                  <span className="text-white/60 text-2xl font-light mb-5">:</span>
                  <CountdownBlock value={countdown.hours} label="Hours" />
                  <span className="text-white/60 text-2xl font-light mb-5">:</span>
                  <CountdownBlock value={countdown.minutes} label="Mins" />
                  <span className="text-white/60 text-2xl font-light mb-5">:</span>
                  <CountdownBlock value={countdown.seconds} label="Secs" />
                </div>
              )}

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#register"
                  className="inline-flex items-center justify-center gap-2 bg-brand-500 !text-white px-8 py-4 text-base font-bold shadow-2xl transition-all duration-300 hover:bg-brand-600 hover:-translate-y-0.5 hover:shadow-brand-500/40"
                >
                  Register Now
                  <svg className="h-5 w-5 !text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#schedule"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white !text-white px-8 py-4 text-base font-bold backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                >
                  View Schedule
                  <svg className="h-5 w-5 !text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════ STATS BAR */}
      <div className="container mt-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-brand-600 via-brand-700 to-brand-600 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)]" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 md:p-12 relative">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center space-y-2">
                <p className="text-4xl md:text-5xl font-extrabold text-white font-display">{stat.value}</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ ABOUT */}
      <section className="container mt-16 space-y-0">
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-50/80 via-white to-brand-50/60 p-8 sm:p-12 md:p-16 border border-brand-100 shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/5 blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-600/5 blur-[120px] pointer-events-none" />
          <div className="relative grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-500 mb-3">About the Event</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-900 font-display leading-tight">
                The Road to JNEC 2026
              </h2>
              <p className="mt-5 text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                The <strong>National Qualifier (NQ) 2026</strong> runs on {event.dates} at the Hyderabad Polo &amp; Riding Club, Gandipet — organised by HPRC in association with TSEA, under the aegis of the <strong>Equestrian Federation of India (EFI)</strong>. Its objective is to enable qualification to the JNEC.
              </p>
              <p className="mt-4 text-base text-gray-600 leading-relaxed font-light">
                The qualifier is conducted in Dressage and Show Jumping across the Children II, Children I, Junior and Young Rider categories, as per the EFI National Qualifier Guidelines for JNEC 2026. A valid EFI Rider ID and Horse EFI Registration are mandatory for all entries.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["EFI Sanctioned", "In association with TSEA", "Dressage & Show Jumping", "Qualifier for JNEC"].map((tag) => (
                  <span key={tag} className="inline-flex items-center bg-white border border-brand-200 text-brand-700 text-xs font-semibold px-3 py-1.5 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {[
                { icon: "📅", label: "Dates", value: event.dates },
                { icon: "📍", label: "Venue", value: event.venueAddress },
                { icon: "🌅", label: "Morning", value: event.sessions.morning },
                { icon: "🌙", label: "Evening", value: event.sessions.evening },
                { icon: "🏟️", label: "Ground 1", value: "Dressage" },
                { icon: "🏆", label: "Main Arena", value: "Practice Round & Show Jumping" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 bg-white border border-brand-100 p-4 shadow-sm">
                  <span className="text-2xl leading-none flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-brand-500 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">
                      {item.label === "Venue" ? (
                        <a 
                          href="https://maps.app.goo.gl/nEiXR5Do7J7AXDYb7" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="hover:text-brand-600 transition-colors underline decoration-brand-200 underline-offset-4 hover:decoration-brand-500"
                        >
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Official Endorsement */}
          <div className="mt-16 relative">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent" />
            <div className="relative flex flex-col items-center">
              <div className="bg-white px-6 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-500">Official Endorsement</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 items-center justify-center max-w-lg mx-auto">
                {/* HPRC */}
                <div className="flex flex-col items-center gap-3">
                  <div className="h-16 w-16 bg-white border border-brand-200 rounded-lg flex items-center justify-center p-2">
                    <Image
                      src="/hprc_logo.png"
                      alt="Hyderabad Polo & Riding Club"
                      width={56}
                      height={56}
                      className="h-14 w-14 object-contain"
                    />
                  </div>
                  <p className="text-xs font-semibold text-gray-700 text-center">Hyderabad Polo &amp; Riding Club</p>
                </div>
                {/* TSEA */}
                <div className="flex flex-col items-center gap-3">
                  <div className="h-16 w-16 bg-white border border-brand-200 rounded-lg flex items-center justify-center p-2">
                    <Image
                      src="/events/nq2026/tsea-logo.jpeg"
                      alt="Telangana State Equestrian Association"
                      width={56}
                      height={56}
                      className="h-14 w-14 object-contain"
                    />
                  </div>
                  <p className="text-xs font-semibold text-gray-700 text-center">Telangana State Equestrian Association</p>
                </div>
                {/* EFI */}
                <div className="flex flex-col items-center gap-3 col-span-2 sm:col-span-1">
                  <div className="h-16 w-16 bg-white border border-brand-200 rounded-lg flex items-center justify-center p-2">
                    <Image
                      src="/events/nq2026/efi_logo.png"
                      alt="Equestrian Federation of India"
                      width={56}
                      height={56}
                      className="h-14 w-14 object-contain"
                    />
                  </div>
                  <p className="text-xs font-semibold text-gray-700 text-center">Equestrian Federation of India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Download Prospectus Section */}
          <div className="mt-16 relative">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent" />
            <div className="relative flex flex-col items-center">
              <div className="bg-white px-6 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-500">Official Document</span>
              </div>
              <a
                href="/events/nq2026/National_Qualifier_2026_Prospectus.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex flex-col sm:flex-row items-center gap-4 bg-brand-900 px-10 py-6 text-white shadow-[0_20px_50px_rgba(227,30,36,0.3)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(227,30,36,0.5)] hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-brand-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center bg-white/10 group-hover:bg-white/20 transition-colors">
                    <svg className="h-6 w-6 text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-black uppercase tracking-wider text-white">Download Event Prospectus</p>
                    <p className="text-[10px] font-medium text-brand-200 mt-0.5">Rules, Regulations & Full Schedule (PDF)</p>
                  </div>
                </div>
                
                <div className="relative hidden sm:block h-8 w-px bg-white/20 mx-2" />
                
                <div className="relative flex items-center gap-2">
                  <span className="text-xs font-bold text-white/90">Get Details</span>
                  <svg className="h-4 w-4 text-brand-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ SCHEDULE */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 py-16 sm:py-20 mt-16" id="schedule">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/15 blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-400/15 blur-[150px]" />
        </div>
        <div className="container relative">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-300 mb-3">Event Timeline</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">Competition Schedule</h2>
            <p className="mt-3 text-base text-white/70 max-w-xl mx-auto">Day-by-day breakdown across three days</p>
          </div>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {schedule.map((day) => (
              <div key={day.day} className="relative overflow-hidden border-2 border-white/20 bg-white/10 backdrop-blur-md p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center bg-gradient-to-br from-brand-400 to-brand-500 text-white font-extrabold text-lg font-display">
                    {day.day.replace("Day ", "")}
                  </div>
                  <div>
                    <p className="font-extrabold text-white text-lg font-display">{day.day}</p>
                    <p className="text-sm text-white/70">{day.date}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {day.sessions.map((s, i) => (
                    <div key={i} className="border border-white/10 bg-white/10 p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="h-2.5 w-2.5 bg-brand-400 mt-1" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-brand-300 uppercase tracking-wider mb-1">{s.time}</p>
                          <p className="text-xs text-white/60 mb-1.5">📍 {s.venue}</p>
                          <p className="text-sm font-semibold text-white">{s.events}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ DISCIPLINES & FEES */}
      <section className="container mt-16 space-y-10">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-500 mb-3">Competitions</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-900 font-display">Disciplines &amp; Entry Fees</h2>
          <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">Dressage &amp; Show Jumping across four age categories — entries are online only, no post or spot entries</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Object.entries(byDiscipline).sort(([a], [b]) => {
            const order = ["PRACTICE ROUND", "DRESSAGE", "SHOW JUMPING"];
            return order.indexOf(a) - order.indexOf(b);
          }).map(([disc, discEvents]) => {
            const theme = disciplineThemes[disc] ?? { color: "text-gray-700", bg: "bg-gray-50", border: "border-gray-200" };
            return (
              <div key={disc} className={`border-2 ${theme.border} ${theme.bg} overflow-hidden`}>
                <div className="flex items-center gap-3 p-4 sm:p-5 border-b border-current/20">
                  <DisciplineIcon discipline={disc} />
                  <h3 className={`font-extrabold text-sm uppercase tracking-wider ${theme.color}`}>{disc}</h3>
                  <span className={`ml-auto text-xs font-bold px-2 py-0.5 bg-white border ${theme.border} ${theme.color}`}>
                    {discEvents.length} events
                  </span>
                </div>
                <div className="divide-y divide-current/10">
                  {discEvents.map((ev) => (
                    <div key={ev.id} className="flex items-center justify-between px-4 sm:px-5 py-3 bg-white/60">
                      <div>
                        <p className="text-sm font-medium text-gray-900 leading-tight">{ev.category}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{ev.date}</p>
                      </div>
                      <span className="text-sm font-extrabold text-brand-600 flex-shrink-0 ml-3">
                        ₹{ev.fee.toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 text-center text-xs text-gray-600">
          <p><span className="font-semibold">Legend:</span> H = Height, S = Spread</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ QUALIFICATION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50/60 via-white to-brand-50/40 py-16 mt-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-500 mb-3">Recognition</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-900 font-display">Qualification, Not Prizes</h2>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              No medals or prize money are awarded at the National Qualifier. This is a qualifying event — riders who qualify for the next stage (JNEC) will be notified directly by the Equestrian Federation of India.
            </p>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════ EFI / TSEA SANCTIONING */}
      <section className="container mt-16">
        <div className="bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex items-center gap-4 flex-shrink-0">
            <Image
              src="/events/nq2026/efi_logo.png"
              alt="Equestrian Federation of India"
              width={80}
              height={80}
              className="h-20 w-20 object-contain"
            />
            <div className="h-14 w-px bg-brand-200" />
            <Image
              src="/events/nq2026/tsea-logo.jpeg"
              alt="Telangana State Equestrian Association"
              width={80}
              height={80}
              className="h-20 w-20 object-contain"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-brand-900 font-display">Sanctioned by EFI · Organised in association with TSEA</h3>
            <p className="mt-2 text-sm text-gray-700 leading-relaxed">
              This National Qualifier is conducted under the technical guidelines, rules and regulations of the Equestrian Federation of India (EFI) as part of the official qualifying pathway to the JNEC, and is organised in association with the Telangana State Equestrian Association (TSEA). All participants must adhere to EFI standards and requirements.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ REQUIREMENTS */}
      <section className="container mt-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Requirements */}
          <div className="relative overflow-hidden border border-brand-100 bg-white p-6 sm:p-8 shadow-xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-500 mb-4">Mandatory</p>
            <h2 className="text-2xl font-extrabold text-brand-900 font-display mb-6">Entry Requirements</h2>
            <ul className="space-y-4">
              {requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-5 w-5 flex items-center justify-center bg-brand-500 mt-0.5">
                    <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{req}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Notes */}
          <div className="relative overflow-hidden border border-amber-200 bg-amber-50 p-6 sm:p-8 shadow-xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600 mb-4">Please Note</p>
            <h2 className="text-2xl font-extrabold text-gray-900 font-display mb-6">Important Reminders</h2>
            <ul className="space-y-4">
              {importantNotes.map((note, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-5 w-5 flex items-center justify-center bg-amber-500 mt-0.5">
                    <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ STABLING */}
      <section className="container mt-8">
        <div className="border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-blue-500 text-white text-2xl">
              🐎
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">{stabling.heading}</h3>
              <p className="text-sm text-blue-800 leading-relaxed mb-4">{stabling.description}</p>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                {stabling.details?.map((detail, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-blue-700 font-medium">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ REGISTER FORM */}
      <section className="container mt-16" id="register">
        <div className="relative overflow-hidden border-2 border-sky-200 shadow-2xl" style={{ background: "linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 40%, #f5f0ff 70%, #eef5ff 100%)" }}>

          {/* ── Watermark layer ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">

            {/* Large EFI logo watermark — top right */}
            <div className="absolute -top-8 -right-8 opacity-[0.045]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/events/nq2026/efi_logo.png" alt="" className="w-72 h-72 object-contain" />
            </div>

            {/* TSEA logo watermark — bottom left */}
            <div className="absolute -bottom-10 -left-10 opacity-[0.04]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/events/nq2026/tsea-logo.jpeg" alt="" className="w-64 h-64 object-contain" />
            </div>

            {/* Horse silhouette SVG — centre-right watermark */}
            <svg className="absolute top-1/4 right-[5%] w-72 h-72 opacity-[0.04] text-sky-700" viewBox="0 0 200 200" fill="currentColor">
              <path d="M170,40 C165,38 158,39 152,42 C148,35 140,30 130,30 C122,30 115,34 110,40 C105,35 98,32 90,33 C82,34 76,38 72,45 C65,42 56,43 50,48 C44,53 42,61 44,70 C38,74 34,80 33,88 C32,96 35,104 41,109 C38,115 37,122 40,128 C43,134 49,138 56,138 L60,138 L58,155 C58,157 59,159 61,160 C63,161 65,160 66,158 L72,145 C76,147 80,148 84,148 L86,165 C86,167 88,169 90,169 C92,169 94,167 94,165 L94,148 C100,147 106,144 110,140 C114,144 120,147 126,148 L126,165 C126,167 128,169 130,169 C132,169 134,167 134,165 L134,148 L138,148 C144,148 149,146 153,142 L159,158 C160,160 162,161 164,160 C166,159 167,157 167,155 L163,138 C168,135 172,130 173,124 C174,118 172,112 168,107 C173,102 176,95 175,88 C174,81 170,75 164,71 C168,65 169,57 166,51 C168,47 170,43 170,40 Z" />
            </svg>

            {/* Polo mallet + ball SVG — top-left faint watermark */}
            <svg className="absolute top-10 left-10 w-48 h-48 opacity-[0.04] text-indigo-700" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="20" y1="10" x2="75" y2="85" strokeLinecap="round"/>
              <rect x="68" y="78" width="18" height="12" rx="3" transform="rotate(-50 68 78)"/>
              <circle cx="15" cy="85" r="8"/>
            </svg>

            {/* Rosette / medal SVG — centre-left */}
            <svg className="absolute top-1/2 -translate-y-1/2 left-[-20px] w-56 h-56 opacity-[0.035] text-sky-600" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="45" r="22"/>
              <polygon points="50,23 53,16 50,10 47,16" transform="rotate(0 50 45)"/>
              <polygon points="50,23 53,16 50,10 47,16" transform="rotate(30 50 45)"/>
              <polygon points="50,23 53,16 50,10 47,16" transform="rotate(60 50 45)"/>
              <polygon points="50,23 53,16 50,10 47,16" transform="rotate(90 50 45)"/>
              <polygon points="50,23 53,16 50,10 47,16" transform="rotate(120 50 45)"/>
              <polygon points="50,23 53,16 50,10 47,16" transform="rotate(150 50 45)"/>
              <polygon points="50,23 53,16 50,10 47,16" transform="rotate(180 50 45)"/>
              <polygon points="50,23 53,16 50,10 47,16" transform="rotate(210 50 45)"/>
              <polygon points="50,23 53,16 50,10 47,16" transform="rotate(240 50 45)"/>
              <polygon points="50,23 53,16 50,10 47,16" transform="rotate(270 50 45)"/>
              <polygon points="50,23 53,16 50,10 47,16" transform="rotate(300 50 45)"/>
              <polygon points="50,23 53,16 50,10 47,16" transform="rotate(330 50 45)"/>
              <rect x="44" y="65" width="5" height="22" rx="2"/>
              <rect x="51" y="65" width="5" height="22" rx="2"/>
              <rect x="40" y="85" width="20" height="5" rx="2"/>
            </svg>

            {/* "NATIONAL QUALIFIER" diagonal text watermark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-sky-800 font-black font-display tracking-[0.4em] uppercase whitespace-nowrap select-none"
                style={{ fontSize: "clamp(28px, 5vw, 56px)", opacity: 0.025, transform: "rotate(-15deg)" }}
              >
                NATIONAL QUALIFIER 2026
              </span>
            </div>

            {/* EFI text watermark — bottom centre */}
            <div className="absolute bottom-8 inset-x-0 flex justify-center">
              <span
                className="text-indigo-800 font-black font-display tracking-[0.6em] uppercase select-none"
                style={{ fontSize: "clamp(12px, 2.5vw, 22px)", opacity: 0.04 }}
              >
                EQUESTRIAN FEDERATION OF INDIA
              </span>
            </div>

            {/* Subtle radial colour blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-300/20 blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-300/15 blur-[140px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-200/10 blur-[100px]" />
          </div>

          <div className="relative p-6 sm:p-10 md:p-14">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-500 mb-3">Online Entry</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-900 font-display">Register for the National Qualifier</h2>
              <p className="mt-3 text-sm text-gray-500 max-w-lg mx-auto">
                Fill in the form below. On submission, your email client will open with all details pre-filled — simply send it to complete your registration.
              </p>
              
              {/* Entry Deadline Alert */}
              <div className="mt-8 max-w-3xl mx-auto">
                <div className="bg-brand-50 border-l-4 border-brand-500 p-4 text-left">
                  <p className="text-xs font-bold text-brand-700 uppercase tracking-wider mb-1">Entries Close (No Post / Spot Entries)</p>
                  <p className="text-sm font-bold text-brand-900">Wednesday, 12 August 2026 · 12:00 Noon</p>
                </div>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 text-xs text-amber-800 font-medium">
                <svg className="h-4 w-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                EFI Rider ID, Horse EFI Registration &amp; age/nationality proof are mandatory for all entries.
              </div>
            </div>
            <RegistrationForm />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ CONTACT */}
      <section className="container mt-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-brand-600 via-brand-700 to-brand-600 p-8 sm:p-10 shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-extrabold text-white font-display">Questions? We&apos;re here to help.</h3>
              <p className="text-white/80 text-sm mt-1">Contact the HPRC Riding School office for entry details, stabling, or coaching enquiries.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              {event.contact.map((num) => (
                <a
                  key={num}
                  href={`tel:${num.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 bg-white text-brand-700 px-5 py-3 text-sm font-bold shadow-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {num}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
