"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { PARTNERS_DATA } from "./partners-data";

// Correct path: Public folder assets are served from the root "/"
const logos = [
  "/images/SFDA.png",
  "/images/ZATCA.svg",
  "/images/SASO.jpg",
];

export const RegulatoryGrid = () => (
  <section className="py-24 container mx-auto px-4">
    <div className="grid md:grid-cols-3 gap-6">
      {PARTNERS_DATA.regulatory.map((item, i) => {
        // Use the logos array index to match the current item
        const logoSrc = logos[i];

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ y: -10 }}
          >
            <Card className="p-8 h-full bg-card border-border/50 overflow-hidden relative group">
              {/* Logo Container */}
              <div className="mb-6 p-2 h-24 w-24 flex items-center justify-center rounded-xl">
                <img
                  src={logoSrc}
                  alt={`${item.title} logo`}
                  className="object-contain"
                />
              </div>

              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">
                {item.sub}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.desc}
              </p>

              {/* Watermark Logo */}
              <div className="absolute bottom-0 right-0 p-2 opacity-5 pointer-events-none">
                <img
                  src={logoSrc}
                  alt=""
                  className="h-24 w-24 grayscale brightness-0"
                />
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  </section>
);