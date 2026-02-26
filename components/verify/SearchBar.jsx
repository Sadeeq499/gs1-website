"use client";

import { useState } from "react";
import { Search, X, AlertCircle } from "lucide-react";

export default function SearchBar({ placeholder, onSearch, isLoading }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;

    // 1. السماح فقط بالأرقام وبحد أقصى 12 رقم
    if (val === "" || (/^\d+$/.test(val) && val.length <= 12)) {
      setValue(val);
      
      // 2. منطق إظهار الخطأ "أثناء" الكتابة:
      if (val.length > 0 && !val.startsWith("628")) {
        setError("Must start with 628");
      } 
      // لو كمل الـ 12 رقم والبداية صح، نمسح أي خطأ
      else if (val.length === 12 && val.startsWith("628")) {
        setError("");
      }
      // طول ما هو لسه بيكتب (أقل من 12) وبادئ بـ 628، مظهرش خطأ (سيبه يكمل)
      else {
        setError("");
      }
    }
  };

  const submit = () => {
    // عند الضغط على البحث، بنعمل تشيك نهائي على الطول
    if (value.length < 12) {
      setError("Please complete the 12 digits");
      return;
    }
    
    if (value.startsWith("628") && value.length === 12) {
      setError("");
      onSearch(value);
    }
  };

  const clear = () => {
    setValue("");
    setError("");
    onSearch("");
  };

  return (
    <div className="mb-8">
      <div className={`rounded-2xl border bg-card shadow-sm transition-all ${
        error ? 'border-destructive ring-1 ring-destructive' : 'border-border'
      }`}>
        <div className="flex flex-col gap-2 p-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              inputMode="numeric"
              value={value}
              onChange={handleChange}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder={placeholder}
              className="h-13 w-full rounded-lg bg-transparent pl-12 pr-4 text-base outline-none placeholder:text-muted-foreground/60 focus:ring-0"
            />
            {value && (
              <button onClick={clear} className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex gap-2 px-1 pb-1 sm:py-1 sm:pr-1 sm:pl-0">
            <button
              onClick={submit}
              // الزرار معطل لو فيه خطأ أو الطول لسه مكملش
              disabled={!!error || value.length < 12 || isLoading}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#F26334] px-7 text-sm font-semibold text-white shadow transition-all hover:bg-[#d4522a] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
            >
              {isLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Search
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* ظهور الخطأ فقط لو فيه رسالة خطأ فعلياً */}
      {error && (
        <p className="mt-2 flex items-center gap-1 text-sm text-destructive animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
}