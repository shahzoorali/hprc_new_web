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
│   ├── app/              # Next.js App Router pages
│   │   ├── (site)/       # Main site pages
│   │   │   ├── about/    # About section pages
│   │   │   ├── events/   # Events & Media pages
│   │   │   ├── membership/ # Membership pages
│   │   │   └── ...
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Global styles
│   ├── components/       # Reusable React components
│   │   ├── layout/       # Layout components (Header, Footer)
│   │   ├── navigation/   # Navigation components
│   │   └── ui/           # UI components (Hero, Cards, etc.)
│   ├── content/          # Content/data layer
│   └── config/           # Configuration files
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

Content is managed in TypeScript files under `src/content/`:
- `about.ts` - About section content
- `events.ts` - Events and media content
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
