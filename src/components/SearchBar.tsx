"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

interface SearchHit {
  slug: string;
  title: string;
  shortTitle: string;
}

interface SearchBarProps {
  autoFocus?: boolean;
  compact?: boolean;
}

export function SearchBar({ autoFocus = false, compact = false }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchHit[]>([]);
  const [open, setOpen] = useState(false);
  const [searchReady, setSearchReady] = useState(false);
  const searchFnRef = useRef<((q: string) => SearchHit[]) | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const loadSearch = useCallback(async () => {
    if (searchFnRef.current) return;
    const { searchTools } = await import("@/lib/tools");
    searchFnRef.current = (q: string) =>
      searchTools(q).slice(0, 8).map((t) => ({
        slug: t.slug,
        title: t.title,
        shortTitle: t.shortTitle,
      }));
    setSearchReady(true);
  }, []);

  useEffect(() => {
    if (!searchReady || !searchFnRef.current) return;
    if (query.trim()) {
      setResults(searchFnRef.current(query));
      setOpen(true);
    } else {
      setResults([]);
      setOpen(false);
    }
  }, [query, searchReady]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div
      ref={ref}
      className={`relative ${compact ? "w-full max-w-[200px] sm:max-w-[240px]" : "w-full max-w-xl"}`}
    >
      <div className="relative">
        <Search
          className={`absolute top-1/2 -translate-y-1/2 text-zinc-400 ${
            compact ? "left-2.5 h-3.5 w-3.5" : "left-4 h-5 w-5"
          }`}
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            void loadSearch();
            if (query) setOpen(true);
          }}
          placeholder={compact ? "Search tools..." : "Search tools... (e.g. PNG to JPG, compress)"}
          autoFocus={autoFocus}
          className={
            compact
              ? "w-full rounded-lg border border-zinc-200 bg-zinc-50 py-1.5 pl-8 pr-3 text-xs text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:bg-zinc-800"
              : "w-full rounded-xl border border-zinc-200 bg-white py-3 pl-12 pr-4 text-sm text-zinc-900 shadow-sm outline-none ring-blue-500 transition-shadow placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500"
          }
        />
      </div>
      {open && results.length > 0 && (
        <ul className="absolute z-[60] mt-1.5 w-full min-w-[220px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
          {results.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/${tool.slug}`}
                prefetch
                onClick={() => {
                  setQuery("");
                  setOpen(false);
                }}
                className="flex flex-col px-3 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >
                <span className="text-sm font-medium text-zinc-900 dark:text-white">
                  {tool.shortTitle}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {tool.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
