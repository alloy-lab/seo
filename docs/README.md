# @alloylab/seo Documentation

This directory contains the documentation and playground for the @alloylab/seo package, designed to be deployed to GitHub Pages.

## 📁 Structure

```
docs/
├── index.html          # Main documentation page
├── playground.html     # Interactive playground
├── api.html           # API reference (auto-generated)
├── assets/            # Built package files
│   ├── dist/          # Compiled SEO package
│   └── package.json   # Package metadata
└── README.md          # This file
```

## 🚀 Deployment

The documentation is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment is handled by the GitHub Actions workflow at `.github/workflows/deploy-seo-docs.yml`.

### Manual Deployment

If you need to deploy manually:

1. **Build the package:**

   ```bash
   cd packages/seo
   pnpm build
   ```

2. **Prepare docs:**

   ```bash
   mkdir -p docs/assets
   cp -r dist docs/assets/
   cp package.json docs/assets/
   ```

3. **Deploy to GitHub Pages:**
   - Go to repository Settings → Pages
   - Select "GitHub Actions" as source
   - The workflow will handle the rest

## 🎮 Playground Features

The playground (`playground.html`) includes:

- **Interactive Data Input**: JSON editor for testing different configurations
- **Real-time Output**: See generated SEO data, meta tags, and structured data
- **Framework Examples**: Code examples for React, Next.js, SvelteKit, and Vanilla JS
- **Multiple Examples**: Pre-built examples for different content types
- **Copy Functionality**: Easy copying of generated output

## 📚 Documentation Features

The main documentation (`index.html`) includes:

- **Feature Overview**: Comprehensive list of package capabilities
- **Installation Instructions**: Package manager commands
- **Usage Examples**: Framework-specific code examples
- **API Reference**: Complete function documentation
- **Payload CMS Integration**: Plugin setup and usage
- **Interactive Playground**: Direct link to the playground

## 🔧 Development

To work on the documentation locally:

1. **Build the docs:**

   ```bash
   cd packages/seo
   pnpm docs:build
   ```

2. **Start a local server:**

   ```bash
   # Option 1: Custom Node.js server (recommended)
   pnpm docs:serve

   # Option 2: Python server (fallback)
   pnpm docs:serve:python
   ```

3. **Open in browser:**
   ```
   http://localhost:8080
   ```

## 🎨 Styling

The documentation uses:

- **Modern CSS**: Flexbox, Grid, and modern selectors
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Proper semantic HTML and ARIA labels
- **Performance**: Optimized images and minimal dependencies

## 📝 Content Guidelines

When updating documentation:

1. **Keep it current**: Update examples when the API changes
2. **Test examples**: Ensure all code examples work
3. **Mobile-friendly**: Test on different screen sizes
4. **Accessible**: Use proper heading hierarchy and alt text
5. **Fast loading**: Optimize images and minimize external dependencies

## 🔗 Links

- **Live Documentation**: https://alloylab.github.io/overland/packages/seo/
- **Playground**: https://alloylab.github.io/overland/packages/seo/playground.html
- **API Reference**: https://alloylab.github.io/overland/packages/seo/api.html
- **GitHub Repository**: https://github.com/alloy-lab/seo
