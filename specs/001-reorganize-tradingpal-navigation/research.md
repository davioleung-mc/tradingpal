# Research Findings: VitePress Navigation Reorganization

## VitePress Navigation Configuration Patterns

**Decision**: Use VitePress `nav` configuration with nested dropdown items
**Rationale**: VitePress provides built-in support for hierarchical navigation through the `nav` array with `items` property for dropdowns. This matches our requirement for hover-based submenus.
**Alternatives considered**: 
- Custom Vue components (rejected: unnecessary complexity for standard navigation)
- Sidebar-based navigation (rejected: doesn't meet UX requirements for top-level categories)

### Implementation Pattern:
```typescript
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
]
```

## URL Structure Changes and Redirect Strategies

**Decision**: Implement directory-based URL structure with VitePress rewrites for redirects
**Rationale**: VitePress supports clean URLs through directory structure. Rewrites in `config.ts` can handle legacy URL redirects to preserve SEO.
**Alternatives considered**:
- Server-level redirects (rejected: GitHub Pages limitations)
- Client-side redirects (rejected: poor SEO impact)

### Redirect Implementation:
```typescript
rewrites: {
  'basics/(.*)': 'resources/tutorials/$1',
  'faq/(.*)': 'resources/tutorials/faq/$1',
  'risk-management/(.*)': 'resources/personal-finance-tips/risk-management/$1',
  'tools/(.*)': 'resources/useful-links/tools/$1'
}
```

## Content Categorization Strategy

**Decision**: Logical grouping based on content type and user intent
**Rationale**: 
- **Insights** = forward-looking, analytical content (Market Analysis, Trading Strategy)
- **Resources** = educational and reference material (Personal Finance Tips, Tutorials, Useful Links)

**Content Mapping**:
- `basics/` → `resources/tutorials/basics/`
- `faq/` → `resources/tutorials/faq/`
- `risk-management/` → `resources/personal-finance-tips/risk-management/`
- `tools/` → `resources/useful-links/tools/`
- `advanced-strategies/` → `insights/trading-strategy/advanced/`

**Alternatives considered**:
- Skill-level grouping (Beginner/Intermediate/Advanced) - rejected: too rigid
- Topic-based grouping (Trading/Finance/Tools) - rejected: doesn't align with user journey

## Multi-language Site Considerations  

**Decision**: Hide language switcher temporarily, maintain existing language structure
**Rationale**: User requested hiding language switcher for now. Existing `/es/` and `/zh/` directory structure can be maintained with same navigation pattern applied to each language.
**Alternatives considered**:
- Remove other languages entirely (rejected: data loss)
- Restructure language approach (rejected: out of scope)

### Language Implementation:
```typescript
// Hide language switcher in theme config
themeConfig: {
  // Remove or comment out localeLinks
  // localeLinks: { ... }
}
```

## Element Removal Strategy

**Decision**: Remove elements through theme configuration
**Rationale**: VitePress theme config provides clean way to hide/remove navigation elements
**Implementation**:
- Remove disclaimer from `nav` array
- Remove `socialLinks` array (GitHub icon)
- Hide language selector in `themeConfig`

**Alternatives considered**:
- CSS hiding (rejected: elements still in DOM)
- Custom theme override (rejected: unnecessary complexity)
