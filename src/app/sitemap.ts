import { MetadataRoute } from 'next'
import { getAllWriteupSlugs } from '@/lib/writeupComponents'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://picomini2025-writeups.vercel.app'
  const writeupSlugs = getAllWriteupSlugs()
  
  const writeupPages = writeupSlugs.map((slug) => ({
    url: `${baseUrl}/writeup/${encodeURIComponent(slug)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...writeupPages,
  ]
}
