import type { Block } from "payload";

// YouTube or Instagram embed. Kept deliberately narrow — a free-form HTML
// block would let arbitrary markup into the page.
export const EmbedBlock: Block = {
  slug: "embed",
  interfaceName: "EmbedBlock",
  labels: { singular: "Video / embed", plural: "Videos & embeds" },
  fields: [
    {
      name: "provider",
      type: "select",
      required: true,
      defaultValue: "youtube",
      options: [
        { label: "YouTube", value: "youtube" },
        { label: "Instagram", value: "instagram" },
      ],
    },
    {
      name: "embedId",
      type: "text",
      required: true,
      admin: {
        description:
          "YouTube video ID (the part after v=) or the Instagram post code from /p/<code>/.",
      },
    },
    {
      name: "caption",
      type: "text",
    },
  ],
};
