import type { CollectionConfig } from "payload";

import { revalidateGallery, revalidateGalleryAfterDelete } from "../hooks/revalidate";

// Groups photo albums on /events/photo-gallery. Two exist today (Facilities,
// Events & Championships); a collection rather than a fixed list so the club can
// add more without a deploy.
export const GalleryCategories: CollectionConfig = {
  slug: "gallery-categories",
  labels: { singular: "Gallery category", plural: "Gallery categories" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "displayOrder"],
    group: "Galleries",
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
    { name: "name", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: "Used as the tab id on the gallery page." },
    },
    { name: "description", type: "text" },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar", description: "Lower numbers appear first." },
    },
  ],
};
