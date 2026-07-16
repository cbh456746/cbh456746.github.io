# Content guide

## The simplest routine

1. Pick a matching file from `templates/`.
2. Copy it into `_projects`, `_research`, `_notes`, or `_posts`.
3. Change the title, date, tags, and body.
4. Run `npm run validate` or let GitHub Actions check the push.

File names should be lowercase English with hyphens, for example `my-first-project.md`. Dates use `YYYY-MM-DD HH:MM:SS`.

## Tag rules

- Never use `Blog`; use `Play`.
- Any game-related item must include both `Play` and `Game`.
- Projects begin with `Projects`; research begins with `Research`; notes begin with `Notes`.
- Reuse existing spellings such as `Data-Science`, `Machine-Learning`, and `Big-Data-Analyst`.
- Add a new tag to `_data/tag-index.yml` when it should appear in the archive index.

## Editing without code

The text between the first pair of `---` lines is the information box (title, date, tags). Keep its punctuation and indentation. Write the article below the second `---` line using ordinary Markdown.

Use `![short description](/assets/images/file-name.jpg)` for images saved under `assets/images/`. Put PDFs and downloadable files under `assets/files/` and link them with `[download](/assets/files/file.pdf)`.

To embed a video, use the provider's iframe embed code in the body. Only embed videos you are comfortable loading for every reader.
