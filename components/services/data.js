import {
  Barcode,
  ShieldCheck,
  MapPin,
  Package,
  Cigarette,
} from "lucide-react";

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
    heroImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=2000",
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
    images: {
      hero: "https://images.unsplash.com/photo-1589828952479-79737b8d8102?auto=format&fit=crop&q=80&w=2000",
      feature:
        "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=1200",
      banner:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000",
    },
  },
  {
    title: "Global Location Number",
    acronym: "GLN",
    slug: "global-location-number", // Updated slug
    shortDescription:
      "Identify physical locations and legal entities uniquely.",
    description:
      "The Global Location Number (GLN) uniquely identifies physical locations and legal entities. From a single shelf in a warehouse to an entire shipping dock, GLN offers the precision needed for modern logistics and supply chain management. It eliminates costly errors associated with confusing delivery addresses.",
    heroImage:
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=2000",
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
    images: {
      hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000",
      feature:
        "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200",
      banner:
        "https://images.unsplash.com/photo-1516549655169-df83a0674514?auto=format&fit=crop&q=80&w=2000",
    },
  },
  {
    title: "Serial Shipping Container Code",
    acronym: "SSCC",
    slug: "serial-shipping-container-code", // Updated slug
    shortDescription: "Track logistics units across the supply chain.",
    description:
      "The Serial Shipping Container Code (SSCC) acts as a license plate for your logistics units. It enables individual tracking of pallets, cases, and cartons as they move through the supply chain. It allows products to be received, tracked, and cross-docked without the need to open the package.",
    heroImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000",
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
    images: {
      hero: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000",
      feature:
        "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=1200",
      banner:
        "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&q=80&w=2000",
    },
  },
  {
    title: "Traceability for Utilities & Energy",
    acronym: "SEC",
    slug: "saudi-electricity-company",
    shortDescription:
      "Compliance solutions for Saudi Electricity Company (SEC) suppliers.",
    description:
      "Customized GS1 standards implementation for the energy sector, specifically designed to meet Saudi Electricity Company (SEC) requirements. We help suppliers implement Data Matrix barcodes for material tracking, incorporating Vendor Codes, PO Numbers, and Serial Numbers as mandated by SEC regulations.",
    heroImage:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=2000",
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
    images: {
      hero: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=2000",
      feature:
        "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1200",
      banner:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000",
    },
  },
  {
    title: "Tobacco Track & Trace",
    acronym: "Tax Stamp",
    slug: "tobacco-traceability",
    shortDescription: "Regulatory compliance for ZATCA tobacco tracking.",
    description:
      "A comprehensive solution for tobacco manufacturers and importers to comply with Saudi Arabia's Track and Trace regulations. Our system ensures that every pack, carton, and master case is uniquely identified, aggregated, and traceable from production to point of sale, preventing illicit trade and ensuring tax compliance.",
    heroImage:
      "https://images.unsplash.com/photo-1534951474654-88dbcc4354bd?auto=format&fit=crop&q=80&w=2000", // Industrial manufacturing abstract
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
    images: {
      hero: "https://images.unsplash.com/photo-1626266061368-46a813725c1e?auto=format&fit=crop&q=80&w=2000", // Warehouse/Logistics
      feature:
        "https://images.unsplash.com/photo-1565514020176-db7933f75cb2?auto=format&fit=crop&q=80&w=1200", // Tech/Scanning abstract
      banner:
        "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=2000", // Global trade map abstract
    },
  },
];
