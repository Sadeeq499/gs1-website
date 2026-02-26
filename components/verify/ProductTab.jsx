// components/verify/ProductTab.jsx  (Client Component)
"use client";

import { useState } from "react";
import { useProduct } from "@/lib/hooks/useVerify";
import { VERIFY_TABS } from "./verify";
import SearchBar from "@/components/verify/SearchBar";
import ProductResult from "@/components/verify/ProductResult";
import { Spinner, ErrorState, EmptyState } from "@/components/verify/ui";
import { XCircle } from "lucide-react";

const TAB = VERIFY_TABS.find((t) => t.id === "product");

export default function ProductTab() {
  const [query, setQuery] = useState("");

  const { data, isFetching, error, refetch } = useProduct(query);

  const handleSearch = (q) => setQuery(q);

  const productData = data?.data;
  const hasData = Boolean(productData) && data?.ProductDataAvailable;
  const notFound = query && !isFetching && !error && data && !hasData;
  const validateProduct = (val) => {
    if (val.length < 13) {
      return { success: false, message: "Please enter a valid GTIN (min 13 digits)" };
    }
    return { success: true };
  };
  return (
    <div>
      <SearchBar
        placeholder={TAB.placeholder}
        onSearch={handleSearch}
        isLoading={isFetching}
        validate={validateProduct}
      />

      {isFetching && <Spinner />}

      {error && !isFetching && (
        <ErrorState message={error.message} onRetry={refetch} />
      )}

      {notFound && (
        <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-300">
          <XCircle className="mb-4 h-16 w-16 text-muted-foreground/40" />
          <h3 className="mb-1 text-xl font-semibold">Product Not Found</h3>
          <p className="text-muted-foreground">
            No product registered for GTIN <code className="font-mono">{query}</code>
          </p>
        </div>
      )}

      {hasData && !isFetching && <ProductResult data={productData} />}

      {!query && !isFetching && (
        <EmptyState
          icon={TAB.icon}
          title={TAB.label}
          description={TAB.description}
          example={TAB.placeholder}
        />
      )}
    </div>
  );
}