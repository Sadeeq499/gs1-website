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

export default function IncorrectDataDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 text-[#0369a1] hover:underline text-[16px] text-left w-fit mb-4"
        >
          <Info className="h-6 w-6 stroke-[1.5]" />
          <span className="font-medium text-[18px]">
            My product information is incorrect, what should i do?
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className=" no-scrollbar max-w-[700px] bg-white border-0 shadow-xl rounded-xl p-8 max-h-[85vh] overflow-y-auto">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-[#0b1c5c] text-[22px] font-medium leading-[1.4]">
            I've queried for my own product in Verified by GS1, but the
            information displayed is not correct, what should I do?
          </DialogTitle>
          <DialogDescription className="sr-only">
            Details on handling incorrect product information in Verified by GS1
            Saudi Arabia.
          </DialogDescription>
        </DialogHeader>

        <div className="no-scrollbar space-y-6 text-slate-700 text-[16px] leading-[1.6]">
          <p>
            If you are the brand owner or manufacturer of the product and got
            your identifier (e.g. GTIN™, GLN or GCP) from{" "}
            <strong className="font-semibold text-slate-900">
              GS1 Saudi Arabia
            </strong>
            , the company and product information returned through the Verified
            by GS1 service is based upon the information that you provided to
            GS1 Saudi Arabia as part of your membership application and GTIN™
            issuance process. If you wish to update the information shown,
            please log in to your GS1 Saudi Arabia member portal or contact us
            to inform us of the change.
          </p>

          <p>
            Sometimes brand owners and manufacturers obtain barcode numbers from
            websites or parties other than a GS1 Member Organisation. These may
            be GTINS™ originally issued by a GS1 Member Organisation and now
            resold by a third party, or they may be barcode numbers created and
            issued by the third party. Please be aware that in the GS1 system,
            it is not possible to sell or transfer identifiers such as GTINs™
            issued by GS1 Member Organisations. Once assigned to a party by GS1
            Saudi Arabia, the identifier is forever associated in the GS1
            registries to that party (save for rare exceptions related to duly
            documented business transfer situations described in the GS1
            standards).
          </p>

          <p>
            Whether the numbers are resold GS1 identifiers or other barcode
            numbers that have been invented by a third party, the third parties
            providing such barcode numbers are acting outside of the GS1 system.
            GS1 Saudi Arabia can only provide you with the data that we have,
            and we are unable to assist you regarding barcode numbers provided
            by third parties.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
