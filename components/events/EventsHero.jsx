"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export const EventsHero = ({ data: hero }) => {
  return (
    <section className="relative flex items-center text-white py-12 lg:py-16 overflow-hidden bg-primary">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/95 to-[#002c5c]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4"
          >
            <Badge className="bg-secondary text-white font-bold border-none px-4 py-1">
              {hero.badge}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-tight">
              {hero.title} <br />
              <span className="text-secondary">{hero.titleHighlight}</span>{" "}
              <br />
              {hero.titleSuffix}
            </h1>

            <p className="text-lg text-white/80 max-w-2xl">
              {hero.description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
