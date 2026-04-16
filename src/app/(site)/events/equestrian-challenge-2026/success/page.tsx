"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageHero } from "@/components/ui/page-hero";

function SuccessContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const orderId = searchParams.get("order_id");
  const trackingId = searchParams.get("tracking_id");
  const amount = searchParams.get("amount");

  const isSuccess = status === "Success" || status === "Successful";

  return (
    <div className="space-y-16 pb-24">
      <div className="container pt-16">
        <PageHero
          eyebrow="Equestrian Challenge 2026"
          title={isSuccess ? "Entry Confirmed!" : "Payment Status"}
          description={
            isSuccess
              ? "Thank you! Your entry for the HPRC Equestrian Challenge 2026 has been received and verified."
              : "Let's review the status of your recent entry payment."
          }
          backgroundImage="https://images.unsplash.com/photo-1553531580-6520e75d0458?w=1920&q=80"
        />
      </div>

      <section className="container max-w-2xl mx-auto text-center space-y-8">
        <div
          className={`p-8 md:p-12 rounded-3xl border shadow-xl ${
            isSuccess
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <div className="flex justify-center mb-6">
            {isSuccess ? (
              <svg
                className="h-20 w-20 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="h-20 w-20 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>

          <h2
            className={`text-3xl font-bold font-display ${
              isSuccess ? "text-green-900" : "text-red-900"
            }`}
          >
            {isSuccess ? "Registration Successful" : "Payment Failed or Aborted"}
          </h2>

          <p className="mt-4 text-gray-700 text-lg">
            {isSuccess
              ? "We have successfully secured your entry and your details have been logged in our databases safely."
              : "Unfortunately, the payment to HPRC didn't go through properly. Please try again or contact support."}
          </p>

          {(orderId || trackingId) && (
            <div className="mt-8 bg-white/60 p-6 rounded-2xl flex flex-col gap-3 text-sm text-gray-800 text-left border">
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold">Amount Paid:</span>
                <span>₹{amount}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold">Transaction ID:</span>
                <span>{trackingId || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Reference Number:</span>
                <span>{orderId}</span>
              </div>
            </div>
          )}
        </div>

        <Link
          href="/events"
          className="inline-flex items-center justify-center rounded-xl bg-brand-900 px-8 py-4 text-sm font-bold tracking-widest text-white transition-all hover:bg-brand-800"
        >
          RETURN TO EVENTS
        </Link>
      </section>
    </div>
  );
}

export default function EquestrianSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-900"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
