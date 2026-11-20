# GitHub Desktop 운영 매뉴얼

GitHub Desktop으로 변경을 직접 검토하고 게시할 때 사용하는 보조 안내입니다. 전체 블로그 운영 기준은 [블로그 운영 인수인계서](docs/BLOG_OPERATIONS_HANDOFF.md)에 있습니다.

## 처음 연결하는 PC

1. GitHub Desktop에 로그인하고 **File → Clone repository**에서 `cbh456746/cbh456746.github.io`를 선택합니다.
2. 로컬 복제본을 둘 폴더를 고릅니다. 이미 같은 저장소를 복제했다면 GitHub Desktop에서 그 복제본을 선택합니다.
3. 저장소 주소와 브랜치를 확인한 뒤 **Fetch origin**으로 원격 상태를 확인합니다.

## 변경 검토와 게시

1. **Changes** 탭에서 기존 로컬 변경을 확인합니다. 원격에 업데이트가 있고 충돌 없이 가져올 수 있으면 **Pull origin**을 사용합니다.
2. 승인된 변경의 diff를 파일별로 검토합니다. 블로그 변경은 [작업 원장](TASKS.md)과 Home의 `home_current`에 실제 작업 상태를 반영합니다.
3. 게시할 파일만 선택하고 커밋 메시지를 작성합니다. **Push origin**으로 승인된 브랜치에 게시합니다. 공개 배포는 `main`을 기준으로 실행됩니다.
4. [GitHub Actions](https://github.com/cbh456746/cbh456746.github.io/actions)에서 방금 게시한 커밋의 **Build and deploy GitHub Pages**가 성공했는지 확인합니다. 실제 공개 페이지를 열어 변경 사항과 링크를 확인합니다.

충돌이나 예상 밖의 삭제가 보이면 대상 파일과 브랜치를 먼저 확인합니다. 빌드가 실패하면 해당 커밋의 Actions에서 실패한 단계를 확인합니다.

## 공개 주소 검수

| 화면 | 주소 |
| --- | --- |
| Home | `/` |
| Resume | `/resume/` |
| Projects | `/projects/` |
| Board | `/workbench/` |
| Research | `/research/` |
| Notes | `/notes/` |
| Play | `/play/` |
| Stock | `/stock/` |
| Archive | `/archive/` |

변경된 화면은 데스크톱과 좁은 화면에서 확인합니다. 글을 수정했다면 해당 글의 주소와 관련 목록을 함께 점검합니다.

## 초기 이관 기록

초기 개편 때는 전달된 ZIP을 검토해 기존 복제본에 필요한 파일을 옮겼습니다. 현재 일상 작업은 위의 **변경 검토와 게시** 절차를 따릅니다. 당시 이관 대상과 주소 후보는 [콘텐츠 이관 등록부](docs/CONTENT_MIGRATION_REGISTER.md)와 [URL 원장](docs/URL_MIGRATION_LEDGER.md)에 기록되어 있습니다.
