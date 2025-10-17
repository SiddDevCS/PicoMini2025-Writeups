import Image from 'next/image'

export default function HiddenInPlainsight() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-50 to-teal-100 rounded-2xl p-8 border-l-4 border-green-500">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Hidden in plainsight</h1>
        <p className="text-xl text-gray-700 leading-relaxed">
          You're given a seemingly ordinary JPG image. Something is tucked away out of sight inside the file. 
          Your task is to discover the hidden payload and extract the flag.
        </p>
      </div>

      {/* Information Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 border-l-4 border-blue-500 pl-4">Information Given</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              You're given a seemingly ordinary JPG image. Something is tucked away out of sight inside the file. 
              Your task is to discover the hidden payload and extract the flag.
            </p>
            <p className="mt-4">
              Download the jpg image 
              <a 
                href="https://challenge-files.picoctf.net/c_saffron_estate/6e0a56b0557edd6c05ca80a440df67c0a950eb1991e4323bd6749abc93317511/img.jpg" 
                className="text-blue-600 hover:text-blue-800 font-semibold ml-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Hints</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Download the jpg image and read its metadata</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Metadata Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-green-400 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">Metadata</h2>
        
        <div className="space-y-6">
          <p className="text-green-300 text-lg">
            Let's read the metadata:
          </p>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <pre className="text-green-400 font-mono text-sm">
{`siddharthsehgal@mac junk % exiftool img.jpg
ExifTool Version Number         : 13.25
File Name                       : img.jpg
Directory                       : .
File Size                       : 73 kB
File Modification Date/Time     : 2025:10:01 06:47:44+02:00
File Access Date/Time           : 2025:10:01 20:33:42+02:00
File Inode Change Date/Time     : 2025:10:01 06:47:44+02:00
File Permissions                : -rw-r--r--
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
JFIF Version                    : 1.01
Resolution Unit                 : None
X Resolution                    : 1
Y Resolution                    : 1
Comment                         : c3RlZ2hpZGU6Y0VGNmVuZHZjbVE9
Image Width                     : 640
Image Height                    : 640
Encoding Process                : Baseline DCT, Huffman coding
Bits Per Sample                 : 8
Color Components                : 3
Y Cb Cr Sub Sampling            : YCbCr4:2:0 (2 2)
Image Size                      : 640x640
Megapixels                      : 0.410`}
            </pre>
          </div>
          
          <p className="text-green-300 text-lg">
            Notice:
          </p>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <code className="text-yellow-400 font-mono">
              Comment: c3RlZ2hpZGU6Y0VGNmVuZHZjbVE9
            </code>
          </div>
          
          <p className="text-green-300 text-lg">
            Let's decode it:
          </p>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <pre className="text-green-400 font-mono text-sm">
{`siddharthsehgal@mac junk % echo "c3RlZ2hpZGU6Y0VGNmVuZHZjbVE9" | base64 -d

steghide:cEF6endvcmQ=`}
            </pre>
          </div>
          
          <p className="text-green-300 text-lg">
            This looks like base64. Let's decode with this python script:
          </p>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <pre className="text-green-400 font-mono text-sm">
{`import base64
s = "cEF6endvcmQ="
print(base64.b64decode(s).decode())

pAzzword`}
            </pre>
          </div>
          
          <p className="text-green-300 text-lg">
            Let's get the flag with the password:
          </p>
        </div>
      </div>

      {/* Steghide Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Steghide Extraction</h2>
        <div className="flex justify-center">
          <div className="relative">
            <Image
              src="/images/Screenshot 2025-10-01 at 09.18.00.png"
              alt="Steghide extraction process"
              width={800}
              height={600}
              className="rounded-xl shadow-2xl border-4 border-white"
            />
          </div>
        </div>
        <p className="mt-4 text-center text-gray-700">
          So the flag is: <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">{"picoCTF{" + "h1dd3n_1n_1m4g3_e7f5b969" + "}"}</code>
        </p>
      </div>

      {/* Flag Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border-l-4 border-green-500">
        <h2 className="text-3xl font-bold text-green-800 mb-6">The Flag</h2>
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-xl font-mono text-xl font-bold shadow-lg">
          {"picoCTF{" + "'{'" + "}"}h1dd3n_1n_1m4g3_e7f5b969{'}'}
        </div>
      </div>
    </div>
  )
}
