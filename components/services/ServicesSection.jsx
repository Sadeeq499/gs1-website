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

const ServicesSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/5 rounded-full px-5 py-2 mb-2">
            <span className="text-sm font-medium text-primary tracking-wide">
              Comprehensive Solutions
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">
            GS1 Saudi Arabia Services
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We provide a range of services designed to help you identify,
            capture, and share information efficiently.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.id}
                className="group relative overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-white"
              >
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
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10 flex flex-col grow">
                  <CardDescription className="text-base text-muted-foreground leading-relaxed mb-6 grow">
                    {service.description}
                  </CardDescription>

                  <Link href={`/services/${service.slug}`} className="mt-auto">
                    <button
                      className={`flex items-center gap-2 text-sm font-semibold transition-colors group-hover:translate-x-1 ${service.textColor}`}
                    >
                      Learn more <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </CardContent>

                {/* Subtle Background Decoration */}
                <div
                  className={`absolute -bottom-12 -right-12 w-32 h-32 rounded-full opacity-5 ${service.color}`}
                />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
