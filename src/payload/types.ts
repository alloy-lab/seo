/**
 * @fileoverview Payload CMS SEO Types
 * @description Type definitions for Payload CMS integration
 */

// Payload types are optional peer dependencies
type Field = Record<string, unknown>;
type Plugin = Record<string, unknown>;

export interface PayloadSEOOptions {
  /** Collections to add SEO fields to */
  collections?: string[];
  /** Globals to add SEO fields to */
  globals?: string[];
  /** Auto-generate SEO data */
  autoGenerate?: boolean;
  /** Show SEO preview in admin */
  preview?: boolean;
  /** Custom field mappings */
  fieldMappings?: {
    titleField?: string;
    descriptionField?: string;
    imageField?: string;
    slugField?: string;
  };
  /** Site settings collection/global name */
  siteSettings?: string;
}

export interface PayloadSEOConfig {
  options: PayloadSEOOptions;
  collections: string[];
  globals: string[];
}

export interface PayloadSEOPlugin extends Plugin {
  name: 'seo';
  onInit?: (payload: Record<string, unknown>) => void;
  collections?: Array<{
    slug: string;
    fields: Field[];
    hooks?: Record<string, unknown>;
  }>;
  globals?: Array<{
    slug: string;
    fields: Field[];
  }>;
}
