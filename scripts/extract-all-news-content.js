const https = require('https');
const fs = require('fs');
const path = require('path');

// All news articles that have URLs on the source site
const newsArticles = [
  {
    title: "HPRC joins hands with Academia Sports Village",
    url: "https://hprc.in/News-HPRC-joins-hands-with-Sports-Village.html",
    slug: "hprc-academia-sports-village"
  },
  {
    title: "1st Regional Equestrian League & 10th Hyderabad Horse Show",
    url: "https://hprc.in/News-1st-rel-10th-hyd-horse-show.html",
    slug: "1st-rel-10th-hyd-horse-show-news"
  },
  {
    title: "Tennis Camp by Sports Village at HPRC",
    url: "https://hprc.in/News-tennis-camp-by-sports-village-hprc.html",
    slug: "tennis-camp-sports-village-hprc"
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
          textContent: ''
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
              src.match(/\.(jpg|jpeg|png|gif)$/i))) {
            if (!content.images.includes(src)) {
              content.images.push(src);
            }
          }
        }

        // Extract text content from main content area
        // Look for the main content section
        const contentMatch = data.match(/<section[^>]*wow fadeIn[^>]*>([\s\S]*?)<\/section>/i);
        if (contentMatch) {
          const sectionContent = contentMatch[1];
          // Remove HTML tags and get text
          content.textContent = sectionContent.replace(/<[^>]+>/g, ' ')
                                             .replace(/\s+/g, ' ')
                                             .trim()
                                             .substring(0, 1000);
        }

        resolve(content);
      });
    }).on('error', () => {
      resolve({ title: article.title, slug: article.slug, url: article.url, images: [], textContent: '' });
    });
  });
}

async function processAll() {
  console.log('Extracting content from all news articles...\n');
  
  const results = [];
  
  for (const article of newsArticles) {
    const content = await extractArticleContent(article);
    results.push(content);
    
    console.log(`  Images found: ${content.images.length}`);
    content.images.forEach((img, i) => {
      console.log(`    ${i + 1}. ${img}`);
    });
  }
  
  fs.writeFileSync('all-news-article-content.json', JSON.stringify(results, null, 2));
  console.log('\n\nAll content extracted!');
  console.log('Saved to all-news-article-content.json');
}

processAll();
