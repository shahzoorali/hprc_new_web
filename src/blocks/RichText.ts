import type { Block } from "payload";

// A run of formatted prose. The workhorse block — most article bodies are
// alternating RichText and ImageGallery.
export const RichTextBlock: Block = {
  slug: "richText",
  interfaceName: "RichTextBlock",
  labels: { singular: "Text", plural: "Text blocks" },
  fields: [
    {
      name: "content",
      type: "richText",
      required: true,
    },
  ],
};
