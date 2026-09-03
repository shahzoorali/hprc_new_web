import { MetadataRoute } from "next";

import { getBlogSlugs } from "@/lib/blogs";
import { getFacilitySlugs, getProgrammeSlugs } from "@/lib/facilities";
import { getNewsArticles } from "@/lib/news";

const BASE = "https://www.hprc.in";
const NOW = new Date();

// Helper: create a sitemap entry
const url = (
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  lastModified?: Date
): MetadataRoute.Sitemap[number] => ({
  url: `${BASE}${path}`,
  lastModified: lastModified ?? NOW,
  changeFrequency,
  priority,
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Blogs, programmes and facilities now live in the CMS, so their slugs come
  // from there rather than a hand-kept list that silently goes stale whenever
  // someone publishes or renames one.
  const [blogSlugs, programmeIds, facilityIds, news] = await Promise.all([
    getBlogSlugs(),
    getProgrammeSlugs(),
    getFacilitySlugs(),
    getNewsArticles(200),
  ]);

  // Only articles hosted on this site — press mentions link out.
  const newsPaths = news
    .map((a) => a.url)
    .filter((u) => u.startsWith("/events/news/"));

  return [
    // ── Core ──────────────────────────────────────────────────────────────────
    url("/",                        1.0,  "weekly"),
    url("/about",                   0.9,  "monthly"),
    url("/about/heritage",          0.8,  "monthly"),
    url("/about/leadership",        0.8,  "monthly"),
    url("/about/mission-vision-values", 0.8, "monthly"),
    url("/contact",                 0.8,  "monthly"),
    url("/privacy",                 0.3,  "yearly"),
    url("/terms",                   0.3,  "yearly"),

    // ── Membership ────────────────────────────────────────────────────────────
    url("/membership",              0.9,  "monthly"),
    url("/membership/apply",        0.9,  "monthly"),
    url("/membership/brochure",     0.7,  "monthly"),

    // ── Hospitality ───────────────────────────────────────────────────────────
    url("/hospitality",             0.9,  "monthly"),
    url("/hospitality/banquets",    0.8,  "monthly"),
    url("/hospitality/chukkers",    0.8,  "monthly"),
    url("/hospitality/luxury-rooms", 0.8, "monthly"),
    url("/hospitality/snaffles-bistro", 0.8, "monthly"),

    // ── Programmes ────────────────────────────────────────────────────────────
    url("/programmes",              0.9,  "monthly"),
    url("/programmes/beginners",    0.8,  "monthly"),
    ...programmeIds.map((id) => url(`/programmes/${id}`, 0.7, "monthly")),

    // ── News (from the CMS) ───────────────────────────────────────────────────
    ...newsPaths.map((path) => url(path, 0.6, "monthly")),

    // ── Sports Centre ─────────────────────────────────────────────────────────
    url("/sports-centre",           0.9,  "monthly"),
    ...facilityIds.map((id) => url(`/sports-centre/${id}`, 0.8, "monthly")),
    // Named routes that also have dedicated pages
    url("/sports-centre/tennis",    0.8,  "monthly"),
    url("/sports-centre/badminton", 0.8,  "monthly"),
    url("/sports-centre/squash",    0.8,  "monthly"),
    url("/sports-centre/swimming",  0.8,  "monthly"),
    url("/sports-centre/basketball",0.8,  "monthly"),
    url("/sports-centre/futsal",    0.8,  "monthly"),
    url("/sports-centre/gym",       0.8,  "monthly"),
    url("/sports-centre/sauna",     0.8,  "monthly"),

    // ── Events hub ────────────────────────────────────────────────────────────
    url("/events",                  0.9,  "weekly"),
    url("/events/upcoming",         0.9,  "weekly"),
    url("/events/past",             0.7,  "monthly"),
    url("/events/photo-gallery",    0.7,  "monthly"),
    url("/events/video-gallery",    0.7,  "monthly"),
    url("/events/newsletters",      0.6,  "monthly"),

    // ── Active events (high priority — people are registering) ────────────────
    url("/events/oct-nq-2026",      1.0,  "daily",   new Date("2026-09-03")),
    url("/events/nq-2026",          1.0,  "daily",   new Date("2026-06-23")),
    url("/events/2nd-equestrian-challenge-2026", 1.0, "daily", new Date("2026-06-23")),

    // ── Past / archived events ────────────────────────────────────────────────
    url("/events/equestrian-challenge-2026",           0.6, "monthly", new Date("2026-06-01")),
    url("/events/world-arena-polo-championship-2026",  0.7, "monthly", new Date("2026-06-01")),
    url("/events/hprc-international-arena-polo-championship", 0.6, "monthly"),
    url("/events/1st-rel-10th-hyd-horse-show",         0.5, "monthly"),
    url("/events/arena-polo-tournament-2016",           0.5, "yearly"),
    url("/events/nec-calendar-2016",                   0.4, "yearly"),
    url("/events/hprc-sport-complex",                  0.6, "monthly"),

    // ── News articles ─────────────────────────────────────────────────────────
    url("/events/news",             0.8,  "weekly"),
    url("/events/news/hyderabad-international-polo-cup-2026-india-wins-both-cups", 0.8, "monthly", new Date("2026-06-01")),
    url("/events/news/international-arena-polo-championship-2026-tshirt-unveiling", 0.7, "monthly", new Date("2026-06-01")),
    url("/events/news/ec-aug-2026-results",                     0.8, "monthly", new Date("2026-08-18")),
    url("/events/news/nq-2026-results",                          0.8, "monthly", new Date("2026-08-18")),
    url("/events/news/ec2026-results-16-may-evening-session",    0.7, "monthly", new Date("2026-05-17")),
    url("/events/news/ec2026-results-17-may-morning-session",    0.7, "monthly", new Date("2026-05-17")),
    url("/events/news/best-arena-polo-club-india-awards-2025",   0.7, "monthly"),
    url("/events/news/chaitania-kumar-arsalan-khan-international-stage", 0.6, "monthly"),
    url("/events/news/championship-weekend-4-goal-galloping-wheels", 0.6, "monthly"),
    url("/events/news/hprc-hawaii-match-2024",                   0.6, "monthly"),
    url("/events/news/hprc-academia-sports-village",             0.6, "monthly"),
    url("/events/news/academia-sports-village-certificate-distribution", 0.6, "monthly"),
    url("/events/news/hprc-partners-sports-village",             0.6, "monthly"),
    url("/events/news/hprc-silver-spur-sports-arena",            0.6, "monthly"),
    url("/events/news/tennis-camp-sports-village-hprc",          0.6, "monthly"),
    url("/events/news/all-about-olympic-equestrian-sports",      0.7, "monthly"),
    url("/events/news/national-equestrian-championship-2016-news", 0.5, "yearly"),
    url("/events/news/national-equestrian-championship-kicks-off", 0.5, "yearly"),
    url("/events/news/press-coverage-nec-2016",                  0.5, "yearly"),

    // ── Blogs ─────────────────────────────────────────────────────────────────
    url("/events/blogs",            0.7,  "monthly"),
    ...blogSlugs.map((slug) => url(`/events/blogs/${slug}`, 0.7, "monthly")),

    // ── Players / People ──────────────────────────────────────────────────────
    url("/players/arsalaan-khan",   0.7,  "monthly"),
  ];
}
