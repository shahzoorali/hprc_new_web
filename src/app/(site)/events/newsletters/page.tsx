import { getNewsletters } from "@/lib/galleries";

import { NewslettersClient } from "./newsletters-client";

// Server wrapper — fetches the archive and hands it to the client component,
// which owns the flipbook state.
export default async function NewslettersPage() {
  const newsletters = await getNewsletters();
  return <NewslettersClient newsletters={newsletters} />;
}
