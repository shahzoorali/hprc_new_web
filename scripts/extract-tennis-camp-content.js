const https = require('https');
const fs = require('fs');

https.get('https://hprc.in/News-tennis-camp-by-sports-village-hprc.html', (res) => {
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
          (src.includes('tennis') || src.includes('Sports') || src.includes('gallery') || 
          src.match(/\.(jpg|jpeg|png|gif)$/i))) {
        if (!images.includes(src)) {
          images.push(src);
        }
      }
    }
    
    // Extract main content - look for sections with content
    const contentMatch = data.match(/<section[^>]*>([\s\S]*?)<\/section>/gi);
    
    // Try to extract text content
    const textContent = data.replace(/<script[\s\S]*?<\/script>/gi, '')
                           .replace(/<style[\s\S]*?<\/style>/gi, '')
                           .replace(/<[^>]+>/g, ' ')
                           .replace(/\s+/g, ' ')
                           .trim();
    
    const output = {
      images: images,
      content: textContent.substring(0, 2000) // First 2000 chars
    };
    
    fs.writeFileSync('tennis-camp-content.json', JSON.stringify(output, null, 2));
    console.log('Found ' + images.length + ' images:');
    images.forEach((img, i) => {
      console.log((i + 1) + ': ' + img);
    });
    console.log('\nSaved to tennis-camp-content.json');
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
