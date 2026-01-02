const fs = require('fs');
const path = require('path');

const images = [
  {
    name: 'chukkers.jpg',
    url: 'https://hprc.in/documents/20124/101007/chukkers.jpg'
  },
  {
    name: 'chukkers-logo.png',
    url: 'https://hprc.in/documents/20124/0/chukkers-logo.png'
  },
  {
    name: 'snaffles.jpg',
    url: 'https://hprc.in/documents/20124/101007/snaffles.jpg'
  },
  {
    name: 'snaffles-logo.png',
    url: 'https://hprc.in/documents/20124/0/snaffles-logo.png'
  },
  {
    name: 'history2.jpg',
    url: 'https://hprc.in/documents/20124/0/history2.jpg'
  },
  {
    name: 'banquets-logo.png',
    url: 'https://hprc.in/documents/20124/0/banquets-logo.png'
  }
];

const publicDir = path.join(process.cwd(), 'public', 'documents');

// Create directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
  console.log(`Created directory: ${publicDir}`);
}

// Download all images
function downloadAll() {
  console.log('Starting downloads...');
  let allSuccess = true;
  
  for (const image of images) {
    const filePath = path.join(publicDir, image.name);
    console.log(`Downloading: ${image.url} -> ${filePath}`);
    
    try {
      const { execSync } = require('child_process');
      const { stdout, stderr } = execSync('curl', {
        cwd: process.cwd(),
        stdio: 'inherit',
        shell: true,
        env: process.env
      });
      
      if (stderr && stderr.length > 0) {
        console.error(`Failed to download ${image.name}: ${stderr}`);
        allSuccess = false;
      } else {
        const buffer = Buffer.from(stdout, 'binary');
        fs.writeFileSync(filePath, buffer);
        console.log(`Saved: ${filePath} (${buffer.length} bytes)`);
      }
    } catch (error) {
      console.error(`Error downloading ${image.name}:`, error.message);
      allSuccess = false;
    }
  }
  
  console.log(`All downloads ${allSuccess ? 'completed!' : 'failed!'}`);
  process.exit(allSuccess ? 0 : 1);
}

downloadAll();
