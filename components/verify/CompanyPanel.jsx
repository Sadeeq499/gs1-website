"use client";

import React, { useState } from "react";
import {
  Search,
  Loader2,
  Building2,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCompanyVerified } from "@/lib/hooks/useVerify";
import { useDebounce } from "@/lib/hooks/useDebounce";
import CompanyDetailModal from "./CompanyDetailModal";

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export default function CompanyPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Debounce the search input by 500ms
  const debouncedSearch = useDebounce(searchQuery, 500);

  const {
    data: responseData,
    isFetching,
    isError,
    error,
  } = useCompanyVerified({
    companyName: debouncedSearch || undefined,
    page,
    limit,
  });

  const companies = responseData?.data?.companies || [];
  const pagination = responseData?.data?.pagination;

  // Computed pagination values
  const totalCount = pagination?.totalCount || 0;
  const totalPages = pagination?.totalPages || 1;
  const rangeStart = totalCount === 0 ? 0 : (page - 1) * limit + 1;
  const rangeEnd = Math.min(page * limit, totalCount);

  const handlePageSizeChange = (newLimit) => {
    setLimit(Number(newLimit));
    setPage(1);
  };

  return (
    <div className="mx-auto w-full max-w-[960px] pt-6 pb-12">
      {/* ── Search Bar ────────────────────────────────── */}
      <div className="relative flex w-full items-center mb-8">
        <div className="absolute left-3.5 flex items-center justify-center text-slate-400 pointer-events-none">
          <Search className="h-5 w-5 stroke-[1.5]" />
        </div>

        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search by company name..."
          className="h-12 w-full pl-11 pr-4 text-[15px] border-slate-300 rounded-md focus-visible:ring-primary focus-visible:border-primary shadow-sm"
        />

        {isFetching && (
          <div className="absolute right-3.5 flex items-center">
            <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
          </div>
        )}
      </div>

      {/* ── Error ─────────────────────────────────────── */}
      {isError && (
        <div className="text-red-500 bg-red-50 p-4 rounded-md border border-red-200 mb-6">
          <p className="font-medium">Error loading company data.</p>
          <p className="text-sm mt-1">
            {error?.response?.data?.error ||
              error?.message ||
              "An unexpected error occurred"}
          </p>
        </div>
      )}

      {/* ── Table ──────────────────────────────────────── */}
      <div className="rounded-lg border border-slate-200 overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#f0f4f8] hover:bg-[#f0f4f8] border-b border-slate-200">
              <TableHead className="text-[#3a4a5c] font-semibold text-[13px] uppercase tracking-wide py-3 px-5 w-[160px]">
                License Key
              </TableHead>
              <TableHead className="text-[#3a4a5c] font-semibold text-[13px] uppercase tracking-wide py-3 px-5">
                Company Name
              </TableHead>
              <TableHead className="text-[#3a4a5c] font-semibold text-[13px] uppercase tracking-wide py-3 px-5 w-[160px]">
                City
              </TableHead>
              <TableHead className="text-[#3a4a5c] font-semibold text-[13px] uppercase tracking-wide py-3 px-5 w-[160px]">
                Country
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isFetching ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4} className="h-60">
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-[#0b1c5c]" />
                    <span className="ml-3 text-slate-500">
                      Loading companies…
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : companies.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4} className="h-60">
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <Building2 className="h-10 w-10 mb-3 stroke-[1.2]" />
                    <p className="font-medium text-slate-500">
                      No companies found
                    </p>
                    <p className="text-sm mt-1">Try a different search term</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              companies.map((company, i) => (
                <TableRow
                  key={company.gcpGLNID + "-" + i}
                  className={`border-b border-slate-100 transition-colors ${
                    i % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                  } hover:bg-blue-50/50`}
                >
                  <TableCell className="py-3.5 px-5 font-mono text-[14px] text-[#0b1c5c]">
                    {company.gcpGLNID || "---"}
                  </TableCell>
                  <TableCell className="py-3.5 px-5">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCompany(company);
                        setModalOpen(true);
                      }}
                      className="text-[14px] font-medium text-[#1a6fa0] hover:underline cursor-pointer text-left"
                    >
                      {company.company_name_eng || "---"}
                    </button>
                  </TableCell>
                  <TableCell className="py-3.5 px-5 text-[14px] text-slate-600">
                    {company.city && company.state
                      ? `${company.city}, ${company.state}`
                      : company.city || company.state || "---"}
                  </TableCell>
                  <TableCell className="py-3.5 px-5 text-[14px] text-slate-600">
                    {company.country || "---"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── Pagination Footer ── Matches reference: "Items per page [10v]  1-10 of 20  « ‹ › »" */}
      {pagination && (
        <div className="flex items-center justify-end gap-6 mt-4 px-1 text-sm text-slate-600">
          {/* Items per page */}
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap">Items per page</span>
            <Select value={String(limit)} onValueChange={handlePageSizeChange}>
              <SelectTrigger className="h-8 w-[68px] text-sm border-slate-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Range info */}
          <span className="whitespace-nowrap tabular-nums">
            {rangeStart}-{rangeEnd} of {totalCount}
          </span>

          {/* Navigation buttons */}
          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500 hover:text-[#0b1c5c] disabled:opacity-30"
              disabled={page <= 1}
              onClick={() => setPage(1)}
              title="First page"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500 hover:text-[#0b1c5c] disabled:opacity-30"
              disabled={!pagination.hasPrevious}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              title="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500 hover:text-[#0b1c5c] disabled:opacity-30"
              disabled={!pagination.hasNext}
              onClick={() => setPage((p) => p + 1)}
              title="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500 hover:text-[#0b1c5c] disabled:opacity-30"
              disabled={page >= totalPages}
              onClick={() => setPage(totalPages)}
              title="Last page"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ── Company Detail Modal ─────────────────── */}
      <CompanyDetailModal
        company={selectedCompany}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
