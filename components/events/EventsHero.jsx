"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { EVENTS_DATA } from "./events-data";
import EventsImg from "@/public/images/events.jpg";

export const EventsHero = () => {
  const { hero } = EVENTS_DATA;

  return (
    <section className="relative flex items-center text-white py-14 overflow-hidden">
      {/* Background Image Implementation */}
      <div className="absolute inset-0 z-0">
        <Image
          src={EventsImg}
          alt="GS1 Saudi Arabia Events"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Blue Overlay with Blur to match your style */}
        <div className="absolute inset-0 bg-primary/50 backdrop-blur-[2px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid  gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <Badge className="bg-secondary text-white font-bold border-none px-4 py-1">
              {hero.badge}
            </Badge>
            
            <h1 className="text-4xl lg:text-7xl font-black tracking-tighter leading-tight">
              {hero.title} <br />
              <span className="text-secondary italic">{hero.titleHighlight}</span> <br />
              {hero.titleSuffix}
            </h1>
            
            <p className="text-lg text-white/80 max-w-xl leading-relaxed">
              {hero.description}
            </p>
            
            {/* <div className="flex gap-8 pt-8 border-t border-white/10">
              {hero.stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * i }}
                >
                  <div className="text-3xl font-bold text-secondary">{stat.value}</div>
                  <div className="text-sm text-white/60 uppercase tracking-widest">{stat.label}</div>
                </motion.div>
              ))}
            </div> */}
          </motion.div>
          
          {/* Right side is kept empty to let the background image show through clearly */}
        </div>
      </div>
    </section>
  );
};