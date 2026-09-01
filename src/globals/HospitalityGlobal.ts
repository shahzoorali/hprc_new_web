import type { GlobalConfig } from "payload";

import { imageFields } from "../fields/image";
import { revalidateGlobal } from "../hooks/revalidate";

// Restaurants, bars and banquet venues. Replaces content/hospitality.ts, which
// drove /hospitality and the individual venue pages.
export const HospitalityGlobal: GlobalConfig = {
  slug: "hospitality",
  label: "Hospitality page",
  admin: { group: "Pages" },
  versions: { drafts: false, max: 20 },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [
      revalidateGlobal([
        "/hospitality",
        "/hospitality/chukkers",
        "/hospitality/snaffles-bistro",
        "/hospitality/banquets",
        "/hospitality/luxury-rooms",
      ]),
    ],
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
      name: "venues",
      type: "array",
      admin: { description: "Drag to reorder." },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        {
          name: "fullDescription",
          type: "textarea",
          admin: { description: "The longer copy shown on the venue's own page." },
        },
        {
          name: "highlights",
          type: "array",
          fields: [{ name: "text", type: "text", required: true }],
        },
        {
          name: "menuLinks",
          type: "array",
          labels: { singular: "Menu", plural: "Menus" },
          fields: [
            {
              type: "row",
              fields: [
                { name: "label", type: "text", required: true, admin: { width: "40%" } },
                { name: "href", type: "text", required: true, admin: { width: "60%" } },
              ],
            },
          ],
        },
        {
          name: "menuPackages",
          type: "array",
          labels: { singular: "Package", plural: "Menu packages" },
          admin: {
            description: "Banquet packages. Only the banquets venue uses these today.",
          },
          fields: [
            {
              type: "row",
              fields: [
                { name: "name", type: "text", required: true, admin: { width: "50%" } },
                { name: "price", type: "text", required: true, admin: { width: "25%" } },
                { name: "gst", type: "text", admin: { width: "25%" } },
              ],
            },
            {
              name: "features",
              type: "array",
              fields: [{ name: "text", type: "text", required: true }],
            },
          ],
        },
        {
          name: "photo",
          type: "group",
          label: "Photo",
          fields: imageFields({ name: "image", altFallback: false }),
        },
        {
          name: "brand",
          type: "group",
          label: "Logo",
          fields: imageFields({ name: "image", altFallback: false }),
        },
      ],
    },
    {
      name: "experiences",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
  ],
};
