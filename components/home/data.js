import {
  ShieldCheck,
  QrCode,
  Link2,
  FileCheck,
  Globe,
  Layers,
  ScanLine,
  BarChart3,
} from "lucide-react";
/**
 * 1. CORE REGISTRATION SERVICES
 * Used for route: /services/[slug]
 */
export const servicesDetails = [
  {
    title: "Global Trade Item Number",
    acronym: "GTIN",
    slug: "global-trade-item-number",
    shortDescription: "The universal language of product identification.",
    description:
      "The GTIN is the most recognized supply chain identifier in the world. Issued by GS1 Saudi Arabia, it provides your products with a unique identity that is recognized by every major retailer, distributor, and e-commerce platform globally.",
    heroImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2000&auto=format&fit=crop",
    modules: [
      {
        title: "Retail Readiness",
        description:
          "Ensure your products can be scanned at any Point of Sale (POS) globally. From local grocery stores in Riyadh to international hypermarkets, a GS1 GTIN is your ticket to the shelf.",
        image:
          "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "E-Commerce Validation",
        description:
          "Platforms like Amazon, Noon, and Google Shopping require valid GS1 GTINs to list products. We help you secure your brand's digital presence with verified identification.",
        image:
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop",
      },
    ],
    features: [
      "Authorized GS1 Barcodes",
      "Global Market Access",
      "Brand Ownership Verification",
      "Amazon & Noon Compliant",
      "Inventory Accuracy",
    ],
    idealFor: ["Manufacturers", "Exporters", "Retailers", "SMEs"],
  },
  {
    title: "Global Location Number",
    acronym: "GLN",
    slug: "global-location-number",
    shortDescription: "Identify exactly who and where in the supply chain.",
    description:
      "A GLN identifies legal entities and physical locations. In the Saudi market, it is essential for identifying your branches, warehouses, and offices within the ZATCA and SFDA ecosystems.",
    heroImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
    modules: [
      {
        title: "Logistics Precision",
        description:
          "Stop relying on confusing text addresses. Use a 13-digit code to tell your logistics partners exactly which loading dock or warehouse entrance to use.",
        image:
          "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "Regulatory Compliance",
        description:
          "Meet the mandatory requirements for Saudi health and tax authorities by uniquely identifying your business locations.",
        image:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      },
    ],
    features: [
      "ZATCA Phase 2 Ready",
      "Exact GPS Localization",
      "EDI Communication Standard",
      "SFDA Pharmacy Identification",
    ],
    idealFor: ["Logistics Providers", "Healthcare", "Government Entities"],
  },
  {
    title: "Serial Shipping Container Code",
    acronym: "SSCC",
    slug: "serial-shipping-container-code",
    shortDescription: "The license plate for your pallets and parcels.",
    description:
      "The SSCC is used to identify logistics units, such as pallets or cases. It allows for end-to-end tracking of shipments from the factory floor to the final destination.",
    heroImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop",
    modules: [
      {
        title: "Pallet Visibility",
        description:
          "Track the movement of entire pallets without needing to scan individual boxes. Ideal for high-volume distribution centers in the Kingdom.",
        image:
          "https://images.unsplash.com/photo-1587293855946-90c5df24454a?q=80&w=1200&auto=format&fit=crop",
      },
    ],
    features: ["WMS Integration", "Automated Receiving", "ASN Support"],
    idealFor: ["Warehouse Managers", "Distributors"],
  },
  {
    title: "SEC Compliance Solutions",
    acronym: "SEC",
    slug: "saudi-electricity-company",
    shortDescription: "Standardized tagging for the Saudi Electricity Company.",
    description:
      "We provide technical guidance for vendors of the Saudi Electricity Company (SEC) to ensure all materials and assets are tagged with compliant GS1 DataMatrix symbols.",
    heroImage:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2000&auto=format&fit=crop",
    modules: [
      {
        title: "Vendor Technical Support",
        description:
          "We help you generate the specific barcode structures required by SEC’s SAP systems to ensure your shipments are accepted without delay.",
        image:
          "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop",
      },
    ],
    features: [
      "Direct SAP Compatibility",
      "Asset Lifecycle Tracking",
      "Material ID Validation",
    ],
    idealFor: ["SEC Suppliers", "Energy Sector Contractors"],
  },
  {
    title: "Tobacco Traceability",
    acronym: "Tobacco",
    slug: "tobacco-traceability",
    shortDescription: "Compliance with ZATCA digital tax stamp regulations.",
    description:
      "Our standards help the tobacco industry track products at the pack and carton level, fully integrating with the Kingdom's digital tax stamp and anti-illicit trade systems.",
    heroImage:
      "https://images.unsplash.com/photo-1626266061368-46a813725c1e?q=80&w=2000&auto=format&fit=crop",
    modules: [
      {
        title: "Aggregation Excellence",
        description:
          "Maintain the link between individual pack serial numbers and the master case, simplifying the customs and tax reporting process.",
        image:
          "https://images.unsplash.com/photo-1610374792793-f016b77ca51a?q=80&w=1200&auto=format&fit=crop",
      },
    ],
    features: [
      "ZATCA Tax Stamp Ready",
      "Anti-Counterfeit",
      "Regulatory Reporting",
    ],
    idealFor: ["Tobacco Importers", "Manufacturers"],
  },
];

/**
 * 2. TECHNOLOGY SOLUTIONS
 * Used for route: /solutions/[slug] (The Blog Style Page)
 */
export const techSolutions = [
  {
    title: "Next-Generation 2D Barcodes",
    acronym: "Sunrise 2027",
    slug: "2d-barcodes",
    shortDescription: "The biggest evolution in retail since the 1970s.",
    description:
      "By 2027, the world is moving from simple 1D barcodes to data-rich 2D symbols. GS1 Saudi Arabia is leading this transition, enabling businesses to provide more information than ever before through a single scan at the checkout counter.",
    modules: [
      {
        title: "The Data Revolution",
        description:
          "Unlike traditional barcodes, 2D symbols (like QR codes and DataMatrix) can store expiry dates, batch numbers, and serial numbers. This allows retailers to automatically block the sale of expired items at the register.",
      },
      {
        title: "Sustainability & Transparency",
        description:
          "Encode a product's entire journey into the barcode. Consumers can scan with their smartphones to see the carbon footprint, organic certifications, or 'Made in Saudi' heritage.",
      },
      {
        title: "Operations & Efficiency",
        description:
          "Simplify your warehouse operations by scanning a single 2D code to capture all production data simultaneously. This reduces manual entry by 80%.",
      },
    ],
    features: [
      "Automated Expiry Management",
      "Rich Consumer Engagement",
      "Dynamic Pricing Support",
      "Reduced Packaging Waste",
      "Born in Saudi Visibility",
    ],
    idealFor: [
      "Retailers",
      "FMCG Brands",
      "Healthcare Providers",
      "Logistics Firms",
    ],
  },
  {
    title: "GS1 Digital Link",
    acronym: "Digital Link",
    slug: "digital-link",
    shortDescription: "Connecting every physical product to the digital world.",
    description:
      "GS1 Digital Link transforms the traditional barcode into a web-enabled gateway. It allows a single QR code to serve multiple purposes: retail checkout, consumer engagement, and regulatory tracking.",
    modules: [
      {
        title: "One Code, Infinite Destinations",
        description:
          "Using 'Resolver' technology, a single QR code can send a customer to a promotional video or a technician to a repair manual, depending on who scans it.",
      },
      {
        title: "Enhanced Brand Loyalty",
        description:
          "Turn your packaging into a direct marketing channel. Update recipes or share sustainability stories in real-time without changing physical printing.",
      },
    ],
    features: [
      "Web-Native Barcodes",
      "Dynamic Content Updates",
      "Anti-Counterfeiting Tools",
      "No Special Apps Required",
    ],
    idealFor: ["Marketing Directors", "Luxury Goods", "Consumer Electronics"],
  },
  {
    title: "ZATCA Compliance",
    acronym: "Fatoora",
    slug: "zatca-compliance",
    shortDescription:
      "Ensuring your E-Invoicing meets Saudi National Standards.",
    description:
      "GS1 Saudi Arabia provides the foundational identifiers (GLNs) and data structures necessary to comply with ZATCA's Fatoora mandate for Phase 2 integration.",
    modules: [
      {
        title: "Technical Integration",
        description:
          "We provide the technical blueprints for encoding Seller, VAT, and Timestamp data into ZATCA-compliant QR codes.",
      },
      {
        title: "Branch & Location Management",
        description:
          "Use Global Location Numbers (GLN) to identify every branch and warehouse in your tax filings accurately.",
      },
    ],
    features: [
      "ZATCA Phase 2 Compliant",
      "Standardized XML Support",
      "Validated Data Structures",
      "Vision 2030 Alignment",
    ],
    idealFor: ["CFOs", "IT Managers", "Corporate Tax Teams"],
  },
  {
    title: "End-to-End Traceability",
    acronym: "Traceability",
    slug: "traceability",
    shortDescription: "Full supply chain visibility from farm to fork.",
    description:
      "Our traceability solutions utilize GS1 EPCIS standards to capture and share event data, allowing Saudi businesses to prove product origin and ensure cold chain integrity.",
    modules: [
      {
        title: "Solution",
        description:
          "GS1 Global Traceability Standard is a process standard describing the traceability process independent from the choice of enabling technologies.",
      },
      {
        title: "How it works",
        description:
          "GS1 Global Traceability Standard is a building block for developing Traceability systems.",
      },
      {
        title: "Benefit",
        description:
          "The GTC Programme is established to review Traceability Systems in place through a rigorous methodology.",
      },
    ],
    features: [
      "SFDA Tameni Integration",
      "EPCIS 2.0 Standard",
      "Real-time Event Tracking",
      "Cold Chain Monitoring",
    ],
    idealFor: ["Food Producers", "Pharmaceuticals", "Export Hubs"],
  },
];

export const tabs = [
  {
    id: "2d-barcodes",
    label: "2D Barcodes",
    icon: QrCode,
  },
  {
    id: "digital-link",
    label: "GS1 Digital Link",
    icon: Link2,
  },

  {
    id: "traceability",
    label: "End-to-End Traceability",
    icon: BarChart3,
  },
];

export const tabContent = {
  "2d-barcodes": {
    headline: "The Future of Barcodes Is Here",
    description:
      "2D barcodes pack exponentially more data into a single scan. From DataMatrix to QR codes powered by GS1 standards, Saudi businesses gain richer product information, consumer engagement, and supply chain intelligence -- all from one symbol.",
    image: "/images/barcode-evolution.png",
    features: [
      {
        icon: Layers,
        title: "100x More Data",
        text: "Encode product details, batch numbers, expiry dates, and URLs in a single 2D symbol.",
      },
      {
        icon: ScanLine,
        title: "Smartphone-Ready",
        text: "Consumers scan with any smartphone camera -- no special apps or hardware needed.",
      },
      {
        icon: Globe,
        title: "Sunrise 2027 Ready",
        text: "Prepare your business for the global GS1 migration from 1D to 2D barcodes by 2027.",
      },
    ],
    slug: "2d-barcodes",
    cta: "Explore 2D Barcodes",
  },
  "digital-link": {
    headline: "One Code. Infinite Connections.",
    description:
      "GS1 Digital Link transforms every barcode into a gateway to digital content. A single scan connects consumers, retailers, and regulators to product pages, authenticity checks, sustainability data, and more -- all through a standard web URI.",
    image: "/images/digital-link.png",
    features: [
      {
        icon: Link2,
        title: "Web-Native Barcodes",
        text: "Every product gets a unique URL that resolves to the right content for each audience.",
      },
      {
        icon: Globe,
        title: "Multi-Purpose Scans",
        text: "Same code serves consumers, point-of-sale, warehouse, and regulatory systems.",
      },
      {
        icon: ShieldCheck,
        title: "Anti-Counterfeit",
        text: "Verify product authenticity instantly with GS1-powered digital verification.",
      },
    ],
    slug: "digital-link",
    cta: "Learn About Digital Link",
  },
  zatca: {
    headline: "Seamless ZATCA E-Invoicing Compliance",
    description:
      "Saudi Arabia's ZATCA e-invoicing mandate requires GS1-compliant QR codes on every tax invoice. GS1 Saudi Arabia provides the standards, tools, and support to ensure your business meets Phase 2 integration requirements with confidence.",
    image: "/images/zatca-compliance.png",
    features: [
      {
        icon: FileCheck,
        title: "Phase 2 Ready",
        text: "Full compliance with ZATCA FATOORA integration requirements using GS1 standards.",
      },
      {
        icon: ShieldCheck,
        title: "Validated QR Codes",
        text: "Generate compliant QR codes with seller info, VAT number, invoice totals, and timestamps.",
      },
      {
        icon: BarChart3,
        title: "Vision 2030 Aligned",
        text: "Support Saudi Arabia's digital transformation goals with standards-based e-commerce.",
      },
    ],
    slug: "zatca-compliance",
    cta: "Get ZATCA Compliant",
  },
  traceability: {
    headline: "Track Every Product. Every Step.",
    description:
      "EPCIS 2.0 and GS1 standards deliver full supply chain visibility from raw materials to the end consumer. Saudi businesses gain real-time tracking, recall readiness, and the transparency that regulators and consumers demand.",
    image: "/images/traceability-chain.png",
    features: [
      {
        icon: Layers,
        title: "EPCIS 2.0",
        text: "Capture what, where, when, and why events across your entire supply chain.",
      },
      {
        icon: ScanLine,
        title: "Instant Recall",
        text: "Pinpoint affected batches in minutes, not weeks -- protecting consumers and your brand.",
      },
      {
        icon: Globe,
        title: "Cross-Border Ready",
        text: "Interoperable standards that work with global trading partners and regulatory systems.",
      },
    ],
    slug: "traceability",
    cta: "Discover Traceability",
  },
};

// export const slides = [
//   {
//     id: 1,
//     image: "/images/home-hero/store.png",
//     title: "Unlock New Sales Channels with GS1 ",
//     highlight: "Standards",
//     description:
//       "GS1 Saudi Arabia empowers businesses to expand into retail and e-commerce with global barcodes. Boost product visibility and simplify data exchange across the supply chain.",
//     primaryCta: "Get a Barcode",
//     secondaryCta: "Explore Services",
//   },

//   {
//     id: 2,
//     image: "/images/home-hero/logistics.png",
//     title: "Enhancing Logistics & Supply Chain Visibility with GS1 ",
//     highlight: "Standards",
//     description:
//       "Empowering logistics providers with global barcode, QR, and ID standards to enable real-time tracking, accurate product identification, and seamless data sharing.",
//     primaryCta: "Get a Barcode",
//     secondaryCta: "Explore Services",
//   },

//   {
//     id: 3,
//     image: "/images/home-hero/pharmaceutical.png",
//     title: "Advancing Pharmaceutical Traceability with GS1 ",
//     highlight: "Standards",
//     description:
//       "Enable healthcare providers to implement global identification standards like barcodes, QR codes, and DataMatrix for product safety and regulatory compliance.",
//     primaryCta: "Get a Barcode",
//     secondaryCta: "Explore Services",
//   },
// ];

export const partners = [
  // {
  //   name: "fsc",
  //   logo: "./images/fsc.png",
  //   category: "Strategic Host",
  //   url: "https://fsc.org.sa/",
  // },
  {
    name: "sfda",
    logo: "https://srcosa.com/wp-content/uploads/2016/11/SFDA.jpg",
    category: "Regulatory Partner",
    url: "https://www.sfda.gov.sa/en",
  },
  {
    name: "ministry_of_commerce",
    logo: "https://my.gov.sa/files/agency_files/ivxzva76xdviufig99myn4jb72rh8jmx.png",
    category: "Governmental Support",
    url: "https://mc.gov.sa/",
  },
  {
    name: "ministry_of_industry",
    logo: "https://my.gov.sa/files/agency_files/fufjoqziccotv71g6gtvfvbr15izqbn4.png",
    category: "Industrial Standards",
    url: "https://mim.gov.sa/",
  },
  {
    name: "saudi_made",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3d/Saudi_Made_logo.svg/1280px-Saudi_Made_logo.svg.png",
    category: "National Program",
    url: "https://www.saudimade.sa/",
  },
  {
    name: "zatca",
    logo: "./images/ZATCA.svg",
    category: "Trade & Logistics",
    url: "https://zatca.gov.sa/",
  },
  {
    name: "saso",
    logo: "./images/SASO.png",
    category: "Quality Partner",
    url: "https://www.saso.gov.sa/",
  },
  {
    name: "fgccc",
    logo: "https://fgccc.org/wp-content/uploads/2025/04/Untitled-design-75.jpg",
    category: "Strategic Host",
    url: "https://fgccc.org/",
  },
  {
    name: "uac",
    logo: "https://uac-org.org/assets/images/logo.png",
    category: "Strategic Host",
    url: "https://uac-org.org/",
  },
  {
    name: "consumer_protection",
    logo: "https://www.cpa.com.sa/rafed/uploads/website_editor/6880b61e95c801.82950287.png",
    category: "Strategic Host",
    url: "https://cpa.org.sa/",
  },
  {
    name: "aramco",
    logo: "https://stage.maaal.com/storage/old_version/uploads/2021/03/%D8%A3%D8%B1%D8%A7%D9%85%D9%83%D9%88-%D8%AC%D8%AF%D9%8A%D8%AF.png",
    category: "Strategic Host",
    url: "https://www.aramco.com/ar",
  },
  {
    name: "sabic",
    logo: "https://m.eyeofriyadh.com/directory/images/2022/12/2b936c93ed30.jpg",
    category: "Strategic Host",
    url: "https://www.sabic.com/ar",
  },
  {
    name: "ministry_of_energy",
    logo: "https://www.moenergy.gov.sa/images/logo-green.svg",
    category: "Strategic Host",
    url: "https://www.moenergy.gov.sa/ar",
  },
  {
    name: "saip",
    logo: "https://saip.gov.sa/images/saip-logo-en.svg",
    category: "Strategic Host",
    url: "https://www.saip.gov.sa/ar/",
  },
  {
    name: "local_content_authority",
    logo: "https://istitlaa.ncc.gov.sa/ar/PublishingImages/Logos/lcgpa.jpg",
    category: "Local Content",
    url: "https://lcgpa.gov.sa/",
  },
];
