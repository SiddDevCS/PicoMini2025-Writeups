import Link from 'next/link'
import { getWriteupsByCategory } from '@/lib/writeupComponents'

export default function Home() {
  const categories = getWriteupsByCategory()

  const totalWriteups = Object.values(categories).flat().length
  const categoryCount = Object.keys(categories).length

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            PicoMini CTF 2025
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Write-ups Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            A comprehensive collection of detailed write-ups for various CTF challenges across different categories including Web Exploitation, Reverse Engineering, Cryptography, Forensics, Binary Exploitation, and General Skills.
          </p>
        </div>
        
        <div className="flex justify-center space-x-8 text-sm text-gray-500 mb-8">
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="font-medium">{totalWriteups} Write-ups</span>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="font-medium">{categoryCount} Categories</span>
          </div>
        </div>
      </div>

      <div className="grid gap-8">
        {Object.entries(categories).map(([category, categoryWriteups]) => (
          <div key={category} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 capitalize">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h2>
              <span className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full">
                {categoryWriteups.length} write-up{categoryWriteups.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categoryWriteups.map((writeup) => (
                <Link
                  key={writeup.slug}
                  href={`/writeup/${writeup.slug}`}
                  className="group block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200"
                >
                  <h3 className="font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {writeup.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {writeup.description}
                  </p>
                  <div className="flex items-center text-xs text-blue-600 group-hover:text-blue-800">
                    <span>Read more</span>
                    <svg className="ml-1 w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}