import React from "react";
import { notFound } from "next/navigation";
import { servicesDetails } from "@/components/services/data";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Factory,
  Barcode,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = servicesDetails.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Fallback image handling
  const heroImg = service.images?.hero || service.heroImage;
  const featureImg =
    service.images?.feature ||
    "https://images.unsplash.com/photo-1589828952479-79737b8d8102?auto=format&fit=crop&q=80&w=1200";
  const bannerImg =
    service.images?.banner ||
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000";

  return (
    <div className="bg-slate-50 font-sans text-slate-900 overflow-x-hidden selection:bg-orange-100 selection:text-orange-900">
      {/* 1. Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full bg-slate-900">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt={service.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
        </div>
        <div className="relative h-full container mx-auto px-4 md:px-8 flex flex-col justify-center">
          <div className="max-w-4xl space-y-6 animate-in slide-in-from-bottom-5 duration-700">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
              {service.title}
              {service.acronym && (
                <span className="text-secondary ml-4 font-light">
                  ({service.acronym})
                </span>
              )}
            </h1>
          </div>
        </div>
      </section>

      {/* 2. Floating Intro Card (Negative Margin) */}
      <section className="relative z-10 -mt-20 md:-mt-24 px-4 md:px-8 pb-16">
        <div className="container mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100 max-w-5xl mx-auto text-center space-y-6 animate-in fade-in zoom-in-95 duration-700 delay-200">
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
              <span className="font-bold text-slate-900">{service.title}</span>{" "}
              {service.description.replace(service.title, "")}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Feature Split Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20">
            {/* Left: Content List */}
            <div className="lg:w-1/2 space-y-10">
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  Key Capabilities
                </h2>
                <div className="h-1 w-20 bg-secondary rounded-full" />
              </div>

              <div className="space-y-8">
                {service.modules &&
                  service.modules.map((module, idx) => (
                    <div key={idx} className="group">
                      <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2 group-hover:text-primary transition-colors">
                        <div className="w-2 h-2 rounded-full bg-secondary" />
                        {module.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed pl-4 border-l-2 border-slate-100 group-hover:border-secondary/30 transition-colors">
                        {module.description}
                      </p>
                    </div>
                  ))}
              </div>

              <div className="pt-4">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-white px-8 rounded-full shadow-lg shadow-secondary/20"
                >
                  Get {service.acronym || "Started"}
                </Button>
              </div>
            </div>

            {/* Right: Modern Image Card */}
            <div className="lg:w-1/2 relative min-h-[400px]">
              <div className="absolute inset-0 bg-blue-50 rounded-[3rem] transform rotate-3 scale-95" />
              <div className="absolute inset-0 bg-orange-50 rounded-[3rem] transform -rotate-2 scale-95" />
              <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={featureImg}
                  alt="Feature"
                  className="w-full h-full object-cover"
                />
                {/* Floating Badge */}
                <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-100 max-w-[200px]">
                  <div className="flex items-center gap-3 mb-2">
                    <Barcode className="text-secondary h-6 w-6" />
                    <span className="font-bold text-slate-900">
                      Standardized
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Globally recognized identification for seamless trade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Full Width Visual Break */}
      <section
        className="relative py-32 md:py-40 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url('${bannerImg}')` }}
      >
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto">
            Empower your supply chain with our universal {service.acronym}{" "}
            solutions
          </h2>
        </div>
      </section>

      {/* 5. Bottom Detail Card (Competitor Style) */}
      <section className="py-20 md:py-28 px-4 md:px-8 -mt-20 relative z-20">
        <div className="container mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-16 border border-slate-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left: Brief List */}
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900">
                    Why Choose {service.acronym}?
                  </h3>
                  <div className="h-1 w-12 bg-secondary rounded-full" />
                </div>
                <ul className="space-y-4">
                  {service.features &&
                    service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 group">
                        <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-slate-600 font-medium group-hover:text-slate-900 transition-colors">
                          {feature}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Right: Ideal For + CTA */}
              <div className="space-y-8 lg:border-l lg:border-slate-100 lg:pl-12">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900">
                    Ideal For
                  </h3>
                  <div className="h-1 w-12 bg-primary rounded-full" />
                </div>
                <div className="flex flex-wrap gap-3">
                  {service.idealFor &&
                    service.idealFor.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-sm font-semibold border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-sm transition-all cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
