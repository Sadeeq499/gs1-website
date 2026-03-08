"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function ContactHero({ data: hero }) {
  return (
    <section className="relative py-12 lg:py-16 overflow-hidden bg-primary">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/95 to-[#002c5c]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto text-center text-white space-y-4"
        >
          <Badge
            variant="outline"
            className="px-4 py-1 text-sm border-white/30 text-white bg-white/10 backdrop-blur-sm font-bold"
          >
            {hero.badge}
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {hero.title}{" "}
            <span className="text-secondary">{hero.titleHighlight}</span>{" "}
            {hero.titleSuffix}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            {hero.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
