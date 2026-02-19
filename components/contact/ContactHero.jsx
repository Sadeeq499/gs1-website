"use client"
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import contactImage from '@/public/images/contact.jpg'
import { CONTACT_DATA } from './contact-data'

export default function ContactHero() {
  const { hero } = CONTACT_DATA;
  return (
    <section className="relative py-12 lg:py-15 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image src={contactImage} alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/40 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center text-white">
          <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-white/30 text-white bg-white/10 backdrop-blur-sm">
            {hero.badge}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            {hero.title} <span className="text-secondary">{hero.titleHighlight}</span> {hero.titleSuffix}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow">
            {hero.description}
          </p>
        </motion.div>
      </div>
    </section>
  )
}