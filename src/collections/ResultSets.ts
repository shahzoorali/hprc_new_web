import type { CollectionConfig } from "payload";

import { revalidateResults, revalidateResultsAfterDelete } from "../hooks/revalidate";

// One competition's published results — "National Qualifier 2026",
// "2nd Equestrian Challenge (August)". Individual classes hang off this via the
// result-classes collection, so no single document grows unwieldy and a class
// can be imported or corrected on its own.
export const ResultSets: CollectionConfig = {
  slug: "result-sets",
  labels: { singular: "Result set", plural: "Result sets" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "eventDate", "showPhotos"],
    group: "Results",
    description: "A competition's results. Add classes from the Result classes collection.",
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
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: 'e.g. "nq-2026". Used to look the set up from a page.' },
    },
    {
      name: "eventDate",
      type: "text",
      admin: { description: 'Printed verbatim, e.g. "12–14 August 2026 · Gandipet".' },
    },
    {
      name: "showPhotos",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description:
          "Show rider photos in the results table. Off for sets where most riders entered offline and have no photo.",
      },
    },
  ],
};
