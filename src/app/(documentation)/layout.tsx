import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { Head } from "nextra/components";
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";
import { FarmMark } from "@/components/landing/artwork";
import { siteUrl, repository } from "@/lib/site";
import "nextra-theme-docs/style.css";
import "./docs.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-docs-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-docs-mono" });
const serif = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-docs-serif",
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Documentation | Agent Farm",
    template: "%s | Agent Farm Docs",
  },
};

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
    >
      <Head
        color={{ hue: 153, saturation: 35 }}
        backgroundColor={{ light: "#f8f5ed", dark: "#142c25" }}
      />
      <body>
        <Layout
          pageMap={await getPageMap("/docs")}
          navbar={
            <Navbar
              logo={
                <span className="docs-logo">
                  <FarmMark width={27} height={32} />
                  <span>
                    Agent Farm <small>Docs</small>
                  </span>
                </span>
              }
              logoLink="/"
              projectLink={repository}
            >
              <a className="docs-nav-link" href="/guide">
                Field guide
              </a>
            </Navbar>
          }
          footer={
            <Footer>
              <span>
                Made with care by{" "}
                <a href="https://github.com/dcouple">dcouple</a>.
              </span>
              <a href="/llms.txt">For AI tools</a>
            </Footer>
          }
          docsRepositoryBase="https://github.com/dcouple/agent-farm-website/tree/main"
          editLink="Edit this page"
          feedback={{
            content: "Share feedback",
            link: "https://github.com/dcouple/agent-farm-website/issues/new",
          }}
          nextThemes={{
            defaultTheme: "light",
            storageKey: "agent-farm-docs-theme",
          }}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          toc={{ backToTop: "Back to top" }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
