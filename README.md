# @alloylab/seo

[![npm version](https://badge.fury.io/js/%40alloylab%2Fseo.svg)](https://badge.fury.io/js/%40alloy-lab%2Fseo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

SEO utilities and components for modern web applications. This package provides comprehensive SEO tools including meta tag generation, structured data (JSON-LD), sitemap generation, and React components.

## Features

- 🏷️ **Meta Tag Generation**: Automatic Open Graph, Twitter Cards, and standard meta tags
- 📊 **Structured Data**: JSON-LD schema generation for Schema.org
- 🗺️ **Sitemap Generation**: XML sitemap and robots.txt utilities
- ⚛️ **React Hooks**: `useSEO()` hook for React applications
- 🔥 **Next.js App Router**: `generateMetadata()` helper for App Router
- 🎯 **SvelteKit Support**: Native SvelteKit integration
- 📱 **React Components**: Ready-to-use SEO components for React applications
- 🔧 **TypeScript Support**: Full TypeScript definitions and type safety
- 📦 **Framework Agnostic**: Works with any frontend framework
- ⚡ **Performance**: Optimized for speed and bundle size (< 1KB core)
- 🎯 **SEO Optimized**: Follows best practices for search engine optimization

## Installation

```bash
npm install @alloylab/seo
# or
yarn add @alloylab/seo
# or
pnpm add @alloylab/seo
```

## Quick Start

### Framework-Specific Usage

#### React with Hooks

```typescript
import { useSEO } from '@alloylab/seo';

function MyPage({ page }) {
  const { title, description, metaTags } = useSEO({
    siteSettings: { siteName: 'My Site' },
    page,
    baseUrl: 'https://mysite.com',
    type: 'page'
  });

  return (
    <div>
      <head>{metaTags}</head>
      <h1>{title}</h1>
    </div>
  );
}
```

#### Next.js App Router

```typescript
import { generateMetadata } from '@alloylab/seo/nextjs';

export async function generateMetadata({ params }) {
  const page = await getPage(params.slug);

  return generateMetadata({
    siteSettings: { siteName: 'My Site' },
    page,
    baseUrl: 'https://mysite.com',
    type: 'page',
  });
}
```

#### SvelteKit

```typescript
// +page.ts
import { generateSEOData } from '@alloylab/seo/sveltekit';

export const load = async () => {
  const seo = generateSEOData({
    siteSettings: { siteName: 'My Site' },
    baseUrl: 'https://mysite.com',
    type: 'home',
  });

  return { seo };
};
```

### 1. Basic SEO Generation

```typescript
import { generateSEO, generateMetaTags } from '@alloylab/seo';

const siteSettings = {
  siteName: 'My Website',
  siteDescription: 'A modern website',
};

const page = {
  id: '1',
  title: 'About Us',
  slug: 'about',
  status: 'published',
  seo: {
    title: 'About Our Company',
    description: 'Learn more about our company and mission',
    keywords: 'about, company, mission',
  },
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

// Generate SEO data
const seo = generateSEO(page, siteSettings, 'page', 'https://example.com');

// Generate HTML meta tags
const metaTags = generateMetaTags(seo);
console.log(metaTags);
```

### 2. React Components

```tsx
import { SEOHead, StructuredData } from '@alloylab/seo';

function MyPage() {
  const seo = generateSEO(page, siteSettings, 'page', 'https://example.com');

  return (
    <html>
      <head>
        <SEOHead seo={seo} />
        <StructuredData
          baseUrl="https://example.com"
          siteSettings={siteSettings}
          page={page}
        />
      </head>
      <body>
        <h1>{page.title}</h1>
      </body>
    </html>
  );
}
```

### 3. Sitemap Generation

```typescript
import {
  generateSitemapUrls,
  generateSitemapXML,
  generateRobotsTxt,
} from '@alloylab/seo';

const pages = [
  /* your pages array */
];
const siteSettings = {
  /* your site settings */
};

// Generate sitemap URLs
const urls = generateSitemapUrls(pages, siteSettings, {
  baseUrl: 'https://example.com',
  includeHomepage: true,
  homepagePriority: 1.0,
  pagePriority: 0.8,
});

// Generate XML sitemap
const sitemapXML = generateSitemapXML(urls);

// Generate robots.txt
const robotsTxt = generateRobotsTxt('https://example.com');
```

## API Reference

### Components

#### `SEOHead`

React component for rendering SEO meta tags.

```tsx
interface SEOHeadProps {
  seo: SEOData;
}

<SEOHead seo={seoData} />;
```

#### `StructuredData`

React component for injecting JSON-LD structured data.

```tsx
interface StructuredDataProps {
  baseUrl: string;
  siteSettings: SiteSettings;
  page?: Page;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

<StructuredData
  baseUrl="https://example.com"
  siteSettings={siteSettings}
  page={page}
  breadcrumbs={breadcrumbs}
/>;
```

### Utilities

#### `generateSEO`

Generates comprehensive SEO data for pages or site settings.

```typescript
function generateSEO(
  data: Page | SiteSettings,
  siteSettings: SiteSettings,
  type: 'page' | 'home' = 'home',
  baseUrl?: string,
  breadcrumbs?: Array<{ name: string; url: string }>
): SEOData;
```

#### `generateMetaTags`

Generates HTML meta tags from SEO data.

```typescript
function generateMetaTags(seo: SEOData): string;
```

#### `generateStructuredData`

Generates JSON-LD structured data for Schema.org.

```typescript
function generateStructuredData(config: StructuredDataConfig): string;
```

#### `generateSitemapUrls`

Generates sitemap URLs from pages collection.

```typescript
function generateSitemapUrls(
  pages: Page[],
  siteSettings: SiteSettings,
  config?: Partial<SitemapConfig>
): SitemapUrl[];
```

#### `generateSitemapXML`

Generates XML sitemap from URLs.

```typescript
function generateSitemapXML(urls: SitemapUrl[]): string;
```

#### `generateRobotsTxt`

Generates robots.txt content.

```typescript
function generateRobotsTxt(baseUrl: string): string;
```

## Schema.org Support

The package includes utilities for generating various Schema.org structured data types:

- **WebSite**: Basic website information
- **Article**: Blog posts and articles
- **BreadcrumbList**: Navigation breadcrumbs
- **FAQPage**: Frequently asked questions
- **LocalBusiness**: Local business information
- **Product**: E-commerce products

### Example: FAQ Schema

```typescript
import { generateFAQSchema } from '@alloylab/seo';

const faqs = [
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for all products.',
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days.',
  },
];

const faqSchema = generateFAQSchema(faqs);
```

## Type Definitions

The package provides comprehensive TypeScript definitions:

```typescript
interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: string;
}

interface Page {
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

interface SiteSettings {
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
```

## Integration Examples

### Next.js

```tsx
// pages/_document.tsx
import { SEOHead } from '@alloylab/seo';

export default function Document() {
  return (
    <Html>
      <Head>
        <SEOHead seo={seoData} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

### React Router

```tsx
// app/root.tsx
import { SEOHead } from '@alloylab/seo';

export default function Root() {
  return (
    <html>
      <head>
        <SEOHead seo={seoData} />
      </head>
      <body>
        <Outlet />
      </body>
    </html>
  );
}
```

### SvelteKit

```svelte
<!-- app.html -->
<script>
  import { generateSEO, generateMetaTags } from '@alloylab/seo';

  export let seoData;
  const metaTags = generateMetaTags(seoData);
</script>

<head>
  {@html metaTags}
</head>
```

## Best Practices

1. **Always provide fallbacks**: Use site settings as fallbacks for missing page SEO data
2. **Include structured data**: Add JSON-LD structured data for better search engine understanding
3. **Generate sitemaps**: Automatically generate and update sitemaps for better crawling
4. **Use proper meta tags**: Include Open Graph and Twitter Card meta tags for social sharing
5. **Validate your data**: Use TypeScript types to ensure data integrity

## Contributing

Contributions are welcome! Please read our [Contributing Guide](../../CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

## Support

- 📖 [Documentation](https://github.com/alloy-lab/overland/tree/main/packages/seo#readme)
- 🐛 [Issue Tracker](https://github.com/alloy-lab/overland/issues)
- 💬 [Discussions](https://github.com/alloy-lab/overland/discussions)
