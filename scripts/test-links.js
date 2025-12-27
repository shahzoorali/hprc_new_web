const fs = require('fs');
const path = require('path');

// #region agent log
fetch('http://127.0.0.1:7243/ingest/fa022af2-8793-4271-a8ac-63bfa5f7dcaf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-links.js:8',message:'Link test script started',data:{timestamp:new Date().toISOString()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

const results = {
  brokenLinks: [],
  dummyLinks: [],
  missingPages: [],
  invalidLinks: [],
  allLinks: []
};

// #region agent log
fetch('http://127.0.0.1:7243/ingest/fa022af2-8793-4271-a8ac-63bfa5f7dcaf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-links.js:18',message:'Initialized results object',data:{brokenCount:0,dummyCount:0,missingCount:0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

// Check if page exists
function pageExists(href) {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/fa022af2-8793-4271-a8ac-63bfa5f7dcaf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-links.js:23',message:'Checking if page exists',data:{href},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return { exists: true, reason: 'external' };
  }
  
  if (href === '/' || href === '#') {
    return { exists: true, reason: 'root_or_hash' };
  }
  
  // Remove leading slash and query/hash fragments
  let filePath = href.replace(/^\//, '').split('?')[0].split('#')[0];
  
  if (filePath === '') {
    const rootPage = path.join('src/app/(site)', 'page.tsx');
    const exists = fs.existsSync(rootPage);
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/fa022af2-8793-4271-a8ac-63bfa5f7dcaf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-links.js:35',message:'Root page check',data:{href,exists},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    return { exists, reason: exists ? 'root_page' : 'missing' };
  }
  
  // Check for dynamic routes (programmes/[programmeId], sports-centre/[facilityId])
  const parts = filePath.split('/');
  if (parts.length >= 2) {
    const parentDir = parts[0];
    const childDir = parts[1];
    
    // Check if it's a dynamic route folder
    const dynamicFolders = ['[programmeId]', '[facilityId]'];
    for (const dynamicFolder of dynamicFolders) {
      const dynamicPath = path.join('src/app/(site)', parentDir, dynamicFolder, 'page.tsx');
      if (fs.existsSync(dynamicPath)) {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/fa022af2-8793-4271-a8ac-63bfa5f7dcaf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-links.js:48',message:'Dynamic route found',data:{href,parentDir,dynamicFolder},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        return { exists: true, reason: 'dynamic_route' };
      }
    }
  }
  
  // Static route - check for page.tsx
  const fullPath = path.join('src/app/(site)', filePath, 'page.tsx');
  const exists = fs.existsSync(fullPath);
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/fa022af2-8793-4271-a8ac-63bfa5f7dcaf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-links.js:58',message:'Static route check result',data:{href,fullPath,exists},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  return { exists, reason: exists ? 'static_route' : 'missing' };
}

// Check for dummy/placeholder links
function isDummyLink(href) {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/fa022af2-8793-4271-a8ac-63bfa5f7dcaf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-links.js:51',message:'Checking if dummy link',data:{href},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  
  const dummyPatterns = [
    /^#+$/,  // Just #
    /^javascript:void\(0\)$/i,
    /^#!$/,
    /^#none$/i,
    /^#placeholder$/i,
    /^http:\/\/example\.com/i,
    /^https:\/\/example\.com/i,
    /^http:\/\/localhost/i,
    /^https:\/\/placeholder/i,
    /^\/placeholder/i,
    /^\/#$/,
    /^undefined$/i,
    /^null$/i
  ];
  
  const isDummy = dummyPatterns.some(pattern => pattern.test(href));
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/fa022af2-8793-4271-a8ac-63bfa5f7dcaf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-links.js:66',message:'Dummy link check result',data:{href,isDummy},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  return isDummy;
}

// Extract links from navigation.ts
function extractNavigationLinks() {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/fa022af2-8793-4271-a8ac-63bfa5f7dcaf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-links.js:72',message:'Extracting navigation links',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  const navFile = path.join('src/content/navigation.ts');
  const content = fs.readFileSync(navFile, 'utf8');
  const links = [];
  
  // Extract href values from navigation structure
  const hrefRegex = /href:\s*["']([^"']+)["']/g;
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    links.push(match[1]);
  }
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/fa022af2-8793-4271-a8ac-63bfa5f7dcaf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-links.js:85',message:'Navigation links extracted',data:{count:links.length,links:links.slice(0,10)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  return links;
}

// Extract links from all content files
function extractContentLinks() {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/fa022af2-8793-4271-a8ac-63bfa5f7dcaf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-links.js:91',message:'Extracting content links',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  const contentDir = path.join('src/content');
  const files = [];
  
  function walkDir(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach(entry => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
        files.push(fullPath);
      }
    });
  }
  
  walkDir(contentDir);
  
  const links = [];
  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const hrefRegex = /href:\s*["']([^"']+)["']/g;
      let match;
      while ((match = hrefRegex.exec(content)) !== null) {
        links.push(match[1]);
      }
    } catch (e) {
      // Skip files that can't be read
    }
  });
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/fa022af2-8793-4271-a8ac-63bfa5f7dcaf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-links.js:125',message:'Content links extracted',data:{count:links.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  return links;
}

// Extract links from component files
function extractComponentLinks() {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/fa022af2-8793-4271-a8ac-63bfa5f7dcaf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-links.js:113',message:'Extracting component links',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  const componentDir = path.join('src/components');
  const files = [];
  
  function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach(entry => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
        files.push(fullPath);
      }
    });
  }
  
  walkDir(componentDir);
  
  const links = [];
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const hrefRegex = /href\s*=\s*["']([^"']+)["']/g;
    let match;
    while ((match = hrefRegex.exec(content)) !== null) {
      links.push(match[1]);
    }
  });
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/fa022af2-8793-4271-a8ac-63bfa5f7dcaf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-links.js:137',message:'Component links extracted',data:{count:links.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  return links;
}

// Main test function
function runTests() {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/fa022af2-8793-4271-a8ac-63bfa5f7dcaf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-links.js:143',message:'Starting link tests',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  const allLinks = [
    ...extractNavigationLinks(),
    ...extractContentLinks(),
    ...extractComponentLinks()
  ];
  
  // Remove duplicates
  const uniqueLinks = [...new Set(allLinks)];
  results.allLinks = uniqueLinks;
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/fa022af2-8793-4271-a8ac-63bfa5f7dcaf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-links.js:155',message:'Unique links collected',data:{total:allLinks.length,unique:uniqueLinks.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  uniqueLinks.forEach(href => {
    // Check for dummy links
    if (isDummyLink(href)) {
      results.dummyLinks.push(href);
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/fa022af2-8793-4271-a8ac-63bfa5f7dcaf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-links.js:162',message:'Dummy link found',data:{href},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      return;
    }
    
    // Check if page exists (only for internal links)
    if (href.startsWith('/') && !href.startsWith('//')) {
      // Skip PDF files - they should be in public folder, not pages
      if (href.endsWith('.pdf')) {
        const publicPath = path.join('public', href);
        const exists = fs.existsSync(publicPath);
        if (!exists) {
          results.missingPages.push(href);
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/fa022af2-8793-4271-a8ac-63bfa5f7dcaf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-links.js:165',message:'Missing PDF file found',data:{href,publicPath},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
          // #endregion
        }
      } else {
        const pageCheck = pageExists(href);
        if (!pageCheck.exists && pageCheck.reason === 'missing') {
          results.missingPages.push(href);
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/fa022af2-8793-4271-a8ac-63bfa5f7dcaf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-links.js:173',message:'Missing page found',data:{href},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
          // #endregion
        } else if (pageCheck.exists) {
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/fa022af2-8793-4271-a8ac-63bfa5f7dcaf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-links.js:178',message:'Page exists confirmed',data:{href,reason:pageCheck.reason},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
          // #endregion
        }
      }
    }
    
    // Check for invalid link formats
    if (href && !href.match(/^(https?:\/\/|mailto:|tel:|\/|#)/)) {
      results.invalidLinks.push(href);
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/fa022af2-8793-4271-a8ac-63bfa5f7dcaf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-links.js:178',message:'Invalid link format found',data:{href},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
    }
  });
  
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/fa022af2-8793-4271-a8ac-63bfa5f7dcaf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'test-links.js:185',message:'Tests completed',data:{dummyCount:results.dummyLinks.length,missingCount:results.missingPages.length,invalidCount:results.invalidLinks.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  return results;
}

// Run tests and output results
const testResults = runTests();

console.log('\n=== LINK TEST RESULTS ===\n');
console.log(`Total unique links found: ${testResults.allLinks.length}\n`);

if (testResults.dummyLinks.length > 0) {
  console.log(`❌ DUMMY/PLACEHOLDER LINKS (${testResults.dummyLinks.length}):`);
  testResults.dummyLinks.forEach(link => console.log(`  - ${link}`));
  console.log('');
}

if (testResults.missingPages.length > 0) {
  console.log(`❌ MISSING PAGES (${testResults.missingPages.length}):`);
  testResults.missingPages.forEach(link => console.log(`  - ${link}`));
  console.log('');
}

if (testResults.invalidLinks.length > 0) {
  console.log(`❌ INVALID LINK FORMATS (${testResults.invalidLinks.length}):`);
  testResults.invalidLinks.forEach(link => console.log(`  - ${link}`));
  console.log('');
}

if (testResults.dummyLinks.length === 0 && testResults.missingPages.length === 0 && testResults.invalidLinks.length === 0) {
  console.log('✅ No broken or dummy links found!');
}

// Write results to file
fs.writeFileSync('link-test-results.json', JSON.stringify(testResults, null, 2));
console.log('\nResults saved to link-test-results.json');

