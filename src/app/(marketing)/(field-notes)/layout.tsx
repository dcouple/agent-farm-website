import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import "./field-notes.css";

export default function FieldNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="hero-shell">
        <SiteHeader />
      </div>
      <main id="main" className="field-notes">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
