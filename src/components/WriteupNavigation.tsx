import Link from 'next/link'
import { getWriteupsByCategory } from '@/lib/writeupComponents'

interface WriteupNavigationProps {
  currentSlug: string
  category: string
}

export default function WriteupNavigation({ currentSlug, category }: WriteupNavigationProps) {
  const writeupsByCategory = getWriteupsByCategory()
  const categoryWriteups = writeupsByCategory[category] || []
  const currentIndex = categoryWriteups.findIndex(w => w.slug === currentSlug)
  
  const prevWriteup = currentIndex > 0 ? categoryWriteups[currentIndex - 1] : null
  const nextWriteup = currentIndex < categoryWriteups.length - 1 ? categoryWriteups[currentIndex + 1] : null

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link 
            href="/" 
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            All Write-ups
          </Link>
          
          <div className="h-6 w-px bg-gradient-to-b from-blue-300 to-purple-300"></div>
          
          <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent capitalize">
            {category.replace(/([A-Z])/g, ' $1').trim()}
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          {prevWriteup && (
            <Link
              href={`/writeup/${prevWriteup.slug}`}
              className="inline-flex items-center text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </Link>
          )}
          
          {nextWriteup && (
            <Link
              href={`/writeup/${nextWriteup.slug}`}
              className="inline-flex items-center text-sm bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
            >
              Next
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

