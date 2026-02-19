"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const TrainingGrid = ({ data }) => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-black text-primary mb-12 border-l-4 border-secondary pl-6">
          {data.heading}
        </h2>
        
        <Carousel 
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 5000 })]}
        >
          <CarouselContent className="-ml-6">
            {data.items.map((item, i) => (
              <CarouselItem key={i} className="pl-6 md:basis-1/2 lg:basis-1/3">
                <Card className="border-primary p-0 rounded-[2rem] overflow-hidden">
                  <div className="relative h-64 overflow-hidden group">
                    <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                    <h3 className="absolute bottom-6 left-6 right-6 text-white text-xl font-bold">{item.title}</h3>
                  </div>
                  <CardContent className="p-8 space-y-6">
                    <p className="text-muted-foreground text-sm leading-relaxed h-12 line-clamp-2">{item.desc}</p>
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white rounded-xl font-bold h-12" asChild>
                      <a href={item.link} target="_blank">{item.btnText}</a>
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};