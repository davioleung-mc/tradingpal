# Implementation Plan: Reorganize TradingPal Navigation Structure

**Branch**: `001-reorganize-tradingpal-navigation` | **Date**: September 15, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-reorganize-tradingpal-navigation/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
4. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
5. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, or `GEMINI.md` for Gemini CLI).
6. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
7. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
8. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Reorganize TradingPal's VitePress site navigation from current structure to two main categories: "Insights" (Market Analysis, Trading Strategy) and "Resources" (Personal Finance Tips, Tutorials, Useful Links). Remove disclaimer from nav, hide language switcher, remove GitHub icon, and implement hierarchical URL structure matching the new navigation organization. All existing educational content will be redistributed under appropriate Resources categories.

## Technical Context
**Language/Version**: TypeScript with VitePress (Static Site Generator)
**Primary Dependencies**: VitePress 1.x, Vue.js 3.x for components and navigation
**Storage**: Markdown files for content, no database required
**Testing**: Manual testing via build verification and navigation testing
**Target Platform**: Static website deployed via GitHub Pages
**Project Type**: Web frontend (static site generation)
**Performance Goals**: Fast static site loading, SEO-friendly URLs
**Constraints**: Maintain existing content accessibility, preserve SEO rankings
**Scale/Scope**: ~50 documentation pages across multiple languages, hierarchical navigation structure

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Simplicity**:
- Projects: 1 (static site configuration) ✓ (max 3)
- Using framework directly? Yes, VitePress native configuration ✓ (no wrapper classes)
- Single data model? Yes, navigation structure + content mapping ✓ (no DTOs unless serialization differs)
- Avoiding patterns? Yes, direct VitePress config modification ✓ (no Repository/UoW without proven need)

**Architecture**:
- EVERY feature as library? N/A (configuration change, not code library) ✓
- Libraries listed: N/A for this feature
- CLI per library: N/A (VitePress provides CLI)
- Library docs: N/A for this configuration change

**Testing (NON-NEGOTIABLE)**:
- RED-GREEN-Refactor cycle enforced? Will verify navigation fails before fix ✓ (test MUST fail first)
- Git commits show tests before implementation? Will commit broken nav state first ✓
- Order: Contract→Integration→E2E→Unit strictly followed? Configuration validation approach ✓
- Real dependencies used? Yes, actual VitePress build process ✓ (actual build, not mocks)
- Integration tests for: Build verification, navigation links, URL routing ✓
- FORBIDDEN: Implementation before test, skipping RED phase ✓

**Observability**:
- Structured logging included? VitePress build logs + deployment verification ✓
- Frontend logs → backend? N/A (static site)
- Error context sufficient? Build errors will show broken navigation ✓

**Versioning**:
- Version number assigned? Feature branch approach ✓ (MAJOR.MINOR.BUILD)
- BUILD increments on every change? Git commit-based tracking ✓
- Breaking changes handled? URL redirect strategy planned ✓ (parallel tests, migration plan)

## Project Structure

### Documentation (this feature)
```
specs/001-reorganize-tradingpal-navigation/
├── spec.md              # Feature specification (complete)
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command) 
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
# VitePress Configuration Structure (current)
docs/
├── .vitepress/
│   └── config.ts        # Main configuration file to modify
├── [language]/          # Multi-language content structure
│   ├── index.md
│   ├── basics/
│   ├── faq/
│   ├── risk-management/
│   ├── tools/
│   └── advanced-strategies/
└── public/              # Static assets

# Target URL Structure (after reorganization)
/                        # Home
/insights/
├── market-analysis/     # New category
└── trading-strategy/    # New category
/resources/
├── personal-finance-tips/  # Reorganized content
├── tutorials/              # Reorganized content
└── useful-links/           # New category
```

**Structure Decision**: VitePress static site (frontend-only configuration change)

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - VitePress navigation configuration patterns
   - Multi-language site navigation best practices
   - URL structure changes and redirect strategies
   - Content categorization and migration approaches

2. **Generate and dispatch research agents**:
   ```
   Task: "Research VitePress navigation configuration for hierarchical menus"
   Task: "Find best practices for URL structure changes in VitePress"
   Task: "Research content categorization strategies for trading education sites"
   Task: "Find redirect patterns for preserving SEO during navigation restructuring"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen] 
   - Alternatives considered: [what else evaluated]

**Output**: research.md with VitePress configuration patterns and migration strategies

## Phase 1: Design & Contracts
*Prerequisites: research.md complete ✓*

1. **Extract entities from feature spec** → `data-model.md`:
   - Navigation structure model (categories, items, links)
   - Content mapping model (old paths → new paths)
   - URL rewrite rules model

2. **Generate configuration contracts** from functional requirements:
   - VitePress nav configuration schema
   - URL rewrite configuration  
   - Content directory structure
   - Output TypeScript interfaces to `/contracts/`

3. **Generate configuration tests** from contracts:
   - Navigation structure validation
   - URL accessibility tests
   - Build verification tests
   - Tests must fail initially (current nav structure)

4. **Extract test scenarios** from user stories:
   - Each navigation requirement → verification test
   - Hover behavior → interaction test
   - URL structure → routing test

5. **Update agent file incrementally**:
   - Run `scripts/update-agent-context.sh` for current AI assistant
   - Add VitePress navigation patterns
   - Update with new URL structure knowledge

**Output**: data-model.md, /contracts/*, failing navigation tests, quickstart.md, updated agent context

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (navigation config, content organization, quickstart)
- Configuration validation tasks before implementation [P] 
- Directory structure creation tasks [P]
- Content migration tasks (sequential by directory)
- Navigation configuration update tasks
- URL rewrite implementation tasks  
- Multi-language structure update tasks [P]
- Validation and testing tasks

**Ordering Strategy**:
- TDD order: Validation tests before configuration changes
- Dependency order: Directory structure → Content migration → Navigation config → URL rewrites
- Mark [P] for parallel execution (independent directories/languages)

**Estimated Output**: 15-20 numbered, ordered tasks covering:
1. Pre-implementation validation (current structure documentation)
2. Directory structure creation (parallel by category) 
3. Content migration (sequential, with link updates)
4. Navigation configuration updates
5. URL rewrite rule implementation
6. Multi-language navigation updates (parallel)
7. Integration testing and validation
8. Build verification and deployment testing

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [x] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS  
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented (none required)

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*