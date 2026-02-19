"use client";
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowUpRight, ShoppingCart, Globe } from "lucide-react";
import { PARTNERS_DATA } from "./partners-data";
export const MarketplaceSync = () => {
  const { marketplace } = PARTNERS_DATA;
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-8">
            <Badge variant="outline" className="border-secondary text-secondary bg-secondary/5 px-4 py-1">{marketplace.badge}</Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-foreground leading-tight">
              {marketplace.title} <br /> <span className="text-primary italic">{marketplace.titleHighlight}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">{marketplace.description}</p>
            <div className="space-y-4">
              {marketplace.features.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-foreground/80 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-secondary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-secondary text-primary font-bold hover:bg-secondary/90 px-8">{marketplace.ctaPrimary}</Button>
              <Button size="lg" variant="outline" className="border-primary text-primary px-8 group">
                {marketplace.ctaSecondary} <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 relative">
            {marketplace.platforms.map((platform, idx) => (
              <motion.div key={platform.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: platform.delay }} whileHover={{ y: -12 }} className="group relative h-[320px] bg-primary rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden shadow-2xl shadow-primary/20">
                <div className="bg-white rounded-2xl p-6 h-24 flex items-center justify-center relative z-10">
                  <img src={platform.logo} alt={platform.name} className="max-h-full w-auto object-contain" />
                </div>
                <div className="relative z-10 mt-6">
                  <h3 className="text-white text-xl font-bold mb-2 flex items-center justify-between">
                    {platform.label} <ArrowUpRight className="w-5 h-5 text-secondary group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">{platform.description}</p>
                </div>
                <div className="absolute bottom-4 left-8 text-white/30 group-hover:text-white/40 transition-colors">
                  {idx === 0 ? <ShoppingCart className="w-12 h-12" /> : <Globe className="w-12 h-12" />}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};