const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  'https://hprc.in/images/gallery/Events01.png',
  'https://hprc.in/images/gallery/nec-2016/001.jpg',
  'https://hprc.in/images/gallery/nec-2016/002.jpg',
  'https://hprc.in/images/gallery/nec-2016/003.jpg',
  'https://hprc.in/images/gallery/nec-2016/004.jpg',
  'https://hprc.in/images/gallery/nec-2016/005.jpg',
  'https://hprc.in/images/gallery/nec-2016/006.jpg',
  'https://hprc.in/images/gallery/nec-2016/007.jpg',
  'https://hprc.in/images/gallery/nec-2016/008.jpg',
  'https://hprc.in/images/gallery/nec-2016/009.jpg',
  'https://hprc.in/images/gallery/nec-2016/010.jpg',
  'https://hprc.in/images/gallery/nec-2016/011.jpg',
  'https://hprc.in/images/gallery/nec-2016/012.jpg',
  'https://hprc.in/images/Gallery01.jpg',
];

const pdfs = [
  'https://hprc.in/pdf/final-brochure.pdf',
  'https://hprc.in/pdf/HPRC-Arena-Polo-Prospectus-2016.pdf',
];

const imageDir = path.join(__dirname, '..', 'public', 'documents', 'gallery', 'events', 'arena-polo-tournament-2016');
const pdfDir = path.join(__dirname, '..', 'public', 'documents', 'events', 'arena-polo-tournament-2016');

// Create directories
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
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
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      resolve(false);
    });
  });
}

async function downloadAll() {
  console.log('Downloading Arena Polo Tournament 2016 assets...\n');
  
  // Download images
  console.log('Downloading images...');
  for (let i = 0; i < images.length; i++) {
    const url = images[i];
    let filename;
    
    if (url.includes('nec-2016')) {
      filename = url.split('/nec-2016/')[1];
    } else if (url.includes('Events01')) {
      filename = 'events-01.png';
    } else if (url.includes('Gallery01')) {
      filename = 'gallery-01.jpg';
    } else {
      filename = `image-${String(i + 1).padStart(3, '0')}.${url.split('.').pop()}`;
    }
    
    const filepath = path.join(imageDir, filename);
    await downloadFile(url, filepath);
  }
  
  // Download PDFs
  console.log('\nDownloading PDFs...');
  for (let i = 0; i < pdfs.length; i++) {
    const url = pdfs[i];
    const filename = url.split('/').pop();
    const filepath = path.join(pdfDir, filename);
    await downloadFile(url, filepath);
  }
  
  console.log('\nDownload complete!');
}

downloadAll();
