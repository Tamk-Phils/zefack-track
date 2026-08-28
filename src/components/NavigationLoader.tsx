"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Navigation } from "lucide-react";

function LoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("#") &&
        href !== pathname &&
        !anchor.target
      ) {
        setIsLoading(true);
      }
    };

    const handleFormSubmit = (e: SubmitEvent) => {
      setIsLoading(true);
    };

    document.addEventListener("click", handleAnchorClick);
    document.addEventListener("submit", handleFormSubmit);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      document.removeEventListener("submit", handleFormSubmit);
    };
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col justify-between">
      {/* Top Loading Progress Line */}
      <div className="w-full h-1 bg-blue-100 overflow-hidden relative shadow-sm">
        <div className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 animate-pulse w-full" />
      </div>

      {/* Floating Center Loading Spinner Card */}
      <div className="fixed inset-0 bg-slate-900/15 backdrop-blur-[2px] flex items-center justify-center pointer-events-auto animate-in fade-in duration-150">
        <div className="bg-white/95 backdrop-blur-md px-6 py-5 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-4 text-slate-800 animate-in zoom-in-95 duration-150">
          <div className="relative flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-3 border-blue-100 border-t-blue-600 animate-spin" />
            <Navigation size={16} className="text-blue-600 absolute transform rotate-45" />
          </div>
          <div>
            <p className="font-extrabold text-sm text-slate-900 tracking-tight">SwiftLink Logistics</p>
            <p className="text-[11px] text-blue-600 font-bold uppercase tracking-wider animate-pulse">Loading Page Data...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NavigationLoader() {
  return (
    <Suspense fallback={null}>
      <LoaderContent />
    </Suspense>
  );
}
