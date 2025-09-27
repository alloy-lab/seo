/**
 * @fileoverview SvelteKit Integration
 * @description Utilities for SvelteKit SEO management
 */

import type { Page, SEOData, SiteSettings } from '../types/index.js';
import {
  generateMetaTags as generateMetaTagsUtil,
  generateSEO,
} from '../utils/seo.js';

export interface SvelteKitSEOOptions {
  /** Site settings for SEO defaults */
  siteSettings: SiteSettings;
  /** Page data (for page-specific SEO) */
  page?: Page;
  /** Base URL for the site */
  baseUrl?: string;
  /** Breadcrumbs for structured data */
  breadcrumbs?: Array<{ name: string; url: string }>;
  /** SEO type - 'page' or 'home' */
  type?: 'page' | 'home';
  /** Custom SEO overrides */
  overrides?: Partial<SEOData>;
}

/**
 * Generate SEO data for SvelteKit pages
 *
 * @example
 * ```ts
 * // src/routes/+page.ts
 * import { generateSEOData } from '@alloylab/seo/sveltekit';
 *
 * export const load = async () => {
 *   const seo = generateSEOData({
 *     siteSettings: { siteName: 'My Site', siteDescription: 'A great site' },
 *     baseUrl: 'https://mysite.com',
 *     type: 'home'
 *   });
 *
 *   return { seo };
 * };
 * ```
 *
 * @example
 * ```ts
 * // src/routes/blog/[slug]/+page.ts
 * export const load = async ({ params }) => {
 *   const page = await getPage(params.slug);
 *
 *   const seo = generateSEOData({
 *     siteSettings: { siteName: 'My Site' },
 *     page,
 *     baseUrl: 'https://mysite.com',
 *     type: 'page'
 *   });
 *
 *   return { page, seo };
 * };
 * ```
 */
export function generateSEOData(options: SvelteKitSEOOptions): SEOData {
  const {
    siteSettings,
    page,
    baseUrl,
    breadcrumbs,
    type = 'home',
    overrides = {},
  } = options;

  const data = page || siteSettings;
  const seo = generateSEO(data, siteSettings, type, baseUrl, breadcrumbs);

  return {
    ...seo,
    ...overrides,
  };
}

/**
 * Generate HTML meta tags for SvelteKit
 *
 * @example
 * ```svelte
 * <!-- src/routes/+layout.svelte -->
 * <script>
 *   import { generateMetaTags } from '@alloylab/seo/sveltekit';
 *
 *   export let data;
 *   const metaTags = generateMetaTags(data.seo);
 * </script>
 *
 * <svelte:head>
 *   {@html metaTags}
 * </svelte:head>
 *
 * <slot />
 * ```
 */
export function generateMetaTags(seo: SEOData): string {
  return generateMetaTagsUtil(seo);
}

/**
 * SvelteKit page data loader helper
 *
 * @example
 * ```ts
 * // src/routes/+page.ts
 * import { createSEOLoader } from '@alloylab/seo/sveltekit';
 *
 * const seoLoader = createSEOLoader({
 *   siteSettings: { siteName: 'My Site' },
 *   baseUrl: 'https://mysite.com'
 * });
 *
 * export const load = seoLoader.load;
 * ```
 */
export function createSEOLoader(
  defaultOptions: Omit<SvelteKitSEOOptions, 'page'>
) {
  return {
    load: async (_event: unknown) => {
      const seo = generateSEOData(defaultOptions);
      return { seo };
    },
  };
}

/**
 * SvelteKit page data loader for dynamic pages
 *
 * @example
 * ```ts
 * // src/routes/blog/[slug]/+page.ts
 * import { createPageSEOLoader } from '@alloylab/seo/sveltekit';
 *
 * const seoLoader = createPageSEOLoader({
 *   siteSettings: { siteName: 'My Site' },
 *   baseUrl: 'https://mysite.com',
 *   getPage: async (slug) => await getPage(slug)
 * });
 *
 * export const load = seoLoader.load;
 * ```
 */
export function createPageSEOLoader<T = unknown>(options: {
  siteSettings: SiteSettings;
  baseUrl?: string;
  getPage: (params: T) => Promise<Page>;
  getBreadcrumbs?: (page: Page) => Array<{ name: string; url: string }>;
}) {
  return {
    load: async (event: { params: T }) => {
      const page = await options.getPage(event.params);
      const breadcrumbs = options.getBreadcrumbs?.(page);

      const seo = generateSEOData({
        siteSettings: options.siteSettings,
        page,
        ...(options.baseUrl && { baseUrl: options.baseUrl }),
        ...(breadcrumbs && { breadcrumbs }),
        type: 'page',
      });

      return { page, seo };
    },
  };
}

/**
 * SvelteKit store for reactive SEO management
 *
 * @example
 * ```svelte
 * <!-- src/routes/+layout.svelte -->
 * <script>
 *   import { seoStore } from '@alloylab/seo/sveltekit';
 *   import { onMount } from 'svelte';
 *
 *   export let data;
 *
 *   onMount(() => {
 *     seoStore.set(data.seo);
 *   });
 * </script>
 *
 * <svelte:head>
 *   <title>{$seoStore.title}</title>
 *   <meta name="description" content={$seoStore.description} />
 * </svelte:head>
 * ```
 */
export function createSEOStore(initialSEO: SEOData) {
  let seo = initialSEO;

  return {
    get title() {
      return seo.title;
    },
    get description() {
      return seo.description;
    },
    get keywords() {
      return seo.keywords;
    },
    get image() {
      return seo.image;
    },
    get url() {
      return seo.url;
    },
    get type() {
      return seo.type;
    },
    get structuredData() {
      return seo.structuredData;
    },
    set: (newSEO: SEOData) => {
      seo = newSEO;
    },
    update: (updates: Partial<SEOData>) => {
      seo = { ...seo, ...updates };
    },
  };
}
