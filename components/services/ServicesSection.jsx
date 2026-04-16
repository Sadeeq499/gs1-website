"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { services } from "./data"; 
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const t = useTranslations("services");

  return (
    <section className="py-12 bg-[#F8FAFC]">
      <div className="container mx-auto px-4">
        {/* Header - Compact */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2">
            {t("section.title")}
          </h2>
          <p className="text-slate-500 text-sm">
            {t("section.description")}
          </p>
        </div>

        {/* Smart Grid - 4 Columns for smaller card width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => {
            const isAltColor = service.id === "gln" || service.id === "sec";
            const imageSrc = service.image || service.imageUrl;

            return (
              <Card 
                key={service.id} 
                className="group flex flex-col bg-white border pt-0 border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden"
              >
                {/* 1. Image Area - Aspect ratio 16:9 for compactness */}
                <div className="relative aspect-[16/9] w-full bg-[#f0f9ff] flex items-center justify-center p-4">
                  {imageSrc && (
                    <Image
                      src={imageSrc}
                      alt={service.id}
                      fill
                      className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                </div>

                {/* 2. Content - Tighter Padding */}
                <div className="flex flex-col p-4 flex-grow">
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-[15px] font-bold text-slate-800 leading-tight group-hover:text-primary transition-colors">
                      {t(`items.${service.slug}.title`)}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-0 flex-grow">
                    {/* Strict line clamping to keep cards uniform height */}
                    <CardDescription className="text-[12px] text-slate-500 leading-relaxed line-clamp-3 min-h-[3.2rem]">
                      {t(`items.${service.slug}.description`)}
                    </CardDescription>
                  </CardContent>

                  {/* 3. Footer - Smaller buttons and links */}
                  <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                    <Link 
                      href={`/services/${service.slug}`}
                      className="text-[11px] font-bold text-primary flex items-center gap-1 hover:underline"
                    >
                      {t("section.learn_more")}
                      <ArrowRight className="w-3 h-3" />
                    </Link>

                    <Button
                      asChild
                      size="sm"
                      className={`h-7 px-3 rounded-md text-[10px] font-bold shadow-none ${
                        isAltColor ? "bg-secondary" : "bg-primary"
                      }`}
                    >
                      <a href={process.env.NEXT_PUBLIC_MEMBER_REGISTER} target="_blank">
                        {/* FIX: Use .title if .short_btn is missing, or just a default string */}
                        {t.has(`items.${service.slug}.short_btn`) 
                          ? t(`items.${service.slug}.short_btn`) 
                          : "Get Started"}
                        <ExternalLink className="w-2.5 h-2.5 ml-1 opacity-80" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;