import { Eye, Target } from "lucide-react";

const icons = { Eye, Target };

export const MissionVisionGrid = ({ data }) => (
  <section className="py-24 relative overflow-hidden bg-primary">
    {/* Decorative Elements */}
    <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="grid md:grid-cols-2 gap-8">
        {data.map((item, i) => {
          const IconComponent = icons[item.icon];
          return (
            <div 
              key={i} 
              className="p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-500 group"
            >
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-black text-white mb-6 tracking-tight">
                {item.title}
              </h3>
              <p className="text-xl text-white/60 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);