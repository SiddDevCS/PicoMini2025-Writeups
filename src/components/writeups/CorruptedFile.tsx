import Image from 'next/image'

export default function CorruptedFile() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-100 rounded-2xl p-8 border-l-4 border-purple-500">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Corrupted file</h1>
        <p className="text-xl text-gray-700 leading-relaxed">
          This file seems broken... or is it? Maybe a couple of bytes could make all the difference. 
          Can you figure out how to bring it back to life?
        </p>
      </div>

      {/* Information Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 border-l-4 border-blue-500 pl-4">Information Given</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              This file seems broken... or is it? Maybe a couple of bytes could make all the difference. 
              Can you figure out how to bring it back to life?
            </p>
            <p className="mt-4">
              Download the file 
              <a 
                href="https://challenge-files.picoctf.net/c_amiable_citadel/9371995b0773e9fee9af0d339adebcfa3f05ce79b0a30220449982ea9d9f2c1b/file" 
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
              <li>• Try checking the file&apos;s header.</li>
              <li>• JPEG</li>
              <li>• Tools like xxd or hexdump can help you inspect and edit file bytes.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Analysis Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-green-400 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">File Analysis</h2>
        
        <div className="space-y-6">
          <p className="text-green-300 text-lg">
            The file given is: <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">file</code>.
          </p>
          
          <p className="text-green-300 text-lg">
            Let&apos;s enumerate and see details about the file. Keep the hints in mind. I will start by checking the file&apos;s details:
          </p>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <pre className="text-green-400 font-mono text-sm">
{`siddharthsehgal@mac other % file file
file: data
siddharthsehgal@mac other % strings file
JFIF
 $.' ",#
(7),01444
'9=82<.342
!22222222222222222222222222222222222222222222222222
$3br
%&'()*456789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz
        #3R
&'()*56789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz
<Sqaa{w&
neS=
T ^f
(ajI
toQ\\
so%z
 9b3
ttW5i
BDAev$
0YDO 
T{/6GT
s(vgX
t+qsf
K3n'9
&O*C
xoIIVE
8=3O
I*9'`}
            </pre>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <pre className="text-green-400 font-mono text-sm">
{`siddharthsehgal@mac other % xxd file | head

00000000: 5c78 ffe0 0010 4a46 4946 0001 0100 0001  \\x....JFIF......
00000010: 0010 0000 ffdb 0043 0008 0606 0706 0508  .......C........
00000020: 0707 0709 0908 0a0c 140d 0c0b 0b0c 1912  ................
00000030: 130f 141d 1a1f 1e1d 1a1c 1c20 242e 2720  ........... $.' 
00000040: 222c 231c 1c28 3729 2c30 3134 3434 1f27  ",#..(7),01444.'
00000050: 393d 3832 3c2e 3334 32ff db00 4301 0909  9=82<.342...C...
00000060: 090c 0b0c 180d 0d18 3221 1c21 3232 3232  ........2!.!2222
00000070: 3232 3232 3232 3232 3232 3232 3232 3232  2222222222222222
00000080: 3232 3232 3232 3232 3232 3232 3232 3232  2222222222222222
00000090: 3232 3232 3232 3232 3232 3232 3232 ffc0  22222222222222..`}
            </pre>
          </div>
          
          <p className="text-green-300 text-lg">
            Notice <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">5c78</code> at <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">00000000</code>. 
            Usually JPG contains <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">ffd8</code> at the very beginning. To change it:
          </p>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <code className="text-yellow-400 font-mono">
              siddharthsehgal@mac other % xxd -r file.hex fixed.jpg
            </code>
          </div>
          
          <p className="text-green-300 text-lg">
            Then change <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">5c78</code> to <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">ffd8</code>.
          </p>
          
          <p className="text-green-300 text-lg">
            After looking at the image it looks like a image:
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Fixed Image</h2>
        <div className="flex justify-center">
          <div className="relative">
            <Image
              src="/images/Screenshot 2025-10-01 at 20.42.27.png"
              alt="Fixed image showing the flag"
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
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-xl font-mono text-xl font-bold shadow-lg">
          {"picoCTF{" + "'{'" + "}"}r3st0r1ng_th3_by73s_2326ca93{'}'}
        </div>
      </div>
    </div>
  )
}
