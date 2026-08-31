import type { CollectionConfig } from "payload";

// Uploads made through the CMS. Files land in public/uploads so they are served
// by Next/nginx as static assets, the same way the existing 300-odd MB under
// public/documents and public/images already are.
//
// Note: pre-existing assets keep their current paths and are NOT imported here
// (see the migration plan). This collection governs new uploads only.
export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Content",
  },
  access: {
    read: () => true, // media is public — it is served on the website
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
  },
  upload: {
    staticDir: "public/uploads",
    // Focal point + generated sizes so editors don't have to crop by hand.
    focalPoint: true,
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 768, height: 512, position: "centre" },
      { name: "wide", width: 1600, height: 900, position: "centre" },
    ],
    mimeTypes: ["image/*", "application/pdf", "video/mp4"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description: "Describe the image for screen readers and SEO. Required.",
      },
    },
    {
      name: "credit",
      type: "text",
      admin: {
        description: "Photographer or source, shown as a caption where the design allows.",
      },
    },
  ],
};
