# Content guide

## The simplest routine

1. Pick a matching file from `templates/`. For Stock analysis, follow [Stock operations](docs/STOCK_OPERATIONS.md) and target a current Star.
2. Copy it into `_projects`, `_research`, `_notes`, or `_posts`.
3. Change the title, date, tags, and body.
4. Run `npm run validate` or let GitHub Actions check the push.

AI agents perform routine authoring, review and authorized publication; the owner supplies the intended outcome and materials. For every blog-writing/change task, also update `index.md`'s `home_current` task/date/actual summary and the relevant Currently exploring cards, as required by [AGENTS.md](AGENTS.md). This includes documentation tasks; read-only reuse from another project does not modify the blog. See the [human operating guide](README.md).

Before publishing a new or substantially revised article, follow [the reader-first style guide](STYLE_GUIDE.md). Check the rendered page as a human would: can the reader identify the goal, first action and result without reading a wall of text? Add a screenshot, diagram or motion clip only when it makes a particular step easier to understand. Media is optional, never a required count.

File names should be lowercase English with hyphens, for example `my-first-project.md`. Dates use `YYYY-MM-DD HH:MM:SS`.

## Reviewed context for reuse

Every published document needs the `context` block provided by its template. Fill `reviewed_on` with the summary review date; write `summary`, evidence-based `findings`, `limits`, and the actual search `keywords`. Use arrays for `followups` and site-relative `related` article URLs; use `[]` when none apply. A generated artifact and a met quality target are separate facts. A summary review is not a fresh validation of old code or results.

The original article date stays intact. Optional `updated` is the actual material-content update date; leave it absent if unknown. Recheck the summary when the article's claims change. Do not maintain a separate hand-edited copy of the body or generated index. Jekyll and the Pages export step refresh the reference files from the same source commit.

Long prompt appendices may be marked with `data-context-appendix="slug"`. The exporter keeps the appendix text and links it from the narrative and index. Keep exact prompt/code payloads, captions and media links. Run `npm run test:context` for export changes; the build validates summaries and rendered output. See [AI reference operations](docs/AI_REFERENCE_GUIDE.md).

## Tag rules

- Never use `Blog`; use `Play`.
- Any game-related item must include both `Play` and `Game`.
- Projects begin with `Projects`; research begins with `Research`; notes begin with `Notes`.
- Reuse existing spellings such as `Data-Science`, `Machine-Learning`, and `Big-Data-Analyst`.
- Add a new tag to `_data/tag-index.yml` when it should appear in the archive index.

## Editing without code

The text between the first pair of `---` lines is the information box (title, date, tags). Keep its punctuation and indentation. Write the article below the second `---` line using ordinary Markdown.

Use `![short description](/assets/images/file-name.jpg)` for images saved under `assets/images/`. Add a useful caption and source when the context is not obvious. Put PDFs and downloadable files under `assets/files/` and link them with `[download](/assets/files/file.pdf)`.

For video or animation, prefer controls or an explicit open action, plus a still description and a source link. Only embed a provider iframe when its third-party load is justified for every reader. Check rights, privacy, file size and mobile rendering before publishing.

## A presentation inside an article

The reusable slide viewer shows one **still** slide at a time, with Previous, current/total, Next and Enlarge controls beneath it. The enlarged view links to the original image for further zoom on a phone. It has no autoplay or transition animation. It works in Projects, Research, Notes and Play articles without a server or a third-party presentation iframe. Without JavaScript, the same slides appear in order with direct links to their full-size images.

Design slides for a reader, not as screenshots of dense paragraphs. Give each slide one main point, keep text brief, and use a relevant image, diagram, chart or visual comparison when it makes that point easier to grasp. A chart must use verified data and clear labels; a decorative image is optional, not a quota. Check that key text is legible on a phone in Enlarge view and that the article still explains the evidence and limits outside the images.

Convert a reviewed PPTX into individual images **before publication**. Keep the original PPTX outside the public repository by default; check hidden slides, notes, comments, embedded images, rights and metadata before publishing any derivative. Put images at `assets/images/presentations/<deck-slug>/slide-01.webp`, `slide-02.webp`, and so on. Use PNG if thin lines or small text look poor in WebP. A reviewed PDF may be linked separately from `assets/files/presentations/`. Do not publish a placeholder deck or a private presentation merely to test the component.

Add a `slides` list to the article's YAML front matter (alongside its usual title, date, tags and reviewed `context` block):

```yaml
slides:
  - image: /assets/images/presentations/<deck-slug>/slide-01.webp
    alt: "Describe the useful content of slide 1"
    caption: "Slide 1 title and short explanation"
    width: 1920
    height: 1080
```

Replace `<deck-slug>` with a lowercase hyphenated name and add one entry per actual slide. Put `{% include slide-deck.html slides=page.slides %}` at the point in the article where readers should see the slides. The validator requires existing, numbered local images and nonempty plain-text `alt`/`caption` and dimensions. Version 1 supports one deck per article. Keep important slide claims in ordinary article text too, because image text is not automatically extracted into the blog's AI-readable reference export.

Before publication, test the article at desktop and narrow mobile widths, use the toolbar with keyboard only, close Enlarge with Esc, and check the no-JavaScript reading order. The first and last navigation buttons must disable at the ends. Verify slide appearance, link targets, dark mode, file size and published context export.
