/**
 * @fileoverview React SEO Hook Tests
 * @description Tests for the useSEO React hook
 */

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useSEO, useSEOManager } from '../hooks/useSEO.js';
import type { Page, SiteSettings } from '../types/index.js';

// Mock the SEO utilities
vi.mock('../utils/seo.js', () => ({
  generateSEO: vi.fn((data, siteSettings, type, baseUrl, _breadcrumbs) => ({
    title:
      type === 'page'
        ? `${data.title} | ${siteSettings.siteName}`
        : siteSettings.siteName,
    description: data.excerpt || siteSettings.siteDescription,
    keywords: data.seo?.keywords,
    image: data.seo?.image?.url || data.featuredImage?.url,
    url: type === 'page' ? `${baseUrl}/pages/${data.slug}` : baseUrl,
    type: type === 'home' ? 'website' : 'article',
    structuredData: baseUrl ? '{"@context":"https://schema.org"}' : undefined,
  })),
  generateMetaTags: vi.fn(
    (seo) =>
      `<title>${seo.title}</title>\n    <meta name="description" content="${seo.description}" />`
  ),
}));

describe('useSEO Hook', () => {
  const mockSiteSettings: SiteSettings = {
    siteName: 'Test Site',
    siteDescription: 'A test website',
  };

  const mockPage: Page = {
    id: '1',
    title: 'Test Page',
    slug: 'test-page',
    status: 'published',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    excerpt: 'This is a test page',
    seo: {
      title: 'Custom SEO Title',
      description: 'Custom SEO description',
      keywords: 'test, seo, page',
      image: {
        id: '1',
        url: 'https://example.com/image.jpg',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
    },
  };

  describe('useSEO', () => {
    it('should generate SEO data for home page', () => {
      const { result } = renderHook(() =>
        useSEO({
          siteSettings: mockSiteSettings,
          baseUrl: 'https://example.com',
          type: 'home',
        })
      );

      expect(result.current.title).toBe('Test Site');
      expect(result.current.description).toBe('A test website');
      expect(result.current.type).toBe('website');
      expect(result.current.url).toBe('https://example.com');
      expect(result.current.metaTags).toContain('<title>Test Site</title>');
    });

    it('should generate SEO data for page', () => {
      const { result } = renderHook(() =>
        useSEO({
          siteSettings: mockSiteSettings,
          page: mockPage,
          baseUrl: 'https://example.com',
          type: 'page',
        })
      );

      expect(result.current.title).toBe('Test Page | Test Site');
      expect(result.current.description).toBe('This is a test page');
      expect(result.current.type).toBe('article');
      expect(result.current.url).toBe('https://example.com/pages/test-page');
      expect(result.current.keywords).toBe('test, seo, page');
      expect(result.current.image).toBe('https://example.com/image.jpg');
    });

    it('should apply SEO overrides', () => {
      const { result } = renderHook(() =>
        useSEO({
          siteSettings: mockSiteSettings,
          page: mockPage,
          baseUrl: 'https://example.com',
          type: 'page',
          overrides: {
            title: 'Override Title',
            description: 'Override Description',
          },
        })
      );

      expect(result.current.title).toBe('Override Title');
      expect(result.current.description).toBe('Override Description');
    });

    it('should include structured data when baseUrl is provided', () => {
      const { result } = renderHook(() =>
        useSEO({
          siteSettings: mockSiteSettings,
          page: mockPage,
          baseUrl: 'https://example.com',
          type: 'page',
        })
      );

      expect(result.current.structuredData).toBe(
        '{"@context":"https://schema.org"}'
      );
    });

    it('should not include structured data when baseUrl is not provided', () => {
      const { result } = renderHook(() =>
        useSEO({
          siteSettings: mockSiteSettings,
          page: mockPage,
          type: 'page',
        })
      );

      expect(result.current.structuredData).toBeUndefined();
    });

    it('should update SEO data with updateSEO function', () => {
      const { result } = renderHook(() =>
        useSEO({
          siteSettings: mockSiteSettings,
          page: mockPage,
          baseUrl: 'https://example.com',
          type: 'page',
        })
      );

      const updatedSEO = result.current.updateSEO({
        title: 'Updated Title',
        description: 'Updated Description',
      });

      expect(updatedSEO.title).toBe('Updated Title');
      expect(updatedSEO.description).toBe('Updated Description');
    });
  });

  describe('useSEOManager', () => {
    it('should manage SEO state with updates', () => {
      const { result } = renderHook(() =>
        useSEOManager({
          siteSettings: mockSiteSettings,
          baseUrl: 'https://example.com',
          type: 'home',
        })
      );

      expect(result.current.title).toBe('Test Site');

      act(() => {
        result.current.updateSEO({
          title: 'Updated Title',
          description: 'Updated Description',
        });
      });

      expect(result.current.title).toBe('Updated Title');
      expect(result.current.description).toBe('Updated Description');
    });

    it('should update options with updateOptions function', () => {
      const { result } = renderHook(() =>
        useSEOManager({
          siteSettings: mockSiteSettings,
          baseUrl: 'https://example.com',
          type: 'home',
        })
      );

      act(() => {
        result.current.updateOptions({
          page: mockPage,
          type: 'page',
        });
      });

      expect(result.current.title).toBe('Test Page | Test Site');
      expect(result.current.type).toBe('article');
    });
  });
});
