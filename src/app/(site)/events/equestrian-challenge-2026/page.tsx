"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo, useCallback } from "react";

import { equestrianChallenge2026 } from "@/content/equestrian-challenge-2026";

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
  return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714 2.143L13 3z" />
    </svg>
  );
}

// ─── Registration Form ────────────────────────────────────────────────────────

type FormData = {
  name: string;
  parentName: string;
  dob: string;
  address: string;
  mobile: string;
  email: string;
  emergencyContact: string;
  emergencyRelation: string;
  clubName: string;
  selectedEvents: number[];
  eventHorses: Record<number, string>;
  declaration: boolean;
};

const INITIAL_FORM: FormData = {
  name: "",
  parentName: "",
  dob: "",
  address: "",
  mobile: "",
  email: "",
  emergencyContact: "",
  emergencyRelation: "",
  clubName: "",
  selectedEvents: [],
  eventHorses: {},
  declaration: false,
};

function RegistrationForm() {
  const { events, declaration, event } = equestrianChallenge2026;
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData | "ageProof" | "eventHorsesGlobal", string>>>({});
  const [draftExists, setDraftExists] = useState(false);

  React.useEffect(() => {
    // Check if there is a saved registration in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem("ec2026-registrations") ?? "[]");
      if (existing && existing.length > 0) setDraftExists(true);
    } catch {}
  }, []);

  const restoreDraft = () => {
    try {
      const existing = JSON.parse(localStorage.getItem("ec2026-registrations") ?? "[]");
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

  const entryStatus = useMemo(() => {
    const now = new Date();
    const standardDeadline = new Date("2026-05-14T18:00:00+05:30");
    const finalDeadline = new Date("2026-05-15T18:00:00+05:30");
    
    if (now > finalDeadline) return "CLOSED";
    if (now > standardDeadline) return "POST_ENTRY";
    return "STANDARD";
  }, []);

  const totalFee = useMemo(
    () =>
      form.selectedEvents.reduce((sum, id) => {
        const ev = eligibleEvents.find((e) => e.id === id);
        if (!ev) return sum;
        const baseFee = ev.fee;
        const postEntrySurcharge = entryStatus === "POST_ENTRY" ? 500 : 0;
        return sum + baseFee + postEntrySurcharge;
      }, 0),
    [form.selectedEvents, eligibleEvents, entryStatus]
  );

  const toggleEvent = useCallback((id: number) => {
    setForm((f) => ({
      ...f,
      selectedEvents: f.selectedEvents.includes(id)
        ? f.selectedEvents.filter((x) => x !== id)
        : [...f.selectedEvents, id],
    }));
  }, []);

  const validate = () => {
    const e: Partial<Record<keyof FormData | "ageProof" | "eventHorsesGlobal", string>> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.parentName.trim()) e.parentName = "Parent's Name is required";
    if (!form.dob) e.dob = "Date of birth is required";
    if (!form.mobile.trim()) {
      e.mobile = "Mobile number is required";
    } else if (form.mobile.replace(/\D/g, '').length !== 10) {
      e.mobile = "Enter a valid 10-digit mobile number";
    }
    
    if (!form.emergencyContact.trim()) {
      e.emergencyContact = "Emergency contact is required";
    } else if (form.emergencyContact.replace(/\D/g, '').length !== 10) {
      e.emergencyContact = "Enter a valid 10-digit emergency contact number";
    }

    if (!form.clubName.trim()) e.clubName = "Club details are required";
    
    const activeSelected = form.selectedEvents.filter(id => eligibleEvents.some(eve => eve.id === id));
    if (activeSelected.length === 0) e.selectedEvents = "Please select at least one eligible event";
    
    const missingHorse = form.selectedEvents.some(id => !form.eventHorses[id] || !form.eventHorses[id].trim());
    if (missingHorse) {
      e.eventHorsesGlobal = "Horse Name is required for all selected events";
      e.selectedEvents = "Please provide the horse name for all selected events";
    }

    const hasAgeBasedEvent = form.selectedEvents.some(id => {
      const ev = eligibleEvents.find(eve => eve.id === id);
      return ev && ev.maxAge !== undefined && ev.maxAge < 99;
    });
    
    if (hasAgeBasedEvent) {
      const fileInput = document.getElementById('ec-age-proof') as HTMLInputElement;
      if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        e.ageProof = "Age proof document is required for age-category events";
      }
    }
    
    if (!form.declaration) e.declaration = "You must accept the declaration";
    setErrors(e as any);
    return Object.keys(e).length === 0;
  };

  const showAgeProof = useMemo(() => {
    return form.selectedEvents.some(id => {
      const ev = eligibleEvents.find(eve => eve.id === id);
      return ev && ev.maxAge !== undefined && ev.maxAge < 99;
    });
  }, [form.selectedEvents, eligibleEvents]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Save to localStorage as backup
    try {
      const existing = JSON.parse(localStorage.getItem("ec2026-registrations") ?? "[]");
      existing.push({ ...form, submittedAt: new Date().toISOString(), totalFee });
      localStorage.setItem("ec2026-registrations", JSON.stringify(existing));
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

  const disciplineGroups = ["HACKS", "DRESSAGE", "SHOW JUMPING", "TOP SCORE"];
  const disciplineColors: Record<string, string> = {
    HACKS: "bg-amber-50 border-amber-200",
    DRESSAGE: "bg-blue-50 border-blue-200",
    "SHOW JUMPING": "bg-brand-50 border-brand-200",
    "TOP SCORE": "bg-purple-50 border-purple-200",
  };

  return (
    <form 
      ref={formRef} 
      onSubmit={handleSubmit} 
      action="https://hprc.in/payment/ec2026RequestHandler.php" 
      method="POST" 
      encType="multipart/form-data"
      className="space-y-10" 
      noValidate>
      
      {/* Hidden Fields for PHP Processing */}
      <input type="hidden" name="name" value={form.name} />
      <input type="hidden" name="parentName" value={form.parentName} />
      <input type="hidden" name="dob" value={form.dob} />
      <input type="hidden" name="address" value={form.address} />
      <input type="hidden" name="mobile" value={form.mobile} />
      <input type="hidden" name="email" value={form.email} />
      <input type="hidden" name="emergencyContact" value={form.emergencyContact} />
      <input type="hidden" name="emergencyRelation" value={form.emergencyRelation} />
      <input type="hidden" name="clubName" value={form.clubName} />
      <input type="hidden" name="selectedEvents" value={JSON.stringify(form.selectedEvents)} />
      <input type="hidden" name="eventHorses" value={JSON.stringify(form.eventHorses)} />
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
              max="2016-05-17"
              className={`w-full border px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition ${errors.dob ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
            />
            {errors.dob && <p className="mt-1 text-xs text-red-500">{errors.dob}</p>}
          </div>
          {/* Address */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ec-address">
              Address
            </label>
            <textarea
              id="ec-address"
              rows={2}
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition resize-none"
            />
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
              Email ID
            </label>
            <input
              id="ec-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition"
            />
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

      {/* ── Club Details ────────────────────────── */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-brand-900 font-display flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center bg-brand-500 text-white text-sm font-bold">2</span>
          Club Details
        </h3>
        <div className="grid gap-5">
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ec-club">
              Unit / Establishment / Club <span className="text-brand-500">*</span>
            </label>
            <input
              id="ec-club"
              type="text"
              value={form.clubName}
              onChange={(e) => setForm((f) => ({ ...f, clubName: e.target.value }))}
              placeholder="e.g. HPRC / Army Riding School"
              className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition"
            />
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
          
          {entryStatus === "POST_ENTRY" && (
            <div className="bg-amber-100 border border-amber-200 text-amber-800 px-3 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              Post-Entry Pricing Active (+ ₹500/event)
            </div>
          )}
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
                              <div className="px-3 pb-3 pt-1 border-t border-gray-100 bg-gray-50/50 mt-1">
                                <input 
                                  type="text" 
                                  placeholder="Horse Name *" 
                                  value={form.eventHorses[ev.id] || ""}
                                  onChange={(e) => setForm(f => ({ ...f, eventHorses: { ...f.eventHorses, [ev.id]: e.target.value } }))}
                                  className={`w-full text-xs px-3 py-2 border rounded outline-none transition ${errors.eventHorsesGlobal && !form.eventHorses[ev.id]?.trim() ? 'border-red-300 focus:border-red-400 bg-red-50' : 'border-gray-200 focus:border-brand-400'}`}
                                />
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

        {/* Fee Summary */}
        {form.selectedEvents.length > 0 && (
          <div className="flex items-center justify-between bg-brand-900 text-white px-6 py-4 rounded-xl">
            <span className="text-sm font-medium text-white/80">
              {form.selectedEvents.length} event{form.selectedEvents.length > 1 ? "s" : ""} selected
            </span>
            <span className="text-xl font-extrabold font-display">
              Total: ₹{totalFee.toLocaleString("en-IN")}
            </span>
          </div>
        )}
      </div>

      {showAgeProof && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-brand-900 font-display flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center bg-brand-500 text-white text-sm font-bold">4</span>
            Age Proof Upload
          </h3>
          <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl">
            <label className="block text-sm font-semibold text-amber-900 mb-1.5" htmlFor="ec-age-proof">
              Govt ID (Aadhaar, Passport, or Birth Certificate) <span className="text-brand-500">*</span>
            </label>
            <p className="text-xs text-amber-800/80 mb-3 block">Required because you have selected one or more age-category events.</p>
            <input
              id="ec-age-proof"
              name="ageProof"
              type="file"
              accept=".pdf,image/*"
              className="block w-full text-sm text-amber-900 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-white file:text-brand-700 hover:file:bg-brand-50 transition shadow-sm cursor-pointer"
            />
            {errors.ageProof && <p className="mt-2 text-xs text-red-500 font-bold">{errors.ageProof}</p>}
          </div>
        </div>
      )}

      {/* ── Declaration ─────────────────────────────────── */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 sm:p-6 space-y-4">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Declaration</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{declaration}</p>
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
            <p className="text-xs text-red-600">The final deadline (15 May, 6:00 PM) has passed. We are no longer accepting entries.</p>
          </div>
        ) : (
          <>
            <button
              type="submit"
              id="ec-submit"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white px-10 py-4 text-base font-bold shadow-xl shadow-brand-500/30 hover:from-brand-600 hover:to-brand-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-brand-500/40"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Submit Entry Form
            </button>
            <p className="mt-3 text-xs text-gray-500">
              {entryStatus === "POST_ENTRY" 
                ? "Post-entry window is open. Standard fees have been increased by ₹500 per event." 
                : "Standard entry is open. Ensure all details are correct before submitting."}
            </p>
          </>
        )}
      </div>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function EquestrianChallenge2026Page() {
  const { event, stats, schedule, events, prizeMoney, requirements, stabling, importantNotes } =
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
    HACKS: { color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
    DRESSAGE: { color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
    "SHOW JUMPING": { color: "text-brand-700", bg: "bg-brand-50", border: "border-brand-200" },
    "TOP SCORE": { color: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200" },
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
                src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1920&q=85"
                alt="HPRC Equestrian Challenge 2026"
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
            <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur-sm border border-white/60 px-4 sm:px-5 py-2 sm:py-2.5 shadow-xl w-[90%] sm:w-auto">
              <p className="text-[9px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-brand-700 text-center leading-tight">
                Organised under the aegis of EFI &amp; TSEA
              </p>
            </div>

            <div className="relative z-10 px-6 sm:px-12 md:px-20 pb-12 sm:pb-16 pt-20 sm:pt-24 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2.5 mb-6 shadow-xl shadow-brand-500/40">
                <div className="h-1.5 w-1.5 bg-white" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                  Inaugural Edition · 2026
                </span>
                <div className="h-1.5 w-1.5 bg-white" />
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white font-display tracking-tight leading-tight">
                HPRC Equestrian
                <br />
                <span className="text-brand-300">Challenge 2026</span>
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
                The Inaugural Equestrian Challenge
              </h2>
              <p className="mt-5 text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                We are delighted to announce that the Hyderabad Polo &amp; Riding Club will be hosting its <strong>inaugural HPRC Equestrian Challenge 2026</strong> on 16th and 17th May 2026 at the Club grounds, Gandipet. This is an exciting opportunity for all riders to compete, showcase their skills, and represent their clubs in a formal equestrian competition.
              </p>
              <p className="mt-4 text-base text-gray-600 leading-relaxed font-light">
                The competition is open to riders from all EFI-affiliated clubs and units across the region, featuring Hacks, Dressage, Show Jumping, and Top Score events. Cash prizes are awarded to Open category Show Jumping finishers.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["Open Competition", "EFI Governed", "2-Day Event", "Floodlit Evening Sessions"].map((tag) => (
                  <span key={tag} className="inline-flex items-center bg-white border border-brand-200 text-brand-700 text-xs font-semibold px-3 py-1.5 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {[
                { icon: "📅", label: "Dates", value: "16th & 17th May 2026" },
                { icon: "📍", label: "Venue", value: event.venueAddress },
                { icon: "🌅", label: "Morning", value: event.sessions.morning },
                { icon: "🌙", label: "Evening", value: event.sessions.evening },
                { icon: "🏟️", label: "Ground 1", value: "Hacks & Dressage" },
                { icon: "🏆", label: "Main Arena", value: "Show Jumping & Top Score" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 bg-white border border-brand-100 p-4 shadow-sm">
                  <span className="text-2xl leading-none flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-brand-500 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
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
            <p className="mt-3 text-base text-white/70 max-w-xl mx-auto">Day-by-day breakdown across two competitive days</p>
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
          <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">19 classes across 4 disciplines — open to EFI-affiliated riders from all clubs and units</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Object.entries(byDiscipline).map(([disc, discEvents]) => {
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
      </section>

      {/* ═══════════════════════════════════════════════ PRIZE MONEY */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50/60 via-white to-brand-50/40 py-16 mt-16">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-500 mb-3">Cash Prizes</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-900 font-display">Prize Money</h2>
            <p className="mt-3 text-sm text-gray-500 max-w-lg mx-auto">{prizeMoney.note}</p>
          </div>
          <div className="max-w-2xl mx-auto border-2 border-brand-200 shadow-2xl overflow-x-auto bg-white">
            <table className="w-full text-sm border-collapse min-w-[500px] sm:min-w-0">
              <thead>
                <tr className="bg-gradient-to-r from-brand-600 to-brand-700 text-white">
                  <th className="py-3 px-4 text-left font-bold">Class</th>
                  <th className="py-3 px-4 text-center font-bold whitespace-nowrap">🥇 Gold</th>
                  <th className="py-3 px-4 text-center font-bold whitespace-nowrap">🥈 Silver</th>
                  <th className="py-3 px-4 text-center font-bold whitespace-nowrap">🥉 Bronze</th>
                  <th className="py-3 px-4 text-center font-bold whitespace-nowrap">4th</th>
                </tr>
              </thead>
              <tbody>
                {prizeMoney.table.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-brand-50/60"}>
                    <td className="py-3 px-4 font-semibold text-brand-900 whitespace-nowrap">{row.height}</td>
                    <td className="py-3 px-4 text-center font-bold text-brand-700">₹{row.gold.toLocaleString("en-IN")}</td>
                    <td className="py-3 px-4 text-center font-semibold text-gray-700">₹{row.silver.toLocaleString("en-IN")}</td>
                    <td className="py-3 px-4 text-center font-semibold text-gray-600">₹{row.bronze.toLocaleString("en-IN")}</td>
                    <td className="py-3 px-4 text-center text-gray-500">₹{row.fourth.toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center mt-4 text-xs text-gray-400">Age-category class winners (Children I, Children II, Junior) receive Medals &amp; Certificates</p>
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
                  <p className="text-sm text-gray-700 leading-relaxed">{note}</p>
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
        <div className="relative overflow-hidden border-2 border-brand-100 bg-white p-6 sm:p-10 md:p-14 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/4 blur-[150px] pointer-events-none" />
          <div className="relative">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-500 mb-3">Online Entry</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-900 font-display">Register for EC 2026</h2>
              <p className="mt-3 text-sm text-gray-500 max-w-lg mx-auto">
                Fill in the form below. On submission, your email client will open with all details pre-filled — simply send it to complete your registration.
              </p>
              
              {/* Entry Deadlines Alert */}
              <div className="mt-8 grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                <div className="bg-brand-50 border-l-4 border-brand-500 p-4 text-left">
                  <p className="text-xs font-bold text-brand-700 uppercase tracking-wider mb-1">Standard Entry Closes</p>
                  <p className="text-sm font-bold text-brand-900">Thursday, 14 May · 6:00 PM</p>
                </div>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 text-left">
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Post Entry Closes</p>
                  <p className="text-sm font-bold text-amber-900">Friday, 15 May · 6:00 PM</p>
                </div>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 text-xs text-amber-800 font-medium">
                <svg className="h-4 w-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Age Proof documents must be submitted along with the entry.
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
