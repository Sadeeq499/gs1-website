"use client"

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import contactImage from '@/public/images/contact.webp'
export default function ContactHero() {
  return (
    <section className="relative py-12 lg:py-15 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
<Image
  src={contactImage}
  alt="Technology and innovation"
  fill
  className="object-cover"
  priority
/>
        {/* Overlay Gradient - Dark to transparent */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/40 to-transparent" />
      </div>

      {/* Animated background elements - تعديل الألوان لتتناسب مع الصورة */}
      <motion.div
        initial={{ opacity: 0.0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-20 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl z-0"
      />
      <motion.div
        initial={{ opacity: 0.0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 3, delay: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-20 right-20 w-[30rem] h-[30rem] bg-white/10 rounded-full blur-3xl z-0"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <Badge 
            variant="outline" 
            className="mb-6 px-4 py-2 text-sm border-white/30 text-white bg-white/10 backdrop-blur-sm"
          >
            Get in touch
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            We&apos;re here to help you with all your{' '}
            <span className="text-secondary">standards and services</span> needs
          </h1>
          
          <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow">
            Whether you&apos;re looking for barcodes, need technical support, or want to learn more about GS1 standards, our team is ready to assist you.
          </p>
        </motion.div>
      </div>
    </section>
  )
}