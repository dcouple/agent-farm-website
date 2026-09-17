import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

const chapters = [
  ["/guide", "Field guide"],
  ["/configuration", "Configuration"],
  ["/compare", "Compare"],
  ["/resources", "Resources"],
];

export function GuidePage({
  path,
  number,
  title,
  intro,
  children,
}: {
  path: string;
  number: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="guide-masthead">
        <div className="container">
          <p className="eyebrow">Agent Farm / Field notes {number}</p>
          <h1>{title}</h1>
          <p className="guide-intro">{intro}</p>
        </div>
      </div>
      <div className="container guide-layout">
        <nav className="guide-chapters" aria-label="Field notes chapters">
          <span className="eyebrow">Explore</span>
          {chapters.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={href === path ? "page" : undefined}
            >
              {label}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <div className="guide-content">{children}</div>
      </div>
    </>
  );
}

export function NextChapter({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className="next-chapter">
      <span>
        <span className="eyebrow">{label}</span>
        <strong>{children}</strong>
      </span>
      <ArrowRight size={26} aria-hidden="true" />
    </Link>
  );
}
