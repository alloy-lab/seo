# Basic SEO Example

This example demonstrates how to use the `@alloylab/seo` package in a basic web application.

## Setup

1. Install the package:

```bash
npm install @alloylab/seo
```

2. Import the utilities and components you need:

```typescript
import {
  generateSEO,
  generateMetaTags,
  SEOHead,
  StructuredData,
} from '@alloylab/seo';
```

## Usage

### Basic SEO Generation

```typescript
import { generateSEO, generateMetaTags } from '@alloylab/seo';

const siteSettings = {
  siteName: 'My Website',
  siteDescription: 'A modern website built with Overland Stack',
  logo: {
    id: '1',
    url: 'https://example.com/logo.png',
    alt: 'My Website Logo',
    filename: 'logo.png',
    mimeType: 'image/png',
    filesize: 1024,
    width: 200,
    height: 100,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
};

const page = {
  id: '1',
  title: 'About Us',
  slug: 'about',
  status: 'published' as const,
  excerpt: 'Learn more about our company and mission',
  seo: {
    title: 'About Our Company - My Website',
    description:
      'Discover our company story, mission, and values. Learn about our team and what drives us forward.',
    keywords: 'about, company, mission, team, values',
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

### React Component Usage

```tsx
import React from 'react';
import { SEOHead, StructuredData } from '@alloylab/seo';

function AboutPage() {
  const seo = generateSEO(page, siteSettings, 'page', 'https://example.com');

  return (
    <html>
      <head>
        <SEOHead seo={seo} />
        <StructuredData
          baseUrl="https://example.com"
          siteSettings={siteSettings}
          page={page}
          breadcrumbs={[
            { name: 'Home', url: '/' },
            { name: 'About', url: '/about' },
          ]}
        />
      </head>
      <body>
        <h1>{page.title}</h1>
        <p>{page.excerpt}</p>
      </body>
    </html>
  );
}
```

### Sitemap Generation

```typescript
import {
  generateSitemapUrls,
  generateSitemapXML,
  generateRobotsTxt,
} from '@alloylab/seo';

const pages = [
  {
    id: '1',
    title: 'Home',
    slug: 'home',
    status: 'published' as const,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'About',
    slug: 'about',
    status: 'published' as const,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
];

// Generate sitemap URLs
const urls = generateSitemapUrls(pages, siteSettings, {
  baseUrl: 'https://example.com',
  includeHomepage: true,
  homepagePriority: 1.0,
  pagePriority: 0.8,
  defaultChangefreq: 'weekly',
});

// Generate XML sitemap
const sitemapXML = generateSitemapXML(urls);

// Generate robots.txt
const robotsTxt = generateRobotsTxt('https://example.com');
```

## Output

The generated meta tags will look like this:

```html
<title>About Our Company - My Website</title>
<meta
  name="description"
  content="Discover our company story, mission, and values. Learn about our team and what drives us forward."
/>
<meta name="keywords" content="about, company, mission, team, values" />
<meta property="og:title" content="About Our Company - My Website" />
<meta
  property="og:description"
  content="Discover our company story, mission, and values. Learn about our team and what drives us forward."
/>
<meta property="og:type" content="article" />
<meta property="og:url" content="https://example.com/pages/about" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="About Our Company - My Website" />
<meta
  name="twitter:description"
  content="Discover our company story, mission, and values. Learn about our team and what drives us forward."
/>
```

The generated structured data will include JSON-LD for the website, article, and breadcrumb schemas.
