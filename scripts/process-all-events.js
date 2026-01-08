const https = require('https');
const fs = require('fs');
const path = require('path');

const events = [
  {
    title: "Arena Polo Tournament 2016",
    url: "https://hprc.in/Event-arena-polo-tournament-2016.html",
    slug: "arena-polo-tournament-2016"
  },
  {
    title: "National Equestrian Championship Calendar 2016",
    url: "https://hprc.in/nec-calendar-2016.html",
    slug: "nec-calendar-2016"
  },
  {
    title: "HPRC International Arena Polo Championship",
    url: "https://hprc.in/HPRC_Event_Page.html",
    slug: "hprc-international-arena-polo-championship"
  },
  {
    title: "HPRC Sport Complex",
    url: "https://hprc.in/HPRC_Sport_Page.html",
    slug: "hprc-sport-complex"
  }
];

async function processEvent(event) {
  return new Promise((resolve, reject) => {
    console.log(`\nProcessing: ${event.title}`);
    console.log(`URL: ${event.url}`);
    
    https.get(event.url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const eventData = {
          title: event.title,
          slug: event.slug,
          url: event.url,
          images: [],
          pdfs: [],
          content: {}
        };

        // Extract images
        const imgRegex = /<img[^>]*src=['"]([^'"]+)['"][^>]*>/gi;
        let match;
        while ((match = imgRegex.exec(data)) !== null) {
          let src = match[1];
          if (src.startsWith('/')) {
            src = 'https://hprc.in' + src;
          } else if (!src.startsWith('http')) {
            src = 'https://hprc.in/' + src;
          }
          if (!src.includes('logo') && !src.includes('icon') && !src.includes('favicon') && 
              !src.includes('banner') && (src.includes('gallery') || src.includes('event') || 
              src.match(/\.(jpg|jpeg|png|gif)$/i))) {
            if (!eventData.images.includes(src)) {
              eventData.images.push(src);
            }
          }
        }

        // Extract PDFs
        const pdfRegex = /<a[^>]*href=['"]([^'"]*\.pdf[^'"]*)['"][^>]*>/gi;
        while ((match = pdfRegex.exec(data)) !== null) {
          let href = match[1];
          if (href.startsWith('/')) {
            href = 'https://hprc.in' + href;
          } else if (!href.startsWith('http')) {
            href = 'https://hprc.in/' + href;
          }
          if (!eventData.pdfs.includes(href)) {
            eventData.pdfs.push(href);
          }
        }

        // Save event data
        const outputFile = `event-data-${event.slug}.json`;
        fs.writeFileSync(outputFile, JSON.stringify(eventData, null, 2));
        
        console.log(`  Images: ${eventData.images.length}`);
        console.log(`  PDFs: ${eventData.pdfs.length}`);
        console.log(`  Saved to ${outputFile}`);
        
        resolve(eventData);
      });
    }).on('error', (err) => {
      console.error(`Error processing ${event.title}:`, err.message);
      reject(err);
    });
  });
}

async function processAll() {
  console.log('Processing all events...\n');
  
  for (const event of events) {
    try {
      await processEvent(event);
    } catch (error) {
      console.error(`Failed to process ${event.title}:`, error.message);
    }
  }
  
  console.log('\nAll events processed!');
}

processAll();
