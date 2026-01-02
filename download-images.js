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

// Download each image
async function downloadImage(image) {
  const filePath = path.join(publicDir, image.name);
  console.log(`Downloading: ${image.url} -> ${filePath}`);
  
  try {
    const response = await fetch(image.url);
    
    if (!response.ok) {
      throw new Error(`Failed to download ${image.url}: ${response.status}`);
    }
    
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filePath, buffer);
    console.log(`Saved: ${filePath} (${buffer.length} bytes)`);
    return true;
  } catch (error) {
    console.error(`Error downloading ${image.url}:`, error.message);
    return false;
  }
}

// Download all images sequentially
async function downloadAll() {
  console.log('Starting downloads...');
  let allSuccess = true;
  
  for (const image of images) {
    const success = await downloadImage(image);
    if (!success) {
      allSuccess = false;
    }
  }
  
  console.log(`All downloads ${allSuccess ? 'completed!' : 'failed!'}`);
  process.exit(0);
}

downloadAll();

