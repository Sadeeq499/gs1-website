import { EventsHero } from "@/components/events/EventsHero";
import { EventsGrid } from "@/components/events/EventsGrid";
import { NewsletterSection } from "@/components/events/NewsletterSection";
import { EVENTS_DATA } from "@/components/events/events-data";
export const metadata = {
  title: EVENTS_DATA.metadata.title,
  description: EVENTS_DATA.metadata.description,
};

export default function EventsPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <EventsHero />
      <EventsGrid />
      <NewsletterSection />
    </div>
  );
}