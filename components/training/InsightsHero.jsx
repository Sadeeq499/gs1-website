"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Treaning from "@/public/images/treaning.jpg";

export const InsightsHero = ({ data }) => (
  <section className="relative flex items-center text-white py-14 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <Image src={Treaning} alt="GS1 Saudi Arabia" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-primary/50 backdrop-blur-[2px]" />
    </div>
    <div className="container mx-auto px-4 relative z-10">
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
        <Badge className="bg-secondary text-primary font-bold border-none px-4 py-1">{data.badge}</Badge>
        <h1 className="text-3xl lg:text-5xl font-black tracking-tighter leading-tight">
          {data.title} <br />
          <span className="text-secondary italic">{data.titleHighlight}</span> <br />
          {data.titleSuffix}
        </h1>
        <p className="text-xl text-white/80 leading-relaxed">{data.description}</p>
        <div className="flex gap-8 pt-8 border-t border-white/70">
          {data.stats.map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-secondary">{stat.value}</div>
              <div className="text-sm text-white/60 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);