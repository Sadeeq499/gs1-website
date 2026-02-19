"use client"
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Phone, Mail, MapPin } from 'lucide-react'
import building from '@/public/images/building.png'
import { CONTACT_DATA } from './contact-data'

export default function ContactFormImage() {
  const { info } = CONTACT_DATA;
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
      <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-xl">
        <Image src={building} alt={info.companyName} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <Badge className="bg-secondary text-white border-0 mb-2">{info.locationName}</Badge>
          <h3 className="text-2xl font-bold">{info.companyName}</h3>
          <p className="text-sm text-white/80">{info.city}, {info.country}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <motion.a href={`mailto:${info.email}`} whileHover={{ scale: 1.02 }} className="bg-primary/5 hover:bg-primary/10 rounded-xl p-4 text-center transition-all group">
          <Mail className="w-5 h-5 text-secondary mx-auto mb-2 group-hover:scale-110" />
          <p className="text-xs text-muted-foreground">Email</p>
          <p className="text-xs font-semibold text-primary">{info.email}</p>
        </motion.a>
        <motion.a href={`tel:${info.phoneRaw}`} whileHover={{ scale: 1.02 }} className="bg-primary/5 hover:bg-primary/10 rounded-xl p-4 text-center transition-all group">
          <Phone className="w-5 h-5 text-secondary mx-auto mb-2 group-hover:scale-110" />
          <p className="text-xs text-muted-foreground">Call us</p>
          <p className="text-xs font-semibold text-primary">{info.phone}</p>
        </motion.a>
        <motion.div whileHover={{ scale: 1.02 }} className="bg-primary/5 rounded-xl p-4 text-center">
          <MapPin className="w-5 h-5 text-secondary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Visit us</p>
          <p className="text-xs font-semibold text-primary">{info.city}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}