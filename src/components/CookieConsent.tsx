"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "suhadimg-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEY)) {
      setTimeout(() => setVisible(true), 0);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-zinc-200 bg-white/95 p-4 shadow-lg backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95 sm:p-5"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          We use cookies for theme preferences, analytics, and advertising to
          keep SUHADIMG free. See our{" "}
          <Link href="/cookies" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
            Cookie Policy
          </Link>
          . Your uploaded images are never stored in cookies.
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
