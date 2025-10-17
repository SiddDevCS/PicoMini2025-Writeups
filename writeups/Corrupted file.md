---
title: "Corrupted file"
category: "Forensics"
description: "This file seems broken... or is it? Maybe a couple of bytes could make all the difference. Can you figure out how to bring it back to life?"
---

## Information given

#### Description

This file seems broken... or is it? Maybe a couple of bytes could make all the difference. Can you figure out how to bring it back to life?Download the file [here](https://challenge-files.picoctf.net/c_amiable_citadel/9371995b0773e9fee9af0d339adebcfa3f05ce79b0a30220449982ea9d9f2c1b/file).

#### Hints
Try checking the file's header.
JPEG
Tools like xxd or hexdump can help you inspect and edit file bytes.

## file

The file given is: `file`.

Let's enumerate and see details about the file. Keep the hints in mind. I will start by checking the file's details:


```bash
siddharthsehgal@mac other % file file
file: data
siddharthsehgal@mac other % strings file                                                               
JFIF
 $.' ",#
(7),01444
'9=82<.342
!22222222222222222222222222222222222222222222222222
$3br
%&'()*456789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz
        #3R
&'()*56789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz
<Sqaa{w&
neS=
T ^f
(ajI
toQ\
so%z
 9b3
ttW5i
BDAev$
0YDO 
T{/6GT
s(vgX
t+qsf
K3n'9
&O*C
xoIIVE
8=3O
I*9'
siddharthsehgal@mac other % xxd file | head                                                            

00000000: 5c78 ffe0 0010 4a46 4946 0001 0100 0001  \x....JFIF......
00000010: 0010 0000 ffdb 0043 0008 0606 0706 0508  .......C........
00000020: 0707 0709 0908 0a0c 140d 0c0b 0b0c 1912  ................
00000030: 130f 141d 1a1f 1e1d 1a1c 1c20 242e 2720  ........... $.' 
00000040: 222c 231c 1c28 3729 2c30 3134 3434 1f27  ",#..(7),01444.'
00000050: 393d 3832 3c2e 3334 32ff db00 4301 0909  9=82<.342...C...
00000060: 090c 0b0c 180d 0d18 3221 1c21 3232 3232  ........2!.!2222
00000070: 3232 3232 3232 3232 3232 3232 3232 3232  2222222222222222
00000080: 3232 3232 3232 3232 3232 3232 3232 3232  2222222222222222
00000090: 3232 3232 3232 3232 3232 3232 3232 ffc0  22222222222222..
```

Notice `5c78` at `00000000`. Usually JPG contains `ffd8` at the very beginning. To change it:

```bash
siddharthsehgal@mac other % xxd -r file.hex fixed.jpg    
```

Then change `5c78` to `ffd8`.

After looking at the image it looks like a image:

![[Screenshot 2025-10-01 at 20.42.27.png]]

So the flag is:  `picoCTF{r3st0r1ng_th3_by73s_2326ca93}`.

---