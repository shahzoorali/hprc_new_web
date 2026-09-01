import type { Endpoint, PayloadRequest } from "payload";

// Slim index for the "Import results" class picker.
//
// The picker previously fetched /cms-api/result-classes?depth=1, which returns
// every entry of every class — 89 rider rows today just to populate a dropdown,
// and unbounded as more competitions are added. This returns one small object
// per class and counts the entries server-side instead.
export const resultClassIndexEndpoint: Endpoint = {
  path: "/result-class-index",
  method: "get",
  handler: async (req: PayloadRequest) => {
    if (!req.user) {
      return Response.json({ error: "Not authorised" }, { status: 401 });
    }

    const [classes, sets] = await Promise.all([
      req.payload.find({
        collection: "result-classes",
        sort: "displayOrder",
        limit: 500,
        depth: 0,
      }),
      req.payload.find({ collection: "result-sets", limit: 100, depth: 0 }),
    ]);

    const setTitles = new Map(sets.docs.map((s) => [String(s.id), s.title]));

    return Response.json({
      classes: classes.docs.map((c) => ({
        id: String(c.id),
        title: c.title,
        setTitle: setTitles.get(String(c.resultSet)) ?? "",
        entryCount: c.entries?.length ?? 0,
      })),
    });
  },
};
