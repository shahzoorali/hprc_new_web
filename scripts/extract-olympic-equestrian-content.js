const https = require('https');
const fs = require('fs');

https.get('https://hprc.in/all-about-olympic-equestrian-sports.html', (res) => {
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
          (src.includes('olympic') || src.includes('equestrian') || src.includes('gallery') || 
          src.match(/\.(jpg|jpeg|png|gif)$/i))) {
        if (!images.includes(src)) {
          images.push(src);
        }
      }
    }
    
    // Extract main content - look for the article content section
    // The content appears to be in a section with the article text
    const contentSection = data.match(/<section[^>]*>([\s\S]*?)<\/section>/gi);
    
    // Extract text content by removing HTML tags
    let textContent = data;
    // Remove script and style tags
    textContent = textContent.replace(/<script[\s\S]*?<\/script>/gi, '');
    textContent = textContent.replace(/<style[\s\S]*?<\/style>/gi, '');
    
    // Try to extract the main article content
    const articleMatch = textContent.match(/All about Olympic Equestrian Sports([\s\S]*?)(?:Explore|Quick links|Address|©)/i);
    
    const output = {
      images: images,
      rawContent: articleMatch ? articleMatch[1].substring(0, 5000) : textContent.substring(0, 3000)
    };
    
    fs.writeFileSync('olympic-equestrian-content.json', JSON.stringify(output, null, 2));
    
    console.log('Found ' + images.length + ' images:');
    images.forEach((img, i) => {
      console.log((i + 1) + ': ' + img);
    });
    
    console.log('\nContent preview:');
    console.log(output.rawContent.substring(0, 500));
    console.log('\nSaved to olympic-equestrian-content.json');
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
