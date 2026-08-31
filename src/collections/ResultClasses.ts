import type { CollectionConfig } from "payload";

import { revalidateResults, revalidateResultsAfterDelete } from "../hooks/revalidate";

// One judged class within a result set, mirroring the ResultClass /
// ResultEntry types the site already renders (see content/results-types.ts).
//
// Entries are stored as an array on the class rather than their own collection:
// they are always read together, never linked to from elsewhere, and keeping
// them inline is what lets the CSV importer replace a whole class atomically
// when a correction comes in after prize-giving.
export const ResultClasses: CollectionConfig = {
  slug: "result-classes",
  labels: { singular: "Result class", plural: "Result classes" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "resultSet", "discipline", "category", "displayOrder"],
    group: "Results",
    description: "Placings for a single class. Use Import results to load one from a spreadsheet.",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
  },
  hooks: {
    afterChange: [revalidateResults],
    afterDelete: [revalidateResultsAfterDelete],
  },
  defaultSort: "displayOrder",
  fields: [
    {
      name: "resultSet",
      type: "relationship",
      relationTo: "result-sets",
      required: true,
      index: true,
    },
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      index: true,
      admin: { description: "Anchor id for linking straight to this class." },
    },
    {
      type: "row",
      fields: [
        {
          name: "discipline",
          type: "text",
          required: true,
          admin: { width: "50%", description: 'e.g. "Dressage", "Show Jumping", "Hacks"' },
        },
        {
          name: "category",
          type: "text",
          required: true,
          admin: { width: "50%", description: 'e.g. "Junior", "Children I", "Open"' },
        },
      ],
    },
    {
      name: "metric",
      type: "select",
      required: true,
      defaultValue: "none",
      options: [
        { label: "Dressage score (higher is better)", value: "score" },
        { label: "Jumping penalties (lower is better)", value: "penalties" },
        { label: "Placings only — judged directly", value: "none" },
      ],
      admin: { description: "Controls which column the table shows and how it is ranked." },
    },
    {
      name: "entries",
      type: "array",
      labels: { singular: "Entry", plural: "Entries" },
      admin: { description: "Drag to reorder. Order here is the order shown." },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "pos",
              type: "text",
              admin: {
                width: "25%",
                description:
                  'Placing as printed — "1st", "Joint 3rd". Blank for score-ranked classes.',
              },
            },
            { name: "rider", type: "text", required: true, admin: { width: "40%" } },
            { name: "horse", type: "text", required: true, admin: { width: "35%" } },
          ],
        },
        {
          type: "row",
          fields: [
            { name: "club", type: "text", admin: { width: "34%" } },
            {
              name: "ageGroup",
              type: "text",
              admin: { width: "33%", description: "Age band only — never a date of birth." },
            },
            { name: "prize", type: "text", admin: { width: "33%" } },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "score",
              type: "text",
              admin: {
                width: "50%",
                description: "Dressage average as a decimal — 0.6612 prints as 66.12%.",
              },
            },
            {
              name: "penalties",
              type: "text",
              admin: { width: "50%", description: "Show jumping total penalties." },
            },
          ],
        },
        {
          name: "photo",
          type: "upload",
          relationTo: "media",
          admin: { description: "Optional rider photo." },
        },
        {
          name: "photoPath",
          type: "text",
          admin: {
            description: "Legacy path under /public/images/results/. Used when no upload is set.",
          },
        },
      ],
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
      admin: { position: "sidebar", description: "Lower numbers appear first." },
    },
  ],
};
