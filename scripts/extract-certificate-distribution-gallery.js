const https = require('https');
const fs = require('fs');

https.get('https://hprc.in/academia-Sports-Village-Certificate-Distribution-Ceremony.html', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    // Look for gallery images in portfolio grid
    const galleryImages = [];
    
    // Pattern 1: Look for images in gallery/News-* or gallery/academia-* folders
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
          (src.includes('academia') || src.includes('Certificate') || 
          src.includes('gallery') || src.match(/\.(jpg|jpeg|png|gif)$/i))) {
        if (!galleryImages.includes(src)) {
          galleryImages.push(src);
        }
      }
    }
    
    // Also look for numbered images in a pattern
    const numberedPattern = /academia-Sports-Village-Certificate-Distribution-Ceremony(\d+)\.(jpg|jpeg|png)/gi;
    let numMatch;
    const foundNumbers = new Set();
    
    while ((numMatch = numberedPattern.exec(data)) !== null) {
      foundNumbers.add(parseInt(numMatch[1]));
    }
    
    console.log('Found images:');
    galleryImages.forEach((img, i) => {
      console.log(`${i + 1}. ${img}`);
    });
    
    console.log('\nFound numbered images:', Array.from(foundNumbers).sort());
    
    // Save results
    fs.writeFileSync('certificate-distribution-images.json', JSON.stringify({
      allImages: galleryImages,
      numberedImages: Array.from(foundNumbers).sort()
    }, null, 2));
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
