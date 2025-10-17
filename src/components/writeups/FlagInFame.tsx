import Image from 'next/image'

export default function FlagInFame() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl p-8 border-l-4 border-blue-500">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Flag in Fame</h1>
        <p className="text-xl text-gray-700 leading-relaxed">
          The SOC team discovered a suspiciously large log file after a recent breach. When they opened it, 
          they found an enormous block of encoded text instead of typical logs. Could there be something hidden within?
        </p>
      </div>

      {/* Information Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 border-l-4 border-blue-500 pl-4">Information Given</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              The SOC team discovered a suspiciously large log file after a recent breach. When they opened it, 
              they found an enormous block of encoded text instead of typical logs. Could there be something 
              hidden within? Your mission is to inspect the resulting file and reveal the real purpose of it. 
              The team is relying on your skills to uncover any concealed information within this unusual log.
            </p>
            <p className="mt-4">
              Download the encoded data here: 
              <a 
                href="https://challenge-files.picoctf.net/c_amiable_citadel/1cb8d8924eb719b54af443989023e3ebc86051dc7e294a87634d5bffb84be2a1/logs.txt" 
                className="text-blue-600 hover:text-blue-800 font-semibold ml-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Logs Data
              </a>
              . Be prepared—the file is large, and examining it thoroughly is crucial.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Hints</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              Use <code className="bg-red-100 text-red-800 px-2 py-1 rounded font-mono">base64</code> to decode the data and generate the image file.
            </p>
          </div>
        </div>
      </div>

      {/* Analysis Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-green-400 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">Log File Analysis</h2>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-yellow-400 mb-4">Key Findings:</h3>
          <ul className="space-y-2 text-green-300">
            <li>• File size: 398,053 bytes</li>
            <li>• Content appeared to be base64 encoded data</li>
            <li>• Started with <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">iVBORw0KGgoAAAANSUhEUgAAA4AAAASACAIAAAAh8bSOAAEAAElEQVR4nOz919MsyZ...</code></li>
            <li>• The <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">iVBORw0KGgo</code> prefix is a clear indicator of a PNG image file header in base64</li>
          </ul>
        </div>
      </div>

      {/* Decoding Process */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 border-l-4 border-blue-500 pl-4">Decoding Process</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Base64 Decoding</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Following the hint, I decoded the base64 data to generate an image file:
            </p>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-green-400 font-mono shadow-2xl">
              <code>base64 -d -i "logs (2).txt" -o decoded_image.png</code>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Verification</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              I verified the successful creation of the image file:
            </p>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-green-400 font-mono shadow-2xl">
              <div className="space-y-2">
                <div><code>ls -la *.png</code></div>
                <div className="text-gray-400"># Successfully created decoded_image.png</div>
                <div className="mt-4"><code>file decoded_image.png</code></div>
                <div className="text-gray-400"># File type confirmed as PNG image</div>
                <div className="text-gray-400"># File size: 298,704 bytes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Decoded Image</h2>
        <div className="flex justify-center">
          <div className="relative">
            <Image
              src="/images/Screenshot 2025-10-01 at 20.56.44.png"
              alt="Decoded image showing the flag"
              width={800}
              height={600}
              className="rounded-xl shadow-2xl border-4 border-white"
            />
          </div>
        </div>
      </div>

      {/* Flag Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border-l-4 border-green-500">
        <h2 className="text-3xl font-bold text-green-800 mb-6">The Flag</h2>
        <div className="space-y-4">
          <p className="text-gray-700 text-lg">
            The hex in the image:
          </p>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <code>7069636f4354467b666f72656e736963735f616e616c797369735f616d617a696e675f63373564643038657d</code>
          </div>
          <p className="text-gray-700 text-lg">
            Which translated is:
          </p>
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-xl font-mono text-xl font-bold shadow-lg">
            {"picoCTF{" + "'{'" + "}"}forensics_analysis_is_amazing_c75dd08e{'}'}
          </div>
        </div>
      </div>
    </div>
  )
}
