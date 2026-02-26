"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";


export function InsightsHero({ sliderNews }) {
  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  );

  return (
    <section className="relative w-full h-[500px] lg:h-[600px] overflow-hidden bg-[#002c5c]">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full"
        opts={{ loop: true }}
      >
        <CarouselContent className="h-full ml-0">
          {sliderNews.map((item) => (
            <CarouselItem key={item.id} className="relative w-full h-full pl-0">
              {/* Image & Brand Overlay */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority={item.id === 1}
                />
                {/* Deep Blue Brand Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#002c5c] via-[#002c5c]/80 to-transparent" />
              </div>

              {/* Dynamic Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container px-6 lg:px-12 mx-auto">
                  <div className="max-w-4xl space-y-8">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                      <Badge className="bg-secondary hover:bg-secondary text-white border-none px-4 py-1.5 mb-6 flex w-fit items-center gap-2 shadow-lg">
                        {item.icon}
                        {item.badge}
                      </Badge>
                      
                      <h1 className="md:text-5xl lg:text-6xl font-black tracking-tight text-white">
                        {item.title} <br />
                        <span className="text-secondary">{item.highlight}</span>
                      </h1>
                      
                      <p className="mt-8 text-xl text-white/90 max-w-2xl font-light">
                        {item.description}
                      </p>

                      {/* Meta Details Bar */}
                      <div className="flex flex-wrap gap-10 mt-10 pt-10 border-t border-white/20">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-secondary" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-white/50 text-[10px] uppercase tracking-widest font-bold">When</span>
                            <span className="text-white font-semibold text-sm">{item.date}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-secondary" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-white/50 text-[10px] uppercase tracking-widest font-bold">Where</span>
                            <span className="text-white font-semibold text-sm">{item.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-12">
                        {/* <Button 
                          size="lg" 
                          className="bg-secondary hover:bg-secondary text-white font-black rounded-full px-12 h-16 text-lg uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
                        >
                          {item.cta} <ArrowRight className="ml-3 h-6 w-6" />
                        </Button> */}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Enhanced Navigation UI */}
        <div className="absolute bottom-50 right-12 flex gap-4 z-30">
          <CarouselPrevious className="static translate-y-0 h-16 w-16 border-white/20 bg-white/5 text-white hover:bg-white hover:text-[#002c5c] backdrop-blur-xl transition-all duration-300" />
          <CarouselNext className="static translate-y-0 h-16 w-16 border-white/20 bg-white/5 text-white hover:bg-white hover:text-[#002c5c] backdrop-blur-xl transition-all duration-300" />
        </div>
      </Carousel>
    </section>
  );
}