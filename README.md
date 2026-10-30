# BH CHOI personal site

This is a Jekyll-based GitHub Pages site. It is organized so that routine updates require editing content files, not layouts or code.

## Start here

- Reuse prior posts in a new Codex project: [reading entry point](https://cbh456746.github.io/llms.txt), [human guide](https://cbh456746.github.io/context/), [AI reference operations](docs/AI_REFERENCE_GUIDE.md).
- Other projects can integrate the [short AGENTS.md section](context/project-instructions.txt) and use the [reference record template](templates/reference-context.md). Read the summary index, then relevant originals, appendices and media; this is not automatic cross-project memory.

- Another agent continuing the work: [full blog operations handoff](docs/BLOG_OPERATIONS_HANDOFF.md).

- Change the home page text and links: `index.md`
- Change the approved public profile: `_data/profile.yml`
- Add an item: copy one file in `templates/` into the matching folder.
- Review the full beginner workflow: `MAINTENANCE_RUNBOOK.md`
- See writing rules: `CONTENT_GUIDE.md`

The intended public address is `https://cbh456746.github.io/`. This repository has no custom-domain `CNAME` file.

## Home photograph

Home uses the reviewed landscape export at `assets/images/home-garden.webp`. The original photograph is kept outside this public repository. On wide screens the title sits in the open sky; on mobile the photograph follows the introduction so the text stays readable.

To edit the wording, change the text between HTML tags in `index.md` while retaining the surrounding tags and class names. The four section links and two current-project links can be edited in the same file. The layout is selected by `home_design: garden`; its styles are scoped under `.home-garden` in `css/site.css`.

Before replacing the photograph, remove EXIF and other personal metadata, use a reasonably sized web export, and check both desktop and mobile crops. Update the image's `width`, `height`, and Korean `alt` description to match the replacement. Keep originals and private backup material outside this repository.

## Content folders

| Folder | Use | Public URL |
| --- | --- | --- |
| `_projects/` | Working outputs | `/projects/name/` |
| `_research/` | Research records | `/research/name/` |
| `_notes/` | Learning/work notes | `/notes/name/` |
| `_posts/` | Play/free-form writing | `/play/name/` when a permalink is supplied |

Run `npm run validate` before committing if Node.js is installed. GitHub Actions runs the Jekyll build when the repository is pushed to `main`.

The Pages workflow also runs `npm run test:context`'s Python contract tests and exports reviewed context from rendered article bodies after Jekyll. Published content needs the `context` metadata described in [CONTENT_GUIDE.md](CONTENT_GUIDE.md). Generated files under `_site/` are not committed. See [the reference guide](docs/AI_REFERENCE_GUIDE.md) for schema, provenance and publication checks.
