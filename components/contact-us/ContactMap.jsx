"use client"

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Navigation, ExternalLink, Phone, Clock } from 'lucide-react'

export default function ContactMap() {
  const latitude = 24.845843501357177
  const longitude = 46.674379883078885
  const address = "King Fahad Branch Rd, Al Mutamarat, Riyadh 12711, Saudi Arabia"

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border-0 shadow-xl bg-primary px-6">
          <div className="grid lg:grid-cols-3">
            {/* Info Section */}
            <div className="lg:col-span-1 p-6 bg-gradient-to-b from-primary to-primary/90 text-primary-foreground">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5" />
                <Badge variant="outline" className="border-white/20 text-white bg-white/10">
                  Headquarters
                </Badge>
              </div>
              
              <h3 className="text-xl font-bold mb-3">GS1 Saudi Arabia</h3>
              <p className="text-sm opacity-90 mb-4">{address}</p>
              
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 opacity-70" />
                  <a href="tel:+966112182421" className="hover:underline">+966 11 218 2421</a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 opacity-70" />
                  <span>Sun - Thu: 9AM - 5PM</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, '_blank')}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full justify-start border-white/30 text-white hover:bg-white/20"
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in Maps
                </Button>
              </div>
            </div>

            {/* Map Section */}
            <div className="lg:col-span-2 h-[350px] lg:h-[400px] relative">
              <iframe
                title="GS1 Saudi Arabia Location"
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231786.93231153694!2d${longitude-0.01}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sGS1%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s&zoom=18`}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}