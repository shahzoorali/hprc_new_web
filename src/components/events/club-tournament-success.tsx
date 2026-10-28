"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { PageHero } from "@/components/ui/page-hero";
import { type ClubTournament, clubTournamentTitle } from "@/content/club-tournaments";

function SuccessContent({ tournament }: { tournament: ClubTournament }) {
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
          eyebrow={`${clubTournamentTitle(tournament)} · ${tournament.dateRange}`}
          title={isSuccess ? "Entry Confirmed!" : "Payment Status"}
          description={
            isSuccess
              ? `Thank you! Your registration for the ${tournament.label.toLowerCase()} has been received.`
              : "Let's review the status of your recent entry payment."
          }
          backgroundImage={tournament.heroImage}
        />
      </div>

      <section className="container max-w-2xl mx-auto text-center space-y-8">
        <div
          className={`p-8 md:p-12 rounded-3xl border shadow-xl ${
            isSuccess ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
          }`}
        >
          <h2
            className={`text-3xl font-bold font-display ${isSuccess ? "text-green-900" : "text-red-900"}`}
          >
            {isSuccess ? "Registration Successful" : "Payment Failed or Aborted"}
          </h2>
          <p className="mt-4 text-gray-700 text-lg">
            {isSuccess
              ? "A confirmation email is on its way. The club will verify your membership and share team details."
              : "The payment didn't go through. Please try again or contact HPRC."}
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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {!isSuccess && (
            <Link
              href={`${tournament.pagePath}#register`}
              className="inline-flex items-center justify-center rounded-xl bg-brand-900 px-8 py-4 text-sm font-bold tracking-widest text-white hover:bg-brand-800 shadow-md"
            >
              TRY AGAIN
            </Link>
          )}
          <Link
            href="/events"
            className="inline-flex items-center justify-center rounded-xl bg-white border-2 border-brand-900 px-8 py-4 text-sm font-bold tracking-widest text-brand-900 hover:bg-brand-50 shadow-md"
          >
            RETURN TO EVENTS
          </Link>
        </div>
      </section>
    </div>
  );
}

export function ClubTournamentSuccess({ tournament }: { tournament: ClubTournament }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-900"></div>
        </div>
      }
    >
      <SuccessContent tournament={tournament} />
    </Suspense>
  );
}
