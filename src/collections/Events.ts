import type { CollectionConfig } from "payload";

import { pageBlocks } from "../blocks";
import { imageFields } from "../fields/image";
import { revalidateEvent, revalidateEventAfterDelete } from "../hooks/revalidate";

// Tournaments and competitions.
//
// Replaces the eleven per-event content modules under src/content/ and, just as
// importantly, the two hand-maintained lists in events.ts (`upcoming` and
// `pastHighlights`). Those had to be edited by a developer whenever an event
// finished; here `status` drives both listings, so an event moves from Upcoming
// to Past by changing one field.
export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "startDate", "_status"],
    group: "Content",
    description: "Tournaments and competitions. Status drives the upcoming and past listings.",
    preview: (doc) => (doc?.slug ? `/events/${doc.slug}` : null),
  },
  versions: { drafts: true, maxPerDoc: 25 },
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
    afterChange: [revalidateEvent],
    afterDelete: [revalidateEventAfterDelete],
  },
  defaultSort: "-startDate",
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: "The event appears at /events/<slug>." },
    },
    {
      type: "row",
      fields: [
        {
          name: "status",
          type: "select",
          required: true,
          defaultValue: "upcoming",
          admin: {
            width: "50%",
            description:
              "Upcoming events appear on /events/upcoming and the homepage; completed ones move to /events/past automatically.",
          },
          options: [
            { label: "Upcoming", value: "upcoming" },
            { label: "Registration open", value: "registration-open" },
            { label: "In progress", value: "in-progress" },
            { label: "Completed", value: "completed" },
          ],
        },
        {
          name: "featured",
          type: "checkbox",
          defaultValue: false,
          admin: { width: "50%", description: "Highlight on the homepage and events page." },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "startDate",
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
              "Printed verbatim on cards and listings, e.g. 14–16 August 2026. Leave blank to format the date.",
          },
        },
      ],
    },
    {
      name: "venue",
      type: "text",
      admin: { description: "e.g. Gandipet, Moinabad" },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      admin: { description: "The summary shown on event cards and listings." },
    },
    {
      name: "cardImage",
      type: "group",
      label: "Listing image",
      fields: imageFields({ name: "image", altFallback: false }),
    },
    {
      name: "linkOverride",
      type: "text",
      admin: {
        description:
          "Optional. Send listing cards somewhere other than /events/<slug> — e.g. straight to a results page. Existing events use this because their pages live at varied URLs.",
      },
    },
    {
      name: "registrationUrl",
      type: "text",
      admin: {
        description:
          "Link to the entry form, e.g. /events/nq-2026. The form itself stays in code — the CMS only links to it.",
      },
    },
    {
      name: "body",
      type: "blocks",
      blocks: pageBlocks,
      admin: {
        description:
          "Build the event page from blocks. Leave empty for an event that only needs a listing entry.",
      },
    },
  ],
};
