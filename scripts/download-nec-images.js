const https = require('https');
const fs = require('fs');
const path = require('path');

// Images for "National Equestrian Championship Kicks off!"
const kicksOffImages = [
  'https://hprc.in/images/gallery/NewsNEC-kicks-off.jpg',
];

// Images for Press Coverage and NEC 2016 News (they share the same gallery)
const pressCoverageImages = [];
for (let i = 1; i <= 14; i++) {
  const num = i.toString().padStart(3, '0');
  pressCoverageImages.push(`https://hprc.in/images/gallery/News-National-equestrian-championship-2016/${num}.png`);
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
        console.log(`Failed: ${url}`);
        resolve(false);
      }
    }).on('error', () => {
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      console.log(`Error: ${url}`);
      resolve(false);
    });
  });
}

async function downloadAll() {
  console.log('Downloading NEC images...\n');
  
  // Download kicks-off image
  const kicksOffDir = path.join(__dirname, '..', 'public', 'documents', 'gallery', 'news', 'nec-kicks-off');
  if (!fs.existsSync(kicksOffDir)) {
    fs.mkdirSync(kicksOffDir, { recursive: true });
  }
  
  for (const url of kicksOffImages) {
    const filename = url.split('/').pop();
    const filepath = path.join(kicksOffDir, filename);
    await downloadFile(url, filepath);
  }
  
  // Download press coverage images
  const pressDir = path.join(__dirname, '..', 'public', 'documents', 'gallery', 'news', 'nec-press-coverage');
  if (!fs.existsSync(pressDir)) {
    fs.mkdirSync(pressDir, { recursive: true });
  }
  
  for (const url of pressCoverageImages) {
    const filename = url.split('/').pop();
    const filepath = path.join(pressDir, filename);
    await downloadFile(url, filepath);
  }
  
  console.log('\nDownload complete!');
}

downloadAll();
