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

// React Hooks
export { useSEO, useSEOManager } from './hooks/useSEO.js';
export type { UseSEOOptions, UseSEOReturn } from './hooks/useSEO.js';

// Framework Integrations
export {
  generateMetadata,
  generateStructuredDataScript,
  withSEO,
} from './frameworks/nextjs.js';
export {
  createPageSEOLoader,
  createSEOLoader,
  createSEOStore,
  generateSEOData,
  generateMetaTags as generateSvelteKitMetaTags,
} from './frameworks/sveltekit.js';
export {
  generateReactRouterMeta,
  createMetaFunction,
} from './frameworks/react-router.js';

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

// Lazy Loading
export {
  lazyLoadFAQSchema,
  lazyLoadFrameworkUtils,
  lazyLoadLocalBusinessSchema,
  lazyLoadProductSchema,
  lazyLoadSEOUtils,
  lazyLoadSitemapUtils,
  lazyLoadStructuredData,
  preloadFrameworkUtils,
  preloadSEOUtils,
} from './utils/lazy.js';

// Payload CMS Integration
export { seoAdminComponents } from './payload/admin.js';
export {
  enhancedSeoFields,
  seoFields,
  siteSeoFields,
} from './payload/fields.js';
export { seoHooks, siteSeoHooks } from './payload/hooks.js';
export { addSeoFields, addSeoHooks, seoPlugin } from './payload/plugin.js';
export type {
  PayloadSEOConfig,
  PayloadSEOOptions,
  PayloadSEOPlugin,
} from './payload/types.js';

// Types
export type {
  FAQItem,
  Media,
  Page,
  ProductData,
  SEOData,
  SEOFields,
  SEOHeadProps,
  SitemapConfig,
  SitemapUrl,
  SiteSettings,
  StructuredDataConfig,
  StructuredDataProps,
} from './types/index.js';
