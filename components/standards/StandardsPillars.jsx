import React from "react";
import { Eye, Target, Share2, ArrowRight } from "lucide-react";
import Image from "next/image";

const pillars = [
  {
    id: "identify",
    title: "Identify",
    subtitle: "Unique Identification",
    description:
      "GS1 identification keys uniquely track products, locations, assets, and services across the entire supply chain with unparalleled precision.",
    icon: Eye,
    image: "https://gs1eg.org/wp-content/uploads/2025/07/GS1-Standards-4.png",
    stats: [
      { label: "Product Types", value: "100M+" },
      { label: "Accuracy Rate", value: "99.9%" },
    ],
    colorClass: "text-primary",
    bgClass: "bg-primary",
  },
  {
    id: "capture",
    title: "Capture",
    subtitle: "Data Capture",
    description:
      "GS1 standards streamline operations, reduce errors, and enhance supply chain efficiency through advanced barcode and RFID data capture technologies.",
    icon: Target,
    image: "https://gs1eg.org/wp-content/uploads/2025/07/GS1-Standards-2.png",
    stats: [
      { label: "Scan Speed", value: "<1s" },
      { label: "Error Reduction", value: "83%" },
    ],
    colorClass: "text-secondary",
    bgClass: "bg-secondary",
  },
  {
    id: "share",
    title: "Share",
    subtitle: "Data Sharing",
    description:
      "GS1 standards streamline the sharing of master data, transaction data, and event data between trading partners seamlessly and securely.",
    icon: Share2,
    image: "https://gs1eg.org/wp-content/uploads/2025/07/GS1-Standards-3.png",
    stats: [
      { label: "Partners Connected", value: "500K+" },
      { label: "Data Points Shared", value: "1B+/day" },
    ],
    colorClass: "text-primary",
    bgClass: "bg-primary",
  },
];

function PillarCard({ pillar, index }) {
  const Icon = pillar.icon;
  const isReversed = index % 2 !== 0;

  return (
    <div className="group relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      {/* Content side */}
      <div className={`flex flex-col gap-6 ${isReversed ? "lg:order-2" : ""}`}>
        {/* Number + label */}
        <div className="flex items-center gap-4">
          <span
            className={`text-7xl md:text-8xl font-bold opacity-10 leading-none ${pillar.colorClass}`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
              {pillar.subtitle}
            </p>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">
              {pillar.title}
            </h3>
          </div>
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed">
          {pillar.description}
        </p>

        {/* Stats */}
        <div className="flex gap-8">
          {pillar.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className={`text-2xl font-bold ${pillar.colorClass}`}>
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <button
          className={`group/btn inline-flex items-center gap-2 text-sm font-semibold w-fit transition-colors ${pillar.colorClass}`}
        >
          Learn more about {pillar.title}
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>

      {/* Image side */}
      <div className={`relative ${isReversed ? "lg:order-1" : ""}`}>
        <div className="relative overflow-hidden rounded-2xl aspect-[4/3] group-hover:shadow-2xl transition-shadow duration-500">
          <Image
            src={pillar.image}
            alt={`${pillar.title} - ${pillar.subtitle}`}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay */}
          {/* <div
            className={`absolute inset-0 opacity-40 mix-blend-multiply ${pillar.bgClass}`}
          /> */}
          {/* Icon floating */}
          <div className="absolute bottom-6 right-6 w-16 h-16 rounded-2xl bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <Icon className={`w-8 h-8 ${pillar.colorClass}`} />
          </div>
        </div>
        {/* Decorative accent */}
        <div
          className={`absolute -z-10 w-full h-full top-4 left-4 rounded-2xl opacity-10 ${pillar.bgClass}`}
        />
      </div>
    </div>
  );
}

const StandardsPillars = () => {
  return (
    <section className="py-16  bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/5 rounded-full px-5 py-2 mb-6">
            <span className="text-sm font-medium text-primary tracking-wide">
              Core Framework
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 text-balance">
            The Three Pillars of GS1 Standards
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A comprehensive framework that enables businesses worldwide to
            identify, capture, and share data seamlessly across the supply
            chain.
          </p>
        </div>

        {/* Pillars */}
        <div className="flex flex-col gap-24 md:gap-32">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.id} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StandardsPillars;
