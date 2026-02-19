"use client";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Card } from "../ui/card";
import { EVENTS_DATA } from "./events-data";

export const NewsletterSection = () => {
  const { newsletter } = EVENTS_DATA;
  return (
    <section className="py-24 bg-gs1-info relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
      
      <div className="container mx-auto px-4 relative z-10">
        <Card className="max-w-4xl mx-auto p-12 border-none shadow-2xl bg-white rounded-[2rem]">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-secondary/10 flex items-center justify-center rounded-2xl mx-auto mb-6">
              <Mail className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="text-4xl font-bold text-primary">{newsletter.title}</h2>
            <p className="text-muted-foreground">{newsletter.desc}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Input 
                placeholder={newsletter.placeholder} 
                className="h-14 rounded-full border-muted px-6 bg-muted/50 focus:bg-white transition-all"
              />
              <Button size="xl" className="rounded-full bg-primary hover:bg-primary/90 px-10 h-14 font-bold shadow-lg shadow-primary/20">
                {newsletter.button}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};