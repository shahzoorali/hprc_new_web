import type { CollectionConfig } from "payload";

import { imageFields } from "../fields/image";
import { revalidateProgramme, revalidateProgrammeAfterDelete } from "../hooks/revalidate";

// Riding and polo programmes. Replaces the `programmes` array in
// content/programmes.ts, which already drove the /programmes index and the
// existing /programmes/[programmeId] route — so this is a clean swap.
export const Programmes: CollectionConfig = {
  slug: "programmes",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "schedule", "displayOrder"],
    group: "Content",
    preview: (doc) => (doc?.slug ? `/programmes/${doc.slug}` : null),
  },
  versions: { drafts: true, maxPerDoc: 20 },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return { _status: { equals: "published" } };
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
  },
  hooks: {
    afterChange: [revalidateProgramme],
    afterDelete: [revalidateProgrammeAfterDelete],
  },
  defaultSort: "displayOrder",
  fields: [
    {
      type: "row",
      fields: [
        { name: "title", type: "text", required: true, admin: { width: "50%" } },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          index: true,
          admin: { width: "50%", description: "The page appears at /programmes/<slug>." },
        },
      ],
    },
    { name: "excerpt", type: "textarea", required: true },
    {
      name: "schedule",
      type: "text",
      admin: { description: 'Printed verbatim, e.g. "Tue - Sun - 6:00 AM to 10:00 AM".' },
    },
    {
      name: "cardImage",
      type: "group",
      label: "Image",
      fields: imageFields({ name: "image", altFallback: false }),
    },
    {
      name: "highlights",
      type: "array",
      labels: { singular: "Highlight", plural: "Highlights" },
      fields: [{ name: "text", type: "text", required: true }],
    },
    {
      name: "pricingTables",
      type: "array",
      labels: { singular: "Pricing table", plural: "Pricing tables" },
      admin: { description: "Optional. Some programmes list several fee tables." },
      fields: [
        { name: "heading", type: "text", required: true },
        {
          name: "rows",
          type: "array",
          minRows: 1,
          fields: [
            {
              type: "row",
              fields: [
                { name: "label", type: "text", required: true, admin: { width: "40%" } },
                { name: "price", type: "text", required: true, admin: { width: "20%" } },
                { name: "gst", type: "text", admin: { width: "20%" } },
                { name: "total", type: "text", admin: { width: "20%" } },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar", description: "Order on the programmes index." },
    },
  ],
};
