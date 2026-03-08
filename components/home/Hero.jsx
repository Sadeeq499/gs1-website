"use client";

import * as React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { slides as dataSlides } from "./data";
import { ArrowRight, Globe } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Hero() {
  const t = useTranslations("home");
  const locale = useLocale();
  const translatedSlides = t.raw("hero.slides");

  const slides = dataSlides.map((slide, index) => ({
    ...slide,
    ...translatedSlides[index],
  }));

  return (
    <section className="relative w-full h-[500px] overflow-hidden bg-black text-white">
      <Carousel
        className="w-full h-full"
        opts={{
          loop: true,
          direction: locale === "ar" ? "rtl" : "ltr",
        }}
      >
        <CarouselContent className="h-full ml-0">
          {slides.map((slide) => (
            <CarouselItem
              key={slide.id}
              className="relative w-full h-full pl-0"
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority={slide.id === 1}
                />
                {/* Overlay Gradient - Blue to Transparent */}
                <div className="absolute inset-0 bg-linear-to-r from-blue-900/90 via-blue-900/60 to-transparent/20" />
              </div>

              {/* Content Container */}
              <div className="absolute inset-0 flex items-center">
                <div className="container px-4 md:px-6 mx-auto">
                  <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                    <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-sm text-white/90">
                      <Globe className="mr-2 h-3.5 w-3.5 rtl:mr-0 rtl:ml-2" />
                      {t("hero.badge")}
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
                      {slide.title}
                      <span className="text-secondary">{slide.highlight}</span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/90 max-w-[600px] leading-relaxed drop-shadow-md">
                      {slide.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        size="lg"
                        className="bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-full px-8 h-12 text-lg shadow-lg shadow-secondary/20 transition-all hover:-translate-y-0.5"
                        asChild
                      >
                        <a
                          href="http://213.136.82.130:1323/register/account-setup"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {slide.primaryCta}{" "}
                          <ArrowRight className="ml-2 h-5 w-5 rtl:ml-0 rtl:mr-2 rtl:-scale-x-100" />
                        </a>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-transparent border-white text-white hover:bg-white hover:text-primary font-semibold rounded-full px-8 h-12 text-lg transition-all hover:-translate-y-0.5"
                        asChild
                      >
                        <Link href="/services">{slide.secondaryCta}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Controls */}
        <div className="absolute right-4 bottom-8 flex gap-2 z-20 md:right-12 md:bottom-12 rtl:right-auto rtl:left-4 md:rtl:left-12">
          <CarouselPrevious className="static translate-y-0 h-12 w-12 border-white/20 bg-black/20 text-white hover:bg-white hover:text-primary backdrop-blur-sm transition-colors rtl:rotate-180" />
          <CarouselNext className="static translate-y-0 h-12 w-12 border-white/20 bg-black/20 text-white hover:bg-white hover:text-primary backdrop-blur-sm transition-colors rtl:rotate-180" />
        </div>
      </Carousel>
    </section>
  );
}
