import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
    ],
    sitemap: "https://allo-maison.ma/sitemap.xml",
  };
}
