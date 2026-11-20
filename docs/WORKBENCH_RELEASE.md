# Board 최초 배포와 복구 준비 기록

2026년 11월 2일 Board를 처음 공개한 작업(M-13)의 기록입니다. 당시 배포에 문제가 생길 경우 블로그를 직전 상태로 되돌릴 수 있도록 기준 커밋과 복구 후보를 확보했습니다.

현재 장애 대응은 [블로그 운영 인수인계서의 오류 대응과 복구](BLOG_OPERATIONS_HANDOFF.md#recovery)를 따릅니다. 최신 `main`에서 문제가 생긴 변경을 확인하고, 앞뒤 작업을 보존하면서 영향 범위만 되돌리는 새 커밋을 준비합니다.

## 배포 전 기준

- 저장소: `cbh456746/cbh456746.github.io`
- 배포 전 main: `07055c747b56a0d7e8a9181927cb8d446ec70694`
- 원격 보존 브랜치: `codex/backup-workbench-20261102-07055c7`
- 별도 로컬 Git bundle과 소스 ZIP을 보존했고 `git bundle verify`로 완전한 이력을 확인했다. 로컬 경로와 복구 사본은 공개 저장소에 넣지 않는다.
- 당시 개편 브랜치: `codex/project-workbench`. 일반 fast-forward로 `main`에 반영했다.

## 당시 마련한 복구 후보

`codex/rollback-workbench-20261102`의 복구 커밋 `7239e1c`는 당시 배포 커밋 `91f9156`을 첫 번째 부모로 갖고, 파일 내용은 배포 전 기준 커밋 `07055c7`과 일치한다. 이 구성은 그때의 `main`을 기준으로 블로그 전체의 파일을 복원하기 위한 것이었다.

2026년 11월 20일 점검에서 두 원격 보존 브랜치와 기준 파일 트리의 일치를 확인했다. 현재 `main`은 당시 첫 번째 부모보다 이후 변경이 쌓인 상태다. 그 시점의 파일을 통째로 복원하면 Board 이후 추가된 기능과 글도 빠질 수 있으므로, 이 후보는 최초 배포 당시의 기록으로 보관한다.

## 검증 범위

개편 기능과 로컬 검사: [WORKBENCH_VALIDATION.md](WORKBENCH_VALIDATION.md).

당시 같은 SHA의 Actions 빌드와 배포, Home·Board·공개 작업 데이터·AI 참조 색인을 대조했다. 복구 브랜치는 파일 트리와 부모 커밋을 확인하는 단계까지 검증했다.

## 공개 배포 확인

1차 공개 배포 커밋 `c5482eb2249be0e4a8edf7f28d06e667221bcb3e`의 [Actions 실행 41405832879](https://github.com/cbh456746/cbh456746.github.io/actions/runs/41405832879)에서 build/deploy가 성공했다. 작업실 계약 검사, 기존 참조 검사, 1,205편 실제 Jekyll fixture, 본 사이트·RSS·같은 SHA의 참조 내보내기가 모두 통과했다.

공개 Home, 작업실, 상태 JSON(revision 12), 안내, llms, 참조 색인, RSS, Resume를 확인했다. 공개 글 19편·RSS 19개를 유지했고 선택 본문의 SHA-256과 source_commit을 대조했다. 공개 브라우저에서도 작업실을 확인했다.

로컬 bundle을 별도 폴더에 복제해 기준 커밋으로 체크아웃하고 트리 일치까지 확인했다. 실제 운영 사이트를 되돌리는 복구 배포는 수행하지 않았다.

완료 기록 커밋 `a5fd03a7bcac56be17c1c2e963b9585c3d574a14`의 [Actions 41406384049](https://github.com/cbh456746/cbh456746.github.io/actions/runs/41406384049)도 성공했고, 공개 JSON revision 15와 완료 상태·참조 버전·본문 해시를 확인했다. 이어진 브라우저 재열기에서는 이전 JSON을 캐시에서 재사용하는 현상을 관찰했다. 작업실 CSS·JS·상태 URL에 빌드 버전을 붙이고 상태를 no-store로 읽으며, 페이지가 기대한 revision과 다르면 혼합 표시를 거부하도록 보완했다. 이 수정도 별도 배포 검증 대상이다.
