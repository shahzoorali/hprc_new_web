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
  fatherName: string;
  dob: string;
  address: string;
  mobile: string;
  email: string;
  emergencyContact: string;
  emergencyRelation: string;
  efiMemberNo: string;
  efiGrade: string;
  clubName: string;
  selectedEvents: number[];
  horseName: string;
  horseEfiReg: string;
  horseColour: string;
  horseSex: string;
  horseAge: string;
  declaration: boolean;
};

const INITIAL_FORM: FormData = {
  name: "",
  fatherName: "",
  dob: "",
  address: "",
  mobile: "",
  email: "",
  emergencyContact: "",
  emergencyRelation: "",
  efiMemberNo: "",
  efiGrade: "",
  clubName: "",
  selectedEvents: [],
  horseName: "",
  horseEfiReg: "",
  horseColour: "",
  horseSex: "",
  horseAge: "",
  declaration: false,
};

function RegistrationForm() {
  const { events, declaration, event } = equestrianChallenge2026;
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const totalFee = useMemo(
    () =>
      form.selectedEvents.reduce((sum, id) => {
        const ev = events.find((e) => e.id === id);
        return sum + (ev?.fee ?? 0);
      }, 0),
    [form.selectedEvents, events]
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
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.dob) e.dob = "Date of birth is required";
    if (!form.mobile.trim()) e.mobile = "Mobile number is required";
    if (!form.efiMemberNo.trim()) e.efiMemberNo = "EFI Membership No. is required";
    if (form.selectedEvents.length === 0) e.selectedEvents = "Please select at least one event";
    if (!form.declaration) e.declaration = "You must accept the declaration";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedEventDetails = events
      .filter((ev) => form.selectedEvents.includes(ev.id))
      .map((ev) => `#${ev.id} ${ev.discipline} — ${ev.category} (₹${ev.fee.toLocaleString("en-IN")})`)
      .join("\n");

    const body = encodeURIComponent(
      `HPRC EQUESTRIAN CHALLENGE 2026 — ENTRY FORM\n` +
        `=============================================\n\n` +
        `RIDER DETAILS\n` +
        `Name: ${form.name}\n` +
        `Father's Name: ${form.fatherName}\n` +
        `Date of Birth: ${form.dob}\n` +
        `Address: ${form.address}\n` +
        `Mobile: ${form.mobile}\n` +
        `Email: ${form.email}\n` +
        `Emergency Contact: ${form.emergencyContact} (${form.emergencyRelation})\n` +
        `EFI Membership No.: ${form.efiMemberNo}\n` +
        `EFI Grade: ${form.efiGrade}\n` +
        `Club / Unit: ${form.clubName}\n\n` +
        `EVENTS SELECTED\n` +
        `${selectedEventDetails}\n` +
        `Total Fee: ₹${totalFee.toLocaleString("en-IN")}\n\n` +
        `HORSE DETAILS\n` +
        `Name: ${form.horseName}\n` +
        `EFI Reg. No.: ${form.horseEfiReg}\n` +
        `Colour: ${form.horseColour}  |  Sex: ${form.horseSex}  |  Age: ${form.horseAge}\n\n` +
        `Declaration accepted: Yes\n`
    );

    const subject = encodeURIComponent(`EC2026 Entry — ${form.name} — ${form.selectedEvents.length} event(s)`);
    window.location.href = `mailto:${event.email}?subject=${subject}&body=${body}`;

    // Save to localStorage as backup
    try {
      const existing = JSON.parse(localStorage.getItem("ec2026-registrations") ?? "[]");
      existing.push({ ...form, submittedAt: new Date().toISOString(), totalFee });
      localStorage.setItem("ec2026-registrations", JSON.stringify(existing));
    } catch {}

    setSubmitted(true);
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
    <form onSubmit={handleSubmit} className="space-y-10" noValidate>
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
              placeholder="As per EFI records"
              className={`w-full border px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>
          {/* Father */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ec-father">
              Father&apos;s Name
            </label>
            <input
              id="ec-father"
              type="text"
              value={form.fatherName}
              onChange={(e) => setForm((f) => ({ ...f, fatherName: e.target.value }))}
              className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition"
            />
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
            <input
              id="ec-mobile"
              type="tel"
              value={form.mobile}
              onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
              placeholder="+91"
              className={`w-full border px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition ${errors.mobile ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
            />
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
              Emergency Contact No.
            </label>
            <input
              id="ec-emergency"
              type="tel"
              value={form.emergencyContact}
              onChange={(e) => setForm((f) => ({ ...f, emergencyContact: e.target.value }))}
              className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition"
            />
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
          EFI & Club Details
        </h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ec-efi">
              EFI Membership / Licence No. <span className="text-brand-500">*</span>
            </label>
            <input
              id="ec-efi"
              type="text"
              value={form.efiMemberNo}
              onChange={(e) => setForm((f) => ({ ...f, efiMemberNo: e.target.value }))}
              className={`w-full border px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition ${errors.efiMemberNo ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
            />
            {errors.efiMemberNo && <p className="mt-1 text-xs text-red-500">{errors.efiMemberNo}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ec-grade">
              EFI Grade
            </label>
            <input
              id="ec-grade"
              type="text"
              value={form.efiGrade}
              onChange={(e) => setForm((f) => ({ ...f, efiGrade: e.target.value }))}
              placeholder="e.g. A, B, C"
              className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ec-club">
              Unit / Establishment / Club
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
        <h3 className="text-xl font-bold text-brand-900 font-display flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center bg-brand-500 text-white text-sm font-bold">3</span>
          Select Events
        </h3>
        {errors.selectedEvents && (
          <p className="text-sm text-red-500 font-medium">{errors.selectedEvents}</p>
        )}
        <div className="space-y-4">
          {disciplineGroups.map((disc) => {
            const discEvents = events.filter((e) => e.discipline === disc);
            return (
              <div key={disc} className={`border rounded-xl p-4 sm:p-5 ${disciplineColors[disc] ?? "bg-gray-50 border-gray-200"}`}>
                <div className="flex items-center gap-2 mb-3">
                  <DisciplineIcon discipline={disc} />
                  <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">{disc}</h4>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {discEvents.map((ev) => {
                    const checked = form.selectedEvents.includes(ev.id);
                    return (
                      <label
                        key={ev.id}
                        className={`flex items-start gap-3 p-3 cursor-pointer border transition-all ${
                          checked
                            ? "border-brand-400 bg-white shadow-sm"
                            : "border-transparent bg-white/50 hover:bg-white/80"
                        }`}
                      >
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
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

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

      {/* ── Horse Details ──────────────────────────────── */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-brand-900 font-display flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center bg-brand-500 text-white text-sm font-bold">4</span>
          Horse Details
        </h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ec-horse-name">
              Name of Horse
            </label>
            <input
              id="ec-horse-name"
              type="text"
              value={form.horseName}
              onChange={(e) => setForm((f) => ({ ...f, horseName: e.target.value }))}
              className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ec-horse-efi">
              EFI Reg. No.
            </label>
            <input
              id="ec-horse-efi"
              type="text"
              value={form.horseEfiReg}
              onChange={(e) => setForm((f) => ({ ...f, horseEfiReg: e.target.value }))}
              className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ec-horse-colour">
              Colour
            </label>
            <input
              id="ec-horse-colour"
              type="text"
              value={form.horseColour}
              onChange={(e) => setForm((f) => ({ ...f, horseColour: e.target.value }))}
              placeholder="e.g. Bay, Chestnut"
              className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ec-horse-sex">
              Sex
            </label>
            <select
              id="ec-horse-sex"
              value={form.horseSex}
              onChange={(e) => setForm((f) => ({ ...f, horseSex: e.target.value }))}
              className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition"
            >
              <option value="">Select</option>
              <option value="Mare">Mare</option>
              <option value="Gelding">Gelding</option>
              <option value="Stallion">Stallion</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ec-horse-age">
              Age (years)
            </label>
            <input
              id="ec-horse-age"
              type="number"
              min={1}
              max={30}
              value={form.horseAge}
              onChange={(e) => setForm((f) => ({ ...f, horseAge: e.target.value }))}
              className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition"
            />
          </div>
        </div>
      </div>

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
          Your email client will open with your details pre-filled. Please send the email to complete registration.
        </p>
      </div>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function EquestrianChallenge2026Page() {
  const { event, stats, schedule, events, prizeMoney, requirements, stabling, coachingProgramme, importantNotes } =
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
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur-sm border border-white/60 px-5 py-2.5 shadow-xl">
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-brand-700 text-center">
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
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-white to-gray-100 text-brand-900 px-8 py-4 text-base font-bold shadow-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-white/20"
                >
                  Register Now
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#schedule"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white px-8 py-4 text-base font-bold backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10"
                >
                  View Schedule
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="max-w-2xl mx-auto overflow-hidden border-2 border-brand-200 shadow-2xl">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-brand-600 to-brand-700 text-white">
                  <th className="py-3 px-4 text-left font-bold">Class</th>
                  <th className="py-3 px-4 text-center font-bold">🥇 Gold</th>
                  <th className="py-3 px-4 text-center font-bold">🥈 Silver</th>
                  <th className="py-3 px-4 text-center font-bold">🥉 Bronze</th>
                  <th className="py-3 px-4 text-center font-bold">4th</th>
                </tr>
              </thead>
              <tbody>
                {prizeMoney.table.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-brand-50/60"}>
                    <td className="py-3 px-4 font-semibold text-brand-900">{row.height}</td>
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
              <p className="text-sm text-blue-800 leading-relaxed">{stabling.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ COACHING PROGRAMME */}
      <section className="container mt-16">
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 p-8 sm:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/20 blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-600/20 blur-[120px] pointer-events-none" />
          <div className="relative">
            {/* Members badge */}
            <div className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              HPRC Members Only
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-1">{coachingProgramme.heading}</h2>
            <p className="text-brand-300 text-sm font-semibold mb-2">{coachingProgramme.subheading}</p>
            <p className="text-white/70 text-sm mb-8">
              📅 Preparation Period: <span className="text-white font-semibold">{coachingProgramme.period}</span>
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {coachingProgramme.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm border border-white/10 p-4">
                  <div className="flex-shrink-0 flex h-7 w-7 items-center justify-center bg-brand-500 text-white text-xs font-bold font-display">
                    {i + 1}
                  </div>
                  <p className="text-sm text-white/90 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-white/60">
              Contact the Riding School office to collect your Advance Coaching Course Coupon.
            </p>
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
              <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 text-xs text-amber-800 font-medium">
                <svg className="h-4 w-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Birth Certificate &amp; EFI Licence must be submitted physically to the Riding School office
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
