"use client";

import { motion } from "framer-motion";

const partners = [
  {
    name: "Al Rabat Building Contracting",
    logo: "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?auto=format&fit=crop&w=200&q=80",
    category: "Construction",
  },
  {
    name: "Amaco Investment Group",
    logo: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=200&q=80",
    category: "Investment",
  },
  {
    name: "Arki",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80",
    category: "Design",
  },
  {
    name: "CMC Medical Center",
    logo: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=200&q=80",
    category: "Healthcare",
  },
  {
    name: "City Star Hotel",
    logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80",
    category: "Hospitality",
  },
  {
    name: "DAT Corp",
    logo: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=200&q=80",
    category: "Technology",
  },
];

export function Partners() {
  const duplicatedPartners = [
    ...partners,
    ...partners,
    ...partners,
    ...partners,
  ];

  return (
    <section className="py-16 bg-linear-to-b from-white to-gray-50/50 overflow-hidden border-t border-border/20">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">
            Our Strategic Partners
          </h2>
          <div className="mt-3 h-1.5 w-16 bg-secondary mx-auto rounded-full" />
          <p className="mt-4 text-muted-foreground text-sm max-w-2xl mx-auto">
            Collaborating with leading organizations to drive digital
            transformation and standards adoption across the Kingdom.
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mask-linear-fade">
          {/* Gradient Masks */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-linear-to-r from-white via-white/80 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-linear-to-l from-white via-white/80 to-transparent" />

          <motion.div
            className="flex w-max items-center py-4"
            animate={{
              x: "-50%",
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 50,
              ease: "linear",
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="group relative flex items-center gap-3 mr-8 pl-2 pr-6 py-2 rounded-full border border-border/40 bg-white/50 backdrop-blur-sm hover:bg-white hover:border-secondary/30 hover:shadow-md transition-all duration-300 cursor-default"
              >
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-gray-100 group-hover:ring-secondary/20 transition-all">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <span className="text-sm font-semibold text-foreground/80 group-hover:text-primary transition-colors whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
