const https = require('https');
const fs = require('fs');

https.get('https://hprc.in/news.html', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const articleLinks = [];
    
    // Find all links that might be news articles
    const linkPattern = /<a[^>]*href=['"]([^'"]*News[^'"]*\.html|[^'"]*news[^'"]*\.html|[^'"]*academia[^'"]*\.html)['"][^>]*>([\s\S]*?)<\/a>/gi;
    let match;
    
    while ((match = linkPattern.exec(data)) !== null) {
      const href = match[1];
      let linkText = match[2].replace(/<[^>]*>/g, '').trim();
      
      if (linkText && linkText.length > 5 && !linkText.includes('Newsletters') && !linkText.includes('News & Events')) {
        let fullUrl = href;
        if (href.startsWith('/')) {
          fullUrl = 'https://hprc.in' + href;
        } else if (!href.startsWith('http')) {
          fullUrl = 'https://hprc.in/' + href;
        }
        
        if (!articleLinks.find(a => a.url === fullUrl)) {
          articleLinks.push({
            title: linkText,
            url: fullUrl
          });
        }
      }
    }
    
    console.log('Found article links:');
    articleLinks.forEach((link, i) => {
      console.log(`${i + 1}. ${link.title}`);
      console.log(`   URL: ${link.url}`);
    });
    
    fs.writeFileSync('all-news-urls.json', JSON.stringify(articleLinks, null, 2));
    console.log('\nSaved to all-news-urls.json');
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
