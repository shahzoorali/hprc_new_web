import type { CollectionConfig } from "payload";

import { imageFields } from "../fields/image";
import { revalidateNewsletters, revalidateNewslettersAfterDelete } from "../hooks/revalidate";

// Newsletter PDFs shown in the flipbook viewer on /events/newsletters.
export const Newsletters: CollectionConfig = {
  slug: "newsletters",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "displayOrder"],
    group: "Galleries",
    preview: () => "/events/newsletters",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
  },
  hooks: {
    afterChange: [revalidateNewsletters],
    afterDelete: [revalidateNewslettersAfterDelete],
  },
  defaultSort: "displayOrder",
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "date",
      type: "text",
      required: true,
      admin: { description: 'Printed verbatim, e.g. "October 2015" or "2016".' },
    },
    { name: "description", type: "textarea" },
    {
      name: "format",
      type: "radio",
      required: true,
      defaultValue: "pdf",
      options: [
        { label: "PDF — opens in the flipbook viewer", value: "pdf" },
        { label: "Web edition — opens its own reader page", value: "html" },
      ],
      admin: {
        description:
          "Older editions are scanned PDFs. Hoofbeats is a web edition with its own page.",
      },
    },
    {
      name: "href",
      type: "text",
      admin: {
        condition: (data) => data?.format === "html",
        description: "Path to the reader page, e.g. /events/newsletters/hoofbeats-vol-02-august-2026",
      },
    },
    {
      name: "imagePosition",
      type: "text",
      admin: {
        description:
          "Optional CSS object-position for the cover, e.g. \"top\". Scans often read better anchored to the top.",
      },
    },
    {
      name: "pdf",
      type: "upload",
      relationTo: "media",
      admin: {
        condition: (data) => data?.format !== "html",
        description: "Upload the newsletter PDF. Preferred for anything new.",
      },
    },
    {
      name: "pdfPath",
      type: "text",
      admin: {
        condition: (data) => data?.format !== "html",
        description:
          "Legacy path under /public/documents/newsletters/. Only used when no PDF is uploaded above.",
      },
    },
    {
      name: "cover",
      type: "group",
      label: "Cover image",
      fields: imageFields({ name: "image", altFallback: false }),
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar", description: "Lower numbers appear first." },
    },
  ],
};
