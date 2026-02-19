import Image from "next/image";
import aboutHeroImage from '@/public/images/mission.jpg'; 
import { Badge } from "@/components/ui/badge";
import { Compass } from "lucide-react";
import { Separator } from "@/components/ui/separator"; // Shadcn component

export const InsightsHero = ({ data }) => (
  <section className="relative flex items-center text-white py-12 overflow-hidden bg-primary">
    {/* Background logic remains for the Ken Burns feel */}
    <div className="absolute inset-0 z-0">
      <Image 
        src={aboutHeroImage} 
        alt="GS1 Saudi Arabia" 
        fill 
        className="object-cover opacity-50" 
        priority 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-4xl space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
        
        {/* The Badge + Separator + Icon Row */}
        <div className="flex items-center gap-4">
          <Badge className="bg-secondary text-white font-black px-6">
            {data.badge}
          </Badge>
          
          {/* Horizontal Separator used as a stylistic connector */}
          <Separator orientation="horizontal" className="w-16 bg-secondary/40 h-[1px]" />
          
          <Compass className="w-6 h-6 text-secondary animate-pulse" />
        </div>
        
        <h1 className="text-3xl lg:text-5xl font-black tracking-tighter">
          {data.title} <br />
          <span className="text-secondary italic">{data.titleHighlight}</span> <br />
          <span className="opacity-90">{data.titleSuffix}</span>
        </h1>

        {/* Separator to break the description from the header */}
        <Separator className="bg-white/40 w-full" />

        <p className="text-xl lg:text-2xl text-white/70 leading-relaxed font-light">
          {data.description}
        </p>

        {/* Stats Row with Vertical Separators */}
        <div className="flex items-center gap-8 lg:gap-16 pt-8">
          {data.stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-8 lg:gap-16">
              <div className="space-y-1">
                <div className="text-4xl font-black text-secondary">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">
                  {stat.label}
                </div>
              </div>
              
              {/* Vertical Separator between stats, hidden on last item */}
              {i < data.stats.length - 1 && (
                <Separator orientation="vertical" className="h-12 bg-white/40" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);