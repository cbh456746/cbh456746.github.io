# Modernization task board

Status labels: `planned`, `in progress`, `blocked`, `complete`.

## Maintenance — 2026-10-30

| ID | Status | Task | Acceptance criteria |
|---|---|---|---|
| M-09 | complete | Publish the KEL local AI animation failure study with visual evidence and collapsible prompts. | Research article, own video, selected comparison figures, 27 prompt disclosures and sanitized reproduction data published. Exact-commit Pages build/deploy, desktop/mobile rendering, playback, keyboard toggles and Research/Archive/search/RSS discovery checked. Publication scope and verification are recorded in docs/KEL_ANIMATION_RESEARCH_PUBLICATION.md. |
| M-10 | complete | Add selective post reference exports and durable cross-project agent instructions. | Published reviewed metadata, v2 bounded catalog/topic pages, local limited-result search and same-SHA body/appendix exports. 1,205-article unit and real Jekyll fixtures, visibility/provenance/stale cleanup, public files/hashes/search, PC/mobile entry page and receiving-project guidance verified. See docs/AI_REFERENCE_PUBLICATION.md and docs/AI_REFERENCE_SCALE_REVIEW.md. |
| M-11 | complete | Rewrite the human README and make current-work updates part of every blog task. | Published the human README, agent reading order, safeguards and mandatory per-task Home update across operating guides. Basic task/date/summary checks passed with one valid and four invalid private fixtures; 26 README links, preserved Home content, public README, same-SHA Pages deployment and PC/mobile Home/card navigation checked. Keep the Home date on a separate line on mobile. |

## Maintenance — 2026-10-18

| ID | Status | Task | Acceptance criteria |
|---|---|---|---|
| M-07 | complete | Connect the avatar project to its reviewed public source and desktop workflow. | The existing project entry links to the independent source repository, describes the agent and beginner workflow, and distinguishes the previous video from current desktop validation; no duplicate post or private character assets are added. |
| M-08 | complete | Publish an in-depth avatar research article comparing the experiments with Live2D. | Research article, three project cross-links and VTuber/Live2D archive tags published. Content, privacy, Pages build/deploy, rendered article, listing/search/RSS entries checked; scope and remaining verification limits are in docs/AVATAR_RESEARCH_PUBLICATION.md. |

## Maintenance — 2026-10-06

| ID | Status | Task | Acceptance criteria |
|---|---|---|---|
| M-05 | complete | Refresh Home's current projects. | Mesh Avatar Studio, Mopago, and PNGTuber link to their current project pages; PC/mobile display and publication verified. |
| M-06 | in progress | Add daily visit widget and 7-day chart. | Korean day buckets, no private credentials or fake history, privacy/error handling tested. Public site code is connected from 2026-10-06; public counter access checked. Production display and collection deployment verification follow. |

## Maintenance — 2026-10-03

| ID | Status | Task | Acceptance criteria |
|---|---|---|---|
| M-04 | complete | Provide the whole-blog operations handoff in the blog repository. | `docs/BLOG_OPERATIONS_HANDOFF.md` covers authoring, discovery, layout, media, privacy, RSS, GitHub publication, deployment, cleanup, and recovery; AGENTS, README, and the documentation index link to it. Individual project development is outside its scope. |

## Maintenance — 2026-10-01

| ID | Status | Task | Acceptance criteria |
|---|---|---|---|
| M-01 | complete | Reduce Resume to the owner's requested public fields. | Resume contains only BH CHOI and Education: B.S.C - Mathematics in its profile content; the introduction and Interests section are removed. |
| M-02 | complete | Fix the RSS XML error opened from the footer link. | The XML declaration is first in the generated feed, the feed parses as RSS, and the deployment workflow validates generated XML before publication. |
| M-03 | complete | Keep Mopago as a single Projects entry. | Remove the duplicate post and its cross-link; Play no longer lists the post, RSS contains one Mopago item, and the former post URL redirects to the project. |

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
| P2-01 | complete | Connect the working repository to the owner's GitHub repository. | The original Desktop-only plan is superseded by authorized AI-agent maintenance. The intended origin/main and working branch are verified before a normal fast-forward push; no history replacement is required. |
| P2-02 | complete | Document the safe GitHub Desktop workflow for pull, review, commit, push, and recovery. | `MAINTENANCE_RUNBOOK.md` provides a Korean checklist and stop conditions. |
| P2-03 | complete | Add a reproducible GitHub Pages build-and-validation workflow. | `.github/workflows/pages.yml` validates content and builds/deploys Pages after an owner-controlled push. |
| P2-04 | complete | Verify non-destructive publication and the GitHub Pages build. | Authorized main pushes and public deployment are established. M-09 through M-11 record current verification; M-11's source 4e90d62 passed Pages run 41024466225 and live checks. Each subsequent publication still requires its own same-SHA build and live-output verification. |

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

## Current follow-up

Repository connection and authorized publication are established; the initial P2-01/P2-04 connection gate is historical. Do not request the same approval again for an already authorized task. Check the current request, remote state and publication scope, then verify that task's exact commit and public output. M-06 production-widget verification and P6-02's broader audit remain separate open work; do not infer their completion from a README or Home check.
