"use client";

// Floating help bot for the II Telangana State Equestrian Championship & HPRC Show page.
// Talks to /api/tsec-bot; conversation lives only in this browser tab.
import React, { useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  turnId?: string | null;
  rating?: "up" | "down" | null;
};

// One id per browser tab, so the admin dashboard can group a visitor's questions into one chat.
function getSessionId(): string {
  const key = "tsec-bot-session";
  try {
    const existing = sessionStorage.getItem(key);
    if (existing) return existing;
    const id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

// Render **bold** only; everything else stays plain text (no HTML injection).
function renderText(text: string) {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, i) =>
      part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
        <strong key={i}>{part.slice(2, -2)}</strong>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      ),
    );
}

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I can help with the Championship & HPRC Show — which classes you can enter, TS Championship vs HPRC Show, schedule, fees and stabling. What would you like to know?",
};

const SUGGESTIONS = [
  "Which classes can my child enter?",
  "What's the difference between TS Championship and HPRC Show?",
  "How much will my entries cost?",
  "What documents do I need?",
];

const WHATSAPP =
  "https://wa.me/919949000085?text=" +
  encodeURIComponent(
    "Hi, I have a question about the II Telangana State Equestrian Championship & HPRC Show.",
  );

export function TsecBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    const next = [...messages, { role: "user" as const, content: q.slice(0, 1000) }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/tsec-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Skip the canned greeting — the API wants history starting with a user turn.
        body: JSON.stringify({
          sessionId: (sessionRef.current ??= getSessionId()),
          messages: next.slice(1).map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = (await res.json()) as { reply?: string; turnId?: string | null };
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: data.reply || "Sorry, something went wrong.",
          turnId: data.turnId ?? null,
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Sorry, I couldn't connect. Please call +91 9949000085 / +91 7799259000.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function rate(index: number, rating: "up" | "down") {
    const msg = messages[index];
    if (!msg?.turnId) return;
    const nextRating = msg.rating === rating ? null : rating;
    setMessages((m) => m.map((x, i) => (i === index ? { ...x, rating: nextRating } : x)));
    try {
      await fetch("/api/tsec-bot/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionRef.current,
          turnId: msg.turnId,
          rating: nextRating,
        }),
      });
    } catch {
      // Rating is best-effort.
    }
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3.5 text-sm font-bold text-white shadow-2xl shadow-brand-900/30 transition hover:bg-brand-700 hover:-translate-y-0.5"
          aria-label="Open event help chat"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.83L3 20l1.4-3.72A7.6 7.6 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          Ask about this event
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label="Event help chat"
          className="fixed z-50 inset-x-0 bottom-0 sm:inset-x-auto sm:bottom-5 sm:right-5 flex h-[85vh] sm:h-[600px] w-full sm:w-[380px] flex-col overflow-hidden border border-brand-200 bg-white shadow-2xl sm:rounded-2xl"
        >
          <div className="flex items-center justify-between bg-brand-700 px-4 py-3 text-white">
            <div>
              <p className="text-sm font-bold">Event Help</p>
              <p className="text-[11px] text-white/70">
                State Championship &amp; HPRC Show · 16–18 Oct
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded p-1 hover:bg-white/10"
              aria-label="Close chat"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-brand-50/40 p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-brand-600 text-white"
                      : "border border-brand-100 bg-white text-gray-800"
                  }`}
                >
                  {m.role === "assistant" ? renderText(m.content) : m.content}
                  {m.role === "assistant" && m.turnId && (
                    <div className="mt-2 flex items-center gap-1 text-gray-400">
                      <span className="mr-1 text-[10px]">Helpful?</span>
                      {(["up", "down"] as const).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => rate(i, r)}
                          aria-label={r === "up" ? "Helpful" : "Not helpful"}
                          aria-pressed={m.rating === r}
                          className={`rounded px-1.5 py-0.5 text-xs hover:bg-brand-50 ${m.rating === r ? (r === "up" ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50") : ""}`}
                        >
                          {r === "up" ? "👍" : "👎"}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-brand-100 bg-white px-3.5 py-2.5 text-sm text-gray-400">
                  Thinking…
                </div>
              </div>
            )}
            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-medium text-brand-700 hover:bg-brand-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-brand-100 bg-white px-3 pt-2 pb-3">
            <div className="mb-2 flex items-center gap-3 text-[11px] text-gray-500">
              <span>Still confused?</span>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-green-700 hover:underline"
              >
                WhatsApp
              </a>
              <a href="tel:+919949000085" className="font-semibold text-brand-700 hover:underline">
                Call
              </a>
              <a href="tel:+919100033323" className="font-semibold text-brand-700 hover:underline">
                Show Secretary
              </a>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-end gap-2"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                maxLength={1000}
                placeholder="e.g. My daughter was born in 2015…"
                className="max-h-28 flex-1 resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-40"
              >
                Send
              </button>
            </form>
            <p className="mt-1.5 text-[10px] text-gray-400">
              AI assistant — answers may be imperfect; the prospectus is final.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
