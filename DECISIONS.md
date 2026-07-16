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

**Decision:** The first Resume page will use clearly marked dummy values, such as `Hong Gildong` and `dummyemail@gmail.com`. The values will live in one documented data source so they can be replaced without editing layouts.

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
