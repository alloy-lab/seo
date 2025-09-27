/**
 * @fileoverview React SEO Hook
 * @description React hook for managing SEO data in components
 */

import { useCallback, useMemo, useState } from 'react';
import type { Page, SEOData, SiteSettings } from '../types/index.js';
import { generateMetaTags, generateSEO } from '../utils/seo.js';

export interface UseSEOOptions {
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

export interface UseSEOReturn {
  /** Generated SEO data */
  seo: SEOData;
  /** HTML meta tags as string */
  metaTags: string;
  /** Individual SEO properties for custom rendering */
  title: string;
  description: string;
  keywords?: string | undefined;
  image?: string | undefined;
  url?: string | undefined;
  type: string;
  structuredData?: string | undefined;
  /** Update SEO data */
  updateSEO: (updates: Partial<SEOData>) => SEOData;
}

/**
 * React hook for managing SEO data
 *
 * @example
 * ```tsx
 * function MyPage() {
 *   const { title, description, metaTags } = useSEO({
 *     siteSettings: { siteName: 'My Site', siteDescription: 'A great site' },
 *     page: { title: 'About Us', slug: 'about' },
 *     baseUrl: 'https://mysite.com',
 *     type: 'page'
 *   });
 *
 *   return (
 *     <div>
 *       <head>{metaTags}</head>
 *       <h1>{title}</h1>
 *       <p>{description}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useSEO(options: UseSEOOptions): UseSEOReturn {
  const {
    siteSettings,
    page,
    baseUrl,
    breadcrumbs,
    type = 'home',
    overrides = {},
  } = options;

  const seo = useMemo(() => {
    const data = page || siteSettings;
    const generatedSEO = generateSEO(
      data,
      siteSettings,
      type,
      baseUrl,
      breadcrumbs
    );

    // Apply overrides
    return {
      ...generatedSEO,
      ...overrides,
    };
  }, [siteSettings, page, baseUrl, breadcrumbs, type, overrides]);

  const metaTags = useMemo(() => {
    return generateMetaTags(seo);
  }, [seo]);

  const updateSEO = useMemo(() => {
    return (updates: Partial<SEOData>): SEOData => {
      return {
        ...seo,
        ...updates,
      };
    };
  }, [seo]);

  return {
    seo,
    metaTags,
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    image: seo.image,
    url: seo.url,
    type: seo.type || 'website',
    structuredData: seo.structuredData,
    updateSEO,
  };
}

/**
 * Hook for managing SEO with automatic updates
 *
 * @example
 * ```tsx
 * function DynamicPage() {
 *   const [pageData, setPageData] = useState(null);
 *   const { seo, updateSEO } = useSEOManager({
 *     siteSettings: { siteName: 'My Site' },
 *     baseUrl: 'https://mysite.com'
 *   });
 *
 *   useEffect(() => {
 *     fetchPageData().then(data => {
 *       setPageData(data);
 *       updateSEO({
 *         title: data.title,
 *         description: data.description
 *       });
 *     });
 *   }, []);
 *
 *   return <div>{seo.title}</div>;
 * }
 * ```
 */
export function useSEOManager(initialOptions: Omit<UseSEOOptions, 'page'>) {
  const [seoData, setSeoData] = useState<Partial<SEOData> | null>(null);
  const [options, setOptions] = useState(initialOptions);

  const seo = useSEO({
    ...options,
    ...(seoData && { overrides: seoData }),
  });

  const updateSEO = useCallback((updates: Partial<SEOData>) => {
    setSeoData((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const updateOptions = useCallback((newOptions: Partial<UseSEOOptions>) => {
    setOptions((prev) => ({
      ...prev,
      ...newOptions,
    }));
  }, []);

  return {
    ...seo,
    updateSEO,
    updateOptions,
  };
}
