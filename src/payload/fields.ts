/**
 * @fileoverview Payload CMS SEO Fields
 * @description Field definitions for SEO integration
 */

// Payload types are optional peer dependencies
type Field = Record<string, unknown>;

/**
 * Standard SEO fields for Payload CMS collections
 */
export const seoFields: Field[] = [
  {
    name: 'seo',
    type: 'group',
    label: 'SEO Settings',
    admin: {
      position: 'sidebar',
      description: 'Search engine optimization settings',
    },
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'SEO Title',
        admin: {
          description:
            'Custom SEO title (leave blank to auto-generate from page title)',
          placeholder: 'Auto-generated from page title',
        },
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Meta Description',
        maxLength: 160,
        admin: {
          description:
            'Meta description for search engines (160 characters max)',
          placeholder: 'Brief description of the page content',
        },
      },
      {
        name: 'keywords',
        type: 'text',
        label: 'Keywords',
        admin: {
          description: 'Comma-separated keywords for SEO',
          placeholder: 'keyword1, keyword2, keyword3',
        },
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Social Sharing Image',
        admin: {
          description: 'Image for social media sharing (Open Graph, Twitter)',
        },
      },
      {
        name: 'noIndex',
        type: 'checkbox',
        label: 'No Index',
        defaultValue: false,
        admin: {
          description: 'Prevent search engines from indexing this page',
        },
      },
      {
        name: 'canonicalUrl',
        type: 'text',
        label: 'Canonical URL',
        admin: {
          description: 'Canonical URL for this page (optional)',
          placeholder: 'https://example.com/page',
        },
      },
    ],
  },
];

/**
 * Enhanced SEO fields with additional options
 */
export const enhancedSeoFields: Field[] = [
  ...seoFields,
  {
    name: 'seoPreview',
    type: 'ui',
    admin: {
      components: {
        Field: 'SEOPreviewComponent',
      },
    },
  },
];

/**
 * Site settings SEO fields
 */
export const siteSeoFields: Field[] = [
  {
    name: 'seo',
    type: 'group',
    label: 'Site SEO Settings',
    fields: [
      {
        name: 'defaultTitle',
        type: 'text',
        label: 'Default Site Title',
        admin: {
          description: 'Default title for pages without custom SEO title',
        },
      },
      {
        name: 'defaultDescription',
        type: 'textarea',
        label: 'Default Meta Description',
        maxLength: 160,
        admin: {
          description:
            'Default meta description for pages without custom description',
        },
      },
      {
        name: 'defaultImage',
        type: 'upload',
        relationTo: 'media',
        label: 'Default Social Image',
        admin: {
          description: 'Default image for social media sharing',
        },
      },
      {
        name: 'twitterHandle',
        type: 'text',
        label: 'Twitter Handle',
        admin: {
          description: 'Twitter handle for social media cards (without @)',
          placeholder: 'yourhandle',
        },
      },
      {
        name: 'facebookAppId',
        type: 'text',
        label: 'Facebook App ID',
        admin: {
          description: 'Facebook App ID for social media integration',
        },
      },
    ],
  },
];
