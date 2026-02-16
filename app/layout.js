import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
