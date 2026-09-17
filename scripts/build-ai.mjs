import assert from "node:assert/strict";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { load } from "cheerio";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

// The sitemap is the inventory: adding a public page also adds its AI exports.
const sitemap = load(await readFile("out/sitemap.xml", "utf8"), { xml: true });
const urls = sitemap("url > loc").map((_, el) => sitemap(el).text()).get();
const markdown = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });
markdown.use(gfm);
markdown.addRule("headings", {
  filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
  replacement: (content, node) =>
    `\n\n${"#".repeat(Number(node.nodeName.slice(1)))} ${content.replace(/\s+/g, " ").trim()}\n\n`,
});
markdown.addRule("codeBlocks", {
  filter: "pre",
  replacement: (_, node) => `\n\n\`\`\`\n${node.textContent.trim()}\n\`\`\`\n\n`,
});
const pages = [];
await rm("public/raw", { recursive: true, force: true });
await rm("out/raw", { recursive: true, force: true });

for (const url of urls) {
  const { pathname, origin } = new URL(url);
  const htmlFile = pathname === "/" ? "out/index.html" : `out${pathname}.html`;
  const $ = load(await readFile(htmlFile, "utf8"));
  const rawPath = $('link[rel="alternate"][type="text/markdown"]').attr("href");
  assert.ok(rawPath, `${pathname}: Markdown alternate required`);
  const rawUrl = new URL(rawPath, origin);
  let content;
  if (pathname === "/docs" || pathname.startsWith("/docs/")) {
    content = await readFile(`out${rawUrl.pathname}`, "utf8");
  } else {
    const main = $("main").clone();
    main.find('script, style, svg, button, nav, [aria-hidden="true"]').remove();
    // CSS can separate inline cards and labels visually; preserve those spaces in text.
    main.find("span, a, strong").before(" ").after(" ");
    main.find("caption").each((_, el) => {
      $(el).parent("table").before($("<p>").text($(el).text()));
      $(el).remove();
    });
    main.find("a[href], img[src]").each((_, el) => {
      const attr = el.tagName === "a" ? "href" : "src";
      $(el).attr(attr, new URL($(el).attr(attr), url).href);
    });
    content = `<!-- Source: ${url} -->\n\n${markdown.turndown(main.html()).trim()}\n`;
    for (const root of ["out", "public"]) {
      await mkdir(`${root}/raw`, { recursive: true });
      await writeFile(`${root}${rawUrl.pathname}`, content);
    }
  }
  pages.push({
    url, rawUrl: rawUrl.href, content,
    title: $("title").text(),
    description: $('meta[name="description"]').attr("content"),
    docs: pathname === "/docs" || pathname.startsWith("/docs/"),
  });
}

const origin = new URL(urls[0]).origin;
const index = [
  "# Agent Farm", "",
  "> Saved profiles, shared skills, and project connections for native Claude Code and Codex sessions.", "",
  ...[false, true].flatMap((docs) => [
    docs ? "## Documentation" : "## Product and field guides", "",
    ...pages.filter((page) => page.docs === docs).map((page) =>
      `- [${page.title}](${page.rawUrl}): ${page.description} HTML: ${page.url}`), "",
  ]),
  "## Complete site", "",
  `- [All pages in one file](${origin}/llms-full.txt): Complete Markdown content.`,
  `- [Sitemap](${origin}/sitemap.xml): Canonical HTML page inventory.`, "",
].join("\n");
const full = ["# Agent Farm — complete website", "", ...pages.map((page) => page.content.trim())].join("\n\n---\n\n") + "\n";
for (const root of ["out", "public"]) {
  await writeFile(`${root}/llms.txt`, index);
  await writeFile(`${root}/llms-full.txt`, full);
}
console.log(`Generated AI index and complete text for all ${pages.length} public pages.`);
