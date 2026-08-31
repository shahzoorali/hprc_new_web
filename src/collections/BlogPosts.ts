import type { CollectionConfig } from "payload";

import { contentBlocks } from "../blocks";
import { revalidateBlogPost, revalidateBlogPostAfterDelete } from "../hooks/revalidate";

// Long-form riding and club articles, served at /events/blogs/<slug>.
//
// Replaces the inline `blogPosts` array that was duplicated across
// events/blogs/page.tsx and events/blogs/[slug]/page.tsx, where each post's body
// was a single HTML string in a template literal.
export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  labels: { singular: "Blog post", plural: "Blog posts" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedDate", "category", "_status"],
    group: "Content",
    description: "Longer editorial pieces — riding advice, club stories.",
    preview: (doc) => (doc?.slug ? `/events/blogs/${doc.slug}` : null),
  },
  versions: {
    drafts: true,
    maxPerDoc: 25,
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return { _status: { equals: "published" } };
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
  },
  hooks: {
    afterChange: [revalidateBlogPost],
    afterDelete: [revalidateBlogPostAfterDelete],
  },
  defaultSort: "-publishedDate",
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: "URL path segment. The post appears at /events/blogs/<slug>." },
    },
    {
      type: "row",
      fields: [
        {
          name: "publishedDate",
          type: "date",
          required: true,
          admin: {
            width: "34%",
            date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" },
          },
        },
        {
          name: "author",
          type: "text",
          defaultValue: "HPRC Team",
          admin: { width: "33%" },
        },
        {
          name: "category",
          type: "text",
          admin: { width: "33%", description: 'e.g. "Health & Wellness"' },
        },
      ],
    },
    {
      name: "readTime",
      type: "text",
      admin: { description: 'Shown on the card, e.g. "5 min read".' },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Show as the lead post on the blog index.",
      },
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "heroImagePath",
      type: "text",
      admin: {
        description: "Legacy path under /public. Only used when no upload is set above.",
      },
    },
    {
      name: "body",
      type: "blocks",
      blocks: contentBlocks,
      required: true,
    },
  ],
};
