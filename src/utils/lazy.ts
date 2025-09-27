/**
 * @fileoverview Lazy Loading Utilities
 * @description Utilities for lazy loading heavy SEO functions
 */

/**
 * Lazy load structured data generators
 * These are the heaviest utilities that can be loaded on demand
 */
export async function lazyLoadStructuredData() {
  const { generateStructuredData } = await import('./structuredData.js');
  return generateStructuredData;
}

/**
 * Lazy load FAQ schema generator
 */
export async function lazyLoadFAQSchema() {
  const { generateFAQSchema } = await import('./structuredData.js');
  return generateFAQSchema;
}

/**
 * Lazy load product schema generator
 */
export async function lazyLoadProductSchema() {
  const { generateProductSchema } = await import('./structuredData.js');
  return generateProductSchema;
}

/**
 * Lazy load local business schema generator
 */
export async function lazyLoadLocalBusinessSchema() {
  const { generateLocalBusinessSchema } = await import('./structuredData.js');
  return generateLocalBusinessSchema;
}

/**
 * Lazy load sitemap utilities
 */
export async function lazyLoadSitemapUtils() {
  const { generateSitemapXML, generateSitemapUrls, generateRobotsTxt } =
    await import('./sitemap.js');
  return { generateSitemapXML, generateSitemapUrls, generateRobotsTxt };
}

/**
 * Lazy load SEO utilities
 */
export async function lazyLoadSEOUtils() {
  const { generateSEO, generateMetaTags } = await import('./seo.js');
  return { generateSEO, generateMetaTags };
}

/**
 * Lazy load framework-specific utilities
 */
export async function lazyLoadFrameworkUtils(
  framework: 'react' | 'nextjs' | 'sveltekit'
) {
  switch (framework) {
    case 'react': {
      const { useSEO, useSEOManager } = await import('../hooks/useSEO.js');
      return { useSEO, useSEOManager };
    }
    case 'nextjs': {
      const { generateMetadata, generateStructuredDataScript, withSEO } =
        await import('../frameworks/nextjs.js');
      return { generateMetadata, generateStructuredDataScript, withSEO };
    }
    case 'sveltekit': {
      const {
        generateSEOData,
        generateMetaTags: generateSvelteKitMetaTags,
        createSEOLoader,
        createPageSEOLoader,
        createSEOStore,
      } = await import('../frameworks/sveltekit.js');
      return {
        generateSEOData,
        generateSvelteKitMetaTags,
        createSEOLoader,
        createPageSEOLoader,
        createSEOStore,
      };
    }
    default:
      throw new Error(`Unknown framework: ${framework}`);
  }
}

/**
 * Preload utilities for better performance
 * Call this during app initialization to warm up the cache
 */
export async function preloadSEOUtils() {
  const promises = [
    lazyLoadSEOUtils(),
    lazyLoadStructuredData(),
    lazyLoadSitemapUtils(),
  ];

  await Promise.all(promises);
}

/**
 * Preload framework-specific utilities
 */
export async function preloadFrameworkUtils(
  frameworks: Array<'react' | 'nextjs' | 'sveltekit'>
) {
  const promises = frameworks.map((framework) =>
    lazyLoadFrameworkUtils(framework)
  );
  await Promise.all(promises);
}
