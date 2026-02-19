import { GraduationCap, ShieldCheck, Zap } from "lucide-react";

const icons = { GraduationCap, ShieldCheck, Zap };

export const TrainingFeatures = ({ data }) => (
  <section className="py-24 bg-primary text-white rounded-[3rem] mx-4 mb-20 lg:mx-auto container">
    <div className="px-8 lg:px-20">
      <h2 className="text-3xl font-black mb-16 text-center">{data.heading}</h2>
      <div className="grid md:grid-cols-3 gap-12">
        {data.items.map((feature, i) => {
          const IconComponent = icons[feature.icon];
          return (
            <div key={i} className="text-center space-y-6 group">
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto group-hover:bg-secondary transition-colors duration-500">
                <IconComponent className="w-10 h-10 text-secondary group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold">{feature.title}</h4>
              <p className="text-white/60 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);