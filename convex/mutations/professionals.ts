import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const upsert = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    phone: v.optional(v.string()),
    photo: v.optional(v.string()),
    gender: v.optional(v.string()),
    services: v.array(v.string()),
    city: v.string(),
    quartier: v.optional(v.string()),
    lat: v.optional(v.number()),
    lng: v.optional(v.number()),
    scoreMaison: v.number(),
    scoreDetails: v.object({
      completude: v.number(),
      joignabilite: v.number(),
      multiPlateforme: v.number(),
      experience: v.number(),
    }),
    sources: v.array(
      v.object({
        platform: v.string(),
        externalId: v.string(),
        scrapedAt: v.string(),
      })
    ),
    experience: v.optional(v.number()),
    mediaCount: v.optional(v.number()),
    description: v.optional(v.string()),
    verified: v.optional(v.boolean()),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if pro already exists by matching source platform+externalId
    for (const source of args.sources) {
      const existing = await ctx.db
        .query("professionals")
        .filter((q) =>
          q.eq(q.field("firstName"), args.firstName)
        )
        .collect();

      const match = existing.find((p) =>
        p.sources.some(
          (s) =>
            s.platform === source.platform &&
            s.externalId === source.externalId
        )
      );

      if (match) {
        await ctx.db.patch(match._id, args);
        return match._id;
      }
    }

    return await ctx.db.insert("professionals", args);
  },
});
