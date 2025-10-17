---
title: "Hidden in plainsight"
category: "Forensics"
description: "You're given a seemingly ordinary JPG image. Something is tucked away out of sight inside the file. Your task is to discover the hidden payload and extract the flag."
---

## Information given

#### Description

You're given a seemingly ordinary JPG image. Something is tucked away out of sight inside the file. Your task is to discover the hidden payload and extract the flag.Download the jpg image [here](https://challenge-files.picoctf.net/c_saffron_estate/6e0a56b0557edd6c05ca80a440df67c0a950eb1991e4323bd6749abc93317511/img.jpg).

#### Hints
Download the jpg image and read its metadata

#### Metadata

Let's read the metadata:

```bash
siddharthsehgal@mac junk % exiftool img.jpg
ExifTool Version Number         : 13.25
File Name                       : img.jpg
Directory                       : .
File Size                       : 73 kB
File Modification Date/Time     : 2025:10:01 06:47:44+02:00
File Access Date/Time           : 2025:10:01 20:33:42+02:00
File Inode Change Date/Time     : 2025:10:01 06:47:44+02:00
File Permissions                : -rw-r--r--
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
JFIF Version                    : 1.01
Resolution Unit                 : None
X Resolution                    : 1
Y Resolution                    : 1
Comment                         : c3RlZ2hpZGU6Y0VGNmVuZHZjbVE9
Image Width                     : 640
Image Height                    : 640
Encoding Process                : Baseline DCT, Huffman coding
Bits Per Sample                 : 8
Color Components                : 3
Y Cb Cr Sub Sampling            : YCbCr4:2:0 (2 2)
Image Size                      : 640x640
Megapixels                      : 0.410
```

Notice:

```
Comment                         : c3RlZ2hpZGU6Y0VGNmVuZHZjbVE9
```

Let's decode it:

```
siddharthsehgal@mac junk % echo "c3RlZ2hpZGU6Y0VGNmVuZHZjbVE9" | base64 -d

steghide:cEF6endvcmQ=
```

This looks like base64. Let's decode with this python script:

```python
import base64
s = "cEF6endvcmQ="
print(base64.b64decode(s).decode())

pAzzword
```

Let's get the flag with the password:

![[Screenshot 2025-10-01 at 09.18.00.png]]

So the flag is: `picoCTF{h1dd3n_1n_1m4g3_e7f5b969}`.

---