import React from "react";
import { notFound } from "next/navigation";
import { techSolutions } from "@/components/home/data";
import { 
  CheckCircle2, 
  ArrowRight, 
  Lightbulb, 
  ShieldAlert, 
  Users, 
  Info,
  Zap,
  Star,
  Globe,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  return techSolutions.map((solution) => ({
    slug: solution.slug,
  }));
}

export default async function SolutionPage({ params }) {
  const { slug } = await params;
  const solution = techSolutions.find((s) => s.slug === slug);

  if (!solution) {
    notFound();
  }

  // Array of icons to rotate through for the "Why Choose Us" section
  const featureIcons = [Zap, Star, Globe, ShieldCheck, CheckCircle2];

  return (
    <div className="bg-slate-50 font-sans text-slate-900 overflow-x-hidden selection:bg-orange-100 selection:text-orange-900">
      
      {/* 1. Dynamic Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full bg-slate-900">
        <div className="absolute inset-0">
          <Image
            src={solution.heroImage}
            alt={solution.title}
            fill
            priority
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
        </div>
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
          <div className="max-w-7xl space-y-6 animate-in slide-in-from-bottom-5 duration-1000">
            {/* Breadcrumb */}
            <div className="text-sm text-slate-300">
              <Link href="/" className="hover:text-white transition-colors">Home</Link> 
              <span className="mx-2">/</span> 
              <Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link>
              <span className="mx-2">/</span> 
              <span className="text-orange-400 font-medium">{solution.acronym || solution.title}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
              {solution.title}
              {solution.acronym && (
                <span className="text-orange-500 ml-4 font-light opacity-80">
                  ({solution.acronym})
                </span>
              )}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
              {solution.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Introduction & Overview */}
      <section className="relative z-10 -mt-16 px-4 pb-16">
        <div className="container mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-slate-100 max-w-7xl mx-auto space-y-8 animate-in fade-in-up duration-700">
            <div className="flex items-center gap-4 text-slate-900">
                <div className="bg-orange-500 p-2 rounded-lg">
                    <Info className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Understanding the Solution</h2>
            </div>
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light">
              <span className="font-bold text-slate-900">{solution.title}</span> {solution.description}
            </p>
            {/* <div className="border-t border-slate-100 pt-6 flex flex-wrap gap-4 justify-center">
                {solution.idealFor?.map((item, i) => (
                    <Badge key={i} variant="secondary" className="px-4 py-2 text-base bg-slate-100 text-slate-700 border-slate-200 hover:bg-orange-500 hover:text-white transition-all cursor-default">
                        <Users className="h-4 w-4 mr-2" /> {item}
                    </Badge>
                ))}
            </div> */}
          </div>
        </div>
      </section>

      {/* 3. Dynamic Modules Section - Alternating Blog Layout */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Strategic Pillars</h2>
            <p className="text-slate-600">Deep dive into the core components that make our {solution.acronym || "solution"} a global standard.</p>
          </div>
          
          <div className="space-y-32">
            {solution.modules?.map((module, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col gap-12 lg:gap-24 items-center ${
                  idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image Side */}
                <div className="lg:w-1/2 relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl group">
                  <Image
                    src={module.image} 
                    alt={module.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8">
                     <span className="text-orange-400 font-mono text-sm font-bold tracking-widest uppercase">Module {idx + 1}</span>
                     <div className="text-white text-3xl font-bold mt-1">{module.title}</div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:w-1/2 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{module.title}</h3>
                    <div className="h-1 w-20 bg-orange-500 rounded-full" />
                  </div>
                  <p className="text-lg leading-relaxed text-slate-600 font-light italic">
                    {module.description}
                  </p>
                  
                  {/* Contextual Badges based on data features */}
                  {/* <div className="flex flex-wrap gap-3">
                    {solution.features?.slice(idx, idx + 2).map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-full text-slate-700 text-sm font-medium">
                            <CheckCircle2 className="h-4 w-4 text-green-500" /> {feature}
                        </div>
                    ))}
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Standards Section */}
      <section className="bg-primary py-24 px-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 opacity-10">
            <Globe className="h-96 w-96 text-white" />
        </div>
        <div className="container mx-auto text-center relative z-10 space-y-8">
          <Lightbulb className="h-16 w-16 mx-auto text-orange-400 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
            GS1 Saudi Arabia: Driving Innovation
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-slate-300 leading-relaxed">
            We provide the framework for the Kingdom&apos;s digital future, ensuring every product, location, and asset is identified correctly within the global supply chain.
          </p>
          {/* <Button size="lg" className="bg-orange-500 hover:bg-white hover:text-orange-500 rounded-full px-10 py-7 text-lg font-bold transition-all shadow-xl shadow-orange-500/20">
            Get Started with {solution.acronym || "GS1"} <ArrowRight className="ml-2" />
          </Button> */}
        </div>
      </section>

      {/* 5. Features Grid - No Static Text */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
                <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Why Implementation Matters</h2>
                <p className="text-slate-600">The specific benefits of adopting {solution.title} within your organizational workflow.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solution.features?.map((feature, idx) => {
              const IconComponent = featureIcons[idx % featureIcons.length];
              return (
                <div key={idx} className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:border-orange-200 transition-all hover:shadow-xl group">
                  <div className="bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                    <IconComponent className="h-7 w-7 text-orange-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{feature}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    A key operational advantage designed to optimize your {solution.acronym || "business"} performance and ensure regulatory compliance in Saudi Arabia.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Call to Action - Text Colors Adjusted for Background Match */}
      <section className="bg-white py-24 px-4 border-t border-slate-100">
        <div className="container mx-auto">
          <div className="bg-primary rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden">
            <div className="relative z-10 space-y-8">
                <ShieldAlert className="h-16 w-16 mx-auto text-orange-500" />
                <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
                    Ready to Transform Your Business?
                </h2>
                <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed font-medium">
                    Connect with our experts at GS1 Saudi Arabia to discuss your specific needs
                    and how <span className="text-orange-400">{solution.title}</span> can be tailored for your success.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {/* <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-12 py-8 text-xl font-bold shadow-2xl shadow-orange-500/30">
                        Consult an Expert <ArrowRight className="ml-3" />
                    </Button> */}
                </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}