// components/terms/TermsBody.jsx  — Server Component
import { TERMS_SECTIONS } from "./terms";
import TermsSection from "@/components/terms/TermsSection";

export default function TermsBody() {
  return (
    <div className="space-y-10">
      {TERMS_SECTIONS.map((section, index) => (
        <div key={section.id}>
          <TermsSection section={section} />
          {index < TERMS_SECTIONS.length - 1 && (
            <div className="mt-10 h-px w-full bg-border/60" />
          )}
        </div>
      ))}
    </div>
  );
}
