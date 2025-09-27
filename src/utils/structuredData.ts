/**
 * @fileoverview Structured Data Utilities
 * @description JSON-LD structured data generation for Schema.org
 */

import type {
  FAQItem,
  Page,
  ProductData,
  SiteSettings,
  StructuredDataConfig,
} from '../types/index.js';

/**
 * Generate JSON-LD structured data
 */
export function generateStructuredData(config: StructuredDataConfig): string {
  const { baseUrl, siteSettings, page, breadcrumbs } = config;

  const structuredData: Record<string, unknown>[] = [];

  // Website/Organization schema (always included)
  structuredData.push(generateWebsiteSchema(baseUrl, siteSettings));

  // Page-specific schemas
  if (page) {
    structuredData.push(generateArticleSchema(baseUrl, siteSettings, page));
  }

  // Breadcrumb schema (if provided)
  if (breadcrumbs && breadcrumbs.length > 0) {
    structuredData.push(generateBreadcrumbSchema(baseUrl, breadcrumbs));
  }

  return JSON.stringify(structuredData, null, 2);
}

/**
 * Generate Website/Organization schema
 */
function generateWebsiteSchema(
  baseUrl: string,
  siteSettings: SiteSettings
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteSettings.siteName || 'Website',
    description: siteSettings.siteDescription || 'A modern website',
    url: baseUrl,
    publisher: {
      '@type': 'Organization',
      name: siteSettings.siteName || 'Website',
      description: siteSettings.siteDescription || 'A modern website',
      url: baseUrl,
      ...(siteSettings.logo && {
        logo: {
          '@type': 'ImageObject',
          url: siteSettings.logo.url,
        },
      }),
      ...(siteSettings.socialMedia && {
        sameAs: Object.values(siteSettings.socialMedia).filter(Boolean),
      }),
      ...(siteSettings.contactInfo && {
        contactPoint: {
          '@type': 'ContactPoint',
          ...(siteSettings.contactInfo.email && {
            email: siteSettings.contactInfo.email,
          }),
          ...(siteSettings.contactInfo.phone && {
            telephone: siteSettings.contactInfo.phone,
          }),
        },
      }),
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Article schema for Pages
 */
function generateArticleSchema(
  baseUrl: string,
  siteSettings: SiteSettings,
  page: Page
): Record<string, unknown> {
  const pageUrl = `${baseUrl}/pages/${page.slug}`;
  const publishedDate = page.publishedDate || page.createdAt;
  const modifiedDate = page.updatedAt;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description:
      page.seo?.description ||
      page.excerpt ||
      siteSettings.siteDescription ||
      'A modern website',
    url: pageUrl,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: {
      '@type': 'Organization',
      name: siteSettings.siteName || 'Website',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteSettings.siteName || 'Website',
      url: baseUrl,
      ...(siteSettings.logo && {
        logo: {
          '@type': 'ImageObject',
          url: siteSettings.logo.url,
        },
      }),
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    ...(page.featuredImage && {
      image: {
        '@type': 'ImageObject',
        url: page.featuredImage.url,
        ...(page.featuredImage.alt && { caption: page.featuredImage.alt }),
      },
    }),
    ...(page.seo?.keywords && {
      keywords: page.seo.keywords,
    }),
  };
}

/**
 * Generate Breadcrumb schema
 */
function generateBreadcrumbSchema(
  baseUrl: string,
  breadcrumbs: Array<{ name: string; url: string }>
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url.startsWith('http') ? crumb.url : `${baseUrl}${crumb.url}`,
    })),
  };
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(faqs: FAQItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate LocalBusiness schema
 */
export function generateLocalBusinessSchema(
  baseUrl: string,
  siteSettings: SiteSettings
): Record<string, unknown> | null {
  if (!siteSettings.contactInfo?.address) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteSettings.siteName || 'Website',
    description: siteSettings.siteDescription || 'A modern website',
    url: baseUrl,
    ...(siteSettings.logo && {
      image: siteSettings.logo.url,
    }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteSettings.contactInfo.address,
    },
    ...(siteSettings.contactInfo.phone && {
      telephone: siteSettings.contactInfo.phone,
    }),
    ...(siteSettings.contactInfo.email && {
      email: siteSettings.contactInfo.email,
    }),
  };
}

/**
 * Generate Product schema
 */
export function generateProductSchema(
  baseUrl: string,
  product: ProductData
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: baseUrl,
    ...(product.image && {
      image: product.image,
    }),
    ...(product.price &&
      product.currency && {
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: product.currency,
          availability: product.availability || 'https://schema.org/InStock',
        },
      }),
  };
}
