# Hyderabad Polo & Riding Club Website

A modern, responsive Next.js website for the Hyderabad Polo & Riding Club (HPRC), showcasing equestrian excellence, sports facilities, hospitality services, and membership information.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Custom React components
- **Deployment:** Optimized for Vercel (or any Node.js hosting)

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hprc_new_web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Create optimized production build
- `npm run start` - Start production server (requires `npm run build` first)
- `npm run lint` - Run ESLint to check code quality

## 📁 Project Structure

```
hprc_new_web/
├── src/
│   ├── app/              # Next.js App Router — THREE root layouts, no app/layout.tsx
│   │   ├── (site)/       # Public site + its root layout (html/body/fonts)
│   │   ├── (payload)/    # Payload CMS admin + /cms-api
│   │   ├── (manage)/     # Registrations dashboard (/admin/registrations)
│   │   ├── api/admin/    # CSV export + document proxies to PHP
│   │   └── globals.css   # Global styles
│   ├── collections/      # Payload collections (News, BlogPosts, Media, Users)
│   ├── blocks/           # Payload block definitions
│   ├── hooks/            # Payload hooks (cache revalidation)
│   ├── components/       # Reusable React components
│   │   ├── blocks/       # Renderers for CMS blocks
│   │   ├── layout/       # Layout components (Header, Footer)
│   │   └── ui/           # UI components (Hero, Cards, etc.)
│   ├── content/          # Legacy content layer — shrinking as phases land
│   ├── payload.config.ts # CMS config
│   └── config/           # Site configuration
├── public/               # Static assets
├── docs/                 # Documentation
└── ...
```

## 🎨 Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Type Safety** - Full TypeScript support
- **SEO Optimized** - Meta tags, Open Graph, structured data
- **Performance** - Image optimization, static generation
- **Accessibility** - WCAG compliant with ARIA labels
- **Error Handling** - Error boundaries and loading states
- **Security** - Security headers configured

## 🔧 Configuration

### Site Configuration

Edit `src/config/site.ts` to update:
- Site name and description
- Contact information
- Social media links
- Primary action buttons

### Content Management

News and blog posts are managed in the CMS at `/admin` — do not edit them in
code. The files below are what is *left* in `src/content/`, and each shrinks as
its migration phase lands:
- `about.ts` - About section content
- `events.ts` - Events and media content (its `news[]` array is now unused — the CMS owns news)
- `home.ts` - Homepage content
- `hospitality.ts` - Hospitality venues and services
- `membership.ts` - Membership information
- `navigation.ts` - Navigation structure
- `programmes.ts` - Equestrian programmes
- `sports.ts` - Sports centre facilities

### Environment Variables

Create a `.env.local` file (see `.env.example`) for:
- `NEXT_PUBLIC_SITE_URL` - Site URL (default: http://localhost:3000)
- `NEXT_PUBLIC_SITE_NAME` - Site name
- Other environment-specific settings

## 🗂️ CMS — Payload 3 (`/admin`)

> **Status:** phases 0–2 complete on branch `feat/payload-cms`; **not yet deployed**.
> Production still runs the pre-CMS site. News, blog posts, galleries, videos,
> newsletters and the registrations dashboard are CMS-backed locally.

The site is migrating to [Payload CMS 3](https://payloadcms.com), installed *into*
this Next.js app rather than run as a separate service — same repo, same `pm2`
process, same domain. Server components read MongoDB in-process via Payload's
Local API, so there is no HTTP hop between a page and its content.

**Content database:** MongoDB Atlas (`hprc_cms`), ap-south-1 — same region as the
EC2 box, ~6 ms away. Deliberately separate from the MySQL that the PHP payment
app uses; the two never share a database.

### Four things that are easy to break

1. **The package is ESM** (`"type": "module"` in `package.json`). Payload's CLI
   fails with `ERR_REQUIRE_ASYNC_MODULE` without it. Any new plain-CommonJS file
   must be named `.cjs` (see `scripts/generate-favicon.cjs`).

2. **There are TWO root layouts, and there must be no `src/app/layout.tsx`.**
   `(site)/layout.tsx` renders the public site; `(payload)/layout.tsx` renders the
   CMS. Re-adding a root layout puts Payload's `<html>` inside the site's `<html>`,
   which blanks the admin with a hydration error.

3. **Payload's REST API is at `/cms-api`, not the default `/api`** — the default
   catch-all would swallow this app's own `/api/admin/*` route handlers.

4. **Versions are pinned deliberately.** `@payloadcms/next@3.88.0` requires
   `next >= 16.2.6`, and this app is on exactly 16.2.6. Upgrade Next, React and
   Payload together, never one alone.

### Working with the CMS

```bash
npm run dev                  # CMS at /admin, site at /
npm run generate:types       # regenerate src/payload-types.ts after schema edits
npm run generate:importmap   # re-run after adding custom admin components
```

Collections live in `src/collections/`, config in `src/payload.config.ts`.
Uploads land in `public/uploads`. Pre-existing assets under `public/documents`
and `public/images` keep their paths and are **not** managed by the media library.

### Backups — required, not optional

Atlas **shared tiers (M0/M2/M5) get no automated snapshots**. Before the CMS, all
content was versioned in git and recoverable forever; afterwards,
`scripts/backup-mongo.sh` is the safety net. It is installed on the EC2 box
(`mongodump` via `mongodb-database-tools`) and should run nightly from cron:

```
30 2 * * * /home/ubuntu/shahzoor/hprc.in/scripts/backup-mongo.sh >> /var/log/hprc-mongo-backup.log 2>&1
```

Set `BACKUP_S3_URI` so copies leave the box — a backup stored beside the app is
not a backup. Restore-test it before relying on it.

## 🔐 Registrations dashboard (`/admin/registrations`)

A protected, read-only dashboard to review registrations for the open events
(National Qualifier 2026 and the 2nd Equestrian Challenge — August). Data is
served by thin PHP JSON endpoints under `payment/api/admin/` that read the
existing MySQL tables and uploaded documents. The Next.js server calls PHP
server-to-server with a shared token, so the browser never sees the secret and
the DB/uploads stay behind PHP. **That data path is unchanged by the CMS.**

What did change:

- It moved from `/admin` to `/admin/registrations`, because Payload now owns
  `/admin`. It lives in its own route group, `src/app/(manage)/`, with its own
  root layout — that is why it still uses the site's Tailwind styling rather
  than Payload's admin CSS. Next resolves its static segments ahead of Payload's
  `[[...segments]]` catch-all, so the two coexist. A link into it appears in the
  Payload sidebar (`admin.components.afterNavLinks`).
- Login is now Payload's. Sign in once at `/admin` and the dashboard is
  authenticated too — `src/lib/cms-auth.ts` reads the Payload session.
- The CSV export and document proxies moved to `/api/admin/export` and
  `/api/admin/document` (out of `/admin`, which is Payload's) and return 401
  without a Payload session.

**Retired with it:** `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `admin-users.json`,
`scripts/add-admin-user.mjs`, `src/lib/admin-{auth,session}.ts`,
`src/middleware.ts` and the `/api/admin/{login,logout}` routes. `ADMIN_API_TOKEN`
and `PAYMENT_API_BASE` are still required — they are the PHP hop.

## 📰 Migrated content

**Phase 1**

| Collection | Source it replaced | Count |
| --- | --- | --- |
| `news` | `content/events.ts` → `news[]`, plus the news index/homepage/events strips | 23 |
| `blog-posts` | the `blogPosts` array duplicated in `events/blogs/page.tsx` and `events/blogs/[slug]/page.tsx` | 3 |

**Phase 2** — the three gallery pages, 1,643 lines of hardcoded arrays

| Collection | Source it replaced | Count |
| --- | --- | --- |
| `gallery-categories` + `albums` | `events/photo-gallery/page.tsx` (856 lines) | 2 + 22 (256 photos) |
| `video-categories` + `videos` | `events/video-gallery/page.tsx` (552 lines) | 4 + 15 |
| `newsletters` | `events/newsletters/page.tsx` (235 lines) | 6 |

All three pages are interactive (lightbox, category tabs, PDF flipbook), so each
was split into a server `page.tsx` that fetches and a `*-client.tsx` that keeps
the state. The JSX is otherwise untouched.

One quirk preserved deliberately: **four videos are cross-listed** in the source
data — the same YouTube id appears under a different title in a second category
(`-N4h3tTNhKo` is both "…Championship 2025" in Polo and "…Championship Venue" in
Club & Facilities). Deduplicating on the video id would have emptied out the
Club & Facilities tab, so a video's identity is its id *and* its title.

### Fidelity notes

- **Dates.** The hand-written date strings were inconsistent (`2024`,
  `18 August, 2026`, `October 6, 2024`) and printed verbatim. Every original
  string is preserved in `dateLabel`; `publishedDate` carries a parsed date used
  only for ordering. Nothing on the page changed.
- **Order.** The old `news[]` array was hand-curated, not date-sorted (it had
  30 Jan before 31 Jan). Sorting by date alone would have changed the lead story,
  so a `featured` checkbox pins it. Same for the blog index.

**Images.** Every image field accepts either an upload or a legacy `/public`
path (`src/fields/image.ts`). The ~323 MB of existing assets keep their paths and
are not re-uploaded; renderers prefer an upload and fall back to the path.

The 19 hand-built pages under `events/news/*` are **still served from code** —
they are static routes and Next resolves them ahead of the new
`events/news/[slug]` CMS route. That route serves brand-new articles written in
the CMS today, and each old page can be deleted individually as its body is
migrated, with no big-bang cutover. Three of them
(`nq-2026-results`, `ec-aug-2026-results`, `ec2026-results-*`) are really results
pages driven by `content/results-*.ts` and belong to phase 3, not news.

### Publishing invalidates the cache

`src/hooks/revalidate.ts` calls `revalidatePath` after a save. Note that
`revalidatePath` throws outside a Next request context (seed scripts, cron,
`payload run`), so every call is wrapped — a failed revalidation must never
abort an editor's save.

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in [Vercel](https://vercel.com)
3. Configure environment variables if needed
4. Deploy!

### Other Platforms

The project can be deployed to any platform supporting Next.js:
- **Netlify** - Configure build command: `npm run build`
- **Railway** - Auto-detects Next.js
- **AWS Amplify** - Configure build settings
- **Docker** - Use the official Next.js Docker image

### Build for Production

```bash
npm run build
npm run start
```

## 🧪 Development Guidelines

### Code Style

- Use Prettier for code formatting (configured in `.prettierrc.json`)
- Follow ESLint rules (configured in `eslint.config.mjs`)
- Use TypeScript for all new files
- Follow the existing component structure

### Adding New Pages

1. Create a new page file in `src/app/(site)/your-page/page.tsx`
2. Use existing components from `src/components/`
3. Add content to appropriate file in `src/content/`
4. Update navigation in `src/content/navigation.ts` if needed

### Adding New Components

1. Create component in appropriate directory under `src/components/`
2. Use TypeScript with proper types
3. Follow existing component patterns
4. Export from component file

### Image Optimization

- Use Next.js `Image` component for all images
- Add remote image domains to `next.config.ts` if needed
- Use appropriate `sizes` prop for responsive images
- Set `priority` for above-fold images

## 🔒 Security

Security headers are configured in `next.config.ts`:
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin
- And more...

## 📝 Content Updates

To update content:
1. Edit the appropriate file in `src/content/`
2. Follow the existing structure and types
3. Test your changes locally
4. Build and deploy

## 🐛 Troubleshooting

### Build Errors

- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`

### Linting Errors

- Fix automatically: `npx prettier --write "src/**/*.{ts,tsx}"`
- Check specific file: `npm run lint`

### Port Already in Use

Change the port:
```bash
npm run dev -- -p 3001
```

## 📄 License

[Add your license here]

## 👥 Contributors

[Add contributor information here]

## 📞 Support

For questions or support:
- Email: info@hprc.co.in
- Website: https://www.hprc.in

---

Built with ❤️ for Hyderabad Polo & Riding Club
