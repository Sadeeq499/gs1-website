"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export function InsightsHero({ data }) {
  return (
    <section className="relative w-full py-12 lg:py-16 overflow-hidden bg-primary">
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/95 to-[#002c5c]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4"
          >
            <Badge className="bg-secondary text-white font-bold border-none px-4 py-1">
              {data.badge}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              {data.title} <br />
              <span className="text-secondary">{data.titleHighlight}</span>{" "}
              <br />
              {data.titleSuffix}
            </h1>

            <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
              {data.description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
