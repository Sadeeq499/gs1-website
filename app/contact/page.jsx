import ContactHero from '@/components/contact/ContactHero'
import ContactForm from '@/components/contact/ContactForm'
import ContactMap from '@/components/contact/ContactMap'
import ContactFormImage from '@/components/contact/ContactFormImage'
import { CONTACT_DATA } from '@/components/contact/contact-data'

export const metadata = {
  title: CONTACT_DATA.metadata.title,
  description: CONTACT_DATA.metadata.description,
}

export default function ContactPage() {
  return (
    <main className="bg-background min-h-screen">
      <ContactHero />
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ContactFormImage />
          <ContactForm />
        </div>
      </section>
      <ContactMap />
    </main>
  )
}