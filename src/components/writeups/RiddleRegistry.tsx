import Image from 'next/image'

export default function RiddleRegistry() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-100 rounded-2xl p-8 border-l-4 border-purple-500">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Riddle Registry</h1>
        <p className="text-xl text-gray-700 leading-relaxed">
          Hi, intrepid investigator! 📄🔍 You've stumbled upon a peculiar PDF filled with what seems like nothing more than garbled nonsense. 
          But beware! Not everything is as it appears.
        </p>
      </div>

      {/* Information Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 border-l-4 border-blue-500 pl-4">Information Given</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              Hi, intrepid investigator! 📄🔍 You've stumbled upon a peculiar PDF filled with what seems like nothing more than garbled nonsense. 
              But beware! Not everything is as it appears. Amidst the chaos lies a hidden treasure—an elusive flag waiting to be uncovered.
            </p>
            <p className="mt-4">
              Find the PDF file here 
              <a href="https://challenge-files.picoctf.net/c_saffron_estate/752a14d378d241efef396229bf41330061c1a0e73f7b3268a7e6db8d94fd4cd1/confidential.pdf" 
                 className="text-blue-600 hover:text-blue-800 font-semibold ml-2" target="_blank" rel="noopener noreferrer">
                Hidden Confidential Document
              </a> and uncover the flag within the metadata.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Hints</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Don't be fooled by the visible text; it's just a decoy!</li>
              <li>• Look beyond the surface for hidden clues</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Analysis Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-green-400 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">Analysis</h2>
        
        <div className="space-y-6">
          <p className="text-green-300 text-lg">
            We are given a file with the name: <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">confidential.pdf</code>.
          </p>
          
          <p className="text-green-300 text-lg">
            I used <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">exiftool</code> to get more information on the pdf file:
          </p>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <pre className="text-green-400 font-mono text-sm">
{`siddharthsehgal@mac junk % exiftool confidential.pdf 
ExifTool Version Number         : 13.25 
File Name                       : confidential.pdf 
Directory                       : . 
File Size                       : 183 kB 
File Modification Date/Time     : 2025:10:01 06:50:58+02:00 
File Access Date/Time           : 2025:10:01 06:51:06+02:00 
File Inode Change Date/Time     : 2025:10:01 06:50:58+02:00 
File Permissions                : -rw-r--r-- 
File Type                       : PDF 
File Type Extension             : pdf 
MIME Type                       : application/pdf 
PDF Version                     : 1.7 
Linearized                      : No 
Page Count                      : 1 
Producer                        : PyPDF2 
Author                          : cGljb0NURntwdXp6bDNkX20zdGFkYXRhX2YwdW5kIV9mOTQzMDBjNH0=`}
            </pre>
          </div>
          
          <p className="text-green-300 text-lg">
            Notice Author:
          </p>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <code className="text-yellow-400 font-mono">
              Author : cGljb0NURntwdXp6bDNkX20zdGFkYXRhX2YwdW5kIV9mOTQzMDBjNH0=
            </code>
          </div>
          
          <p className="text-green-300 text-lg">
            This looks like base64 because of the '=' at the end.
          </p>
          
          <p className="text-green-300 text-lg">
            Let's decode it with https://www.base64decode.org/:
          </p>
          
          <div className="flex justify-center">
            <Image
              src="/images/Screenshot 2025-10-01 at 15.54.37.png"
              alt="Base64 decoding result"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
          
          <p className="text-green-300 text-lg">
            The flag is: <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">picoCTF{'{'}puzzl3d_m3tadata_f0und!_f94300c4{'}'}</code>
          </p>
        </div>
      </div>

      {/* Flag Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border-l-4 border-green-500">
        <h2 className="text-3xl font-bold text-green-800 mb-6">The Flag</h2>
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-xl font-mono text-xl font-bold shadow-lg">
          picoCTF{'{'}puzzl3d_m3tadata_f0und!_f94300c4{'}'}
        </div>
      </div>
    </div>
  )
}