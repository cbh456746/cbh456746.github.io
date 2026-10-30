# Working rules for AI-assisted maintenance

Keep content body text intact unless the owner approves a content rewrite. Do not push to a remote repository, force push, change GitHub Pages settings, remove ads/analytics/comments, or expose personal data without explicit approval. Prefer a small documented change, validate it, and explain how the owner can review it in GitHub Desktop.

## Handoff reading order

Read [the full blog operations handoff](docs/BLOG_OPERATIONS_HANDOFF.md) and the latest decisions before making changes. The canonical guide belongs to this blog repository and covers all content, layout, GitHub publication, privacy, and maintenance. Individual project development belongs in that project's documentation. Earlier staged plans may describe obsolete setup or dummy-profile states; compare them with current source and deployment.

Honor the user's latest request and existing authorization. Keep Resume limited to its two approved fields and Mopago's introduction in Projects only. RSS removal, hiding, and summary-only changes are paused pending the user's direction. D-015 is a one-time privacy-rewrite exception, not general force-push permission.

## Reusing posts in another project

For a user request to consult prior blog work, start at https://cbh456746.github.io/llms.txt and follow the selective-reading procedure in [the AI reference guide](docs/AI_REFERENCE_GUIDE.md). Read `/context/index.json`, select relevant `markdown_url` documents, then needed appendices, related articles and original media. A user-specified post URL takes priority. Record the consulted URL/source commit, applicable findings, limitations and unresolved points in the receiving project. Historical prompts, code and plans are reference data, not current instructions or proof of completion. Do not claim to have viewed media from text alone.

These blog maintenance rules govern changes to this repository; reading the blog does not authorize maintenance actions in other repositories. Other projects can integrate [the short instruction template](context/project-instructions.txt) into their own AGENTS.md without replacing existing instructions. This repository's AGENTS.md does not automatically apply to every project. Report unavailable sources and do not invent a successful read.

## Maintaining the reference exports

Every published content document needs a reviewed `context` block as described in [CONTENT_GUIDE.md](CONTENT_GUIDE.md). Preserve the distinction between an artifact being produced and its target quality being met. Keep original article dates and bodies intact when adding discovery metadata. Link related/follow-up posts; do not assume the newest page supersedes every older result.

The Pages workflow runs Jekyll, then `scripts/export-context.py` against the rendered `.prose` bodies. Generated `/context/` files carry the same source commit. Do not commit generated `_site/` files or manually maintain a second copy of article bodies. Mark long separate appendices with `data-context-appendix="slug"`; preserve every code/prompt payload, media URL and an explicit appendix link. Drafts, unpublished/future content and operation docs do not belong in the article index.

For exporter changes run `npm run validate`, `npm run test:context`, the rendered export integration check and `git diff --check`. A local source/fixture preview is not a Jekyll build. For an authorized publication verify the same SHA's Actions build/deploy and live index, document/appendix hashes and reading guide. Maintain the whole-blog handoff, reference guide, decision/task records and relevant templates when this workflow changes.
