"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export const InsightsHero = ({ data }) => (
  <section className="relative flex items-center text-white py-12 lg:py-16 overflow-hidden bg-primary">
    {/* Background Gradient */}
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/95 to-[#002c5c]" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-4"
      >
        <Badge className="bg-secondary text-white font-bold border-none px-4 py-1">
          {data.badge}
        </Badge>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-tight">
          {data.title} <br />
          <span className="text-secondary">{data.titleHighlight}</span> <br />
          {data.titleSuffix}
        </h1>
        <p className="text-lg text-white/80 max-w-3xl leading-relaxed">
          {data.description}
        </p>
        <div className="flex gap-8 pt-8 border-t border-white/20">
          {data.stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-4xl font-black text-secondary">
                {stat.value}
              </div>
              <div className="text-[10px] uppercase tracking-widest font-black text-white/40">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);
