"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import building from '@/public/images/building.png'
export default function ContactFormImage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Main Image */}
      <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-xl">
        <Image
          src={building}
          alt="GS1 Saudi Arabia Headquarters"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
        
        <div className="absolute bottom-6 left-6 text-white">
          <Badge className="bg-secondary text-white border-0 mb-2">Headquarters</Badge>
          <h3 className="text-2xl font-bold">GS1 Saudi Arabia</h3>
          <p className="text-sm text-white/80">Riyadh, Kingdom of Saudi Arabia</p>
        </div>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <motion.a
          href="mailto:gs1sa@gs1.org.sa"
          whileHover={{ scale: 1.02 }}
          className="bg-primary/5 hover:bg-primary/10 rounded-xl p-4 text-center transition-all group"
        >
          <Mail className="w-5 h-5 text-secondary mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-xs text-muted-foreground">Email</p>
          <p className="text-xs font-semibold text-primary">gs1sa@gs1.org.sa</p>
        </motion.a>

        <motion.a
          href="tel:+966112182421"
          whileHover={{ scale: 1.02 }}
          className="bg-primary/5 hover:bg-primary/10 rounded-xl p-4 text-center transition-all group"
        >
          <Phone className="w-5 h-5 text-secondary mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-xs text-muted-foreground">Call us</p>
          <p className="text-xs font-semibold text-primary">+966 11 218 2421</p>
        </motion.a>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-primary/5 rounded-xl p-4 text-center"
        >
          <MapPin className="w-5 h-5 text-secondary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Visit us</p>
          <p className="text-xs font-semibold text-primary">Riyadh</p>
        </motion.div>
      </div>

      {/* Stats */}
      {/* <div className="bg-muted/30 rounded-xl p-6">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">50K+</p>
            <p className="text-xs text-muted-foreground">Happy Clients</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">15+</p>
            <p className="text-xs text-muted-foreground">Years Experience</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Badge variant="outline" className="border-secondary/30 text-secondary">
          Trusted by 2M+ companies worldwide
        </Badge>
      </div> */}
    </motion.div>
  )
}