/**
 * @fileoverview Payload CMS Admin Components
 * @description Admin UI components for SEO management
 */

// Payload types are optional peer dependencies
type AdminConfig = Record<string, unknown>;

/**
 * SEO preview component for Payload admin
 */
export const SEOPreviewComponent = ({
  value,
  _path,
}: {
  value: any;
  _path: string;
}) => {
  // This would be a React component in a real implementation
  return {
    name: 'SEOPreview',
    component: 'div',
    props: {
      style: {
        border: '1px solid #e1e5e9',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px 0',
        backgroundColor: '#f6f8fa',
      },
    },
    children: [
      {
        name: 'h3',
        props: {
          style: { margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' },
        },
        children: 'SEO Preview',
      },
      {
        name: 'div',
        props: { style: { marginBottom: '8px' } },
        children: [
          {
            name: 'strong',
            children: 'Title: ',
          },
          {
            name: 'span',
            children: value?.title || 'Auto-generated title',
          },
        ],
      },
      {
        name: 'div',
        props: { style: { marginBottom: '8px' } },
        children: [
          {
            name: 'strong',
            children: 'Description: ',
          },
          {
            name: 'span',
            children: value?.description || 'No description provided',
          },
        ],
      },
      {
        name: 'div',
        props: { style: { marginBottom: '8px' } },
        children: [
          {
            name: 'strong',
            children: 'Keywords: ',
          },
          {
            name: 'span',
            children: value?.keywords || 'No keywords provided',
          },
        ],
      },
    ],
  };
};

/**
 * SEO score component for Payload admin
 */
export const SEOScoreComponent = ({
  value,
  _path,
}: {
  value: any;
  _path: string;
}) => {
  const calculateScore = (seoData: any) => {
    let score = 0;
    const issues: string[] = [];
    const suggestions: string[] = [];

    // Check title
    if (seoData?.title) {
      if (seoData.title.length >= 30 && seoData.title.length <= 60) {
        score += 25;
      } else {
        issues.push('Title length should be 30-60 characters');
      }
    } else {
      issues.push('Missing SEO title');
    }

    // Check description
    if (seoData?.description) {
      if (
        seoData.description.length >= 120 &&
        seoData.description.length <= 160
      ) {
        score += 25;
      } else {
        issues.push('Description length should be 120-160 characters');
      }
    } else {
      issues.push('Missing meta description');
    }

    // Check keywords
    if (seoData?.keywords) {
      score += 15;
    } else {
      suggestions.push('Consider adding relevant keywords');
    }

    // Check image
    if (seoData?.image) {
      score += 20;
    } else {
      suggestions.push('Consider adding a social sharing image');
    }

    // Check noIndex
    if (!seoData?.noIndex) {
      score += 15;
    }

    return { score, issues, suggestions };
  };

  const { score, issues, suggestions } = calculateScore(value);

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#28a745';
    if (score >= 60) return '#ffc107';
    return '#dc3545';
  };

  return {
    name: 'SEOScore',
    component: 'div',
    props: {
      style: {
        border: '1px solid #e1e5e9',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px 0',
        backgroundColor: '#f6f8fa',
      },
    },
    children: [
      {
        name: 'h3',
        props: {
          style: { margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' },
        },
        children: 'SEO Score',
      },
      {
        name: 'div',
        props: {
          style: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px',
          },
        },
        children: [
          {
            name: 'div',
            props: {
              style: {
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: getScoreColor(score),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                marginRight: '12px',
              },
            },
            children: `${score}/100`,
          },
          {
            name: 'div',
            children: [
              {
                name: 'div',
                props: { style: { fontWeight: '600', marginBottom: '4px' } },
                children:
                  score >= 80
                    ? 'Excellent!'
                    : score >= 60
                      ? 'Good'
                      : 'Needs Improvement',
              },
              {
                name: 'div',
                props: { style: { fontSize: '14px', color: '#666' } },
                children: `${issues.length} issues, ${suggestions.length} suggestions`,
              },
            ],
          },
        ],
      },
      ...(issues.length > 0
        ? [
            {
              name: 'div',
              props: { style: { marginBottom: '8px' } },
              children: [
                {
                  name: 'strong',
                  props: { style: { color: '#dc3545' } },
                  children: 'Issues: ',
                },
                {
                  name: 'ul',
                  props: { style: { margin: '4px 0', paddingLeft: '20px' } },
                  children: issues.map((issue: string) => ({
                    name: 'li',
                    children: issue,
                  })),
                },
              ],
            },
          ]
        : []),
      ...(suggestions.length > 0
        ? [
            {
              name: 'div',
              children: [
                {
                  name: 'strong',
                  props: { style: { color: '#ffc107' } },
                  children: 'Suggestions: ',
                },
                {
                  name: 'ul',
                  props: { style: { margin: '4px 0', paddingLeft: '20px' } },
                  children: suggestions.map((suggestion: string) => ({
                    name: 'li',
                    children: suggestion,
                  })),
                },
              ],
            },
          ]
        : []),
    ],
  };
};

/**
 * Admin components configuration
 */
export const seoAdminComponents: Partial<AdminConfig> = {
  components: {
    fields: {
      SEOPreview: SEOPreviewComponent,
      SEOScore: SEOScoreComponent,
    },
  },
};
