import type { CollectionConfig } from "payload";

import { revalidateVideos, revalidateVideosAfterDelete } from "../hooks/revalidate";

// Groups videos on /events/video-gallery (Polo Matches, Equestrian Events, …).
export const VideoCategories: CollectionConfig = {
  slug: "video-categories",
  labels: { singular: "Video category", plural: "Video categories" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "icon", "slug", "displayOrder"],
    group: "Galleries",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
  },
  hooks: {
    afterChange: [revalidateVideos],
    afterDelete: [revalidateVideosAfterDelete],
  },
  defaultSort: "displayOrder",
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    {
      name: "icon",
      type: "text",
      admin: { description: "A single emoji shown beside the category name, e.g. 🏇" },
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar", description: "Lower numbers appear first." },
    },
  ],
};
