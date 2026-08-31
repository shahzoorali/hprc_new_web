import type { Block } from "payload";

// A pull quote — used for the attributed statements that appear throughout the
// press-coverage articles.
export const QuoteBlock: Block = {
  slug: "quote",
  interfaceName: "QuoteBlock",
  labels: { singular: "Pull quote", plural: "Pull quotes" },
  fields: [
    { name: "quote", type: "textarea", required: true },
    { name: "attribution", type: "text" },
  ],
};
