import { HomeToolsGrid } from "@/components/HomeToolsGrid";
import { CategoryToolsSection } from "@/components/CategoryToolsSection";
import { JsonLd } from "@/components/JsonLd";
import { LogoWithName } from "@/components/Logo";
import { SectionHeading } from "@/components/SectionHeading";
import { ComingSoonSection } from "@/components/ComingSoonSection";
import { homepageJsonLdGraph } from "@/lib/structuredData";
import type { Locale } from "@/lib/i18n/config";
import { ui } from "@/lib/i18n/ui";
import { Zap, Shield, Globe, Sparkles } from "lucide-react";

export function LocalizedHome({ locale }: { locale: Locale }) {
  const strings = ui(locale);

  return (
    <>
      <JsonLd data={homepageJsonLdGraph()} />
      <section className="px-4 pb-2 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <LogoWithName variant="hero" priority className="mb-4" />
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
            {strings.home.title}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {strings.home.subtitle}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4 pt-2 sm:px-6 lg:px-8">
        <HomeToolsGrid locale={locale} />
      </section>

      <section className="mx-auto max-w-6xl border-t border-zinc-200 px-4 py-10 sm:px-6 lg:px-8 dark:border-zinc-800">
        <CategoryToolsSection locale={locale} />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {[
            { icon: Zap, title: strings.toolPage.fast, desc: strings.toolPage.fastDesc },
            { icon: Shield, title: strings.toolPage.private, desc: strings.toolPage.privateDesc },
            { icon: Globe, title: "Global", desc: "suhadimg.site" },
            { icon: Sparkles, title: strings.toolPage.free, desc: strings.toolPage.freeDesc },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-center gap-2.5 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
                <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-xs font-semibold text-zinc-900 dark:text-white">
                  {title}
                </h3>
                <p className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <SectionHeading title={strings.home.howToTitle} />
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            https://suhadimg.site — SUHADIMG. {strings.home.subtitle}
          </p>
        </div>
      </section>

      <ComingSoonSection />
    </>
  );
}
