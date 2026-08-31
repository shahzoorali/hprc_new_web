import type { CollectionConfig } from "payload";

import { imageFields } from "../fields/image";
import { revalidateGallery, revalidateGalleryAfterDelete } from "../hooks/revalidate";

// Photo albums. Replaces the 856-line hardcoded galleryCategories structure in
// events/photo-gallery/page.tsx — 24 albums and 278 image paths that previously
// could only be changed by editing React.
export const Albums: CollectionConfig = {
  slug: "albums",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "year", "displayOrder"],
    group: "Galleries",
    description: "Photo albums shown on the gallery page.",
    preview: () => "/events/photo-gallery",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
  },
  hooks: {
    afterChange: [revalidateGallery],
    afterDelete: [revalidateGalleryAfterDelete],
  },
  defaultSort: "displayOrder",
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      index: true,
      admin: { description: "Album id used in the page's URL hash." },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "gallery-categories",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "year",
          type: "text",
          admin: { width: "50%", description: 'e.g. "2016". Used for the year filter.' },
        },
        {
          name: "date",
          type: "text",
          admin: { width: "50%", description: 'Printed verbatim, e.g. "11 Oct 2015".' },
        },
      ],
    },
    {
      name: "cover",
      type: "group",
      label: "Cover image",
      fields: imageFields({ name: "image", altFallback: false }),
    },
    {
      name: "images",
      type: "array",
      labels: { singular: "Photo", plural: "Photos" },
      minRows: 1,
      admin: { description: "Drag to reorder. The first photo is used if no cover is set." },
      fields: imageFields({ name: "image" }),
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar", description: "Lower numbers appear first." },
    },
  ],
};
