import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { services } from "./data";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const t = useTranslations("services");
  return (
    <section className="py-16 bg-muted/30">
      <div className=" mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/5 rounded-full px-5 py-2 mb-2">
            <span className="text-sm font-medium text-primary tracking-wide">
              {t("section.badge")}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold leading-normal md:leading-snug text-primary">
            {t("section.title")}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t("section.description")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="block h-full"
              >
                <Card className="group relative overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-white">
                  {/* Top Border Accent */}
                  <div
                    className={`absolute top-0 left-0 w-full h-1 ${service.color}`}
                  />

                  <div className="flex flex-col h-full">
                    <Link href={`/services/${service.slug}`} className="grow">
                      <CardHeader className="relative z-10 pb-2">
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`p-3 rounded-xl ${
                              service.id === "gln" || service.id === "sec"
                                ? "bg-orange-50 text-secondary"
                                : "bg-blue-50 text-primary"
                            } w-fit transition-transform duration-300 group-hover:scale-110`}
                          >
                            <Icon className="w-8 h-8" />
                          </div>
                          <span
                            className={`text-4xl font-bold opacity-5 ${service.textColor}`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <CardTitle
                          className={`text-xl font-bold ${service.textColor} group-hover:text-secondary transition-colors`}
                        >
                          {t(`items.${service.slug}.title`)}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="relative z-10 flex flex-col">
                        <CardDescription className="text-base text-muted-foreground leading-relaxed">
                          {t(`items.${service.slug}.description`)}
                        </CardDescription>
                      </CardContent>
                    </Link>

                    <div className="mt-auto flex items-center justify-between px-6 pb-6 pt-4 relative z-20 border-t border-gray-50/50">
                      <Link 
                        href={`/services/${service.slug}`}
                        className={`flex items-center gap-1.5 text-sm font-bold transition-all hover:gap-2 ${service.textColor} hover:text-secondary`}
                      >
                        {t("section.learn_more")}
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <Button
                        asChild
                        size="sm"
                        className={`font-bold transition-all duration-300 ${
                          service.id === "gln" || service.id === "sec"
                            ? "bg-secondary hover:bg-white hover:text-secondary border-secondary"
                            : "bg-primary hover:bg-white hover:text-primary border-primary"
                        } rounded-lg shadow-sm hover:shadow-md cursor-pointer h-9 px-4 border-2 border-transparent scale-100 hover:scale-105 active:scale-95`}
                      >
                        <a 
                          href={process.env.NEXT_PUBLIC_MEMBER_REGISTER} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center shrink-0"
                        >
                          {t(`items.${service.slug}.get_button`) || `Get ${service.shortName}`}
                          <ExternalLink className="w-3.5 h-3.5 ml-1.5 opacity-80" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Subtle Background Decoration */}
                  <div
                    className={`absolute -bottom-12 -right-12 w-32 h-32 rounded-full opacity-5 ${service.color}`}
                  />
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
