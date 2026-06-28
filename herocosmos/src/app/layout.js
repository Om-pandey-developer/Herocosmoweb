import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "../components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://herocosmos.in'),
  manifest: '/manifest.json',
  title: "HeroCosmos | Superhero Fashion Universe - Premium Hero Merch Store",
  description:
    "Shop premium superhero merchandise at HeroCosmos. Discover oversized tees, graphic hoodies, and exclusive collections inspired by Marvel, DC Comics, Anime & Video Games. Free shipping on orders above ₹1999.",
  keywords: [
    "superhero t-shirts",
    "marvel merchandise",
    "dc comics hoodie",
    "anime tshirt india",
    "oversized superhero tee",
    "hero merch store",
    "HeroCosmos",
    "graphic printed tshirt",
    "gaming merchandise",
    "buy superhero clothes online",
  ],
  openGraph: {
    title: "HeroCosmos | Superhero Fashion Universe",
    description:
      "Premium superhero merch — Marvel, DC, Anime & Gaming. Oversized tees, hoodies & more.",
    url: "https://herocosmos.in",
    siteName: "HeroCosmos",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "HeroCosmos | Superhero Fashion Universe",
    description:
      "Premium superhero merch — Marvel, DC, Anime & Gaming. Oversized tees, hoodies & more.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://herocosmos.in",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* AEO: Structured Data for AI Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "HeroCosmos",
              url: "https://herocosmos.in",
              description:
                "Premium superhero merchandise store featuring Marvel, DC Comics, Anime and Video Game inspired fashion.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://herocosmos.in/shop?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "HeroCosmos",
              url: "https://herocosmos.in",
              description:
                "Your ultimate destination for superhero-inspired fashion. Premium quality merchandise from Marvel, DC, Anime & Gaming universes.",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: ["English", "Hindi"],
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 2500,
              style: {
                background: "#1a1a2e",
                color: "#fff",
                border: "1px solid rgba(168,85,247,0.3)",
                borderRadius: "12px",
              },
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
