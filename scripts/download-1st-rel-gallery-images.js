const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  'https://hprc.in/images/gallery/1stRel/001.jpg',
  'https://hprc.in/images/gallery/1stRel/002.jpg',
  'https://hprc.in/images/gallery/1stRel/003.jpg',
  'https://hprc.in/images/gallery/1stRel/004.jpg',
  'https://hprc.in/images/gallery/1stRel/005.jpg',
  'https://hprc.in/images/gallery/1stRel/006.jpg',
  'https://hprc.in/images/gallery/1stRel/007.jpg',
];

const outputDir = path.join(__dirname, '..', 'public', 'documents', 'gallery', 'events', '1st-rel-gallery');

// Create directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(outputDir, filename));
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded: ${filename}`);
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        file.close();
        fs.unlinkSync(path.join(outputDir, filename));
        downloadImage(response.headers.location, filename).then(resolve).catch(reject);
      } else {
        file.close();
        fs.unlinkSync(path.join(outputDir, filename));
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(path.join(outputDir, filename))) {
        fs.unlinkSync(path.join(outputDir, filename));
      }
      reject(err);
    });
  });
}

async function downloadAll() {
  console.log('Downloading 7 images from Event Gallery...\n');
  
  for (let i = 0; i < images.length; i++) {
    const url = images[i];
    const filename = `gallery-${String(i + 1).padStart(3, '0')}.jpg`;
    
    try {
      await downloadImage(url, filename);
    } catch (error) {
      console.error(`Error downloading ${url}:`, error.message);
    }
  }
  
  console.log('\nDownload complete!');
}

downloadAll();
