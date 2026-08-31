import type { CollectionConfig } from "payload";

import { contentBlocks } from "../blocks";
import { revalidateNews, revalidateNewsAfterDelete } from "../hooks/revalidate";

// News articles and press mentions.
//
// Replaces two things at once: the 19 hand-built pages under
// app/(site)/events/news/*, and the `news[]` array in content/events.ts that
// feeds the news index, the /events page and the homepage strip. Keeping both
// in one collection is why `linkType` exists — roughly half the entries on the
// site are full HPRC articles, and the rest are cards that link out to Instagram
// or a newspaper.
export const News: CollectionConfig = {
  slug: "news",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedDate", "category", "linkType", "_status"],
    group: "Content",
    description: "Articles, press coverage and announcements.",
    preview: (doc) =>
      doc?.linkType === "internal" && doc?.slug ? `/events/news/${doc.slug}` : null,
  },
  versions: {
    drafts: true,
    maxPerDoc: 25,
  },
  access: {
    // Published articles are public; drafts are visible to logged-in users only.
    read: ({ req: { user } }) => {
      if (user) return true;
      return { _status: { equals: "published" } };
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
  },
  hooks: {
    afterChange: [revalidateNews],
    afterDelete: [revalidateNewsAfterDelete],
  },
  defaultSort: ["-featured", "-publishedDate"],
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "publishedDate",
          type: "date",
          required: true,
          admin: {
            width: "50%",
            date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" },
            description: "Used for ordering.",
          },
        },
        {
          name: "dateLabel",
          type: "text",
          admin: {
            width: "50%",
            description:
              'Optional. Overrides how the date is printed, e.g. "2024" or "18 August, 2026". Leave blank to format the date above.',
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "source",
          type: "text",
          admin: {
            width: "50%",
            description: 'Who published it — "HPRC", "LA POLO", "Deccan Chronicle".',
          },
        },
        {
          name: "category",
          type: "text",
          admin: {
            width: "50%",
            description: 'Shown as a tag — "Results", "Championship", "International".',
          },
        },
      ],
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      admin: { description: "The summary shown on cards and the news index." },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description:
          "Pin as the lead story on the news index. If several are ticked, the most recent wins.",
      },
    },
    {
      name: "linkType",
      type: "radio",
      required: true,
      defaultValue: "internal",
      options: [
        { label: "Full article on this site", value: "internal" },
        { label: "Link out to another site", value: "external" },
      ],
      admin: {
        description:
          "Press mentions usually link out. Choose 'Full article' to write the story here.",
      },
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      admin: {
        condition: (data) => data?.linkType === "internal",
        description: "URL path segment. The article appears at /events/news/<slug>.",
      },
    },
    {
      name: "externalUrl",
      type: "text",
      admin: {
        condition: (data) => data?.linkType === "external",
        description: "Full URL including https://",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Image",
          fields: [
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
              admin: { description: "Preferred. Uploaded through the media library." },
            },
            {
              name: "heroImagePath",
              type: "text",
              admin: {
                description:
                  "Legacy path for images that already live in /public (e.g. /documents/news/...). Only used when no upload is set above. Existing articles use this; new ones should upload instead.",
              },
            },
          ],
        },
        {
          label: "Body",
          admin: { condition: (data) => data?.linkType === "internal" },
          fields: [
            {
              name: "body",
              type: "blocks",
              blocks: contentBlocks,
              admin: {
                description: "Build the article from blocks. Empty for link-only entries.",
              },
            },
          ],
        },
      ],
    },
  ],
};
