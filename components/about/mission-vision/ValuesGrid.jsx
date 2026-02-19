import { ShieldCheck, Zap, Users } from "lucide-react";

const iconMap = { ShieldCheck, Zap, Users };

export const ValuesGrid = ({ data }) => (
  <section className="py-24">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-4xl font-black text-primary mb-16">
        {data.heading} <span className="text-secondary italic">{data.highlight}</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {data.items.map((item, i) => {
          const Icon = iconMap[item.icon];
          return (
            <div key={i} className="space-y-6 group">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto group-hover:bg-secondary transition-all duration-500">
                <Icon className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-2xl font-bold text-primary">{item.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);