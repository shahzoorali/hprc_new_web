const https = require('https');
const fs = require('fs');

https.get('https://hprc.in/1st-rel-10th-hyd-horse-show.html', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    // Find the section with the download links
    const sectionMatch = data.match(/<div[^>]*col-md-6[^>]*col-sm-12[^>]*col-xs-12[^>]*display-table[^>]*>([\s\S]*?)<\/div>/i);
    
    if (sectionMatch) {
      const sectionContent = sectionMatch[1];
      
      // Extract all PDF links (href attributes)
      const linkRegex = /<a[^>]*href=['"]([^'"]+\.pdf[^'"]*)['"][^>]*>/gi;
      const pdfLinks = [];
      let match;
      
      while ((match = linkRegex.exec(sectionContent)) !== null) {
        let href = match[1];
        // Convert relative URLs to absolute
        if (href.startsWith('/')) {
          href = 'https://hprc.in' + href;
        } else if (!href.startsWith('http')) {
          href = 'https://hprc.in/' + href;
        }
        pdfLinks.push(href);
      }
      
      // Also search for PDF links in the entire page
      const allPdfRegex = /<a[^>]*href=['"]([^'"]*\.pdf[^'"]*)['"][^>]*>/gi;
      const allPdfLinks = [];
      while ((match = allPdfRegex.exec(data)) !== null) {
        let href = match[1];
        if (href.startsWith('/')) {
          href = 'https://hprc.in' + href;
        } else if (!href.startsWith('http')) {
          href = 'https://hprc.in/' + href;
        }
        // Filter for prospectus and dressage test PDFs
        if (href.includes('prospectus') || href.includes('Prospectus') || 
            href.includes('dressage') || href.includes('Dressage') ||
            href.includes('Children') || href.includes('Junior')) {
          if (!allPdfLinks.includes(href)) {
            allPdfLinks.push(href);
          }
        }
      }
      
      console.log('Found PDF links in section:', pdfLinks.length);
      pdfLinks.forEach((link, i) => {
        console.log((i + 1) + ': ' + link);
      });
      
      console.log('\nFound all relevant PDF links:', allPdfLinks.length);
      allPdfLinks.forEach((link, i) => {
        console.log((i + 1) + ': ' + link);
      });
      
      // Save to file
      const allLinks = [...new Set([...pdfLinks, ...allPdfLinks])];
      fs.writeFileSync('pdf-links.json', JSON.stringify(allLinks, null, 2));
      console.log('\nSaved to pdf-links.json');
    } else {
      console.log('Section not found. Searching entire page for PDF links...');
      
      // Search entire page for PDF links
      const pdfRegex = /<a[^>]*href=['"]([^'"]*\.pdf[^'"]*)['"][^>]*>[\s\S]*?<\/a>/gi;
      const pdfs = [];
      let match;
      
      while ((match = pdfRegex.exec(data)) !== null) {
        let href = match[1];
        const linkText = match[0].match(/>(.*?)<\/a>/i);
        const text = linkText ? linkText[1].trim() : '';
        
        if (href.startsWith('/')) {
          href = 'https://hprc.in' + href;
        } else if (!href.startsWith('http')) {
          href = 'https://hprc.in/' + href;
        }
        
        // Filter for relevant PDFs
        if (text.includes('Prospectus') || text.includes('Dressage') || 
            text.includes('Children') || text.includes('Junior') ||
            href.includes('prospectus') || href.includes('dressage')) {
          pdfs.push({ url: href, text: text });
        }
      }
      
      console.log('Found PDFs:', pdfs.length);
      pdfs.forEach((pdf, i) => {
        console.log((i + 1) + ': ' + pdf.text + ' -> ' + pdf.url);
      });
      
      fs.writeFileSync('pdf-links.json', JSON.stringify(pdfs, null, 2));
    }
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
