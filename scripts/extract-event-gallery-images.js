const https = require('https');
const fs = require('fs');

https.get('https://hprc.in/1st-rel-10th-hyd-horse-show.html', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    // Find the section with wow fadeIn and container-fluid padding-30px-top
    const sectionMatch = data.match(/<section[^>]*wow[^>]*fadeIn[^>]*>[\s\S]*?<div[^>]*container-fluid[^>]*padding-30px-top[^>]*>([\s\S]*?)<\/div>[\s\S]*?<\/section>/i);
    
    if (sectionMatch) {
      const sectionContent = sectionMatch[1];
      // Extract all img tags from this section
      const imgRegex = /<img[^>]*src=['"]([^'"]+)['"][^>]*>/gi;
      const images = [];
      let match;
      
      while ((match = imgRegex.exec(sectionContent)) !== null) {
        let src = match[1];
        // Convert relative URLs to absolute
        if (src.startsWith('/')) {
          src = 'https://hprc.in' + src;
        } else if (!src.startsWith('http')) {
          src = 'https://hprc.in/' + src;
        }
        images.push(src);
      }
      
      console.log('Found ' + images.length + ' images in section:');
      images.forEach((img, i) => {
        console.log((i + 1) + ': ' + img);
      });
      
      // Also check for 1stRel gallery images
      const firstRelRegex = /images\/gallery\/1stRel\/\d+\.jpg/gi;
      const firstRelMatches = [];
      let frMatch;
      while ((frMatch = firstRelRegex.exec(data)) !== null) {
        const imgPath = 'https://hprc.in/' + frMatch[0];
        if (!images.includes(imgPath)) {
          images.push(imgPath);
        }
      }
      
      // Remove duplicates and sort
      const uniqueImages = [...new Set(images)].sort();
      
      console.log('\nTotal unique images found: ' + uniqueImages.length);
      uniqueImages.forEach((img, i) => {
        console.log((i + 1) + ': ' + img);
      });
      
      // Save to file
      fs.writeFileSync('event-gallery-images.json', JSON.stringify(uniqueImages, null, 2));
      console.log('\nSaved to event-gallery-images.json');
    } else {
      console.log('Section not found. Trying alternative approach...');
      // Try to find all images in the page
      const allImgRegex = /<img[^>]*src=['"]([^'"]+)['"][^>]*>/gi;
      const allImages = [];
      let match;
      
      while ((match = allImgRegex.exec(data)) !== null) {
        let src = match[1];
        if (src.startsWith('/')) {
          src = 'https://hprc.in' + src;
        } else if (!src.startsWith('http')) {
          src = 'https://hprc.in/' + src;
        }
        // Filter for gallery/event images
        if (src.includes('gallery') || src.includes('event') || src.includes('1st-rel')) {
          allImages.push(src);
        }
      }
      
      console.log('Found ' + allImages.length + ' gallery images:');
      allImages.forEach((img, i) => {
        console.log((i + 1) + ': ' + img);
      });
      
      fs.writeFileSync('event-gallery-images.json', JSON.stringify(allImages, null, 2));
    }
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
