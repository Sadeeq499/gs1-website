"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { tabs, tabContent, stats } from "./data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, ShieldCheck, QrCode } from "lucide-react";
import { useTranslations } from "next-intl";

export function BarcodeTechnologySection() {
  const [activeTab, setActiveTab] = useState("2d-barcodes");
  const t = useTranslations("home.technology");
  const translatedTabs = t.raw("tabs");
  const translatedStats = t.raw("stats");
  const translatedDetails = t.raw("barcodeDetails");

  const content = translatedTabs[activeTab];
  const baseContent = tabContent[activeTab];

  return (
    <section className=" py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/15 font-bold border-primary/20">
            {t("badge")}
          </Badge>
          <h2 className="mt-4 text-primary text-3xl font-bold tracking-tight leading-normal lg:leading-snug md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </div>

        {/* Stats Row */}
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {translatedStats.map((stat) => (
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
                {translatedTabs[tab.id].label}
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
                src={baseContent.image}
                alt={content.headline}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/30 to-transparent" />
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

              {/* Conditional Rendering using && */}
              <div className="mt-6 flex flex-wrap gap-4">
                {content?.cta && (
                  <Button
                    className="bg-secondary text-white hover:bg-secondary/90"
                    asChild
                  >
                    <a
                      href={`/solutions/${baseContent.slug}`}
                      className="flex items-center"
                    >
                      {content.cta}
                      <ArrowRight className="ml-2 h-4 w-4 rtl:-scale-x-100 rtl:mr-2 rtl:ml-0" />
                    </a>
                  </Button>
                )}
                {activeTab === "2d-barcodes" && (
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                    asChild
                  >
                    <a
                      href="https://www.gs1.org/sites/default/files/2023-06/gs1_barcodes_fact_sheet-overview_of_all_gs1_2d_barcodes-final_v1.0.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      {translatedDetails.learnMore2d}
                      <ArrowRight className="ml-2 h-4 w-4 rtl:-scale-x-100 rtl:mr-2 rtl:ml-0" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Feature cards stack - spans 2 cols */}
          {/* Feature cards stack - spans 2 cols */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {activeTab === "2d-barcodes" ? (
              <>
                {/* QR Code Card */}
                <Card className="flex flex-col border-0 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg p-5 flex-1 justify-center">
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start h-full">
                    {/* Left/Top Part: titles & barcode */}
                    <div className="flex flex-col items-center sm:items-start gap-3 shrink-0 w-full sm:w-auto sm:min-w-[140px]">
                      <div className="text-center sm:text-left rtl:sm:text-right w-full">
                        <h4 className="text-lg font-bold text-primary">
                          {translatedDetails.qrCode.title}
                        </h4>
                        <p className="text-[0.65rem] font-bold text-secondary uppercase leading-tight mt-0.5">
                          {translatedDetails.qrCode.subTitle}
                        </p>
                      </div>
                      <div className="flex flex-col items-center bg-white p-2.5 rounded-xl border border-border shadow-sm text-center">
                        <QrCode
                          className="w-16 h-16 text-foreground"
                          strokeWidth={1.5}
                        />
                        <span className="text-[0.60rem] font-mono font-medium text-foreground mt-2 tracking-wider">
                          (01)06281207311511
                        </span>
                      </div>
                    </div>

                    {/* separator line on mobile/tablet */}
                    <div className="h-px w-full sm:w-px sm:h-full bg-border/60 shrink-0"></div>

                    {/* Right Part: List */}
                    <div className="flex-1 text-sm text-foreground/80 space-y-2.5 w-full flex flex-col justify-center">
                      {[
                        { label: translatedDetails.qrCode.symbolIdLabel, value: "]Q1" },
                        {
                          label: translatedDetails.qrCode.capacityLabel,
                          value: translatedDetails.qrCode.capacityValue,
                        },
                        {
                          label: "",
                          value: translatedDetails.qrCode.featureLink,
                        },
                        { label: "", value: translatedDetails.qrCode.featureKeys },
                        { label: "", value: translatedDetails.qrCode.featureAttributes },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-[0.8rem] sm:text-sm"
                        >
                          <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                          <span className="leading-snug">
                            {item.label && (
                              <strong className="text-foreground">
                                {item.label}{" "}
                              </strong>
                            )}
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* GS1 DataMatrix Card */}
                <Card className="flex flex-col border-0 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg p-5 flex-1 justify-center">
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start h-full">
                    {/* Left/Top part */}
                    <div className="flex flex-col items-center sm:items-start gap-3 shrink-0 w-full sm:w-auto sm:min-w-[140px]">
                      <div className="text-center sm:text-left rtl:sm:text-right w-full">
                        <h4 className="text-lg font-bold text-primary leading-tight">
                          {translatedDetails.dataMatrix.title}
                        </h4>
                        <p className="text-lg font-bold text-primary leading-tight">
                          {translatedDetails.dataMatrix.titleSuffix}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-border shadow-sm">
                        <div className="shrink-0 pb-1">
                          {/* Custom DataMatrix pseudo-SVG */}
                          <svg
                            viewBox="0 0 24 24"
                            className="w-12 h-12 text-foreground"
                            fill="currentColor"
                          >
                            <path d="M 2 2 L 2 22 L 22 22 L 22 20 L 4 20 L 4 2 Z" />
                            <rect x="4" y="2" width="2" height="2" />
                            <rect x="8" y="2" width="2" height="2" />
                            <rect x="12" y="2" width="2" height="2" />
                            <rect x="16" y="2" width="2" height="2" />
                            <rect x="20" y="2" width="2" height="2" />
                            <rect x="20" y="6" width="2" height="2" />
                            <rect x="20" y="10" width="2" height="2" />
                            <rect x="20" y="14" width="2" height="2" />
                            <rect x="20" y="18" width="2" height="2" />
                            <rect x="6" y="6" width="4" height="4" />
                            <rect x="12" y="6" width="4" height="2" />
                            <rect x="16" y="10" width="2" height="4" />
                            <rect x="8" y="12" width="6" height="6" />
                            <rect x="16" y="16" width="2" height="2" />
                            <rect x="4" y="14" width="2" height="2" />
                          </svg>
                        </div>
                        {/* Codes */}
                        <div className="text-[0.60rem] font-mono leading-tight tracking-widest text-foreground flex flex-col justify-center gap-0.5">
                          <span>(01)06281207311504</span>
                          <span>(10)PC12365</span>
                          <span>(17)271231</span>
                          <span>(21)PC123454321Y1</span>
                        </div>
                      </div>
                    </div>

                    {/* separator */}
                    <div className="h-px w-full sm:w-px sm:h-full bg-border/60 shrink-0"></div>

                    {/* Right part: List */}
                    <div className="flex-1 text-sm text-foreground/80 space-y-2.5 w-full flex flex-col justify-center">
                      {[
                        { label: translatedDetails.dataMatrix.symbolIdLabel, value: "]d2" },
                        {
                          label: translatedDetails.dataMatrix.capacityLabel,
                          value: translatedDetails.dataMatrix.capacityValue,
                        },
                        {
                          label: "",
                          value: translatedDetails.dataMatrix.featureSyntax,
                        },
                        { label: "", value: translatedDetails.dataMatrix.featureKeys },
                        { label: "", value: translatedDetails.dataMatrix.featureAttributes },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-[0.8rem] sm:text-sm"
                        >
                          <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                          <span className="leading-snug">
                            {item.label && (
                              <strong className="text-foreground">
                                {item.label}{" "}
                              </strong>
                            )}
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </>
            ) : (
              content.features.map((feature, index) => {
                const Icon = baseContent.features[index].icon;
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
              })
            )}
          </div>
        </div>

        {/* Bottom Vision 2030 Banner */}
        {/* <div className="mt-14 overflow-hidden rounded-2xl bg-primary p-8 lg:p-12">
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
        </div> */}
      </div>
    </section>
  );
}
