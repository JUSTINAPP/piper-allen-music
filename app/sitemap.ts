import type { MetadataRoute } from "next";

const BASE_URL = "https://piperallenmusic.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date("2026-04-23"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/shows`,
      lastModified: new Date("2026-04-23"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/press-kit`,
      lastModified: new Date("2026-04-23"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/lyrics`,
      lastModified: new Date("2026-04-23"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date("2026-04-23"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
