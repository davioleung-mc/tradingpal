# Content Organization Contract

## Directory Structure Contract

### Target Structure
```
docs/
├── insights/
│   ├── index.md                          # Insights landing page
│   ├── market-analysis/
│   │   └── index.md                      # Market Analysis section
│   └── trading-strategy/
│       ├── index.md                      # Trading Strategy section  
│       └── advanced/
│           └── index.md                  # Advanced Strategies (moved from root)
└── resources/
    ├── index.md                          # Resources landing page
    ├── personal-finance-tips/
    │   ├── index.md                      # Personal Finance Tips section
    │   └── risk-management/              # Risk Management (moved from root)
    │       ├── index.md
    │       ├── basics.md
    │       ├── position-sizing.md
    │       ├── risk-reward.md
    │       └── stop-loss.md
    ├── tutorials/
    │   ├── index.md                      # Tutorials section
    │   ├── basics/                       # Basics (moved from root)
    │   │   ├── index.md
    │   │   ├── what-is-contract-trading.md
    │   │   ├── contract-types.md
    │   │   ├── leverage-and-margin.md
    │   │   └── choosing-platform.md
    │   └── faq/                          # FAQ (moved from root)
    │       ├── index.md
    │       ├── general.md
    │       ├── technical.md
    │       ├── platform.md
    │       └── trading.md
    └── useful-links/
        ├── index.md                      # Useful Links section
        └── tools/                        # Tools (moved from root)
            ├── index.md
            ├── calculator.md
            ├── glossary.md
            └── risk-calculator.md
```

## Content Migration Rules

### File Movement Contract
```typescript
interface ContentMigration {
  sourcePattern: string;      // Current location pattern
  targetPattern: string;      // New location pattern  
  preserveContent: boolean;   // Must preserve all content
  updateLinks: boolean;       // Must update internal links
  createIndex: boolean;       // Must create index pages
}

const migrationRules: ContentMigration[] = [
  {
    sourcePattern: 'docs/basics/**',
    targetPattern: 'docs/resources/tutorials/basics/**', 
    preserveContent: true,
    updateLinks: true,
    createIndex: true
  },
  {
    sourcePattern: 'docs/faq/**',
    targetPattern: 'docs/resources/tutorials/faq/**',
    preserveContent: true, 
    updateLinks: true,
    createIndex: true
  },
  {
    sourcePattern: 'docs/risk-management/**',
    targetPattern: 'docs/resources/personal-finance-tips/risk-management/**',
    preserveContent: true,
    updateLinks: true, 
    createIndex: true
  },
  {
    sourcePattern: 'docs/tools/**',
    targetPattern: 'docs/resources/useful-links/tools/**',
    preserveContent: true,
    updateLinks: true,
    createIndex: true
  },
  {
    sourcePattern: 'docs/advanced-strategies/**', 
    targetPattern: 'docs/insights/trading-strategy/advanced/**',
    preserveContent: true,
    updateLinks: true,
    createIndex: true
  }
];
```

### Index Page Requirements
Each new directory must have an `index.md` file with:

#### Insights Landing (`/insights/index.md`)
```markdown
# Insights

Forward-looking analysis and strategic content for traders.

## Sections

- [Market Analysis](/insights/market-analysis/) - Current market trends and analysis
- [Trading Strategy](/insights/trading-strategy/) - Strategic approaches to trading
```

#### Resources Landing (`/resources/index.md`)  
```markdown
# Resources

Educational materials and reference content for traders.

## Sections

- [Personal Finance Tips](/resources/personal-finance-tips/) - Financial management guidance
- [Tutorials](/resources/tutorials/) - Step-by-step learning materials  
- [Useful Links](/resources/useful-links/) - Tools and external resources
```

## Link Update Contract

### Internal Link Patterns
All internal links must be updated to match new structure:

```typescript
interface LinkUpdate {
  oldPattern: RegExp;
  newReplacement: string;
}

const linkUpdates: LinkUpdate[] = [
  {
    oldPattern: /\[([^\]]+)\]\(\.\.\/basics\/(.*)\)/g,
    newReplacement: '[$1](../tutorials/basics/$2)'
  },
  {
    oldPattern: /\[([^\]]+)\]\(\/basics\/(.*)\)/g,
    newReplacement: '[$1](/resources/tutorials/basics/$2)'
  },
  {
    oldPattern: /\[([^\]]+)\]\(\.\.\/faq\/(.*)\)/g,
    newReplacement: '[$1](../tutorials/faq/$2)'
  },
  {
    oldPattern: /\[([^\]]+)\]\(\/faq\/(.*)\)/g,
    newReplacement: '[$1](/resources/tutorials/faq/$2)'
  },
  {
    oldPattern: /\[([^\]]+)\]\(\.\.\/risk-management\/(.*)\)/g,
    newReplacement: '[$1](../personal-finance-tips/risk-management/$2)'
  },
  {
    oldPattern: /\[([^\]]+)\]\(\/risk-management\/(.*)\)/g,
    newReplacement: '[$1](/resources/personal-finance-tips/risk-management/$2)'
  },
  {
    oldPattern: /\[([^\]]+)\]\(\.\.\/tools\/(.*)\)/g,
    newReplacement: '[$1](../useful-links/tools/$2)'
  },
  {
    oldPattern: /\[([^\]]+)\]\(\/tools\/(.*)\)/g,
    newReplacement: '[$1](/resources/useful-links/tools/$2)'
  },
  {
    oldPattern: /\[([^\]]+)\]\(\.\.\/advanced-strategies\/(.*)\)/g,
    newReplacement: '[$1](../../insights/trading-strategy/advanced/$2)'
  },
  {
    oldPattern: /\[([^\]]+)\]\(\/advanced-strategies\/(.*)\)/g,
    newReplacement: '[$1](/insights/trading-strategy/advanced/$2)'
  }
];
```

## Multi-language Support Contract

### Language Structure Preservation  
The same structure must be applied to existing language directories:

```
docs/
├── es/                    # Spanish content
│   ├── insights/
│   └── resources/
├── zh/                    # Chinese content  
│   ├── insights/
│   └── resources/
└── [default]/             # English content (root)
    ├── insights/
    └── resources/
```

### Language Navigation Contract
Each language must have the same navigation structure with appropriate translations:

```typescript
// Spanish navigation
const esNav = [
  {
    text: 'Perspectivas', // Insights
    items: [
      { text: 'Análisis de Mercado', link: '/es/insights/market-analysis/' },
      { text: 'Estrategia de Trading', link: '/es/insights/trading-strategy/' }
    ]
  },
  {
    text: 'Recursos', // Resources  
    items: [
      { text: 'Consejos de Finanzas Personales', link: '/es/resources/personal-finance-tips/' },
      { text: 'Tutoriales', link: '/es/resources/tutorials/' },
      { text: 'Enlaces Útiles', link: '/es/resources/useful-links/' }
    ]
  }
];

// Chinese navigation
const zhNav = [
  {
    text: '见解', // Insights
    items: [
      { text: '市场分析', link: '/zh/insights/market-analysis/' },
      { text: '交易策略', link: '/zh/insights/trading-strategy/' }
    ]
  },
  {
    text: '资源', // Resources
    items: [
      { text: '个人理财技巧', link: '/zh/resources/personal-finance-tips/' },
      { text: '教程', link: '/zh/resources/tutorials/' },
      { text: '有用链接', link: '/zh/resources/useful-links/' }
    ]
  }
];
```
