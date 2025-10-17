import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getWriteupComponent, getAllWriteupSlugs } from '@/lib/writeupComponents'
import WriteupNavigation from '@/components/WriteupNavigation'

interface WriteupPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllWriteupSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: WriteupPageProps): Promise<Metadata> {
  const { slug } = await params
  const writeupData = getWriteupComponent(slug)

  if (!writeupData) {
    return {
      title: 'Write-up Not Found',
    }
  }

  const baseUrl = 'https://picomini2025-writeups.vercel.app'
  const writeupUrl = `${baseUrl}/writeup/${encodeURIComponent(slug)}`

  return {
    title: `${writeupData.title} | PicoMini CTF 2025 Write-ups`,
    description: writeupData.description,
    keywords: [
      'PicoMini CTF 2025',
      writeupData.title,
      writeupData.category,
      'CTF write-up',
      'cybersecurity',
      'penetration testing',
      'security research'
    ],
    authors: [{ name: 'Siddharth Sehgal' }],
    openGraph: {
      title: `${writeupData.title} | PicoMini CTF 2025 Write-ups`,
      description: writeupData.description,
      url: writeupUrl,
      type: 'article',
      publishedTime: '2025-01-17T00:00:00.000Z',
      modifiedTime: new Date().toISOString(),
      authors: ['Siddharth Sehgal'],
      section: writeupData.category,
      tags: [writeupData.category, 'CTF', 'Cybersecurity'],
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${writeupData.title} - PicoMini CTF 2025 Write-up`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${writeupData.title} | PicoMini CTF 2025 Write-ups`,
      description: writeupData.description,
      images: ['/og-image.png'],
      creator: '@sidddevcs',
    },
    alternates: {
      canonical: writeupUrl,
    },
  }
}

export default async function WriteupPage({ params }: WriteupPageProps) {
  const { slug } = await params
  const writeupData = getWriteupComponent(slug)

  if (!writeupData) {
    notFound()
  }

  const WriteupComponent = writeupData.component

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <WriteupNavigation currentSlug={slug} category={writeupData.category} />
      </div>
      
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-blue-200 p-10">
        <div className="mb-8">
          <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full mb-6 shadow-lg">
            {writeupData.category}
          </span>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            {writeupData.title}
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border-l-4 border-blue-400">
            {writeupData.description}
          </p>
        </div>
        
        <WriteupComponent />
      </div>
    </div>
  )
}