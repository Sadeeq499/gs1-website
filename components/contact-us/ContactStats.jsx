"use client"

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'

const stats = [
  { value: '50,000+', label: 'Happy Clients', description: 'Businesses trust GS1 Saudi Arabia' },
  { value: '24/7', label: 'Support Available', description: 'Round-the-clock assistance' },
  { value: '98%', label: 'Satisfaction Rate', description: 'From our valued members' },
  { value: '15+', label: 'Years of Excellence', description: 'Serving Saudi Arabia' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
}

export default function ContactStats() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="p-6 text-center border-0 bg-white/50 backdrop-blur-sm hover:bg-white transition-all duration-300">
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="font-semibold text-foreground mb-1">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}