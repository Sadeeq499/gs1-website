"use client"

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Building2, 
  HeadphonesIcon,
  Globe,
  Printer
} from 'lucide-react'

const contactMethods = [
  {
    icon: MapPin,
    title: 'Headquarters',
    details: ['GS1 Saudi Arabia', 'Riyadh, Saudi Arabia'],
    action: 'Get directions →',
    link: '#'
  },
  {
    icon: Phone,
    title: 'Phone Support',
    details: ['+966 11 123 4567', '+966 11 123 4568'],
    action: 'Call now',
    link: 'tel:+966111234567'
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['info@gs1sa.org', 'support@gs1sa.org'],
    action: 'Send email',
    link: 'mailto:info@gs1sa.org'
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Sunday - Thursday', '9:00 AM - 5:00 PM'],
    action: 'All timings',
    link: '#'
  },
  {
    icon: Building2,
    title: 'Regional Offices',
    details: ['Jeddah', 'Dammam', 'Makkah'],
    action: 'View locations',
    link: '#'
  },
  {
    icon: HeadphonesIcon,
    title: 'Technical Support',
    details: ['tech@gs1sa.org', 'Ext. 1234'],
    action: 'Get help',
    link: '#'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
}

export default function ContactInfoGrid() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Badge variant="outline" className="mb-4 border-primary/20 text-primary">
          Contact Information
        </Badge>
        <h2 className="text-3xl font-bold text-primary mb-4">
          Get in touch with us
        </h2>
        <p className="text-muted-foreground mb-8">
          Choose the most convenient way to reach us. Our team is always ready to assist you.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-4"
      >
        {contactMethods.map((method, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="p-5 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <method.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary mb-1">{method.title}</h3>
                  {method.details.map((detail, i) => (
                    <p key={i} className="text-sm text-muted-foreground">{detail}</p>
                  ))}
                  <a href={method.link} className="text-sm text-secondary font-medium inline-block mt-2 hover:underline">
                    {method.action}
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}