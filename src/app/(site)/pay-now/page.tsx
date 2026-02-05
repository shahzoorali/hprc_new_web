\"use client\";

import { useEffect, useRef } from \"react\";

import { PageHero } from \"@/components/ui/page-hero\";
import { SectionHeading } from \"@/components/ui/section-heading\";

export default function PayNowPage() {
  const tidRef = useRef<HTMLInputElement | null>(null);

  // Replicate legacy behaviour: use current timestamp as transaction id (tid)
  useEffect(() => {
    if (tidRef.current) {
      tidRef.current.value = String(new Date().getTime());
    }
  }, []);

  return (
    <div className=\"space-y-16 sm:space-y-24 pb-12 sm:pb-24\">
      <div className=\"container pt-16\">
        <PageHero
          eyebrow=\"Online Payments\"
          title=\"Secure Payment to Hyderabad Polo & Riding Club\"
          description=\"Use this form to make secure online payments to HPRC for memberships, riding programmes, tournaments, hospitality, and other services. Transactions are processed via our trusted payment gateway provider.\"
          backgroundImage=\"https://images.unsplash.com/photo-1549570652-97324981a6fd?w=1920&q=80\"
        />
      </div>

      <section className=\"container space-y-10\">
        <div className=\"max-w-3xl mx-auto space-y-6\">
          <SectionHeading
            eyebrow=\"Pay Now\"
            title=\"Fill your details to proceed\"
            description=\"Please provide accurate contact details so we can reconcile your payment quickly. All fields marked with * are mandatory.\"
            align=\"left\"
          />

          <div className=\"rounded-3xl border border-brand-100/70 bg-white/80 shadow-xl p-6 sm:p-10\">
            {/* Keep PHP payment flow intact – post directly to existing handler */}
            <form
              id=\"pay-now-form\"
              name=\"customerData\"
              action=\"https://hprc.in/payment/ccavRequestHandler.php\"
              method=\"post\"
              className=\"space-y-6\"
            >
              <div className=\"grid grid-cols-1 gap-6\">
                {/* Full Name */}
                <div className=\"space-y-2\">
                  <label
                    htmlFor=\"name\"
                    className=\"block text-sm font-semibold text-slate-800\"
                  >
                    Full Name <span className=\"text-brand-600\">*</span>
                  </label>
                  <input
                    id=\"name\"
                    name=\"merchant_param1\"
                    type=\"text\"
                    required
                    pattern=\"^[a-zA-Z_ ]{2,55}\"
                    className=\"block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm sm:text-base text-slate-900 shadow-sm outline-none ring-0 transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100\"
                  />
                </div>

                {/* Email */}
                <div className=\"space-y-2\">
                  <label
                    htmlFor=\"email\"
                    className=\"block text-sm font-semibold text-slate-800\"
                  >
                    E-mail <span className=\"text-brand-600\">*</span>
                  </label>
                  <input
                    id=\"email\"
                    name=\"merchant_param2\"
                    type=\"email\"
                    required
                    pattern=\"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$\"
                    title=\"Please provide a valid email address\"
                    className=\"block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm sm:text-base text-slate-900 shadow-sm outline-none ring-0 transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100\"
                  />
                </div>

                {/* Phone */}
                <div className=\"space-y-2\">
                  <label
                    htmlFor=\"phone\"
                    className=\"block text-sm font-semibold text-slate-800\"
                  >
                    Phone <span className=\"text-brand-600\">*</span>
                  </label>
                  <input
                    id=\"phone\"
                    name=\"merchant_param3\"
                    type=\"tel\"
                    required
                    pattern=\"[0-9]{8,16}\"
                    title=\"Please provide a valid phone number\"
                    className=\"block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm sm:text-base text-slate-900 shadow-sm outline-none ring-0 transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100\"
                  />
                </div>

                {/* Membership question */}
                <div className=\"space-y-3\">
                  <p className=\"text-sm font-semibold text-slate-800\">
                    Do you have membership?
                  </p>
                  <div className=\"flex flex-wrap gap-4 text-sm text-slate-700\">
                    <label className=\"inline-flex items-center gap-2\">
                      <input
                        type=\"radio\"
                        id=\"chkYes\"
                        name=\"membership\"
                        value=\"yes\"
                        className=\"h-4 w-4 border-slate-300 text-brand-600 focus:ring-brand-500\"
                        onChange={() => {
                          const el = document.getElementById(\"membership-number-section\");
                          if (el) el.classList.remove(\"hidden\");
                        }}
                      />
                      <span>Yes</span>
                    </label>
                    <label className=\"inline-flex items-center gap-2\">
                      <input
                        type=\"radio\"
                        id=\"chkNo\"
                        name=\"membership\"
                        value=\"no\"
                        className=\"h-4 w-4 border-slate-300 text-brand-600 focus:ring-brand-500\"
                        defaultChecked
                        onChange={() => {
                          const el = document.getElementById(\"membership-number-section\");
                          if (el) el.classList.add(\"hidden\");
                        }}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                {/* Membership Number (optional) */}
                <div id=\"membership-number-section\" className=\"space-y-2 hidden\">
                  <label
                    htmlFor=\"membership_number\"
                    className=\"block text-sm font-semibold text-slate-800\"
                  >
                    Membership Number
                  </label>
                  <input
                    id=\"membership_number\"
                    name=\"merchant_param4\"
                    type=\"text\"
                    className=\"block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm sm:text-base text-slate-900 shadow-sm outline-none ring-0 transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100\"
                  />
                </div>

                {/* Amount */}
                <div className=\"space-y-2\">
                  <label
                    htmlFor=\"amount\"
                    className=\"block text-sm font-semibold text-slate-800\"
                  >
                    Amount (INR) <span className=\"text-brand-600\">*</span>
                  </label>
                  <input
                    id=\"amount\"
                    name=\"amount\"
                    type=\"number\"
                    min=\"1\"
                    step=\"0.01\"
                    required
                    className=\"block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm sm:text-base text-slate-900 shadow-sm outline-none ring-0 transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100\"
                  />
                </div>

                {/* Towards */}
                <div className=\"space-y-2\">
                  <label
                    htmlFor=\"towards\"
                    className=\"block text-sm font-semibold text-slate-800\"
                  >
                    Towards <span className=\"text-brand-600\">*</span>
                  </label>
                  <textarea
                    id=\"towards\"
                    name=\"merchant_param5\"
                    rows={2}
                    required
                    pattern=\"^[a-zA-Z0-9_ ]*$\"
                    className=\"block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm sm:text-base text-slate-900 shadow-sm outline-none ring-0 transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100\"
                  />
                </div>
              </div>

              {/* Hidden transaction id (tid) – set on load */}
              <input type=\"hidden\" name=\"tid\" id=\"tid\" ref={tidRef} readOnly />

              <div className=\"flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between\">
                <p className=\"text-xs sm:text-sm text-slate-500 max-w-xl\">
                  By clicking <span className=\"font-semibold text-slate-700\">Proceed to Pay</span>,
                  you will be redirected to our secure payment gateway (CCAvenue) to complete your
                  transaction.
                </p>
                <button
                  type=\"submit\"
                  className=\"inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:from-brand-700 hover:to-brand-800 hover:-translate-y-0.5 hover:shadow-xl\"
                >
                  Proceed to Pay
                  <svg
                    className=\"ml-2 h-4 w-4\"
                    fill=\"none\"
                    stroke=\"currentColor\"
                    viewBox=\"0 0 24 24\"
                  >
                    <path
                      strokeLinecap=\"round\"
                      strokeLinejoin=\"round\"
                      strokeWidth={2}
                      d=\"M17 8l4 4m0 0l-4 4m4-4H3\"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

