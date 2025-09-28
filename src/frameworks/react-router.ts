/**
 * @fileoverview React Router Integration
 * @description React Router specific utilities for SEO integration
 */

// React Router types (optional dependency)
type MetaDescriptor = {
  title?: string | undefined;
  name?: string | undefined;
  property?: string | undefined;
  content?: string | undefined;
  [key: string]: string | undefined;
};
import { generateSEO, generateMetaTags } from '../utils/seo.js';
import type { Page, SiteSettings } from '../types/index.js';

/**
 * Generate React Router meta descriptors from page and site settings
 */
export function generateReactRouterMeta(
  page: Page,
  siteSettings: SiteSettings,
  type: 'home' | 'page' = 'page',
  baseUrl?: string
): MetaDescriptor[] {
  // Generate SEO data
  const seo = generateSEO(page, siteSettings, type, baseUrl);

  // Generate HTML meta tags
  const metaTags = generateMetaTags(seo);

  // Parse HTML meta tags and convert to React Router format
  const metaArray = metaTags
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => {
      const titleMatch = line.match(/<title>(.*?)<\/title>/);
      if (titleMatch) {
        return { title: titleMatch[1] };
      }

      const metaMatch = line.match(
        /<meta\s+(?:name|property)="([^"]+)"\s+content="([^"]+)"\s*\/?>/
      );
      if (metaMatch) {
        const [, name, content] = metaMatch;
        if (name && content) {
          return {
            [name.startsWith('og:') ? 'property' : 'name']: name,
            content,
          };
        }
      }

      return null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return metaArray;
}

/**
 * Create a React Router meta function factory
 */
export function createMetaFunction(
  getBaseUrl: () => string = () =>
    process.env.BASE_URL || 'http://localhost:3000'
) {
  return function metaFunction({
    loaderData,
  }: {
    loaderData: Record<string, unknown>;
  }) {
    if (!loaderData || !loaderData.page || !loaderData.siteSettings) {
      return [
        { title: 'Not Found' },
        { name: 'description', content: 'Page not found' },
      ];
    }

    return generateReactRouterMeta(
      loaderData.page as Page,
      loaderData.siteSettings as SiteSettings,
      'page',
      getBaseUrl()
    );
  };
}
