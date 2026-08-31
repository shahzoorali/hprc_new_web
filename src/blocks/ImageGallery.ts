import type { Block } from "payload";

// A grid of images that opens in the site's existing lightbox. This is the
// single most common pattern in the hand-built news pages — most of them are a
// hardcoded array of { src, alt } rendered into ImageLightbox.
export const ImageGalleryBlock: Block = {
  slug: "imageGallery",
  interfaceName: "ImageGalleryBlock",
  labels: { singular: "Image gallery", plural: "Image galleries" },
  fields: [
    {
      name: "heading",
      type: "text",
      admin: { description: "Optional heading shown above the grid." },
    },
    {
      name: "columns",
      type: "select",
      defaultValue: "3",
      options: [
        { label: "2 across", value: "2" },
        { label: "3 across", value: "3" },
        { label: "4 across", value: "4" },
      ],
    },
    {
      name: "images",
      type: "array",
      minRows: 1,
      required: true,
      labels: { singular: "Image", plural: "Images" },
      admin: { description: "Drag to reorder." },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          admin: { description: "Preferred. Alt text comes from the media library." },
        },
        {
          name: "legacyPath",
          type: "text",
          admin: {
            description: "Path to an image already in /public. Only used when no upload is set.",
          },
        },
        {
          name: "alt",
          type: "text",
          admin: { description: "Required when using a legacy path." },
        },
      ],
    },
  ],
};
