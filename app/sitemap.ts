import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl

  // Static pages
  const routes = [
    '',
    '/about',
    '/providers',
    '/services',
    '/new-patients',
    '/locations',
    '/appointments',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Service pages
  const services = [
    'joint-replacement',
    'sports-medicine',
    'spine-care',
    'hand-wrist',
    'foot-ankle',
    'arthroscopic-surgery',
    'physical-therapy',
    'pain-management',
    'fracture-care',
  ].map((service) => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Provider pages
  const providers = [
    'dr-sarah-johnson',
    'dr-michael-chen',
    'dr-emily-rodriguez',
    'dr-david-kim',
    'dr-jennifer-lee',
    'dr-robert-thompson',
  ].map((provider) => ({
    url: `${baseUrl}/providers/${provider}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...services, ...providers]
}
