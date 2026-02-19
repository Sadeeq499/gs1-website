"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import whoImage from '@/public/images/who.jpg';

export const AboutHero = ({ data }) => (
  <section className="relative flex py-12 items-center text-white overflow-hidden">
    {/* Background Image Container */}
    <div className="absolute inset-0 z-0">
      <Image 
        src={whoImage} 
        alt="About GS1 Saudi Arabia" 
        fill 
        className="object-cover" 
        priority 
      />
      {/* Dynamic Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        className=" space-y-8"
      >
        <Badge className="bg-secondary text-white font-bold px-6 py-2 border-none">
          {data.badge}
        </Badge>
        
        <h1 className="text-3xl lg:text-5xl font-black tracking-tighter leading-[0.9]">
          {data.title} <br />
          <span className="text-secondary italic">{data.titleHighlight}</span> <br />
          {data.titleSuffix}
        </h1>

        <p className="text-lg text-white/70 leading-relaxed">
          {data.description}
        </p>

        <div className="flex flex-wrap gap-12 pt-12 border-t border-white/60">
          {data.stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-4xl font-black text-secondary">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);