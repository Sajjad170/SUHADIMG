"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LogoWithName } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { homeTools } from "@/lib/homepageTools";

const SearchBar = dynamic(
  () => import("./SearchBar").then((m) => m.SearchBar),
  {
    ssr: false,
    loading: () => (
      <div className="h-8 w-full max-w-[200px] animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800 sm:max-w-[240px]" />
    ),
  }
);

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "All Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" prefetch className="shrink-0" aria-label="SUHADIMG home">
          <LogoWithName variant="compact" />
        </Link>

        <div className="flex min-w-0 flex-1 justify-center px-2">
          <SearchBar compact />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <nav className="hidden items-center gap-0.5 sm:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch
                className="rounded-lg px-2.5 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 lg:px-3 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreOpen(!moreOpen)}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 lg:px-3 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                aria-expanded={moreOpen}
                aria-haspopup="true"
              >
                More
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${moreOpen ? "rotate-180" : ""}`}
                />
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full z-50 mt-1 w-56 rounded-xl border border-zinc-200 bg-white py-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                  {homeTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/${tool.slug}`}
                      prefetch
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      {tool.titlePrefix}
                      {tool.suffix === "image" ? " IMAGE" : ""}
                    </Link>
                  ))}
                  <div className="mt-1 border-t border-zinc-100 pt-1 dark:border-zinc-800">
                    <Link
                      href="/tools"
                      prefetch
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-zinc-50 dark:text-blue-400 dark:hover:bg-zinc-800"
                    >
                      View all tools →
                    </Link>
                  </div>
                  <div className="mt-1 border-t border-zinc-100 pt-1 dark:border-zinc-800">
                    {legalLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        prefetch
                        onClick={() => setMoreOpen(false)}
                        className="block px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-zinc-700 sm:hidden dark:text-zinc-300"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950 sm:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              {link.label}
            </Link>
          ))}
          <p className="mt-2 px-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Legal
          </p>
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              {link.label}
            </Link>
          ))}
          <p className="mt-2 px-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
            More Tools
          </p>
          {homeTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              prefetch
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400"
            >
              {tool.titlePrefix}
              {tool.suffix === "image" ? " IMAGE" : ""}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
