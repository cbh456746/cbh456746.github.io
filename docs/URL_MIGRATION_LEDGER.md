# URL migration ledger

> Status: P1-01 complete — local source inventory and owner browser
> verification are complete.
>
> Last checked: 2026-07-17 (Asia/Seoul)

## How to read this ledger

- **Source output status** is determined from the supplied Jekyll source,
  not from an assumption that a file is publicly visible.
- **Candidate current URL** is an expected Jekyll route derived from the
  filename and `permalink: pretty`. It is not evidence that the route is
  currently live.
- **Target URL** is the proposed permanent destination after the information
  architecture is implemented. No redirect, rename, or content move is
  authorized by this document alone.
- Before any URL change, verify candidate routes against the deployed site and
  record the result in the final column.

## Verification limitation

The public address `https://cbh456746.github.io/` could not be read from this
environment on 2026-07-17: the web client rejected the direct request and the
local HTTPS client failed before receiving a response. This is an environment
TLS limitation, not proof that the website is unavailable. The first GitHub
connection/build phase must repeat the check from GitHub Pages or a normal
browser before deploying URL changes.

The owner completed the normal-browser check on 2026-07-17. The root page,
About, archive, search JSON, and RSS feed opened successfully. Both legacy
post candidate routes returned 404.

## Site-level routes

| Current source | Candidate current URL | Target URL | Preservation action | Verification |
|---|---|---|---|---|
| `index.html` | `/` | `/` | Keep path; later replace content with the Soul home layout. | Opened in owner browser |
| `about.html` | `/about/` | `/resume/` | Keep `/about/` as a compatibility redirect after the Resume page exists. | Opened in owner browser |
| `archive.html` | `/archive/` | `/archive/` | Keep path; replace the current filter UI with the tag-index archive. | Opened in owner browser |
| `search.json` | `/search.json` | `/search.json` | Keep path for search compatibility. | Opened in owner browser |
| `feed.xml` | `/feed.xml` | `/feed.xml` | Keep path; update content metadata only. | Opened in owner browser |
| `404.html` | `/404.html` | `/404.html` | Keep path. | Not part of this route migration check |
| `offline.html` | `/offline.html` | Decide with PWA work | Keep unchanged until the service-worker decision is made. | Not part of this route migration check |

## Content routes in the supplied archive (before P1-02)

| Source file | Source output status | Candidate current URL | Target URL | Preservation action | Verification |
|---|---|---|---|---|---|
| `2014-01-29-hello-2015.markdown` | Valid post filename and front matter | `/2014/01/29/hello-2015/` | `/play/hello-2015/` | Publish as public legacy content; no redirect is required because the candidate current route is 404. | Confirmed 404 in owner browser |
| `2025-03-15-hello_trans.md` | Valid filename and front matter, but filename/date metadata conflict | `/2025/03/15/hello_trans/` | `/play/hello-2015-ko/` | Publish as public legacy content; no redirect is required because the candidate current route is 404. Settle displayed date before publication. | Confirmed 404 in owner browser |
| `2025-03-17-로컬환경에서 깃허브 수정하기.md` | Filename is valid; front matter is missing | No source-generated post route expected | `/notes/github-desktop-local-workflow/` | Create as a new Notes route after metadata normalization. | No current route expected |
| `25-03-15-# 네이버 금융 증권사 리포트 투자의견 크롤링 해보기.md` | Invalid post date prefix; front matter is missing | No source-generated post route expected | `/projects/naver-finance-report-crawler/` | Create as a new Project route after metadata normalization. | No current route expected |
| `25-03-15-Bugs 가사 크롤러.md` | Invalid post date prefix; front matter date conflicts with filename | No source-generated post route expected | `/projects/bugs-lyrics-crawler/` | Create as a new Project route after date confirmation. | No current route expected |
| `25-03-15-인구 피라미드 시각화 프로젝트.md` | Invalid post date prefix; front matter is missing | No source-generated post route expected | `/projects/japan-population-pyramid/` | Create as a new Project route after metadata normalization. | No current route expected |
| `25-03-20-Confusion_matrix.md` | Invalid post date prefix | No source-generated post route expected | `/notes/confusion-matrix/` | Create as a new Notes route. | No current route expected |
| `25-03-20-빅데이터분석기사 8회 기출.md` | Invalid post date prefix | No source-generated post route expected | `/notes/big-data-analyst-8th-exam/` | Create as a new Notes route. | No current route expected |
| `25-03-21-1단원 예상문제.md` | Invalid post date prefix | No source-generated post route expected | `/notes/big-data-analyst-unit-1-practice/` | Create as a new Notes route. | No current route expected |
| `25-03-21-Hypothesis_test.md` | Invalid post date prefix; front matter date conflicts with filename | No source-generated post route expected | `/notes/hypothesis-testing-basics/` | Create as a new Notes route after date confirmation. | No current route expected |
| `25-03-21-Note.md` | Invalid post date prefix | No source-generated post route expected | `/notes/data-collection-frameworks/` | Create as a new Notes route; replace the generic title. | No current route expected |
| `25-03-21-PCA.md` | Invalid post date prefix; title needs correction | No source-generated post route expected | `/notes/principal-component-analysis/` | Create as a new Notes route after title correction. | No current route expected |
| `25-03-21-빅데이터분석기사 1단원 요약정리.md` | Invalid post date prefix | No source-generated post route expected | `/notes/big-data-analyst-unit-1-summary/` | Create as a new Notes route. | No current route expected |

## P1-02 local normalization record

The following normalization is complete in the local work repository only. It
has not been pushed to GitHub or deployed. Existing front-matter dates were
preserved; when front matter was absent, the `25-03-…` filename prefix was
interpreted as 2025.

| Supplied archive file | Normalized local file | Date source | Content type/tags |
|---|---|---|---|
| `2014-01-29-hello-2015.markdown` | `2015-01-29-hello-2015.md` | Existing front matter (2015-01-29) | `Play`, `Legacy` |
| `2025-03-15-hello_trans.md` | `2015-01-29-hello-2015-ko.md` | Existing front matter (2015-01-29) | `Play`, `Legacy` |
| `2025-03-17-로컬환경에서 깃허브 수정하기.md` | `2025-03-17-github-desktop-local-workflow.md` | Filename | `Notes`, `Git`, `GitHub-Desktop` |
| `25-03-15-# 네이버 금융 증권사 리포트 투자의견 크롤링 해보기.md` | `2025-03-15-naver-finance-report-crawler.md` | Filename | `Projects`, `Data-Science`, `Web-Scraping`, `Finance` |
| `25-03-15-Bugs 가사 크롤러.md` | `2023-03-15-bugs-lyrics-crawler.md` | Existing front matter (2023-03-15) | `Projects`, `Web-Scraping`, `Data-Collection`, `Music` |
| `25-03-15-인구 피라미드 시각화 프로젝트.md` | `2025-03-15-japan-population-pyramid.md` | Filename | `Projects`, `Data-Visualization`, `Statistics`, `Japan` |
| `25-03-20-Confusion_matrix.md` | `2025-03-20-confusion-matrix.md` | Existing front matter (2025-03-20) | `Notes`, `Data-Science`, `Statistics`, `Machine-Learning` |
| `25-03-20-빅데이터분석기사 8회 기출.md` | `2025-03-25-big-data-analyst-8th-exam.md` | Existing front matter (2025-03-25) | `Notes`, `Big-Data-Analyst`, `Exam` |
| `25-03-21-1단원 예상문제.md` | `2025-03-21-big-data-analyst-unit-1-practice.md` | Existing front matter (2025-03-21) | `Notes`, `Big-Data-Analyst`, `Exam` |
| `25-03-21-Hypothesis_test.md` | `2023-03-18-hypothesis-testing-basics.md` | Existing front matter (2023-03-18) | `Notes`, `Statistics`, `Hypothesis-Testing` |
| `25-03-21-Note.md` | `2025-03-21-data-collection-frameworks.md` | Existing front matter (2025-03-21) | `Notes`, `Data-Engineering`, `Data-Collection` |
| `25-03-21-PCA.md` | `2025-03-21-principal-component-analysis.md` | Existing front matter (2025-03-21) | `Notes`, `Data-Science`, `Machine-Learning`, `PCA` |
| `25-03-21-빅데이터분석기사 1단원 요약정리.md` | `2025-03-21-big-data-analyst-unit-1-summary.md` | Existing front matter (2025-03-21) | `Notes`, `Big-Data-Analyst`, `Exam` |

## Required verification before changing routes

1. Completed: the owner verified the five applicable site-level routes in a
   normal browser.
2. Completed: both legacy-post candidate routes return 404, so no legacy URL
   redirect is required for those routes.
3. The local implementation now assigns the target collection routes and the
   two explicit `/play/…/` legacy routes. After the owner connects and pushes
   the real repository, confirm the GitHub Pages build generated every route
   in this table.
4. Completed for file names and front matter: all 13 local posts have a valid
   `YYYY-MM-DD-slug.md` name, front matter, title, and matching date.
5. Collection moves and the `/about/` compatibility page are implemented
   locally. Published-output verification remains owner-controlled.
