# Architecture and product decisions

Each entry records a decision that future maintainers and AI agents must honor. A later change must add a new entry explaining why the earlier decision is no longer appropriate.

## Accepted decisions

### D-001 — Keep Jekyll and GitHub Pages as the platform

Modernize the existing Jekyll site incrementally instead of migrating to a different site generator. This preserves existing content, GitHub Pages compatibility, and Markdown-first authoring.

### D-002 — Separate the Soul home page from the Resume page

The root page is a freely edited Soul page. It must not list personal details, career history, contact information, or a generated recent-post feed by default. A dedicated one-page Resume contains the concise introduction, current focus, research interests, representative work, experience, skills, and approved contact links.

### D-003 — Use Play and Game as controlled tags

Do not create or retain a general `Blog` tag. Use `Play` for free-form personal content. Every game-related item uses `Game`; game play records normally use both `Play` and `Game`, while game projects or research also include their content-type and technical tags.

### D-004 — Make tag discovery a first-class archive feature

On desktop list and archive views, a left-side tag index is the primary category control. Selecting a tag displays that tag's post-title list at the top of the main content area and keeps the selection in the URL. The Soul home page does not force this interface.

### D-005 — Design PC-first, but keep mobile feature-complete

Test the richest layout in the latest Microsoft Edge. At smaller widths the left index becomes an accessible horizontal or collapsible control; navigation, search, reading, and tag filtering remain available.

### D-006 — Preserve before migrating

No existing post, page, or URL is renamed, moved, deleted, or redirected until its migration-register row has an approved target and a verification result.

### D-007 — Publish at the GitHub Pages account domain

**Decision:** The intended public address is `https://cbh456746.github.io/`. The inherited custom-domain configuration must not be retained when publication-safety work begins.

**Why:** The supplied `CNAME` points to the original theme author's domain, not the selected site address. Canonical URLs, service-worker scope, and deployment settings must use the selected GitHub Pages address.

### D-008 — Keep the inherited Hello 2015 sample posts

**Decision:** Keep both inherited Hello 2015 posts as public legacy content. Their current published paths must be determined and preserved before any reorganization.

**Why:** They are part of the site's history and should not be silently removed during modernization.

### D-009 — Use editable dummy data for the first Resume implementation

**Decision:** The first Resume page will use clearly marked dummy values, such as an example name and example email. The values will live in one documented data source so they can be replaced without editing layouts.

**Why:** Resume content is intentionally deferred, but page structure and maintenance ergonomics can still be implemented safely.

### D-010 — Defer external-service decisions without changing behavior

**Decision:** The choices for AdSense, Disqus, and analytics are deferred. Until a later explicit decision, their current configuration and loading behavior will not be changed as part of unrelated work.

**Why:** Removing or modifying these services changes privacy, performance, and visitor behavior; it should be a dedicated, reviewable task.

### D-011 — Start project pages without external project materials

**Decision:** No repository, download, PDF, gallery, or data-source link is required for the first project-page structure. Templates must hide empty optional sections cleanly.

**Why:** The information architecture should not force placeholder links or prevent future project documentation.

### D-012 — Treat remote GitHub operations as a guided, owner-controlled phase

**Decision:** GitHub connection, the first push, and GitHub Pages build verification are a dedicated phase. The workflow will use GitHub Desktop where possible, compare remote and local history before connecting, and never use force push. Any action that can modify the remote repository or production site requires the owner's authenticated account and explicit approval.

**Why:** The owner wants a repeatable, low-code maintenance workflow and has not recently used Git operations. Separating connection from site changes prevents accidental overwrites.

### D-013 — Retire the inherited service worker

**Decision:** Do not register the inherited service worker in the modernized layout. On a visitor's first updated page load, unregister old registrations and clear only the old theme's known cache names.

**Why:** An old service worker can keep serving an obsolete layout even after a successful GitHub Pages deployment. Retiring it is safer than attempting to maintain stale precache rules.

## Open decisions

| ID | Decision required | Why it blocks later work |
|---|---|---|
| O-004 | Keep, replace, or remove AdSense, Disqus, and analytics. | Each affects privacy, performance, layout, and required documentation. |

### D-014 — Restrict public profile and publish a reviewed video example

The owner approved the public name BH CHOI, University of Seoul department of mathematics (B.S.C), and the interests 하츠네미쿠, 게임, 수학 on 2026-10-01. Replace prior biographies and dummy Resume data with these fields. Remove inherited unused account identifiers and the unused custom-domain file. Keep project and academic content and copyright attribution.

The supplied short video is published as a muted, metadata-free example in the existing browser/VTube Studio project. It illustrates visible avatar state changes; it does not independently validate the entire tracking, authentication, or reconnect chain.

Past commits contained removed personal information. Preparing sanitized history was authorized here; D-015 records the owner's later explicit approval of remote replacement.

### D-015 — Apply the approved privacy rewrite and photograph-based Home

On 2026-10-01 the owner explicitly approved the reviewed history replacement after the effect on commit IDs, signatures, local clones, and residual external copies was explained. This is a specific exception to D-012; it does not authorize unrelated force pushes. Replace main with `force-with-lease` against the reviewed previous head, preserve the current file tree and commit dates, and retain account attribution through the owner's GitHub no-reply address. Private recovery material must remain outside the public repository.

The owner also authorized using and cropping the supplied landscape photograph for Home. Publish a metadata-free web export, keep the original untouched, and use responsive layout to balance the sky, trees, and typography. Home copy and project links remain editable in `index.md`; scoped visual rules live in `css/site.css`.

### D-016 — Minimize Resume content and validate RSS before deployment

On 2026-10-01 the owner restricted Resume profile content to BH CHOI and Education: B.S.C - Mathematics. This supersedes D-014 for Resume: omit the introduction, university name, and Interests section from that page and its profile data.

Keep the existing RSS subscription link and correct the feed's leading whitespace error. The deployment workflow must parse the generated feed as XML before publishing it.

### D-017 — Keep Mopago in Projects without a duplicate post

The owner requested a single project entry for Mopago because it has its own repository and deployed application. Keep `_projects/mopago.md` as the canonical introduction and remove the duplicate post. Preserve previously shared links with a redirect from `/play/mopago/` to `/projects/mopago/`; the redirect is not a post and does not create a second feed item.

### D-018 — Maintain the whole-blog operations handoff in this repository

The owner requested a handoff for overall blog operation, rather than an individual project's development. Keep the canonical guide at `docs/BLOG_OPERATIONS_HANDOFF.md` in this blog repository. It covers authoring, content discovery, layout, media, privacy, GitHub publication, deployment, cleanup, and recovery. Link it from AGENTS, README, and the documentation index; keep project-specific implementation instructions in the corresponding project repositories.

RSS removal, hiding, and summary-only changes remain paused after the owner's stop request. Document the current behavior without treating this handoff as permission to change it. Earlier modernization plans are historical where superseded by current source and later decisions.

### D-019 — Add daily visit statistics without private credentials or invented data

On 2026-10-06 the owner requested current Home projects and a daily visitor widget matching the garden design. Update the manually curated cards to Mesh Avatar Studio, Mopago, and PNGTuber. Preserve the hero, navigation, profile restrictions, RSS, and unrelated content.

Prepare a GoatCounter adapter using Korean date buckets across all blog pages, with aggregate numbers only. The provider account/site code must be supplied before collection is enabled. Do not create a made-up counter, publish an API token, turn total page loads into daily visitors, or fill missing history with zeros. Respect browser privacy preferences and exclude local/automated previews. Show cached, estimated session-based counts with their limitations. Other advertising/comment/analytics choices remain separate.

On the same day the owner supplied the newly registered service through a setup screenshot. Its public site code is `cbh456746`; enable the existing adapter from Korean date 2026-10-06. Only the public code is recorded. Do not copy the account screenshot, email, login, or verification link to the repository. Public counter access was checked without creating test visits.
