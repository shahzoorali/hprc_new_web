const fs = require('fs');
const path = require('path');
const https = require('https');

const images = [
  {
    name: 'chukkers.jpg',
    url: 'https://hprc.in/documents/20124/101007/chukkers.jpg/a7eb9af5-89d8-165b-bdf8-35d430796ce2?t=1677594793869'
  },
  {
    name: 'chukkers-logo.png',
    url: 'https://hprc.in/documents/20124/0/chukkers-logo.png'
  },
  {
    name: 'snaffles.jpg',
    url: 'https://hprc.in/documents/20124/101007/snaffles.jpg/a2ca6417-698b-f7c0-fc03-d2d5e89cab17?t=1677594794999'
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

// Download image using https module
function downloadImage(image) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(publicDir, image.name);
    console.log(`Downloading: ${image.name}...`);
    
    const file = fs.createWriteStream(filePath);
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': 'https://hprc.in/'
      }
    };
    
    https.get(image.url, options, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          const stats = fs.statSync(filePath);
          console.log(`✓ Saved: ${filePath} (${stats.size} bytes)`);
          resolve(true);
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        const redirectUrl = response.headers.location;
        console.log(`Redirecting to: ${redirectUrl}`);
        file.close();
        fs.unlinkSync(filePath);
        downloadImage({ name: image.name, url: redirectUrl }).then(resolve).catch(reject);
      } else {
        file.close();
        fs.unlinkSync(filePath);
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      reject(err);
    });
  });
}

// Download all images
async function downloadAll() {
  console.log('Starting image downloads from HPRC website...\n');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const image of images) {
    try {
      await downloadImage(image);
      successCount++;
    } catch (error) {
      console.error(`✗ Failed to download ${image.name}: ${error.message}`);
      failCount++;
    }
  }
  
  console.log(`\nDownload complete: ${successCount} succeeded, ${failCount} failed`);
  process.exit(failCount > 0 ? 1 : 0);
}

downloadAll();

