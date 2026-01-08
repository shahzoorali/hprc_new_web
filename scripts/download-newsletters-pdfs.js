const https = require('https');
const fs = require('fs');
const path = require('path');

const newsletters = [
  {
    title: "NATIONAL EQUESTRIAN CHAMPIONSHIP 2016",
    url: "https://hprc.in/pdf/NATIONAL-EQUESTRIAN-CHAMPIONSHIP-2016.pdf",
    filename: "NATIONAL-EQUESTRIAN-CHAMPIONSHIP-2016.pdf"
  },
  {
    title: "4th HYDERABAD HORSE SHOW OCTOBER 2015 EDITION",
    url: "https://hprc.in/pdf/4th-HYDERABAD-HORSE-SHOW-OCTOBER-2015-EDITION.pdf",
    filename: "4th-HYDERABAD-HORSE-SHOW-OCTOBER-2015-EDITION.pdf"
  },
  {
    title: "HPRC NEWSLETTER 18th MAY 2015 EDITION",
    url: "https://hprc.in/pdf/HPRC-NEWSLETTER-18th-MAY-2015-EDITION.pdf",
    filename: "HPRC-NEWSLETTER-18th-MAY-2015-EDITION.pdf"
  },
  {
    title: "HPRC NEWSLETTER 20th MARCH 2015 EDITION",
    url: "https://hprc.in/pdf/HPRC-NEWSLETTER-20th-MARCH-2015-EDITION.pdf",
    filename: "HPRC-NEWSLETTER-20th-MARCH-2015-EDITION.pdf"
  },
  {
    title: "EQUESTRIAN ESSENTIALITY JANUARY 2015 EDITION",
    url: "https://hprc.in/pdf/EQUESTRIAN-ESSENTIALITY-JANUARY- 2015-EDITION.pdf",
    filename: "EQUESTRIAN-ESSENTIALITY-JANUARY-2015-EDITION.pdf"
  },
  {
    title: "THE FIRST HYDERABAD HORSE SHOW DECEMBER 2014 EDITION",
    url: "https://hprc.in/pdf/THE-FIRST-HYDERABAD-HORSE-SHOW-DECEMBER-2014-EDITION.pdf",
    filename: "THE-FIRST-HYDERABAD-HORSE-SHOW-DECEMBER-2014-EDITION.pdf"
  }
];

const downloadDir = path.join(__dirname, '..', 'public', 'documents', 'newsletters');

if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

function downloadFile(url, filepath) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded: ${path.basename(filepath)}`);
          resolve(true);
        });
      } else {
        file.close();
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
        console.log(`✗ Failed (${response.statusCode}): ${url}`);
        resolve(false);
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      console.log(`✗ Error: ${url} - ${err.message}`);
      resolve(false);
    });
  });
}

async function downloadAll() {
  console.log('Downloading newsletter PDFs...\n');
  
  for (const newsletter of newsletters) {
    const filepath = path.join(downloadDir, newsletter.filename);
    await downloadFile(newsletter.url, filepath);
  }
  
  console.log(`\n✓ Download complete! Files saved to: ${downloadDir}`);
}

downloadAll();
