# Current Navigation State Documentation

**Date**: September 15, 2025  
**Purpose**: Document existing navigation structure before reorganization for reference and potential rollback  

## Current Navigation Structure

### Main Navigation (English)
```typescript
nav: [
  { text: 'Home', link: '/' },
  { text: 'Basics', link: '/basics/' },
  { text: 'Risk Management', link: '/risk-management/' },
  { text: 'Advanced Strategies', link: '/advanced-strategies/' },
  { text: 'FAQ', link: '/faq/' },
  { 
    text: 'Tools', 
    items: [
      { text: 'Calculator', link: '/tools/calculator' },
      { text: 'Risk Calculator', link: '/tools/risk-calculator' },
      { text: 'Glossary', link: '/tools/glossary' }
    ]
  },
  { 
    text: '⚠️ Disclaimer', 
    link: '/disclaimer',
    activeMatch: '/disclaimer'
  }
]
```

### Current Directory Structure
```
docs/
├── .vitepress/
│   └── config.ts
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   └── hero-image.png
├── index.md
├── disclaimer.md
├── basics/
│   ├── index.md
│   ├── what-is-contract-trading.md
│   ├── contract-types.md
│   ├── leverage-and-margin.md
│   └── choosing-platform.md
├── risk-management/
│   ├── index.md
│   ├── basics.md
│   ├── position-sizing.md
│   ├── risk-reward.md
│   └── stop-loss.md
├── advanced-strategies/
│   └── index.md
├── faq/
│   ├── index.md
│   ├── general.md
│   ├── technical.md
│   ├── platform.md
│   └── trading.md
├── tools/
│   ├── index.md
│   ├── calculator.md
│   ├── glossary.md
│   └── risk-calculator.md
├── es/
│   ├── index.md
│   ├── basics/
│   ├── faq/
│   ├── risk-management/
│   ├── tools/
│   └── advanced-strategies/
└── zh/
    ├── index.md
    ├── basics/
    ├── faq/
    ├── risk-management/
    ├── tools/
    └── advanced-strategies/
```

### Current URL Patterns
- Home: `/`
- Basics: `/basics/[article].md`
- Risk Management: `/risk-management/[article].md`
- Advanced Strategies: `/advanced-strategies/[article].md`
- FAQ: `/faq/[article].md`
- Tools: `/tools/[article].md`
- Multi-language: `/[lang]/[section]/[article].md`

### Current Navigation Elements
- **Logo**: Present, links to home page
- **Search**: Local search enabled
- **Language Switcher**: Visible with English, 中文, Español options
- **GitHub Icon**: Present in footer (not nav bar)
- **Disclaimer**: Prominent in main navigation with warning icon
- **Edit Links**: GitHub edit links enabled

### Internationalization (i18n) Configuration
```typescript
locales: {
  root: {
    label: 'English',
    lang: 'en',
    title: "TradingPal",
    description: "Professional contract trading education with comprehensive risk management"
  },
  zh: {
    label: '中文',
    lang: 'zh-CN',
    title: "TradingPal",
    description: "专业合约交易教育与风险管理指南"
  },
  es: {
    label: 'Español',
    lang: 'es',
    title: "TradingPal",
    description: "Educación profesional en trading de contratos con gestión de riesgos"
  }
}
```

### Current Footer Configuration
```typescript
footer: {
  message: '⚠️ Educational Content Only - Not Financial Advice | <a href="/disclaimer">Risk Disclaimer</a> | <a href="https://github.com/davioleung-mc/tradingpal">Open Source</a>',
  copyright: 'Copyright © 2025 TradingPal - Professional Trading Education with YMYL Compliance'
}
```

## Content Inventory

### English Content Files
- **Basics** (4 files): what-is-contract-trading.md, contract-types.md, leverage-and-margin.md, choosing-platform.md
- **Risk Management** (4 files): basics.md, position-sizing.md, risk-reward.md, stop-loss.md
- **FAQ** (4 files): general.md, technical.md, platform.md, trading.md
- **Tools** (3 files): calculator.md, glossary.md, risk-calculator.md
- **Advanced Strategies** (1 file): index.md
- **Special Pages**: disclaimer.md, index.md (home)

### Spanish Content (`/es/`)
Similar structure with Spanish translations covering:
- Basics (6 files)
- FAQ (7 files with additional strategy questions)
- Risk Management
- Tools
- Advanced Strategies

### Chinese Content (`/zh/`)
Similar structure with Chinese translations covering:
- Basics (6 files with additional margin concepts)
- FAQ (6 files)
- Risk Management
- Tools
- Advanced Strategies

## Pre-Migration Checklist
- [x] Navigation structure documented
- [x] Directory structure mapped
- [x] Content inventory completed
- [x] URL patterns identified
- [x] i18n configuration captured
- [x] Special elements identified (disclaimer, search, language switcher)

## Migration Impact Assessment

### URLs That Will Change
- `/basics/*` → `/resources/tutorials/basics/*`
- `/faq/*` → `/resources/tutorials/faq/*`
- `/risk-management/*` → `/resources/personal-finance-tips/risk-management/*`
- `/tools/*` → `/resources/useful-links/tools/*`
- `/advanced-strategies/*` → `/insights/trading-strategy/advanced/*`

### Navigation Elements to Remove
- Disclaimer from main navigation (content remains accessible via footer/direct link)
- Language switcher (temporarily hidden)
- GitHub social link (if present in nav)

### Navigation Elements to Preserve
- Logo linking to home
- Search functionality
- Edit links
- Footer configuration (with disclaimer link)

---

**Note**: This documentation serves as a reference point for the reorganization process and can be used for rollback if needed. All current functionality should be preserved in the new structure with improved organization and user experience.
