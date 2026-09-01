import type { GlobalConfig } from "payload";

import { revalidateGlobal } from "../hooks/revalidate";

// The About section's content — one of a kind, so a global rather than a
// collection. Replaces content/about.ts, which drove /about, /about/heritage
// and /about/mission-vision-values.
//
// The committee lists that also lived in that file moved to the `people`
// collection instead: they are list-like, change independently, and each person
// deserves their own record.
export const AboutGlobal: GlobalConfig = {
  slug: "about",
  label: "About page",
  admin: { group: "Pages" },
  versions: { drafts: false, max: 20 },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [revalidateGlobal(["/about", "/about/heritage", "/about/mission-vision-values"])],
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
      name: "overview",
      type: "array",
      labels: { singular: "Paragraph", plural: "Paragraphs" },
      fields: [{ name: "text", type: "textarea", required: true }],
    },
    {
      type: "row",
      fields: [
        { name: "mission", type: "textarea", admin: { width: "50%" } },
        { name: "vision", type: "textarea", admin: { width: "50%" } },
      ],
    },
    {
      name: "values",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
    {
      name: "facilities",
      type: "array",
      labels: { singular: "Facility", plural: "Facilities list" },
      admin: { description: "The plain list of what the club has on site." },
      fields: [{ name: "text", type: "text", required: true }],
    },
    {
      name: "heritage",
      type: "array",
      labels: { singular: "Milestone", plural: "Heritage timeline" },
      admin: { description: "Drag to reorder. Shown as the heritage timeline." },
      fields: [
        {
          type: "row",
          fields: [
            { name: "year", type: "text", required: true, admin: { width: "20%" } },
            { name: "summary", type: "textarea", required: true, admin: { width: "80%" } },
          ],
        },
      ],
    },
  ],
};
