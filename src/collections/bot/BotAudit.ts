import type { CollectionConfig } from "payload";

// Who opened a bot transcript, revealed personal data, saved a review or
// changed the bot controls. Written only by the /admin/bot server actions.
export const BotAudit: CollectionConfig = {
  slug: "bot-audit",
  labels: { singular: "Bot audit entry", plural: "Bot audit log" },
  admin: { hidden: true, useAsTitle: "action" },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => false,
    update: () => false,
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
  },
  timestamps: true,
  fields: [
    {
      name: "action",
      type: "select",
      required: true,
      options: [
        "open_chat",
        "reveal_pii",
        "save_review",
        "reopen_review",
        "kill_switch",
        "set_cap",
      ].map((v) => ({
        label: v,
        value: v,
      })),
    },
    { name: "user", type: "text", required: true },
    { name: "target", type: "text" },
  ],
};
