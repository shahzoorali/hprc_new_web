const https = require('https');
const fs = require('fs');
const path = require('path');

// Get event URL from command line
const eventUrl = process.argv[2];
const eventSlug = process.argv[3];

if (!eventUrl || !eventSlug) {
  console.error('Usage: node create-event-page.js <event-url> <event-slug>');
  process.exit(1);
}

console.log(`Processing event: ${eventSlug}`);
console.log(`URL: ${eventUrl}\n`);

https.get(eventUrl, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const eventData = {
      url: eventUrl,
      slug: eventSlug,
      title: '',
      content: {},
      images: [],
      pdfs: []
    };

    // Extract title
    const titleMatch = data.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    if (titleMatch) {
      eventData.title = titleMatch[1].replace(/HYDERABAD POLO AND RIDING CLUB[^<]*/, '').trim();
    }

    // Extract main content sections
    const mainContentMatch = data.match(/<section[^>]*>([\s\S]*?)<\/section>/gi);
    
    // Extract all images
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
      // Filter out logos, icons, etc.
      if (!src.includes('logo') && !src.includes('icon') && !src.includes('favicon') && 
          !src.includes('banner') && (src.includes('gallery') || src.includes('event') || 
          src.includes('image') || src.match(/\.(jpg|jpeg|png|gif)$/i))) {
        if (!images.includes(src)) {
          images.push(src);
        }
      }
    }

    // Extract all PDFs
    const pdfRegex = /<a[^>]*href=['"]([^'"]*\.pdf[^'"]*)['"][^>]*>/gi;
    const pdfs = [];
    while ((match = pdfRegex.exec(data)) !== null) {
      let href = match[1];
      if (href.startsWith('/')) {
        href = 'https://hprc.in' + href;
      } else if (!href.startsWith('http')) {
        href = 'https://hprc.in/' + href;
      }
      if (!pdfs.includes(href)) {
        pdfs.push(href);
      }
    }

    eventData.images = images;
    eventData.pdfs = pdfs;

    // Save extracted data
    const outputFile = `event-data-${eventSlug}.json`;
    fs.writeFileSync(outputFile, JSON.stringify(eventData, null, 2));
    
    console.log(`Title: ${eventData.title}`);
    console.log(`Images found: ${images.length}`);
    images.forEach((img, i) => console.log(`  ${i + 1}. ${img}`));
    console.log(`\nPDFs found: ${pdfs.length}`);
    pdfs.forEach((pdf, i) => console.log(`  ${i + 1}. ${pdf}`));
    console.log(`\nSaved to ${outputFile}`);
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
