"use client";

import { useState } from "react";

type InquiryType = "sponsorship" | "tickets" | "media" | "general";

export function EventContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "general" as InquiryType,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate form submission - in production, this would POST to an API endpoint
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiryType: "general",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="rounded-[2.5rem] border border-brand-100 bg-gradient-to-br from-white via-white to-brand-50/30 p-8 shadow-xl md:p-12">
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-brand-900 mb-3">Get in Touch</h3>
        <p className="text-gray-700 leading-relaxed">
          Interested in sponsorship opportunities, tickets, media coverage, or have a general
          inquiry? We'd love to hear from you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-900">
              Name <span className="text-brand-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-900">
              Email <span className="text-brand-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-gray-900">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              placeholder="+91 123 456 7890"
            />
          </div>

          <div>
            <label htmlFor="inquiryType" className="mb-2 block text-sm font-semibold text-gray-900">
              Inquiry Type <span className="text-brand-500">*</span>
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              required
              value={formData.inquiryType}
              onChange={handleChange}
              className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-gray-900 transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="general">General Inquiry</option>
              <option value="sponsorship">Sponsorship Opportunities</option>
              <option value="tickets">Ticket Information</option>
              <option value="media">Media & Press</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-900">
            Message <span className="text-brand-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            placeholder="Tell us more about your inquiry..."
          />
        </div>

        {submitStatus === "success" && (
          <div className="rounded-xl bg-green-50 border border-green-200 p-4">
            <p className="text-sm font-semibold text-green-800">
              Thank you! Your message has been sent successfully. We'll get back to you soon.
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4">
            <p className="text-sm font-semibold text-red-800">
              Something went wrong. Please try again or contact us directly.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-brand-800 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-brand-900/20 transition-all duration-300 hover:bg-brand-900 hover:shadow-xl hover:shadow-brand-900/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}




