# PicoMini CTF 2025 Write-ups

A modern, responsive website showcasing detailed write-ups for PicoMini CTF 2025 challenges across various categories including Web Exploitation, Reverse Engineering, Cryptography, Forensics, Binary Exploitation, and General Skills.

## Features

- 📚 **Organized by Category**: Write-ups are neatly categorized for easy navigation
- 🎨 **Modern Design**: Built with Next.js 15 and Tailwind CSS for a clean, responsive interface
- 📱 **Mobile Friendly**: Fully responsive design that works on all devices
- ⚡ **Fast Loading**: Static site generation for optimal performance
- 🔍 **Easy Navigation**: Intuitive navigation between write-ups within categories
- 📝 **Rich Content**: Properly formatted markdown with syntax highlighting for code blocks

## Categories Covered

- **Web Exploitation** - Web application security challenges
- **Reverse Engineering** - Binary analysis and reverse engineering tasks
- **Cryptography** - Cryptographic challenges and encryption/decryption
- **Forensics** - Digital forensics and file analysis
- **Binary Exploitation** - Buffer overflows, format strings, and binary exploitation
- **General Skills** - General cybersecurity and problem-solving challenges

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Markdown Processing**: Remark with GitHub Flavored Markdown support
- **Deployment**: Static site generation (SSG)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pico-ctf-writeups
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with navigation and footer
│   ├── page.tsx            # Home page with category overview
│   └── writeup/
│       └── [slug]/
│           └── page.tsx    # Individual write-up pages
├── components/
│   ├── Navigation.tsx      # Main navigation component
│   ├── Footer.tsx          # Footer component
│   └── WriteupNavigation.tsx # Write-up navigation component
└── lib/
    ├── writeups.ts         # Write-up processing utilities
    └── categoryMapping.ts  # Category mapping for write-ups
writeups/                   # Markdown write-up files
```

## Adding New Write-ups

1. Add your markdown file to the `writeups/` directory
2. Update the category mapping in `src/lib/categoryMapping.ts` if needed
3. The write-up will automatically appear on the website

## Write-up Format

Write-ups should be in markdown format with the following structure:

```markdown
---
title: "Challenge Name"
category: "Category Name"
description: "Brief description"
---

# Challenge Title

## Information given
...

## Solution
...
```

## Contributing

This is a personal collection of write-ups, but suggestions and improvements are welcome!

## License

This project is for educational purposes only. All CTF challenges are from PicoMini CTF 2025.

---

**Author**: Sidd Sehgal  
**Built with**: Cursor, Next.js, Tailwind CSS, TypeScript