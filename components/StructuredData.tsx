interface StructuredDataProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>
}

/** Inline JSON-LD so crawlers receive structured data in the initial HTML. */
export function StructuredData({ data }: StructuredDataProps) {
  const json = JSON.stringify(Array.isArray(data) ? data : [data])
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
