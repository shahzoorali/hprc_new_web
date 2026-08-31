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
      name: "pdf",
      type: "upload",
      relationTo: "media",
      admin: { description: "Upload the newsletter PDF. Preferred for anything new." },
    },
    {
      name: "pdfPath",
      type: "text",
      admin: {
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
