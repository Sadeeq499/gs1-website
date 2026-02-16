"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  QrCode,
  ShieldCheck,
  Globe,
  Layers,
  ScanLine,
  FileCheck,
  Link2,
  BarChart3,
} from "lucide-react";

const tabs = [
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
    id: "zatca",
    label: "ZATCA & Compliance",
    icon: FileCheck,
  },
  {
    id: "traceability",
    label: "End-to-End Traceability",
    icon: BarChart3,
  },
];

const tabContent = {
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
    cta: "Discover Traceability",
  },
};

const stats = [
  { value: "2M+", label: "Barcodes Issued in KSA" },
  { value: "150+", label: "Countries Connected" },
  { value: "99.9%", label: "Scan Accuracy Rate" },
  { value: "2027", label: "Global Sunrise Deadline" },
];

export function BarcodeTechnologySection() {
  const [activeTab, setActiveTab] = useState("2d-barcodes");
  const content = tabContent[activeTab];

  return (
    <section className=" py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/15 font-bold border-primary/20">
            Standards & Technology
          </Badge>
          <h2 className="mt-4 text-primary text-3xl font-bold tracking-tight  md:text-4xl lg:text-5xl">
            Next-Generation Barcode Solutions for Saudi Arabia
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            From 2D barcodes and GS1 Digital Link to ZATCA compliance and
            end-to-end traceability -- one unified platform powering the
            {" Kingdom's"} digital transformation.
          </p>
        </div>

        {/* Stats Row */}
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border/50 bg-accent p-6 text-center transition-colors hover:bg-accent/50"
            >
              <div className="text-3xl font-bold text-secondary lg:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="mt-14 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-accent text-primary hover:bg-accent/20"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content -- Bento Grid */}
        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          {/* Large image card - spans 3 cols */}
          <Card className="group overflow-hidden border-0 shadow-lg lg:col-span-3">
            <div className="relative h-64 overflow-hidden lg:h-80">
              <img
                src={content.image}
                alt={content.headline}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 lg:p-8">
                <h3 className="text-2xl font-bold text-primary-foreground lg:text-3xl">
                  {content.headline}
                </h3>
              </div>
            </div>
            <CardContent className="p-6 lg:p-8">
              <p className="text-base leading-relaxed text-muted-foreground">
                {content.description}
              </p>
              <Button
                className="mt-6 bg-secondary text-white hover:bg-secondary/90"
                asChild
              >
                <a href="#">
                  {content.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Feature cards stack - spans 2 cols */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {content.features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="flex-1 border-0 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <CardHeader className="flex-row items-start gap-4 space-y-0 pb-2">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                      <Icon className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-bold text-foreground">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pl-[calc(2.75rem+1rem+1.5rem)]">
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.text}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Bottom Vision 2030 Banner */}
        <div className="mt-14 overflow-hidden rounded-2xl bg-primary p-8 lg:p-12">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-secondary">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-primary-foreground lg:text-2xl">
                Aligned with Saudi Vision 2030
              </h3>
              <p className="mt-2 text-primary-foreground/80">
                GS1 Saudi Arabia is your trusted partner in building a digitally
                connected, transparent, and globally competitive economy. Our
                standards power ZATCA compliance, SFDA traceability, and
                cross-border trade.
              </p>
            </div>
            <Button
              size="lg"
              className="shrink-0 bg-secondary text-white hover:bg-secondary/90"
              asChild
            >
              <a href="#">
                Partner with us
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
