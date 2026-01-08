const https = require('https');
const fs = require('fs');

https.get('https://hprc.in/newsletters.html', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    // Extract newsletter titles with edition numbers and years
    const newsletters = [];
    
    // Look for all H6 headings with newsletter text
    const h6Pattern = /<h6[^>]*Newsletter\s*\s*(\d{4}\s*)<\/h6>/gi;
    const h6Matches = data.match(h6Pattern);
    
    if (h6Matches) {
      h6Matches.forEach((h6Text) => {
        // Extract title (first heading after "Newsletter")
        const lines = h6Text.split('\n').map(l => l.trim()).filter(l => l.length > 5);
        
        if (lines.length >= 2) {
          let title = lines[1];
          let date = '';
          let edition = '';
          
          // Extract date from title
          const dateMatch = title.match(/(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}\s+(?:st|nd|rd|th)/i);
          if (dateMatch) {
            date = dateMatch[0];
          }
          
          // Extract edition
          const editionMatch = title.match(/(\d{4}\s+Edition)/i);
          if (editionMatch) {
            edition = editionMatch[0];
          }
          
          newsletters.push({
            title: title,
            date: date,
            edition: edition
            url: 'https://hprc.in/newsletters.html'
          });
        }
      });
    }
    
    // Deduplicate and sort by date (reverse chronological - most recent first)
    const uniqueNewsletters = newsletters.filter((item, index, self) => {
      return index === newsletters.findIndex(n => 
        n.title === item.title && 
        n.date === item.date && 
        n.edition === item.edition
      );
    }).reverse();
    
    const output = {
      newsletters: uniqueNewsletters,
      count: uniqueNewsletters.length
    };
    
    fs.writeFileSync('newsletters-content.json', JSON.stringify(output, null, 2));
    
    console.log(`Extracted ${uniqueNewsletters.length} newsletters`);
    uniqueNewsletters.slice(0, 5).forEach((n, i) => {
      console.log(`${i + 1}. ${n.title}`);
      console.log(`   Date: ${n.date}`);
      console.log(`   Edition: ${n.edition}`);
    });
    console.log('\nSaved to newsletters-content.json');
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
  fs.writeFileSync('newsletters-content.json', JSON.stringify({ newsletters: [], error: err.message }));
});
