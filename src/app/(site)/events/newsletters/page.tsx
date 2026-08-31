import { getNewsletters } from "@/lib/galleries";

import { NewslettersClient } from "./newsletters-client";

// Server wrapper — the PDF flipbook viewer is client-only (it is dynamically
// imported with ssr:false because of its canvas dependency), so the page shell
// fetches and the client component renders.
export default async function NewslettersPage() {
  const newsletters = await getNewsletters();
  return <NewslettersClient newsletters={newsletters} />;
}
