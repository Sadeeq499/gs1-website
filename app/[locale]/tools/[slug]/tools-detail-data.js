import { 
  Calculator, 
  BarChart3, 
  ShieldCheck, 
  Search, 
  Globe, 
  FileCheck, 
  Boxes 
} from "lucide-react";

export const toolsDetails = {
  "check-digit-calculator": {
    icon: Calculator,
    hero: {
      image: "/assets/images/tools/calculator-hero.jpg",
      gradient: "from-[#002c5c] to-primary",
    },
    features: [
      { icon: ShieldCheck, color: "blue" },
      { icon: FileCheck, color: "gold" },
      { icon: Search, color: "blue" }
    ],
    howToUse: {
      steps: [
        { id: 1, icon: "MousePointerClick" },
        { id: 2, icon: "Type" },
        { id: 3, icon: "CheckCircle2" }
      ]
    },
    faq: [
      { id: "faq-1" },
      { id: "faq-2" }
    ],
    cta: {
      link: "/contact-us",
      style: "primary"
    }
  },
  "gtin-management": {
    icon: BarChart3,
    hero: {
      image: "/assets/images/tools/gtin-hero.jpg",
      gradient: "from-primary to-[#00529b]",
    },
    features: [
      { icon: Boxes, color: "gold" },
      { icon: BarChart3, color: "blue" },
      { icon: Globe, color: "blue" }
    ],
    howToUse: {
      steps: [
        { id: 1, icon: "ClipboardList" },
        { id: 2, icon: "Layers" },
        { id: 3, icon: "TrendingUp" },
        { id: 4, icon: "Key" }
      ]
    },
    faq: [
      { id: "gtin-faq-1" }
    ],
    cta: {
      link: "/get-barcode",
      style: "gold"
    }
  },
  "verified-by-gs1": {
    icon: ShieldCheck,
    hero: {
      image: "/assets/images/tools/verified-hero.jpg",
      gradient: "from-[#002c5c] via-primary to-blue-900",
    },
    features: [
      { icon: Search, color: "blue" },
      { icon: Globe, color: "gold" },
      { icon: ShieldCheck, color: "blue" }
    ],
    howToUse: {
      steps: [
        { id: 1, icon: "ScanBarcode" },
        { id: 2, icon: "Database" },
        { id: 3, icon: "FileSearch" }
      ]
    },
    faq: [
      { id: "ver-faq-1" },
      { id: "ver-faq-2" }
    ],
    cta: {
      link: "/services/verified-by-gs1",
      style: "primary"
    }
  },
  "gepir": {
    icon: Globe,
    hero: {
      image: "/assets/images/tools/gepir-hero.jpg",
      gradient: "from-primary to-black",
    },
    features: [
      { icon: Globe, color: "blue" },
      { icon: Search, color: "gold" }
    ],
    howToUse: {
      steps: [
        { id: 1, icon: "Globe2" },
        { id: 2, icon: "Fingerprint" },
        { id: 3, icon: "Info" }
      ]
    },
    faq: [
      { id: "gepir-faq-1" }
    ],
    cta: {
      link: "https://www.gs1.org/services/gepir",
      style: "external"
    }
  }
};