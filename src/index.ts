/**
 * @fileoverview SEO Package - Main entry point
 * @description This module exports all SEO utilities and components
 * @version 1.0.0
 * @author Stephen Way <stephen@stephenway.net>
 * @license MIT
 */

// Components
export { SEOHead } from './components/SEOHead.js';
export {
  StructuredData,
  useStructuredData,
} from './components/StructuredData.js';

// Utilities
export { generateMetaTags, generateSEO } from './utils/seo.js';
export {
  generateRobotsTxt,
  generateSitemapUrls,
  generateSitemapXML,
} from './utils/sitemap.js';
export {
  generateFAQSchema,
  generateLocalBusinessSchema,
  generateProductSchema,
  generateStructuredData,
} from './utils/structuredData.js';

// Types
export type {
  FAQItem,
  Media,
  Page,
  ProductData,
  SEOData,
  SEOFields,
  SEOHeadProps,
  SiteSettings,
  SitemapConfig,
  SitemapUrl,
  StructuredDataConfig,
  StructuredDataProps,
} from './types/index.js';
