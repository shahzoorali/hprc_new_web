"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageHero } from "@/components/ui/page-hero";

const GUIDELINES = [
  {
    title: "1. Facilities and Hygiene",
    content: (
      <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
        <li><strong>Changing Rooms:</strong> All changing must be done strictly within the designated changing rooms. Please do not change in public areas, stables, or horse trailers.</li>
        <li><strong>Restrooms:</strong> Please use the provided restroom facilities. Urinating in stables, behind buildings, or any other non-designated areas of the club is strictly prohibited and disrespectful to the venue.</li>
        <li><strong>Waste Management:</strong> Do not litter. All trash must be disposed of responsibly in the clearly marked bins located throughout the grounds. If a bin is full, please notify staff rather than leaving items beside it.</li>
      </ul>
    )
  },
  {
    title: "2. Movement and Access",
    content: (
      <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
        <li><strong>Designated Areas:</strong> Movement is restricted to designated spectator areas, pathways, and warm-up zones. Access to stables, official booths, and the competition arena is limited to authorized personnel and active competitors only.</li>
        <li><strong>Safety First:</strong> Always yield to horses. When walking near horses, stay alert, keep a safe distance, and avoid sudden movements or loud noises that may startle them.</li>
        <li><strong>Children and Pets:</strong> Children must be supervised at all times. If dogs are permitted, they must be kept on a short lead and any waste must be cleaned up immediately.</li>
      </ul>
    )
  },
  {
    title: "3. Attire and Presentation",
    content: (
      <div className="space-y-2 text-sm text-gray-700">
        <p>Maintaining the tradition and professional atmosphere of equestrian sports is vital. All attendees are expected to be decently presented at all times.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Competitors:</strong> Must adhere strictly to the dress code specified by the governing body (e.g., breeches, boots, helmets, and competition jackets).</li>
          <li><strong>Visitors/Grooms:</strong> Recommended smart-casual attire. Practical footwear is essential; open-toed shoes or flip-flops are discouraged for safety reasons.</li>
        </ul>
      </div>
    )
  },
  {
    title: "4. General Do's and Don'ts",
    content: (
      <div className="grid sm:grid-cols-2 gap-4 text-sm">
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <h4 className="font-bold text-green-800 mb-2">Do&apos;s</h4>
          <ul className="list-disc pl-5 space-y-1 text-green-900">
            <li>Turn your phone to silent near competition rings.</li>
            <li>Respect the decisions of judges and event officials.</li>
            <li>Be respectful of other participants, staff and guests at the venue.</li>
            <li>Smoke only in the designated smoking zones.</li>
          </ul>
        </div>
        <div className="bg-red-50 p-4 rounded-xl border border-red-200">
          <h4 className="font-bold text-red-800 mb-2">Don&apos;ts</h4>
          <ul className="list-disc pl-5 space-y-1 text-red-900">
            <li>Do not use flash photography, as it can blind or startle horses.</li>
            <li>Do not run or shout in the vicinity of the horses.</li>
            <li>Do not pet or feed someone else&apos;s horse.</li>
            <li>Do not smoke outside of designated smoking zones especially in the galleries, stables or indoors.</li>
          </ul>
        </div>
      </div>
    )
  }
];

function AccordionItem({ title, content, isOpen, onClick }: { title: string, content: React.ReactNode, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white mb-3 shadow-sm">
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 text-left font-bold text-brand-900 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500"
      >
        <span>{title}</span>
        <svg 
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          {content}
        </div>
      </div>
    </div>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const orderId = searchParams.get("order_id");
  const trackingId = searchParams.get("tracking_id");
  const amount = searchParams.get("amount");

  const isSuccess = status === "Success" || status === "Successful";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-16 pb-24">
      <div className="container pt-16">
        <PageHero
          eyebrow="2nd Equestrian Challenge — August 2026"
          title={isSuccess ? "Entry Confirmed!" : "Payment Status"}
          description={
            isSuccess
              ? "Thank you! Your entry for the 2nd HPRC Equestrian Challenge 2026 (August Season) has been received and verified."
              : "Let's review the status of your recent entry payment."
          }
          backgroundImage="/photo-1553531580-6520e75d0458.png"
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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/events"
            className="inline-flex items-center justify-center rounded-xl bg-brand-900 px-8 py-4 text-sm font-bold tracking-widest text-white transition-all hover:bg-brand-800 shadow-md"
          >
            RETURN TO EVENTS
          </Link>
          {isSuccess && (
            <a
              href="/events/ecaug2026/HPRC_Equestrian_Challenge_2026_Etiquette_Conduct_Guidelines.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border-2 border-brand-900 px-8 py-4 text-sm font-bold tracking-widest text-brand-900 transition-all hover:bg-brand-50 shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              DOWNLOAD GUIDELINES
            </a>
          )}
        </div>
      </section>

      {/* Guidelines Section */}
      {isSuccess && (
        <section className="container max-w-3xl mx-auto">
          <div className="bg-white border shadow-lg rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-widest text-brand-600 bg-brand-50 rounded-full border border-brand-100">
                MANDATORY READING
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 font-display">
                Event Etiquette & Conduct Guidelines
              </h2>
              <p className="mt-3 text-gray-600 text-sm">
                To ensure a professional, safe, and enjoyable experience for all participants, visitors, and our equine athletes, please review and adhere to the following code of conduct.
              </p>
            </div>
            
            <div className="mt-8">
              {GUIDELINES.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  title={item.title} 
                  content={item.content} 
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}
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
