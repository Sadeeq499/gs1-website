export const EVENTS_DATA = {
  metadata: {
    title: "Events & Training | GS1 Saudi Arabia",
    description: "Join GS1 Saudi Arabia's workshops, webinars, and global forums to master barcode standards, traceability, and digital supply chain transformation.",
  },
  hero: {
    badge: "Knowledge Hub",
    title: "Shape the Future of",
    titleHighlight: "Global Trade",
    titleSuffix: "in the Kingdom",
    description: "Stay ahead with GS1 Saudi Arabia’s specialized training sessions, regulatory workshops, and industry events designed to empower Saudi businesses.",
    stats: [
      { label: "Annual Events", value: "50+" },
      { label: "Professionals Trained", value: "2,500+" },
      { label: "Success Rate", value: "100%" }
    ]
  },
  filters: ["All Events", "Workshops", "Webinars", "Conferences", "Training"],
  register:"Register Now",
  emptyState: {
    title: "No Events Found",
    description: "We don't have any scheduled events for this category at the moment. Please check back soon or explore our other training sessions.",
    clearBtn: "View All Events"
  },
  upcoming: [
    {
      id: 1,
      category: "Training",
      title: "Mastering GS1 Barcode Standards",
      date: "Oct 24, 2024",
      time: "10:00 AM - 01:00 PM",
      location: "Riyadh - GS1 HQ",
      type: "In-Person",
      image: "/images/events/training-1.jpg",
      desc: "A comprehensive deep-dive into GTIN management, barcode quality, and placement for retail products."
    },
    {
      id: 2,
      category: "Workshops",
      title: "SFDA RSD Traceability Workshop",
      date: "Nov 05, 2024",
      time: "09:00 AM - 04:00 PM",
      location: "Virtual (Zoom)",
      type: "Online",
      image: "/images/events/workshop-1.jpg",
      desc: "Technical guidance on implementing DataMatrix for the National Drug Track and Trace system."
    },
    {
      id: 3,
      category: "Conferences",
      title: "Saudi Supply Chain Forum 2024",
      date: "Dec 12, 2024",
      time: "08:30 AM - 05:00 PM",
      location: "Riyadh Exhibition Center",
      type: "Conference",
      image: "/images/events/conf-1.jpg",
      desc: "Discussing the role of GS1 standards in achieving Saudi Vision 2030 logistical goals."
    }
  ],
  newsletter: {
    title: "Don't Miss an Update",
    desc: "Subscribe to receive invitations to our upcoming technical webinars and industry workshops.",
    placeholder: "Enter your corporate email",
    button: "Subscribe"
  }
};