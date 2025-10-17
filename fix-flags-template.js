const fs = require('fs');
const path = require('path');

// Function to fix flags in a file using template literals
function fixFlagsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace picoCTF{flag} with {`picoCTF{flag}`}
    content = content.replace(/picoCTF\{([^}]+)\}/g, "{`picoCTF{$1}`}");
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed flags in: ${filePath}`);
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
  }
}

// Function to recursively find and fix all .tsx files
function fixAllWriteupFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixAllWriteupFiles(filePath);
    } else if (file.endsWith('.tsx')) {
      fixFlagsInFile(filePath);
    }
  });
}

// Fix all writeup files
const writeupsDir = path.join(__dirname, 'src', 'components', 'writeups');
fixAllWriteupFiles(writeupsDir);

console.log('Flag fixing with template literals completed!');
