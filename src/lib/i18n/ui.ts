import type { Locale } from "./config";

export const UI = {
  nav: {
    home: { en: "Home", es: "Inicio", ja: "ホーム", de: "Start", fr: "Accueil" },
    allTools: {
      en: "All Tools",
      es: "Todas las herramientas",
      ja: "すべてのツール",
      de: "Alle Tools",
      fr: "Tous les outils",
    },
    blog: { en: "Blog", es: "Blog", ja: "ブログ", de: "Blog", fr: "Blog" },
    about: { en: "About", es: "Acerca de", ja: "概要", de: "Über uns", fr: "À propos" },
    contact: {
      en: "Contact",
      es: "Contacto",
      ja: "お問い合わせ",
      de: "Kontakt",
      fr: "Contact",
    },
    more: { en: "More", es: "Más", ja: "その他", de: "Mehr", fr: "Plus" },
    viewAllTools: {
      en: "View all tools →",
      es: "Ver todas las herramientas →",
      ja: "すべてのツールを見る →",
      de: "Alle Tools anzeigen →",
      fr: "Voir tous les outils →",
    },
  },
  toolPage: {
    dropHint: {
      en: "Drop your files below — processed instantly, deleted immediately",
      es: "Suelta tus archivos abajo — procesamiento instantáneo, eliminados al instante",
      ja: "下にファイルをドロップ — 即座に処理、すぐに削除",
      de: "Dateien unten ablegen — sofort verarbeitet, sofort gelöscht",
      fr: "Déposez vos fichiers ci-dessous — traitement instantané, suppression immédiate",
    },
    loadingTool: {
      en: "Loading tool…",
      es: "Cargando herramienta…",
      ja: "ツールを読み込み中…",
      de: "Tool wird geladen…",
      fr: "Chargement de l'outil…",
    },
    fast: { en: "Fast", es: "Rápido", ja: "高速", de: "Schnell", fr: "Rapide" },
    fastDesc: {
      en: "Processed in seconds with Sharp",
      es: "Procesado en segundos con Sharp",
      ja: "Sharpで数秒で処理",
      de: "In Sekunden mit Sharp verarbeitet",
      fr: "Traité en secondes avec Sharp",
    },
    private: {
      en: "Private",
      es: "Privado",
      ja: "プライベート",
      de: "Privat",
      fr: "Privé",
    },
    privateDesc: {
      en: "Files deleted immediately",
      es: "Archivos eliminados al instante",
      ja: "ファイルは即座に削除",
      de: "Dateien sofort gelöscht",
      fr: "Fichiers supprimés immédiatement",
    },
    free: { en: "Free", es: "Gratis", ja: "無料", de: "Kostenlos", fr: "Gratuit" },
    freeDesc: {
      en: "No watermark, no signup",
      es: "Sin marca de agua, sin registro",
      ja: "透かしなし、登録不要",
      de: "Kein Wasserzeichen, keine Anmeldung",
      fr: "Sans filigrane, sans inscription",
    },
    faqTitle: {
      en: "Frequently Asked Questions",
      es: "Preguntas frecuentes",
      ja: "よくある質問",
      de: "Häufig gestellte Fragen",
      fr: "Questions fréquentes",
    },
    relatedTitle: {
      en: "Related Tools",
      es: "Herramientas relacionadas",
      ja: "関連ツール",
      de: "Verwandte Tools",
      fr: "Outils associés",
    },
    relatedSubtitle: {
      en: "More tools you might find useful",
      es: "Más herramientas que te pueden servir",
      ja: "役立つかもしれないツール",
      de: "Weitere nützliche Tools",
      fr: "D'autres outils utiles",
    },
    home: { en: "Home", es: "Inicio", ja: "ホーム", de: "Start", fr: "Accueil" },
  },
  seoSections: {
    whatItDoes: {
      en: "What This Tool Does",
      es: "Qué hace esta herramienta",
      ja: "このツールの機能",
      de: "Was dieses Tool macht",
      fr: "Ce que fait cet outil",
    },
    whoShouldUse: {
      en: "Who Should Use This Tool",
      es: "Quién debe usar esta herramienta",
      ja: "こんな方におすすめ",
      de: "Für wen ist dieses Tool",
      fr: "Pour qui est cet outil",
    },
    howTo: {
      en: "How to Use This Tool Online",
      es: "Cómo usar esta herramienta en línea",
      ja: "オンラインでの使い方",
      de: "So nutzen Sie dieses Tool online",
      fr: "Comment utiliser cet outil en ligne",
    },
    useCases: {
      en: "Common Use Cases",
      es: "Casos de uso comunes",
      ja: "一般的な使用例",
      de: "Typische Anwendungsfälle",
      fr: "Cas d'utilisation courants",
    },
    benefits: {
      en: "Benefits",
      es: "Beneficios",
      ja: "メリット",
      de: "Vorteile",
      fr: "Avantages",
    },
    features: {
      en: "Features",
      es: "Características",
      ja: "機能",
      de: "Funktionen",
      fr: "Fonctionnalités",
    },
    whyConvert: {
      en: "Why Convert Images?",
      es: "¿Por qué convertir imágenes?",
      ja: "画像を変換する理由",
      de: "Warum Bilder konvertieren?",
      fr: "Pourquoi convertir des images ?",
    },
    whyCompress: {
      en: "Why Compress Images?",
      es: "¿Por qué comprimir imágenes?",
      ja: "画像を圧縮する理由",
      de: "Warum Bilder komprimieren?",
      fr: "Pourquoi compresser des images ?",
    },
    whyResize: {
      en: "Why Resize Images?",
      es: "¿Por qué redimensionar imágenes?",
      ja: "画像をリサイズする理由",
      de: "Warum Bilder skalieren?",
      fr: "Pourquoi redimensionner des images ?",
    },
  },
  home: {
    title: {
      en: "Free Online Image Converter & Editor Tool",
      es: "Convertidor de imágenes gratis en línea",
      ja: "無料オンライン画像変換",
      de: "Kostenloser Online-Bildkonverter",
      fr: "Convertisseur d'images gratuit en ligne",
    },
    subtitle: {
      en: "Convert, compress, resize & edit — 100% free, no signup, files deleted instantly.",
      es: "Convierte, comprime, redimensiona y edita — 100% gratis, sin registro, archivos eliminados al instante.",
      ja: "変換・圧縮・リサイズ・編集 — 完全無料、登録不要、ファイルは即削除。",
      de: "Konvertieren, komprimieren, skalieren & bearbeiten — 100% kostenlos, keine Anmeldung, Dateien sofort gelöscht.",
      fr: "Convertir, compresser, redimensionner et éditer — 100% gratuit, sans inscription, fichiers supprimés instantanément.",
    },
    howToTitle: {
      en: "How to Convert Images Online",
      es: "Cómo convertir imágenes en línea",
      ja: "オンラインで画像を変換する方法",
      de: "Bilder online konvertieren",
      fr: "Comment convertir des images en ligne",
    },
  },
  banner: {
    message: {
      en: "We detected you might prefer {lang}. View in {lang}?",
      es: "Detectamos que prefieres {lang}. ¿Ver en {lang}?",
      ja: "{lang}の表示をおすすめします。{lang}で表示しますか？",
      de: "Wir haben erkannt, dass Sie {lang} bevorzugen. In {lang} anzeigen?",
      fr: "Nous avons détecté que vous préférez {lang}. Afficher en {lang} ?",
    },
    switch: { en: "Switch", es: "Cambiar", ja: "切替", de: "Wechseln", fr: "Changer" },
    dismiss: { en: "Stay in English", es: "Permanecer en inglés", ja: "英語のまま", de: "Auf Englisch bleiben", fr: "Rester en anglais" },
  },
  categories: {
    conversion: {
      en: "Image Conversion",
      es: "Conversión de imágenes",
      ja: "画像変換",
      de: "Bildkonvertierung",
      fr: "Conversion d'images",
    },
    compression: {
      en: "Image Compression",
      es: "Compresión de imágenes",
      ja: "画像圧縮",
      de: "Bildkomprimierung",
      fr: "Compression d'images",
    },
    resize: {
      en: "Resize Image",
      es: "Redimensionar imagen",
      ja: "画像リサイズ",
      de: "Bild skalieren",
      fr: "Redimensionner l'image",
    },
    editing: {
      en: "Image Editing",
      es: "Edición de imágenes",
      ja: "画像編集",
      de: "Bildbearbeitung",
      fr: "Édition d'images",
    },
    advanced: {
      en: "Advanced Tools",
      es: "Herramientas avanzadas",
      ja: "高度なツール",
      de: "Erweiterte Tools",
      fr: "Outils avancés",
    },
  },
} as const;

export function t(
  locale: Locale,
  strings: Record<Locale, string>,
  vars?: Record<string, string>
): string {
  let text = strings[locale] ?? strings.en;
  if (vars) {
    for (const [key, value] of Object.entries(vars)) {
      text = text.replace(`{${key}}`, value);
    }
  }
  return text;
}

export function ui(locale: Locale) {
  return {
    nav: {
      home: t(locale, UI.nav.home),
      allTools: t(locale, UI.nav.allTools),
      blog: t(locale, UI.nav.blog),
      about: t(locale, UI.nav.about),
      contact: t(locale, UI.nav.contact),
      more: t(locale, UI.nav.more),
      viewAllTools: t(locale, UI.nav.viewAllTools),
    },
    toolPage: {
      dropHint: t(locale, UI.toolPage.dropHint),
      fast: t(locale, UI.toolPage.fast),
      fastDesc: t(locale, UI.toolPage.fastDesc),
      private: t(locale, UI.toolPage.private),
      privateDesc: t(locale, UI.toolPage.privateDesc),
      free: t(locale, UI.toolPage.free),
      freeDesc: t(locale, UI.toolPage.freeDesc),
      faqTitle: t(locale, UI.toolPage.faqTitle),
      relatedTitle: t(locale, UI.toolPage.relatedTitle),
      relatedSubtitle: t(locale, UI.toolPage.relatedSubtitle),
      home: t(locale, UI.toolPage.home),
    },
    seoSections: {
      whatItDoes: t(locale, UI.seoSections.whatItDoes),
      whoShouldUse: t(locale, UI.seoSections.whoShouldUse),
      howTo: t(locale, UI.seoSections.howTo),
      useCases: t(locale, UI.seoSections.useCases),
      benefits: t(locale, UI.seoSections.benefits),
      features: t(locale, UI.seoSections.features),
    },
    home: {
      title: t(locale, UI.home.title),
      subtitle: t(locale, UI.home.subtitle),
      howToTitle: t(locale, UI.home.howToTitle),
    },
    categories: {
      conversion: t(locale, UI.categories.conversion),
      compression: t(locale, UI.categories.compression),
      resize: t(locale, UI.categories.resize),
      editing: t(locale, UI.categories.editing),
      advanced: t(locale, UI.categories.advanced),
    },
  };
}

export function categoryLabel(
  locale: Locale,
  category: keyof typeof UI.categories
): string {
  return t(locale, UI.categories[category]);
}
