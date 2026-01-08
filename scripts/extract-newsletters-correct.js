const https = require('https');
const fs = require('fs');

https.get('https://hprc.in/newsletters.html', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const newsletters = [];
    
    // Extract newsletter titles from the page
    // Looking for the pattern: <h6>NEWSLETTER TITLE</h6>
    const h6Pattern = /<h6[^>]*>([^<]+)<\/h6>/gi;
    let match;
    
    while ((match = h6Pattern.exec(data)) !== null) {
      const title = match[1].trim();
      // Filter out navigation and other non-newsletter headings
      if (title && 
          !title.includes('HYDERABAD POLO') && 
          !title.includes('Member Login') &&
          !title.includes('Pay Now') &&
          !title.includes('Media') &&
          !title.includes('Newsletters') &&
          (title.includes('NEWSLETTER') || 
           title.includes('EQUESTRIAN') || 
           title.includes('HYDERABAD HORSE SHOW') ||
           title.includes('NATIONAL EQUESTRIAN'))) {
        newsletters.push({
          title: title,
          rawTitle: title
        });
      }
    }
    
    // Also look for links to PDFs or newsletter pages
    const linkPattern = /<a[^>]*href=['"]([^'"]*(?:Newsletter|newsletter|Equestrian|Horse|Championship)[^'"]*\.(?:html|pdf))['"][^>]*>([^<]*)<\/a>/gi;
    let linkMatch;
    
    while ((linkMatch = linkPattern.exec(data)) !== null) {
      const href = linkMatch[1];
      const linkText = linkMatch[2].trim();
      
      if (linkText && (linkText.includes('NEWSLETTER') || linkText.includes('EQUESTRIAN') || linkText.includes('HORSE SHOW'))) {
        // Check if we already have this newsletter
        const existing = newsletters.find(n => n.title === linkText || n.rawTitle === linkText);
        if (!existing) {
          newsletters.push({
            title: linkText,
            rawTitle: linkText,
            url: href.startsWith('http') ? href : `https://hprc.in${href.startsWith('/') ? '' : '/'}${href}`
          });
        } else if (href && !existing.url) {
          existing.url = href.startsWith('http') ? href : `https://hprc.in${href.startsWith('/') ? '' : '/'}${href}`;
        }
      }
    }
    
    // Look for PDF links in the page
    const pdfPattern = /<a[^>]*href=['"]([^'"]*\.pdf)['"][^>]*>/gi;
    const pdfs = [];
    let pdfMatch;
    
    while ((pdfMatch = pdfPattern.exec(data)) !== null) {
      const pdfUrl = pdfMatch[1];
      const fullUrl = pdfUrl.startsWith('http') ? pdfUrl : `https://hprc.in${pdfUrl.startsWith('/') ? '' : '/'}${pdfUrl}`;
      if (!pdfs.includes(fullUrl)) {
        pdfs.push(fullUrl);
      }
    }
    
    // Remove duplicates
    const uniqueNewsletters = newsletters.filter((item, index, self) => {
      return index === self.findIndex(n => n.title === item.title);
    });
    
    const output = {
      newsletters: uniqueNewsletters,
      pdfs: pdfs,
      count: uniqueNewsletters.length
    };
    
    fs.writeFileSync('newsletters-correct.json', JSON.stringify(output, null, 2));
    
    console.log(`Found ${uniqueNewsletters.length} newsletters:`);
    uniqueNewsletters.forEach((n, i) => {
      console.log(`${i + 1}. ${n.title}`);
      if (n.url) console.log(`   URL: ${n.url}`);
    });
    
    console.log(`\nFound ${pdfs.length} PDF links:`);
    pdfs.forEach((pdf, i) => {
      console.log(`${i + 1}. ${pdf}`);
    });
    
    console.log('\nSaved to newsletters-correct.json');
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
