const fs = require('fs');
const path = require('path');

const directoriesToScan = [
  path.join(__dirname, 'src', 'components'),
  path.join(__dirname, 'src', 'app'),
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      // Fix duplicate classes
      content = content.replace(/text-white\s+text-white/g, 'text-white');
      content = content.replace(/dark:text-white\s+dark:text-white/g, 'dark:text-white');
      content = content.replace(/bg-brand-gold\s+text-white\s+text-white/g, 'bg-brand-gold text-white');
      
      // Ensure high contrast on cards in light mode
      // If we have a 'texture-card' or similar, ensure it's bg-white on light mode
      content = content.replace(/bg-zinc-50\s+dark:bg-zinc-900\/60/g, 'bg-white dark:bg-zinc-900/60');
      content = content.replace(/bg-zinc-100\s+dark:bg-zinc-950/g, 'bg-white dark:bg-zinc-950');
      
      // Fix specific text contrast in Services/Testimonials
      content = content.replace(/text-gray-700\s+dark:text-gray-300/g, 'text-zinc-900 dark:text-zinc-300');
      content = content.replace(/text-slate-700\s+dark:text-slate-200/g, 'text-zinc-900 dark:text-zinc-200');
      
      // Fix buttons with fixed hex from previous script
      content = content.replace(/style=\{\{\s*backgroundColor:\s*'#d4a853'\s*\}\}/g, 'className="bg-brand-gold text-white"');
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Polished: ${fullPath}`);
      }
    }
  }
}

for (const dir of directoriesToScan) {
  processDirectory(dir);
}
console.log('Polish complete.');
