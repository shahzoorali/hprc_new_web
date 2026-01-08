const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  'https://hprc.in/images/gallery/all-about-olympic-equestrian-sports.jpg',
  'https://hprc.in/images/gallery/News0001.jpg',
  'https://hprc.in/images/Jump02.jpg',
  'https://hprc.in/images/Cross-Country-Ride.jpg',
];

const imageDir = path.join(__dirname, '..', 'public', 'documents', 'gallery', 'news', 'olympic-equestrian-sports');

if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

function downloadFile(url, filepath) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded: ${path.basename(filepath)}`);
          resolve(true);
        });
      } else {
        file.close();
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
        resolve(false);
      }
    }).on('error', () => {
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      resolve(false);
    });
  });
}

async function downloadAll() {
  console.log('Downloading Olympic Equestrian Sports images...\n');
  
  for (let i = 0; i < images.length; i++) {
    const url = images[i];
    const filename = url.split('/').pop();
    const filepath = path.join(imageDir, filename);
    await downloadFile(url, filepath);
  }
  
  console.log('\nDownload complete!');
}

downloadAll();
