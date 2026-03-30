"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useContactUs } from "@/lib/hooks/useContactUs";
export default function ContactForm({ data: form }) {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });

  const { mutate: submitContact, isPending, isSuccess, isError, error, reset } = useContactUs();

  const handleSubmit = (e) => {
    e.preventDefault();

    submitContact(
      {
        name: formState.fullName,
        email: formState.email,
        company: formState.company,
        phoneNumber: formState.phone,
        // subject is not part of the API payload but kept in form state for UX
        message: formState.subject
          ? `[${formState.subject}] ${formState.message}`
          : formState.message,
      },
      {
        onSuccess: () => {
          // Reset form on success
          setFormState({
            fullName: "",
            email: "",
            company: "",
            phone: "",
            subject: "",
            message: "",
          });
          // Auto-clear success banner after 5s
          setTimeout(() => reset(), 5000);
        },
      }
    );
  };

  const handleChange = (e) =>
    setFormState({ ...formState, [e.target.id]: e.target.value });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-6 md:p-8 border-0 shadow-xl bg-linear-to-br from-white to-muted/20">
        <Badge
          variant="outline"
          className="mb-4 border-primary/20 text-primary"
        >
          {form.badge}
        </Badge>
        <h2 className="text-2xl font-bold text-primary mb-2">{form.heading}</h2>
        <p className="text-sm text-muted-foreground mb-6">{form.subheading}</p>

        {/* Success Banner */}
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
            <p className="text-sm text-green-700">{form.successMessage}</p>
          </motion.div>
        )}

        {/* Error Banner */}
        {isError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <p className="text-sm text-red-700">
              {error?.response?.data?.message ??
                form.errorMessage ??
                "Something went wrong. Please try again."}
            </p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-primary">
                {form.labels.fullName}
              </Label>
              <Input
                id="fullName"
                placeholder={form.placeholders.fullName}
                value={formState.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary">
                {form.labels.email}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={form.placeholders.email}
                value={formState.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-primary">
                {form.labels.phone}
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder={form.placeholders.phone}
                value={formState.phone}
                onChange={handleChange}
              />
            </div>

            {/* Company — mapped to API's `company` field */}
            <div className="space-y-2">
              <Label htmlFor="company" className="text-primary">
                {form.labels.company ?? "Company"}
              </Label>
              <Input
                id="company"
                placeholder={form.placeholders.company ?? "Your company name"}
                value={formState.company}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Subject (prepended to message on submit) */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-primary">
              {form.labels.subject}
            </Label>
            <Input
              id="subject"
              placeholder={form.placeholders.subject}
              value={formState.subject}
              onChange={handleChange}
              required
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-primary">
              {form.labels.message}
            </Label>
            <Textarea
              id="message"
              placeholder={form.placeholders.message}
              rows={5}
              value={formState.message}
              onChange={handleChange}
              required
              className="resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Send className="w-5 h-5 mr-2" />
            )}
            {isPending ? form.labels.sending : form.labels.submit}
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            {form.privacyText}{" "}
            <a
              href={form.privacyUrl}
              className="text-secondary hover:underline"
            >
              {form.privacyLinkText}
            </a>
          </p>
        </form>
      </Card>
    </motion.div>
  );
}