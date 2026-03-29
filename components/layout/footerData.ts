import { Linkedin, Youtube, Mail, Phone, MapPin, Twitter } from "lucide-react";

export const footerConfig = {
  brand: {
    description: "The global language of business. Empowering Saudi enterprises with world-class standards for supply chain excellence and digital transformation.",
    logo: "/logo.png",
    name: "Saudi Arabia"
  },
  contact: [
    { icon: Phone, label: "920031437", href: "tel:920031437" },
    { icon: Mail, label: "gs1sa@gs1.org.sa", href: "mailto:gs1sa@gs1.org.sa" },
    { icon: MapPin, label: "RANB7259, 7259 Uthman Ibn Affan Rd, 2327, An Narjis, Riyadh 13328", href: "#" },
  ],
  sections: [
    {
      title: "Services",
      href: "/services",
      links: [
        { label: "Product ID (GTIN)", href: "/services/global-trade-item-number" },
        { label: "Location ID (GLN)", href: "/services/global-location-number" },
        { label: "Pallet ID (SSCC)", href: "/services/serial-shipping-container-code" },
        { label: "SEC Compliance", href: "/services/saudi-electricity-company" },
        { label: "Tobacco Traceability", href: "/services/tobacco-traceability" },
      ],
    },
    {
      title: "Standards",
      href: "/standards",
      links: [
        { label: "Identify", href: "/standards/identify" },
        { label: "Capture", href: "/standards/capture" },
        { label: "Share", href: "/standards/share" },
      ],
    },
    {
      title: "Industries",
      href: "/industries",
      links: [
        { label: "Healthcare & Pharma", href: "/industries/healthcare-pharma" },
        { label: "Retail & FMCG", href: "/industries/retail-fmcg" },
        { label: "Logistics & Supply Chain", href: "/industries/logistics-supply-chain" },
        { label: "Food Safety & Agriculture", href: "/industries/food-safety-agriculture" },
        { label: "E-Commerce & Digital", href: "/industries/e-commerce-digital" },
      ],
    },
    {
      title: "About GS1 Saudi Arabia",
      href: "/about/who-we-are",
      links: [
        { label: "Who We Are", href: "/about/who-we-are" },
        { label: "Mission & Vision", href: "/about/mission-vision" },
        { label: "Our Strategy", href: "/about/strategy" },
        { label: "Our Partners", href: "/about/partners" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  socials: [
    { label: "LinkedIn", href: "#", icon: Linkedin },
    { label: "YouTube", href: "#", icon: Youtube },
  ],

};