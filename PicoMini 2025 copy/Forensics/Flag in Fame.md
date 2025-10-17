
---

## Information given

#### Description

The SOC team discovered a suspiciously large log file after a recent breach. When they opened it, they found an enormous block of encoded text instead of typical logs. Could there be something hidden within? Your mission is to inspect the resulting file and reveal the real purpose of it. The team is relying on your skills to uncover any concealed information within this unusual log.Download the encoded data here: [Logs Data](https://challenge-files.picoctf.net/c_amiable_citadel/1cb8d8924eb719b54af443989023e3ebc86051dc7e294a87634d5bffb84be2a1/logs.txt). Be prepared—the file is large, and examining it thoroughly is crucial .

#### Hints

Use `base64` to decode the data and generate the image file.

---

## Log file

**Key Findings:**
- File size: 398,053 bytes
- Content appeared to be base64 encoded data
- Started with `iVBORw0KGgoAAAANSUhEUgAAA4AAAASACAIAAAAh8bSOAAEAAElEQVR4nOz919MsyZ...`
- The `iVBORw0KGgo` prefix is a clear indicator of a PNG image file header in base64

## Decoding Process

#### Base64 Decoding

Following the hint, I decoded the base64 data to generate an image file:

```bash
base64 -d -i "logs (2).txt" -o decoded_image.png
```


#### Verification

I verified the successful creation of the image file:


```bash
# Check if file was created
ls -la *.png

# Verify file type
file decoded_image.png
```


**Results:**
- Successfully created `decoded_image.png`
- File type confirmed as PNG image
- File size: 298,704 bytes

Then I got a image:

![[Screenshot 2025-10-01 at 20.56.44.png]]

The hex in the image:

```
7069636F4354467B666F72656E736963735F616E616C797369735F69735F616D617A696E675F63373564643038657D
```

Which translated is:

```
picoCTF{forensics_analysis_is_amazing_c75dd08e}
```

---
