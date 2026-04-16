"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, ExternalLink, Phone, Clock } from "lucide-react";

export default function ContactMap({ data: map, info }) {
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${map.lat},${map.lng}&zoom=${map.zoom}`;

  // Standard non-API link for embedding:
  const simpleEmbed = `https://maps.google.com/maps?q=${map.lat},${map.lng}&z=${map.zoom}&output=embed`;
  const externalUrl = `https://www.google.com/maps/place/GS1+Saudi+Arabia+%D9%85%D8%B1%D9%83%D8%B2+%D8%A7%D9%84%D8%AA%D8%B1%D9%82%D9%8A%D9%85+%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%E2%80%AD/@24.8456196,46.6717674,17z/data=!3m1!4b1!4m6!3m5!1s0x3e2efb004b18df73:0xd49913c1b6cf4d67!8m2!3d24.8456196!4d46.6743477!16s%2Fg%2F11mcz364xg?entry=ttu&g_ep=EgoyMDI2MDQxMy4wIKXMDSoASAFQAw%3D%3D`;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden border-0 shadow-xl bg-primary px-6">
          <div className="grid lg:grid-cols-3">
            <div className="lg:col-span-1 p-6 text-primary-foreground">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5" />
                <Badge
                  variant="outline"
                  className="border-white/20 text-white bg-white/10"
                >
                  {info.locationName}
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-3">{info.companyName}</h3>
              <p className="text-sm opacity-90 mb-4">{info.address}</p>
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 opacity-70" />
                  <a href={`tel:${info.phoneRaw}`} className="hover:underline">
                    {info.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 opacity-70" />
                  <span>{info.workingHours}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-12">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-full px-4 shadow-lg shadow-secondary/20 transition-all hover:-translate-y-0.5"
                  onClick={() => window.open(externalUrl, "_blank")}
                >
                  <Navigation className="w-4 h-4 mr-2" />{" "}
                  {map.buttons.directions}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-primary font-semibold rounded-full px-4 transition-all hover:-translate-y-0.5"
                  onClick={() => window.open(externalUrl, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />{" "}
                  {map.buttons.openMaps}
                </Button>
              </div>
            </div>
            <div className="lg:col-span-2 h-[400px]">
              <iframe
                title={info.companyName}
                src={simpleEmbed}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
