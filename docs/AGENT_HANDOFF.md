# 블로그 유지보수 인수인계 시작 안내

개발·GitHub 게시·블로그 소개·레이아웃·개인정보·복구를 포함한 상세 설명서의 정본은 [모파고 저장소의 인수인계 설명서](https://github.com/cbh456746/mopago/blob/main/docs/AGENT_HANDOFF.md)입니다. 전문은 정본 한 곳에서 관리합니다.

이 안내는 블로그만 복제한 에이전트가 정본과 관련 파일을 바로 찾도록 제공합니다. 기준일은 **2026-10-03, Asia/Seoul**이며, 다음 작업 시 실제 원격과 배포를 다시 확인하세요.

## 먼저 확인할 현재 결정

- Resume는 BH CHOI와 Education: B.S.C - Mathematics만 표시합니다. 소개·Interests·연락처를 복원하지 않습니다.
- 모파고의 정식 소개는 `_projects/mopago.md`입니다. `_posts/`에 중복 소개를 만들지 않습니다.
- `play/mopago/index.html`은 이전 공유 주소를 위한 HTML 이동 안내입니다.
- Home 제목은 Hanasaka이며 기록 둘러보기 링크를 유지합니다. 네 영역의 부제와 사용자가 삭제한 소개문을 복원하지 않습니다.
- RSS는 생성과 footer 링크를 유지합니다. 삭제·숨김·요약형 변경은 사용자 중단 요청 이후 **보류**입니다.
- `_config.yml`의 `RSS: false`만으로 RSS가 숨겨진 것은 아닙니다. 실제 footer와 feed 생성 코드를 확인합니다.
- 과거 개인정보 이력 교체 승인은 특정 작업에 한정합니다. 새로운 강제 푸시에 재사용하지 않습니다.
- 초기 TASKS·ARCHITECTURE의 미연결·더미 프로필 설명은 역사적 기록입니다. 현재 구현으로 복원하지 않습니다.

## 수정 대상과 정본 설명서 연결

| 작업 | 블로그 파일 | 상세 절차 |
| --- | --- | --- |
| 모파고 소개 | `_projects/mopago.md` | [블로그 글 작성](https://github.com/cbh456746/mopago/blob/main/docs/AGENT_HANDOFF.md#blog-content) |
| Home 문구·사진·카드 | `index.md`, `css/site.css`, `_layouts/soul.html` | [레이아웃 관리](https://github.com/cbh456746/mopago/blob/main/docs/AGENT_HANDOFF.md#blog-layout) |
| Resume | `_data/profile.yml`, `_layouts/resume.html` | [공개 범위](https://github.com/cbh456746/mopago/blob/main/docs/AGENT_HANDOFF.md#privacy) |
| 게시 검사 | `scripts/validate-content.mjs`, `.github/workflows/pages.yml` | [블로그 검사·RSS](https://github.com/cbh456746/mopago/blob/main/docs/AGENT_HANDOFF.md#blog-deploy) |
| 인증·커밋·게시 | 대상 저장소의 origin·브랜치 | [GitHub 운영](https://github.com/cbh456746/mopago/blob/main/docs/AGENT_HANDOFF.md#github) |
| 실패와 복구 | 해당 오류 단계의 파일·로그 | [복구 절차](https://github.com/cbh456746/mopago/blob/main/docs/AGENT_HANDOFF.md#recovery) |

## 블로그 작업의 최소 확인

1. `AGENTS.md`와 `DECISIONS.md`의 최근 결정, 이번 요청과 기존 승인 범위를 확인합니다.
2. 대상 폴더에서 Git 상태·원격·브랜치를 확인하고 관련 없는 변경을 보존합니다.
3. `templates/`, `CONTENT_GUIDE.md`, `STYLE_GUIDE.md`에 맞춰 필요한 파일만 수정합니다.
4. `npm run validate`, `git diff --check`, 개인정보·공개 파일 검수를 수행합니다.
5. 승인된 게시라면 해당 SHA의 Actions 성공과 실제 Home·Resume·소개·이전 주소·검색·RSS를 확인합니다.

`docs/`는 Jekyll 빌드에서 제외하지만 공개 Git 저장소에서는 읽을 수 있습니다. 사적인 경로·자격 증명·원본 참고자료를 이 안내나 다른 MD에 기록하지 않습니다.
