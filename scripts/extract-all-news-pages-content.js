const https = require('https');
const fs = require('fs');
const path = require('path');

// All news articles that might have source pages with galleries
const newsArticles = [
  {
    title: "Academia Sports Village Certificate Distribution Ceremony",
    url: "https://hprc.in/academia-Sports-Village-Certificate-Distribution-Ceremony.html",
    slug: "academia-sports-village-certificate-distribution"
  },
  {
    title: "Chaitania Kumar and Arsalan Khan shine on the international stage",
    url: null, // No direct URL found
    slug: "chaitania-kumar-arsalan-khan-international-stage"
  },
  {
    title: "HPRC to launch all inclusive Silver Spur Sports Arena",
    url: null, // No direct URL found
    slug: "hprc-silver-spur-sports-arena"
  },
  {
    title: "Press Coverage Articles - National Equestrian Championship 2016",
    url: null, // No direct URL found
    slug: "press-coverage-nec-2016"
  },
  {
    title: "National Equestrian Championship, 2016",
    url: null, // No direct URL found
    slug: "national-equestrian-championship-2016-news"
  },
  {
    title: "All about Olympic Equestrian Sports",
    url: null, // No direct URL found
    slug: "all-about-olympic-equestrian-sports"
  },
  {
    title: "National Equestrian Championship Kicks off!",
    url: null, // No direct URL found
    slug: "national-equestrian-championship-kicks-off"
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

async function extractArticleContent(article) {
  if (!article.url) {
    return { title: article.title, slug: article.slug, images: [], hasContent: false };
  }

  return new Promise((resolve) => {
    console.log(`\nExtracting: ${article.title}`);
    console.log(`URL: ${article.url}`);
    
    https.get(article.url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const content = {
          title: article.title,
          slug: article.slug,
          url: article.url,
          images: [],
          hasContent: true
        };

        // Extract all images
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
              !src.includes('banner') && !src.includes('telephone') && 
              (src.includes('gallery') || src.includes('News') || src.includes('Sports') || 
              src.includes('academia') || src.includes('Certificate') || 
              src.match(/\.(jpg|jpeg|png|gif)$/i))) {
            if (!content.images.includes(src)) {
              content.images.push(src);
            }
          }
        }

        resolve(content);
      });
    }).on('error', () => {
      resolve({ title: article.title, slug: article.slug, url: article.url, images: [], hasContent: false });
    });
  });
}

async function processAll() {
  console.log('Extracting content from all news articles...\n');
  
  const results = [];
  
  for (const article of newsArticles) {
    const content = await extractArticleContent(article);
    results.push(content);
    
    if (content.hasContent) {
      console.log(`  Images found: ${content.images.length}`);
      content.images.forEach((img, i) => {
        console.log(`    ${i + 1}. ${img}`);
      });
    } else {
      console.log(`  No source URL available`);
    }
  }
  
  fs.writeFileSync('all-news-pages-content.json', JSON.stringify(results, null, 2));
  console.log('\n\nAll content extracted!');
  console.log('Saved to all-news-pages-content.json');
}

processAll();
