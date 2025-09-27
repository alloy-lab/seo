#!/usr/bin/env node

/**
 * @fileoverview SEO CLI Tool
 * @description Command-line interface for SEO utilities
 */

import { Command } from 'commander';
import { existsSync, readFileSync, writeFileSync } from 'fs';

interface SitemapOptions {
  input?: string;
  output?: string;
  baseUrl?: string;
}

interface RobotsOptions {
  output?: string;
  baseUrl?: string;
}

interface AuditOptions {
  input?: string;
  output?: string;
}

interface ValidateOptions {
  input?: string;
}

const program = new Command();

program.name('seo-cli').description('SEO utilities and tools').version('1.0.0');

program
  .command('sitemap')
  .description('Generate sitemap.xml')
  .option('-i, --input <file>', 'Input JSON file with pages data')
  .option('-o, --output <file>', 'Output sitemap.xml file', 'sitemap.xml')
  .option(
    '-b, --base-url <url>',
    'Base URL for the site',
    'https://example.com'
  )
  .action(async (options: SitemapOptions) => {
    try {
      const { generateSitemapXML, generateSitemapUrls } = await import(
        '../utils/sitemap.js'
      );

      if (!options.input || !existsSync(options.input)) {
        console.error('❌ Input file not found:', options.input);
        process.exit(1);
      }

      const pagesData = JSON.parse(readFileSync(options.input, 'utf8'));
      const siteSettings = {
        siteName: 'My Site',
        siteDescription: 'A website',
      };

      const urls = generateSitemapUrls(pagesData, siteSettings, {
        baseUrl: options.baseUrl || 'https://example.com',
      });

      const sitemap = generateSitemapXML(urls);
      writeFileSync(options.output || 'sitemap.xml', sitemap);

      console.log(`✅ Sitemap generated: ${options.output}`);
      console.log(`📊 ${urls.length} URLs included`);
    } catch (error) {
      console.error('❌ Error generating sitemap:', error);
      process.exit(1);
    }
  });

program
  .command('robots')
  .description('Generate robots.txt')
  .option('-o, --output <file>', 'Output robots.txt file', 'robots.txt')
  .option(
    '-b, --base-url <url>',
    'Base URL for the site',
    'https://example.com'
  )
  .action(async (options: RobotsOptions) => {
    try {
      const { generateRobotsTxt } = await import('../utils/sitemap.js');

      const robots = generateRobotsTxt(
        options.baseUrl || 'https://example.com'
      );
      writeFileSync(options.output || 'robots.txt', robots);

      console.log(`✅ Robots.txt generated: ${options.output}`);
    } catch (error) {
      console.error('❌ Error generating robots.txt:', error);
      process.exit(1);
    }
  });

program
  .command('audit')
  .description('Audit SEO data')
  .option('-i, --input <file>', 'Input JSON file with SEO data')
  .option('-o, --output <file>', 'Output audit report file')
  .action(async (options: AuditOptions) => {
    try {
      if (!options.input || !existsSync(options.input)) {
        console.error('❌ Input file not found:', options.input);
        process.exit(1);
      }

      const seoData = JSON.parse(readFileSync(options.input, 'utf8'));
      const audit = await auditSEOData(seoData);

      if (options.output) {
        writeFileSync(options.output, JSON.stringify(audit, null, 2));
        console.log(`✅ Audit report generated: ${options.output}`);
      } else {
        console.log('📊 SEO Audit Results:');
        console.log(JSON.stringify(audit, null, 2));
      }
    } catch (error) {
      console.error('❌ Error auditing SEO data:', error);
      process.exit(1);
    }
  });

program
  .command('validate')
  .description('Validate structured data')
  .option('-i, --input <file>', 'Input JSON file with structured data')
  .action(async (options: ValidateOptions) => {
    try {
      if (!options.input || !existsSync(options.input)) {
        console.error('❌ Input file not found:', options.input);
        process.exit(1);
      }

      const structuredData = JSON.parse(readFileSync(options.input, 'utf8'));
      const validation = await validateStructuredData(structuredData);

      console.log('📊 Structured Data Validation:');
      console.log(JSON.stringify(validation, null, 2));
    } catch (error) {
      console.error('❌ Error validating structured data:', error);
      process.exit(1);
    }
  });

async function auditSEOData(seoData: Record<string, unknown>) {
  const issues: string[] = [];
  const suggestions: string[] = [];

  // Check title
  const title = seoData.title as string | undefined;
  if (!title || title.length < 30) {
    issues.push('Title is too short (minimum 30 characters recommended)');
  }
  if (title && title.length > 60) {
    issues.push('Title is too long (maximum 60 characters recommended)');
  }

  // Check description
  const description = seoData.description as string | undefined;
  if (!description || description.length < 120) {
    issues.push(
      'Description is too short (minimum 120 characters recommended)'
    );
  }
  if (description && description.length > 160) {
    issues.push('Description is too long (maximum 160 characters recommended)');
  }

  // Check keywords
  if (!seoData.keywords) {
    suggestions.push('Consider adding relevant keywords');
  }

  // Check image
  if (!seoData.image) {
    suggestions.push('Consider adding an Open Graph image');
  }

  return {
    score: Math.max(0, 100 - issues.length * 20 - suggestions.length * 5),
    issues,
    suggestions,
    timestamp: new Date().toISOString(),
  };
}

async function validateStructuredData(structuredData: Record<string, unknown>) {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Basic JSON-LD validation
  if (!structuredData['@context']) {
    errors.push('Missing @context property');
  }

  if (!structuredData['@type']) {
    errors.push('Missing @type property');
  }

  // Check for required properties based on type
  const type = structuredData['@type'] as string | undefined;
  if (type === 'Article') {
    if (!structuredData.headline) {
      errors.push('Article missing headline');
    }
    if (!structuredData.author) {
      warnings.push('Article missing author information');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    timestamp: new Date().toISOString(),
  };
}

program.parse();
