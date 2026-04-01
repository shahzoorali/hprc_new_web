"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import React from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "Unknown";
  const orderId = searchParams.get("order_id") || "-";
  const amount = searchParams.get("amount") || "-";
  const trackingId = searchParams.get("tracking_id") || "-";
  const statusMessage = searchParams.get("status_message") || "";

  const isSuccess = status === "Success";
  const isAborted = status === "Aborted";

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          {isSuccess ? (
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
              <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          ) : (
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6">
              <svg className="h-10 w-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
          )}

          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            {isSuccess ? "Payment Successful" : isAborted ? "Payment Aborted" : "Payment Failed"}
          </h2>
          
          <p className="text-sm text-gray-500 mb-8">
            {isSuccess
              ? "Your transaction has been completed successfully."
              : isAborted
              ? "You have cancelled the payment process."
              : "There was an issue processing your payment."}
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-sm text-gray-500">Status</span>
            <span className={`text-sm font-medium ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
              {status}
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-sm text-gray-500">Order ID</span>
            <span className="text-sm font-medium text-gray-900">{orderId}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-sm text-gray-500">Transaction ID</span>
            <span className="text-sm font-medium text-gray-900">{trackingId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Amount Paid</span>
            <span className="text-sm font-medium text-gray-900">₹{amount}</span>
          </div>
        </div>

        {!isSuccess && statusMessage && (
          <div className="mt-4">
            <details className="group border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                <span>What went wrong?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="p-4 pt-0">
                <div className="bg-red-50 text-red-800 p-3 rounded border border-red-100 font-mono text-xs break-words">
                  {statusMessage}
                </div>
              </div>
            </details>
          </div>
        )}

        <div className="mt-8 text-center pt-4">
          <Link
            href="/"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Loading payment summary...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
