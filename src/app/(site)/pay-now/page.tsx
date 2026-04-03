"use client";

import { useEffect, useRef, useState } from "react";

import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";

export default function PayNowPage() {
  const tidRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isMember, setIsMember] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    memberId: "",
    amount: "",
    purposeLabel: "",
    remarks: "",
  });

  // Replicate legacy behaviour: use current timestamp as transaction id (tid)
  useEffect(() => {
    if (tidRef.current) {
      tidRef.current.value = String(new Date().getTime());
    }
  }, []);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const purposeVal = data.get("purpose_select") as string;
    const finalPurpose =
      purposeVal === "Other"
        ? (data.get("merchant_param5") as string)
        : purposeVal;

    setFormData({
      name: data.get("merchant_param1") as string,
      email: data.get("merchant_param2") as string,
      phone: data.get("merchant_param3") as string,
      memberId: (data.get("merchant_param4") as string) || "N/A",
      amount: data.get("amount") as string,
      purposeLabel: finalPurpose,
      remarks: data.get("merchant_param5") as string,
    });
    setShowModal(true);
  };

  const confirmAndSubmit = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const purposes = [
    "Annual Subscription",
    "Membership Fee",
    "Riding Programme",
    "Hospitality",
    "Tournament Fee",
    "Other",
  ];

  // Helper to convert number to words (Indian Rupees)
  const amountToWords = (numStr: string) => {
    const amount = parseFloat(numStr);
    if (isNaN(amount) || amount === 0) return "";

    const units = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const convert = (n: number): string => {
      if (n === 0) return "";
      if (n < 20) return units[n] + " ";
      if (n < 100) return tens[Math.floor(n / 10)] + " " + units[n % 10] + " ";
      if (n < 1000)
        return units[Math.floor(n / 100)] + " Hundred " + convert(n % 100);
      if (n < 100000)
        return convert(Math.floor(n / 1000)) + " Thousand " + convert(n % 1000);
      if (n < 10000000)
        return convert(Math.floor(n / 100000)) + " Lakh " + convert(n % 100000);
      return (
        convert(Math.floor(n / 10000000)) + " Crore " + convert(n % 10000000)
      );
    };

    const rupees = Math.floor(amount);
    const paise = Math.round((amount - rupees) * 100);

    let result = "Rupees " + convert(rupees).trim();
    if (paise > 0) {
      result += " and " + convert(paise).trim() + " Paise";
    }
    return result + " Only";
  };

  const formattedAmount = parseFloat(formData.amount).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const titleCase = val
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setFormData({ ...formData, name: titleCase });
  };

  const handleMemberIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, memberId: e.target.value.toUpperCase() });
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-12 sm:pb-24">
      <div className="container pt-16">
        <PageHero
          eyebrow="Online Payments"
          title="Secure Payment to Hyderabad Polo & Riding Club"
          description="Use this form to make secure online payments to HPRC for memberships, riding programmes, tournaments, hospitality, and other services. Transactions are processed via our trusted payment gateway provider."
          backgroundImage="https://images.unsplash.com/photo-1549570652-97324981a6fd?w=1920&q=80"
        />
      </div>

      <section className="container">
        <div className="max-w-4xl mx-auto space-y-10">
          <SectionHeading
            eyebrow="Pay Now"
            title="Fill your details to proceed"
            description="Please provide accurate contact details so we can reconcile your payment quickly. All fields marked with * are mandatory."
            align="center"
          />

          <div className="rounded-3xl border border-brand-100/70 bg-white/80 shadow-2xl p-6 sm:p-12 backdrop-blur-sm">
            <form
              ref={formRef}
              id="pay-now-form"
              name="customerData"
              action="https://hprc.in/payment/ccavRequestHandler.php"
              method="post"
              className="space-y-8"
              onSubmit={handleInitialSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Full Name */}
                <div className="space-y-2 md:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold text-slate-800 tracking-tight"
                  >
                    Full Name <span className="text-brand-600">*</span>
                  </label>
                  <input
                    id="name"
                    name="merchant_param1"
                    type="text"
                    value={formData.name}
                    onChange={handleNameChange}
                    placeholder="Enter your full name"
                    required
                    pattern="^[a-zA-Z_ ]{2,55}"
                    className="block w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base text-slate-900 shadow-sm outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 placeholder:text-slate-400"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-slate-800 tracking-tight"
                  >
                    E-mail <span className="text-brand-600">*</span>
                  </label>
                  <input
                    id="email"
                    name="merchant_param2"
                    type="email"
                    placeholder="example@mail.com"
                    required
                    className="block w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base text-slate-900 shadow-sm outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 placeholder:text-slate-400"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-bold text-slate-800 tracking-tight"
                  >
                    Phone <span className="text-brand-600">*</span>
                  </label>
                  <input
                    id="phone"
                    name="merchant_param3"
                    type="tel"
                    placeholder="99999 99999"
                    required
                    pattern="[0-9]{8,16}"
                    className="block w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base text-slate-900 shadow-sm outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 placeholder:text-slate-400"
                  />
                </div>

                {/* Membership Toggle */}
                <div className="space-y-4 md:col-span-2 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                  <p className="text-sm font-bold text-slate-800 tracking-tight">
                    Do you have membership?
                  </p>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="membership"
                        value="yes"
                        className="h-5 w-5 border-slate-300 text-brand-600 focus:ring-brand-500 transition-all cursor-pointer"
                        onChange={() => setIsMember(true)}
                      />
                      <span className="text-sm font-medium text-slate-700 group-hover:text-brand-700">
                        Yes, I am a member
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="membership"
                        value="no"
                        className="h-5 w-5 border-slate-300 text-brand-600 focus:ring-brand-500 transition-all cursor-pointer"
                        defaultChecked
                        onChange={() => setIsMember(false)}
                      />
                      <span className="text-sm font-medium text-slate-700 group-hover:text-brand-700">
                        No, I am a guest
                      </span>
                    </label>
                  </div>
                </div>

                {/* Membership Number */}
                {isMember && (
                  <div className="space-y-2 md:col-span-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label
                      htmlFor="membership_number"
                      className="block text-sm font-bold text-slate-800 tracking-tight"
                    >
                      Membership Number
                    </label>
                    <input
                      id="membership_number"
                      name="merchant_param4"
                      type="text"
                      value={formData.memberId === "N/A" ? "" : formData.memberId}
                      onChange={handleMemberIdChange}
                      placeholder="e.g. AR123"
                      className="block w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base text-slate-900 shadow-sm outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 placeholder:text-slate-400 uppercase font-mono tracking-wider"
                      required={isMember}
                    />
                  </div>
                )}

                {/* Amount */}
                <div className="space-y-2 md:col-span-2">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-bold text-slate-800 tracking-tight"
                  >
                    Amount (INR) <span className="text-brand-600">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                      <span className="text-lg font-bold text-slate-400 group-focus-within:text-brand-600 transition-colors">
                        ₹
                      </span>
                    </div>
                    <input
                      id="amount"
                      name="amount"
                      type="number"
                      min="1"
                      step="0.01"
                      placeholder="0.00"
                      required
                      className="block w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-5 py-4 text-xl font-bold text-slate-900 shadow-sm outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Purpose Dropdown */}
                <div className="space-y-2 md:col-span-2">
                  <label
                    htmlFor="purpose_select"
                    className="block text-sm font-bold text-slate-800 tracking-tight"
                  >
                    Payment Towards <span className="text-brand-600">*</span>
                  </label>
                  <select
                    id="purpose_select"
                    name="purpose_select"
                    required
                    value={purpose}
                    className="block w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base text-slate-900 shadow-sm outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%20stroke%3D%22currentColor%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1.25rem_center] bg-no-repeat"
                    onChange={(e) => setPurpose(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a purpose
                    </option>
                    {purposes.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Remarks/Towards (shown if "Other" is selected) */}
                {(purpose === "Other" ||
                  (!purposes.includes(purpose) && purpose !== "")) && (
                  <div className="space-y-2 md:col-span-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label
                      htmlFor="towards"
                      className="block text-sm font-bold text-slate-800 tracking-tight"
                    >
                      Please Specify <span className="text-brand-600">*</span>
                    </label>
                    <textarea
                      id="towards"
                      name="merchant_param5"
                      rows={2}
                      placeholder="Enter payment details..."
                      required
                      className="block w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base text-slate-900 shadow-sm outline-none transition-all focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 placeholder:text-slate-400"
                    />
                  </div>
                )}

                {/* Hidden original field if dropdown is not "Other" */}
                {purpose !== "Other" && purpose !== "" && (
                  <input type="hidden" name="merchant_param5" value={purpose} />
                )}
              </div>

              {/* Hidden transaction id (tid) */}
              <input type="hidden" name="tid" id="tid" ref={tidRef} readOnly />

              <div className="flex flex-col gap-6 pt-10 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100">
                <div className="flex items-start gap-3 max-w-md">
                  <svg
                    className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    By proceeding, you will be redirected to{" "}
                    <span className="font-bold text-slate-700">CCAvenue</span>{" "}
                    secure gateway. Your payment data is encrypted and handled
                    only by the provider.
                  </p>
                </div>
                <button
                  type="submit"
                  className="group relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 px-8 py-5 text-base font-bold text-white shadow-xl shadow-brand-600/20 transition-all hover:from-brand-700 hover:to-brand-800 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-600/30 active:translate-y-0 active:shadow-lg"
                >
                  Proceed to Pay
                  <svg
                    className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-brand-900/40 animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-3xl border border-white/20 overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-8 py-6 text-white">
              <h3 className="text-xl font-bold tracking-tight">
                Confirm Payment Details
              </h3>
              <p className="text-brand-100/80 text-sm mt-1 leading-relaxed">
                Please review your information before proceeding to the bank.
              </p>
            </div>

            {/* Modal Content */}
            <div className="px-8 py-8 space-y-6">
              <div className="space-y-4">
                {[
                  { label: "Name", value: formData.name },
                  { label: "Email", value: formData.email },
                  { label: "Member ID", value: formData.memberId },
                  { label: "Purpose", value: formData.purposeLabel },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-start gap-4 pb-4 border-b border-slate-50 last:border-0 last:pb-0"
                  >
                    <span className="text-sm font-medium text-slate-400">
                      {item.label}
                    </span>
                    <span className="text-sm font-bold text-slate-800 text-right">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Amount Display */}
              <div className="bg-brand-50/50 rounded-2xl p-6 border border-brand-100/50 flex flex-col items-center justify-center space-y-3">
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-brand-600/70 uppercase tracking-widest text-center">
                    Total Amount
                  </span>
                  <span className="text-4xl font-black text-brand-900 tracking-tighter">
                    ₹{formattedAmount}
                  </span>
                </div>
                <div className="w-full h-px bg-brand-100/30" />
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center leading-relaxed max-w-[280px]">
                  {amountToWords(formData.amount)}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-6 bg-slate-50 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-4 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors order-2 sm:order-1"
              >
                Go Back & Edit
              </button>
              <button
                onClick={confirmAndSubmit}
                className="flex-[1.5] px-6 py-4 rounded-xl bg-brand-600 text-sm font-bold text-white shadow-lg shadow-brand-600/20 hover:bg-brand-700 transition-all hover:-translate-y-0.5 active:translate-y-0 order-1 sm:order-2"
              >
                Confirm & Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
