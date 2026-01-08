const https = require('https');
const fs = require('fs');

https.get('https://hprc.in/events.html', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    // Find the section with blog-post-style3
    const sectionMatch = data.match(/<section[^>]*blog-post-style3[^>]*>([\s\S]*?)<\/section>/i);
    
    if (sectionMatch) {
      const sectionContent = sectionMatch[1];
      
      // Extract all links from this section
      const linkRegex = /<a[^>]*href=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/a>/gi;
      const events = [];
      let match;
      
      while ((match = linkRegex.exec(sectionContent)) !== null) {
        let href = match[1];
        const linkText = match[2].replace(/<[^>]*>/g, '').trim();
        
        // Convert relative URLs to absolute
        if (href.startsWith('/')) {
          href = 'https://hprc.in' + href;
        } else if (!href.startsWith('http')) {
          href = 'https://hprc.in/' + href;
        }
        
        // Filter for event pages (exclude navigation, etc.)
        if (linkText && (linkText.includes('REGIONAL') || linkText.includes('EQUESTRIAN') || 
            linkText.includes('ARENA POLO') || linkText.includes('CHAMPIONSHIP') ||
            linkText.includes('TOURNAMENT') || linkText.includes('SPORT'))) {
          events.push({
            title: linkText,
            url: href,
            slug: href.replace('https://hprc.in/', '').replace('.html', '')
          });
        }
      }
      
      console.log('Found ' + events.length + ' events:');
      events.forEach((event, i) => {
        console.log((i + 1) + ': ' + event.title);
        console.log('   URL: ' + event.url);
        console.log('   Slug: ' + event.slug);
        console.log('');
      });
      
      // Save to file
      fs.writeFileSync('all-event-links.json', JSON.stringify(events, null, 2));
      console.log('Saved to all-event-links.json');
    } else {
      console.log('Section not found. Searching for event links...');
      
      // Alternative: search for common event page patterns
      const eventLinkRegex = /<a[^>]*href=['"]([^'"]*Event[^'"]*\.html|[^'"]*event[^'"]*\.html|[^'"]*arena-polo[^'"]*\.html|[^'"]*equestrian[^'"]*\.html)['"][^>]*>([\s\S]*?)<\/a>/gi;
      const allEvents = [];
      let match;
      
      while ((match = eventLinkRegex.exec(data)) !== null) {
        let href = match[1];
        const linkText = match[2].replace(/<[^>]*>/g, '').trim();
        
        if (href.startsWith('/')) {
          href = 'https://hprc.in' + href;
        } else if (!href.startsWith('http')) {
          href = 'https://hprc.in/' + href;
        }
        
        if (linkText && !allEvents.find(e => e.url === href)) {
          allEvents.push({
            title: linkText,
            url: href,
            slug: href.replace('https://hprc.in/', '').replace('.html', '')
          });
        }
      }
      
      console.log('Found ' + allEvents.length + ' event links:');
      allEvents.forEach((event, i) => {
        console.log((i + 1) + ': ' + event.title);
        console.log('   URL: ' + event.url);
        console.log('');
      });
      
      fs.writeFileSync('all-event-links.json', JSON.stringify(allEvents, null, 2));
    }
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
