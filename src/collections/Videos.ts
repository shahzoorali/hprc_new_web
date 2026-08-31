import type { CollectionConfig } from "payload";

import { revalidateVideos, revalidateVideosAfterDelete } from "../hooks/revalidate";

// YouTube videos shown on /events/video-gallery. Only the video ID is stored —
// thumbnails come from img.youtube.com, which is already an allowed remote
// pattern in next.config.ts, so nothing needs uploading.
export const Videos: CollectionConfig = {
  slug: "videos",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "featured", "duration"],
    group: "Galleries",
    description: "Videos from the HPRC YouTube channel.",
    preview: () => "/events/video-gallery",
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
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea" },
    {
      name: "youtubeId",
      type: "text",
      required: true,
      admin: {
        description:
          "Just the ID — the part after v= in the URL. For https://youtu.be/OqYb2gZm0lk it is OqYb2gZm0lk.",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "duration",
          type: "text",
          admin: { width: "50%", description: 'e.g. "1:07:00"' },
        },
        {
          name: "views",
          type: "text",
          admin: { width: "50%", description: 'Printed verbatim, e.g. "2.4K"' },
        },
      ],
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "video-categories",
      admin: { description: "Leave empty for a featured video that sits above the categories." },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Show large, above the category sections.",
      },
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar", description: "Lower numbers appear first." },
    },
  ],
};
