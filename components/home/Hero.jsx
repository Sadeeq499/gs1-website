"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80",
    title: "The Global Language of Business",
    highlight: "Business",
    description:
      "GS1 Saudi Arabia empowers your supply chain with global standards for identification, capturing, and sharing information.",
    primaryCta: "Get a Barcode",
    secondaryCta: "Explore Services",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80",
    title: "Seamless Retail Experience",
    highlight: "Transform",
    description:
      "Enhance customer satisfaction and operational efficiency with our cutting-edge retail solutions and standards.",
    primaryCta: "Retail Solutions",
    secondaryCta: "Learn More",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80",
    title: "Connect with Confidence",
    highlight: "Globally",
    description:
      "Join a network of over 2 million companies worldwide using GS1 standards to do business with confidence.",
    primaryCta: "Become a Member",
    secondaryCta: "Our Network",
  },
];

export default function Hero() {
  return (
    <section className="relative w-full h-[450px] overflow-hidden bg-black text-white">
      <Carousel
        className="w-full h-full"
        opts={{
          loop: true,
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
                      <Globe className="mr-2 h-3.5 w-3.5" />
                      Member of GS1 Global Organization
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
                      {slide.title.replace(slide.highlight, "")}
                      <span className="text-secondary">{slide.highlight}</span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/90 max-w-[600px] leading-relaxed drop-shadow-md">
                      {slide.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        size="lg"
                        className="bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-full px-8 h-12 text-lg shadow-lg shadow-secondary/20 transition-all hover:-translate-y-0.5"
                      >
                        {slide.primaryCta}{" "}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-transparent border-white text-white hover:bg-white hover:text-primary font-semibold rounded-full px-8 h-12 text-lg transition-all hover:-translate-y-0.5"
                      >
                        {slide.secondaryCta}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Controls */}
        <div className="absolute right-4 bottom-8 flex gap-2 z-20 md:right-12 md:bottom-12">
          <CarouselPrevious className="static translate-y-0 h-12 w-12 border-white/20 bg-black/20 text-white hover:bg-white hover:text-primary backdrop-blur-sm transition-colors" />
          <CarouselNext className="static translate-y-0 h-12 w-12 border-white/20 bg-black/20 text-white hover:bg-white hover:text-primary backdrop-blur-sm transition-colors" />
        </div>
      </Carousel>
    </section>
  );
}
