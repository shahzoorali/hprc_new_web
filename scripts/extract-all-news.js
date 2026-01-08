const https = require('https');
const fs = require('fs');

https.get('https://hprc.in/news.html', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const newsItems = [];
    
    // Extract news items from the HTML - look for list items or divs with news content
    // Pattern 1: Look for items with "+" prefix
    const plusPattern = /[+]\s*([^<]+)/gi;
    let match;
    
    while ((match = plusPattern.exec(data)) !== null) {
      const title = match[1].trim();
      if (title && title.length > 10 && !title.includes('Explore') && !title.includes('Quick links')) {
        if (!newsItems.find(item => item.title === title)) {
          newsItems.push({ title: title });
        }
      }
    }
    
    // Pattern 2: Look for news article links
    const articlePattern = /<a[^>]*href=['"]([^'"]*News[^'"]*\.html|[^'"]*news[^'"]*\.html)['"][^>]*>([\s\S]*?)<\/a>/gi;
    const articles = [];
    
    while ((match = articlePattern.exec(data)) !== null) {
      const href = match[1];
      let linkText = match[2].replace(/<[^>]*>/g, '').trim();
      
      if (linkText && linkText.length > 5 && !linkText.includes('Newsletters') && !linkText.includes('News & Events')) {
        let fullUrl = href;
        if (href.startsWith('/')) {
          fullUrl = 'https://hprc.in' + href;
        } else if (!href.startsWith('http')) {
          fullUrl = 'https://hprc.in/' + href;
        }
        
        const slug = href.replace('.html', '').replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase();
        
        if (!articles.find(a => a.url === fullUrl)) {
          articles.push({
            title: linkText,
            url: fullUrl,
            slug: slug
          });
        }
      }
    }
    
    // Extract all images
    const imgRegex = /<img[^>]*src=['"]([^'"]+)['"][^>]*>/gi;
    const images = [];
    while ((match = imgRegex.exec(data)) !== null) {
      let src = match[1];
      if (src.startsWith('/')) {
        src = 'https://hprc.in' + src;
      } else if (!src.startsWith('http')) {
        src = 'https://hprc.in/' + src;
      }
      if (!src.includes('logo') && !src.includes('icon') && !src.includes('favicon') && 
          !src.includes('banner') && !src.includes('telephone') && 
          (src.includes('news') || src.includes('gallery') || src.includes('Sports') || 
          src.match(/\.(jpg|jpeg|png|gif)$/i))) {
        if (!images.includes(src)) {
          images.push(src);
        }
      }
    }
    
    console.log('Found ' + newsItems.length + ' news items from + pattern:');
    newsItems.forEach((item, i) => {
      console.log((i + 1) + ': ' + item.title);
    });
    
    console.log('\nFound ' + articles.length + ' news articles:');
    articles.forEach((article, i) => {
      console.log((i + 1) + ': ' + article.title);
      console.log('   URL: ' + article.url);
      console.log('   Slug: ' + article.slug);
    });
    
    console.log('\nFound ' + images.length + ' images:');
    images.forEach((img, i) => {
      console.log((i + 1) + ': ' + img);
    });
    
    // Save to file
    const output = {
      items: newsItems,
      articles: articles,
      images: images
    };
    
    fs.writeFileSync('all-news-data.json', JSON.stringify(output, null, 2));
    console.log('\nSaved to all-news-data.json');
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
