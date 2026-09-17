![Agent Farm — pixel-art skill crops and native terminal huts](docs/assets/agent-farm-banner.png)

# Agent Farm website

The [Agent Farm](https://github.com/dcouple/agent-farm) landing page, field guides, and Nextra documentation. Next.js 16
exports the site to static files for Firebase Hosting.

## Develop

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm dev
```

Open http://localhost:3000 and http://localhost:3000/docs. Markdown edits reload
in development. The initial build creates the Pagefind search index and AI exports; run
`pnpm build` again to refresh search results and AI exports after content changes.

## Write documentation

1. Add a `.md` file under `src/content/` with `title` and `description` YAML
   frontmatter and one `#` heading.
2. Add the filename (without `.md`) to `src/content/_meta.ts` to order the sidebar.
3. Link to related guides with absolute site paths such as `/docs/workspaces`.
4. Cite the relevant Agent Farm source at the end of technical guides.
5. Run the checks below.

Use standard Markdown so one source serves the Nextra page, Copy page action,
individual Markdown download, `/llms.txt`, and `/llms-full.txt`. Code fences accept
languages and Nextra filename annotations. Follow the concise, affirmative voice
of the existing pages.

The GitHub snapshot used for the initial documentation is recorded in
[docs/content-sources.json](docs/content-sources.json). Refresh the content and
source snapshot together when product behavior changes. Builds use checked-in
content; publishing stays deterministic and independent of upstream availability.

## Verify

```sh
pnpm lint
pnpm build
pnpm docs:check
```

The build includes TypeScript checking, static export, and Pagefind indexing.
`docs:check` validates document metadata, headings, internal links and anchors,
Markdown and AI exports, the sitemap, and search assets. Browser QA should cover
search, page copying, theme switching, mobile navigation, and returning to the
landing page.

`pnpm docs:search` rebuilds the search index from the most recent `out/` export.
Generated indexes live in `out/_pagefind` and `public/_pagefind` (ignored by Git).
AI exports cover every sitemap page; each HTML page advertises its Markdown
alternate. Generated product Markdown lives in `out/raw` and `public/raw`.
The complete exports and product Markdown in `public/` are also ignored by Git.

## Structure

- `src/app/(marketing)/`: landing and field notes; their own root layout and CSS.
- `src/app/(documentation)/`: Nextra docs; a separate root layout keeps styles isolated.
- `src/content/`: documentation Markdown and navigation order.
- `src/lib/docs.ts`: shared content reader for the sitemap and Markdown exports.
- `src/app/docs/raw/`: static Markdown routes.
- `scripts/build-ai.mjs`: generates `/llms.txt`, `/llms-full.txt`, and product-page Markdown from the sitemap and built HTML.
- `scripts/build-search.mjs`: production and local search assets.
- `scripts/check-docs.mjs`: static export checks.

## Hosting

The production output is `out/`. See [deployment instructions](docs/deployment.md)
for the existing Firebase setup. `firebase.json` serves Markdown exports as
`text/markdown`. The configured canonical origin is https://getagentfarm.com.
GitHub Actions verifies pull requests and automatically deploys successful builds
from `main`, using short-lived Google credentials. It then checks the live site
against the build artifact.

## Dependency compatibility

Nextra 4.6.1 currently needs Zod 4.3.6 for its layout validation. The scoped
`pnpm-workspace.yaml` overrides track [upstream issue #4989](https://github.com/shuding/nextra/issues/4989).
Remove the pin when a compatible Nextra release is adopted and the build passes.
