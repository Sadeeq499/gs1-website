export const PARTNERS_DATA = {
  metadata: {
    title: "Strategic Partners | GS1 Saudi Arabia",
    description: "Explore the ecosystem of GS1 Saudi Arabia's strategic partners, including SFDA, ZATCA, and SASO, driving global standards and Saudi Vision 2030.",
  },
  hero: {
    badge: "GS1 SA Ecosystem",
    title: "Building the Future of",
    titleHighlight: "Saudi Trade",
    titleSuffix: "through Collaboration",
    description: "At GS1 Saudi Arabia, we partner with government authorities and industry leaders to drive Vision 2030 through standardized digital transformation and global identification.",
    ctaText: "Become a Partner",
  },
  regulatory: [
    { 
      title: "SFDA", 
      sub: "Drug Traceability", 
      desc: "Implementing GS1 DataMatrix for the RSD system to ensure pharmaceutical safety.", 
      icon: "ShieldCheck" 
    },
    { 
      title: "ZATCA", 
      sub: "E-Invoicing", 
      desc: "Phase 2 Fatoora integration utilizing GLNs for seamless B2B transaction identification.", 
      icon: "Landmark" 
    },
    { 
      title: "SASO", 
      sub: "SABER Platform", 
      desc: "Product conformity and GTIN registration requirements for the Saudi market.", 
      icon: "ShoppingBag" 
    }
  ],
  providers: {
    badge: "GS1 SA NETWORK",
    title: "Strategic",
    titleHighlight: "Partnerships",
    exploreText: "Explore more",
    detailsText: "Partner Details",
    impactLabel: "Key Impact",
   list: [
    // { 
    //   name: "FSC", 
    //   full: "Federation of Saudi Chambers", 
    //   type: "Strategic Partner", 
    //   logo: "/images/FSC.png", 
    //   desc: "The primary representative of the Saudi business community, ensuring global standards for local commerce.",
    //   impact: "SME Support & Vision 2030",
    //   url: "https://fsc.org.sa"
    // },
    { 
      name: "SFDA", 
      full: "Saudi Food & Drug Authority", 
      type: "Regulatory Partner", 
      logo: "/images/SFDA.png",
      desc: "Mandating GS1 DataMatrix for the National Drug Track and Trace System (Rasad).",
      impact: "Healthcare Traceability",
      url: "https://www.sfda.gov.sa"
    },
    { 
      name: "ZATCA", 
      full: "Zakat, Tax and Customs Authority", 
      type: "Government Partner", 
      logo: "/images/ZATCA.svg", 
      desc: "Collaborating on E-Invoicing (Fatoora) standards using Global Location Numbers (GLN).",
      impact: "E-Invoicing & Customs",
      url: "https://zatca.gov.sa"
    },
    { 
      name: "SASO", 
      full: "Saudi Standards & Quality Org", 
      type: "Standards Partner", 
      logo: "/images/SASO.png",
      desc: "Standardizing product conformity (SABER) via Global Trade Item Numbers (GTIN).",
      impact: "Technical Compliance",
      url: "https://www.saso.gov.sa"
    },
    { 
      name: "MOH", 
      full: "Ministry of Health", 
      type: "Strategic Partner", 
      logo: "/images/MOH.svg",
      desc: "Adopting GS1 standards for medical device identification and patient safety.",
      impact: "Patient Safety (UDI)",
      url: "https://www.moh.gov.sa"
    }
  ]
  },
  marketplace: {
    badge: "E-Commerce Enablement",
    title: "Unlock the Kingdom's",
    titleHighlight: "Digital Marketplaces",
    description: "GS1 Saudi Arabia provides the authentic GTINs and identifiers required to list and sell your products on major platforms, ensuring global discoverability and consumer trust.",
    features: [
      "Official & Verified Product Identification",
      "Global Standards Compliance"
    ],
    ctaPrimary: "Get Your GTINs",
    ctaSecondary: "Learn More",
    platforms: [
      {
        name: "Amazon.sa",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        label: "Sell on Amazon",
        description: "GTINs are mandatory for listing on Amazon's global catalog.",
        delay: 0.1
      },
      {
        name: "Noon.com",
        logo: "https://cdn.worldvectorlogo.com/logos/noon-2.svg", // Replaced base64 for clarity
        label: "Expand on Noon",
        description: "Unique product identification ensures accurate listing on Noon.",
        delay: 0.2
      }
    ]
  },
  cta: {
    title: "Ready to Partner?",
    description: "Join the global network of 116 countries and thousands of Saudi companies.",
    primaryBtn: "Apply as Provider",
    secondaryBtn: "Inquire Now"
  }
};