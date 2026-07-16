# Modernization task board

Status labels: `planned`, `in progress`, `blocked`, `complete`.

## Phase 0 — Baseline and change control

| ID | Status | Task | Acceptance criteria |
|---|---|---|---|
| P0-01 | complete | Record product requirements, repository audit, and content migration register. | The three source documents exist and preserve the Play/Game, Soul-home, resume, and tag-index requirements. |
| P0-02 | complete | Create the documentation index, decision log, and ordered task board. | A maintainer can find governing documents and identify the next task without reading source code. |
| P0-03 | complete | Confirm domain, legacy sample posts, Resume placeholder policy, project-link policy, and external-service status. | Decisions D-007 through D-011 record the owner's direction; the external-service decision is explicitly deferred rather than inferred. |

## Phase 1 — Publication safety

| ID | Status | Task | Acceptance criteria |
|---|---|---|---|
| P1-01 | complete | Build a complete current-URL and target-URL ledger. | Local source status, target locations, and owner-browser results are recorded in `docs/URL_MIGRATION_LEDGER.md`; the two legacy candidate routes are confirmed 404. |
| P1-02 | complete | Normalize post file names and front matter without losing content. | All 13 local posts have valid names and front matter; body-integrity verification passed. Build and published-output verification remain scheduled for Phase 2. |
| P1-03 | complete | Correct approved site identity settings and remove inherited production identifiers. | The inherited custom domain, placeholder metadata, PWA identity, language default, footer branding, package identity, and new-post author default are corrected. Deferred AdSense, Disqus, and analytics settings remain unchanged by decision D-010. |

## Phase 2 — GitHub connection and build foundation

| ID | Status | Task | Acceptance criteria |
|---|---|---|---|
| P2-01 | planned | Connect this local work repository to the owner-controlled GitHub repository through GitHub Desktop. | The owner signs in, the intended remote repository and branch are compared before connection, and `origin` is verified without overwriting remote history. |
| P2-02 | complete | Document the safe GitHub Desktop workflow for pull, review, commit, push, and recovery. | `MAINTENANCE_RUNBOOK.md` provides a Korean checklist and stop conditions. |
| P2-03 | complete | Add a reproducible GitHub Pages build-and-validation workflow. | `.github/workflows/pages.yml` validates content and builds/deploys Pages after an owner-controlled push. |
| P2-04 | planned | Verify the first non-destructive push and GitHub Pages build. | The remote history remains intact, the build result is recorded, and the production site is not changed until explicit publication approval. |

## Phase 3 — Authoring foundation

| ID | Status | Task | Acceptance criteria |
|---|---|---|---|
| P3-01 | complete | Create the content guide and Markdown templates. | `CONTENT_GUIDE.md` and `templates/` cover all four content types. |
| P3-02 | complete | Define controlled tags and tag-index data. | `_data/tag-index.yml` and the validation script enforce the Play/Game rules. |
| P3-03 | complete | Add maintainer and AI-agent operating guides. | `MAINTENANCE_RUNBOOK.md` and `AGENTS.md` document routine work and safety limits. |

## Phase 4 — Information architecture

| ID | Status | Task | Acceptance criteria |
|---|---|---|---|
| P4-01 | complete | Add data-driven navigation and the Resume page. | `_data/profile.yml` powers a separate dummy Resume; `index.md` remains a Soul page. |
| P4-02 | complete | Add Projects, Research, and Notes collections. | Collections, URL patterns, layouts, listings, templates, and migrated entries exist. |
| P4-03 | complete | Build the tag-index archive. | `/archive/` has a desktop left index, mobile controls, in-page filtering, and URL tag support. |

## Phase 5 — Design and technical capabilities

| ID | Status | Task | Acceptance criteria |
|---|---|---|---|
| P5-01 | complete | Create the editable Soul home layout. | `index.md` is the single free-form home source, with image and video guidance. |
| P5-02 | complete | Implement PC-first responsive design. | The new CSS prioritizes desktop and converts navigation/tag controls for narrow screens. Remote browser verification remains P6-02. |
| P5-03 | complete | Modernize optional technical-content features. | Conditional MathJax/Mermaid, code styling, and documented PDF/download support are available. |

## Phase 6 — Quality and delivery

| ID | Status | Task | Acceptance criteria |
|---|---|---|---|
| P6-01 | complete | Add additional quality checks for content rules and static-file hygiene. | `scripts/validate-content.mjs`, `git diff --check`, and the GitHub workflow provide pre-publish checks. Link/a11y audits remain P6-02. |
| P6-02 | planned | Audit performance, accessibility, SEO, and external services. | The quality budget is met on representative home, resume, archive, project, and post pages. |
| P6-03 | complete | Decide and safely migrate or retire PWA behavior. | The inherited service worker is retired with a scoped cleanup script and documented decision D-013. |

## Next approval gate

## Remaining owner-controlled gate

P2-01 and P2-04 remain: connect the owner's real clone, commit/push this delivery, confirm the GitHub Pages Actions build, then inspect the published pages in Edge. These actions cannot be safely performed from this local package without the owner's GitHub account and approval.
