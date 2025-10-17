export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">PicoMini CTF 2025</span>
          </div>
          
          <div className="text-sm text-gray-500 text-center md:text-right">
            <p>Write-ups by Sidd Sehgal</p>
            <p className="mt-1">Built with Cursor, Next.js & Tailwind CSS</p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center">
            This website contains write-ups for educational purposes only. 
            All challenges are from PicoMini CTF 2025.
          </p>
        </div>
      </div>
    </footer>
  )
}

