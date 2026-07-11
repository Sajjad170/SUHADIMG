import type { ToolConfig, ToolFAQ, ToolCategory } from "@/lib/tools";
import { CATEGORY_LABELS } from "@/lib/tools";
import type { Locale } from "./config";
import { categoryLabel, t, UI } from "./ui";

export interface LocalizedToolContent {
  title: string;
  shortTitle: string;
  description: string;
  metaDescription: string;
  categoryLabel: string;
  faqs: ToolFAQ[];
  howToTitle: string;
  steps: string[];
  whyTitle: string;
  whyBody: string;
  introduction: string;
  whatItDoes: string;
  whoShouldUse: string;
  useCases: string[];
  benefits: string[];
}

const FORMAT_LABEL: Record<string, string> = {
  png: "PNG",
  jpg: "JPG",
  jpeg: "JPEG",
  webp: "WebP",
  gif: "GIF",
  bmp: "BMP",
  tiff: "TIFF",
  svg: "SVG",
  heic: "HEIC",
  avif: "AVIF",
  ico: "ICO",
};

function formatLabel(fmt: string): string {
  return FORMAT_LABEL[fmt.toLowerCase()] ?? fmt.toUpperCase();
}

function parseConversion(slug: string): { from: string; to: string } | null {
  const m = slug.match(/^([\w-]+)-to-([\w-]+)$/);
  if (!m) return null;
  return { from: formatLabel(m[1]), to: formatLabel(m[2]) };
}

const TITLE_TEMPLATES: Record<
  Locale,
  {
    conversion: (from: string, to: string) => string;
    compress: (fmt: string) => string;
    resize: () => string;
    crop: () => string;
    rotate: () => string;
    flip: () => string;
    blur: () => string;
    sharpen: () => string;
    grayscale: () => string;
    brightness: () => string;
    contrast: () => string;
    removeBg: () => string;
    upscale: () => string;
    watermark: () => string;
    meme: () => string;
    photoEdit: () => string;
    favicon: () => string;
    generic: (name: string) => string;
  }
> = {
  en: {
    conversion: (f, t) => `${f} to ${t} Converter`,
    compress: (f) => `Compress ${f} Online`,
    resize: () => "Resize Image Online",
    crop: () => "Crop Image Online",
    rotate: () => "Rotate Image Online",
    flip: () => "Flip Image Online",
    blur: () => "Blur Image Online",
    sharpen: () => "Sharpen Image Online",
    grayscale: () => "Black & White Converter",
    brightness: () => "Adjust Brightness Online",
    contrast: () => "Adjust Contrast Online",
    removeBg: () => "Background Remover",
    upscale: () => "Image Upscaler",
    watermark: () => "Watermark Image Online",
    meme: () => "Meme Generator",
    photoEdit: () => "Free Photo Editor",
    favicon: () => "Favicon Generator",
    generic: (n) => n,
  },
  es: {
    conversion: (f, t) => `Convertidor de ${f} a ${t}`,
    compress: (f) => `Comprimir ${f} en línea`,
    resize: () => "Redimensionar imagen en línea",
    crop: () => "Recortar imagen en línea",
    rotate: () => "Rotar imagen en línea",
    flip: () => "Voltear imagen en línea",
    blur: () => "Desenfocar imagen en línea",
    sharpen: () => "Enfocar imagen en línea",
    grayscale: () => "Convertir a blanco y negro",
    brightness: () => "Ajustar brillo en línea",
    contrast: () => "Ajustar contraste en línea",
    removeBg: () => "Eliminar fondo de imagen",
    upscale: () => "Ampliar imagen con IA",
    watermark: () => "Añadir marca de agua",
    meme: () => "Generador de memes",
    photoEdit: () => "Editor de fotos gratis",
    favicon: () => "Generador de favicon",
    generic: (n) => n,
  },
  ja: {
    conversion: (f, t) => `${f}を${t}に変換`,
    compress: (f) => `${f}を圧縮（オンライン）`,
    resize: () => "画像リサイズ（オンライン）",
    crop: () => "画像トリミング（オンライン）",
    rotate: () => "画像回転（オンライン）",
    flip: () => "画像反転（オンライン）",
    blur: () => "画像ぼかし（オンライン）",
    sharpen: () => "画像シャープ化（オンライン）",
    grayscale: () => "白黒変換",
    brightness: () => "明るさ調整（オンライン）",
    contrast: () => "コントラスト調整（オンライン）",
    removeBg: () => "背景削除",
    upscale: () => "画像アップスケール",
    watermark: () => "透かし追加",
    meme: () => "ミーム作成",
    photoEdit: () => "無料フォトエディター",
    favicon: () => "ファビコン生成",
    generic: (n) => n,
  },
  de: {
    conversion: (f, t) => `${f} zu ${t} Konverter`,
    compress: (f) => `${f} online komprimieren`,
    resize: () => "Bild online skalieren",
    crop: () => "Bild online zuschneiden",
    rotate: () => "Bild online drehen",
    flip: () => "Bild online spiegeln",
    blur: () => "Bild online verwischen",
    sharpen: () => "Bild online schärfen",
    grayscale: () => "Schwarz-Weiß-Konverter",
    brightness: () => "Helligkeit online anpassen",
    contrast: () => "Kontrast online anpassen",
    removeBg: () => "Hintergrund entfernen",
    upscale: () => "Bild hochskalieren",
    watermark: () => "Wasserzeichen hinzufügen",
    meme: () => "Meme-Generator",
    photoEdit: () => "Kostenloser Fotoeditor",
    favicon: () => "Favicon-Generator",
    generic: (n) => n,
  },
  fr: {
    conversion: (f, t) => `Convertisseur ${f} en ${t}`,
    compress: (f) => `Compresser ${f} en ligne`,
    resize: () => "Redimensionner une image en ligne",
    crop: () => "Recadrer une image en ligne",
    rotate: () => "Pivoter une image en ligne",
    flip: () => "Retourner une image en ligne",
    blur: () => "Flouter une image en ligne",
    sharpen: () => "Accentuer une image en ligne",
    grayscale: () => "Convertir en noir et blanc",
    brightness: () => "Ajuster la luminosité en ligne",
    contrast: () => "Ajuster le contraste en ligne",
    removeBg: () => "Supprimer l'arrière-plan",
    upscale: () => "Agrandir une image",
    watermark: () => "Ajouter un filigrane",
    meme: () => "Générateur de mèmes",
    photoEdit: () => "Éditeur photo gratuit",
    favicon: () => "Générateur de favicon",
    generic: (n) => n,
  },
};

function resolveTitle(tool: ToolConfig, locale: Locale): string {
  const tpl = TITLE_TEMPLATES[locale];
  const conv = parseConversion(tool.slug);
  if (conv) return tpl.conversion(conv.from, conv.to);

  if (tool.slug.startsWith("compress-")) {
    const fmt = tool.slug.replace("compress-", "");
    return tpl.compress(formatLabel(fmt === "image" ? "image" : fmt));
  }
  if (tool.slug.startsWith("resize")) return tpl.resize();
  if (tool.slug === "crop-image") return tpl.crop();
  if (tool.slug === "rotate-image") return tpl.rotate();
  if (tool.slug === "flip-image") return tpl.flip();
  if (tool.slug.startsWith("blur")) return tpl.blur();
  if (tool.slug === "sharpen-image") return tpl.sharpen();
  if (tool.slug === "black-and-white") return tpl.grayscale();
  if (tool.slug === "adjust-brightness") return tpl.brightness();
  if (tool.slug === "adjust-contrast") return tpl.contrast();
  if (tool.slug === "background-remover") return tpl.removeBg();
  if (tool.slug === "image-upscaler") return tpl.upscale();
  if (tool.slug === "watermark-image") return tpl.watermark();
  if (tool.slug === "meme-generator") return tpl.meme();
  if (tool.slug === "photo-editor") return tpl.photoEdit();
  if (tool.slug.includes("favicon") || tool.slug === "ico-generator")
    return tpl.favicon();

  return locale === "en" ? tool.title : tpl.generic(tool.title);
}

const META_SUFFIX: Record<Locale, string> = {
  en: "Free online image tool on SUHADIMG. Fast, secure, no watermark.",
  es: "Herramienta de imagen gratis en SUHADIMG. Rápida, segura, sin marca de agua.",
  ja: "SUHADIMGの無料オンライン画像ツール。高速・安全・透かしなし。",
  de: "Kostenloses Online-Bildtool auf SUHADIMG. Schnell, sicher, ohne Wasserzeichen.",
  fr: "Outil d'image gratuit sur SUHADIMG. Rapide, sécurisé, sans filigrane.",
};

const DESC_TEMPLATES: Record<
  Locale,
  (title: string, site: string) => string
> = {
  en: (title, site) =>
    `${title} — free, instant, and private. Upload, convert, and download in seconds at ${site}. No signup required.`,
  es: (title, site) =>
    `${title} — gratis, instantáneo y privado. Sube, convierte y descarga en segundos en ${site}. Sin registro.`,
  ja: (title, site) =>
    `${title} — 無料・即時・プライベート。${site}で数秒でアップロード・変換・ダウンロード。登録不要。`,
  de: (title, site) =>
    `${title} — kostenlos, sofort und privat. Hochladen, konvertieren und in Sekunden herunterladen auf ${site}. Keine Anmeldung.`,
  fr: (title, site) =>
    `${title} — gratuit, instantané et privé. Téléversez, convertissez et téléchargez en secondes sur ${site}. Sans inscription.`,
};

function buildSteps(_tool: ToolConfig, locale: Locale, title: string): string[] {
  const site = "suhadimg.site";
  const steps: Record<Locale, string[]> = {
    en: [
      `Open ${title} on SUHADIMG (${site}) — no account needed.`,
      "Click the upload area or drag and drop your image file(s). Batch upload supported.",
      "Adjust quality, size, or other settings if the tool offers them.",
      "Click Convert or Process and wait a few seconds.",
      "Download your file or ZIP. Originals are deleted from our servers immediately.",
    ],
    es: [
      `Abre ${title} en SUHADIMG (${site}) — no necesitas cuenta.`,
      "Haz clic en el área de carga o arrastra tus imágenes. Procesamiento por lotes disponible.",
      "Ajusta calidad, tamaño u otras opciones si la herramienta las ofrece.",
      "Haz clic en Convertir o Procesar y espera unos segundos.",
      "Descarga tu archivo o ZIP. Los originales se eliminan de nuestros servidores al instante.",
    ],
    ja: [
      `SUHADIMG（${site}）で${title}を開く — アカウント不要。`,
      "アップロードエリアをクリックするか、画像をドラッグ＆ドロップ。一括処理対応。",
      "ツールが提供する場合は、品質・サイズなどを調整。",
      "「変換」または「処理」をクリックし、数秒待つ。",
      "ファイルまたはZIPをダウンロード。元ファイルはサーバーから即削除。",
    ],
    de: [
      `Öffnen Sie ${title} auf SUHADIMG (${site}) — kein Konto nötig.`,
      "Klicken Sie auf den Upload-Bereich oder ziehen Sie Bilder per Drag & Drop. Stapelverarbeitung möglich.",
      "Passen Sie Qualität, Größe oder andere Optionen an, falls verfügbar.",
      "Klicken Sie auf Konvertieren oder Verarbeiten und warten Sie wenige Sekunden.",
      "Laden Sie Ihre Datei oder ZIP herunter. Originale werden sofort vom Server gelöscht.",
    ],
    fr: [
      `Ouvrez ${title} sur SUHADIMG (${site}) — aucun compte requis.`,
      "Cliquez sur la zone de téléversement ou glissez-déposez vos images. Traitement par lot disponible.",
      "Ajustez la qualité, la taille ou d'autres options si disponibles.",
      "Cliquez sur Convertir ou Traiter et attendez quelques secondes.",
      "Téléchargez votre fichier ou ZIP. Les originaux sont supprimés immédiatement.",
    ],
  };
  return steps[locale];
}

function buildFaqs(tool: ToolConfig, locale: Locale, title: string): ToolFAQ[] {
  if (locale === "en") return tool.faqs;

  const generic: Record<Locale, ToolFAQ[]> = {
    en: tool.faqs,
    es: [
      {
        question: `¿Es gratis ${title}?`,
        answer:
          "Sí, completamente gratis. Sin marca de agua, sin registro y conversiones ilimitadas en suhadimg.site.",
      },
      {
        question: "¿Mis archivos están seguros?",
        answer:
          "Sí. Las imágenes se procesan de forma segura y se eliminan inmediatamente después del procesamiento.",
      },
      {
        question: "¿Puedo procesar varios archivos a la vez?",
        answer:
          "Sí, la mayoría de herramientas admiten procesamiento por lotes. Descarga todos los resultados como ZIP.",
      },
    ],
    ja: [
      {
        question: `${title}は無料ですか？`,
        answer:
          "はい、完全無料です。透かしなし、登録不要、suhadimg.siteで無制限に利用できます。",
      },
      {
        question: "ファイルは安全ですか？",
        answer: "はい。画像は安全に処理され、処理後すぐに削除されます。",
      },
      {
        question: "複数ファイルを一度に処理できますか？",
        answer:
          "はい、多くのツールで一括処理に対応。結果はZIPでダウンロードできます。",
      },
    ],
    de: [
      {
        question: `Ist ${title} kostenlos?`,
        answer:
          "Ja, völlig kostenlos. Kein Wasserzeichen, keine Anmeldung, unbegrenzte Nutzung auf suhadimg.site.",
      },
      {
        question: "Sind meine Dateien sicher?",
        answer:
          "Ja. Bilder werden sicher verarbeitet und sofort nach der Verarbeitung gelöscht.",
      },
      {
        question: "Kann ich mehrere Dateien gleichzeitig verarbeiten?",
        answer:
          "Ja, die meisten Tools unterstützen Stapelverarbeitung. Laden Sie alle Ergebnisse als ZIP herunter.",
      },
    ],
    fr: [
      {
        question: `${title} est-il gratuit ?`,
        answer:
          "Oui, entièrement gratuit. Sans filigrane, sans inscription, utilisations illimitées sur suhadimg.site.",
      },
      {
        question: "Mes fichiers sont-ils sécurisés ?",
        answer:
          "Oui. Les images sont traitées en toute sécurité et supprimées immédiatement après.",
      },
      {
        question: "Puis-je traiter plusieurs fichiers à la fois ?",
        answer:
          "Oui, la plupart des outils prennent en charge le traitement par lot. Téléchargez tout en ZIP.",
      },
    ],
  };

  const conv = parseConversion(tool.slug);
  if (conv && locale === "es") {
    return [
      {
        question: `¿Pierdo calidad al convertir ${conv.from} a ${conv.to}?`,
        answer:
          conv.to.includes("JPG") || conv.to.includes("JPEG")
            ? "JPG usa compresión con pérdida; la diferencia suele ser mínima al 85–90% de calidad."
            : "PNG y WebP pueden preservar más detalle según el formato de destino.",
      },
      ...generic.es.slice(1),
    ];
  }

  return generic[locale];
}

function whyContent(
  tool: ToolConfig,
  locale: Locale
): { title: string; body: string } {
  const conv = parseConversion(tool.slug);
  if (conv) {
    return {
      title: t(locale, UI.seoSections.whyConvert),
      body: {
        en: `Converting ${conv.from} to ${conv.to} helps reduce file size, improve compatibility, and speed up websites. JPG is ideal for photos; PNG for transparency; WebP for modern browsers.`,
        es: `Convertir ${conv.from} a ${conv.to} reduce el tamaño, mejora la compatibilidad y acelera sitios web. JPG para fotos; PNG para transparencia; WebP para navegadores modernos.`,
        ja: `${conv.from}を${conv.to}に変換すると、ファイルサイズ削減・互換性向上・サイト高速化に役立ちます。`,
        de: `${conv.from} zu ${conv.to} zu konvertieren reduziert Dateigröße, verbessert Kompatibilität und beschleunigt Websites.`,
        fr: `Convertir ${conv.from} en ${conv.to} réduit la taille, améliore la compatibilité et accélère les sites web.`,
      }[locale],
    };
  }

  const byOp: Partial<
    Record<
      ToolConfig["operation"],
      { title: keyof typeof UI.seoSections; body: Record<Locale, string> }
    >
  > = {
    compress: {
      title: "whyCompress",
      body: {
        en: "Smaller images load faster, improve Core Web Vitals, and meet upload limits for forms, email, and social platforms.",
        es: "Imágenes más pequeñas cargan más rápido, mejoran Core Web Vitals y cumplen límites de subida.",
        ja: "小さな画像は読み込みが速く、Core Web Vitals改善とアップロード制限対応に役立ちます。",
        de: "Kleinere Bilder laden schneller, verbessern Core Web Vitals und erfüllen Upload-Limits.",
        fr: "Des images plus légères chargent plus vite, améliorent les Core Web Vitals et respectent les limites d'upload.",
      },
    },
    resize: {
      title: "whyResize",
      body: {
        en: "Correct dimensions prevent cropping on social media, meet passport requirements, and keep layouts sharp on every device.",
        es: "Las dimensiones correctas evitan recortes en redes sociales y cumplen requisitos oficiales.",
        ja: "正しいサイズはSNSでの切り抜きを防ぎ、公式要件にも対応します。",
        de: "Korrekte Abmessungen verhindern Zuschnitt in Social Media und erfüllen offizielle Anforderungen.",
        fr: "Les bonnes dimensions évitent le recadrage sur les réseaux sociaux et respectent les exigences officielles.",
      },
    },
  };

  const entry = byOp[tool.operation];
  if (entry) {
    return {
      title: t(locale, UI.seoSections[entry.title]),
      body: entry.body[locale],
    };
  }

  return {
    title: t(locale, UI.seoSections.whatItDoes),
    body: DESC_TEMPLATES[locale](resolveTitle(tool, locale), "suhadimg.site"),
  };
}

const USE_CASES: Record<Locale, string[]> = {
  en: [
    "Website and e-commerce product images",
    "Social media posts and profile photos",
    "Email attachments and document uploads",
    "Blog and CMS media optimization",
  ],
  es: [
    "Imágenes para sitios web y e-commerce",
    "Publicaciones en redes sociales",
    "Adjuntos de correo y formularios",
    "Optimización de medios en blogs y CMS",
  ],
  ja: [
    "Webサイト・EC商品画像",
    "SNS投稿・プロフィール写真",
    "メール添付・フォームアップロード",
    "ブログ・CMSメディア最適化",
  ],
  de: [
    "Website- und E-Commerce-Produktbilder",
    "Social-Media-Beiträge und Profilfotos",
    "E-Mail-Anhänge und Formular-Uploads",
    "Blog- und CMS-Medienoptimierung",
  ],
  fr: [
    "Images pour sites web et e-commerce",
    "Publications sur les réseaux sociaux",
    "Pièces jointes e-mail et formulaires",
    "Optimisation média pour blogs et CMS",
  ],
};

const BENEFITS: Record<Locale, string[]> = {
  en: [
    "100% free — no watermark, no signup",
    "Fast Sharp-powered processing",
    "Privacy-first — files deleted immediately",
    "Works on mobile, tablet, and desktop",
  ],
  es: [
    "100% gratis — sin marca de agua, sin registro",
    "Procesamiento rápido con Sharp",
    "Privacidad primero — archivos eliminados al instante",
    "Funciona en móvil, tablet y escritorio",
  ],
  ja: [
    "完全無料 — 透かしなし、登録不要",
    "Sharpによる高速処理",
    "プライバシー重視 — ファイル即削除",
    "スマホ・タブレット・PC対応",
  ],
  de: [
    "100% kostenlos — kein Wasserzeichen, keine Anmeldung",
    "Schnelle Sharp-Verarbeitung",
    "Datenschutz — Dateien sofort gelöscht",
    "Funktioniert auf Handy, Tablet und Desktop",
  ],
  fr: [
    "100% gratuit — sans filigrane, sans inscription",
    "Traitement rapide avec Sharp",
    "Confidentialité — fichiers supprimés immédiatement",
    "Fonctionne sur mobile, tablette et bureau",
  ],
};

export function getLocalizedTool(
  tool: ToolConfig,
  locale: Locale
): LocalizedToolContent {
  if (locale === "en") {
    const why = whyContent(tool, "en");
    return {
      title: tool.title,
      shortTitle: tool.shortTitle,
      description: tool.description,
      metaDescription: tool.metaDescription,
      categoryLabel: CATEGORY_LABELS[tool.category],
      faqs: tool.faqs,
      howToTitle: `How to Use ${tool.title} Online`,
      steps: buildSteps(tool, "en", tool.title),
      whyTitle: why.title,
      whyBody: why.body,
      introduction: tool.description,
      whatItDoes: tool.description,
      whoShouldUse: `Anyone who needs ${tool.shortTitle.toLowerCase()} — designers, marketers, students, and everyday users.`,
      useCases: USE_CASES.en,
      benefits: BENEFITS.en,
    };
  }

  const title = resolveTitle(tool, locale);
  const why = whyContent(tool, locale);
  const cat = tool.category as ToolCategory;

  return {
    title,
    shortTitle: tool.shortTitle,
    description: DESC_TEMPLATES[locale](title, "suhadimg.site"),
    metaDescription: `${title}. ${META_SUFFIX[locale]}`,
    categoryLabel: categoryLabel(locale, cat),
    faqs: buildFaqs(tool, locale, title),
    howToTitle: t(locale, UI.seoSections.howTo),
    steps: buildSteps(tool, locale, title),
    whyTitle: why.title,
    whyBody: why.body,
    introduction: DESC_TEMPLATES[locale](title, "suhadimg.site"),
    whatItDoes: DESC_TEMPLATES[locale](title, "suhadimg.site"),
    whoShouldUse: {
      es: "Diseñadores, marketers, estudiantes y cualquier persona que necesite procesar imágenes rápidamente.",
      ja: "デザイナー、マーケター、学生など、素早く画像処理が必要なすべての方。",
      de: "Designer, Marketer, Studierende und alle, die schnell Bilder bearbeiten müssen.",
      fr: "Designers, marketeurs, étudiants et toute personne devant traiter des images rapidement.",
    }[locale],
    useCases: USE_CASES[locale],
    benefits: BENEFITS[locale],
  };
}

export function buildLocalizedToolSeoTitle(
  tool: ToolConfig,
  locale: Locale
): string {
  const localized = getLocalizedTool(tool, locale);
  const suffix: Record<Locale, string> = {
    en: "Free Online Image Tool | SUHADIMG",
    es: "Herramienta Gratis en Línea | SUHADIMG",
    ja: "無料オンラインツール | SUHADIMG",
    de: "Kostenloses Online-Tool | SUHADIMG",
    fr: "Outil Gratuit en Ligne | SUHADIMG",
  };
  return `${localized.title} - ${suffix[locale]}`;
}
