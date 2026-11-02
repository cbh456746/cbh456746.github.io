# 작업실 배포와 복구

2026-11-02, M-13. 사용자가 공개 배포를 승인하면서 배포 전 상태로 복구할 경로를 먼저 확보하도록 요청했다.

## 배포 전 기준

- 저장소: `cbh456746/cbh456746.github.io`
- 배포 전 main: `07055c747b56a0d7e8a9181927cb8d446ec70694`
- 원격 보존 브랜치: `codex/backup-workbench-20261102-07055c7`
- 별도 로컬 Git bundle과 소스 ZIP을 보존했고 `git bundle verify`로 완전한 이력을 확인했다. 로컬 경로와 복구 사본은 공개 저장소에 넣지 않는다.
- 개편 브랜치: `codex/project-workbench`. main에는 일반 fast-forward로 반영한다.

## 신속한 복구 경로

`codex/rollback-workbench-20261102`는 배포 커밋을 부모로 하고 배포 전 기준 커밋의 파일 트리를 갖는 복구 브랜치다. 배포 준비 또는 검증 기록을 추가할 때 최신 배포 커밋에 맞춰 갱신한다. 이 브랜치의 트리를 기준 트리와 비교하고 부모 커밋도 확인한다.

복구 요청 시 에이전트는 다음 순서로 처리한다.

1. 원격 main, 복구 브랜치의 부모와 트리를 확인한다.
2. main이 복구 커밋의 부모와 정확히 같고 복구 트리가 위 기준과 일치하면, 복구 브랜치를 main으로 일반 fast-forward 푸시한다.
3. main에 다른 변경이 들어갔다면 기존 복구 후보를 바로 적용하지 않는다. 새로운 변경을 보존하면서 이번 개편을 되돌리는 커밋을 검토한다.
4. 복구 커밋의 Pages 빌드·배포와 실제 Home·기존 주소를 확인한다. 파일 복원과 실제 배포는 별도 단계다.

```text
git fetch origin main codex/rollback-workbench-20261102 codex/backup-workbench-20261102-07055c7
git log -1 --format=%H origin/main
git log -1 --format=%P origin/codex/rollback-workbench-20261102
git log -1 --format=%T origin/codex/rollback-workbench-20261102
git log -1 --format=%T origin/codex/backup-workbench-20261102-07055c7
# 위의 부모·트리 대조가 일치할 때만 실행한다.
git push origin origin/codex/rollback-workbench-20261102:refs/heads/main
```

강제 푸시나 이력 교체를 사용하지 않는다. 복구 커밋은 개편 이후의 이력을 남기며 파일 내용만 기준 상태로 되돌린다. 복구된 사이트에는 작업실과 이 안내 페이지가 없을 수 있으므로 원격 보존 브랜치·개편 커밋과 별도 로컬 기록으로 경로를 유지한다.

## 검증 범위

개편 기능과 로컬 검사: [WORKBENCH_VALIDATION.md](WORKBENCH_VALIDATION.md).

원격 게시 후 같은 SHA의 Actions build/deploy, Home·작업실·공개 작업 데이터·AI 참조 색인을 대조한다. 배포 결과 기록은 실제 확인 후 추가한다. 복구 브랜치의 파일 트리와 부모 검증은 복구 준비를 확인하는 것이며, 사용 중인 사이트를 실제로 되돌렸다는 뜻은 아니다.
