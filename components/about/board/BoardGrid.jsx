"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Quote } from "lucide-react";

export const BoardGrid = ({ data }) => {
  const [chairman, ceo] = data.members;
  const executive = data.executiveTeam;

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 space-y-12">
        {/* --- Chairman: Animated from Left to Right --- */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-primary rounded-[3rem] overflow-hidden shadow-2xl min-h-[400px] flex flex-col lg:flex-row"
        >
          <div className="lg:w-2/5 relative min-h-[400px]">
            <Image
              src={chairman.image}
              alt={chairman.name}
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-r via-transparent from-transparent to-primary hidden lg:block" />
          </div>

          <div className="lg:w-3/5 p-12 lg:p-20 flex flex-col justify-center relative">
            <Quote className="absolute top-10 right-10 w-24 h-24 text-white/5 rotate-12" />
            <Badge className="w-fit bg-secondary text-white font-black mb-6 px-6 py-2 rounded-full">
              {chairman.role}
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-6">
              {chairman.name}
            </h2>
            <Separator className="bg-white/10 mb-8" />
            <p className="text-xl text-white/70 leading-relaxed font-light max-w-2xl">
              &ldquo;{chairman.desc}&rdquo;
            </p>
          </div>
        </motion.div>

        {/* --- CEO & Executive Row --- */}
        <div className="grid lg:grid-cols-2 gap-12 pt-12">
          {/* 1. CEO Card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col md:flex-row bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl transition-all duration-500"
          >
            <div className="md:w-1/2 relative min-h-[350px]">
              <Image
                src={ceo.image}
                alt={ceo.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-10 md:w-1/2 flex flex-col justify-center space-y-4">
              <Badge
                variant="outline"
                className="w-fit border-secondary text-secondary font-bold uppercase"
              >
                {ceo.role}
              </Badge>
              <h3 className="text-2xl font-black text-primary uppercase">
                {ceo.name}
              </h3>
              <Separator className="bg-slate-100" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {ceo.desc}
              </p>
            </div>
          </motion.div>

          {/* 2. Executive Management Card (Fills the Gap) */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl transition-all duration-500"
          >
            <div className="md:w-1/2 relative min-h-[350px]">
              <Image
                src={executive.image}
                alt={executive.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-10 md:w-1/2 flex flex-col justify-center space-y-4">
              <Badge
                variant="outline"
                className="w-fit border-primary text-primary font-bold uppercase"
              >
                {executive.role}
              </Badge>
              <h3 className="text-2xl font-black text-primary uppercase">
                {executive.name}
              </h3>
              <Separator className="bg-slate-100" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {executive.desc}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
