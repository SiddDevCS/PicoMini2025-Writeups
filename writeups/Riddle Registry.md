---
title: "Riddle Registry"
category: "Forensics"
description: "Hi, intrepid investigator! You've stumbled upon a peculiar PDF filled with what seems like nothing more than garbled nonsense. But beware! Not everything is as it appears."
---

## Information given

#### Description

Hi, intrepid investigator! 📄🔍 You've stumbled upon a peculiar PDF filled with what seems like nothing more than garbled nonsense. But beware! Not everything is as it appears. Amidst the chaos lies a hidden treasure—an elusive flag waiting to be uncovered.Find the PDF file here [Hidden Confidential Document](https://challenge-files.picoctf.net/c_saffron_estate/752a14d378d241efef396229bf41330061c1a0e73f7b3268a7e6db8d94fd4cd1/confidential.pdf) and uncover the flag within the metadata.

#### Hints
Don't be fooled by the visible text; it's just a decoy!
Look beyond the surface for hidden clues

We are given a file with the name: `confidential.pdf`.

I used `exiftool` to get more information on the pdf file:

```bash
siddharthsehgal@mac junk % exiftool confidential.pdf ExifTool Version Number : 13.25 File Name : confidential.pdf Directory : . File Size : 183 kB File Modification Date/Time : 2025:10:01 06:50:58+02:00 File Access Date/Time : 2025:10:01 06:51:06+02:00 File Inode Change Date/Time : 2025:10:01 06:50:58+02:00 File Permissions : -rw-r--r-- File Type : PDF File Type Extension : pdf MIME Type : application/pdf PDF Version : 1.7 Linearized : No Page Count : 1 Producer : PyPDF2 Author : cGljb0NURntwdXp6bDNkX20zdGFkYXRhX2YwdW5kIV9mOTQzMDBjNH0=
```

Notice Author:

```
Author : cGljb0NURntwdXp6bDNkX20zdGFkYXRhX2YwdW5kIV9mOTQzMDBjNH0=
```

This looks like base64 because of the '=' at the end.

Let's decode it with https://www.base64decode.org/:

![[Screenshot 2025-10-01 at 15.54.37.png]]

The flag is: `picoCTF{puzzl3d_m3tadata_f0und!_f94300c4}`

---