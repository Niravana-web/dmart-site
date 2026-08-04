import type { Metadata } from "next";
import { Poppins, Lato, Playfair_Display } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "DMart Brandon — Halal Meat Market & Indian Grocery in Brandon, FL",
    template: "%s · DMart Brandon",
  },
  description:
    "Halal meats cut to order, farm-fresh produce, and over 900 pantry staples and spices — under one roof at 2020 W Brandon Blvd, Brandon, FL. Fresh goat and chicken arrive Tuesday and Thursday mornings.",
  keywords: [
    "halal meat Brandon FL",
    "halal butcher near me",
    "Indian grocery Brandon",
    "halal grocery Tampa",
    "goat meat Brandon",
    "halal chicken Brandon FL",
    "Middle Eastern grocery Brandon",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.domain,
    siteName: "DMart Brandon",
    title: "DMart Brandon — Freshness you can see. Halal you can trust.",
    description:
      "Halal meats cut to order, farm-fresh produce, and the spice aisle your recipes ask for — 2020 W Brandon Blvd, Brandon, FL.",
    images: [{ url: "/images/hero.jpg", width: 1600, height: 900 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GroceryStore",
  name: "DMart",
  alternateName: site.legalName,
  description:
    "Halal meat market and Indian & Middle Eastern grocery in Brandon, Florida. Meats cut to order at the counter, farm-fresh produce, pantry and spices.",
  url: site.domain,
  telephone: site.phone,
  email: site.email,
  image: `${site.domain}/images/hero.jpg`,
  logo: `${site.domain}/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  hasMap: site.maps,
  sameAs: [site.maps],
  priceRange: "$$",
  paymentAccepted: "Cash, Credit Card",
  areaServed: site.areas.map((name) => ({ "@type": "City", name })),
  keywords:
    "halal meat, halal butcher, goat cut to order, Indian grocery, Middle Eastern grocery, fresh produce, spices",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${lato.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
