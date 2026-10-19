// Seeds the II Telangana State Equestrian Championship (TSEC) 2026 results into the CMS.
//
// Run with:  npx payload run ./scripts/seed-tsec2026-results.ts
//
// Idempotent: the result set and each class are matched by slug and updated in
// place, so re-running after a correction replaces the class rather than duplicating it.
// Placings are as published by the Ground Jury (press note, 18 Oct 2026).
import config from "@payload-config";
import { getPayload } from "payload";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function withRetry<T>(label: string, fn: () => Promise<T>, attempts = 6): Promise<T> {
  let lastErr: unknown;
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const msg = err instanceof Error ? err.message : String(err);
      const transient =
        /space quota|catalog changes|WriteConflict|TransientTransactionError|MaxTimeMSExpired|connection|timed out/i.test(
          msg,
        );
      if (!transient || i === attempts) break;
      const wait = 400 * 2 ** (i - 1);
      console.log(`    … ${label}: transient Atlas error, retry ${i}/${attempts - 1} in ${wait}ms`);
      await sleep(wait);
    }
  }
  throw lastErr;
}

type Entry = {
  pos: string;
  rider: string;
  horse: string;
  club?: string;
  score?: string;
  prize?: string;
  photoPath?: string;
};

const CLASSES: {
  title: string;
  slug: string;
  discipline: string;
  category: string;
  metric: "score" | "penalties" | "none";
  displayOrder: number;
  entries: Entry[];
}[] = [
  {
    "title": "Dressage — Children I",
    "slug": "dressage-children-i",
    "discipline": "Dressage",
    "category": "Children I",
    "metric": "score",
    "displayOrder": 1,
    "entries": [
      {
        "pos": "1st",
        "rider": "Siddharth Dutta",
        "horse": "Wilbur",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/siddharth-dutta.jpg",
        "score": "0.60658"
      },
      {
        "pos": "2nd",
        "rider": "Siddharth Dutta",
        "horse": "Burning Arrow",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/siddharth-dutta.jpg",
        "score": "0.59632"
      },
      {
        "pos": "3rd",
        "rider": "Janampally Hitesh Reddy",
        "horse": "Centaur",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/janampally-hitesh-reddy.jpg",
        "score": "0.54342"
      },
      {
        "pos": "Highly Recommended",
        "rider": "Yuvraj Rohit Gupta",
        "horse": "Sky",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/yuvraj-rohit-gupta.jpg",
        "score": "0.48289"
      }
    ]
  },
  {
    "title": "Dressage — Junior",
    "slug": "dressage-junior",
    "discipline": "Dressage",
    "category": "Junior",
    "metric": "score",
    "displayOrder": 2,
    "entries": [
      {
        "pos": "1st",
        "rider": "Gautam Sanjay Sujanaani",
        "horse": "Airstrike",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/gautam-sanjay-sujanaani.jpg",
        "score": "0.602"
      },
      {
        "pos": "2nd",
        "rider": "Anet Castilino",
        "horse": "Bella",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/anet-castilino.jpg",
        "score": "0.591"
      },
      {
        "pos": "3rd",
        "rider": "Kumbham Sai Tanvi Reddy",
        "horse": "Centaur",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/kumbham-sai-tanvi-reddy.jpg",
        "score": "0.508"
      },
      {
        "pos": "Highly Recommended",
        "rider": "Kumbham Sai Tanvi Reddy",
        "horse": "Bangie de Prissey",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/kumbham-sai-tanvi-reddy.jpg",
        "score": "0.469"
      }
    ]
  },
  {
    "title": "Show Jumping — 100–105 cm, Under 18",
    "slug": "show-jumping-100-105-cm-under-18",
    "discipline": "Show Jumping",
    "category": "100–105 cm Under 18",
    "metric": "none",
    "displayOrder": 3,
    "entries": [
      {
        "pos": "1st",
        "rider": "Sauryaram Indukuri",
        "horse": "Happyness",
        "club": "Archi Horse Riding Academy",
        "photoPath": "/images/results/tsec-2026/sauryaram-indukuri.jpg"
      },
      {
        "pos": "2nd",
        "rider": "Eeshaan Bharadwaj",
        "horse": "Salerno",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/eeshaan-bharadwaj.jpg"
      },
      {
        "pos": "3rd",
        "rider": "Prabhnoor Singh",
        "horse": "Monet Carlos",
        "club": "The Hyderabad Equestrian Centre",
        "photoPath": "/images/results/tsec-2026/prabhnoor-singh.jpg"
      },
      {
        "pos": "Highly Recommended",
        "rider": "Aarnav Reddy",
        "horse": "Valensky VDL",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/aarnav-reddy.jpg"
      }
    ]
  },
  {
    "title": "Show Jumping — 100–105 cm, Open",
    "slug": "show-jumping-100-105-cm-open",
    "discipline": "Show Jumping",
    "category": "100–105 cm Open",
    "metric": "none",
    "displayOrder": 4,
    "entries": [
      {
        "pos": "1st",
        "rider": "Abdul Manan",
        "horse": "Dilano",
        "club": "Royal Caballo Club",
        "photoPath": "/images/results/tsec-2026/abdul-manan.jpg",
        "prize": "₹15,000"
      },
      {
        "pos": "Joint 2nd",
        "rider": "Eeshaan Bharadwaj",
        "horse": "Salerno",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/eeshaan-bharadwaj.jpg",
        "prize": "₹7,500"
      },
      {
        "pos": "Joint 2nd",
        "rider": "Sanjay Rama Raju",
        "horse": "Condero",
        "club": "Archi Horse Riding Academy",
        "photoPath": "/images/results/tsec-2026/sanjay-rama-raju.jpg",
        "prize": "₹7,500"
      },
      {
        "pos": "Joint 2nd",
        "rider": "S Mahesh",
        "horse": "Handsome Boy",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/s-mahesh.jpg",
        "prize": "₹7,500"
      },
      {
        "pos": "Joint 2nd",
        "rider": "Sanjay Rama Raju",
        "horse": "Cornelius",
        "club": "Archi Horse Riding Academy",
        "photoPath": "/images/results/tsec-2026/sanjay-rama-raju.jpg",
        "prize": "₹7,500"
      }
    ]
  },
  {
    "title": "Show Jumping — 40 cm, Under 12",
    "slug": "show-jumping-40-cm-under-12",
    "discipline": "Show Jumping",
    "category": "40 cm Under 12",
    "metric": "none",
    "displayOrder": 5,
    "entries": [
      {
        "pos": "1st",
        "rider": "Naag Hridhaan Mulugu",
        "horse": "King",
        "club": "Archi Horse Riding Academy",
        "photoPath": "/images/results/tsec-2026/naag-hridhaan-mulugu.jpg"
      },
      {
        "pos": "2nd",
        "rider": "Luv Manne",
        "horse": "Duke",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/luv-manne.jpg"
      },
      {
        "pos": "3rd",
        "rider": "Aanya Rathi",
        "horse": "Mitchell Pride",
        "club": "the ASHWA collective",
        "photoPath": "/images/results/tsec-2026/aanya-rathi.jpg"
      },
      {
        "pos": "Highly Recommended",
        "rider": "Khaja Kashifuddin",
        "horse": "Star",
        "club": "Horse Riding Stars Academy",
        "photoPath": "/images/results/tsec-2026/khaja-kashifuddin.jpg"
      },
      {
        "pos": "Highly Recommended",
        "rider": "Kori Vivaan",
        "horse": "My Star",
        "club": "Archi horse riding academy",
        "photoPath": "/images/results/tsec-2026/kori-vivaan.jpg"
      }
    ]
  },
  {
    "title": "Show Jumping — 40 cm, Open",
    "slug": "show-jumping-40-cm-open",
    "discipline": "Show Jumping",
    "category": "40 cm Open",
    "metric": "none",
    "displayOrder": 6,
    "entries": [
      {
        "pos": "1st",
        "rider": "Jagadeesh Archi",
        "horse": "Power",
        "club": "Archi horse riding academy",
        "photoPath": "/images/results/tsec-2026/jagadeesh-archi.jpg"
      },
      {
        "pos": "2nd",
        "rider": "K Thirumal",
        "horse": "Good Luck",
        "club": "2 Andhra R &V Regt NCC,Tirupati",
        "photoPath": "/images/results/tsec-2026/k-thirumal.jpg"
      },
      {
        "pos": "3rd",
        "rider": "N Pundarikaksha",
        "horse": "Glory",
        "club": "2(A) R&V Regt Ncc Tirupati",
        "photoPath": "/images/results/tsec-2026/n-pundarikaksha.jpg"
      },
      {
        "pos": "Highly Recommended",
        "rider": "L Samara Reddy",
        "horse": "Veeru",
        "club": "Horse Riding Stars Academy",
        "photoPath": "/images/results/tsec-2026/l-samara-reddy.jpg"
      }
    ]
  },
  {
    "title": "Hacks — Under 12",
    "slug": "hacks-under-12",
    "discipline": "Hacks",
    "category": "Under 12",
    "metric": "none",
    "displayOrder": 7,
    "entries": [
      {
        "pos": "1st",
        "rider": "Catherine",
        "horse": "Prithvi",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/catherine.jpg"
      },
      {
        "pos": "2nd",
        "rider": "Rianshi Agarwal",
        "horse": "Dazzle",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/rianshi-agarwal.jpg"
      },
      {
        "pos": "3rd",
        "rider": "Vir Reddy",
        "horse": "Trustful",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/vir-reddy.jpg"
      },
      {
        "pos": "3rd",
        "rider": "Akira Manne",
        "horse": "Baretta",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/akira-manne.jpg"
      },
      {
        "pos": "Highly Recommended",
        "rider": "Svadha Reddy",
        "horse": "Azeera",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/svadha-reddy.jpg"
      },
      {
        "pos": "Highly Recommended",
        "rider": "Naga Sai Shlok",
        "horse": "Tango",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/naga-sai-shlok.jpg"
      }
    ]
  },
  {
    "title": "Dressage — Children II",
    "slug": "dressage-children-ii",
    "discipline": "Dressage",
    "category": "Children II",
    "metric": "none",
    "displayOrder": 8,
    "entries": [
      {
        "pos": "1st",
        "rider": "Dhruva Potineni",
        "horse": "Grace",
        "club": "The ASHWA collective",
        "photoPath": "/images/results/tsec-2026/dhruva-potineni.jpg"
      },
      {
        "pos": "2nd",
        "rider": "Ananya Gupta",
        "horse": "Achilles",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/ananya-gupta.jpg"
      },
      {
        "pos": "3rd",
        "rider": "Ananya Gupta",
        "horse": "Sky",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/ananya-gupta.jpg"
      },
      {
        "pos": "Highly Recommended",
        "rider": "Anjali",
        "horse": "Vikram",
        "club": "The ASHWA collective",
        "photoPath": "/images/results/tsec-2026/anjali.jpg"
      }
    ]
  },
  {
    "title": "Show Jumping — 60 cm, Under 12",
    "slug": "show-jumping-60-cm-under-12",
    "discipline": "Show Jumping",
    "category": "60 cm Under 12",
    "metric": "none",
    "displayOrder": 9,
    "entries": [
      {
        "pos": "1st",
        "rider": "Dhruva Potineni",
        "horse": "Sin",
        "club": "The ASHWA collective",
        "photoPath": "/images/results/tsec-2026/dhruva-potineni.jpg"
      },
      {
        "pos": "2nd",
        "rider": "Kori Vivaan",
        "horse": "My Star",
        "club": "Archi horse riding academy",
        "photoPath": "/images/results/tsec-2026/kori-vivaan.jpg"
      },
      {
        "pos": "3rd",
        "rider": "Naag Hridhaan Mulugu",
        "horse": "King",
        "club": "Archi Horse Riding Academy",
        "photoPath": "/images/results/tsec-2026/naag-hridhaan-mulugu.jpg"
      },
      {
        "pos": "Highly Recommended",
        "rider": "Anjali",
        "horse": "Ican",
        "club": "The ASHWA collective",
        "photoPath": "/images/results/tsec-2026/anjali.jpg"
      }
    ]
  },
  {
    "title": "Show Jumping — 60 cm, Open",
    "slug": "show-jumping-60-cm-open",
    "discipline": "Show Jumping",
    "category": "60 cm Open",
    "metric": "none",
    "displayOrder": 10,
    "entries": [
      {
        "pos": "1st",
        "rider": "L Samara Reddy",
        "horse": "Veeru",
        "club": "Horse Riding Stars Academy",
        "photoPath": "/images/results/tsec-2026/l-samara-reddy.jpg"
      },
      {
        "pos": "2nd",
        "rider": "Nalli Raju",
        "horse": "Tara",
        "club": "3(A) R&V Regt Ncc Gannavaram",
        "photoPath": "/images/results/tsec-2026/nalli-raju.jpg"
      },
      {
        "pos": "3rd",
        "rider": "Sauryaram Indukuri",
        "horse": "Peter Bolt",
        "club": "Archi Horse Riding Academy",
        "photoPath": "/images/results/tsec-2026/sauryaram-indukuri.jpg"
      },
      {
        "pos": "Highly Recommended",
        "rider": "Prem Madhav Bali",
        "horse": "Carnival Lady",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/prem-madhav-bali.jpg"
      }
    ]
  },
  {
    "title": "Show Jumping — 80–90 cm, Under 12",
    "slug": "show-jumping-80-90-cm-under-12",
    "discipline": "Show Jumping",
    "category": "80–90 cm Under 12",
    "metric": "none",
    "displayOrder": 11,
    "entries": [
      {
        "pos": "1st",
        "rider": "Kori Vivaan",
        "horse": "Cornelius",
        "club": "Archi horse riding academy",
        "photoPath": "/images/results/tsec-2026/kori-vivaan.jpg"
      },
      {
        "pos": "2nd",
        "rider": "Ananya Gupta",
        "horse": "Achilles",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/ananya-gupta.jpg"
      },
      {
        "pos": "3rd",
        "rider": "Ananya Gupta",
        "horse": "Brave Indian",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/ananya-gupta.jpg"
      },
      {
        "pos": "Highly Recommended",
        "rider": "Khaja Kashifuddin",
        "horse": "Veeru",
        "club": "Horse Riding Stars Academy",
        "photoPath": "/images/results/tsec-2026/khaja-kashifuddin.jpg"
      }
    ]
  },
  {
    "title": "Show Jumping — 80–90 cm, Under 14",
    "slug": "show-jumping-80-90-cm-under-14",
    "discipline": "Show Jumping",
    "category": "80–90 cm Under 14",
    "metric": "none",
    "displayOrder": 12,
    "entries": [
      {
        "pos": "1st",
        "rider": "Sauryaram Indukuri",
        "horse": "Happyness",
        "club": "Archi Horse Riding Academy",
        "photoPath": "/images/results/tsec-2026/sauryaram-indukuri.jpg"
      },
      {
        "pos": "2nd",
        "rider": "Yuvraj Rohit Gupta",
        "horse": "Brave Indian",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/yuvraj-rohit-gupta.jpg"
      },
      {
        "pos": "3rd",
        "rider": "Yuvraj Rohit Gupta",
        "horse": "Achilles",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/yuvraj-rohit-gupta.jpg"
      },
      {
        "pos": "Highly Recommended",
        "rider": "Bathula Shouryan",
        "horse": "Perfect Hella",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/bathula-shouryan.jpg"
      }
    ]
  },
  {
    "title": "Show Jumping — 80–90 cm, Open",
    "slug": "show-jumping-80-90-cm-open",
    "discipline": "Show Jumping",
    "category": "80–90 cm Open",
    "metric": "none",
    "displayOrder": 13,
    "entries": [
      {
        "pos": "1st",
        "rider": "Aarnav Reddy",
        "horse": "Dilano",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/aarnav-reddy.jpg",
        "prize": "₹15,000"
      },
      {
        "pos": "2nd",
        "rider": "Venkat Nadh",
        "horse": "Tyson",
        "club": "The ASHWA collective",
        "photoPath": "/images/results/tsec-2026/venkat-nadh.jpg",
        "prize": "₹7,500"
      },
      {
        "pos": "3rd",
        "rider": "Bhanu Vathula",
        "horse": "Roxie",
        "club": "The ASHWA collective",
        "photoPath": "/images/results/tsec-2026/bhanu-vathula.jpg",
        "prize": "₹5,000"
      },
      {
        "pos": "Highly Recommended",
        "rider": "Hussain Zaid",
        "horse": "Star",
        "club": "Horse Riding Stars Academy",
        "photoPath": "/images/results/tsec-2026/hussain-zaid.jpg",
        "prize": "₹2,500"
      }
    ]
  },
  {
    "title": "Show Jumping — 110–115 cm, Open (Championship class)",
    "slug": "show-jumping-110-115-cm-open-championship-class",
    "discipline": "Show Jumping",
    "category": "110–115 cm Open",
    "metric": "none",
    "displayOrder": 14,
    "entries": [
      {
        "pos": "1st",
        "rider": "Pothuraju Sridhar",
        "horse": "Dilano",
        "club": "Individual",
        "photoPath": "/images/results/tsec-2026/pothuraju-sridhar.jpg",
        "prize": "₹20,000"
      },
      {
        "pos": "2nd",
        "rider": "Sauryaram Indukuri",
        "horse": "Happyness",
        "club": "Archi Horse Riding Academy",
        "photoPath": "/images/results/tsec-2026/sauryaram-indukuri.jpg",
        "prize": "₹10,000"
      },
      {
        "pos": "3rd",
        "rider": "Mohammed Amaan Ali",
        "horse": "Flying Champ",
        "club": "The ASHWA collective",
        "photoPath": "/images/results/tsec-2026/mohammed-amaan-ali.jpg",
        "prize": "₹7,500"
      },
      {
        "pos": "Highly Recommended",
        "rider": "Jaiveer Varma",
        "horse": "Valensky VDL",
        "club": "HPRC",
        "photoPath": "/images/results/tsec-2026/jaiveer-varma.jpg",
        "prize": "₹5,000"
      }
    ]
  }
];

const run = async () => {
  const payload = await getPayload({ config });

  const setData = {
    title: "II Telangana State Equestrian Championship 2026",
    slug: "tsec-2026",
    eventDate: "17–18 October 2026 · Gandipet, Moinabad",
    showPhotos: true,
  };

  const existingSet = await withRetry("set", () =>
    payload.find({ collection: "result-sets", where: { slug: { equals: setData.slug } }, limit: 1, depth: 0 }),
  );
  const set = existingSet.docs[0]
    ? await withRetry("set", () =>
        payload.update({ collection: "result-sets", id: existingSet.docs[0].id, data: setData }),
      )
    : await withRetry("set", () => payload.create({ collection: "result-sets", data: setData }));
  console.log(`${existingSet.docs[0] ? "~ updated" : "+ created"}  result set ${setData.slug}`);

  for (const cls of CLASSES) {
    const data = { ...cls, resultSet: set.id };
    const existing = await withRetry(cls.slug, () =>
      payload.find({
        collection: "result-classes",
        where: { and: [{ slug: { equals: cls.slug } }, { resultSet: { equals: set.id } }] },
        limit: 1,
        depth: 0,
      }),
    );
    if (existing.docs[0]) {
      await withRetry(cls.slug, () =>
        payload.update({ collection: "result-classes", id: existing.docs[0].id, data }),
      );
      console.log(`~ updated  ${cls.title}`);
    } else {
      await withRetry(cls.slug, () => payload.create({ collection: "result-classes", data }));
      console.log(`+ created  ${cls.title}`);
    }
  }

  console.log("Done.");
  process.exit(0);
};

await run();
