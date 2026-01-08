const https = require('https');
const fs = require('fs');

https.get('https://hprc.in/all-about-olympic-equestrian-sports.html', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
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
      if (!src.includes('logo') && !src.includes('icon') && !src.includes('favicon') && 
          !src.includes('banner') && !src.includes('telephone') && 
          (src.includes('olympic') || src.includes('equestrian') || src.includes('News') || 
          src.includes('Jump') || src.includes('Cross-Country') || src.includes('gallery') || 
          src.match(/\.(jpg|jpeg|png|gif)$/i))) {
        if (!images.includes(src)) {
          images.push(src);
        }
      }
    }
    
    // Extract the main content section
    const contentMatch = data.match(/<section[^>]*wow fadeIn bg-light-gray[^>]*>([\s\S]*?)<\/section>/i);
    
    let articleContent = '';
    if (contentMatch) {
      const sectionContent = contentMatch[1];
      // Extract text from paragraphs
      const pMatches = sectionContent.match(/<p[^>]*>([\s\S]*?)<\/p>/gi);
      if (pMatches) {
        articleContent = pMatches.map(p => {
          return p.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        }).join('\n\n');
      }
    }
    
    // Also extract headings
    const hMatches = data.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi);
    const headings = [];
    if (hMatches) {
      hMatches.forEach(h => {
        const text = h.replace(/<[^>]+>/g, '').trim();
        if (text && text.length > 5 && !text.includes('HYDERABAD')) {
          headings.push(text);
        }
      });
    }
    
    const output = {
      images: images,
      headings: headings,
      content: articleContent.substring(0, 10000)
    };
    
    fs.writeFileSync('full-olympic-content.json', JSON.stringify(output, null, 2));
    
    console.log('Found ' + images.length + ' images:');
    images.forEach((img, i) => {
      console.log((i + 1) + ': ' + img);
    });
    
    console.log('\nFound ' + headings.length + ' headings:');
    headings.forEach((h, i) => {
      console.log((i + 1) + ': ' + h);
    });
    
    console.log('\nContent length: ' + articleContent.length + ' characters');
    console.log('\nSaved to full-olympic-content.json');
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
