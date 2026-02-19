"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PARTNERS_DATA } from "./partners-data";
export const PartnerCTA = () => {
  const { cta } = PARTNERS_DATA;
  return (
    <section className="py-40 text-center relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2 className="text-5xl font-bold mb-6">{cta.title}</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-10 text-lg">{cta.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" className="bg-primary hover:bg-primary/90 rounded-full px-12 h-16 text-lg font-bold">{cta.primaryBtn}</Button>
            <Button size="xl" variant="outline" className="border-border rounded-full px-12 h-16 text-lg font-bold">{cta.secondaryBtn}</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};