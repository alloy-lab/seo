/**
 * @fileoverview Payload CMS SEO Plugin
 * @description Main plugin for Payload CMS integration
 */

// Payload types are optional peer dependencies
import { seoAdminComponents } from './admin.js';
import { seoFields, siteSeoFields } from './fields.js';
import { seoHooks, siteSeoHooks } from './hooks.js';
import type { PayloadSEOOptions, PayloadSEOPlugin } from './types.js';

/**
 * Create SEO plugin for Payload CMS
 *
 * @example
 * ```typescript
 * import { seoPlugin } from '@alloylab/seo/payload';
 *
 * export default buildConfig({
 *   plugins: [
 *     seoPlugin({
 *       collections: ['pages', 'posts'],
 *       globals: ['site'],
 *       autoGenerate: true,
 *       preview: true
 *     })
 *   ]
 * });
 * ```
 */
export function seoPlugin(options: PayloadSEOOptions = {}): PayloadSEOPlugin {
  const {
    collections = ['pages'],
    globals = ['site'],
    autoGenerate = true,
    preview = true,
    fieldMappings = {},
    siteSettings = 'site',
  } = options;

  return {
    name: 'seo',

    onInit: (payload: any) => {
      console.log('🔍 SEO Plugin initialized for Payload CMS');

      // Register global SEO utilities
      if (payload.config) {
        payload.config.globals = payload.config.globals || {};
        payload.config.globals.seo = {
          ...payload.config.globals.seo,
          autoGenerate,
          preview,
          fieldMappings,
        };
      }
    },

    collections: collections.map((collectionSlug) => ({
      slug: collectionSlug,
      fields: preview
        ? [
            ...seoFields,
            {
              name: 'seoPreview',
              type: 'ui',
              admin: {
                components: {
                  Field: 'SEOPreview',
                },
              },
            },
            {
              name: 'seoScore',
              type: 'ui',
              admin: {
                components: {
                  Field: 'SEOScore',
                },
              },
            },
          ]
        : seoFields,
      hooks: autoGenerate ? (seoHooks as any) : undefined,
    })),

    globals: globals.map((globalSlug) => ({
      slug: globalSlug,
      fields: globalSlug === siteSettings ? siteSeoFields : seoFields,
      hooks:
        globalSlug === siteSettings && autoGenerate
          ? (siteSeoHooks as any)
          : undefined,
    })),

    // Add admin components
    ...seoAdminComponents,
  };
}

/**
 * Helper function to add SEO fields to existing collections
 *
 * @example
 * ```typescript
 * import { addSeoFields } from '@alloylab/seo/payload';
 *
 * export const Pages: CollectionConfig = {
 *   slug: 'pages',
 *   fields: [
 *     // ... existing fields
 *     ...addSeoFields({ preview: true })
 *   ]
 * };
 * ```
 */
export function addSeoFields(
  options: { preview?: boolean; score?: boolean } = {}
) {
  const { preview = false, score = false } = options;

  const fields = [...seoFields];

  if (preview) {
    fields.push({
      name: 'seoPreview',
      type: 'ui',
      admin: {
        components: {
          Field: 'SEOPreview',
        },
      },
    });
  }

  if (score) {
    fields.push({
      name: 'seoScore',
      type: 'ui',
      admin: {
        components: {
          Field: 'SEOScore',
        },
      },
    });
  }

  return fields;
}

/**
 * Helper function to add SEO hooks to existing collections
 */
export function addSeoHooks() {
  return seoHooks;
}
