# Modernization task board

Status labels: `planned`, `in progress`, `blocked`, `complete`.

## Maintenance — 2026-11-12

| ID | Status | Task | Acceptance criteria |
|---|---|---|---|
| M-32 | in progress | Add a provisional Hanasaka favicon to every blog page. | A locally authored, legible SVG is linked from the shared head; Home records the change, content validation and rendered output pass, and the exact deployed commit serves the icon and link. |

## Maintenance — 2026-11-10

| ID | Status | Task | Acceptance criteria |
|---|---|---|---|
| M-31 | complete | Add a site-wide light/dark toggle. | Shared pages and the standalone Board record tool now show the moon/sun button, with a light default and browser-local selection. Content/Board validation, 13 Board tests, JavaScript syntax and diff checks passed. Source 24067c0 built/deployed in Pages run 42746473265; live PC Home, Board, records, Stock, keyboard toggle and a 390 px Home/article view passed. Live Stock exposed a white legacy quote widget despite its dark parameter; a local A/B check isolated transparent background plus `color-scheme: dark`. Correction 4faae3b built/deployed in Pages run 42747905482. The live dark Stock chart and quote cards now match, and its narrow view shows no clipping. Mermaid content rendered across a theme-triggered reload; Home summary and photo remained intact. |

## Maintenance — 2026-11-09

| ID | Status | Task | Acceptance criteria |
|---|---|---|---|
| M-30 | complete | Publish an indexable sitemap after Search Console ownership verification. | The owner confirmed Search Console ownership. Content and Board validation passed. Commit a00d9c8 built/deployed in Pages run 42617657968, including the generated XML check. Live sitemap.xml and robots.txt returned HTTP 200; the sitemap contained 33 unique same-host URLs, including Home and current research, with verification/utility pages excluded. Search Console sitemap submission remains an owner action in the verified Google session; indexing is not guaranteed. |
| M-29 | complete | Publish the owner's Google Search Console verification file at the blog root. | The 53-byte file matched the owner's original byte-for-byte. Content and Board validation passed. Commit 64356d1 built and deployed in Pages run 42616318431; the requested public URL returned HTTP 200 and the exact verification line. Search Console ownership confirmation and Google indexing are separate outcomes. |
| M-28 | complete | Publish the head-target research and human visual-editing workflow. | Published the scoped research, original design diagram and aggregate diagnostic conditions without private art/paths. Content/Board validation, 13 Board tests and 17 context tests passed. Source cd40fbc built/deployed in Pages run 42580376448; live article, Home, Research/Archive/search/RSS, Board and same-SHA context hash passed. 1440/390/320 px checks found no page overflow; wide tables scroll locally. Visual inspection passed; this follow-up shortens the headline and records evidence. Editor/new natural head rig remain unimplemented; no real VTS/OBS claim. See docs/AVATAR_HEAD_TARGETS_PUBLICATION_20261109.md. |

## Maintenance — 2026-11-06

| ID | Status | Task | Acceptance criteria |
|---|---|---|---|
| M-27 | complete | Publish the avatar workflow and motion-quality retrospective. | Published the former/current art pipeline comparison and synthetic torso, material-filtered face and relative hair diagnostics without private art or paths. Content/Board validation, 13 Board tests and 17 context tests passed. Article 2f53613 built/deployed in Pages run 42218933379. Live Research, Home, search, RSS, Board and the same-SHA context body/hash passed; 1440/390/320 px pages had no global horizontal overflow. A scoped figure-margin refinement improves mobile diagram size. The article records natural rigging as below target; no avatar code fix or real VTS/OBS verification is claimed. See docs/AVATAR_WORKFLOW_REVIEW_20261106.md. |
| M-26 | complete | Correct Kraft Heinz's TradingView exchange symbol. | The company and SEC confirmed the 2026-09-14 move to NYSE. The Stars list now uses `NYSE:KHC`; an allowlisted alias resolves old shared links and saved personal-order entries. Content validation, Board validation, JavaScript syntax and diff checks passed. Commit bd83077 built and deployed in Pages run 42143785998. The live page selected Kraft Heinz from an old `NASDAQ:KHC` URL and displayed the `NYSE:KHC` chart, delayed quote, source link and price history. |
| M-25 | complete | Publish a concise Play work log of the 2026-11-05 Stock page work. | The article summarizes 24 Stars, USD delayed quotes and Area chart, search, browser-only order editing, bottom move and compact mobile layout. A reviewed public screenshot is attributed and warns that its captured price is not current; no personal path or image metadata was published. Content validation passed. Article commit 76abde7 and mobile title fix 4e4ff2d built/deployed in Pages runs 42051220694 and 42052559778. The live article image loaded; the post appeared first in Play, Home summary rendered, and desktop, 390 px and 320 px layouts had no horizontal overflow. |

## Maintenance — 2026-11-05

| ID | Status | Task | Acceptance criteria |
|---|---|---|---|
| M-24 | complete | Add a per-Star move-to-bottom control to Watchlist personal-order editing. | `node --check`, content/Board validation and diff checks passed. Commit 91cbe14 built and deployed in Pages run 42047994152. On the live page, the first Star moved directly to the last row, remained there after reload and had its bottom button disabled. Reset restored the original first/last symbols and default sort. The 320 px and 390 px edit views had no horizontal overflow; the added buttons retained full accessible labels. Home summary rendered. No owner-curated symbols were changed. |
| M-23 | complete | Register the current Mesh Avatar research as a new Board project. | Published seven tasks, six development gates and four documented references at revision 33; preserved existing Board objects, original article text and private assets. Content validation, 13 Board tests and 17 context tests passed. Registration 9ffbe12 and responsive fix 96ca5c0 built/deployed in Pages runs 42047389452 and 42049440491. Live project switching, flow, references, downloaded handoff, media, Home and article links passed; desktop, 390 px and 320 px checks found no horizontal overflow after the selector fix. Home reflects verified work, updated 2026-11-06. The Board record stays in review pending independent acceptance; avatar development remains future work. See docs/MESH_AVATAR_BOARD_20261105.md. |
| M-22 | complete | Remove the unused vertical space below Stock Watchlist quote widgets. | Reserved quote space fell from 101 px to 69 px and row padding was reduced. Commit ddce5ab built and deployed in Pages run 42040749259; loaded quote cards remained visible on desktop, 390 px and 320 px screens. The 320 px check exposed the existing body minimum width and its 15 px horizontal scroll with a vertical scrollbar; a follow-up CSS fix removes that forced minimum. The final follow-up SHA and live view must also be checked before delivery. |
| M-21 | complete | Rewrite the LivLiv Player Notes tutorial with useful media and durable reader-first guidance. | A public demo screenshot and optional attributed official GIF were added without rehosting the licensed character animation. AGENTS, Content, Style, decision and handoff guides explain reader-first writing and optional media. Content validation passed. Commit 0245da4 built and deployed in Pages run 42040175823; the live article showed the image and GIF, and its narrow layout had no horizontal overflow. Local camera/microphone performance was not tested. |
| M-20 | complete | Review livliv-dev/player and publish a source-based beginner tutorial in Notes. | The article pins upstream 83ecd9c, distinguishes PNGTuber, LivLiv package and VRM modes, provides hosted and local steps, and states microphone/camera, browser, licence and Live2D limits. Official demo URLs returned 200. Content validation passed; 77394e1 Pages build/deploy succeeded in run 42036768863. A narrow-screen inline-code overflow was fixed in 3f5fc61; its build/deploy succeeded in run 42037444339. The live article, Notes listing and Home summary were checked, and the 320px and 390px views had no horizontal overflow. Local build and physical camera/microphone tests remain explicitly outside this source review. |
| M-19 | complete | Add instant Watchlist search, user-defined Stars order and tighter row spacing. | Search filtered Apple while typing, showed an empty-result message and restored 24 rows when cleared. The explicit sort selector retained alphabetical options; up/down edit changed order, survived reload and reset to the public default. The 390px and 320px views had no horizontal overflow. Content and syntax checks passed, and eb0977a Pages build/deploy succeeded in run 42035187137. |
| M-18 | complete | Simplify Stock heading, add a Stars sort control, set 12M Area chart default and review direct list editing and dark theme. | The public page shows only STOCK as the main heading and no intro paragraph. The sort button changes the current page order without modifying Stars. The chart widget opens at 1Y in Area style; `stock.js` has a build-version URL to prevent stale browser caching. The operations guide documents authenticated editing needs and dark-theme feasibility. Content validation passed, the 9a8a972 Pages build/deploy succeeded in run 42033076822, and desktop, 390px and 320px checks found no horizontal overflow. |
| M-17 | complete | Add a top-level Stock area with owner-curated Stars and per-symbol analysis catalogs. | The owner's 24 US-listed symbols appear in the scrollable Stars list; the three KOSPI entries are excluded. USD quote widgets show price and daily dollar/percent change. Selecting a Star switches its chart and matching analysis catalog; the 390px mobile layout has no horizontal overflow. Content validation and the f5dce63 Pages build/deploy passed. The final copy clarifies delayed US stock data, and fixed quote height prevents scroll shifts while loading. Public add/remove uses the versioned list, and the validator rejects analyses outside Stars. See docs/STOCK_OPERATIONS.md. |
| M-16 | complete | Rename the public Workbench area Board and document the separate private records boundary. | e3198a5 passed Pages run 42020266910. Public Home menu/card, Board revision 28, guide and records screen were checked on PC and at 390px without horizontal overflow. Public files and staged diff contained no private repository identifier or personal PC path. The existing /workbench/ URLs remain stable; detailed AI and privacy rules are in AGENTS.md, docs/PROJECT_WORKFLOW.md and docs/BOARD_PRIVATE_RECORDS.md. Account-level app permissions are managed separately. |
| M-15 | complete | Improve Workbench readability, tutorial, media cards and private conversation/prompt file workflow. | Isolated source, content and contract tests passed. Commit 72594a4 passed Pages build/deploy in run 42017336240; public Workbench, guide, Home, media cards and conversation tool were checked on desktop and 390px. Browser entry and JSON download request were observed; JSON round-trip and invalid imports passed contract tests. Private transcripts remain outside public state. See docs/WORKBENCH_USABILITY_20261105.md. |

## Maintenance — 2026-11-02

| ID | Status | Task | Acceptance criteria |
|---|---|---|---|
| M-13 | complete | Connect goals, project tasks, reference repositories and bounded agent review in a public workbench. | Canonical data, board/flow/reference/detail and handoffs implemented; 9 workflow and 17 existing reference tests passed. PC/mobile, actual Jekyll/RSS/context and c5482eb same-SHA Actions/public output verified. Pre-deployment backup and checked forward-only recovery route retained; see docs/WORKBENCH_RELEASE.md. Actual model execution and unattended editing remain follow-ups. |
| M-12 | complete | Point the existing footer GitHub link to this blog repository. | The shared footer links to cbh456746/cbh456746.github.io with the existing GitHub label; no extra button or widget. Home records this task and date. Content validation, same-commit Pages deployment and the published Home/footer destination must pass verification. |

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
