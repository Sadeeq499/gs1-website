"use client"
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import partnersHeroImage from '@/public/images/partners.jpg' 
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PARTNERS_DATA } from './partners-data'

export const PartnerHero = () => {
  const { hero } = PARTNERS_DATA;
  return (
    <section className="relative py-12 lg:py-14 overflow-hidden min-h-[60vh] flex items-center">
      <div className="absolute inset-0 w-full h-full">
        <Image src={partnersHeroImage} alt={hero.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl text-left text-white">
          <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-white/30 text-white bg-white/10 backdrop-blur-sm">
            {hero.badge}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
            {hero.title} <span className="text-secondary italic">{hero.titleHighlight}</span> {hero.titleSuffix}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl drop-shadow">{hero.description}</p>
          <div className="mt-8">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-full px-8 h-12 shadow-lg shadow-secondary/20 transition-all hover:-translate-y-0.5">
              {hero.ctaText} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}