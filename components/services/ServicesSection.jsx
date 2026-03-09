import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "./data";
import { useTranslations } from "next-intl";

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
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="block h-full cursor-pointer"
              >
                <Card className="group relative overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-white">
                  {/* Top Border Accent */}
                  <div
                    className={`absolute top-0 left-0 w-full h-1 ${service.color}`}
                  />

                  <CardHeader className="relative z-10 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 rounded-xl ${
                          service.id === "gln" || service.id === "sec"
                            ? "bg-orange-50 text-secondary"
                            : "bg-blue-50 text-primary"
                        } w-fit`}
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
                      className={`text-xl font-bold ${service.textColor}`}
                    >
                      {t(`items.${service.slug}.title`)}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative z-10 flex flex-col grow">
                    <CardDescription className="text-base text-muted-foreground leading-relaxed mb-6 grow">
                      {t(`items.${service.slug}.description`)}
                    </CardDescription>

                    <div className="mt-auto">
                      <span
                        className={`flex items-center gap-2 text-sm font-semibold transition-colors group-hover:translate-x-1 ${service.textColor}`}
                      >
                        {t("section.learn_more")}{" "}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </CardContent>

                  {/* Subtle Background Decoration */}
                  <div
                    className={`absolute -bottom-12 -right-12 w-32 h-32 rounded-full opacity-5 ${service.color}`}
                  />
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
