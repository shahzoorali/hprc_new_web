import { describe, it, expect } from 'vitest';
import { siteConfig } from '../config/site';

describe('siteConfig', () => {
  describe('basic info', () => {
    it('should have correct name', () => {
      expect(siteConfig.name).toBe('Hyderabad Polo & Riding Club');
    });

    it('should have correct short name', () => {
      expect(siteConfig.shortName).toBe('HPRC');
    });

    it('should have a description', () => {
      expect(siteConfig.description).toBeDefined();
      expect(siteConfig.description.length).toBeGreaterThan(0);
    });

    it('description should mention HPRC', () => {
      expect(siteConfig.description).toContain('HPRC');
    });
  });

  describe('contact information', () => {
    it('should have phone number', () => {
      expect(siteConfig.contact.phone).toBeDefined();
      expect(siteConfig.contact.phone).toMatch(/\+91/);
    });

    it('should have email address', () => {
      expect(siteConfig.contact.email).toBeDefined();
      expect(siteConfig.contact.email).toContain('@hprc.co.in');
    });

    it('should have membership email', () => {
      expect(siteConfig.contact.membershipEmail).toBeDefined();
      expect(siteConfig.contact.membershipEmail).toContain('@hprc.co.in');
    });

    it('should have address', () => {
      expect(siteConfig.contact.address).toBeDefined();
      expect(siteConfig.contact.address).toContain('Hyderabad');
      expect(siteConfig.contact.address).toContain('Telangana');
    });

    it('should have postal code in address', () => {
      expect(siteConfig.contact.address).toMatch(/\d{6}/);
    });
  });

  describe('social media links', () => {
    it('should have Facebook link', () => {
      expect(siteConfig.social.facebook).toBeDefined();
      expect(siteConfig.social.facebook).toContain('facebook.com');
    });

    it('should have Instagram link', () => {
      expect(siteConfig.social.instagram).toBeDefined();
      expect(siteConfig.social.instagram).toContain('instagram.com');
    });

    it('should have YouTube link', () => {
      expect(siteConfig.social.youtube).toBeDefined();
      expect(siteConfig.social.youtube).toContain('youtube.com');
    });

    it('should have Twitter/X link', () => {
      expect(siteConfig.social.twitter).toBeDefined();
      expect(siteConfig.social.twitter).toContain('x.com');
    });

    it('all social links should be valid URLs', () => {
      Object.values(siteConfig.social).forEach((url) => {
        expect(url).toMatch(/^https:\/\//);
      });
    });
  });

  describe('primary actions', () => {
    it('should have primary actions defined', () => {
      expect(siteConfig.primaryActions).toBeDefined();
      expect(siteConfig.primaryActions.length).toBeGreaterThan(0);
    });

    it('should have Apply for Membership action', () => {
      const membershipAction = siteConfig.primaryActions.find(
        (a) => a.label === 'Apply for Membership'
      );
      expect(membershipAction).toBeDefined();
      expect(membershipAction?.href).toBe('/membership');
      expect(membershipAction?.variant).toBe('primary');
    });

    it('should have Explore Programmes action', () => {
      const programmesAction = siteConfig.primaryActions.find(
        (a) => a.label === 'Explore Programmes'
      );
      expect(programmesAction).toBeDefined();
      expect(programmesAction?.href).toBe('/programmes');
      expect(programmesAction?.variant).toBe('outline');
    });

    it('each action should have label, href, and variant', () => {
      siteConfig.primaryActions.forEach((action) => {
        expect(action.label).toBeDefined();
        expect(action.href).toBeDefined();
        expect(action.variant).toBeDefined();
      });
    });
  });
});
