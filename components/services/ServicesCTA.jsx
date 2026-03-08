import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const ServicesCTA = () => {
  const t = useTranslations("services.cta");
  return (
    <section className="py-16 bg-white border-t border-gray-100 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-[50%] -left-[10%] w-[50%] h-[150%] rounded-full bg-linear-to-b from-blue-50/50 to-transparent blur-3xl" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[120%] rounded-full bg-linear-to-b from-orange-50/30 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="http://213.136.82.130:1323/register/account-setup"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto px-8 py-3.5 bg-secondary text-white font-semibold rounded-full hover:bg-secondary/90 shadow-lg shadow-secondary/20 transition-all duration-300 flex items-center justify-center gap-2 group transform hover:-translate-y-0.5">
                {t("get_barcode")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-3.5 bg-white border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                {t("contact_us")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTA;
