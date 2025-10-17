---
title: "Pico Bank"
category: "Reverse Engineering"
description: "In a bustling city where innovation meets finance, Pico Bank has emerged as a beacon of cutting-edge security. Promising state-of-the-art protection for your assets, the bank claims its mobile application is impervious to all forms of cyber threats."
---

## Information given

#### Description

In a bustling city where innovation meets finance, Pico Bank has emerged as a beacon of cutting-edge security. Promising state-of-the-art protection for your assets, the bank claims its mobile application is impervious to all forms of cyber threats. Pico Bank's tagline, "Security Beyond the Limits," echoes through its high-tech marketing campaigns, assuring users of their utmost safety.As a cybersecurity enthusiast, your mission is to test these bold claims. You've been hired by a secretive organization to put Pico Bank's mobile app through a rigorous security assessment. The flag might be in one or more locations, and additional information reveals that a Pico Bank user's credentials were leaked in an unusual way. Your task is to crack the username and password based on the following profile information: His name is Alex Johnson with the email johnson@picobank.com, Date of Birth: March 14, 1990, Last Transaction Amount: $345.67, Pet name: tricky, and Favorite Color: Blue.To perform this challenge, you can use any Android emulator. Some examples include [Genymotion Android Emulator](https://www.genymotion.com/product-desktop/download/) or [Android Studio](https://developer.android.com/studio).Access the Pico Bank Website [Pico Bank Website](http://saffron-estate.picoctf.net:51837/) and download the application.


#### Hints
Use tools like JadxGUI or apktool to inspect the APK.
Look at the app's network requests, especially for login and OTP.
The flag has two parts.
Check the server's response after entering the correct OTP.
Investigate the transaction history for unusual data.

## User Profile Information


- **Name**: Alex Johnson
- **Email**: johnson@picobank.com
- **Date of Birth**: March 14, 1990
- **Last Transaction Amount**: $345.67
- **Pet name**: tricky
- **Favorite Color**: Blue

## Tools Used

- `apktool` - APK decompilation
- `jadx` - Java decompilation (attempted)
- `grep` - Text searching
- `curl` - HTTP requests
- Python - Binary decoding script

---
## Analysis Process

#### Step 1: APK Analysis

First, I analyzed the APK structure and decompiled it using apktool:

```bash
apktool d pico-bank.apk -o decompiled_apk
```

The APK contained multiple DEX files:
- `classes.dex`
- `classes2.dex`
- `classes3.dex`

Key application classes found:
- `Login.smali` - Authentication logic
- `OTP.smali` - OTP verification
- `MainActivity.smali` - Main application interface
- `Transaction.smali` - Transaction data model
#### Step 2: Credential Extraction

Examined the `Login$1.smali` file (click handler for login button) and found hardcoded credentials:

```smali
const-string v2, "johnson"

invoke-virtual {v2, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

  

const-string v2, "tricky1990"

invoke-virtual {v2, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z
```

**Credentials Found:**
- **Username**: `johnson`
- **Password**: `tricky1990`

The password was derived from the user profile information (pet name "tricky" + birth year 1990).

#### Step 3: OTP Discovery

Located the OTP value in the app's string resources:

```bash
grep -r "otp_value" decompiled_apk/
```

Found in `decompiled_apk/res/values/strings.xml`:

```xml
<string name="otp_value">9673</string>
```

**OTP Code**: `9673`

#### Step 4: Transaction History Analysis

Examined `MainActivity.smali` and found a suspicious pattern in transaction amounts. The amounts looked like binary numbers:

```smali
const-string v7, "$ 1110000" # Grocery Shopping
const-string v6, "$ 1101001" # Electricity Bill
const-string v6, "$ 1100011" # Salary
# ... many more similar patterns
```

Created a Python script to decode these binary values:

```python

def binary_to_ascii(binary_str):

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

result += char

```

**First Flag Part**: `picoCTF{1_l13d_4b0ut_b31ng_`

---
### Step 5: Server Interaction

Analyzed the OTP verification logic in `OTP$2.smali` and found it makes a POST request to `/verify-otp` endpoint. The response handler expects JSON with "success", "flag", and "hint" fields.  

Made a request to the server using the discovered OTP:

```bash
curl -X POST "http://saffron-estate.picoctf.net:57057/verify-otp" \

-H "Content-Type: application/json" \

-d '{"otp": "9673"}'
```

  

**Server Response:**

```json
{
"success": true,

"message": "OTP verified successfully",

"flag": "s3cur3d_m0b1l3_l0g1n_56fd4e6b}",

"hint": "The other part of the flag is hidden in the app"
}
```

  

**Second Flag Part**: `s3cur3d_m0b1l3_l0g1n_56fd4e6b}`

  ---
## Final Flag

**Complete Flag**:

`picoCTF{1_l13d_4b0ut_b31ng_s3cur3d_m0b1l3_l0g1n_56fd4e6b}`

---