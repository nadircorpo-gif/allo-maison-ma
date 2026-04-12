import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  professionals: defineTable({
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
  })
    .index("by_city", ["city"])
    .index("by_score", ["scoreMaison"])
    .index("by_status", ["status"])
    .index("by_city_status", ["city", "status"]),
});
