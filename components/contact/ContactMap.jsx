"use client"
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Navigation, ExternalLink, Phone, Clock } from 'lucide-react'
import { CONTACT_DATA } from './contact-data'

export default function ContactMap() {
  const { map, info } = CONTACT_DATA;
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${map.lat},${map.lng}&zoom=${map.zoom}`;
  
  // Standard non-API link for embedding:
  const simpleEmbed = `https://maps.google.com/maps?q=${map.lat},${map.lng}&z=${map.zoom}&output=embed`;
  const externalUrl = `https://www.google.com/maps/dir/?api=1&destination=${map.lat},${map.lng}`;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden border-0 shadow-xl bg-primary px-6">
          <div className="grid lg:grid-cols-3">
            <div className="lg:col-span-1 p-6 text-primary-foreground">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5" />
                <Badge variant="outline" className="border-white/20 text-white bg-white/10">{info.locationName}</Badge>
              </div>
              <h3 className="text-xl font-bold mb-3">{info.companyName}</h3>
              <p className="text-sm opacity-90 mb-4">{info.address}</p>
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 opacity-70" />
                  <a href={`tel:${info.phoneRaw}`} className="hover:underline">{info.phone}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 opacity-70" />
                  <span>{info.workingHours}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-12">
                <Button size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-full px-4 shadow-lg shadow-secondary/20 transition-all hover:-translate-y-0.5" onClick={() => window.open(externalUrl, '_blank')}>
                  <Navigation className="w-4 h-4 mr-2" /> {map.buttons.directions}
                </Button>
                <Button  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-primary font-semibold rounded-full px-4 transition-all hover:-translate-y-0.5" onClick={() => window.open(externalUrl, '_blank')}>
                  <ExternalLink className="w-4 h-4 mr-2" /> {map.buttons.openMaps}
                </Button>
              </div>
            </div>
            <div className="lg:col-span-2 h-[400px]">
              <iframe title={info.companyName} src={simpleEmbed} className="w-full h-full border-0" loading="lazy" allowFullScreen />
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
