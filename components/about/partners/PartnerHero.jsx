"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PartnerHero = ({ data: hero }) => {
  return (
    <section className="relative py-12 lg:py-16 overflow-hidden bg-primary flex items-center">
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/95 to-[#002c5c]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl text-left text-white space-y-4"
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
          <p className="text-lg text-white/90 max-w-2xl">{hero.description}</p>
          <div className="pt-4">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-full px-8 h-12 shadow-lg shadow-secondary/20 transition-all hover:-translate-y-0.5"
            >
              {hero.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
