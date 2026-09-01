import type { CollectionConfig } from "payload";

import { imageFields } from "../fields/image";
import { revalidateFacility, revalidateFacilityAfterDelete } from "../hooks/revalidate";

// Sports centre facilities — tennis, gym, swimming and the rest.
//
// This replaces more than a content file. Eight hand-written pages under
// sports-centre/ (1,625 lines) had an identical component sequence — hero,
// overview, timings, pricing, rules, gallery, CTA — differing only in copy and
// images. They collapse into this collection plus one dynamic route, so adding
// a ninth facility is now a CMS record rather than a new page.
export const Facilities: CollectionConfig = {
  slug: "facilities",
  labels: { singular: "Facility", plural: "Facilities" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "displayOrder"],
    group: "Content",
    description: "Sports centre facilities and their pages.",
    preview: (doc) => (doc?.slug ? `/sports-centre/${doc.slug}` : null),
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
    afterChange: [revalidateFacility],
    afterDelete: [revalidateFacilityAfterDelete],
  },
  defaultSort: "displayOrder",
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true, admin: { width: "50%" } },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          index: true,
          admin: { width: "50%", description: "The page appears at /sports-centre/<slug>." },
        },
      ],
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar", description: "Order on the sports centre index." },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Listing",
          description: "How this facility appears on the /sports-centre index.",
          fields: [
            { name: "cardDescription", type: "textarea", required: true },
            {
              name: "timingsSummary",
              type: "text",
              admin: { description: "One-line hours shown on the card." },
            },
            {
              name: "highlights",
              type: "array",
              labels: { singular: "Highlight", plural: "Highlights" },
              fields: [{ name: "text", type: "text", required: true }],
            },
            {
              name: "cardImage",
              type: "group",
              label: "Card image",
              fields: imageFields({ name: "image", altFallback: false }),
            },
          ],
        },
        {
          label: "Page",
          fields: [
            {
              name: "hero",
              type: "group",
              fields: [
                { name: "eyebrow", type: "text", defaultValue: "Sports Centre" },
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
                ...imageFields({ name: "background", altFallback: false }),
              ],
            },
            {
              name: "overviewText",
              type: "textarea",
              admin: { description: "The short line above the enrolment form link." },
            },
            {
              name: "formUrl",
              type: "text",
              admin: { description: "Enrolment form download. Leave blank to hide the link." },
            },
          ],
        },
        {
          label: "Timings",
          fields: [
            {
              name: "timingsTitle",
              type: "text",
              admin: { description: 'Section heading, e.g. "Tennis Court Timings".' },
            },
            {
              name: "timings",
              type: "array",
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      required: true,
                      admin: { width: "40%", description: "Morning, Evening…" },
                    },
                    { name: "time", type: "text", required: true, admin: { width: "60%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Pricing",
          fields: [
            { name: "pricingHeading", type: "text", defaultValue: "CHARGES" },
            { name: "pricingDescription", type: "textarea" },
            {
              name: "pricingRows",
              type: "array",
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
            {
              name: "pricingNotes",
              type: "array",
              labels: { singular: "Note", plural: "Notes" },
              fields: [{ name: "text", type: "text", required: true }],
            },
          ],
        },
        {
          label: "Rules",
          fields: [
            { name: "rulesEyebrow", type: "text" },
            { name: "rulesTitle", type: "text" },
            { name: "rulesDescription", type: "textarea" },
            {
              name: "rules",
              type: "array",
              labels: { singular: "Category", plural: "Categories" },
              fields: [
                { name: "category", type: "text", required: true },
                {
                  name: "items",
                  type: "array",
                  fields: [{ name: "text", type: "text", required: true }],
                },
              ],
            },
          ],
        },
        {
          label: "Gallery",
          fields: [
            { name: "galleryHeading", type: "text" },
            { name: "galleryDescription", type: "textarea" },
            {
              name: "galleryImages",
              type: "array",
              labels: { singular: "Photo", plural: "Photos" },
              admin: { description: "Drag to reorder." },
              fields: imageFields({ name: "image" }),
            },
          ],
        },
      ],
    },
  ],
};
