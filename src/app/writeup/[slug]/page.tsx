import { notFound } from 'next/navigation'
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