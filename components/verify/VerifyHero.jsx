import { useTranslations } from "next-intl";

// components/verify/VerifyHero.jsx
export default function VerifyHero() {
  const t = useTranslations("verify.hero");

  return (
    <div className="bg-background w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          {/* Green Checkmark Icon */}
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-[#9bcf88] md:h-[90px] md:w-[90px]">
            <svg
              className="h-10 w-10 text-white md:h-12 md:w-12"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-light text-[#002C6C] md:text-[44px]">
              {t("title")}
            </h1>
          </div>
        </div>

        {/* Paragraph */}
        <p className="mt-6 max-w-[800px] text-[15px] leading-relaxed text-[#333333] md:text-[16px]">
          {t("description")}
        </p>
      </div>
    </div>
  );
}
