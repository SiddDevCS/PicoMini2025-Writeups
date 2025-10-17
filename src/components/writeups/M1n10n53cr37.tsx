import Image from 'next/image'

export default function M1n10n53cr37() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-100 rounded-2xl p-8 border-l-4 border-yellow-500">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">M1n10n'5_53cr37</h1>
        <p className="text-xl text-gray-700 leading-relaxed">
          Get ready for a mischievous adventure with your favorite Minions! 🕵️‍♂️💥 They've been up to their old tricks, 
          and this time, they've hidden the flag in a devious way within the Android source code.
        </p>
      </div>

      {/* Information Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 border-l-4 border-blue-500 pl-4">Information Given</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              Get ready for a mischievous adventure with your favorite Minions! 🕵️‍♂️💥 They've been up to their old tricks, 
              and this time, they've hidden the flag in a devious way within the Android source code. Your task is to channel 
              your inner Minion and dive into the disassembled or decompiled code. Watch out, because these little troublemakers 
              have hidden the flag in multiple sneaky spots or maybe even pulled a fast one and concealed it in the same location!
            </p>
            <p className="mt-4 text-gray-600">
              Put on your overalls, grab your magnifying glass, and get cracking. The Minions have left clues, and it's up to you 
              to follow their trail and uncover the flag. Can you outwit these playful pranksters and find their secret? Let the Minion mischief begin!
            </p>
            <p className="mt-4">
              Find the android apk here 
              <a href="https://challenge-files.picoctf.net/c_saffron_estate/952de3d4a637dda4d8f2d6f6630ce8c0e4dbcf83d65914382d8cb08a546d2a3d/minions.apk" 
                 className="text-blue-600 hover:text-blue-800 font-semibold ml-2" target="_blank" rel="noopener noreferrer">
                Minions Mobile Application
              </a> and try to get the flag.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Hints</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Do you know how to disassemble an apk file?</li>
              <li>• Any interesting source files?</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tools Used Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Tools Used</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">apktool</code> - For disassembling the APK</li>
          <li>• <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">base64</code>/<code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">base32</code> - For decoding the flag</li>
          <li>• <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">grep</code> - For searching through files</li>
        </ul>
      </div>

      {/* Step-by-Step Solution */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-green-400 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">Step-by-Step Solution</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">1. APK Disassembly</h3>
            <div className="bg-gray-800 rounded-lg p-4">
              <code className="text-green-400 font-mono">apktool d "minions (1).apk" -o disassembled_apk</code>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">2. Package Discovery</h3>
            <ul className="text-green-300 space-y-2">
              <li>• Found main application package: <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">com.example.picoctfimage</code></li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">3. Resource Analysis</h3>
            <ul className="text-green-300 space-y-2">
              <li>• Examined <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">res/values/strings.xml</code></li>
              <li>• Found suspicious string named "Banana":</li>
            </ul>
            <div className="bg-gray-800 rounded-lg p-4 mt-4">
              <pre className="text-green-400 font-mono text-sm">
{`<string name="Banana">OBUWG32DKRDHWMLUL53TI43OG5PWQNDSMRPXK3TSGR3DG3BRNY4V65DIGNPW2MDCGFWDGX3DGBSDG7I=</string>`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">4. UI Hint Discovery</h3>
            <ul className="text-green-300 space-y-2">
              <li>• Found hint in <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">res/layout/activity_main.xml</code>:</li>
            </ul>
            <div className="bg-gray-800 rounded-lg p-4 mt-4">
              <pre className="text-green-400 font-mono text-sm">
{`<TextView android:text="Look into me my Banana Value is interesting" />`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">5. Decoding Process</h3>
            <ul className="text-green-300 space-y-2">
              <li>• Initially tried Base64 decoding (failed - binary output)</li>
              <li>• Tried Base32 decoding (success!):</li>
            </ul>
            <div className="bg-gray-800 rounded-lg p-6 mt-4">
              <pre className="text-green-400 font-mono text-sm">
{`import base64

encoded = 'OBUWG32DKRDHWMLUL53TI43OG5PWQNDSMRPXK3TSGR3DG3BRNY4V65DIGNPW2MDCGFWDGX3DGBSDG7I='

decoded = base64.b32decode(encoded)

print(decoded.decode())`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Flag Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border-l-4 border-green-500">
        <h2 className="text-3xl font-bold text-green-800 mb-6">Flag</h2>
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-xl font-mono text-xl font-bold shadow-lg">
          {"picoCTF{" + "'{'" + "}"}1t_w4sn7_h4rd_unr4v3l1n9_th3_m0b1l3_c0d3{'}'}
        </div>
      </div>
    </div>
  )
}