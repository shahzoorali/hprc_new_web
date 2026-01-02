import { PageHero } from "@/components/ui/page-hero";
import { aboutContent } from "@/content/about";

export default function LeadershipPage() {
  return (
    <div className="space-y-16 pb-16">
      <div className="container pt-12">
        <PageHero
          eyebrow="Leadership"
          title="Stewards of Hyderabad Polo & Riding Club"
          description="A passionate executive team with global experience guides HPRC’s growth across sport, hospitality, and community initiatives."
          actions={[{ label: "Explore Our Heritage", href: "/about/heritage", variant: "outline" }]}
        />
      </div>

      <section className="container">
        <div className="grid gap-8 md:grid-cols-2">
          {aboutContent.leadership.map((leader) => (
            <div
              key={leader.name}
              className=" border border-brand-100 bg-white/95 p-8 shadow-[var(--shadow-elevated)]"
            >
              <h3 className="text-xl font-semibold text-brand-900">{leader.name}</h3>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-brand-600">
                {leader.role}
              </p>
              <p className="mt-4 text-sm text-gray-700">{leader.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
