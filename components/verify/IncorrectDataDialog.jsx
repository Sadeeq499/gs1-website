"use client";

import React, { useState } from "react";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import { useTranslations } from "next-intl";

export default function IncorrectDataDialog() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("verify.panels.incorrectDataDialog");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 text-[#0369a1] hover:underline text-[16px] text-left w-fit mb-4"
        >
          <Info className="h-6 w-6 stroke-[1.5]" />
          <span className="font-medium text-[18px]">{t("trigger")}</span>
        </button>
      </DialogTrigger>
      <DialogContent className=" no-scrollbar max-w-[700px] bg-white border-0 shadow-xl rounded-xl p-8 max-h-[85vh] overflow-y-auto">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-[#0b1c5c] text-[22px] font-medium leading-[1.4]">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {t("description")}
          </DialogDescription>
        </DialogHeader>

        <div className="no-scrollbar space-y-6 text-slate-700 text-[16px] leading-[1.6]">
          <p>
            {t.rich("content.p1", {
              gs1: (chunks) => (
                <strong className="font-semibold text-slate-900">
                  {chunks}
                </strong>
              ),
            })}
          </p>

          <p>{t("content.p2")}</p>

          <p>{t("content.p3")}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
