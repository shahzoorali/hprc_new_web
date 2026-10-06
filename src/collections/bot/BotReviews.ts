import type { CollectionConfig } from "payload";

// A reviewer's decision on one "Needs review" topic (analyzer clusterKey).
// A topic marked fixed that fails again after reviewedAt shows as regressed.
export const BotReviews: CollectionConfig = {
  slug: "bot-reviews",
  labels: { singular: "Bot review", plural: "Bot reviews" },
  admin: { hidden: true, useAsTitle: "topic" },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
  },
  timestamps: true,
  fields: [
    { name: "bot", type: "text", required: true, index: true, defaultValue: "tsec2026" },
    { name: "clusterKey", type: "text", required: true, index: true },
    { name: "topic", type: "text" },
    {
      name: "status",
      type: "select",
      required: true,
      options: [
        { label: "Fix planned", value: "planned" },
        { label: "Fixed", value: "fixed" },
        { label: "Won't fix", value: "wontfix" },
        { label: "Fine as is", value: "fine" },
      ],
    },
    {
      name: "fixKind",
      type: "select",
      options: [
        { label: "Add or correct event data", value: "data" },
        { label: "Change the bot prompt", value: "prompt" },
        { label: "New feature or tool", value: "feature" },
        { label: "No change needed", value: "none" },
      ],
    },
    { name: "note", type: "textarea" },
    { name: "idealAnswer", type: "textarea" },
    { name: "reviewedBy", type: "text" },
    { name: "reviewedAt", type: "date" },
  ],
};
