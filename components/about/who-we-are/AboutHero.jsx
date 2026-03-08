"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export const AboutHero = ({ data }) => (
  <section className="relative flex py-12 lg:py-16 items-center text-white overflow-hidden bg-primary">
    {/* Dynamic Background Gradient */}
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/95 to-[#002c5c]" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className=" space-y-6"
      >
        <Badge className="bg-secondary text-white font-bold px-6 py-2 border-none">
          {data.badge}
        </Badge>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-tight">
          {data.title} <br />
          <span className="text-secondary">{data.titleHighlight}</span> <br />
          {data.titleSuffix}
        </h1>

        <p className="text-lg text-white/70 max-w-4xl">{data.description}</p>

        <div className="flex flex-wrap gap-8 lg:gap-12 pt-8 border-t border-white/20">
          {data.stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-4xl font-black text-secondary">
                {stat.value}
              </div>
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
