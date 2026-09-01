import { getHospitality } from "@/lib/pages";

import { SnafflesBistroClient } from "./snaffles-bistro-client";

// Server wrapper. The venue page keeps client state for its image lightbox, and
// a client component cannot import @/lib/pages — that pulls payload.config, and
// with it revalidatePath, into the browser bundle.
export default async function Page() {
  const hospitalityContent = await getHospitality();
  return <SnafflesBistroClient hospitalityContent={hospitalityContent} />;
}
