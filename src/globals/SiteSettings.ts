import type { GlobalConfig } from "payload";

import { revalidateGlobal } from "../hooks/revalidate";

// Club-wide details that appear in the header, the footer and page metadata.
// Replaces src/config/site.ts.
//
// A change here touches every page, so this global revalidates the whole site
// via the layout path rather than a list of routes.
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  admin: {
    group: "Settings",
    description: "Phone, address, social links and the header buttons.",
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
      type: "tabs",
      tabs: [
        {
          label: "Identity",
          fields: [
            { name: "name", type: "text", required: true },
            {
              name: "shortName",
              type: "text",
              admin: { description: 'The abbreviation, e.g. "HPRC".' },
            },
            {
              name: "description",
              type: "textarea",
              required: true,
              admin: {
                description:
                  "Used as the default meta description and in the footer. Keep it under about 160 characters.",
              },
            },
          ],
        },
        {
          label: "Contact",
          fields: [
            {
              type: "row",
              fields: [
                { name: "phone", type: "text", required: true, admin: { width: "50%" } },
                { name: "email", type: "text", required: true, admin: { width: "50%" } },
              ],
            },
            {
              name: "membershipEmail",
              type: "text",
              admin: {
                description: "Shown on membership pages when different from the main address.",
              },
            },
            { name: "address", type: "textarea", required: true },
          ],
        },
        {
          label: "Social",
          fields: [
            {
              type: "row",
              fields: [
                { name: "facebook", type: "text", admin: { width: "50%" } },
                { name: "instagram", type: "text", admin: { width: "50%" } },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "youtube", type: "text", admin: { width: "50%" } },
                { name: "twitter", type: "text", label: "X (Twitter)", admin: { width: "50%" } },
              ],
            },
          ],
        },
        {
          label: "Header buttons",
          fields: [
            {
              name: "primaryActions",
              type: "array",
              maxRows: 3,
              labels: { singular: "Button", plural: "Buttons" },
              admin: { description: "The call-to-action buttons in the site header." },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", type: "text", required: true, admin: { width: "40%" } },
                    { name: "href", type: "text", required: true, admin: { width: "35%" } },
                    {
                      name: "variant",
                      type: "select",
                      defaultValue: "primary",
                      admin: { width: "25%" },
                      options: [
                        { label: "Solid", value: "primary" },
                        { label: "Outline", value: "outline" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
