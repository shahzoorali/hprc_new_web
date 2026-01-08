const https = require('https');
const fs = require('fs');
const path = require('path');

// Based on the news.html page, these are all the news entries
const newsEntries = [
  {
    title: "Chaitania Kumar and Arsalan Khan shine on the international stage",
    slug: "chaitania-kumar-arsalan-khan-international-stage",
    image: "https://hprc.in/images/dcmain.jpg"
  },
  {
    title: "HPRC to launch all inclusive Silver Spur Sports Arena",
    slug: "hprc-silver-spur-sports-arena",
    image: "https://hprc.in/images/news_update/news01.jpeg"
  },
  {
    title: "Academia Sports Village Certificate Distribution Ceremony",
    slug: "academia-sports-village-certificate-distribution",
    image: "https://hprc.in/images/gallery/academia-Sports-Village-Certificate-Distribution-Ceremony01.png"
  },
  {
    title: "HPRC joins hands with Academia Sports Village",
    slug: "hprc-joins-hands-academia-sports-village",
    url: "https://hprc.in/News-HPRC-joins-hands-with-Sports-Village.html",
    image: "https://hprc.in/images/gallery/HPRC-joins-hands-with-Sports-Village-02.png"
  },
  {
    title: "1st Regional Equestrian League & 10th Hyderabad Horse Show",
    slug: "1st-rel-10th-hyd-horse-show-news",
    url: "https://hprc.in/News-1st-rel-10th-hyd-horse-show.html",
    image: "https://hprc.in/images/gallery/News-1st-rel-Thumb01.jpg"
  },
  {
    title: "1st Regional Equestrian League & 10th Hyderabad Horse Show",
    slug: "1st-rel-10th-hyd-horse-show-news-2",
    url: "https://hprc.in/News-1st-rel-10th-hyd-horse-show2.html",
    image: "https://hprc.in/images/gallery/News-1st-rel-Thumb02.jpg"
  },
  {
    title: "Tennis Camp by Sports Village at HPRC",
    slug: "tennis-camp-sports-village-hprc",
    url: "https://hprc.in/News-tennis-camp-by-sports-village-hprc.html",
    image: "https://hprc.in/images/gallery/Sports-Village-HPRC-02.jpg"
  },
  {
    title: "HPRC Partners with Sports Village",
    slug: "hprc-partners-sports-village",
    image: "https://hprc.in/images/SportsVillage01.jpg"
  },
  {
    title: "ARENA POLO TOURNAMENT 2016",
    slug: "arena-polo-tournament-2016-news",
    image: "https://hprc.in/images/gallery/arena-polo-tournament-2016-01.jpg"
  },
  {
    title: "Press Coverage Articles - National Equestrian Championship 2016",
    slug: "press-coverage-nec-2016",
    image: "https://hprc.in/images/gallery/News-NEC-2016.jpg"
  },
  {
    title: "National Equestrian Championship, 2016",
    slug: "national-equestrian-championship-2016-news",
    image: "https://hprc.in/images/gallery/national-equestrian-championship16.jpg"
  },
  {
    title: "All about Olympic Equestrian Sports",
    slug: "all-about-olympic-equestrian-sports",
    image: "https://hprc.in/images/gallery/all-about-olympic-equestrian-sports.jpg"
  },
  {
    title: "National Equestrian Championship Kicks off!",
    slug: "national-equestrian-championship-kicks-off",
    image: "https://hprc.in/images/gallery/NewsNEC-kicks-off.jpg"
  }
];

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

async function processNewsEntry(entry) {
  console.log(`\nProcessing: ${entry.title}`);
  
  const newsDir = path.join(__dirname, '..', 'public', 'documents', 'news');
  if (!fs.existsSync(newsDir)) {
    fs.mkdirSync(newsDir, { recursive: true });
  }
  
  // Download image
  if (entry.image) {
    const imageUrl = entry.image;
    const imageFilename = imageUrl.split('/').pop();
    const imagePath = path.join(newsDir, imageFilename);
    
    console.log(`  Downloading image: ${imageFilename}`);
    await downloadFile(imageUrl, imagePath);
    entry.localImage = `/documents/news/${imageFilename}`;
  }
  
  // If there's a URL, fetch the content
  if (entry.url) {
    return new Promise((resolve) => {
      https.get(entry.url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          // Extract images from the page
          const imgRegex = /<img[^>]*src=['"]([^'"]+)['"][^>]*>/gi;
          const images = [];
          let match;
          
          while ((match = imgRegex.exec(data)) !== null) {
            let src = match[1];
            if (src.startsWith('/')) {
              src = 'https://hprc.in' + src;
            } else if (!src.startsWith('http')) {
              src = 'https://hprc.in/' + src;
            }
            if (!src.includes('logo') && !src.includes('icon') && !src.includes('favicon')) {
              if (!images.includes(src)) {
                images.push(src);
              }
            }
          }
          
          entry.images = images;
          entry.content = data;
          resolve(entry);
        });
      }).on('error', () => {
        resolve(entry);
      });
    });
  }
  
  return entry;
}

async function processAll() {
  console.log('Processing all news entries...\n');
  
  const processedEntries = [];
  
  for (const entry of newsEntries) {
    const processed = await processNewsEntry(entry);
    processedEntries.push(processed);
  }
  
  // Save all processed entries
  fs.writeFileSync('processed-news-entries.json', JSON.stringify(processedEntries, null, 2));
  
  console.log('\n\nAll news entries processed!');
  console.log(`Total entries: ${processedEntries.length}`);
  console.log('Saved to processed-news-entries.json');
}

processAll();
