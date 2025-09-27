/**
 * @fileoverview Next.js App Router Integration
 * @description Helpers for Next.js App Router metadata generation
 */

// Note: Next.js types are optional dependencies
// import type { Metadata } from 'next';
import React from 'react';
import type { Page, SiteSettings } from '../types/index.js';
import { generateSEO } from '../utils/seo.js';

export interface NextJSMetadataOptions {
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
  /** Additional metadata overrides */
  overrides?: Partial<Record<string, unknown>>;
}

/**
 * Generate Next.js App Router metadata from SEO data
 *
 * @example
 * ```tsx
 * // app/page.tsx
 * import { generateMetadata } from '@alloylab/seo/nextjs';
 *
 * export async function generateMetadata(): Promise<Metadata> {
 *   return generateMetadata({
 *     siteSettings: { siteName: 'My Site', siteDescription: 'A great site' },
 *     baseUrl: 'https://mysite.com',
 *     type: 'home'
 *   });
 * }
 * ```
 *
 * @example
 * ```tsx
 * // app/blog/[slug]/page.tsx
 * export async function generateMetadata({ params }): Promise<Metadata> {
 *   const page = await getPage(params.slug);
 *
 *   return generateMetadata({
 *     siteSettings: { siteName: 'My Site' },
 *     page,
 *     baseUrl: 'https://mysite.com',
 *     type: 'page'
 *   });
 * }
 * ```
 */
export function generateMetadata(
  options: NextJSMetadataOptions
): Record<string, unknown> {
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

  const metadata: Record<string, unknown> = {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: seo.type as 'website' | 'article',
      url: seo.url,
      images: seo.image ? [{ url: seo.image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: seo.image ? [seo.image] : undefined,
    },
    alternates: {
      canonical: seo.url,
    },
    ...overrides,
  };

  return metadata;
}

/**
 * Generate Next.js App Router metadata with structured data
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * export default function RootLayout({ children }) {
 *   const structuredData = generateStructuredDataScript({
 *     siteSettings: { siteName: 'My Site' },
 *     baseUrl: 'https://mysite.com'
 *   });
 *
 *   return (
 *     <html>
 *       <head>
 *         <script
 *           type="application/ld+json"
 *           dangerouslySetInnerHTML={{ __html: structuredData }}
 *         />
 *       </head>
 *       <body>{children}</body>
 *     </html>
 *   );
 * }
 * ```
 */
export function generateStructuredDataScript(
  options: NextJSMetadataOptions
): string {
  const { siteSettings, page, baseUrl, breadcrumbs, type = 'home' } = options;

  const data = page || siteSettings;
  const seo = generateSEO(data, siteSettings, type, baseUrl, breadcrumbs);

  return seo.structuredData || '';
}

/**
 * Next.js App Router page component wrapper
 *
 * @example
 * ```tsx
 * // app/blog/[slug]/page.tsx
 * import { withSEO } from '@alloylab/seo/nextjs';
 *
 * async function BlogPage({ params }) {
 *   const page = await getPage(params.slug);
 *
 *   return (
 *     <div>
 *       <h1>{page.title}</h1>
 *       <div dangerouslySetInnerHTML={{ __html: page.content }} />
 *     </div>
 *   );
 * }
 *
 * export default withSEO(BlogPage, {
 *   siteSettings: { siteName: 'My Site' },
 *   baseUrl: 'https://mysite.com',
 *   type: 'page'
 * });
 * ```
 */
export function withSEO<T extends Record<string, unknown>>(
  Component: React.ComponentType<T>,
  _defaultOptions: Omit<NextJSMetadataOptions, 'page'>
) {
  const WrappedComponent = (props: T) => {
    return React.createElement(Component, props);
  };

  WrappedComponent.displayName = `withSEO(${Component.displayName || Component.name})`;

  return WrappedComponent;
}
