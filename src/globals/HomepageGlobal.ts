import type { GlobalConfig } from "payload";

import { imageFields } from "../fields/image";
import { revalidateGlobal } from "../hooks/revalidate";

// The homepage, replacing src/content/home.ts.
//
// The news strip and results section on the homepage are not here — those read
// from the News and Result collections directly, so they stay current without
// anyone editing this page.
export const HomepageGlobal: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
  admin: {
    group: "Pages",
    description: "The hero, pillars and highlights. News and results update themselves.",
  },
  versions: { drafts: false, max: 20 },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [revalidateGlobal(["/"])],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            {
              name: "heroSlides",
              type: "array",
              labels: { singular: "Slide", plural: "Hero slides" },
              admin: {
                description:
                  "The first slide is what the homepage shows. A slide with a video URL plays the video with the image as its fallback.",
              },
              fields: [
                {
                  name: "video",
                  type: "text",
                  admin: { description: "YouTube URL. Leave blank for a still image." },
                },
                ...imageFields({ name: "image", altFallback: false }),
                { name: "imageAlt", type: "text" },
                {
                  type: "row",
                  fields: [
                    { name: "title", type: "text", required: true, admin: { width: "60%" } },
                    {
                      name: "titleHighlight",
                      type: "text",
                      admin: { width: "40%", description: "Shown in the accent colour." },
                    },
                  ],
                },
                { name: "description", type: "textarea", required: true },
                {
                  name: "actions",
                  type: "array",
                  maxRows: 3,
                  labels: { singular: "Button", plural: "Buttons" },
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
        {
          label: "Sections",
          fields: [
            {
              name: "pillars",
              type: "array",
              labels: { singular: "Pillar", plural: "What we offer" },
              fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
                { name: "href", type: "text" },
              ],
            },
            {
              name: "highlights",
              type: "array",
              fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
              ],
            },
            {
              name: "events",
              type: "array",
              labels: { singular: "Card", plural: "What we do cards" },
              fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
                { name: "href", type: "text" },
                {
                  name: "iconName",
                  type: "text",
                  admin: { description: 'Icon key used by the card, e.g. "book".' },
                },
              ],
            },
          ],
        },
        {
          label: "Spotlight & quotes",
          fields: [
            {
              name: "spotlight",
              type: "group",
              fields: [
                { name: "title", type: "text" },
                { name: "description", type: "textarea" },
                {
                  name: "cta",
                  type: "group",
                  label: "Button",
                  fields: [
                    {
                      type: "row",
                      fields: [
                        { name: "label", type: "text", admin: { width: "40%" } },
                        { name: "href", type: "text", admin: { width: "60%" } },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "testimonials",
              type: "array",
              fields: [
                { name: "quote", type: "textarea", required: true },
                {
                  name: "author",
                  type: "text",
                  required: true,
                  admin: { description: 'Attribution as printed, e.g. "Member since 2012".' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
