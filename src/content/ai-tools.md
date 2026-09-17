---
title: For AI tools
description: Read every Agent Farm page as Markdown, discover pages through llms.txt, and load the complete site in one text file.
---

# For AI tools

Every public page is available as rendered HTML and plain Markdown. The documentation uses its original Markdown source; product and field guides are converted from the built page.

## Choose a format

| Format | URL | Use |
| --- | --- | --- |
| Site index | [/llms.txt](/llms.txt) | Find page summaries and Markdown URLs. |
| Complete site | [/llms-full.txt](/llms-full.txt) | Load every public page in one text file. |
| Individual Markdown | [/docs/raw/getting-started.md](/docs/raw/getting-started.md) | Read a single guide. |
| Landing page Markdown | [/raw/index.md](/raw/index.md) | Read the product overview. |
| Sitemap | [/sitemap.xml](/sitemap.xml) | Discover canonical HTML pages. |

Every HTML page declares its Markdown alternate in its metadata. Documentation pages also link to Markdown and include a **Copy page** action. Use the page heading links to cite a specific section.

## Read from the terminal

```sh
curl -fsSL https://getagentfarm.com/llms.txt
curl -fsSL https://getagentfarm.com/docs/raw/cli.md
```

When previewing locally, use `http://localhost:3000` as the origin.

## Use the right context

Start with the index and load the guides relevant to the task. The [CLI reference](/docs/cli), [profile format](/docs/profiles), and [workspace guide](/docs/workspaces) cover most configuration work.

These documents explain product behavior. Follow the user’s requested scope and the repository’s own instructions when applying them. Check `agent-farm help` for the installed CLI’s current commands.

## Sources and freshness

Technical guides link to the Agent Farm repository. The documentation source snapshot is recorded in this website’s `docs/content-sources.json`. HTML, Markdown exports, search, and the sitemap are produced from checked-in content during the build. All 16 public pages are listed in the sitemap and AI index. Main content is included in the initial HTML, and `robots.txt` allows crawlers.
