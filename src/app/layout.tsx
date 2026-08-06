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
    default: "DMart Brandon — Indian Grocery, Fresh Produce & Meat Market in Brandon, FL",
    template: "%s · DMart Brandon",
  },
  description:
    "Farm-fresh produce, over 900 pantry staples and spices, fresh-made food, and meats cut to order — under one roof at 2020 W Brandon Blvd, Brandon, FL. Order essentials online for pickup.",
  keywords: [
    "Indian grocery Brandon",
    "Indian grocery Tampa",
    "Indian store near me",
    "fresh produce Brandon FL",
    "spices Brandon FL",
    "Middle Eastern grocery Brandon",
    "meat market Brandon FL",
    "goat meat Brandon",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.domain,
    siteName: "DMart Brandon",
    title: "DMart Brandon — Freshness you can see. Quality you can trust.",
    description:
      "Farm-fresh produce, the spice aisle your recipes ask for, and meats cut to order — 2020 W Brandon Blvd, Brandon, FL.",
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
    "Fresh meat market and Indian & Middle Eastern grocery in Brandon, Florida. Meats cut to order at the counter, farm-fresh produce, pantry and spices.",
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
  sameAs: [site.maps, site.facebook, site.instagram],
  priceRange: "$$",
  paymentAccepted: "Cash, Credit Card",
  areaServed: site.areas.map((name) => ({ "@type": "City", name })),
  keywords:
    "meat cut to order, goat cut to order, Indian grocery, Middle Eastern grocery, fresh produce, spices",
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
