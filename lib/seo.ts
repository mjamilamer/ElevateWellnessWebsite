import type { Metadata } from 'next'
import { siteConfig } from './config'

export function pageMetadata(
  path: string,
  opts: {
    title: string
    description: string
    keywords?: string[]
  }
): Metadata {
  const pathname = path === '/' || path === '' ? '' : path
  const canonical = `${siteConfig.siteUrl.replace(/\/$/, '')}${pathname}`

  return {
    title: opts.title,
    description: opts.description,
    ...(opts.keywords?.length ? { keywords: opts.keywords } : {}),
    alternates: { canonical },
    openGraph: {
      url: canonical,
      title: `${opts.title} | ${siteConfig.name}`,
      description: opts.description,
    },
  }
}
