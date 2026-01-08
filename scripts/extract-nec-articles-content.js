const https = require('https');
const fs = require('fs');

const articles = [
  {
    title: "National Equestrian Championship Kicks off!",
    url: "https://hprc.in/national-equestrian-championship-kicks-off.html",
    slug: "national-equestrian-championship-kicks-off"
  },
  {
    title: "Press Coverage Articles - National Equestrian Championship 2016",
    url: "https://hprc.in/national-equestrian-championship-2016.html",
    slug: "press-coverage-nec-2016"
  },
  {
    title: "National Equestrian Championship, 2016",
    url: "https://hprc.in/national-equestrian-championship-2016.html",
    slug: "national-equestrian-championship-2016-news"
  }
];

function extractContent(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        // Extract images
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
          if (!src.includes('logo') && !src.includes('icon') && !src.includes('favicon') && 
              !src.includes('banner') && !src.includes('telephone') && 
              (src.includes('NEC') || src.includes('News') || src.includes('equestrian') || 
              src.includes('championship') || src.includes('gallery') || 
              src.match(/\.(jpg|jpeg|png|gif)$/i))) {
            if (!images.includes(src)) {
              images.push(src);
            }
          }
        }
        
        // Extract main content text
        // Look for the main article content
        const contentMatch = data.match(/National Equestrian Championship[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i);
        const allPMatches = data.match(/<p[^>]*>([\s\S]*?)<\/p>/gi);
        
        let content = '';
        if (allPMatches) {
          const paragraphs = allPMatches
            .map(p => p.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
            .filter(p => p.length > 20 && !p.includes('HYDERABAD') && !p.includes('Member Login'))
            .slice(0, 10);
          content = paragraphs.join('\n\n');
        }
        
        // Also try to find h6 or other heading content
        const h6Match = data.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi);
        let heading = '';
        if (h6Match) {
          const headings = h6Match
            .map(h => h.replace(/<[^>]+>/g, '').trim())
            .filter(h => h.includes('National Equestrian') || h.includes('Equestrian Championship'));
          if (headings.length > 0) {
            heading = headings[0];
          }
        }
        
        resolve({
          images,
          content,
          heading,
          rawHtml: data.substring(0, 5000)
        });
      });
    }).on('error', () => {
      resolve({ images: [], content: '', heading: '', rawHtml: '' });
    });
  });
}

async function processAll() {
  console.log('Extracting content from NEC articles...\n');
  
  const results = [];
  
  for (const article of articles) {
    console.log(`Processing: ${article.title}`);
    console.log(`URL: ${article.url}`);
    
    const extracted = await extractContent(article.url);
    results.push({
      ...article,
      ...extracted
    });
    
    console.log(`  Images: ${extracted.images.length}`);
    console.log(`  Content length: ${extracted.content.length}`);
    console.log('');
  }
  
  fs.writeFileSync('nec-articles-content.json', JSON.stringify(results, null, 2));
  console.log('Saved to nec-articles-content.json');
}

processAll();
