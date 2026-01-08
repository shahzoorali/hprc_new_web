const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  'https://hprc.in/images/gallery/HPRC-Sports-Village/001.jpg',
  'https://hprc.in/images/gallery/HPRC-Sports-Village/002.jpg',
  'https://hprc.in/images/gallery/HPRC-Sports-Village/003.jpg',
  'https://hprc.in/images/gallery/HPRC-Sports-Village/004.jpg',
  'https://hprc.in/images/gallery/HPRC-Sports-Village/005.jpg',
  'https://hprc.in/images/gallery/HPRC-Sports-Village/006.jpg',
  'https://hprc.in/images/gallery/HPRC-Sports-Village/007.jpg',
  'https://hprc.in/images/gallery/HPRC-Sports-Village/008.jpg',
];

const imageDir = path.join(__dirname, '..', 'public', 'documents', 'gallery', 'news', 'hprc-academia-sports-village');

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
  console.log('Downloading HPRC-Sports-Village images...\n');
  
  for (let i = 0; i < images.length; i++) {
    const url = images[i];
    const filename = url.split('/HPRC-Sports-Village/')[1];
    const filepath = path.join(imageDir, filename);
    await downloadFile(url, filepath);
  }
  
  console.log('\nDownload complete!');
}

downloadAll();
