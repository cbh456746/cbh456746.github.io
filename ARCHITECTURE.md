# Architecture

The site is a static Jekyll GitHub Pages site. GitHub builds the source files and publishes the generated HTML; no database or server is required.

```text
Markdown/YAML content → Jekyll layouts + CSS/JS → GitHub Pages
     _data/profile.yml       _layouts/           public website
     _projects/              css/site.css
     _research/              js/site.js
     _notes/
     _posts/
```

`index.md` is the free-form Soul home. It deliberately has no contact information. `_data/profile.yml` is the only source for the Resume's visible personal information and currently contains dummy values.

`archive.html` combines all four content sources. Its desktop sidebar uses `_data/tag-index.yml`; on mobile it becomes a horizontally scrollable row. Search and tag filtering run in the browser without a server.

The older service worker is retired with `js/sw-retire.js` so visitors do not keep receiving old cached layouts. Old PWA source files remain in the repository for now but are no longer registered.
