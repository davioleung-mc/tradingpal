# Data Model: Navigation Structure & Content Organization

## Navigation Structure Model

### NavigationItem Entity
```typescript
interface NavigationItem {
  text: string;           // Display text (e.g., "Insights", "Market Analysis")
  link?: string;          // Direct link for leaf items
  items?: NavigationItem[]; // Nested items for dropdown categories
  activeMatch?: string;   // Pattern for active state matching
}
```

### NavigationConfig Entity  
```typescript
interface NavigationConfig {
  logo: LogoConfig;       // Logo configuration with home link
  search: SearchConfig;   // Search box configuration  
  nav: NavigationItem[];  // Main navigation array
  socialLinks?: never;    // Explicitly disabled (remove GitHub icon)
  localeLinks?: never;    // Explicitly disabled (hide language switcher)
}
```

### Target Navigation Structure
```typescript
const targetNavigation: NavigationItem[] = [
  {
    text: 'Insights',
    items: [
      { text: 'Market Analysis', link: '/insights/market-analysis/', activeMatch: '/insights/market-analysis/' },
      { text: 'Trading Strategy', link: '/insights/trading-strategy/', activeMatch: '/insights/trading-strategy/' }
    ]
  },
  {
    text: 'Resources',
    items: [
      { text: 'Personal Finance Tips', link: '/resources/personal-finance-tips/', activeMatch: '/resources/personal-finance-tips/' },
      { text: 'Tutorials', link: '/resources/tutorials/', activeMatch: '/resources/tutorials/' },
      { text: 'Useful Links', link: '/resources/useful-links/', activeMatch: '/resources/useful-links/' }
    ]
  }
];
```

## Content Mapping Model

### ContentMapping Entity
```typescript
interface ContentMapping {
  oldPath: string;        // Current file/directory path
  newPath: string;        // Target path after reorganization
  category: 'insights' | 'resources';
  subcategory: string;    // Specific subcategory
  redirectRequired: boolean; // Whether URL redirect is needed
}
```

### Content Migration Rules
```typescript
const contentMappings: ContentMapping[] = [
  // Basics content → Tutorials
  { oldPath: '/basics/', newPath: '/resources/tutorials/basics/', category: 'resources', subcategory: 'tutorials', redirectRequired: true },
  { oldPath: '/basics/what-is-contract-trading.md', newPath: '/resources/tutorials/basics/what-is-contract-trading.md', category: 'resources', subcategory: 'tutorials', redirectRequired: true },
  { oldPath: '/basics/contract-types.md', newPath: '/resources/tutorials/basics/contract-types.md', category: 'resources', subcategory: 'tutorials', redirectRequired: true },
  { oldPath: '/basics/leverage-and-margin.md', newPath: '/resources/tutorials/basics/leverage-and-margin.md', category: 'resources', subcategory: 'tutorials', redirectRequired: true },
  { oldPath: '/basics/choosing-platform.md', newPath: '/resources/tutorials/basics/choosing-platform.md', category: 'resources', subcategory: 'tutorials', redirectRequired: true },
  
  // FAQ content → Tutorials  
  { oldPath: '/faq/', newPath: '/resources/tutorials/faq/', category: 'resources', subcategory: 'tutorials', redirectRequired: true },
  { oldPath: '/faq/general.md', newPath: '/resources/tutorials/faq/general.md', category: 'resources', subcategory: 'tutorials', redirectRequired: true },
  { oldPath: '/faq/technical.md', newPath: '/resources/tutorials/faq/technical.md', category: 'resources', subcategory: 'tutorials', redirectRequired: true },
  { oldPath: '/faq/platform.md', newPath: '/resources/tutorials/faq/platform.md', category: 'resources', subcategory: 'tutorials', redirectRequired: true },
  { oldPath: '/faq/trading.md', newPath: '/resources/tutorials/faq/trading.md', category: 'resources', subcategory: 'tutorials', redirectRequired: true },
  
  // Risk Management → Personal Finance Tips
  { oldPath: '/risk-management/', newPath: '/resources/personal-finance-tips/risk-management/', category: 'resources', subcategory: 'personal-finance-tips', redirectRequired: true },
  { oldPath: '/risk-management/basics.md', newPath: '/resources/personal-finance-tips/risk-management/basics.md', category: 'resources', subcategory: 'personal-finance-tips', redirectRequired: true },
  { oldPath: '/risk-management/position-sizing.md', newPath: '/resources/personal-finance-tips/risk-management/position-sizing.md', category: 'resources', subcategory: 'personal-finance-tips', redirectRequired: true },
  { oldPath: '/risk-management/risk-reward.md', newPath: '/resources/personal-finance-tips/risk-management/risk-reward.md', category: 'resources', subcategory: 'personal-finance-tips', redirectRequired: true },
  { oldPath: '/risk-management/stop-loss.md', newPath: '/resources/personal-finance-tips/risk-management/stop-loss.md', category: 'resources', subcategory: 'personal-finance-tips', redirectRequired: true },
  
  // Tools → Useful Links
  { oldPath: '/tools/', newPath: '/resources/useful-links/tools/', category: 'resources', subcategory: 'useful-links', redirectRequired: true },
  { oldPath: '/tools/calculator.md', newPath: '/resources/useful-links/tools/calculator.md', category: 'resources', subcategory: 'useful-links', redirectRequired: true },
  { oldPath: '/tools/glossary.md', newPath: '/resources/useful-links/tools/glossary.md', category: 'resources', subcategory: 'useful-links', redirectRequired: true },
  { oldPath: '/tools/risk-calculator.md', newPath: '/resources/useful-links/tools/risk-calculator.md', category: 'resources', subcategory: 'useful-links', redirectRequired: true },
  
  // Advanced Strategies → Trading Strategy
  { oldPath: '/advanced-strategies/', newPath: '/insights/trading-strategy/advanced/', category: 'insights', subcategory: 'trading-strategy', redirectRequired: true }
];
```

## URL Rewrite Rules Model

### RewriteRule Entity
```typescript
interface RewriteRule {
  pattern: string;        // Regex pattern to match old URLs
  replacement: string;    // New URL pattern with substitution groups
  permanent: boolean;     // Whether redirect is permanent (301) 
}
```

### VitePress Rewrites Configuration
```typescript
const rewriteRules: Record<string, string> = {
  // Basics redirects
  'basics/(.*)': 'resources/tutorials/basics/$1',
  
  // FAQ redirects  
  'faq/(.*)': 'resources/tutorials/faq/$1',
  
  // Risk management redirects
  'risk-management/(.*)': 'resources/personal-finance-tips/risk-management/$1',
  
  // Tools redirects
  'tools/(.*)': 'resources/useful-links/tools/$1',
  
  // Advanced strategies redirects
  'advanced-strategies/(.*)': 'insights/trading-strategy/advanced/$1'
};
```

## Validation Rules

### Navigation Structure Validation
- Each top-level nav item must have either `link` OR `items` (not both)
- Dropdown items must have `text` and `link` properties
- All links must start with `/` (absolute paths)
- No duplicate navigation paths allowed

### Content Organization Validation  
- All existing content must be mapped to new structure
- No content should be lost during reorganization
- All mapped paths must be valid and accessible
- URL patterns must not conflict

### URL Rewrite Validation
- All old URLs must have corresponding rewrite rules
- Rewrite patterns must not create infinite redirects
- New URLs must follow hierarchical structure convention
- All redirects must preserve query parameters and anchors
