import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/data/site";
import { siteImages } from "@/data/images";
import { MotionProvider } from "@/components/animations/MotionProvider";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Full Gospel Business Men's Fellowship International`, template: `%s | ${site.name}` },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_SG",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: "/",
    images: [{ url: siteImages.og.src, width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title: `${site.name} — ${site.tagline}`, description: site.description, images: [siteImages.og.src] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#140b33", width: "device-width", initialScale: 1 };

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.fullName,
  url: site.url,
  logo: `${site.url}/images/logo.png`,
  description: site.description,
  areaServed: { "@type": "Country", name: "Singapore" },
  parentOrganization: { "@type": "Organization", name: "Full Gospel Business Men's Fellowship International", url: site.internationalUrl },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-SG" className="antialiased">
      <body className="flex min-h-screen flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }} />
        <MotionProvider>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
