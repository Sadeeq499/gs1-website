import React from "react";
import { 
  Barcode, 
  Package, 
  Box, 
  MapPin, 
  ArrowRightLeft, 
  RefreshCw,
  CheckCircle2
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function GS1StandardsDetails() {
  const t = useTranslations("standards.key_components");

  const componentsList = [
    { icon: Barcode, color: "text-blue-600", bg: "bg-blue-600/10" },
    { icon: Package, color: "text-[#FE5000]", bg: "bg-[#FE5000]/10" },
    { icon: Box, color: "text-emerald-600", bg: "bg-emerald-600/10" },
    { icon: MapPin, color: "text-purple-600", bg: "bg-purple-600/10" },
    { icon: ArrowRightLeft, color: "text-pink-600", bg: "bg-pink-600/10" },
    { icon: RefreshCw, color: "text-cyan-600", bg: "bg-cyan-600/10" }
  ];

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Components Section */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#002C6C] tracking-tight mb-6">
              {t("title")}
            </h2>
            <p className="text-gray-600 text-lg md:text-xl font-light">
              {t("subtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {componentsList.map((comp, idx) => {
              const Icon = comp.icon;
              return (
                <div key={idx} className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group hover:-translate-y-1 duration-300">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${comp.bg} ${comp.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    <Icon className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t(`components.${idx}.title`)}</h3>
                  <p className="text-gray-600 leading-relaxed font-light">{t(`components.${idx}.desc`)}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-[#002C6C] rounded-[2.5rem] overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FE5000] opacity-20 rounded-full blur-[100px] -mr-40 -mt-40 mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400 opacity-20 rounded-full blur-[100px] -ml-40 -mb-40 mix-blend-screen pointer-events-none"></div>
          
          <div className="relative p-12 md:p-16 lg:p-24 flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-[45%]">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 mb-8 backdrop-blur-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FE5000]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                  {t("benefits_badge")}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-[1.1]">
                {t("benefits_title")}
              </h2>
              <p className="text-white/70 text-lg md:text-xl font-light mb-8 leading-relaxed">
                {t("benefits_desc")}
              </p>
            </div>
            
            <div className="lg:w-[55%] w-full grid sm:grid-cols-2 gap-x-8 gap-y-12">
              {[0, 1, 2, 3].map((idx) => (
                <div key={idx} className="flex items-start gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#FE5000] backdrop-blur-sm border border-white/5">
                    <CheckCircle2 className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <p className="text-white/90 font-medium leading-relaxed pt-3">{t(`benefits.${idx}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
