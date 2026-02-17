"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: "How do I get a barcode for my products?",
    answer: "Getting a barcode is easy! You can apply online through our member portal. We offer various packages based on your business size and needs. The process typically takes 2-3 business days."
  },
  {
    question: "What is the difference between GTIN and GLN?",
    answer: "GTIN (Global Trade Item Number) identifies products, while GLN (Global Location Number) identifies physical locations like warehouses or stores. Both are essential for supply chain visibility."
  },
  {
    question: "How much does GS1 membership cost?",
    answer: "Membership fees vary based on your company's annual revenue. We offer competitive rates and flexible packages. Contact our sales team for a customized quote."
  },
  {
    question: "Do you offer training on GS1 standards?",
    answer: "Yes! We provide regular workshops, webinars, and customized training sessions on all GS1 standards. Check our events page for upcoming sessions."
  },
  {
    question: "Can I transfer my existing barcodes to GS1 Saudi Arabia?",
    answer: "Yes, we can help you transfer your existing barcodes if you're moving your business to Saudi Arabia or switching from another GS1 member organization."
  },
  {
    question: "What support do you offer for technical issues?",
    answer: "Our technical support team is available Sunday-Thursday during business hours. We offer phone, email, and on-site support for enterprise members."
  }
]

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <Badge variant="outline" className="mb-4 border-primary/20 text-primary">
          FAQ
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground">
          Find quick answers to common questions about our services and standards.
        </p>
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between group"
              >
                <span className="font-semibold text-primary group-hover:text-secondary transition-colors">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-secondary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-muted-foreground border-t pt-4 border-border">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-8"
      >
        <Button variant="link" className="text-secondary hover:text-secondary/80">
          <HelpCircle className="w-4 h-4 mr-2" />
          View all FAQs
        </Button>
      </motion.div>
    </div>
  )
}