# Project documentation

This directory is the source of truth for the staged modernization of this personal site. These documents describe the repository as it exists today and the decisions that govern future work; they do not, by themselves, change the published website.

## Reading order

1. [PRODUCT_REQUIREMENTS.md](PRODUCT_REQUIREMENTS.md) — product goals and non-negotiable user-experience requirements.
2. [BASELINE_AUDIT.md](BASELINE_AUDIT.md) — inherited theme, content, deployment, and maintenance risks.
3. [CONTENT_MIGRATION_REGISTER.md](CONTENT_MIGRATION_REGISTER.md) — inventory and proposed destination for every known Markdown document.
4. [../DECISIONS.md](../DECISIONS.md) — accepted decisions and blockers for irreversible work.
5. [../TASKS.md](../TASKS.md) — ordered implementation queue and acceptance criteria.

## Operating rules

- Preserve existing content and published URLs until the migration register records the target path and verification result.
- Do not change `CNAME`, advertising, comments, analytics, or the service worker until their ownership and intended use are confirmed.
- Make one approved task at a time. Each task requires verification, documentation updates when applicable, and one focused commit.
- Treat `Play` as the replacement for the former general-purpose blog label. Use `Game` as a separate required tag for game-related content.
- Treat GitHub connection, pull, commit, push, and GitHub Pages publication as separate, documented actions. Never force-push or overwrite a remote branch to resolve a mismatch.

## Document status

Phase 0 is documentation-only. No existing page, post, asset, deployment setting, or URL has been changed as part of this phase.
