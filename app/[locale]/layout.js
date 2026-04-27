import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactWidget from "@/components/layout/ContactWidget";
import QueryProvider from "@/lib/providers/QueryProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { DirectionProvider } from "@/components/ui/direction";
import { BASE_URL } from "@/lib/seo";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const droidKufi = localFont({
  src: "../fonts/DroidKufi-Regular.ttf",
  variable: "--font-droid-kufi",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "GS1 Saudi Arabia | The Global Language of Business",
    template: "%s | GS1 Saudi Arabia",
  },
  description:
    "GS1 Saudi Arabia is the sole authorized entity for GS1 standards in KSA, providing Barcodes (GTIN), GLN, and SSCC to enhance supply chain efficiency and transparency.",
  keywords: [
    "GS1 Saudi Arabia",
    "GS1 KSA",
    "Barcodes",
    "barcode",
    "GTIN",
    "gtin",
    "GLN",
    "SSCC",
    "Traceability",
    "Tobacco Tracking",
    "Supply Chain",
    "Business Standards",
    "Riyadh",
    "Saudi Numbering Center",
    "باركود",
    "628 باركود barcode",
    "gs1 barcode",
    "باركود السعودية",
    "Saudi barcode",
    "saudi code",
    "كود السعودية للمنتجات",
    "Saudi product code",
    "gs1 software",
    "zatca compliance",
    "كود السعودية منتجات",
    "gtin code",
    "gtin number",
    "سلسلة التوريد",
    "GS1 السعودية",
  ],
  authors: [{ name: "GS1 Saudi Arabia", url: BASE_URL }],
  creator: "GS1 Saudi Arabia",
  publisher: "GS1 Saudi Arabia",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "GS1 Saudi Arabia | The Global Language of Business",
    description:
      "GS1 Saudi Arabia is the sole authorized entity for GS1 standards in KSA, providing Barcodes (GTIN), GLN, and SSCC to enhance supply chain efficiency and transparency.",
    type: "website",
    locale: "en_SA",
    siteName: "GS1 Saudi Arabia",
    url: BASE_URL,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "GS1 Saudi Arabia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@GS1SaudiArabia",
    creator: "@GS1SaudiArabia",
    title: "GS1 Saudi Arabia | The Global Language of Business",
    description:
      "GS1 Saudi Arabia is the sole authorized entity for GS1 standards in KSA, providing Barcodes (GTIN), GLN, and SSCC to enhance supply chain efficiency and transparency.",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      en: `${BASE_URL}/en`,
      ar: `${BASE_URL}/ar`,
      "x-default": `${BASE_URL}/en`,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${geistMono.variable} ${droidKufi.variable} antialiased ${
          locale === "ar" ? "font-arabic" : ""
        }`}
      >
        <NextIntlClientProvider messages={messages}>
          <DirectionProvider direction={dir}>
            <QueryProvider>
              <Header />
              {children}
              <ContactWidget />
              <Footer />
            </QueryProvider>
          </DirectionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
