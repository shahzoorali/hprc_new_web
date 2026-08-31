import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { BlogPosts } from "./collections/BlogPosts";
import { Media } from "./collections/Media";
import { News } from "./collections/News";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  routes: {
    // Payload's admin takes over /admin. Its REST API is moved off the default
    // /api because this app already serves its own routes under /api/admin/*,
    // and Payload's catch-all would swallow them.
    admin: "/admin",
    api: "/cms-api",
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      // The registrations dashboard lives outside Payload (its own route group,
      // reading the PHP payment API), so surface it in the CMS sidebar.
      afterNavLinks: ["/components/payload/RegistrationsNavLink#RegistrationsNavLink"],
    },
    meta: {
      title: "HPRC Admin",
      titleSuffix: " — HPRC",
    },
  },
  collections: [News, BlogPosts, Media, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
});
