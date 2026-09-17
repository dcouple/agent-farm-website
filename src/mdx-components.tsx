import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import { useMDXComponents as getThemeComponents } from "nextra-theme-docs";

const components = getThemeComponents();
const ThemeLink = components.a;

function DocsLink({ href, ...props }: ComponentProps<"a">) {
  if (href?.startsWith("/docs/raw/") || href?.startsWith("/raw/")) {
    // Nextra strips .md from Markdown links. Downloads retain the file extension.
    const rawHref = href.replace(/^(\/(?:docs\/)?raw\/[^?#]+)(.*)$/, (_, path, suffix) =>
      `${path.endsWith(".md") ? path : `${path}.md`}${suffix}`,
    );
    return <a {...props} href={rawHref} className="docs-download-link" />;
  }
  if (href === "/llms.txt" || href === "/llms-full.txt" || href === "/sitemap.xml") {
    return <a {...props} href={href} className="docs-download-link" />;
  }
  return <ThemeLink {...props} href={href} />;
}

export function useMDXComponents(overrides: MDXComponents = {}) {
  return { ...components, a: DocsLink, ...overrides };
}
