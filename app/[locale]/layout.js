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
  title: "GS1 Saudi Arabia | The Global Language of Business",
  description:
    "GS1 Saudi Arabia is the sole authorized entity for GS1 standards in KSA, providing Barcodes (GTIN), GLN, and SSCC to enhance supply chain efficiency and transparency.",
  keywords: [
    "GS1 Saudi Arabia",
    "GS1 KSA",
    "Barcodes",
    "GTIN",
    "GLN",
    "SSCC",
    "Supply Chain",
    "Business Standards",
    "Riyadh",
    "Jeddah",
    "Dammam",
    "Saudi Numbering Center",
  ],
  openGraph: {
    title: "GS1 Saudi Arabia | The Global Language of Business",
    description:
      "GS1 Saudi Arabia is the sole authorized entity for GS1 standards in KSA, providing Barcodes (GTIN), GLN, and SSCC to enhance supply chain efficiency and transparency.",
    type: "website",
    locale: "en_SA",
    siteName: "GS1 Saudi Arabia",
  },
  twitter: {
    card: "summary_large_image",
    title: "GS1 Saudi Arabia | The Global Language of Business",
    description:
      "GS1 Saudi Arabia is the sole authorized entity for GS1 standards in KSA, providing Barcodes (GTIN), GLN, and SSCC to enhance supply chain efficiency and transparency.",
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
