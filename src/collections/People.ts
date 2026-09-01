import type { CollectionConfig } from "payload";

import { imageFields } from "../fields/image";
import { revalidatePeople, revalidatePeopleAfterDelete } from "../hooks/revalidate";

// Committee members. Replaces the `leadership` and `subCommittees` structures
// that were buried in content/about.ts.
//
// A collection rather than fields on the About global because committees change
// independently of the page copy, and each person is a record you can add,
// reorder or retire on its own.
export const People: CollectionConfig = {
  slug: "people",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "group", "displayOrder"],
    group: "Content",
    description: "Committee members shown on the leadership page.",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
  },
  hooks: {
    afterChange: [revalidatePeople],
    afterDelete: [revalidatePeopleAfterDelete],
  },
  defaultSort: "displayOrder",
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true },
    {
      name: "group",
      type: "select",
      required: true,
      defaultValue: "leadership",
      options: [
        { label: "Managing committee", value: "leadership" },
        { label: "Equestrian committee", value: "equestrian" },
        { label: "Polo committee", value: "polo" },
        { label: "Sports arena committee", value: "sportsArena" },
      ],
    },
    {
      name: "bio",
      type: "textarea",
      admin: { description: "Shown for managing committee members only." },
    },
    {
      name: "photo",
      type: "group",
      label: "Photo",
      fields: imageFields({ name: "image", altFallback: false }),
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar", description: "Lower numbers appear first within a group." },
    },
  ],
};
