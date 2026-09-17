import { getDocs } from "@/lib/docs";
import type { MetadataRoute } from "next";
import { sitePages, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...sitePages, ...getDocs().map((doc) => doc.path)].map((path) => ({
    url: new URL(path, siteUrl).href,
  }));
}
