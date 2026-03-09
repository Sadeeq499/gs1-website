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
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export function BarcodeTechnologySection() {
  const [activeTab, setActiveTab] = useState("2d-barcodes");
  const t = useTranslations("home.technology");
  const translatedTabs = t.raw("tabs");
  const translatedStats = t.raw("stats");

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
              <Button
                className="mt-6 bg-secondary text-white hover:bg-secondary/90"
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
            </CardContent>
          </Card>

          {/* Feature cards stack - spans 2 cols */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {content.features.map((feature, index) => {
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
            })}
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
