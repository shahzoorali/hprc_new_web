const https = require('https');
const fs = require('fs');

https.get('https://hprc.in/newsletters.html', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const newsletters = [];
    
    // Look for all H6 tags with year and month pattern
    const h6Regex = /<h[1-6][^>]*\s*(\d{1,2}\s+[a-z]+\s*)[^>]*<\/h[1-6]>/gi;
    const h6Matches = data.match(h6Regex);
    
    if (h6Matches) {
      h6Matches.forEach((h6Text, index) => {
        const section = h6Text.replace(/<\/?h[1-6]>/gi, '');
        
        // Extract all content from this section
        const contentParts = [];
        
        // Split by paragraphs
        const paragraphs = section.split(/<p[^>]*>/gi);
        paragraphs.forEach((p, pIndex) => {
          const text = p.replace(/<[^>]+>/g, '').trim();
          if (text.length > 10) { // Filter out short labels like "HPRC"
            contentParts.push(text);
          }
        });
        
        // Extract date - look for date patterns like "May 2015" or "May 2015 Edition"
        let date = '';
        const dateMatch = section.match(/(\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)[a-z]+\s+)(?:st|nd|rd|th)(?:\s+\d{1,2})/i);
        if (dateMatch) {
          date = dateMatch[1];
        }
        
        // Extract title - first significant text
        const text = contentParts[0] || '';
        const titleMatch = text.match(/(E|e)dition/i);
        const title = titleMatch ? titleMatch[0] : 'Newsletter';
        
        // Look for PDF links in this section
        let pdfUrl = '';
        const pdfLinks = section.match(/href=['"]([^'"]+\.pdf)['"]/gi);
        if (pdfLinks && pdfLinks.length > 0) {
          pdfUrl = pdfLinks[0][1];
        }
        
        // Extract deep link - look for additional anchor tags
        let deepLink = '';
        const linkMatch = section.match(/<a[^>]*href=['"]([^'"]+)['"][^>]*>([^<]*)<\/a>/i);
        if (linkMatch && linkMatch[1]) {
          const href = linkMatch[1];
          if (href.includes('.html') || href.includes('News-')) {
            deepLink = href;
          }
        }
        
        newsletters.push({
          index: newsletters.length + index + 1,
          title: title,
          date: date,
          content: contentParts.join('\n'),
          pdfUrl: pdfUrl,
          deepLink: deepLink
        });
      });
    }
    
    // Remove duplicates and sort by date (most recent first)
    const uniqueNewsletters = newsletters.filter((item, index, self) => {
      return index === newsletters.findIndex(n => n.title === item.title && n.date === item.date);
    });
    
    const sortedNewsletters = uniqueNewsletters.reverse();
    
    const output = {
      newsletters: sortedNewsletters,
      count: sortedNewsletters.length
    };
    
    fs.writeFileSync('newsletters-content.json', JSON.stringify(output, null, 2));
    
    console.log(`Extracted ${sortedNewsletters.length} newsletters`);
    sortedNewsletters.slice(0, 5).forEach((n, i) => {
      console.log(`${i + 1}. ${n.title}`);
      console.log(`   Date: ${n.date}`);
      console.log(`   PDF: ${n.pdfUrl ? 'Yes - ' + n.pdfUrl : 'No'}`);
      console.log(`   Deep Link: ${n.deepLink ? 'Yes - ' + n.deepLink : 'No'}`);
      console.log(`   Content Length: ${n.content.length} chars`);
      if (i < 4) {
        console.log(`   Content Preview: ${n.content.substring(0, 100)}...`);
      }
    });
    console.log(`\nSaved to newsletters-content.json`);
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
  fs.writeFileSync('newsletters-content.json', JSON.stringify({ newsletters: [], error: err.message }));
});
