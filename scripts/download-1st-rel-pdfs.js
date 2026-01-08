const https = require('https');
const fs = require('fs');
const path = require('path');

const pdfs = [
  {
    url: 'https://hprc.in/pdf/Prospectus-for-1st-REL-10th-Horse-Show.pdf',
    filename: 'prospectus-1st-rel-10th-horse-show.pdf'
  },
  {
    url: 'https://hprc.in/pdf/Dressage-Test-for-Children-I.pdf',
    filename: 'dressage-test-children-i.pdf'
  },
  {
    url: 'https://hprc.in/pdf/Dressage-Test-for-Children-II.pdf',
    filename: 'dressage-test-children-ii.pdf'
  },
  {
    url: 'https://hprc.in/pdf/Dressage-Test-for-Junior-Riders.pdf',
    filename: 'dressage-test-junior-riders.pdf'
  }
];

const outputDir = path.join(__dirname, '..', 'public', 'documents', 'events', '1st-rel-10th-hyd-horse-show');

// Create directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadPDF(url, filename) {
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
        downloadPDF(response.headers.location, filename).then(resolve).catch(reject);
      } else {
        file.close();
        if (fs.existsSync(path.join(outputDir, filename))) {
          fs.unlinkSync(path.join(outputDir, filename));
        }
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
  console.log('Downloading 4 PDFs from Event page...\n');
  
  for (let i = 0; i < pdfs.length; i++) {
    const { url, filename } = pdfs[i];
    
    try {
      await downloadPDF(url, filename);
    } catch (error) {
      console.error(`Error downloading ${url}:`, error.message);
    }
  }
  
  console.log('\nDownload complete!');
  console.log(`PDFs saved to: ${outputDir}`);
}

downloadAll();
