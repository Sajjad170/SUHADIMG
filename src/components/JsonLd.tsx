type JsonLdValue = Record<string, unknown>;

interface JsonLdProps {
  data: JsonLdValue | JsonLdValue[] | (JsonLdValue | null | undefined)[];
}

export function JsonLd({ data }: JsonLdProps) {
  const items = (Array.isArray(data) ? data : [data]).filter(
    (item): item is JsonLdValue => item != null
  );

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
