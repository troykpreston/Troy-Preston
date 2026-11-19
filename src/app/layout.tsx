import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { themeScript } from "@/components/layout/ThemeToggle";
import { Providers } from "@/components/motion/SmoothScroll";
import { linkedin, site } from "@/content/site";

import "lenis/dist/lenis.css";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/transitions.css";
import "@/styles/layout.css";
import "@/styles/home.css";
import "@/styles/work.css";
import "@/styles/case.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.role}`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, title: `${site.name} — ${site.role}`, description: site.description },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0d" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: site.name,
              jobTitle: site.role,
              email: `mailto:${site.email}`,
              address: { "@type": "PostalAddress", addressLocality: "Richmond", addressRegion: "VA", addressCountry: "US" },
              url: site.url,
              sameAs: [linkedin],
            }),
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Providers>
          <div id="top" />
          <Header />
          <main id="main">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
