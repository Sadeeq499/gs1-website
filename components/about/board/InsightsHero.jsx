"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck } from "lucide-react";

export const InsightsHero = ({ data }) => {
  return (
    <section className="relative w-full py-12 lg:py-16 overflow-hidden bg-primary flex items-center">
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/95 to-[#002c5c]" />
      </div>

      <div className="container mx-auto px-4 md:px-12 relative z-10 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl space-y-6"
        >
          {/* Governance Badge Row */}
          <div className="flex items-center gap-4">
            <Badge
              variant="secondary"
              className="font-black px-6 py-1 rounded-full border-none shadow-2xl bg-secondary text-white"
            >
              {data?.badge || "Governance"}
            </Badge>
            <Separator
              orientation="horizontal"
              className="w-16 bg-white/30 h-[1px]"
            />
            <ShieldCheck className="w-5 h-5 text-secondary animate-pulse" />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-white gap-2">
              {data.title} <br />
              <span className="text-secondary drop-shadow-md">
                {/* {data.titleHighlight} */}
              </span>{" "}
              <br />
              <span className="text-white/80 text-xl md:text-3xl">
                {data.titleSuffix}
              </span>
            </h1>

            <p className="text-lg md:text-xl font-light leading-snug text-white/90 max-w-3xl">
              {data.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
