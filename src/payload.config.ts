import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Albums } from "./collections/Albums";
import { BlogPosts } from "./collections/BlogPosts";
import { Events } from "./collections/Events";
import { Facilities } from "./collections/Facilities";
import { GalleryCategories } from "./collections/GalleryCategories";
import { Media } from "./collections/Media";
import { News } from "./collections/News";
import { Newsletters } from "./collections/Newsletters";
import { People } from "./collections/People";
import { Programmes } from "./collections/Programmes";
import { ResultClasses } from "./collections/ResultClasses";
import { ResultSets } from "./collections/ResultSets";
import { Users } from "./collections/Users";
import { importResultsEndpoint } from "./endpoints/import-results";
import { resultClassIndexEndpoint } from "./endpoints/result-class-index";
import { AboutGlobal } from "./globals/AboutGlobal";
import { HospitalityGlobal } from "./globals/HospitalityGlobal";
import { MembershipGlobal } from "./globals/MembershipGlobal";
import { VideoCategories } from "./collections/VideoCategories";
import { Videos } from "./collections/Videos";

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
      afterNavLinks: [
        "/components/payload/RegistrationsNavLink#RegistrationsNavLink",
        "/components/payload/ImportResultsNavLink#ImportResultsNavLink",
      ],
      views: {
        importResults: {
          Component: "/components/payload/ImportResultsView#ImportResultsView",
          path: "/import-results",
        },
      },
    },
    meta: {
      title: "HPRC Admin",
      titleSuffix: " — HPRC",
    },
  },
  collections: [
    News,
    BlogPosts,
    Events,
    Facilities,
    Programmes,
    People,
    Albums,
    GalleryCategories,
    Videos,
    VideoCategories,
    Newsletters,
    ResultSets,
    ResultClasses,
    Media,
    Users,
  ],
  // Cap uploads. Without this, one large file can fill the box's disk or push
  // sharp past available memory while generating the Media image sizes.
  // Newsletters are the largest legitimate upload and sit well under this.
  upload: {
    limits: { fileSize: 25 * 1024 * 1024 },
  },
  globals: [AboutGlobal, HospitalityGlobal, MembershipGlobal],
  endpoints: [importResultsEndpoint, resultClassIndexEndpoint],
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
