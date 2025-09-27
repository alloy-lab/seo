/**
 * @fileoverview SEO Utilities
 * @description Core SEO generation and meta tag utilities
 */

import type { Page, SEOData, SiteSettings } from '../types/index.js';
import { generateStructuredData } from './structuredData.js';

/**
 * Generate SEO data for pages or site settings
 */
export function generateSEO(
  data: Page | SiteSettings,
  siteSettings: SiteSettings,
  type: 'page' | 'home' = 'home',
  baseUrl?: string,
  breadcrumbs?: Array<{ name: string; url: string }>
): SEOData {
  const baseTitle = siteSettings.siteName || 'Website';
  const baseDescription = siteSettings.siteDescription || 'A modern website';

  let title = baseTitle;
  let description = baseDescription;
  let keywords: string | undefined;
  let image: string | undefined;

  if (type === 'page' && 'title' in data) {
    const page = data as Page;
    title = page.seo?.title || `${page.title} | ${baseTitle}`;
    description = page.seo?.description || page.excerpt || baseDescription;
    keywords = page.seo?.keywords;
    image = page.seo?.image?.url || page.featuredImage?.url;
  }

  const seoData: SEOData = {
    title: title || 'Website',
    description: description || 'A modern website',
    keywords,
    image,
    url:
      type === 'page' && 'slug' in data
        ? `${baseUrl}/pages/${data.slug}`
        : baseUrl,
    type: type === 'home' ? 'website' : 'article',
  };

  // Add structured data if baseUrl is provided
  if (baseUrl) {
    seoData.structuredData = generateStructuredData({
      baseUrl,
      siteSettings,
      page: type === 'page' ? (data as Page) : undefined,
      breadcrumbs,
    });
  }

  return seoData;
}

/**
 * Generate HTML meta tags from SEO data
 */
export function generateMetaTags(seo: SEOData): string {
  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
  ];

  if (seo.keywords) {
    tags.push(`<meta name="keywords" content="${escapeHtml(seo.keywords)}" />`);
  }

  // Open Graph tags
  tags.push(
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:type" content="${seo.type || 'website'}" />`
  );

  if (seo.url) {
    tags.push(`<meta property="og:url" content="${escapeHtml(seo.url)}" />`);
  }

  if (seo.image) {
    tags.push(
      `<meta property="og:image" content="${escapeHtml(seo.image)}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:image" content="${escapeHtml(seo.image)}" />`
    );
  }

  // Twitter tags
  tags.push(
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`
  );

  return tags.join('\n    ');
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
