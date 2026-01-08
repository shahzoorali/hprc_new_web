const https = require('https');
const fs = require('fs');

https.get('https://hprc.in/news.html', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const newsEntries = [];
    
    // Extract news items - they appear to be in a list format
    // Look for patterns like "+ Chaitania Kumar..." or similar
    const newsPattern = /<[^>]*>\+[\s]*([^<]+)</gi;
    let match;
    
    while ((match = newsPattern.exec(data)) !== null) {
      const title = match[1].trim();
      if (title && title.length > 5) {
        newsEntries.push(title);
      }
    }
    
    // Alternative: look for links in news sections
    const linkPattern = /<a[^>]*href=['"]([^'"]*news[^'"]*\.html|[^'"]*News[^'"]*\.html)['"][^>]*>([\s\S]*?)<\/a>/gi;
    const newsLinks = [];
    
    while ((match = linkPattern.exec(data)) !== null) {
      const href = match[1];
      const linkText = match[2].replace(/<[^>]*>/g, '').trim();
      if (linkText && linkText.length > 5) {
        let fullUrl = href;
        if (href.startsWith('/')) {
          fullUrl = 'https://hprc.in' + href;
        } else if (!href.startsWith('http')) {
          fullUrl = 'https://hprc.in/' + href;
        }
        newsLinks.push({
          title: linkText,
          url: fullUrl,
          slug: href.replace('.html', '').replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase()
        });
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
          !src.includes('banner') && (src.includes('news') || src.includes('gallery') || 
          src.match(/\.(jpg|jpeg|png|gif)$/i))) {
        if (!images.includes(src)) {
          images.push(src);
        }
      }
    }
    
    console.log('Found ' + newsEntries.length + ' news entries:');
    newsEntries.forEach((entry, i) => {
      console.log((i + 1) + ': ' + entry);
    });
    
    console.log('\nFound ' + newsLinks.length + ' news links:');
    newsLinks.forEach((link, i) => {
      console.log((i + 1) + ': ' + link.title);
      console.log('   URL: ' + link.url);
      console.log('   Slug: ' + link.slug);
    });
    
    console.log('\nFound ' + images.length + ' images:');
    images.forEach((img, i) => {
      console.log((i + 1) + ': ' + img);
    });
    
    // Save to file
    const output = {
      entries: newsEntries,
      links: newsLinks,
      images: images
    };
    
    fs.writeFileSync('news-entries.json', JSON.stringify(output, null, 2));
    console.log('\nSaved to news-entries.json');
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
