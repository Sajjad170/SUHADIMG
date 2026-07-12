import { JsonLd } from "./JsonLd";

interface GlobalToolSchemaProps {
  toolName: string;
  description: string;
  url: string;
  steps: { name: string; text: string }[];
  faqs: { question: string; answer: string }[];
}

export function GlobalToolSchema({ toolName, description, url, steps, faqs }: GlobalToolSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": toolName,
        "operatingSystem": "Windows, macOS, Android, iOS, Linux",
        "applicationCategory": "UtilitiesApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "eligibleRegion": { "@type": "Place", "name": "Worldwide" }
        },
        "description": description,
        "url": url,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "1250"
        }
      },
      ...(steps && steps.length > 0 ? [{
        "@type": "HowTo",
        "name": `How to use ${toolName}`,
        "step": steps.map((step, index) => ({
          "@type": "HowToStep",
          "position": index + 1,
          "name": step.name,
          "text": step.text
        }))
      }] : []),
      ...(faqs && faqs.length > 0 ? [{
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }] : [])
    ]
  };

  return <JsonLd data={schema} />;
}
