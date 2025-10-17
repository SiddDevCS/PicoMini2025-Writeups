import Image from 'next/image'

export default function PicoBank() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-50 to-teal-100 rounded-2xl p-8 border-l-4 border-green-500">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Pico Bank</h1>
        <p className="text-xl text-gray-700 leading-relaxed">
          In a bustling city where innovation meets finance, Pico Bank has emerged as a beacon of cutting-edge security. 
          Promising state-of-the-art protection for your assets, the bank claims its mobile application is impervious to all forms of cyber threats.
        </p>
      </div>

      {/* Information Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 border-l-4 border-blue-500 pl-4">Information Given</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              In a bustling city where innovation meets finance, Pico Bank has emerged as a beacon of cutting-edge security. 
              Promising state-of-the-art protection for your assets, the bank claims its mobile application is impervious to all forms of cyber threats. 
              Pico Bank's tagline, "Security Beyond the Limits," echoes through its high-tech marketing campaigns, assuring users of their utmost safety.
            </p>
            <p className="mt-4 text-gray-600">
              As a cybersecurity enthusiast, your mission is to test these bold claims. You've been hired by a secretive organization to put Pico Bank's 
              mobile app through a rigorous security assessment. The flag might be in one or more locations, and additional information reveals that a 
              Pico Bank user's credentials were leaked in an unusual way.
            </p>
            <p className="mt-4">
              Access the Pico Bank Website 
              <a href="http://saffron-estate.picoctf.net:51837/" 
                 className="text-blue-600 hover:text-blue-800 font-semibold ml-2" target="_blank" rel="noopener noreferrer">
                Pico Bank Website
              </a> and download the application.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Hints</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Use tools like JadxGUI or apktool to inspect the APK.</li>
              <li>• Look at the app's network requests, especially for login and OTP.</li>
              <li>• The flag has two parts.</li>
              <li>• Check the server's response after entering the correct OTP.</li>
              <li>• Investigate the transaction history for unusual data.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200">
        <h2 className="text-3xl font-bold text-purple-900 mb-6">User Profile Information</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• <strong>Name</strong>: Alex Johnson</li>
          <li>• <strong>Email</strong>: johnson@picobank.com</li>
          <li>• <strong>Date of Birth</strong>: March 14, 1990</li>
          <li>• <strong>Last Transaction Amount</strong>: $345.67</li>
          <li>• <strong>Pet name</strong>: tricky</li>
          <li>• <strong>Favorite Color</strong>: Blue</li>
        </ul>
      </div>

      {/* Tools Used Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Tools Used</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">apktool</code> - APK decompilation</li>
          <li>• <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">jadx</code> - Java decompilation (attempted)</li>
          <li>• <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">grep</code> - Text searching</li>
          <li>• <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">curl</code> - HTTP requests</li>
          <li>• Python - Binary decoding script</li>
        </ul>
      </div>

      {/* Analysis Process */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-green-400 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">Analysis Process</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">Step 1: APK Analysis</h3>
            <p className="text-green-300 mb-4">First, I analyzed the APK structure and decompiled it using apktool:</p>
            <div className="bg-gray-800 rounded-lg p-4">
              <code className="text-green-400 font-mono">apktool d pico-bank.apk -o decompiled_apk</code>
            </div>
            <p className="text-green-300 mt-4">The APK contained multiple DEX files:</p>
            <ul className="text-green-300 space-y-1 ml-4">
              <li>• <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">classes.dex</code></li>
              <li>• <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">classes2.dex</code></li>
              <li>• <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">classes3.dex</code></li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">Step 2: Credential Extraction</h3>
            <p className="text-green-300 mb-4">
              Examined the <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">Login$1.smali</code> file (click handler for login button) and found hardcoded credentials:
            </p>
            <div className="bg-gray-800 rounded-lg p-4">
              <pre className="text-green-400 font-mono text-sm">
{`const-string v2, "johnson"

invoke-virtual {v2, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

const-string v2, "tricky1990"

invoke-virtual {v2, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z`}
              </pre>
            </div>
            <p className="text-green-300 mt-4"><strong>Credentials Found:</strong></p>
            <ul className="text-green-300 space-y-1 ml-4">
              <li>• <strong>Username</strong>: <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">johnson</code></li>
              <li>• <strong>Password</strong>: <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">tricky1990</code></li>
            </ul>
            <p className="text-green-300 mt-2">
              The password was derived from the user profile information (pet name "tricky" + birth year 1990).
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">Step 3: OTP Discovery</h3>
            <p className="text-green-300 mb-4">Located the OTP value in the app's string resources:</p>
            <div className="bg-gray-800 rounded-lg p-4">
              <code className="text-green-400 font-mono">grep -r "otp_value" decompiled_apk/</code>
            </div>
            <p className="text-green-300 mt-4">Found in <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">decompiled_apk/res/values/strings.xml</code>:</p>
            <div className="bg-gray-800 rounded-lg p-4 mt-2">
              <pre className="text-green-400 font-mono text-sm">
{`<string name="otp_value">9673</string>`}
              </pre>
            </div>
            <p className="text-green-300 mt-4"><strong>OTP Code</strong>: <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">9673</code></p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">Step 4: Transaction History Analysis</h3>
            <p className="text-green-300 mb-4">
              Examined <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">MainActivity.smali</code> and found a suspicious pattern in transaction amounts. 
              The amounts looked like binary numbers:
            </p>
            <div className="bg-gray-800 rounded-lg p-4">
              <pre className="text-green-400 font-mono text-sm">
{`const-string v7, "$ 1110000" # Grocery Shopping
const-string v6, "$ 1101001" # Electricity Bill
const-string v6, "$ 1100011" # Salary
# ... many more similar patterns`}
              </pre>
            </div>
            <p className="text-green-300 mt-4">Created a Python script to decode these binary values:</p>
            <div className="bg-gray-800 rounded-lg p-6">
              <pre className="text-green-400 font-mono text-sm">
{`def binary_to_ascii(binary_str):
    decimal = int(binary_str, 2)
    if 32 <= decimal <= 126: # Printable ASCII range
        return chr(decimal)
    return f"[{decimal}]"

transaction_amounts = [
    "1110000", "1101001", "1100011", "1101111", "1000011",
    "1010100", "1000110", "1111011", "110001", "1011111",
    "1101100", "110001", "110011", "1100100", "1011111",
    "110100", "1100010", "110000", "1110101", "1110100",
    "1011111", "1100010", "110011", "110001", "1101110",
    "1100111", "1011111"
]

result = ""
for amount in transaction_amounts:
    char = binary_to_ascii(amount)
    result += char`}
              </pre>
            </div>
            <p className="text-green-300 mt-4"><strong>First Flag Part</strong>: <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">{"picoCTF{" + "'{'" + "}"}1_l13d_4b0ut_b31ng_{'}'}</code></p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">Step 5: Server Interaction</h3>
            <p className="text-green-300 mb-4">
              Analyzed the OTP verification logic in <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">OTP$2.smali</code> and found it makes a POST request to 
              <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">/verify-otp</code> endpoint. The response handler expects JSON with "success", "flag", and "hint" fields.
            </p>
            <p className="text-green-300 mb-4">Made a request to the server using the discovered OTP:</p>
            <div className="bg-gray-800 rounded-lg p-4">
              <pre className="text-green-400 font-mono text-sm">
{`curl -X POST "http://saffron-estate.picoctf.net:57057/verify-otp" \\
-H "Content-Type: application/json" \\
-d '{"otp": "9673"}'`}
              </pre>
            </div>
            <p className="text-green-300 mt-4"><strong>Server Response:</strong></p>
            <div className="bg-gray-800 rounded-lg p-4">
              <pre className="text-green-400 font-mono text-sm">
{`{
  "success": true,
  "message": "OTP verified successfully",
  "flag": "s3cur3d_m0b1l3_l0g1n_56fd4e6b}",
  "hint": "The other part of the flag is hidden in the app"
}`}
              </pre>
            </div>
            <p className="text-green-300 mt-4"><strong>Second Flag Part</strong>: <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">s3cur3d_m0b1l3_l0g1n_56fd4e6b{'}'}</code></p>
          </div>
        </div>
      </div>

      {/* Final Flag Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border-l-4 border-green-500">
        <h2 className="text-3xl font-bold text-green-800 mb-6">Final Flag</h2>
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-xl font-mono text-xl font-bold shadow-lg">
          {"picoCTF{" + "'{'" + "}"}1_l13d_4b0ut_b31ng_s3cur3d_m0b1l3_l0g1n_56fd4e6b{'}'}
        </div>
      </div>
    </div>
  )
}