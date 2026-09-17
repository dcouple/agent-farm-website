# Field notes: content depth for issue #2

User intent: match the useful depth of runpane.com while preserving the compact,
illustrated landing page from #1. Put detailed content on pages reached through
the header and footer.

## Implemented

- `/guide`: ten linked capabilities, a four-step terminal-style walkthrough, and
  workspace before/after examples.
- `/configuration`: annotated planner Markdown/frontmatter, profile YAML,
  workspace setup and authentication, inspection, global skills, plugins, and
  headless execution. Examples distinguish profile identity from skill loading.
- `/compare`: positioning table for native configuration, Agent Farm, and
  Omnigent; launcher scope and a link to sibling project Pane.
- `/resources`: source, docs, skills, bundled agents, operations, verification,
  and Pane links.
- Shared header/footer; existing landing hero, artwork, overview, and installation
  section preserved. Companion-page styles live in their route-group layout.
- Per-page titles, descriptions, canonicals, Open Graph and Twitter metadata;
  homepage SoftwareApplication JSON-LD; sitemap and robots; build-time 1200×630
  PNG share image served with a `.png` extension for static-host compatibility.

The existing hosting docs establish `https://getagentfarm.com` as the canonical
origin. Firebase content-type headers serve the Markdown exports; domain settings remain unchanged.

## Content sources

Read September 16, 2026:

- https://github.com/dcouple/agent-farm/blob/main/README.md
- https://github.com/dcouple/agent-farm/blob/main/CONFIGURATION.md
- https://github.com/dcouple/agent-farm/blob/main/docs/operations.md
- https://github.com/dcouple/agent-farm/blob/main/src/commands.ts
- https://github.com/dcouple/agent-farm/blob/main/plugins/dcouple/agents/planner.md
- Older README positioning table at commit `5fa4b0bf1478b0a9e779bdc91490602a20f9aeb5`
- https://omnigent.ai/docs/interact/terminal
- https://runpane.com

Created an original writeup at `/docs/why-agent-farm`, linked from Resources.
Added 11 Nextra guides adapted from the GitHub source snapshot recorded in
`docs/content-sources.json`. Separate root layouts preserve the landing styles.
Search, code/page copying, themes, and mobile navigation are provided by Nextra.
Every public page has a Markdown alternate, and the build generates `/llms.txt`
and `/llms-full.txt` from the complete sitemap inventory.

## Verification

- ESLint and production static export (including TypeScript) passed.
- Parsed all five exported pages: one H1 each; unique description, canonical,
  Open Graph and Twitter tags; every internal route and fragment resolves.
- Parsed homepage JSON-LD and verified the PNG signature and 1200×630 dimensions.
- All five routes: no document overflow at 320px and 1394px. Additional tablet
  checks covered home, guide, configuration, and the comparison table at 768px.
- Visually inspected desktop guide, mobile configuration, comparison table,
  existing landing hero, and share image.
- Verified copy success feedback, mobile menu expansion, and Escape dismissal.
- Opened all five local pages in the user's browser. Changes remain local.

## Nextra and AI verification

- `pnpm lint`, `pnpm build`, and `pnpm docs:check` passed.
- All 16 public pages have unique titles/descriptions, canonical URLs, Open Graph
  and Twitter metadata, Markdown alternates, and entries in the sitemap and both
  AI exports. The checker validates every exported internal link and anchor.
- Search returned relevant workspace/MCP results and navigated to the guide.
- Copied page Markdown was verified through the browser clipboard. Code copy
  feedback, mobile navigation at 375px, light/dark themes, and returning to the
  preserved landing page were checked in the browser.
- Nextra's upstream layout validation issue requires scoped Zod 4.3.6 overrides;
  the reason and removal condition are documented in README.
