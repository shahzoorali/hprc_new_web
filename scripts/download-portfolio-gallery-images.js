const https = require('https');
const fs = require('fs');
const path = require('path');

// Try to find all REL-10th-Show images (they might be numbered 01-07 or more)
const baseUrl = 'https://hprc.in/images/gallery/REL-10th-Show-';
const outputDir = path.join(__dirname, '..', 'public', 'documents', 'gallery', 'events', '1st-rel-portfolio-gallery');

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
          resolve(true);
        });
      } else {
        file.close();
        if (fs.existsSync(path.join(outputDir, filename))) {
          fs.unlinkSync(path.join(outputDir, filename));
        }
        resolve(false); // Not an error, just file doesn't exist
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(path.join(outputDir, filename))) {
        fs.unlinkSync(path.join(outputDir, filename));
      }
      resolve(false);
    });
  });
}

async function downloadAll() {
  console.log('Checking and downloading REL-10th-Show images...\n');
  
  const downloaded = [];
  
  // Try numbers 01-20
  for (let i = 1; i <= 20; i++) {
    const num = String(i).padStart(2, '0');
    const url = `${baseUrl}${num}.png`;
    const filename = `rel-10th-show-${num}.png`;
    
    const success = await downloadImage(url, filename);
    if (success) {
      downloaded.push({
        url: `/documents/gallery/events/1st-rel-portfolio-gallery/rel-10th-show-${num}.png`,
        originalUrl: url
      });
    }
  }
  
  // Also try .jpg extension
  for (let i = 1; i <= 20; i++) {
    const num = String(i).padStart(2, '0');
    const url = `${baseUrl}${num}.jpg`;
    const filename = `rel-10th-show-${num}.jpg`;
    
    const success = await downloadImage(url, filename);
    if (success) {
      downloaded.push({
        url: `/documents/gallery/events/1st-rel-portfolio-gallery/rel-10th-show-${num}.jpg`,
        originalUrl: url
      });
    }
  }
  
  console.log(`\nDownloaded ${downloaded.length} images`);
  fs.writeFileSync('portfolio-gallery-images.json', JSON.stringify(downloaded, null, 2));
  console.log('Saved image list to portfolio-gallery-images.json');
}

downloadAll();
