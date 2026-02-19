import { QrCode, ShieldCheck, Globe } from "lucide-react";

const iconMap = { QrCode, ShieldCheck, Globe };

export const StrategyPillars = ({ data }) => (
  <section className="py-24 bg-slate-50">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mb-16 animate-in fade-in slide-in-from-left duration-700">
        <h2 className="text-4xl lg:text-5xl font-black text-primary leading-tight">
          {data.title} <span className="text-secondary italic">{data.highlight}</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {data.items.map((pillar, i) => {
          const Icon = iconMap[pillar.icon];
          return (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 group">
              <div className="text-secondary font-black text-5xl mb-6 opacity-20 group-hover:opacity-100 transition-opacity">
                {pillar.id}
              </div>
              <Icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-primary mb-4">{pillar.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{pillar.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);