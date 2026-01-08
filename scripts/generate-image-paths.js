const fs = require('fs');
const path = require('path');

const events = [
  'hprc-international-arena-polo-championship',
  'hprc-sport-complex',
  'nec-calendar-2016'
];

events.forEach(eventSlug => {
  const dir = path.join(__dirname, '..', 'public', 'documents', 'gallery', 'events', eventSlug);
  
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir)
      .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
      .sort();
    
    console.log(`\n${eventSlug}:`);
    console.log(`  Total files: ${files.length}`);
    console.log(`  Files: ${files.slice(0, 10).join(', ')}${files.length > 10 ? '...' : ''}`);
    
    // Generate paths
    const paths = files.map(f => `/documents/gallery/events/${eventSlug}/${f}`);
    console.log(`  First path: ${paths[0]}`);
  }
});
