"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle,
  Sparkles,
  Rocket,
  CheckCircle2
} from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header with decorative elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="border-primary/20 text-primary px-4 py-1.5 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Limited Time Offer
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Ready to <span className="text-secondary">get started?</span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of businesses using GS1 standards in Saudi Arabia.
            </p>
          </motion.div>

          {/* Main Content - Card Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side - Contact Options */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-0 shadow-xl bg-white p-8 h-full">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary">Contact Us Today</h3>
                      <p className="text-sm text-muted-foreground">Choose your preferred way</p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {/* Phone */}
                    <a 
                      href="tel:+966112182421"
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-primary/5 transition-all group"
                    >
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center group-hover:bg-secondary/20">
                        <Phone className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Call us directly</p>
                        <p className="font-semibold text-primary">+966 11 218 2421</p>
                      </div>
                      <ArrowRight className="w-4 h-4 ml-auto text-secondary opacity-0 group-hover:opacity-100 transition-all" />
                    </a>

                    {/* Email */}
                    <a 
                      href="mailto:info@gs1sa.org"
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-primary/5 transition-all group"
                    >
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center group-hover:bg-secondary/20">
                        <Mail className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email us</p>
                        <p className="font-semibold text-primary">info@gs1sa.org</p>
                      </div>
                      <ArrowRight className="w-4 h-4 ml-auto text-secondary opacity-0 group-hover:opacity-100 transition-all" />
                    </a>

                    {/* WhatsApp */}
                    <a 
                      href="https://wa.me/966112182421"
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-primary/5 transition-all group"
                    >
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center group-hover:bg-secondary/20">
                        <MessageCircle className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">WhatsApp</p>
                        <p className="font-semibold text-primary">+966 11 218 2421</p>
                      </div>
                      <ArrowRight className="w-4 h-4 ml-auto text-secondary opacity-0 group-hover:opacity-100 transition-all" />
                    </a>

                    {/* Location */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Visit us</p>
                        <p className="font-semibold text-primary">Riyadh, Kingdom of Saudi Arabia</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Right Side - Benefits & CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-primary to-primary/90 text-white p-8 h-full">
                <div className="space-y-6">
                  <Badge variant="outline" className="border-white/20 text-white bg-white/10">
                    Why Choose GS1?
                  </Badge>

                  <h3 className="text-2xl font-bold">
                    The global language of business.
                  </h3>
                  
                  <p className="text-white/80">
                    Empowering Saudi enterprises with world-class standards for supply chain excellence.
                  </p>

                  <div className="space-y-3">
                    {[
                      "Global standards for supply chain",
                      "Trusted by 2M+ companies worldwide",
                      "Expert support & training",
                      "Digital transformation solutions"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-secondary" />
                        <span className="text-sm text-white/90">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6">
                    <Button 
                      size="lg"
                      className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-xl h-14 text-lg shadow-lg"
                      onClick={() => window.location.href = '/contact#form'}
                    >
                      Get Started Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    
                    <p className="text-center text-white/60 text-sm mt-4">
                      Free consultation • No commitment
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          >
            {[
              { label: "Happy Clients", value: "50,000+" },
              { label: "Years of Excellence", value: "15+" },
              { label: "Global Members", value: "2M+" },
              { label: "Support Response", value: "< 24h" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}