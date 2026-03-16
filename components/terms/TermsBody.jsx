import { useTranslations } from "next-intl";
import TermsSection from "@/components/terms/TermsSection";

export default function TermsBody() {
  const t = useTranslations("terms");
  const sections = t.raw("sections");

  return (
    <div className="space-y-10">
      {sections.map((section, index) => (
        <div key={section.id}>
          <TermsSection section={section} />
          {index < sections.length - 1 && (
            <div className="mt-10 h-px w-full bg-border/60" />
          )}
        </div>
      ))}
    </div>
  );
}
