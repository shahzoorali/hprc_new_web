# HPRC Website Information Architecture

Content extracted from `../hprc_content_master.md` has been organised into the following structure for the Next.js implementation.

## Primary Navigation

1. Home (`/`)
2. About
   - Club Overview
   - Mission, Vision & Values
   - Managing Committee
   - Heritage Timeline
3. Programmes
   - Start Riding
   - Beginners Programme
   - Intermediate Programme
   - Advanced Polo Programme
   - Equestrian Programme
   - Stick & Ball
   - Chukkers
   - Horse Riding Benefits (blog summary)
4. Sports Centre
   - Tennis
   - Badminton
   - Squash
   - Swimming Pool
   - Basketball
   - Futsal
   - Gym
   - Sauna
   - Upcoming Sports Events
   - Membership Packages (Gold / Platinum)
5. Hospitality
   - Chukkers Restaurant
   - Snaffles Bistro
   - Banquets & Events
   - Luxury Rooms
6. Membership
   - Apply for Membership
   - Member Services
7. Events & Media
   - Events Calendar
   - Past Events
   - Upcoming Events
   - Newsroom
   - Blogs
   - Newsletters
   - Photo Gallery
   - Video Gallery
   - TSEA Partnership Highlight
8. Contact (`/contact`)

## Page Templates

- **Hero + CTA**: Utilise for Home, About, Programmes overview.
- **Two-column content**: Mission/Vision/Values, Managing Committee biographies.
- **Card grids**: Sports Centre offerings, Hospitality venues, Events summaries.
- **Pricing tables**: Riding programmes, Membership packages, sports tariffs.
- **Timeline**: Polo heritage milestones from `who-we-are.html`.
- **Rich text sections**: Educational articles (e.g., Horse Riding Benefits).

## Shared Components

- Header with mega-menu shortcuts to Programmes, Sports Centre, Hospitality.
- Footer with contact info, quick links, social media.
- Announcement/CTA banner (surface membership application + pay now reminders).
- Reusable `SectionHeading`, `ContentBlock`, `PricingTable`, `Timeline`, `Testimonial` placeholders.

## Content Priorities

- **Home**: High-level value proposition, quick links to membership, programmes, events.
- **About**: Club story, mission/vision, leadership, heritage timeline.
- **Programmes**: Riding pathways, schedules, fees, certifications; highlight equestrian associations.
- **Sports Centre**: Facility descriptions, coaching availability, timings, tariff tables.
- **Hospitality**: Dining, events, accommodation with descriptive copy and booking CTAs.
- **Membership**: Application steps, member login info, key benefits.
- **Events & Media**: Recent news, upcoming/past events, galleries, newsletters/blog teasers.
- **Contact**: Address, map, phone/email, enquiry form placeholder.

## Metadata Checklist

- Each page: title, description, Open Graph image.
- Structured data: `Organization`, `SportsActivityLocation`, `Event` for major tournaments.
- Canonical URLs and sitemap entry once routes stabilise.
