"use client";

import { useState } from "react";

import { PageHero } from "@/components/ui/page-hero";

const ENTRY_FEE = 5000;

type FormState = {
  name: string;
  mobile: string;
  email: string;
  membershipNo: string;
  handicap: string;
  memberConfirm: boolean;
  photo: string;
};

const INITIAL: FormState = {
  name: "",
  mobile: "",
  email: "",
  membershipNo: "",
  handicap: "",
  memberConfirm: false,
  photo: "",
};

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

type Errors = Partial<Record<keyof FormState, string>>;

export default function HprcClubChampionshipPage() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    if (!file) {
      setPhotoFile(null);
      setPhotoPreview(null);
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErrors((er) => ({ ...er, photo: "Photo must be a JPG, PNG or WebP image" }));
      e.target.value = "";
      setPhotoFile(null);
      setPhotoPreview(null);
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setErrors((er) => ({ ...er, photo: "Photo must be under 5 MB" }));
      e.target.value = "";
      setPhotoFile(null);
      setPhotoPreview(null);
      return;
    }
    setErrors((er) => ({ ...er, photo: undefined }));
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!/^[6-9]\d{9}$/.test(form.mobile.replace(/\s|-/g, "")))
      e.mobile = "Enter a valid 10-digit mobile number";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.membershipNo.trim()) e.membershipNo = "HPRC membership number is required";
    if (!form.handicap.trim()) e.handicap = "Handicap / skill level is required";
    if (!photoFile) e.photo = "Please upload your photo";
    if (!form.memberConfirm) e.memberConfirm = "Please confirm you are an HPRC member";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    if (!validate()) {
      ev.preventDefault();
      return;
    }
    setSubmitting(true);
  };

  const inputCls = (err?: string) =>
    `w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 ${
      err ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
    }`;

  return (
    <div className="space-y-12 pb-24">
      <div className="container pt-16">
        <PageHero
          eyebrow="30 October – 1 November 2026 · HPRC, Hyderabad"
          title="HPRC Club Championship — Polo Tournament"
          description="A three-day polo tournament open exclusively to HPRC members. Register as an individual player; teams will be formed by the organisers."
          backgroundImage="/photo-1553531580-6520e75d0458.png"
        />
      </div>

      <section className="container max-w-3xl mx-auto grid gap-4 sm:grid-cols-3 text-center">
        {[
          ["Dates", "30 October – 1 November 2026"],
          ["Venue", "Hyderabad Polo & Riding Club"],
          ["Entry fee", `₹${ENTRY_FEE.toLocaleString("en-IN")} per player`],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-xs font-bold tracking-widest text-brand-600">{k.toUpperCase()}</p>
            <p className="mt-2 font-semibold text-gray-900">{v}</p>
          </div>
        ))}
      </section>

      <section id="register" className="container max-w-2xl mx-auto">
        <div className="rounded-3xl border bg-white p-6 md:p-10 shadow-xl">
          <h2 className="text-2xl font-extrabold text-gray-900 font-display">
            Player Registration
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Open to HPRC members only. Your membership number will be verified by the club.
          </p>

          <form
            onSubmit={handleSubmit}
            action="https://hprc.in/payment/poloOct2026RequestHandler.php"
            method="POST"
            encType="multipart/form-data"
            className="mt-8 space-y-5"
            noValidate
          >
            <div>
              <label className="mb-1 block text-sm font-semibold" htmlFor="name">
                Full name *
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className={inputCls(errors.name)}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold" htmlFor="mobile">
                  Mobile *
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  inputMode="numeric"
                  value={form.mobile}
                  onChange={(e) => set("mobile", e.target.value)}
                  className={inputCls(errors.mobile)}
                />
                {errors.mobile && <p className="mt-1 text-xs text-red-600">{errors.mobile}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold" htmlFor="email">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={inputCls(errors.email)}
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold" htmlFor="membershipNo">
                  HPRC membership number *
                </label>
                <input
                  id="membershipNo"
                  name="membershipNo"
                  value={form.membershipNo}
                  onChange={(e) => set("membershipNo", e.target.value)}
                  className={inputCls(errors.membershipNo)}
                />
                {errors.membershipNo && (
                  <p className="mt-1 text-xs text-red-600">{errors.membershipNo}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold" htmlFor="handicap">
                  Handicap / skill level *
                </label>
                <input
                  id="handicap"
                  name="handicap"
                  placeholder="e.g. 2 goal, or Beginner"
                  value={form.handicap}
                  onChange={(e) => set("handicap", e.target.value)}
                  className={inputCls(errors.handicap)}
                />
                {errors.handicap && <p className="mt-1 text-xs text-red-600">{errors.handicap}</p>}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold" htmlFor="photo">
                Your photo *
              </label>
              <div className="flex items-center gap-4">
                {photoPreview && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photoPreview}
                    alt="Selected player"
                    className="h-20 w-20 rounded-xl object-cover border"
                  />
                )}
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhoto}
                  className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-900"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Clear face photo, JPG / PNG / WebP, up to 5 MB.
              </p>
              {errors.photo && <p className="mt-1 text-xs text-red-600">{errors.photo}</p>}
            </div>

            <div>
              <label className="flex items-start gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.memberConfirm}
                  onChange={(e) => set("memberConfirm", e.target.checked)}
                  className="mt-1"
                />
                <span>
                  I confirm that I am a current member of the Hyderabad Polo &amp; Riding Club.
                </span>
              </label>
              {errors.memberConfirm && (
                <p className="mt-1 text-xs text-red-600">{errors.memberConfirm}</p>
              )}
            </div>

            <div className="flex items-center justify-between rounded-xl bg-brand-50 border border-brand-100 px-5 py-4">
              <span className="text-sm font-semibold text-gray-800">Entry fee</span>
              <span className="text-xl font-extrabold text-brand-900">
                ₹{ENTRY_FEE.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-brand-900 px-8 py-4 text-sm font-bold tracking-widest text-white transition-all hover:bg-brand-800 disabled:opacity-60"
            >
              {submitting
                ? "REDIRECTING TO PAYMENT…"
                : `PAY ₹${ENTRY_FEE.toLocaleString("en-IN")} & REGISTER`}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
