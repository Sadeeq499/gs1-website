// data.js
export const standardsPillars = [
  {
    slug: "identify",
    title: "Identify",
    acronym: "Global Identification Keys",
    shortDescription: "The foundation of the GS1 System, providing unique identities for products, services, and locations globally.",
    overviewTitle: "Standardized Identification for Global Trade",
    description: "GS1 Identification Keys are the core of our standards. They allow organizations to assign standard identifiers to products, documents, and physical locations. In the Kingdom of Saudi Arabia, these keys are essential for enabling seamless trade and regulatory compliance within the global supply chain.",
    accentColor: "#002C6C",
    heroImage:"https://gs1eg.org/wp-content/uploads/2025/07/GS1-Standards-4.png",
    modules: [
      {
        title: "GTIN (Global Trade Item Number)",
        description: "The most widely used ID key globally. Mandatory for retail, Noon/Amazon, and essential for accurate inventory.",
        image: "/images/GTIN.png"
      },
      {
        title: "GLN (Global Location Number)",
        description: "Identifies physical locations and legal entities. Precise 'ship-to' accuracy across Saudi Arabia.",
        image: "/images/GLN.png"
      },
      {
        title: "SSCC (Serial Shipping Container Code)",
        description: "The 'License Plate' for logistics units. End-to-end tracking for pallets and crates from factory to consumer.",
        image: "/images/SSCC.png"
      },
      // {
      //   title: "GSRN (Service Relation Number)",
      //   description: "Identifies service provider/recipient relationships, such as a patient in an SFDA healthcare context.",
      //   image: "/images/GSRN.png"
      // },
      // {
      //   title: "GDTI (Document Type Identifier)",
      //   description: "Enables document type identification, widely used in customs (FASAH) and administrative automation.",
      //   image: "/images/GDTI.png"
      // }
    ],
    featuresTitle: "Strategic Benefits of GS1 Identification",
    features: [
      { title: "Global Uniqueness", detail: "Ensures no two products globally share the same ID." },
      { title: "Market Access", detail: "Required by KSA retailers and global marketplaces." },
      { title: "Regulatory Compliance", detail: "Meets SFDA requirements for healthcare tracking." },
      { title: "Data Integrity", detail: "Foundation for accurate master data synchronization." }
    ],
    ctaTitle: "Establish Your Unique Identity",
    ctaDescription: "Ready to assign global identifiers to your products? Join GS1 Saudi Arabia today.",
    ctaButton: "Get Started Now"
  },
  {
    slug: "capture",
    title: "Capture",
    acronym: "Data Carriers (Barcodes & RFID)",
    shortDescription: "Bridging physical products to digital systems through standardized barcodes and RFID.",
    overviewTitle: "Precision in Automated Data Capture",
    description: "GS1 Capture standards define how data is encoded within physical carriers—barcodes and RFID tags. This allows machines to read information instantly, speeding up transactions across Saudi retail, logistics, and healthcare sectors.",
    accentColor: "#FE5000",
    heroImage:"https://gs1eg.org/wp-content/uploads/2025/07/GS1-Standards-2.png",
    modules: [
      {
        title: "Linear Barcodes (EAN/UPC)",
        description: "Checkout scanning with 99.9% accuracy, facilitating billions of daily retail transactions.",
        image: "/images/Linear Barcodes.png"
      },
      {
        title: "GS1 DataMatrix",
        description: "2D carrier for mass data (batch, expiry, serial). Mandatory for SFDA pharmaceutical tracking.",
        image: "/images/DataMatrix.png"
      },
      {
        title: "GS1 QR / Digital Link",
        description: "Connects consumers to landing pages, nutritional info, and warranty details using smartphones.",
        image: "/images/Digital Link.png"
      },
      // {
      //   title: "EPC/RFID",
      //   description: "Radio Frequency ID. Bulk scanning and real-time tracking without direct line-of-sight.",
      //   image: "/images/EPCRFID.png"
      // }
    ],
    featuresTitle: "Why Data Capture Matters",
    features: [
      { title: "Processing Speed", detail: "Scan hundreds of items in seconds with RFID." },
      { title: "Zero Error Rate", detail: "Removes human error from manual data entry." },
      { title: "Real-time Visibility", detail: "Instant inventory updates across all channels." },
      { title: "Safety Recalls", detail: "Scan batch data for immediate product withdrawal." }
    ],
    ctaTitle: "Modernize Your Scanning Systems",
    ctaDescription: "Contact our technical experts to choose the right data carrier.",
    ctaButton: "Technical Support"
  },
  {
    slug: "share",
    title: "Share",
    acronym: "Data Interchange (EDI & GDSN)",
    shortDescription: "Enabling seamless communication and master data synchronization between partners.",
    overviewTitle: "Synchronized Interoperability",
    description: "GS1 Share standards ensure that trading partners—from manufacturers in Riyadh to retailers in Jeddah—use the same verified master data, transaction details, and event visibility for a seamless supply chain.",
    accentColor: "#0072CE",
    heroImage:"https://gs1eg.org/wp-content/uploads/2025/07/GS1-Standards-3.png",
   modules: [
      {
        title: "GDSN (Global Data Sync)",
        description: "Automated exchange of verified product master data. Retailer display matches manufacturer data.",
        image: "/images/GDSN.png"
      },
      {
        title: "EDI (Electronic Data Interchange)",
        description: "The standard for paperless B2B. Automates Purchase Orders, Invoices, and Advance Shipping Notices (ASN).",
        image: "/images/EDI.png"
      },
      {
        title: "EPCIS (Event Visibility)",
        description: "Supply chain traceability. Partners share event data on 'What, Where, When, and Why' a movement occurred.",
        image: "/images/EPCIS.png"
      },
      // {
      //   title: "Global Data Model",
      //   description: "A framework for consistent product data structured for omni-channel commerce and digital catalogs.",
      //   image: "/images/Global Data Model.png"
      // }
    ],  
    featuresTitle: "The Power of Shared Data",
    features: [
      { title: "Trusted Source", detail: "Ensure product data comes from verified manufacturers." },
      { title: "Operational Efficiency", detail: "Automate orders and invoicing to save time/costs." },
      { title: "Traceability", detail: "Enable full end-to-end visibility for safety." },
      { title: "Consumer Trust", detail: "Provide accurate digital info to the end consumer." }
    ],
    ctaTitle: "Connect Your Supply Chain",
    ctaDescription: "Implement GS1 sharing standards to streamline your B2B communications.",
    ctaButton: "Learn About GDSN"
  }
];