/**
 * @fileoverview Payload CMS SEO Hooks
 * @description Hooks for automatic SEO generation and validation
 */

import type { SiteSettings } from '../types/index.js';
import { generateSEO } from '../utils/seo.js';

/**
 * SEO hooks for Payload CMS collections
 */
export const seoHooks = {
  beforeChange: [
    ({
      data,
      _operation,
      req,
    }: {
      data: any;
      _operation: string;
      req: any;
    }) => {
      // Auto-generate SEO title if not provided
      if (data.title && !data.seo?.title) {
        data.seo = {
          ...data.seo,
          title: `${data.title} | ${(req.payload as any)?.config?.globals?.site?.title || 'Site'}`,
        };
      }

      // Auto-generate SEO description from excerpt if not provided
      if (data.excerpt && !data.seo?.description) {
        data.seo = {
          ...data.seo,
          description: data.excerpt.substring(0, 160),
        };
      }

      // Validate SEO data
      if (data.seo?.description && data.seo.description.length > 160) {
        data.seo.description = data.seo.description.substring(0, 160);
      }

      // Auto-generate keywords from title if not provided
      if (data.title && !data.seo?.keywords) {
        const keywords = data.title
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .split(/\s+/)
          .filter((word: string) => word.length > 3)
          .slice(0, 5)
          .join(', ');

        if (keywords) {
          data.seo = {
            ...data.seo,
            keywords,
          };
        }
      }
    },
  ],

  afterRead: [
    ({ doc, req }: { doc: any; req: any }) => {
      // Add computed SEO data
      if (doc && req.payload) {
        try {
          const siteSettings: SiteSettings = {
            siteName:
              (req.payload as any)?.config?.globals?.site?.title || 'Site',
            siteDescription:
              (req.payload as any)?.config?.globals?.site?.description ||
              'A website',
          };

          const seoData = generateSEO(
            doc,
            siteSettings,
            'page',
            process.env.SITE_URL || 'https://example.com'
          );

          // Add computed SEO data to document
          doc.computedSEO = seoData;
        } catch (error) {
          console.warn('Error generating computed SEO data:', error);
        }
      }
    },
  ],

  afterChange: [
    ({ doc, operation, _req }: { doc: any; operation: string; _req: any }) => {
      // Log SEO changes
      if (doc.seo && operation === 'update') {
        console.log(`SEO updated for ${doc.title || doc.id}`);
      }
    },
  ],
};

/**
 * Site settings SEO hooks
 */
export const siteSeoHooks = {
  beforeChange: [
    ({
      data,
      _operation,
      _req,
    }: {
      data: any;
      _operation: string;
      _req: any;
    }) => {
      // Validate default SEO data
      if (
        data.seo?.defaultDescription &&
        data.seo.defaultDescription.length > 160
      ) {
        data.seo.defaultDescription = data.seo.defaultDescription.substring(
          0,
          160
        );
      }

      // Auto-generate default title if not provided
      if (data.title && !data.seo?.defaultTitle) {
        data.seo = {
          ...data.seo,
          defaultTitle: data.title,
        };
      }
    },
  ],
};
