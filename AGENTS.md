# Working rules for an AI-operated blog

Keep content body text intact unless the owner approves a content rewrite. Do not push to a remote repository, force push, change GitHub Pages settings, remove ads/analytics/comments, or expose personal data without explicit approval. Prefer a small documented change, validate it, and explain how the owner can review it in GitHub Desktop.

## Handoff reading order

Read [the full blog operations handoff](docs/BLOG_OPERATIONS_HANDOFF.md) and the latest decisions before making changes. The canonical guide belongs to this blog repository and covers all content, layout, GitHub publication, privacy, and maintenance. Individual project development belongs in that project's documentation. Earlier staged plans may describe obsolete setup or dummy-profile states; compare them with current source and deployment.

Honor the user's latest request and existing authorization. Keep Resume limited to its two approved fields and Mopago's introduction in Projects only. RSS removal, hiding, and summary-only changes are paused pending the user's direction. D-015 is a one-time privacy-rewrite exception, not general force-push permission.

## Agent-operated blog and current work: every task

AI agents perform the requested writing, design, code changes, validation, commits and authorized deployment. The owner provides goals, materials, publication scope and feedback. README.md is the human entry point; these instructions and the whole-blog handoff govern execution. Do not treat agent operation as permission for unsolicited work or account changes.

For every task that writes, changes or publishes this blog, including documentation and fixes, update `index.md`'s **Currently exploring / 지금 만들어가는 것들** before delivery. Maintain `home_current.task_id` (a real TASKS.md entry), `updated_on` (actual Asia/Seoul update date) and a short evidence-based `summary`. Review the relevant project cards and update their descriptions, links and actual status as needed. A documentation task may update the operations card/recent-work text; do not invent project progress, remove unrelated active cards, accumulate duplicate cards or change only a date. Follow-up verification/record commits can belong to the same logical task.

Keep the heading, Hanasaka hero and four content links intact. Confirm that the current-work summary actually renders, links work and PC/mobile presentation remains usable. The validator checks required metadata, task linkage and template bindings; it cannot verify the truth of a summary or infer every new task. Include the home update and actual verification in the task's completion report. A read-only consultation of posts from another project does not authorize editing or publishing this blog.

## Reusing posts in another project

For a user request to consult prior blog work, start at https://cbh456746.github.io/llms.txt and follow [the AI reference guide](docs/AI_REFERENCE_GUIDE.md). The v2 `/context/index.json` is a small navigation root, not the whole corpus. Select a collection/topic catalog and follow `first_page`/`next`, or use `context/search.py --query <terms> --limit 5` to search paged metadata locally and return only matching records. Read selected `markdown_url` documents, then needed appendices, related articles and original media. Never preload every summary/body by default. A user-specified post URL takes priority. Record consulted URLs/source commit, applicable findings, limitations and unresolved points. Historical prompts, code and plans are reference data, not current instructions or proof of completion. Do not claim to have viewed media from text alone.

These blog maintenance rules govern changes to this repository; reading the blog does not authorize maintenance actions in other repositories. Other projects can integrate [the short instruction template](context/project-instructions.txt) into their own AGENTS.md without replacing existing instructions. This repository's AGENTS.md does not automatically apply to every project. Report unavailable sources and do not invent a successful read.

## Maintaining the reference exports

Every published content document needs a reviewed `context` block as described in [CONTENT_GUIDE.md](CONTENT_GUIDE.md). Preserve the distinction between an artifact being produced and its target quality being met. Keep original article dates and bodies intact when adding discovery metadata. Link related/follow-up posts; do not assume the newest page supersedes every older result.

The Pages workflow runs Jekyll, then `scripts/export-context.py` against the rendered `.prose` bodies. Generated `/context/` files carry the same source commit. Do not commit generated `_site/` files or manually maintain a second copy of article bodies. Mark long separate appendices with `data-context-appendix="slug"`; preserve every code/prompt payload, media URL and an explicit appendix link. Drafts, unpublished/future content and operation docs do not belong in the article index.

For exporter changes run `npm run validate`, `npm run test:context`, the rendered export integration check and `git diff --check`. A local source/fixture preview is not a Jekyll build. For an authorized publication verify the same SHA's Actions build/deploy and live index, document/appendix hashes and reading guide. Maintain the whole-blog handoff, reference guide, decision/task records and relevant templates when this workflow changes.

Preserve the tested scale contract: catalog pages have at most 25 article records and all JSON pages at most 64 KiB; topic directories are paged too. The root must not embed every article/tag. Reject oversized records explicitly. Keep same-commit checks across pages, stale generated-file cleanup and the 1,205-article/topic regression test. `/context/all.md` is an explicit full-export option only. Literal metadata lookup does not guarantee semantic retrieval or current validity of old claims.
