import { BASE_URL } from "@/lib/seo";
import React from "react";
import { getTranslations } from "next-intl/server";
import { Mail, Phone } from "lucide-react";

const WhatsAppIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy-policy.meta" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/privacy-policy`,
      languages: {
        en: `${BASE_URL}/en/privacy-policy`,
        ar: `${BASE_URL}/ar/privacy-policy`,
        "x-default": `${BASE_URL}/en/privacy-policy`,
      },
    },
  };
}

export default async function PrivacyPolicyPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy-policy" });
  const isRtl = locale === "ar";

  return (
    <main className="bg-white min-h-screen pb-20 font-sans">
      {/* Hero Section - Matching other pages */}
      <section className="bg-primary py-12 lg:py-16 relative overflow-hidden">
        {/* Background Gradient similar to IndustryHero */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/95 to-[#002c5c]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4">
              {t("meta.title")}
            </h1>
            <p className="text-lg text-white/90 font-light">
              {t("meta.subtitle")} • {isRtl ? "آخر تحديث" : "Last Updated"}: {t("meta.lastUpdated")}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pt-12 md:pt-16">
        <div className="max-w-4xl mx-auto">
          {/* Intro Paragraph */}
          <div className="mb-12">
            <p className="text-lg text-slate-600 leading-relaxed">
              {t("intro")}
            </p>
          </div>

          {/* Privacy Sections */}
          <div className="space-y-16">
            
            {/* Section 1: Data Access, Collection, Use, and Sharing */}
            <section id="data-collection">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 pb-3 border-b-2 border-primary/10">
                {t("sections.0.title")}
              </h2>
              
              <div className="space-y-10">
                {/* Sub: Types of Data */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {t("sections.0.subsections.0.title")}
                  </h3>
                  <div className="grid gap-4">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="pl-4 rtl:pl-0 rtl:pr-4 border-l-2 rtl:border-l-0 rtl:border-r-2 border-slate-100">
                        <span className="block font-bold text-slate-800 text-sm mb-0.5">
                          {t(`sections.0.subsections.0.items.${i}.label`)}
                        </span>
                        <p className="text-slate-600 text-[15px]">
                          {t(`sections.0.subsections.0.items.${i}.content`)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub: Data Sharing */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {t("sections.0.subsections.1.title")}
                  </h3>
                  <div className="grid gap-4">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="pl-4 rtl:pl-0 rtl:pr-4 border-l-2 rtl:border-l-0 rtl:border-r-2 border-slate-100">
                        <span className="block font-bold text-slate-800 text-sm mb-0.5">
                          {t(`sections.0.subsections.1.items.${i}.label`)}
                        </span>
                        <p className="text-slate-600 text-[15px]">
                          {t(`sections.0.subsections.1.items.${i}.content`)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Secure Data Handling */}
            <section id="secure-handling">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-primary/10">
                {t("sections.1.title")}
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {t("sections.1.lead")}
              </p>
              <div className="grid gap-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-800 block mb-1">
                      {t(`sections.1.items.${i}.label`)}
                    </span>
                    <p className="text-slate-600 text-[15px]">
                      {t(`sections.1.items.${i}.content`)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: Data Retention */}
            <section id="retention-deletion">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-primary/10">
                {t("sections.2.title")}
              </h2>
              <div className="space-y-6">
                {[0, 1].map((i) => (
                  <div key={i}>
                    <span className="font-bold text-slate-800 block mb-1">
                      {t(`sections.2.items.${i}.label`)}
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {t(`sections.2.items.${i}.content`)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: Contact Us */}
            <section id="contact-us" className="pt-10 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                {t("sections.3.title")}
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {t("sections.3.content")}
              </p>
              <div className="flex flex-wrap gap-8">
                {/* Email */}
                <a href={`mailto:${t('sections.3.contact.email')}`} className="group flex items-center gap-3 text-slate-700 hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all">
                    <Mail size={18} />
                  </div>
                  <span className="font-semibold">{t('sections.3.contact.email')}</span>
                </a>
                
                {/* Phone */}
                <a href={`tel:${t('sections.3.contact.phone')}`} className="group flex items-center gap-3 text-slate-700 hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all">
                    <Phone size={18} />
                  </div>
                  <span className="font-semibold">{t('sections.3.contact.phoneLabel')}: {t('sections.3.contact.phone')}</span>
                </a>

                {/* WhatsApp */}
                <a 
                  href={t('sections.3.contact.whatsappLink')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center gap-3 text-slate-700 hover:text-[#25D366] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[#25D366]/10 group-hover:text-[#25D366] transition-all">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <span className="font-semibold">{t('sections.3.contact.whatsapp')}</span>
                </a>
              </div>
            </section>
          </div>

          {/* Footer/Legal Agreement */}
          <div className="mt-20 pt-10 border-t border-slate-100">
            <p className="text-slate-500 text-sm italic mb-8 max-w-3xl leading-relaxed">
              {t("agreement")}
            </p>
            <div className="text-xl font-bold text-primary">
              {t("thanks")}
            </div>
          </div>
        </div>
      </div>

      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": t("meta.title"),
            "description": t("meta.subtitle"),
            "publisher": {
              "@type": "Organization",
              "name": "GS1 Saudi Arabia"
            },
            "dateModified": "2026-03-27"
          })
        }}
      />
    </main>
  );
}