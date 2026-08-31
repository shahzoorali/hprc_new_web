import type { Field } from "payload";

// The site has ~323 MB of images already sitting under /public with paths
// hardcoded all over the codebase. Re-uploading them into the media library
// would be a large, risky diff for no visible gain, so every image field in the
// CMS accepts either:
//
//   - an upload (preferred for anything new — gets alt text, focal point and
//     generated sizes), or
//   - a legacy path pointing at a file already in /public.
//
// Renderers prefer the upload and fall back to the path. This factory keeps that
// pair consistent everywhere instead of repeating it in five collections.
export function imageFields({
  name = "image",
  label,
  required = false,
  altFallback = true,
}: {
  name?: string;
  label?: string;
  required?: boolean;
  altFallback?: boolean;
} = {}): Field[] {
  const fields: Field[] = [
    {
      name,
      type: "upload",
      relationTo: "media",
      label,
      admin: {
        description: "Preferred. Alt text and sizes come from the media library.",
      },
    },
    {
      name: `${name}Path`,
      type: "text",
      label: label ? `${label} — legacy path` : undefined,
      required,
      admin: {
        description: "Path to a file already in /public. Only used when no upload is set.",
      },
    },
  ];

  if (altFallback) {
    fields.push({
      name: `${name}Alt`,
      type: "text",
      admin: {
        description: "Alt text for the legacy path above. Ignored when an upload is used.",
      },
    });
  }

  return fields;
}
