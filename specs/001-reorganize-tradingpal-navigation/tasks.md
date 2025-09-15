# Tasks: Reorganize TradingPal Navigation Structure

**Input**: Design documents from `/specs/001-reorganize-tradingpal-navigation/`
**Prerequisites**: plan.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

## Execution Flow (main)
```
1. Load plan.md from feature directory ✅
   → Tech stack: VitePress, TypeScript, Vue.js
   → Structure: Static site configuration change
2. Load design documents ✅:
   → data-model.md: Navigation structure, content mappings
   → contracts/: Navigation config and content organization contracts
   → research.md: VitePress patterns and migration strategies  
3. Generate tasks by category:
   → Setup: Directory structure, validation setup
   → Tests: Configuration validation, navigation tests
   → Core: Content migration, navigation config, URL rewrites
   → Integration: Multi-language support, link updates
   → Polish: Build testing, performance validation
4. Apply task rules:
   → Different directories/languages = mark [P] for parallel
   → Same config file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness ✅:
   → All contracts have validation tests ✅
   → All content mappings have migration tasks ✅
   → All navigation elements implemented ✅
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **VitePress structure**: `docs/.vitepress/config.ts` for main configuration
- **Content structure**: `docs/[category]/[subcategory]/` directories
- **Multi-language**: `docs/[lang]/[category]/[subcategory]/` structure

## Phase 3.1: Setup & Pre-Implementation Validation
- [ ] T001 Document current navigation structure in specs/001-reorganize-tradingpal-navigation/current-state.md
- [ ] T002 [P] Create target directory structure: docs/insights/market-analysis/
- [ ] T003 [P] Create target directory structure: docs/insights/trading-strategy/
- [ ] T004 [P] Create target directory structure: docs/resources/personal-finance-tips/
- [ ] T005 [P] Create target directory structure: docs/resources/tutorials/
- [ ] T006 [P] Create target directory structure: docs/resources/useful-links/
- [ ] T007 [P] Create target directory structure: docs/es/insights/ (Spanish)
- [ ] T008 [P] Create target directory structure: docs/zh/insights/ (Chinese)
- [ ] T009 [P] Create target directory structure: docs/es/resources/ (Spanish)
- [ ] T010 [P] Create target directory structure: docs/zh/resources/ (Chinese)

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T011 [P] Navigation validation test in tests/navigation-structure.test.js
- [ ] T012 [P] URL structure validation test in tests/url-routing.test.js  
- [ ] T013 [P] Content accessibility test in tests/content-migration.test.js
- [ ] T014 [P] Redirect functionality test in tests/legacy-redirects.test.js
- [ ] T015 [P] Multi-language navigation test in tests/i18n-navigation.test.js
- [ ] T016 [P] Build validation test in tests/build-verification.test.js

## Phase 3.3: Core Implementation (ONLY after tests are failing)

### Content Migration
- [ ] T017 Move docs/basics/ content to docs/resources/tutorials/basics/
- [ ] T018 Move docs/faq/ content to docs/resources/tutorials/faq/
- [ ] T019 Move docs/risk-management/ content to docs/resources/personal-finance-tips/risk-management/
- [ ] T020 Move docs/tools/ content to docs/resources/useful-links/tools/
- [ ] T021 Move docs/advanced-strategies/ content to docs/insights/trading-strategy/advanced/

### Index Page Creation  
- [ ] T022 [P] Create docs/insights/index.md with section overview
- [ ] T023 [P] Create docs/insights/market-analysis/index.md 
- [ ] T024 [P] Create docs/insights/trading-strategy/index.md
- [ ] T025 [P] Create docs/resources/index.md with section overview
- [ ] T026 [P] Create docs/resources/personal-finance-tips/index.md
- [ ] T027 [P] Create docs/resources/tutorials/index.md
- [ ] T028 [P] Create docs/resources/useful-links/index.md

### Navigation Configuration
- [ ] T029 Update docs/.vitepress/config.ts with new navigation structure
- [ ] T030 Remove disclaimer from navigation in docs/.vitepress/config.ts
- [ ] T031 Remove GitHub socialLinks in docs/.vitepress/config.ts
- [ ] T032 Hide language switcher in docs/.vitepress/config.ts
- [ ] T033 Add URL rewrite rules to docs/.vitepress/config.ts

## Phase 3.4: Integration

### Link Updates
- [ ] T034 Update internal links in migrated content to use new paths
- [ ] T035 [P] Update Spanish content links in docs/es/ directories
- [ ] T036 [P] Update Chinese content links in docs/zh/ directories

### Multi-language Navigation
- [ ] T037 [P] Apply navigation structure to docs/es/ (Spanish) with translations
- [ ] T038 [P] Apply navigation structure to docs/zh/ (Chinese) with translations
- [ ] T039 [P] Migrate Spanish content to new directory structure
- [ ] T040 [P] Migrate Chinese content to new directory structure

### Cross-references & SEO
- [ ] T041 Update sitemap.xml generation for new URL structure
- [ ] T042 Verify meta tags and SEO properties preserved in migrated content
- [ ] T043 Update any hardcoded URLs in content files

## Phase 3.5: Polish & Validation
- [ ] T044 [P] Run quickstart.md navigation validation scenarios
- [ ] T045 [P] Verify build process: npm run docs:build
- [ ] T046 [P] Test preview deployment: npm run docs:preview  
- [ ] T047 [P] Performance testing: page load times under 3s
- [ ] T048 Cleanup: Remove empty original directories after migration
- [ ] T049 Update README.md to reflect new content organization
- [ ] T050 Final verification: All tests passing and build successful

## Dependencies
- Directory creation (T002-T010) before content migration (T017-T021)
- Tests (T011-T016) before implementation (T017-T050)
- Content migration (T017-T021) before link updates (T034-T036)
- Navigation config (T029-T033) before multi-language updates (T037-T040)
- Core implementation (T017-T043) before validation (T044-T050)

## Parallel Execution Examples

### Directory Structure Setup (Parallel)
```
Task: "Create target directory structure: docs/insights/market-analysis/"
Task: "Create target directory structure: docs/insights/trading-strategy/"  
Task: "Create target directory structure: docs/resources/personal-finance-tips/"
Task: "Create target directory structure: docs/resources/tutorials/"
Task: "Create target directory structure: docs/resources/useful-links/"
```

### Test Creation (Parallel)
```
Task: "Navigation validation test in tests/navigation-structure.test.js"
Task: "URL structure validation test in tests/url-routing.test.js"
Task: "Content accessibility test in tests/content-migration.test.js"
Task: "Redirect functionality test in tests/legacy-redirects.test.js"
```

### Index Page Creation (Parallel)
```
Task: "Create docs/insights/index.md with section overview"
Task: "Create docs/insights/market-analysis/index.md"
Task: "Create docs/insights/trading-strategy/index.md"
Task: "Create docs/resources/index.md with section overview"
```

### Multi-language Updates (Parallel)
```
Task: "Apply navigation structure to docs/es/ (Spanish) with translations"
Task: "Apply navigation structure to docs/zh/ (Chinese) with translations"
Task: "Update Spanish content links in docs/es/ directories"
Task: "Update Chinese content links in docs/zh/ directories"
```

## Notes
- [P] tasks = different files/directories, no dependencies
- Content migration tasks are sequential to avoid conflicts
- Navigation config tasks are sequential (same file: config.ts)
- Verify tests fail before implementing (TDD approach)
- Commit after each major task completion
- Multi-language tasks can run in parallel since they affect different directories

## Task Generation Rules Applied

1. **From Navigation Config Contract**:
   - Navigation structure → T011, T029-T032
   - URL rewrites → T012, T033
   - Element removal → T030-T032

2. **From Content Organization Contract**:
   - Directory structure → T002-T010, T022-T028
   - Content migration → T017-T021, T039-T040
   - Link updates → T034-T036

3. **From Quickstart Scenarios**:
   - Each test scenario → T011-T016, T044
   - Build verification → T045-T046
   - Performance validation → T047

4. **Ordering Applied**:
   - Setup → Tests → Migration → Configuration → Integration → Validation
   - Dependencies enforce proper sequencing

## Validation Checklist ✅
*GATE: Checked before task execution*

- [x] All contracts have corresponding validation tests
- [x] All content mappings have migration tasks  
- [x] All tests come before implementation
- [x] Parallel tasks truly independent (different files/dirs)
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task
- [x] TDD approach maintained throughout
