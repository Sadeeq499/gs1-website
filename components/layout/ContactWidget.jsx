"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const contactLinks = [
  {
    id: "whatsapp",
    icon: <MessageCircle className="w-5 h-5" />,
    label: "WhatsApp",
    href: "https://wa.me/966112182285",
    color: "bg-[#25D366]",
    hoverColor: "hover:bg-[#128C7E]",
  },
  {
    id: "phone",
    icon: <Phone className="w-5 h-5" />,
    label: "Phone",
    href: "tel:920031437",
    color: "bg-primary",
    hoverColor: "hover:opacity-90",
  },
  {
    id: "email",
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    href: "mailto:gs1sa@gs1.org.sa",
    color: "bg-secondary",
    hoverColor: "hover:opacity-90",
  },
];

export default function ContactWidget() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5 pointer-events-none">
      {contactLinks.map((link, index) => (
        <motion.div
          key={link.id}
          className="flex items-center gap-3 pointer-events-auto group"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3, ease: "easeOut" }}
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/95 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-gray-100 whitespace-nowrap">
            {link.label}
          </span>
          <motion.a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className={cn(
              "flex items-center justify-center w-11 h-11 rounded-full text-white shadow-md transition-colors duration-300",
              link.color,
              link.hoverColor,
            )}
          >
            {link.icon}
          </motion.a>
        </motion.div>
      ))}
    </div>
  );
}
