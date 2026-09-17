import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import chapters from "@/content/_meta";
import { siteUrl } from "./site";

const directory = join(process.cwd(), "src/content");

export function getDocs() {
  const order = Object.keys(chapters);
  return readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.slice(0, -3);
      const { data, content } = matter(
        readFileSync(join(directory, file), "utf8"),
      );
      if (
        typeof data.title !== "string" ||
        typeof data.description !== "string"
      ) {
        throw new Error(`${file} needs title and description frontmatter.`);
      }
      return {
        slug,
        title: data.title,
        description: data.description,
        content,
        path: slug === "index" ? "/docs" : `/docs/${slug}`,
        rawPath: `/docs/raw/${slug}.md`,
      };
    })
    .sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
}

export function markdownDocument(doc: ReturnType<typeof getDocs>[number]) {
  // Absolute links keep downloaded Markdown useful outside the website.
  const content = doc.content.replace(
    /\]\(\/(?!\/)([^)]+)\)/g,
    `](${siteUrl}/$1)`,
  );
  return `<!-- Source: ${siteUrl}${doc.path} -->\n${content.trim()}\n`;
}
