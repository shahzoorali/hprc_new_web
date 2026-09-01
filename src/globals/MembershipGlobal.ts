import type { GlobalConfig } from "payload";

import { revalidateGlobal } from "../hooks/revalidate";

// Membership information. Replaces content/membership.ts.
//
// Note this is the marketing copy only — the application form, member login and
// payment flows stay in code and in the PHP payment app.
export const MembershipGlobal: GlobalConfig = {
  slug: "membership",
  label: "Membership page",
  admin: { group: "Pages" },
  versions: { drafts: false, max: 20 },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [revalidateGlobal(["/membership"])],
  },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
    {
      name: "steps",
      type: "array",
      labels: { singular: "Step", plural: "How to join" },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
    {
      name: "benefits",
      type: "array",
      fields: [{ name: "text", type: "text", required: true }],
    },
    {
      name: "services",
      type: "array",
      labels: { singular: "Link", plural: "Member services" },
      fields: [
        {
          type: "row",
          fields: [
            { name: "label", type: "text", required: true, admin: { width: "50%" } },
            { name: "href", type: "text", required: true, admin: { width: "50%" } },
          ],
        },
      ],
    },
    {
      name: "faqs",
      type: "array",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
  ],
};
