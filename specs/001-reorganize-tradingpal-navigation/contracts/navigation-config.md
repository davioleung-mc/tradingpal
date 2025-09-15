# VitePress Navigation Configuration Contract

## Interface: NavigationConfig

```typescript
interface NavigationConfig {
  title: string;
  description: string;
  themeConfig: ThemeConfig;
  rewrites?: Record<string, string>;
}

interface ThemeConfig {
  logo: string;
  search: {
    provider: 'local' | 'algolia';
  };
  nav: NavigationItem[];
  footer: FooterConfig;
  // Explicitly omit these properties
  socialLinks?: never;
  localeLinks?: never;
}

interface NavigationItem {
  text: string;
  link?: string;
  items?: NavigationItem[];
  activeMatch?: string;
}

interface FooterConfig {
  message: string;
  copyright: string;
}
```

## Contract Requirements

### Navigation Structure
- **MUST** have exactly 2 top-level navigation items
- **MUST** preserve logo linking to home page  
- **MUST** preserve search functionality
- **MUST** support hover-based dropdown menus
- **MUST NOT** include socialLinks (GitHub icon removal)
- **MUST NOT** include localeLinks (language switcher hidden)

### URL Structure  
- **MUST** use hierarchical paths: `/category/subcategory/`
- **MUST** end with trailing slash for directories
- **MUST** be SEO-friendly (readable, descriptive)
- **MUST** maintain consistency across all content

### Content Organization
- **MUST** organize all existing content under new structure
- **MUST** preserve content accessibility  
- **MUST NOT** lose any existing educational material
- **MUST** maintain proper content hierarchy

## Validation Schema

```typescript
// Navigation validation
function validateNavigation(nav: NavigationItem[]): boolean {
  return nav.length === 2 && 
         nav[0].text === 'Insights' &&
         nav[1].text === 'Resources' &&
         nav[0].items?.length === 2 &&
         nav[1].items?.length === 3;
}

// URL structure validation  
function validateURL(url: string): boolean {
  return url.startsWith('/') && 
         url.endsWith('/') &&
         url.match(/^\/[a-z-]+\/[a-z-]+\/$/) !== null;
}

// Content mapping validation
function validateContentMapping(mappings: ContentMapping[]): boolean {
  const oldPaths = new Set();
  const newPaths = new Set();
  
  for (const mapping of mappings) {
    if (oldPaths.has(mapping.oldPath) || newPaths.has(mapping.newPath)) {
      return false; // Duplicate paths
    }
    oldPaths.add(mapping.oldPath);
    newPaths.add(mapping.newPath);
  }
  
  return true;
}
```

## Expected Configuration Output

```typescript
export default {
  title: 'TradingPal',
  description: 'Your comprehensive guide to contract trading',
  
  themeConfig: {
    logo: '/favicon.svg',
    
    search: {
      provider: 'local'
    },
    
    nav: [
      {
        text: 'Insights',
        items: [
          { text: 'Market Analysis', link: '/insights/market-analysis/' },
          { text: 'Trading Strategy', link: '/insights/trading-strategy/' }
        ]
      },
      {
        text: 'Resources',
        items: [
          { text: 'Personal Finance Tips', link: '/resources/personal-finance-tips/' },
          { text: 'Tutorials', link: '/resources/tutorials/' },
          { text: 'Useful Links', link: '/resources/useful-links/' }
        ]
      }
    ],
    
    footer: {
      message: 'Educational content for trading knowledge',
      copyright: 'Copyright © 2025 TradingPal'
    }
  },
  
  rewrites: {
    'basics/(.*)': 'resources/tutorials/basics/$1',
    'faq/(.*)': 'resources/tutorials/faq/$1',
    'risk-management/(.*)': 'resources/personal-finance-tips/risk-management/$1',
    'tools/(.*)': 'resources/useful-links/tools/$1',
    'advanced-strategies/(.*)': 'insights/trading-strategy/advanced/$1'
  }
}
```
