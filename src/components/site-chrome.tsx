import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FarmMark } from "@/components/landing/artwork";
import { MobileNav } from "@/components/landing/interactions";
import { repository } from "@/lib/site";

export function SiteHeader({ home = false }: { home?: boolean }) {
  return (
    <header className="site-header container">
      <Link className="wordmark" href="/" aria-label="Agent Farm home">
        <FarmMark />
        Agent Farm
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/guide">Field guide</Link>
        <Link href="/docs">Docs</Link>
        <a href={repository}>
          GitHub <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <a
          href={home ? "#get-started" : "/#get-started"}
          className="button button-primary button-small"
        >
          Get started <ArrowRight size={17} aria-hidden="true" />
        </a>
      </nav>
      <MobileNav home={home} />
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <Link href="/" className="wordmark">
          <FarmMark />
          Agent Farm
        </Link>
        <p>
          Made with care by <a href="https://github.com/dcouple">dcouple</a>.
        </p>
        <nav aria-label="Footer navigation">
          <Link href="/guide">Field guide</Link>
          <Link href="/docs">Docs</Link>
          <Link href="/configuration">Configuration</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/resources">Resources</Link>
          <a href="/llms.txt">For AI tools</a>
        </nav>
      </div>
    </footer>
  );
}
