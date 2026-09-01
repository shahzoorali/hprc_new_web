import type { GlobalConfig } from "payload";

import { imageFields } from "../fields/image";
import { revalidateGlobal } from "../hooks/revalidate";

// The site header's mega menu, replacing src/content/navigation.ts.
//
// Each top-level item can be a plain link (Home, Contact) or a dropdown built
// from `sections` — column headings with links under them — plus an optional
// `featured` panel with a blurb and an image. That is the structure the existing
// menu already uses; this makes it editable rather than a code change.
export const NavigationGlobal: GlobalConfig = {
  slug: "navigation",
  label: "Navigation",
  admin: {
    group: "Settings",
    description: "The main menu. Drag items and links to reorder them.",
  },
  versions: { drafts: false, max: 20 },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [revalidateGlobal(["/", "/layout"])],
  },
  fields: [
    {
      name: "primary",
      type: "array",
      labels: { singular: "Menu item", plural: "Main menu" },
      admin: { description: "Top-level items, left to right." },
      fields: [
        {
          type: "row",
          fields: [
            { name: "label", type: "text", required: true, admin: { width: "40%" } },
            { name: "href", type: "text", required: true, admin: { width: "60%" } },
          ],
        },
        {
          name: "description",
          type: "text",
          admin: { description: "Short caption under the label in the dropdown." },
        },
        {
          name: "sections",
          type: "array",
          labels: { singular: "Column", plural: "Dropdown columns" },
          admin: {
            description: "Leave empty for a plain link with no dropdown.",
          },
          fields: [
            { name: "title", type: "text" },
            { name: "description", type: "text" },
            ...imageFields({ name: "image", altFallback: false }),
            {
              name: "items",
              type: "array",
              labels: { singular: "Link", plural: "Links" },
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
          ],
        },
        {
          name: "featured",
          type: "group",
          admin: { description: "Optional highlighted panel on the right of the dropdown." },
          fields: [
            { name: "title", type: "text" },
            { name: "description", type: "textarea" },
            {
              type: "row",
              fields: [
                { name: "href", type: "text", admin: { width: "60%" } },
                { name: "label", type: "text", admin: { width: "40%" } },
              ],
            },
            ...imageFields({ name: "image", altFallback: false }),
          ],
        },
      ],
    },
    {
      name: "utility",
      type: "array",
      labels: { singular: "Link", plural: "Utility links" },
      admin: { description: "Small links alongside the main menu, e.g. Pay Now." },
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
  ],
};
