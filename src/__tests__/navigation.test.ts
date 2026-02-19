import { describe, it, expect } from 'vitest';
import {
  primaryNavigation,
  utilityNavigation,
  type NavItem,
  type NavChild,
  type NavSection,
} from '../content/navigation';

describe('primaryNavigation', () => {
  it('should have navigation items', () => {
    expect(primaryNavigation.length).toBeGreaterThan(0);
  });

  it('should start with Home', () => {
    expect(primaryNavigation[0].label).toBe('Home');
    expect(primaryNavigation[0].href).toBe('/');
  });

  it('should end with Contact', () => {
    const lastItem = primaryNavigation[primaryNavigation.length - 1];
    expect(lastItem.label).toBe('Contact');
    expect(lastItem.href).toBe('/contact');
  });

  it('each nav item should have label and href', () => {
    primaryNavigation.forEach((item: NavItem) => {
      expect(item.label).toBeDefined();
      expect(typeof item.label).toBe('string');
      expect(item.href).toBeDefined();
      expect(typeof item.href).toBe('string');
      expect(item.href.startsWith('/')).toBe(true);
    });
  });

  describe('About section', () => {
    const aboutNav = primaryNavigation.find((item) => item.label === 'About');

    it('should exist', () => {
      expect(aboutNav).toBeDefined();
    });

    it('should have sections with items', () => {
      expect(aboutNav?.sections).toBeDefined();
      expect(aboutNav?.sections?.length).toBeGreaterThan(0);
    });

    it('should include The Club link', () => {
      const clubSection = aboutNav?.sections?.find((s) => s.title === 'The Club');
      expect(clubSection).toBeDefined();
      const clubLink = clubSection?.items.find((i: NavChild) => i.label === 'The Club');
      expect(clubLink).toBeDefined();
      expect(clubLink?.href).toBe('/about');
    });

    it('should include History link', () => {
      const clubSection = aboutNav?.sections?.find((s) => s.title === 'The Club');
      const historyLink = clubSection?.items.find((i: NavChild) => i.label === 'History');
      expect(historyLink).toBeDefined();
      expect(historyLink?.href).toBe('/about/heritage');
    });

    it('should include The Committee link', () => {
      const clubSection = aboutNav?.sections?.find((s) => s.title === 'The Club');
      const leadershipLink = clubSection?.items.find((i: NavChild) => i.label === 'The Committee');
      expect(leadershipLink).toBeDefined();
      expect(leadershipLink?.href).toBe('/about/leadership');
    });

    it('should have a featured section', () => {
      expect(aboutNav?.featured).toBeDefined();
      expect(aboutNav?.featured?.title).toBe('The Club');
    });
  });

  describe('Programmes section', () => {
    const programmesNav = primaryNavigation.find((item) => item.label === 'Programmes');

    it('should exist', () => {
      expect(programmesNav).toBeDefined();
    });

    it('should have programme items', () => {
      const section = programmesNav?.sections?.[0];
      expect(section?.items.length).toBeGreaterThan(0);
    });

    it('should include Start Riding programme', () => {
      const section = programmesNav?.sections?.[0];
      const startRiding = section?.items.find((i: NavChild) => i.label === 'Start Riding');
      expect(startRiding).toBeDefined();
      expect(startRiding?.href).toBe('/programmes/start-riding');
    });

    it('should include polo-related programmes', () => {
      const section = programmesNav?.sections?.[0];
      const itemLabels = section?.items.map((i: NavChild) => i.label);
      expect(itemLabels).toContain('Advanced Polo');
      expect(itemLabels).toContain('Stick & Ball');
      expect(itemLabels).toContain('Chukkers');
    });
  });

  describe('Sports Centre section', () => {
    const sportsCentreNav = primaryNavigation.find((item) => item.label === 'Sports Centre');

    it('should exist', () => {
      expect(sportsCentreNav).toBeDefined();
    });

    it('should include all sports facilities', () => {
      const section = sportsCentreNav?.sections?.[0];
      const itemLabels = section?.items.map((i: NavChild) => i.label);
      expect(itemLabels).toContain('Tennis');
      expect(itemLabels).toContain('Badminton');
      expect(itemLabels).toContain('Squash');
      expect(itemLabels).toContain('Swimming Pool');
      expect(itemLabels).toContain('Basketball');
      expect(itemLabels).toContain('Futsal');
      expect(itemLabels).toContain('Gym');
      expect(itemLabels).toContain('Sauna');
    });

    it('should include membership packages', () => {
      const section = sportsCentreNav?.sections?.[0];
      const itemLabels = section?.items.map((i: NavChild) => i.label);
      expect(itemLabels).toContain('Gold Package');
      expect(itemLabels).toContain('Platinum Package');
    });
  });

  describe('Hospitality section', () => {
    const hospitalityNav = primaryNavigation.find((item) => item.label === 'Hospitality');

    it('should exist', () => {
      expect(hospitalityNav).toBeDefined();
    });

    it('should have dining section', () => {
      const diningSection = hospitalityNav?.sections?.find(
        (s: NavSection) => s.title === 'Dining'
      );
      expect(diningSection).toBeDefined();
    });

    it('should have events section', () => {
      const eventsSection = hospitalityNav?.sections?.find(
        (s: NavSection) => s.title === 'Events'
      );
      expect(eventsSection).toBeDefined();
    });

    it('should include Chukkers Restaurant', () => {
      const diningSection = hospitalityNav?.sections?.find(
        (s: NavSection) => s.title === 'Dining'
      );
      const chukkers = diningSection?.items.find(
        (i: NavChild) => i.label === 'Chukkers Restaurant'
      );
      expect(chukkers).toBeDefined();
      expect(chukkers?.href).toBe('/hospitality/chukkers');
    });

    it('should include Banquets', () => {
      const eventsSection = hospitalityNav?.sections?.find(
        (s: NavSection) => s.title === 'Events'
      );
      const banquets = eventsSection?.items.find((i: NavChild) => i.label === 'Banquets');
      expect(banquets).toBeDefined();
    });
  });

  describe('Membership section', () => {
    const membershipNav = primaryNavigation.find((item) => item.label === 'Membership');

    it('should exist', () => {
      expect(membershipNav).toBeDefined();
    });

    it('should include Apply for Membership', () => {
      const section = membershipNav?.sections?.[0];
      const apply = section?.items.find((i: NavChild) => i.label === 'Apply for Membership');
      expect(apply).toBeDefined();
      expect(apply?.href).toBe('/membership/apply');
    });

    it('should include Member Login', () => {
      const section = membershipNav?.sections?.[0];
      const login = section?.items.find((i: NavChild) => i.label === 'Member Login');
      expect(login).toBeDefined();
      expect(login?.href).toBe('/membership/login');
    });

    it('should include Pay Now', () => {
      const section = membershipNav?.sections?.[0];
      const payNow = section?.items.find((i: NavChild) => i.label === 'Pay Now');
      expect(payNow).toBeDefined();
      expect(payNow?.href).toBe('/membership/pay-now');
    });
  });

  describe('Events & Media section', () => {
    const eventsNav = primaryNavigation.find((item) => item.label === 'Events & Media');

    it('should exist', () => {
      expect(eventsNav).toBeDefined();
    });

    it('should have Events section', () => {
      const eventsSection = eventsNav?.sections?.find((s: NavSection) => s.title === 'Events');
      expect(eventsSection).toBeDefined();
    });

    it('should have Media section', () => {
      const mediaSection = eventsNav?.sections?.find((s: NavSection) => s.title === 'Media');
      expect(mediaSection).toBeDefined();
    });

    it('should include Upcoming Events', () => {
      const eventsSection = eventsNav?.sections?.find((s: NavSection) => s.title === 'Events');
      const upcoming = eventsSection?.items.find((i: NavChild) => i.label === 'Upcoming Events');
      expect(upcoming).toBeDefined();
      expect(upcoming?.href).toBe('/events/upcoming');
    });

    it('should include all media links', () => {
      const mediaSection = eventsNav?.sections?.find((s: NavSection) => s.title === 'Media');
      const itemLabels = mediaSection?.items.map((i: NavChild) => i.label);
      expect(itemLabels).toContain('Newsroom');
      expect(itemLabels).toContain('Blogs');
      expect(itemLabels).toContain('Newsletters');
      expect(itemLabels).toContain('Photo Gallery');
      expect(itemLabels).toContain('Video Gallery');
    });
  });

  describe('featured sections', () => {
    it('all sections with featured should have required properties', () => {
      primaryNavigation.forEach((item: NavItem) => {
        if (item.featured) {
          expect(item.featured.title).toBeDefined();
          expect(item.featured.description).toBeDefined();
          expect(item.featured.href).toBeDefined();
        }
      });
    });
  });

  describe('href uniqueness and validity', () => {
    it('all hrefs should start with /', () => {
      const allHrefs: string[] = [];

      primaryNavigation.forEach((item: NavItem) => {
        allHrefs.push(item.href);
        item.sections?.forEach((section: NavSection) => {
          section.items.forEach((child: NavChild) => {
            allHrefs.push(child.href);
          });
        });
        item.children?.forEach((child: NavChild) => {
          allHrefs.push(child.href);
        });
      });

      allHrefs.forEach((href) => {
        expect(href.startsWith('/')).toBe(true);
      });
    });
  });
});

describe('utilityNavigation', () => {
  it('should have utility navigation items', () => {
    expect(utilityNavigation.length).toBeGreaterThan(0);
  });

  it('should include Pay Now link', () => {
    const payNow = utilityNavigation.find((item: NavChild) => item.label === 'Pay Now');
    expect(payNow).toBeDefined();
    expect(payNow?.href).toBe('/pay-now');
  });

  it('each utility item should have label and href', () => {
    utilityNavigation.forEach((item: NavChild) => {
      expect(item.label).toBeDefined();
      expect(item.href).toBeDefined();
    });
  });
});
