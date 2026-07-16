# BH CHOI personal site

This is a Jekyll-based GitHub Pages site. It is organized so that routine updates require editing content files, not layouts or code.

## Start here

- Change the home page: `index.md`
- Change the Resume dummy data: `_data/profile.yml`
- Add an item: copy one file in `templates/` into the matching folder.
- Review the full beginner workflow: `MAINTENANCE_RUNBOOK.md`
- See writing rules: `CONTENT_GUIDE.md`

The intended public address is `https://cbh456746.github.io/`. This repository has no custom-domain `CNAME` file.

## Content folders

| Folder | Use | Public URL |
| --- | --- | --- |
| `_projects/` | Working outputs | `/projects/name/` |
| `_research/` | Research records | `/research/name/` |
| `_notes/` | Learning/work notes | `/notes/name/` |
| `_posts/` | Play/free-form writing | `/play/name/` when a permalink is supplied |

Run `npm run validate` before committing if Node.js is installed. GitHub Actions runs the Jekyll build when the repository is pushed to `main`.
