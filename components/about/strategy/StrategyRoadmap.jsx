import { Separator } from "@/components/ui/separator";

export const StrategyRoadmap = ({ data }) => (
  <section className="py-24 bg-gs1-earth text-primary overflow-hidden">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-black text-center mb-20">{data.title}</h2>
      
      <div className="max-w-5xl mx-auto">
        {data.steps.map((step, i) => (
          <div key={i} className="flex group">
            {/* Timeline Line & Dot */}
            <div className="flex flex-col items-center mr-8 lg:mr-16">
              <div className="w-4 h-4 rounded-full bg-secondary shadow-[0_0_15px_rgba(242,147,31,0.5)] group-hover:scale-150 transition-transform" />
              {i !== data.steps.length - 1 && (
                <Separator orientation="vertical" className="flex-1 bg-primary/20 w-[2px] my-2" />
              )}
            </div>
            
            {/* Content Area */}
            <div className="pb-16 pt-[-4px]">
              <span className="text-secondary font-black text-3xl mb-2 block">{step.year}</span>
              <p className="text-xl lg:text-2xl font-light text-primary/80 group-hover:text-secondary transition-colors leading-relaxed">
                {step.task}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);