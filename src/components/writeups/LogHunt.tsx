import Image from 'next/image'

export default function LogHunt() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-100 rounded-2xl p-8 border-l-4 border-blue-500">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Log Hunt</h1>
        <p className="text-xl text-gray-700 leading-relaxed">
          Our server seems to be leaking pieces of a secret flag in its logs. The parts are scattered and sometimes repeated. 
          Can you reconstruct the original flag?
        </p>
      </div>

      {/* Information Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 border-l-4 border-blue-500 pl-4">Information Given</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our server seems to be leaking pieces of a secret flag in its logs. The parts are scattered and sometimes repeated. 
              Can you reconstruct the original flag?
            </p>
            <p className="mt-4">
              Download the 
              <a href="https://challenge-files.picoctf.net/c_saffron_estate/a4512da3ca8ee01e042dbfe8ea3746d290dc15d63c65ad8a4df3512076a2e0ed/server.log" 
                 className="text-blue-600 hover:text-blue-800 font-semibold ml-2" target="_blank" rel="noopener noreferrer">
                logs
              </a> and figure out the full flag from the fragments.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Hints</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• You can use <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">grep</code> to filter only matching lines from the log.</li>
              <li>• Some lines are duplicates; ignore extra occurrences.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Log File Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-green-400 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">Log File</h2>
        
        <div className="space-y-6">
          <p className="text-green-300 text-lg">
            As you can see we are given a file with the name: <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">server.log</code>.
          </p>
          
          <div className="flex justify-center">
            <Image
              src="/images/2025-10-01_10-42.png"
              alt="Server log file"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
          
          <p className="text-green-300 text-lg">
            Let's use the search filter with the content: <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">FLAGPART</code>:
          </p>
          
          <div className="flex justify-center">
            <Image
              src="/images/Screenshot 2025-10-01 at 10.43.37.png"
              alt="Filtered log results"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
          
          <p className="text-green-300 text-lg">
            The hint stated: Some lines are duplicates; ignore extra occurrences.
          </p>
          
          <p className="text-green-300 text-lg">
            That leaves us with:
          </p>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <pre className="text-green-400 font-mono text-sm">
{`[1990-08-09 10:00:10] INFO FLAGPART: {"picoCTF{" + "us3_
[1990-08-09 12:23:43] INFO FLAGPART: y0urlinux_
[1990-08-09 12:25:32] INFO FLAGPART: sk1lls_
[1990-08-09 12:28:45] INFO FLAGPART: cedfa5fb" + "}"}`}
            </pre>
          </div>
          
          <p className="text-green-300 text-lg">
            So the flag is: <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">{"picoCTF{" + "us3_y0urlinux_sk1lls_cedfa5fb" + "}"}</code>.
          </p>
        </div>
      </div>

      {/* Flag Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border-l-4 border-green-500">
        <h2 className="text-3xl font-bold text-green-800 mb-6">The Flag</h2>
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-xl font-mono text-xl font-bold shadow-lg">
          {"picoCTF{" + "'{'" + "}"}us3_y0urlinux_sk1lls_cedfa5fb{'}'}
        </div>
      </div>
    </div>
  )
}