import type { CollectionConfig } from "payload";

// Admin/editor accounts for the CMS. Replaces the previous scrypt +
// admin-users.json store and the ADMIN_PASSWORD fallback: Payload owns
// authentication, sessions and password resets from here on.
//
// Roles are coarse on purpose — "admin" manages users and settings, "editor"
// manages content. Anything finer can be added per-collection later.
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "roles"],
    group: "Settings",
  },
  access: {
    // Only admins may create, edit or delete other accounts. Editors can still
    // read the list (needed to render "last edited by" on documents) and update
    // their own record via Payload's built-in account view.
    create: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
    delete: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
    update: ({ req: { user } }) => {
      if (user?.roles?.includes("admin")) return true;
      // Non-admins may only update themselves.
      return user ? { id: { equals: user.id } } : false;
    },
    read: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      required: true,
      defaultValue: ["editor"],
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      access: {
        // Nobody may escalate their own role — only admins set roles.
        update: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
      },
      admin: {
        description: "Admins manage users and site settings. Editors manage content.",
      },
    },
  ],
};
