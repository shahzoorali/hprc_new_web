const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Event gallery mappings
const events = [
  {
    name: '1st-rel',
    url: 'https://hprc.in/gallery-1st-rel-10th-hyd-horse-show.html',
    imagePath: 'images/gallery/1st-rel/',
    title: '1st Regional Equestrian League & 10th Hyderabad Horse Show'
  },
  {
    name: 'tennis-camp',
    url: 'https://hprc.in/tennis-camp-by-sports-village-hprc.html',
    imagePath: 'images/gallery/tennis-camp/',
    title: 'Tennis Camp by Sports Village at HPRC'
  },
  {
    name: 'third-horse-show-2015',
    url: 'https://hprc.in/third-hyderabad-horse-show-03-may-2015.html',
    imagePath: 'images/gallery/third-horse-show-2015/',
    title: 'Third Hyderabad Horse Show – 03 May 2015'
  },
  {
    name: 'cross-country-2015',
    url: 'https://hprc.in/cross-country-riding-18-jan-2015.html',
    imagePath: 'images/gallery/cross-country-2015/',
    title: 'Cross Country Riding – 18 Jan 2015'
  },
  {
    name: 'second-horse-show-2014',
    url: 'https://hprc.in/second-hyderabad-horse-show-18-nov-2014.html',
    imagePath: 'images/gallery/second-horse-show-2014/',
    title: 'Second Hyderabad Horse Show – 13 Dec 2014'
  },
  {
    name: 'first-horse-show-2014',
    url: 'https://hprc.in/first-hyderabad-horse-show-18-nov-2014.html',
    imagePath: 'images/gallery/first-horse-show-2014/',
    title: 'First Hyderabad Horse Show – 18 Nov 2014'
  },
  {
    name: 'arena-polo-2013-sep',
    url: 'https://hprc.in/arena-polo-championship-22-sep-2013.html',
    imagePath: 'images/gallery/arena-polo-2013-sep/',
    title: 'Arena Polo Championship - 22 Sep 2013'
  },
  {
    name: 'polo-art-2013',
    url: 'https://hprc.in/confluence-polo-art-01-june-2013.html',
    imagePath: 'images/gallery/polo-art-2013/',
    title: 'Confluence Polo and Art – 01 June 2013'
  },
  {
    name: 'mumbai-season-2013',
    url: 'https://hprc.in/hprc-mumbai-season-2013-29th-mar-2013.html',
    imagePath: 'images/gallery/mumbai-season-2013/',
    title: 'HPRC Mumbai Season 2013 – 29th Mar 2013'
  },
  {
    name: 'arena-polo-2012',
    url: 'https://hprc.in/arena-polo-championship-17-sep-2012.html',
    imagePath: 'images/gallery/arena-polo-2012/',
    title: 'Arena Polo Championship - 17 Sep 2012'
  },
  {
    name: 'fourth-horse-show-2015',
    url: 'https://hprc.in/fourth-hyderabad-horse-show-10-nov-2015.html',
    imagePath: 'images/gallery/fourth-horse-show-2015/',
    title: 'Fourth Hyderabad Horse Show – 11 Oct 2015'
  },
  {
    name: 'nec-2016',
    url: 'https://hprc.in/nec-2016.html',
    imagePath: 'images/gallery/nec-2016/',
    title: 'National Equestrian Championship 2016'
  },
  {
    name: 'independence-day-2015',
    url: 'https://hprc.in/independence-day-celebration-15-aug-2015.html',
    imagePath: 'images/gallery/independence-day-2015/',
    title: 'Independence Day Celebration – 2015'
  }
];

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, filepath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filepath);
        return reject(new Error(`Failed to download: ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(err);
    });
  });
}

function extractImageUrls(html, imagePath) {
  const regex = new RegExp(`${imagePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\d+\\.(jpg|jpeg|png))`, 'gi');
  const matches = [...html.matchAll(regex)];
  const uniqueImages = [...new Set(matches.map(m => m[0]))];
  return uniqueImages.sort();
}

async function downloadEventImages(event) {
  console.log(`\nProcessing: ${event.title}`);
  console.log(`URL: ${event.url}`);
  
  try {
    // Fetch HTML
    const html = await new Promise((resolve, reject) => {
      const protocol = event.url.startsWith('https') ? https : http;
      protocol.get(event.url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      }).on('error', reject);
    });
    
    // Extract image URLs
    const imageUrls = extractImageUrls(html, event.imagePath);
    console.log(`Found ${imageUrls.length} images`);
    
    if (imageUrls.length === 0) {
      console.log('No images found, trying alternative patterns...');
      // Try to find any images in gallery folder
      const altRegex = /images\/gallery\/[^"'\s]+\.(jpg|jpeg|png)/gi;
      const altMatches = [...html.matchAll(altRegex)];
      const altImages = [...new Set(altMatches.map(m => m[0]))];
      console.log(`Found ${altImages.length} alternative images`);
      if (altImages.length > 0) {
        imageUrls.push(...altImages);
      }
    }
    
    // Create directory
    const eventDir = path.join(__dirname, '..', 'public', 'documents', 'gallery', 'events', event.name);
    if (!fs.existsSync(eventDir)) {
      fs.mkdirSync(eventDir, { recursive: true });
    }
    
    // Download images
    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      const fullUrl = imageUrl.startsWith('http') ? imageUrl : `https://hprc.in/${imageUrl}`;
      const filename = path.basename(imageUrl);
      const filepath = path.join(eventDir, filename);
      
      try {
        console.log(`  Downloading ${i + 1}/${imageUrls.length}: ${filename}`);
        await downloadFile(fullUrl, filepath);
      } catch (err) {
        console.log(`  Failed to download ${filename}: ${err.message}`);
      }
    }
    
    console.log(`✓ Completed: ${event.title}`);
    return imageUrls.map(img => {
      const filename = path.basename(img);
      return `/documents/gallery/events/${event.name}/${filename}`;
    });
  } catch (error) {
    console.error(`Error processing ${event.title}:`, error.message);
    return [];
  }
}

async function main() {
  console.log('Starting event gallery image download...\n');
  
  const results = {};
  for (const event of events) {
    const images = await downloadEventImages(event);
    results[event.name] = {
      title: event.title,
      images: images
    };
    // Small delay between events
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n=== Download Summary ===');
  console.log(JSON.stringify(results, null, 2));
}

main().catch(console.error);
