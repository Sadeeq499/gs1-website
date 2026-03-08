"use client";

import React from "react";
import {
  Building2,
  Globe,
  MapPin,
  Key,
  Hash,
  ExternalLink,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

/**
 * Displays company details inside a modal dialog.
 *
 * Props:
 *  - company  : the company object from the API (or null)
 *  - open     : boolean controlling visibility
 *  - onOpenChange : callback to toggle visibility
 */
export default function CompanyDetailModal({ company, open, onOpenChange }) {
  const t = useTranslations("verify.panels.company.modal");
  const locale = useLocale();

  if (!company) return null;

  // Helper to render a detail row
  const rows = [
    {
      icon: Key,
      label: t("licenseKey"),
      value: company.gcpGLNID,
    },
    {
      icon: Hash,
      label: t("gln"),
      value: company.gln,
    },
    {
      icon: Building2,
      label: t("nameEn"),
      value: company.company_name_eng,
    },
    {
      icon: Building2,
      label: t("nameAr"),
      value: company.company_name_arabic,
      dir: "rtl",
    },
    {
      icon: MapPin,
      label: t("city"),
      value: company.city,
    },
    {
      icon: MapPin,
      label: t("state"),
      value: company.state,
    },
    {
      icon: Globe,
      label: t("country"),
      value: company.country,
    },
    {
      icon: Globe,
      label: t("website"),
      value: company.website,
      isLink: true,
    },
    {
      icon: Hash,
      label: t("gcpType"),
      value: company.gcp_type,
    },
    {
      icon: Hash,
      label: t("source"),
      value: company.user_source,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="no-scrollbar max-w-[620px] bg-white border-0 shadow-xl rounded-xl p-0 max-h-[85vh] overflow-y-auto">
        {/* ── Header ────────────────────────────────── */}
        <div className="bg-[#0b1c5c] rounded-t-xl px-7 py-5">
          <DialogHeader>
            <DialogTitle className="text-white text-[20px] font-semibold leading-tight flex items-center gap-3">
              <Building2 className="h-5 w-5 shrink-0 stroke-[1.5]" />
              {(locale === "ar"
                ? company.company_name_arabic
                : company.company_name_eng) || t("title")}
            </DialogTitle>
            <DialogDescription className="text-white/60 text-sm mt-1.5">
              {t("description")}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* ── Body ──────────────────────────────────── */}
        <div className="px-7 pt-2 pb-7">
          <div className="divide-y divide-slate-100">
            {rows
              .filter(
                (row) =>
                  row.value != null && row.value !== "" && row.value !== "null",
              )
              .map((row, i) => {
                const Icon = row.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-4 py-3.5 first:pt-2"
                  >
                    {/* Icon */}
                    <div className="mt-0.5 flex items-center justify-center w-8 h-8 rounded-md bg-[#0b1c5c]/6 shrink-0">
                      <Icon className="h-4 w-4 text-[#0b1c5c]" />
                    </div>

                    {/* Label + Value */}
                    <div className="min-w-0 flex-1">
                      <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
                        {row.label}
                      </p>

                      {row.isLink ? (
                        <a
                          href={
                            row.value.startsWith("http")
                              ? row.value
                              : `https://${row.value}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="text-[15px] text-[#0369a1] hover:underline inline-flex items-center gap-1.5 break-all"
                        >
                          {row.value}
                          <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                        </a>
                      ) : (
                        <p
                          className="text-[15px] text-slate-800 font-medium break-all"
                          dir={row.dir}
                        >
                          {row.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* ── National Address ── */}
          {company.national_address && (
            <div className="mt-4 p-4 bg-[#f8fafd] rounded-lg border border-slate-100">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                {t("nationalAddress")}
              </p>
              <p className="text-[15px] text-slate-800">
                {company.national_address}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
