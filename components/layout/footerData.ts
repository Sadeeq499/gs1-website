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
      title: "Core Services",
      links: [
        { label: "Product ID (GTIN)", href: "/services/global-trade-item-number" },
        { label: "Location ID (GLN)", href: "/services/global-location-number" },
        { label: "Pallet ID (SSCC)", href: "/services/serial-shipping-container-code" },
        { label: "SEC Compliance", href: "/services/saudi-electricity-company" },
        { label: "Tobacco Traceability", href: "/services/tobacco-traceability" },
      ],
    },
    {
      title: "Tech Solutions",
      links: [
        { label: "2D Barcode Sunrise", href: "/solutions/2d-barcodes" },
        { label: "GS1 Digital Link", href: "/solutions/digital-link" },
        // { label: "ZATCA E-Invoicing", href: "/solutions/zatca-compliance" },
        { label: "End-to-End Traceability", href: "/solutions/traceability" },
        // { label: "Global Registry", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        // { label: "Knowledge Hub", href: "/knowledge-hub" },
        // { label: "Member Support", href: "/support" },
        { label: "Training & Events", href: "/events" },
        { label: "Barcode Check", href: "/verify" },
        { label: "Verified by GS1", href: "/verify" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Who we are", href: "/about/who-we-are" },
        { label: "Leadership", href: "/about/board" },
        // { label: "Global Network", href: "/global-offices" },
        // { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  socials: [
    { label: "LinkedIn", href: "#", icon: Linkedin },
    { label: "YouTube", href: "#", icon: Youtube },
  ],
  legal: [
    // { label: "Terms & Conditions", href: "/terms" },
    // { label: "Privacy Policy", href: "/privacy" },
    // { label: "Cookie Policy", href: "/cookies" },
    // { label: "Membership Terms", href: "/membership-agreement" },
  ]
};