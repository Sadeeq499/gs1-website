// components/verify/MembersTab.jsx  (Client Component)
"use client";

import { useState } from "react";
import { useMembers } from "@/lib/hooks/useVerify";
import { VERIFY_TABS } from "./verify";
import SearchBar from "@/components/verify/SearchBar";
import { StatusBadge, Spinner, ErrorState, EmptyState } from "@/components/verify/ui";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";

const TAB = VERIFY_TABS.find((t) => t.id === "members");

export default function MembersTab() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isFetching, error, refetch } = useMembers({
    page,
    pageSize: 10,
    search,
  });

  const members = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;
  const totalRecords = data?.total ?? 0;

  const handleSearch = (q) => {
    setSearch(q);
    setPage(1);
  };

  return (
    <div>
      <SearchBar
        // placeholder={TAB.placeholder}
        onSearch={handleSearch}
        isLoading={isFetching}
      />

      {error && !isFetching && (
        <ErrorState message={error.message} onRetry={refetch} />
      )}

      {isFetching && <Spinner />}

      {!isFetching && !error && members.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Users className="mb-4 h-16 w-16 text-muted-foreground/30" />
          <h3 className="mb-1 text-xl font-semibold">No members found</h3>
          {search ? (
            <p className="text-muted-foreground">
              No results for &ldquo;{search}&rdquo;. Try a different name or GLN.
            </p>
          ) : (
            <EmptyState
              icon={TAB.icon}
              title={TAB.label}
              description={TAB.description}
              // example={TAB.placeholder}
            />
          )}
        </div>
      )}

      {!isFetching && members.length > 0 && (
        <div className="animate-in fade-in duration-300 space-y-5">
          {/* Table */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/60">
                    {["Company", "GLN", "Status", "ID"].map((col) => (
                      <th
                        key={col}
                        className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {members.map((m, i) => (
                    <tr
                      key={m.id ?? i}
                      className="group cursor-pointer transition hover:bg-accent/50"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#002C6C] dark:text-foreground group-hover:text-[#F26334] transition-colors">
                          {m.company_name_eng || m.company_name_arabic || "—"}
                        </p>
                        {m.company_name_arabic && m.company_name_eng && (
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {m.company_name_arabic}
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-4 font-mono font-semibold text-foreground">
                        {m.gln || "—"}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={m.status} />
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#002C6C]/10 text-xs font-bold text-[#002C6C] dark:text-blue-300">
                          {m.memberID ?? i + 1}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Total:{" "}
                <span className="font-semibold text-foreground">
                  {totalRecords}
                </span>{" "}
                members
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground disabled:cursor-not-allowed disabled:opacity-40 hover:bg-accent transition"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="min-w-[80px] rounded-lg bg-[#002C6C] px-4 py-1.5 text-center text-sm font-semibold text-white">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground disabled:cursor-not-allowed disabled:opacity-40 hover:bg-accent transition"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}