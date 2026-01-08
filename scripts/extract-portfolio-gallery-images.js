const https = require('https');
const fs = require('fs');

https.get('https://hprc.in/1st-rel-10th-hyd-horse-show.html', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    // Find the first fadeIn section (index 0)
    const fadeInSections = data.match(/<section[^>]*wow[^>]*fadeIn[^>]*>([\s\S]*?)<\/section>/gi);
    
    if (fadeInSections && fadeInSections.length > 0) {
      const firstSection = fadeInSections[0];
      
      // Extract all images from this section
      const imgRegex = /<img[^>]*src=['"]([^'"]+)['"][^>]*>/gi;
      const images = [];
      let match;
      
      while ((match = imgRegex.exec(firstSection)) !== null) {
        let src = match[1];
        // Convert relative URLs to absolute
        if (src.startsWith('/')) {
          src = 'https://hprc.in' + src;
        } else if (!src.startsWith('http')) {
          src = 'https://hprc.in/' + src;
        }
        // Filter out logos, icons, etc.
        if (!src.includes('logo') && !src.includes('icon') && !src.includes('favicon') && !src.includes('banner')) {
          if (!images.includes(src)) {
            images.push(src);
          }
        }
      }
      
      // Also search for images in portfolio grid specifically
      const portfolioMatch = firstSection.match(/<ul[^>]*portfolio-grid[^>]*>([\s\S]*?)<\/ul>/i);
      if (portfolioMatch) {
        const portfolioContent = portfolioMatch[1];
        const portfolioImgRegex = /<img[^>]*src=['"]([^'"]+)['"][^>]*>/gi;
        while ((match = portfolioImgRegex.exec(portfolioContent)) !== null) {
          let src = match[1];
          if (src.startsWith('/')) {
            src = 'https://hprc.in' + src;
          } else if (!src.startsWith('http')) {
            src = 'https://hprc.in/' + src;
          }
          if (!images.includes(src)) {
            images.push(src);
          }
        }
      }
      
      // Search for REL-10th-Show images pattern
      const relShowRegex = /images\/gallery\/REL-10th-Show-\d+\.(png|jpg|jpeg)/gi;
      let relMatch;
      while ((relMatch = relShowRegex.exec(data)) !== null) {
        const imgPath = 'https://hprc.in/' + relMatch[0];
        if (!images.includes(imgPath)) {
          images.push(imgPath);
        }
      }
      
      console.log('Found ' + images.length + ' images in first fadeIn section:');
      images.forEach((img, i) => {
        console.log((i + 1) + ': ' + img);
      });
      
      // Save to file
      fs.writeFileSync('portfolio-gallery-images.json', JSON.stringify(images, null, 2));
      console.log('\nSaved to portfolio-gallery-images.json');
    } else {
      console.log('No fadeIn sections found');
    }
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
