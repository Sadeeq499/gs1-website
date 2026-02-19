"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import EventsImg from "@/public/images/events.jpg";

export const InsightsHero = ({ data }) => {
  return (
    <section className="relative flex items-center text-white py-14 overflow-hidden">
      {/* Background with Next.js Optimization */}
      <div className="absolute inset-0 z-0">
        <Image
          src={EventsImg}
          alt="GS1 Saudi Arabia Knowledge Hub"
          fill
          className="object-cover"
          priority
        />
        {/* Modern GS1 Blue Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent backdrop-blur-[1px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className=" space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Badge className="bg-secondary text-white font-bold border-none px-6 py-1.5 rounded-full">
              {data.badge}
            </Badge>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-6xl font-black drop-shadow-2xl"
          >
            {data.title} <br />
            <span className="text-secondary italic">{data.titleHighlight}</span> <br />
            {data.titleSuffix}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-md text-white/70 max-w-xl leading-relaxed"
          >
            {data.description}
          </motion.p>

          {/* Dynamic Stats Row */}
          <div className="flex gap-12 pt-10 border-t border-white/10">
            {data.stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div className="text-3xl font-black text-secondary">{stat.value}</div>
                <div className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};