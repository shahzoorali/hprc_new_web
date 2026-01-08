# Project Cleanup Plan

## Files to Remove

### Temporary Scripts (One-time extraction/download scripts)
These were used for one-time data migration and can be removed:
- `scripts/extract-*.js` (all extraction scripts)
- `scripts/download-*.js` (all download scripts)
- `scripts/process-all-*.js` (all processing scripts)
- `scripts/find-all-news-urls.js`
- `scripts/generate-image-paths.js`
- `scripts/test-links.js`
- `scripts/create-event-page.js`
- `download-images.js` (root - duplicate/old)

### Temporary JSON Data Files (Extraction results)
These are one-time extraction results and can be removed:
- `all-*.json` (all extraction result files)
- `event-data-*.json` (event extraction results)
- `certificate-*.json`
- `nec-articles-content.json`
- `full-olympic-content.json`
- `olympic-equestrian-content.json`
- `tennis-camp-content.json`
- `processed-news-entries.json`
- `news-entries.json`
- `verified-news-articles.json`
- `link-test-results.json`
- `pdf-links.json`
- `event-gallery-images.json`
- `portfolio-gallery-images.json`

### Temporary Markdown Files (Reports/Audits)
These are temporary reports and can be removed:
- `AGENT_REVIEW.md`
- `BROKEN_LINKS_AND_PAGES_REPORT.md`
- `LINK_TEST_REPORT.md`
- `MEGA_MENU_AUDIT.md`
- `MEGA_MENU_FIXES_SUMMARY.md`

## Files to Keep

### Documentation (Keep)
- `README.md` - Project documentation
- `HPRC_REDESIGN_EXECUTIVE_SUMMARY.md` - Useful reference
- `HPRC_REDESIGN_GUIDE.md` - Useful reference
- `LEADERSHIP_PAGE_COMPARISON.md` - Useful reference
- `docs/*.md` - Project documentation

### Scripts to Keep (Potentially useful)
- `scripts/generate-favicon.js` - May be useful for future favicon updates
