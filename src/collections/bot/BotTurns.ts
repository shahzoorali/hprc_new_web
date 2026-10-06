import type { CollectionConfig } from "payload";

// One question/answer exchange with the event help bot (/api/tsec-bot).
// Conversations are not stored separately — turns sharing a sessionId are one
// chat. Text is stored as typed; the /admin/bot screens mask personal data on
// display and log every reveal to bot-audit.
//
// Hidden from the Payload admin nav: the bot dashboard (/admin/bot) is the
// only intended viewer, so raw text never shows without the audit trail.
export const BotTurns: CollectionConfig = {
  slug: "bot-turns",
  labels: { singular: "Bot turn", plural: "Bot turns" },
  admin: { hidden: true, useAsTitle: "question" },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => false,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
  },
  timestamps: true,
  fields: [
    { name: "bot", type: "text", required: true, index: true, defaultValue: "tsec2026" },
    { name: "sessionId", type: "text", required: true, index: true },
    { name: "ipHash", type: "text" },
    { name: "question", type: "textarea", required: true },
    { name: "answer", type: "textarea" },
    // [{ name, input, result (shortened), status: ok|empty|error, ms }]
    { name: "toolCalls", type: "json" },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "ok",
      index: true,
      options: [
        { label: "Answered", value: "ok" },
        { label: "Error", value: "error" },
        { label: "Paused (kill switch)", value: "paused" },
        { label: "Over daily cap", value: "capped" },
      ],
    },
    { name: "error", type: "text" },
    { name: "model", type: "text" },
    { name: "promptHash", type: "text" },
    { name: "latencyMs", type: "number" },
    { name: "inputTokens", type: "number" },
    { name: "outputTokens", type: "number" },
    { name: "costUsd", type: "number", defaultValue: 0 },
    {
      name: "rating",
      type: "select",
      index: true,
      options: [
        { label: "Helpful", value: "up" },
        { label: "Not helpful", value: "down" },
      ],
    },
    // Filled in by the analyzer right after the answer is sent.
    {
      name: "analysis",
      type: "group",
      fields: [
        {
          name: "outcome",
          type: "select",
          index: true,
          options: ["answered", "partial", "failed", "declined", "off_topic", "asked_back"].map(
            (v) => ({
              label: v,
              value: v,
            }),
          ),
        },
        { name: "reason", type: "text" },
        { name: "topic", type: "text" },
        { name: "clusterKey", type: "text", index: true },
        { name: "severity", type: "number" },
        { name: "flags", type: "json" },
        { name: "summary", type: "text" },
        { name: "gap", type: "text" },
        { name: "costUsd", type: "number" },
        { name: "analyzedAt", type: "date" },
      ],
    },
  ],
};
