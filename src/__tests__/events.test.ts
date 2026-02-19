import { describe, it, expect } from 'vitest';
import { eventsContent, type NewsArticle } from '../content/events';

describe('eventsContent', () => {
  describe('hero section', () => {
    it('should have eyebrow text', () => {
      expect(eventsContent.hero.eyebrow).toBe('Events & Media');
    });

    it('should have title', () => {
      expect(eventsContent.hero.title).toBeDefined();
      expect(eventsContent.hero.title.length).toBeGreaterThan(0);
    });

    it('should have description', () => {
      expect(eventsContent.hero.description).toBeDefined();
      expect(eventsContent.hero.description.length).toBeGreaterThan(0);
    });
  });

  describe('news articles', () => {
    const news = eventsContent.news;

    it('should have news articles', () => {
      expect(news.length).toBeGreaterThan(0);
    });

    it('each article should have required fields', () => {
      news.forEach((article: NewsArticle) => {
        expect(article.title).toBeDefined();
        expect(article.date).toBeDefined();
        expect(article.source).toBeDefined();
        expect(article.excerpt).toBeDefined();
        expect(article.url).toBeDefined();
      });
    });

    it('should have 2026 championship news as first article', () => {
      expect(news[0].title).toContain('2026');
      expect(news[0].title.toLowerCase()).toContain('india');
    });

    it('should have articles with valid URLs', () => {
      news.forEach((article: NewsArticle) => {
        expect(article.url.startsWith('/') || article.url.startsWith('http')).toBe(true);
      });
    });

    it('should have articles with categories', () => {
      const articlesWithCategories = news.filter((a: NewsArticle) => a.category);
      expect(articlesWithCategories.length).toBeGreaterThan(0);
    });

    it('should have articles with images', () => {
      const articlesWithImages = news.filter((a: NewsArticle) => a.imageUrl);
      expect(articlesWithImages.length).toBeGreaterThan(0);
    });

    it('should include championship category articles', () => {
      const championshipArticles = news.filter(
        (a: NewsArticle) => a.category === 'Championship'
      );
      expect(championshipArticles.length).toBeGreaterThan(0);
    });

    it('should include international category articles', () => {
      const internationalArticles = news.filter(
        (a: NewsArticle) => a.category === 'International'
      );
      expect(internationalArticles.length).toBeGreaterThan(0);
    });
  });

  describe('upcoming events', () => {
    const upcoming = eventsContent.upcoming;

    it('should have upcoming events', () => {
      expect(upcoming.length).toBeGreaterThan(0);
    });

    it('each event should have title, date, and description', () => {
      upcoming.forEach((event) => {
        expect(event.title).toBeDefined();
        expect(event.date).toBeDefined();
        expect(event.description).toBeDefined();
      });
    });

    it('should include World Arena Polo Championship 2026', () => {
      const championship = upcoming.find((e) =>
        e.title.includes('World Arena Polo Championship 2026')
      );
      expect(championship).toBeDefined();
    });

    it('2026 championship should be marked as concluded', () => {
      const championship = upcoming.find((e) =>
        e.title.includes('World Arena Polo Championship 2026')
      );
      expect(championship?.date).toContain('Concluded');
    });
  });

  describe('past highlights', () => {
    const pastHighlights = eventsContent.pastHighlights;

    it('should have past highlight events', () => {
      expect(pastHighlights.length).toBeGreaterThan(0);
    });

    it('each highlight should have title and description', () => {
      pastHighlights.forEach((event) => {
        expect(event.title).toBeDefined();
        expect(event.description).toBeDefined();
      });
    });

    it('should include links to event pages', () => {
      const eventsWithLinks = pastHighlights.filter((e) => e.link);
      expect(eventsWithLinks.length).toBeGreaterThan(0);
    });

    it('should include Regional Equestrian League', () => {
      const rel = pastHighlights.find((e) =>
        e.title.includes('Regional Equestrian League')
      );
      expect(rel).toBeDefined();
    });

    it('should include Arena Polo Tournament 2016', () => {
      const apt2016 = pastHighlights.find((e) =>
        e.title.includes('Arena Polo Tournament 2016')
      );
      expect(apt2016).toBeDefined();
    });
  });

  describe('media sections', () => {
    const media = eventsContent.media;

    it('should have media categories', () => {
      expect(media.length).toBeGreaterThan(0);
    });

    it('should include News category', () => {
      const newsCategory = media.find((m) => m.category === 'News');
      expect(newsCategory).toBeDefined();
      expect(newsCategory?.href).toBe('/events/news');
    });

    it('should include Blogs category', () => {
      const blogsCategory = media.find((m) => m.category === 'Blogs');
      expect(blogsCategory).toBeDefined();
      expect(blogsCategory?.href).toBe('/events/blogs');
    });

    it('should include Newsletters category', () => {
      const newslettersCategory = media.find((m) => m.category === 'Newsletters');
      expect(newslettersCategory).toBeDefined();
      expect(newslettersCategory?.href).toBe('/events/newsletters');
    });

    it('each media category should have summary and href', () => {
      media.forEach((category) => {
        expect(category.category).toBeDefined();
        expect(category.summary).toBeDefined();
        expect(category.href).toBeDefined();
      });
    });
  });

  describe('galleries', () => {
    const galleries = eventsContent.galleries;

    it('should have gallery types', () => {
      expect(galleries.length).toBeGreaterThan(0);
    });

    it('should include Photo Gallery', () => {
      const photoGallery = galleries.find((g) => g.type === 'Photo Gallery');
      expect(photoGallery).toBeDefined();
      expect(photoGallery?.href).toBe('/events/photo-gallery');
    });

    it('should include Video Gallery', () => {
      const videoGallery = galleries.find((g) => g.type === 'Video Gallery');
      expect(videoGallery).toBeDefined();
      expect(videoGallery?.href).toBe('/events/video-gallery');
    });

    it('each gallery should have type, description, and href', () => {
      galleries.forEach((gallery) => {
        expect(gallery.type).toBeDefined();
        expect(gallery.description).toBeDefined();
        expect(gallery.href).toBeDefined();
      });
    });
  });
});
