"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

export function NewsSlider({ slides }) {
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-black text-primary mb-10 tracking-tight">Spotlight <span className="text-secondary italic">Insights</span></h2>
        <Carousel plugins={[plugin.current]} className="w-full">
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="relative h-[500px] w-full rounded-[3rem] overflow-hidden group">
                  <img src={slide.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-12 text-white max-w-2xl">
                    <Badge className="mb-4 bg-secondary text-white font-bold">{slide.tag}</Badge>
                    <h3 className="text-4xl font-bold mb-4">{slide.title}</h3>
                    <p className="text-white/80 text-lg leading-relaxed">{slide.desc}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}