import type { GlobalConfig } from "payload";

// Runtime controls for the event help bot, edited from /admin/bot.
export const BotSettings: GlobalConfig = {
  slug: "bot-settings",
  label: "Bot settings",
  admin: { hidden: true },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "paused",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Kill switch: the chat box answers with the club's phone numbers instead.",
      },
    },
    {
      name: "dailyCapUsd",
      type: "number",
      defaultValue: 5,
      min: 0,
      admin: {
        description:
          "Stop answering for the rest of the IST day once bot + analyzer spend reaches this.",
      },
    },
  ],
};
