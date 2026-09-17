import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { load } from "cheerio";

const origin = "https://getagentfarm.com";
const contentDir = "src/content";
const files = readdirSync(contentDir).filter((file) => file.endsWith(".md"));
const meta = readFileSync(join(contentDir, "_meta.ts"), "utf8");
const pages = ["/", "/guide", "/configuration", "/compare", "/resources"];
const htmlPath = (path) =>
  path === "/" ? "out/index.html" : `out${path}.html`;

for (const file of files) {
  const slug = file.slice(0, -3);
  const { data, content } = matter(
    readFileSync(join(contentDir, file), "utf8"),
  );
  assert.ok(
    data.title && data.description,
    `${file}: title and description required`,
  );
  assert.equal(
    (content.match(/^# /gm) ?? []).length,
    1,
    `${file}: exactly one H1`,
  );
  assert.ok(meta.includes(slug), `${file}: missing from sidebar`);
  const path = slug === "index" ? "/docs" : `/docs/${slug}`;
  pages.push(path);
  const raw = readFileSync(`out/docs/raw/${file}`, "utf8");
  assert.ok(
    raw.includes(`# ${content.split(/^# /m)[1].split("\n")[0]}`),
    `${file}: exported heading`,
  );
  assert.ok(
    !raw.includes("---\ntitle:"),
    `${file}: strip frontmatter in Markdown export`,
  );
  assert.ok(
    readFileSync("out/llms.txt", "utf8").includes(`${origin}/docs/raw/${file}`),
    `${file}: missing from AI index`,
  );
  assert.ok(
    readFileSync("out/llms-full.txt", "utf8").includes(raw.trim()),
    `${file}: missing from full export`,
  );
}

const titles = new Set();
const descriptions = new Set();
const aiIndex = readFileSync("out/llms.txt", "utf8");
const aiFull = readFileSync("out/llms-full.txt", "utf8");
for (const path of pages) {
  const html = readFileSync(htmlPath(path), "utf8");
  const $ = load(html);
  const title = $("title").text();
  const description = $('meta[name="description"]').attr("content");
  assert.ok(title && !titles.has(title), `${path}: unique title required`);
  assert.ok(description && !descriptions.has(description), `${path}: unique description required`);
  titles.add(title);
  descriptions.add(description);
  for (const property of ["og:title", "og:description", "og:url", "og:image"]) {
    assert.ok($(`meta[property="${property}"]`).attr("content"), `${path}: ${property}`);
  }
  for (const name of ["twitter:title", "twitter:description", "twitter:card", "twitter:image"]) {
    assert.ok($(`meta[name="${name}"]`).attr("content"), `${path}: ${name}`);
  }
  assert.ok(!/noindex/i.test($('meta[name="robots"]').attr("content") ?? ""), `${path}: indexable`);
  const rawUrl = new URL($('link[rel="alternate"][type="text/markdown"]').attr("href"), origin);
  const rawContent = readFileSync(`out${rawUrl.pathname}`, "utf8");
  assert.ok(rawContent.includes("# "), `${path}: Markdown heading`);
  assert.ok(aiIndex.includes(rawUrl.href), `${path}: in AI index`);
  assert.ok(aiIndex.includes(`${origin}${path}`), `${path}: HTML URL in AI index`);
  assert.ok(aiFull.includes(rawContent.trim()), `${path}: in complete AI export`);
  assert.ok(!rawContent.includes("self.__next_f"), `${path}: Markdown excludes hydration scripts`);
  assert.equal(
    (html.match(/<h1[ >]/g) ?? []).length,
    1,
    `${path}: exactly one rendered H1`,
  );
  assert.ok(
    html.includes(
      `rel="canonical" href="${origin}${path === "/" ? "" : path}"`,
    ),
    `${path}: canonical URL`,
  );
  assert.ok(html.includes('name="description"'), `${path}: description`);
  assert.ok(
    readFileSync("out/sitemap.xml", "utf8").includes(`${origin}${path}</loc>`),
    `${path}: sitemap`,
  );
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    const url = new URL(href.replaceAll("&amp;", "&"), origin + path);
    if (url.origin !== origin) continue;
    const target = htmlPath(url.pathname);
    const targetFile = existsSync(target)
      ? target
      : join("out", decodeURIComponent(url.pathname));
    assert.ok(existsSync(targetFile), `${path}: broken link ${href}`);
    if (url.hash && targetFile.endsWith(".html")) {
      assert.ok(
        readFileSync(targetFile, "utf8").includes(
          `id="${decodeURIComponent(url.hash.slice(1))}"`,
        ),
        `${path}: missing anchor ${href}`,
      );
    }
  }
}
assert.equal(load(readFileSync("out/sitemap.xml", "utf8"), { xml: true })("url").length, pages.length, "Sitemap covers every public page");
assert.match(readFileSync("out/robots.txt", "utf8"), /User-Agent: \*[\s\S]*Allow: \//i);
assert.ok(readFileSync("out/robots.txt", "utf8").includes(`${origin}/sitemap.xml`));
assert.ok(
  existsSync("out/_pagefind/pagefind.js"),
  "Production search index missing",
);
assert.ok(
  existsSync("public/_pagefind/pagefind.js"),
  "Development search index missing",
);
console.log(
  `Verified ${files.length} documentation sources, ${pages.length} HTML pages, internal links, metadata, AI exports, sitemap, and search assets.`,
);
