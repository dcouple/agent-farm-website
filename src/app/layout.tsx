import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./landing.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getagentfarm.com"),
  alternates: { canonical: "/" },
  title: "Agent Farm — Harness Configurator for Claude Code & Codex",
  description:
    "Switch agent setups for Claude Code and Codex without reinstalling everything. Save profiles with different skills, models, and sub-agents. Keep your native terminal.",
  openGraph: {
    title: "Agent Farm",
    description:
      "Switch agent setups for Claude Code and Codex without reinstalling everything.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
