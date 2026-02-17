import ContactHero from '@/components/contact-us/ContactHero'
import ContactForm from '@/components/contact-us/ContactForm'
import ContactMap from '@/components/contact-us/ContactMap'
import ContactFormImage from '@/components/contact-us/ContactFormImage'

export const metadata = {
  title: 'Contact Us | GS1 Saudi Arabia',
  description: 'Get in touch with GS1 Saudi Arabia for all your standards and services needs.',
}

export default function ContactPage() {
  return (
    <main className="bg-background min-h-screen">
      <ContactHero />
      
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="flex items-center">
            <ContactFormImage />
          </div>
          
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
      
      <ContactMap />
    </main>
  )
}