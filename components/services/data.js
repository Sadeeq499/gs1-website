import { Barcode, ShieldCheck, MapPin, Package, Cigarette, BadgeCheck, Route, Layers, HeartPulse } from "lucide-react";

export const services = [
  {
    id: "gtin",
    title: "Global Trade Item Number (GTIN)",
    slug: "global-trade-item-number",
    shortName: "GTIN",
    description:
      "Uniquely identify your products with GTINs (barcodes) to sell in retail stores and online marketplaces globally.",
    icon: Barcode,
    color: "bg-primary",
    textColor: "text-primary",
    image: "/images/services-cards/gs1-gtin.jpg",
  },
  {
    id: "gln",
    title: "Global Location Number (GLN)",
    slug: "global-location-number",
    shortName: "GLN",
    description:
      "Identify physical locations and legal entities to streamline supply chain communications and transactions.",
    icon: MapPin,
    color: "bg-secondary",
    textColor: "text-secondary",
    image: "/images/services-cards/gs1-gln.avif",
  },
  {
    id: "sscc",
    title: "Serial Shipping Container Code (SSCC)",
    slug: "serial-shipping-container-code",
    shortName: "SSCC",
    description:
      "Track and trace logistic units throughout the supply chain with a unique identifier for every pallet or shipment.",
    icon: Package,
    color: "bg-primary",
    textColor: "text-primary",
    image: "/images/services-cards/gs1-sscc.png",
  },
  {
    id: "sec",
    title: "Saudi Electricity Company (SEC)",
    slug: "saudi-electricity-company",
    shortName: "SEC",
    description:
      "Specialized barcoding and identification solutions for Saudi Electricity Company suppliers and vendors.",
    icon: ShieldCheck,
    color: "bg-secondary",
    textColor: "text-secondary",
    image: "/images/services-cards/gs1-sec.webp",
  },
  {
    id: "tobacco",
    title: "Tobacco Traceability",
    slug: "tobacco-traceability",
    shortName: "Tobacco",
    description:
      "Special Category: Ensure compliance with tobacco regulations through our specialized tracking and tracing solutions.",
    icon: Cigarette,
    color: "bg-primary",
    textColor: "text-primary",
    image: "/images/services-cards/gs1-tobacco.jpeg",
  },
  {
    id: "verified-by-gs1",
    title: "Verified by GS1",
    slug: "verified-by-gs1",
    shortName: "Verified",
    description:
      "Authenticate and verify your products with the globally trusted GS1 verification service, building consumer confidence and combating counterfeiting.",
    icon: BadgeCheck,
    color: "bg-secondary",
    textColor: "text-secondary",
    image: "/images/services-cards/gs1-verified.png",
  },
  {
    id: "traceability",
    title: "Traceability",
    slug: "traceability",
    shortName: "Trace",
    description:
      "End-to-end supply chain visibility — track products from origin to consumer using GS1 standards for full transparency and recall readiness.",
    icon: Route,
    color: "bg-primary",
    textColor: "text-primary",
    image: "/images/services-cards/gs1-traceability.avif",
  },
  {
    id: "fixed-assets-management",
    title: "Fixed Assets Management",
    slug: "fixed-assets-management",
    shortName: "Assets",
    description:
      "Efficiently manage and track organizational fixed assets using GS1 barcodes, reducing loss and ensuring accurate asset register maintenance.",
    icon: Layers,
    color: "bg-secondary",
    textColor: "text-secondary",
    image: "/images/services-cards/gs1-Fixed Assets Management.jpg",
  },
  {
    id: "healthcare-management",
    title: "Healthcare Management",
    slug: "healthcare-management",
    shortName: "Healthcare",
    description:
      "Implement GS1 standards across healthcare settings to ensure patient safety, accurate medical device identification, and drug traceability.",
    icon: HeartPulse,
    color: "bg-primary",
    textColor: "text-primary",
    image: "/images/services-cards/gs1-Healthcare Management.png",
  },
];

export const servicesDetails = [
  {
    title: "Global Trade Item Number",
    acronym: "GTIN",
    slug: "global-trade-item-number", // Updated slug
    shortDescription: "The global standard for uniquely identifying products.",
    description:
      "The Global Trade Item Number (GTIN) is the industry standard for the unique identification of trade items. It is the number you see beneath the barcode on almost every product in the world. By using a GTIN, you ensure that your product is uniquely identified within the global supply chain, preventing confusion with other products and facilitating smooth transactions across borders.",
    modules: [
      {
        title: "Universal Barcode Provision",
        description:
          "Globally accepted barcode standards with unique assignment for products, assets, and hardware. Suitable for local and international supply chains.",
      },
      {
        title: "1D & 2D Barcode Solutions",
        description:
          "Implementation of linear barcodes, QR codes, and DataMatrix. Supports item-level, carton-level, and pallet-level identification.",
      },
      {
        title: "Serialization Systems",
        description:
          "Unique serial numbers for every individual product to ensure end-to-end item-level traceability and regulatory compliance.",
      },
      {
        title: "Supply Chain Traceability",
        description:
          "Establish parent-child relationships between items, cartons, and pallets for full visibility across manufacturing and warehousing.",
      },
    ],
    features: [
      "Ensure global compliance and interoperability",
      "Improve supply chain transparency and accuracy",
      "Reduce errors, counterfeiting, and manual processes",
      "Enable complete product traceability and recall readiness",
      "Support future standards and digital transformation",
    ],
    idealFor: [
      "Retail & Consumer Goods",
      "Healthcare & Pharmaceuticals",
      "Manufacturing & Logistics",
      "Government & Public Sector",
    ],
    image: "/images/service-detail/gtin.png",
  },
  {
    title: "Global Location Number",
    acronym: "GLN",
    slug: "global-location-number", // Updated slug
    shortDescription:
      "Identify physical locations and legal entities uniquely.",
    description:
      "The Global Location Number (GLN) uniquely identifies physical locations and legal entities. From a single shelf in a warehouse to an entire shipping dock, GLN offers the precision needed for modern logistics and supply chain management. It eliminates costly errors associated with confusing delivery addresses.",
    modules: [
      {
        title: "Precise Location Identification",
        description:
          "Identify specific functional areas within your business, from loading docks to hospital beds, with absolute precision.",
      },
      {
        title: "Supply Chain Visibility",
        description:
          "Track the movement of goods between parties with certainty of origin and destination.",
      },
      {
        title: "Electronic Data Interchange (EDI)",
        description:
          "Streamline order-to-cash processes by replacing manual address entries with unique location codes in digital messages.",
      },
    ],
    features: [
      "Streamline shipping and receiving processes",
      "Avoid costly delivery errors",
      "Essential for EDI transactions",
      "Identify legal entities and physical locations",
    ],
    idealFor: [
      "Logistics Providers",
      "Hospitals & Healthcare",
      "Retail Chains",
      "Warehousing",
    ],
    image: "/images/service-detail/gln.png",
  },
  {
    title: "Serial Shipping Container Code",
    acronym: "SSCC",
    slug: "serial-shipping-container-code", // Updated slug
    shortDescription: "Track logistics units across the supply chain.",
    description:
      "The Serial Shipping Container Code (SSCC) acts as a license plate for your logistics units. It enables individual tracking of pallets, cases, and cartons as they move through the supply chain. It allows products to be received, tracked, and cross-docked without the need to open the package.",
    modules: [
      {
        title: "License Plate Tracking",
        description:
          "Track every logistics unit individually with a unique serial number worldwide.",
      },
      {
        title: "Automated Goods Receipt",
        description:
          "Scan one barcode to receive an entire pallet without checking individual items manually using Advance Ship Notices (ASN).",
      },
      {
        title: "Inventory Accuracy",
        description:
          "Improve stock visibility and reduce shrinkage during transport and storage.",
      },
    ],
    features: [
      "Accelerate cross-docking operations",
      "Reduce transit and receiving times",
      "Eliminate manual checking errors",
      "Global standard for logistics labeling",
    ],
    idealFor: [
      "Freight & Logistics",
      "Retail Distribution",
      "Manufacturing",
      "Export/Import",
    ],
    image: "/images/service-detail/sscc.png",
  },
  {
    title: "Traceability for Utilities & Energy",
    acronym: "SEC",
    slug: "saudi-electricity-company",
    shortDescription:
      "Compliance solutions for Saudi Electricity Company (SEC) suppliers.",
    description:
      "Customized GS1 standards implementation for the energy sector, specifically designed to meet Saudi Electricity Company (SEC) requirements. We help suppliers implement Data Matrix barcodes for material tracking, incorporating Vendor Codes, PO Numbers, and Serial Numbers as mandated by SEC regulations.",
    modules: [
      {
        title: "SEC Mandate Compliance",
        description:
          "Generate GS1 Data Matrix barcodes compliant with SEC's specific identifier requirements (Project Name, Vendor Code, PO Number).",
      },
      {
        title: "Material Identification",
        description:
          "Assign unique Global Trade Item Numbers (GTINs) to utility materials for seamless integration with SEC's SAP EWM system.",
      },
      {
        title: "Serialized Asset Tracking",
        description:
          "Implement unique serial numbers (AI 21) for high-value assets to ensure lifetime traceability and maintenance tracking.",
      },
    ],
    features: [
      "Certified GS1 barcode generation for SEC vendors",
      "Seamless integration with SAP EWM requirements",
      "Verify material tags to prevent rejection at delivery",
      "Expert guidance on technical specifications",
    ],
    idealFor: [
      "SEC Suppliers",
      "Energy Contractors",
      "Cable Manufacturers",
      "Electrical Equipment Vendors",
    ],
    image: "/images/service-detail/sec.png",
  },
  {
    title: "Tobacco Track & Trace",
    acronym: "Tax Stamp",
    slug: "tobacco-traceability",
    shortDescription: "Regulatory compliance for ZATCA tobacco tracking.",
    description:
      "A comprehensive solution for tobacco manufacturers and importers to comply with Saudi Arabia's Track and Trace regulations. Our system ensures that every pack, carton, and master case is uniquely identified, aggregated, and traceable from production to point of sale, preventing illicit trade and ensuring tax compliance.",
    modules: [
      {
        title: "Digital Tax Stamp Integration",
        description:
          "Seamlessly integrate GS1 identifiers with ZATCA's digital tax stamp system for automated reporting and verification.",
      },
      {
        title: "Multi-Level Aggregation",
        description:
          "Link individual packs to cartons and master cases (Parent-Child relationships) to simplify logistics and customs clearance.",
      },
      {
        title: "Anti-Illicit Trade",
        description:
          "Enable real-time verification of product authenticity to protect brand reputation and consumer safety.",
      },
    ],
    features: [
      "Full compliance with GCC and ZATCA regulations",
      "Serialization for anti-counterfeiting",
      "Real-time data sharing with regulatory bodies",
      "End-to-end supply chain visibility",
    ],
    idealFor: [
      "Tobacco Manufacturers",
      "Importers & Distributors",
      "Duty-Free Operators",
      "Compliance Officers",
    ],
    image: "/images/service-detail/tobacco.png",
  },
  {
    title: "Verified by GS1",
    acronym: "Verified",
    slug: "verified-by-gs1",
    shortDescription: "Global product authentication and consumer trust.",
    description:
      "Verified by GS1 is the world's most trusted product verification service. It allows consumers, retailers, and supply chain partners to instantly verify that a product's barcode data matches official GS1 registry information — fighting counterfeits, improving data quality, and building brand trust across every channel.",
    modules: [
      {
        title: "GS1 Registry Lookup",
        description:
          "Cross-check product identifiers against the official GS1 global registry to confirm authenticity and data accuracy in real time.",
      },
      {
        title: "Brand & Product Data Syndication",
        description:
          "Publish rich, verified product information — images, descriptions, certifications — to all trading partners from one trusted source.",
      },
      {
        title: "Consumer-Facing Verification",
        description:
          "Enable shoppers to scan a barcode or QR code and instantly see verified product details, fostering transparency and loyalty.",
      },
      {
        title: "Counterfeit Detection",
        description:
          "Identify duplicate or fraudulent barcodes circulating in the market and protect your brand's integrity.",
      },
    ],
    features: [
      "Globally recognized verification seal",
      "Reduce counterfeit products in the market",
      "Improve product data quality and consistency",
      "Build consumer trust and brand transparency",
      "Seamless integration with e-commerce platforms",
    ],
    idealFor: [
      "Brand Owners & Manufacturers",
      "Retail & E-Commerce",
      "Regulatory Bodies",
      "Consumer Goods Companies",
    ],
    image: "/images/service-detail/verified-by-gs1.png",
  },
  {
    title: "Traceability",
    acronym: "Trace",
    slug: "traceability",
    shortDescription: "End-to-end supply chain visibility from origin to consumer.",
    description:
      "GS1 Traceability solutions give businesses complete visibility of their products as they move through the supply chain. By capturing and sharing standardized data at every step — from raw material sourcing to final delivery — companies can respond rapidly to recalls, meet regulatory requirements, and build consumer confidence.",
    modules: [
      {
        title: "Batch & Lot Traceability",
        description:
          "Assign unique batch and lot numbers to production runs, enabling targeted recalls and quality investigations.",
      },
      {
        title: "Item-Level Serialization",
        description:
          "Apply unique serial numbers to every individual unit for granular, item-level tracking across the entire supply chain.",
      },
      {
        title: "Event Data Capture",
        description:
          "Record EPCIS (Electronic Product Code Information Services) events at each supply chain checkpoint for a full audit trail.",
      },
      {
        title: "Regulatory Compliance Reporting",
        description:
          "Generate and submit traceability reports required by Saudi Food & Drug Authority (SFDA) and other regulatory bodies.",
      },
    ],
    features: [
      "Rapid product recall capabilities",
      "Full compliance with SFDA traceability mandates",
      "Reduce waste and improve supply chain efficiency",
      "Real-time visibility from farm/factory to shelf",
      "Supports fresh food, pharma, and general trade",
    ],
    idealFor: [
      "Food & Beverage Producers",
      "Pharmaceutical Companies",
      "Agricultural Exporters",
      "Retailers & Distributors",
    ],
    image: "/images/service-detail/traceability.png",
  },
  {
    title: "Fixed Assets Management",
    acronym: "Assets",
    slug: "fixed-assets-management",
    shortDescription: "GS1-powered barcode solutions for asset tracking.",
    description:
      "Our Fixed Assets Management solution leverages GS1 standards to help organizations tag, track, and audit every physical asset — from IT equipment and machinery to furniture and vehicles. Eliminate manual spreadsheet errors, reduce asset loss, and maintain an always-accurate asset register.",
    modules: [
      {
        title: "Asset Tagging & Labeling",
        description:
          "Generate GS1-compliant barcode or RFID labels for every asset, ensuring unique identification throughout its lifecycle.",
      },
      {
        title: "Asset Register Integration",
        description:
          "Sync asset data with SAP, Oracle, or other ERP systems for real-time updates to your fixed asset register.",
      },
      {
        title: "Periodic Audit & Verification",
        description:
          "Conduct fast, mobile-based asset audits by scanning barcodes — eliminating time-consuming manual counting.",
      },
      {
        title: "Lifecycle & Maintenance Tracking",
        description:
          "Monitor asset condition, depreciation schedules, and maintenance history from acquisition to disposal.",
      },
    ],
    features: [
      "Reduce asset loss and ghost assets",
      "Accurate and up-to-date asset register",
      "Faster audit cycles with mobile scanning",
      "Integration with leading ERP platforms",
      "Compliance with IFRS 16 and local regulations",
    ],
    idealFor: [
      "Government & Public Sector",
      "Healthcare Facilities",
      "Manufacturing Plants",
      "Educational Institutions",
    ],
    image: "/images/service-detail/fixed-assets.png",
  },
  {
    title: "Healthcare Management",
    acronym: "Healthcare",
    slug: "healthcare-management",
    shortDescription: "GS1 standards for patient safety and medical traceability.",
    description:
      "Our Healthcare Management solution applies GS1 global standards to hospitals, pharmacies, and medical device manufacturers in Saudi Arabia. From accurate patient identification to drug and device traceability, GS1 standards reduce medication errors, streamline procurement, and ensure compliance with SFDA and MOH regulations.",
    modules: [
      {
        title: "Medical Device Identification (UDI)",
        description:
          "Assign and manage Unique Device Identifiers (UDIs) for surgical instruments, implants, and medical equipment in compliance with SFDA requirements.",
      },
      {
        title: "Pharmaceutical Traceability",
        description:
          "Serialize drug packages with GS1 DataMatrix codes to track medicines from manufacturer to patient, preventing counterfeits.",
      },
      {
        title: "Patient & Specimen Identification",
        description:
          "Implement GS1-compliant wristbands and specimen labels to eliminate patient misidentification events.",
      },
      {
        title: "Hospital Supply Chain Optimization",
        description:
          "Standardize procurement, receiving, and inventory processes across all hospital departments using GS1 identifiers.",
      },
    ],
    features: [
      "Reduce medication errors and adverse events",
      "SFDA and MOH compliance for drug serialization",
      "Accurate medical device lifecycle management",
      "Improved inventory visibility across hospital stores",
      "Interoperability with national health information systems",
    ],
    idealFor: [
      "Hospitals & Clinics",
      "Pharmacies & Distributors",
      "Medical Device Manufacturers",
      "Ministry of Health & SFDA",
    ],
    image: "/images/service-detail/healthcare.png",
  },
];
