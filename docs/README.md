# Project documentation

For the human operating overview start with [README](../README.md). AI agents perform the requested writing/design/code/checks/publication using [AGENTS.md](../AGENTS.md) and the canonical whole-blog handoff. Every blog change task also maintains Currently exploring; the original phase documents below remain historical where superseded by later decisions.

This directory is the source of truth for the staged modernization of this personal site. These documents describe the repository as it exists today and the decisions that govern future work; they do not, by themselves, change the published website.

## Reading order

For ongoing maintenance, begin with [the full blog operations handoff](BLOG_OPERATIONS_HANDOFF.md), the latest accepted decisions, and current source. This repository owns the canonical operations guide; project-specific development is documented in each project repository. The documents below retain the original modernization stages; statements about dummy profiles or an unconnected repository are historical and must not be restored as the current state.

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

- [AI post reference operations](AI_REFERENCE_GUIDE.md) — canonical reading workflow, context metadata, exports and cross-project templates.
- [Reference workflow review](CODEX_POST_REFERENCE_REVIEW.md) — the initial 19-post audit and alternatives.
- [Reference implementation/publication record](AI_REFERENCE_PUBLICATION.md) — scope, tests and deployment verification.
- [Reference scale and failure review](AI_REFERENCE_SCALE_REVIEW.md) — 1,205-article paging tests, failed attempts, corrections and scale limits.

- [KEL animation research publication](KEL_ANIMATION_RESEARCH_PUBLICATION.md) — the 2026-10-30 failed-target animation study, selected visual evidence, collapsible actual prompts, reproduction scope and deployment checks.

- [Hiyori head-motion research publication](HIYORI_HEAD_MOTION_RESEARCH_PUBLICATION.md) — the 2026-10-26 comparison-photo article, selected public media, deformation evidence and verified Pages/desktop/mobile checks.

- [Avatar research publication record](AVATAR_RESEARCH_PUBLICATION.md) — the 2026-10-18 Live2D comparison article, public-file review, publication evidence and verification scope.

The original Phase 0 was documentation-only. Subsequent implementation and publication are recorded in the later decisions and [current handoff](BLOG_OPERATIONS_HANDOFF.md). Recheck live source and deployment before continuing work.
