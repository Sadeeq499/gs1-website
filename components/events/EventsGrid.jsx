"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ArrowRight, Video, SearchX } from "lucide-react";
import { EVENTS_DATA } from "./events-data";
export const EventsGrid = () => {
  const [activeFilter, setActiveFilter] = useState("All Events");

  const filteredEvents = activeFilter === "All Events" 
    ? EVENTS_DATA.upcoming 
    : EVENTS_DATA.upcoming.filter(e => e.category === activeFilter);

  return (
    <section className="py-24 container mx-auto px-4 min-h-[600px]">
      {/* Smart Filters */}
      <div className="flex flex-wrap gap-3 mb-12 justify-center">
        {EVENTS_DATA.filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-8 transition-all ${
              activeFilter === filter 
                ? "bg-primary text-white" 
                : "hover:border-primary hover:text-primary border-border"
            }`}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Grid / Empty State Container */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {filteredEvents.length > 0 ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col overflow-hidden border-border/40 group hover:border-secondary/50 shadow-sm hover:shadow-xl transition-all duration-500 bg-card">
                    {/* Header Image Area */}
                    <div className="relative h-56 bg-muted overflow-hidden">
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                          {event.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
                        {event.type === "Online" ? <Video className="w-4 h-4 text-primary" /> : <MapPin className="w-4 h-4 text-primary" />}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <div className="w-full h-full bg-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                        <Calendar className="w-12 h-12 text-primary/10" />
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-secondary font-bold text-sm mb-3">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight text-foreground">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                        {event.desc}
                      </p>

                      <div className="mt-auto space-y-3 pt-6 border-t border-border/50">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <Clock className="w-4 h-4 text-primary/60" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <MapPin className="w-4 h-4 text-primary/60" />
                          {event.location}
                        </div>
                        <Button className="w-full mt-4 bg-gs1-info hover:bg-primary hover:text-secondary text-primary font-bold transition-all duration-300 group/btn">
                          {EVENTS_DATA.register}
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Smart Empty State Design */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gs1-info rounded-full flex items-center justify-center">
                  <SearchX className="w-12 h-12 text-primary/40" />
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-secondary rounded-full border-4 border-white" 
                />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-3">
                {EVENTS_DATA.emptyState.title}
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {EVENTS_DATA.emptyState.description}
              </p>
              <Button 
                variant="outline" 
                onClick={() => setActiveFilter("All Events")}
                className="rounded-full border-primary text-primary hover:bg-primary hover:text-white px-8"
              >
                {EVENTS_DATA.emptyState.clearBtn}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};