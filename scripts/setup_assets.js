const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\a5cdbaec-0925-4088-9de1-52d711474338\\scratch\\extracted_images';
const destDir = path.join(__dirname, '..', 'public', 'images', 'founder');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

if (fs.existsSync(srcDir)) {
  const files = fs.readdirSync(srcDir);
  for (const file of files) {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    fs.copyFileSync(srcFile, destFile);
    console.log(`Copied ${file} -> ${destFile}`);
  }
} else {
  console.log('Source directory does not exist:', srcDir);
}
