/**
 * @fileoverview SEO Head Component
 * @description React component for rendering SEO meta tags
 */

import type { SEOHeadProps } from '../types/index.js';

/**
 * SEOHead component for rendering meta tags
 */
export function SEOHead({ seo }: SEOHeadProps) {
  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />

      {seo.keywords && <meta name="keywords" content={seo.keywords} />}

      {/* Open Graph tags */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content={seo.type || 'website'} />

      {seo.url && <meta property="og:url" content={seo.url} />}
      {seo.image && <meta property="og:image" content={seo.image} />}

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.image && <meta name="twitter:image" content={seo.image} />}

      {/* Structured Data */}
      {seo.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: seo.structuredData }}
        />
      )}
    </>
  );
}
