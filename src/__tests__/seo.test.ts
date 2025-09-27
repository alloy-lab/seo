/**
 * @fileoverview SEO Utilities Tests
 * @description Tests for SEO generation utilities
 */

import { describe, expect, it } from 'vitest';
import type { Page, SiteSettings } from '../types/index.js';
import { generateMetaTags, generateSEO } from '../utils/seo.js';

describe('SEO Utilities', () => {
  const mockSiteSettings: SiteSettings = {
    siteName: 'Test Site',
    siteDescription: 'A test website',
    logo: {
      id: '1',
      url: 'https://example.com/logo.png',
      alt: 'Test Site Logo',
      filename: 'logo.png',
      mimeType: 'image/png',
      filesize: 1024,
      width: 200,
      height: 100,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
  };

  const mockPage: Page = {
    id: '1',
    title: 'Test Page',
    slug: 'test-page',
    status: 'published',
    excerpt: 'This is a test page',
    seo: {
      title: 'Custom SEO Title',
      description: 'Custom SEO description',
      keywords: 'test, seo, page',
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  };

  describe('generateSEO', () => {
    it('should generate SEO data for home page', () => {
      const seo = generateSEO(
        mockSiteSettings,
        mockSiteSettings,
        'home',
        'https://example.com'
      );

      expect(seo.title).toBe('Test Site');
      expect(seo.description).toBe('A test website');
      expect(seo.type).toBe('website');
      expect(seo.url).toBe('https://example.com');
    });

    it('should generate SEO data for page', () => {
      const seo = generateSEO(
        mockPage,
        mockSiteSettings,
        'page',
        'https://example.com'
      );

      expect(seo.title).toBe('Custom SEO Title');
      expect(seo.description).toBe('Custom SEO description');
      expect(seo.keywords).toBe('test, seo, page');
      expect(seo.type).toBe('article');
      expect(seo.url).toBe('https://example.com/pages/test-page');
    });

    it('should fallback to page title when no SEO title', () => {
      const pageWithoutSEOTitle = {
        ...mockPage,
        seo: { ...mockPage.seo, title: undefined },
      };
      const seo = generateSEO(
        pageWithoutSEOTitle,
        mockSiteSettings,
        'page',
        'https://example.com'
      );

      expect(seo.title).toBe('Test Page | Test Site');
    });

    it('should include structured data when baseUrl is provided', () => {
      const seo = generateSEO(
        mockPage,
        mockSiteSettings,
        'page',
        'https://example.com'
      );

      expect(seo.structuredData).toBeDefined();
      expect(typeof seo.structuredData).toBe('string');
    });
  });

  describe('generateMetaTags', () => {
    it('should generate basic meta tags', () => {
      const seo = generateSEO(
        mockPage,
        mockSiteSettings,
        'page',
        'https://example.com'
      );
      const metaTags = generateMetaTags(seo);

      expect(metaTags).toContain('<title>Custom SEO Title</title>');
      expect(metaTags).toContain(
        '<meta name="description" content="Custom SEO description" />'
      );
      expect(metaTags).toContain(
        '<meta name="keywords" content="test, seo, page" />'
      );
    });

    it('should generate Open Graph tags', () => {
      const seo = generateSEO(
        mockPage,
        mockSiteSettings,
        'page',
        'https://example.com'
      );
      const metaTags = generateMetaTags(seo);

      expect(metaTags).toContain(
        '<meta property="og:title" content="Custom SEO Title" />'
      );
      expect(metaTags).toContain(
        '<meta property="og:description" content="Custom SEO description" />'
      );
      expect(metaTags).toContain(
        '<meta property="og:type" content="article" />'
      );
    });

    it('should generate Twitter tags', () => {
      const seo = generateSEO(
        mockPage,
        mockSiteSettings,
        'page',
        'https://example.com'
      );
      const metaTags = generateMetaTags(seo);

      expect(metaTags).toContain(
        '<meta name="twitter:title" content="Custom SEO Title" />'
      );
      expect(metaTags).toContain(
        '<meta name="twitter:description" content="Custom SEO description" />'
      );
    });
  });
});
