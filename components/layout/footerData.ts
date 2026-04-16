import { Linkedin, Youtube, Mail, Phone, MapPin, Twitter } from "lucide-react";

export const footerConfig = {
  brand: {
    description: "The global language of business. Empowering Saudi enterprises with world-class standards for supply chain excellence and digital transformation.",
    logo: "/logo.png",
    name: "Saudi Arabia"
  },
  contact: [
    { icon: Phone, label: "phone", href: "tel:920031437" },
    { icon: Mail, label: "email", href: "mailto:gs1.info@gs1.org.sa" },
    { icon: MapPin, label: "location", href: "https://www.google.com/maps/place/GS1+Saudi+Arabia+%D9%85%D8%B1%D9%83%D8%B2+%D8%A7%D9%84%D8%AA%D8%B1%D9%82%D9%8A%D9%85+%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%E2%80%AD/@24.8456196,46.6717674,17z/data=!3m1!4b1!4m6!3m5!1s0x3e2efb004b18df73:0xd49913c1b6cf4d67!8m2!3d24.8456196!4d46.6743477!16s%2Fg%2F11mcz364xg?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D", },
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