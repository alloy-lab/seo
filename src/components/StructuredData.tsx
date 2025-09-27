/**
 * @fileoverview Structured Data Component
 * @description React component for injecting JSON-LD structured data
 */

import type {
  Page,
  SiteSettings,
  StructuredDataProps,
} from '../types/index.js';
import { generateStructuredData } from '../utils/structuredData.js';

/**
 * StructuredData component for injecting JSON-LD into pages
 */
export function StructuredData({
  baseUrl,
  siteSettings,
  page,
  breadcrumbs,
}: StructuredDataProps) {
  const structuredData = generateStructuredData({
    baseUrl,
    siteSettings,
    page,
    breadcrumbs,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: structuredData }}
    />
  );
}

/**
 * Hook for generating structured data in components
 */
export function useStructuredData(
  baseUrl: string,
  siteSettings: SiteSettings,
  page?: Page,
  breadcrumbs?: Array<{ name: string; url: string }>
) {
  return generateStructuredData({
    baseUrl,
    siteSettings,
    page: page || undefined,
    breadcrumbs: breadcrumbs || undefined,
  });
}
