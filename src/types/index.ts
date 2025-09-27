/**
 * @fileoverview SEO Package Types
 * @description Core type definitions for SEO utilities and components
 */

export interface SEOData {
  title: string;
  description: string;
  keywords?: string | undefined;
  image?: string | undefined;
  url?: string | undefined;
  type?: string | undefined;
  structuredData?: string | undefined;
}

export interface SEOHeadProps {
  seo: SEOData;
}

export interface StructuredDataProps {
  baseUrl: string;
  siteSettings: SiteSettings;
  page?: Page;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

export interface StructuredDataConfig {
  baseUrl: string;
  siteSettings: SiteSettings;
  page?: Page | undefined;
  breadcrumbs?:
    | Array<{
        name: string;
        url: string;
      }>
    | undefined;
}

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority: number;
}

export interface SitemapConfig {
  baseUrl: string;
  includeHomepage?: boolean;
  homepagePriority?: number;
  pagePriority?: number;
  defaultChangefreq?: SitemapUrl['changefreq'];
}

// Base types for CMS integration
export interface Media {
  id: string;
  url: string;
  alt?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SEOFields {
  title?: string;
  description?: string;
  keywords?: string;
  image?: Media;
  noIndex?: boolean;
  noFollow?: boolean;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  excerpt?: string;
  featuredImage?: Media;
  seo?: SEOFields;
  publishedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  siteName?: string;
  siteDescription?: string;
  logo?: Media;
  socialMedia?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
}

// Schema.org types
export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProductData {
  name: string;
  description: string;
  price?: number;
  currency?: string;
  image?: string;
  availability?: string;
}
