# SEO Playground

An interactive demo for the `@alloylab/seo` package that allows you to test and explore SEO functionality across different frameworks.

## Features

### 🎯 **Interactive SEO Generation**

- Test SEO data generation with real-time output
- Multiple example data sets (Page, Blog, Product)
- SEO scoring and suggestions
- Copy generated output to clipboard

### 🖥️ **Framework Examples**

- **React**: `useSEO` hook usage
- **Next.js**: App Router metadata generation
- **SvelteKit**: Load function integration
- **Vanilla JS**: Direct utility usage

### 📊 **SEO Analysis**

- Real-time SEO scoring (0-100)
- Character count validation for titles and descriptions
- Keyword suggestions
- Best practice recommendations

## Usage

1. **Open the playground**: Open `index.html` in your browser
2. **Load examples**: Use the example buttons to load different data sets
3. **Customize data**: Edit the JSON input to test your own data
4. **Generate SEO**: Click "Generate SEO" to see the output
5. **Copy results**: Use the "Copy" button to copy generated output

## Example Data Sets

### Page Example

Basic page with SEO fields for a company about page.

### Blog Example

Blog post with comprehensive SEO data including keywords and structured content.

### Product Example

E-commerce product page with optimized SEO for product discovery.

## Framework Integration

The playground demonstrates how to integrate the SEO package with:

- **React**: Using the `useSEO` hook for dynamic SEO management
- **Next.js**: Using `generateMetadata` for App Router
- **SvelteKit**: Using `generateSEOData` in load functions
- **Vanilla JS**: Direct utility functions for any JavaScript environment

## SEO Scoring

The playground provides real-time SEO scoring based on:

- **Title**: 25 points (30-60 characters)
- **Description**: 25 points (120-160 characters)
- **Keywords**: 15 points (present)
- **URL**: 15 points (present)
- **Type**: 20 points (website/article)

Total possible score: 100 points

## Getting Started

1. Clone the repository
2. Open `examples/playground/index.html` in your browser
3. Start experimenting with different SEO data sets
4. Use the framework examples to understand integration patterns

## Contributing

Feel free to add more example data sets or improve the playground functionality!
