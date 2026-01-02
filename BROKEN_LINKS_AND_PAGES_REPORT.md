# Broken Links and Pages Report
**Date:** December 27, 2025
**Website:** HPRC New Web (hprc.in)

---

## Summary

**Critical Issue Found:** ⚠️
The folder is named `hospitality` (typo - missing 'p') throughout the codebase.
- Should be: `hospitality`
- Current: `hospitality`

This affects ALL hospitality-related pages and navigation links.

---

## Pages Tested ✅

| Page | URL | Status | Notes |
|-------|------|--------|--------|
| Home (/) | ✅ Working | Loads correctly |
| About (/about) | ✅ Working | Loads correctly |
| Membership (/membership) | ✅ Working | Loads correctly |
| Programmes (/programmes) | ✅ Working | Loads correctly |
| Beginners (/programmes/beginners) | ✅ Working | Loads correctly |
| Contact (/contact) | ✅ Working | Loads correctly |
| Events (/events) | ✅ Working | Loads correctly |
| Heritage (/about/heritage) | ✅ Working | Loads correctly |
| Login (/membership/login) | ✅ Working | Loads correctly |
| Sports Centre (/sports-centre) | ✅ Working | Loads correctly |
| Gold Package (/sports-centre/gold-package) | ✅ Working | Loads correctly |

---

## Broken Links Found ❌

### 1. Hospitality Subpages (CRITICAL TYPO ISSUE)

**Issue:** Folder name typo affects ALL hospitality navigation links

| Expected URL | Actual Folder | Status |
|--------------|---------------|--------|
| /hospitality | `hospitality` | ❌ Broken - Folder name mismatch |
| /hospitality/chukkers | `hospitality` | ❌ Broken - Folder name mismatch |
| /hospitality/snaffles-bistro | `hospitality` | ❌ Broken - Folder name mismatch |
| /hospitality/banquets | `hospitality` | ❌ Broken - Folder name mismatch |
| /hospitality/luxury-rooms | `hospitality` | ❌ Broken - Folder name mismatch |

**Impact:** Users clicking on:
- Main "Hospitality" navigation menu
- "Chukkers Restaurant" link
- "Snaffles Bistro" link
- "Banquets" link
- "Luxury Rooms" link

All will get 404 errors because the folder is named with the typo.

---

## Missing Pages Referenced in Navigation ❌

| Navigation Item | Expected URL | Status | Priority |
|---------------|--------------|--------|----------|
| Start Riding | /programmes/start-riding | ❌ Missing | High |
| Intermediate Programme | /programmes/intermediate | ❌ Missing | High |
| Advanced Polo | /programmes/polo | ❌ Missing | High |
| Equestrian | /programmes/equestrian | ❌ Missing | High |
| Stick & Ball | /programmes/stick-and-ball | ❌ Missing | Medium |
| Chukkers | /programmes/chukkers | ❌ Missing | Medium |
| Chukkers Restaurant | /hospitality/chukkers | ❌ Missing (due to typo) | High |
| Snaffles Bistro | /hospitality/snaffles-bistro | ❌ Missing (due to typo) | High |
| Luxury Rooms | /hospitality/luxury-rooms | ❌ Missing (due to typo) | Medium |

---

## Files with Typos Found

**All instances of `hospitality` should be `hospitality`:**

1. `src/app/(site)/hospitality/` - Directory name (typo)
2. `src/content/hospitality.ts` - Content file
3. `src/app/(site)/hospitality/page.tsx` - Main page component
4. `src/content/navigation.ts` line 114 - Navigation link
5. `src/content/home.ts` line 89 - Pillars link
6. Multiple references across 95+ files

---

## Recommendations

### Priority 1: Fix Folder Typo (CRITICAL)
1. Rename folder `src/app/(site)/hospitality` to `hospitality`
2. Rename file `src/content/hospitality.ts` to `hospitality.ts`
3. Update all imports from `@/content/hospitality` to `@/content/hospitality`
4. Update navigation link in `src/content/navigation.ts` line 115 from `/hospitality` to `/hospitality`
5. Update all content references

### Priority 2: Create Missing Programme Pages
Create the following pages under `src/app/(site)/programmes/`:
1. `/programmes/start-riding` - Start Riding page
2. `/programmes/intermediate` - Intermediate Programme page
3. `/programmes/polo` - Advanced Polo page
4. `/programmes/equestrian` - Equestrian page
5. `/programmes/stick-and-ball` - Stick & Ball page
6. `/programmes/chukkers` - Chukkers page

### Priority 3: Create Missing Hospitality Subpages
After fixing folder typo, create:
1. `/hospitality/chukkers` - Chukkers Restaurant page
2. `/hospitality/snaffles-bistro` - Snaffles Bistro page
3. `/hospitality/banquets` - Banquets page
4. `/hospitality/luxury-rooms` - Luxury Rooms page

---

## Notes

- Total broken links found: **12+**
- Critical folder name typo affecting: **4+** main navigation items
- Missing programme pages: **6**
- Missing hospitality subpages: **4** (blocked by typo)

All broken links are due to either the folder name typo or missing page implementations.

