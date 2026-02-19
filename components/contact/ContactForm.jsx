"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { CONTACT_DATA } from './contact-data'

export default function ContactForm() {
  const { form } = CONTACT_DATA;
  const [formState, setFormState] = useState({ fullName: '', email: '', phone: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitStatus('success');
    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus(null), 5000);
  }

  const handleChange = (e) => setFormState({ ...formState, [e.target.id]: e.target.value })

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <Card className="p-6 md:p-8 border-0 shadow-xl bg-gradient-to-br from-white to-muted/20">
        <Badge variant="outline" className="mb-4 border-primary/20 text-primary">{form.badge}</Badge>
        <h2 className="text-2xl font-bold text-primary mb-2">{form.heading}</h2>
        <p className="text-sm text-muted-foreground mb-6">{form.subheading}</p>

        {submitStatus === 'success' && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-700">{form.successMessage}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-primary">{form.labels.fullName}</Label>
              <Input id="fullName" placeholder={form.placeholders.fullName} value={formState.fullName} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary">{form.labels.email}</Label>
              <Input id="email" type="email" placeholder={form.placeholders.email} value={formState.email} onChange={handleChange} required />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-primary">{form.labels.phone}</Label>
              <Input id="phone" type="tel" placeholder={form.placeholders.phone} value={formState.phone} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-primary">{form.labels.subject}</Label>
              <Input id="subject" placeholder={form.placeholders.subject} value={formState.subject} onChange={handleChange} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-primary">{form.labels.message}</Label>
            <Textarea id="message" placeholder={form.placeholders.message} rows={5} value={formState.message} onChange={handleChange} required className="resize-none" />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base">
            {isSubmitting ? <AlertCircle className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
            {isSubmitting ? form.labels.sending : form.labels.submit}
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            {form.privacyText} <a href={form.privacyUrl} className="text-secondary hover:underline">{form.privacyLinkText}</a>
          </p>
        </form>
      </Card>
    </motion.div>
  )
}