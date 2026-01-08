const https = require('https');
const fs = require('fs');
const path = require('path');

const events = [
  {
    slug: 'nec-calendar-2016',
    images: [
      'https://hprc.in/images/gallery/Events02.png',
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
    ],
    pdfs: []
  },
  {
    slug: 'hprc-international-arena-polo-championship',
    images: [], // Will be populated from JSON
    pdfs: []
  },
  {
    slug: 'hprc-sport-complex',
    images: [
      'https://hprc.in/images/gallery/Events02.png',
      'https://hprc.in/images/gallery/hprc_sport/01.jpg',
      'https://hprc.in/images/gallery/hprc_sport/02.jpg',
      'https://hprc.in/images/gallery/hprc_sport/03.jpg',
      'https://hprc.in/images/gallery/hprc_sport/04.jpg',
      'https://hprc.in/images/gallery/hprc_sport/05.jpg',
      'https://hprc.in/images/gallery/hprc_sport/06.jpg',
      'https://hprc.in/images/gallery/hprc_sport/07.jpg',
      'https://hprc.in/images/gallery/hprc_sport/08.jpg',
      'https://hprc.in/images/gallery/hprc_sport/09.jpg',
      'https://hprc.in/images/gallery/hprc_sport/010.jpg',
      'https://hprc.in/images/gallery/hprc_sport/011.jpg',
      'https://hprc.in/images/gallery/hprc_sport/012.jpg',
      'https://hprc.in/images/gallery/hprc_sport/013.jpg',
      'https://hprc.in/images/gallery/hprc_sport/014.jpg',
      'https://hprc.in/images/gallery/hprc_sport/015.jpg',
      'https://hprc.in/images/gallery/hprc_sport/016.jpg',
      'https://hprc.in/images/gallery/hprc_sport/017.jpg',
      'https://hprc.in/images/gallery/hprc_sport/018.jpg',
      'https://hprc.in/images/gallery/hprc_sport/019.jpg',
      'https://hprc.in/images/Gallery01.jpg',
    ],
    pdfs: []
  }
];

// Load images for HPRC International from JSON
const hprcIntlData = JSON.parse(fs.readFileSync('event-data-hprc-international-arena-polo-championship.json', 'utf8'));
events[1].images = hprcIntlData.images;

function downloadFile(url, filepath) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
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

async function downloadEventAssets(event) {
  const imageDir = path.join(__dirname, '..', 'public', 'documents', 'gallery', 'events', event.slug);
  const pdfDir = path.join(__dirname, '..', 'public', 'documents', 'events', event.slug);

  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }

  console.log(`\nDownloading assets for ${event.slug}...`);
  console.log(`  Images: ${event.images.length}`);
  console.log(`  PDFs: ${event.pdfs.length}`);

  // Download images
  for (let i = 0; i < event.images.length; i++) {
    const url = event.images[i];
    let filename;
    
    if (url.includes('/nec/')) {
      filename = url.split('/nec/')[1];
    } else if (url.includes('/nec-2016/')) {
      filename = url.split('/nec-2016/')[1];
    } else if (url.includes('/hprc_sport/')) {
      filename = url.split('/hprc_sport/')[1];
    } else if (url.includes('Events02')) {
      filename = 'events-02.png';
    } else if (url.includes('Gallery01')) {
      filename = 'gallery-01.jpg';
    } else {
      filename = `image-${String(i + 1).padStart(3, '0')}.${url.split('.').pop()}`;
    }
    
    const filepath = path.join(imageDir, filename);
    await downloadFile(url, filepath);
  }

  // Download PDFs
  for (let i = 0; i < event.pdfs.length; i++) {
    const url = event.pdfs[i];
    const filename = url.split('/').pop();
    const filepath = path.join(pdfDir, filename);
    await downloadFile(url, filepath);
  }
}

async function downloadAll() {
  console.log('Downloading assets for all events...\n');
  
  for (const event of events) {
    await downloadEventAssets(event);
  }
  
  console.log('\nAll downloads complete!');
}

downloadAll();
