import { Bell, Calendar, ShieldCheck, Zap } from "lucide-react";

export const INSIGHTS_DATA = {
  metadata: {
    title: "Insights & News | GS1 Saudi Arabia",
    description: "Latest 2026 updates on SFDA RSD mandates, ZATCA integration, and the Kingdom's roadmap to 2D barcodes.",
  },
    sliderNews: [
  {
    id: 1,
    badge: "Strategic Initiative",
    title: "Global Migration to",
    highlight: "2D Barcodes",
    description: "Preparing the Saudi retail landscape for 'Sunrise 2027'. Transitioning from traditional EAN barcodes to data-rich QR codes for enhanced consumer transparency.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80",
    date: "Ongoing Deployment",
    location: "Nationwide Retailers",
    cta: "View Roadmap",
    icon: <Zap className="h-4 w-4" />
  },
  {
    id: 2,
    badge: "Healthcare Update",
    title: "Advancing Patient Safety via",
    highlight: "RSD Tracking",
    description: "Strengthening the Kingdom's pharmaceutical supply chain. Leveraging GS1 DataMatrix standards to ensure 100% medicine traceability and combat counterfeit drugs.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
    date: "Live Compliance",
    location: "SFDA Regulated Entities",
    cta: "Compliance Guide",
    icon: <ShieldCheck className="h-4 w-4" />
  },
  {
    id: 3,
    badge: "Upcoming Webinar",
    title: "Mastering the New",
    highlight: "GS1 Digital Link",
    description: "Join our technical experts to learn how one QR code can connect your products to the web, providing unlimited information to consumers and retailers alike.",
    image: "/images/degital.jpg",
    date: "April 12, 2026",
    location: "Virtual Conference",
    cta: "Book My Seat",
    icon: <Calendar className="h-4 w-4" />
  },
  {
    id: 4,
    badge: "National Pride",
    title: "Empowering Local Goods",
    highlight: "Saudi Made Program",
    description: "Standardizing the '628' prefix for Saudi-manufactured products. Enhancing the global competitiveness of local industries through universal identification.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
    date: "Annual Update",
    location: "Industrial Cities, KSA",
    cta: "Register Product",
    icon: <Bell className="h-4 w-4" />
  },
  {
    id: 5,
    badge: "Logistics Excellence",
    title: "The Future of Warehousing",
    highlight: "SSCC Standards",
    description: "Optimizing logistics via Serial Shipping Container Codes. Improving visibility and efficiency in the Saudi transportation and logistics sector.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    date: "Workshop Series",
    location: "Jeddah & Dammam",
    cta: "Join Workshop",
    icon: <Zap className="h-4 w-4" />
  }
],
spotlightCards:{
  header: {
    badge: "GS1 Saudi Arabia Insights",
    title: "Spotlight",
    highlight: "Insights",
    description: "Expert analysis on global standards, regulatory compliance, and the future of supply chains in the Kingdom."
  },
  items: [
    {
      id: "rsd_2026",
      tag: "Urgent",
      date: "Feb 26, 2026",
      title: "SFDA RSD Update: Veterinary Serialization 2026",
      desc: "Mandatory GS1 DataMatrix implementation for all veterinary pharmaceutical products in the Kingdom enters force in Q1 2026. Ensure your compliance today.",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800",
      url: "/insights/veterinary-serialization",
      readTime: "4 min read"
    },
    {
      id: "un_forum",
      tag: "Global",
      date: "Feb 22, 2026",
      title: "KSA to Host UN Global Supply Chain Forum",
      desc: "Riyadh has been selected as the 2026 hub to discuss digital trade corridors and GS1's role in the Global Supply Chain Resilience Initiative (GSCRI).",
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800",
      url: "/insights/global-supply-chain",
      readTime: "6 min read"
    },
    {
      id: "sunrise_2d",
      tag: "Retail",
      date: "Feb 15, 2026",
      title: "The 2D Sunrise: KSA Retailers Pilot QR Codes",
      desc: "Following the GS1 Global Roadmap, major Saudi retailers are now upgrading POS systems to scan GS1 Digital Link by 2027 for richer consumer data.",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800",
      url: "/insights/2d-sunrise",
      readTime: "5 min read"
    }
  ]
},
  news: [
    {
      category: "Healthcare",
      date: "Feb 12, 2026",
      title: "King Faisal Hospital Achieves 99% Traceability",
      excerpt: "A landmark achievement in patient safety using GLN (Global Location Numbers) for bedside medication verification.",
    },
    {
      category: "Regulatory",
      date: "Jan 30, 2026",
      title: "ZATCA Phase 2: Wave 22 Integration Guidelines",
      excerpt: "New technical requirements for businesses with turnover exceeding 1M SAR to integrate with the Fatoora portal.",
    },
    {
      category: "Innovation",
      date: "Dec 15, 2025",
      title: "The Future of 'Manih' & GS1 Standards",
      excerpt: "How SASO is integrating GS1 identifiers to streamline the issuance of Certificates of Conformity on the SABER platform.",
    }
  ]
};