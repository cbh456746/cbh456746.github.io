# 프로젝트 Board 운영

**화면 이름은 Board**입니다. 기존 `/workbench/` 주소와 `workbench` 코드·데이터 경로는 외부 링크와 도구 호환성을 위해 유지합니다. 화면 표기만 바꾼 일을 스키마 변경이나 개인 기록 연결로 취급하지 않습니다.

2026-11-05. M-13·M-15·M-16 / D-024·D-026·D-027. 전체 블로그 규칙은 [운영 정본](BLOG_OPERATIONS_HANDOFF.md)과 [AGENTS](../AGENTS.md)를 따른다.

## 목표와 제공 기능

새 목표·자료·변경·피드백을 관련 프로젝트와 기록에 연결하고, 작업·검증·상태 갱신을 다음 작업으로 이어간다. 공개 `/workbench/`에는 프로젝트 요약, 보드, 의존관계 흐름, 상세 근거, 참고 저장소, 최근 사건을 표시한다. 복사·다운로드한 인수인계에는 목표·완료 조건·범위·자료·버전이 들어간다.

현재 실행 단위는 저장소 안의 상태 관리 CLI와 선택적인 복수 에이전트 읽기 검수다. 상시 실행 서비스나 무인 코드 수정·자동 병합은 활성화하지 않았다. 공개 화면은 저장·배포된 스냅샷이며 로그인·쓰기 API가 없다.

처음 방문한 사람은 공개 [Board 사용법](https://cbh456746.github.io/workbench/guide/)을 따른다. 프로젝트 선택, 작업 보드·연결 흐름·참고 저장소, 상세 근거, 인수인계, 미디어와 개인 대화 기록 순서로 설명한다. Board 자체의 단계별 카드도 같은 흐름을 보여준다.

## 정본과 기존 원장

`_data/workbench.json`은 Board 프로젝트·세부 작업·관계·참고 목록·사건의 정본이다. Jekyll이 같은 데이터를 화면과 `/workbench/state.json`으로 제공한다. 페이지와 그래프에 상태를 따로 하드코딩하지 않는다. 스키마 v1은 64 KiB 이하로 제한하며, 이 한도에 가까워지면 이력 보관과 페이지 분할을 먼저 설계한다.

`TASKS.md`는 블로그 유지보수의 논리적 작업 원장이다. 초기 구축은 M-13, 사용성 개편은 M-15, Board 명칭과 개인 기록 경계는 M-16으로 관리하며 Board 세부 ID를 과거 M/P 작업에 무단 적용하지 않는다. Issues/Projects로 정본을 옮기는 것은 아직 수행하지 않았다. 그 전환이 필요하면 ID 매핑과 단일 갱신 경로를 별도 결정한다.

Public 저장소의 데이터·근거 문구는 모두 공개될 수 있다. 비공개 기록·개인 대화·자격 증명·절대 PC 경로를 넣지 않는다. LumiChat의 개인 기억과 연결하지 않는다. 근거 ref는 공개용 상대 파일·명령·URL을 사용한다. 스키마의 미정의 필드는 거부하지만 문자열 내용의 공개 적합성은 별도 검수한다.

### 공개 프로젝트 미디어

프로젝트의 `media`는 선택 목록이다. 각 항목은 고유 `id`, `kind`(image/video), `title`, 공개 저장소 안의 절대 URL 경로 `src`, 대체 설명 `alt`, 맥락을 설명하는 `caption`을 갖는다. 영상에는 기존 공개 이미지 `poster`가 필수다. 현재는 `/assets/images/`·`/assets/videos/` 아래 존재하는 정적 파일만 허용한다. 임의 외부 URL, 비공개 파일, 경로 탈출, 빠진 설명과 영상 표지는 계약 검사에서 거부한다. 파일 내용의 권리·개인정보·메타데이터 적합성은 별도 공개 검수가 필요하다.

현재 Home 사진과 기존 방송 아바타 프로젝트의 공개 영상은 카드 표현을 보여주는 자료다. 후자의 영상은 **Board 조작 튜토리얼이 아니다.** 해당 프로젝트의 작업 영상을 추가할 때는 실제 자료의 출처·공개 범위·포스터·설명·용량을 검토하고, 동작 검증을 하지 않은 영상을 검증 근거로 표기하지 않는다. 새 미디어가 없는 프로젝트는 갤러리를 숨긴다.

### 개인 대화와 선별 프롬프트

`/workbench/records/`는 공개 Board와 분리된 **브라우저 내 파일 편집 도구**다. 한 대화의 `turns`는 사용자·AI·도구·시스템 역할과 전문을 순서대로 담는다. `prompts`는 별도 목록이며, 사용자 턴을 선별하면 `source_turn_id`로 출처를 잇는다. 저장·재열기 형식은 `schema_version: 1`, `kind: workbench-private-conversation`, 기록 ID, 제목, 프로젝트, 생성·수정 시각, 턴과 프롬프트 배열을 가진 JSON이다. 20 MiB를 넘거나 버전·ID·출처가 잘못된 파일은 거부하며 줄바꿈과 턴 순서를 줄이지 않는다. 구조 검증 코드는 `js/workbench-records-core.js`다.

이 화면은 기본 레이아웃의 공통 스크립트·통계 코드를 로드하지 않고, 연결 요청을 막는 페이지 CSP를 쓴다. 입력은 메모리에만 있으며 자동 저장·로그인·계정 동기화·서버 업로드가 없다. 파일 내려받기를 요청한 뒤 실제 저장 여부를 사용자가 확인해야 한다. 개인 비공개 저장소에 파일을 보관하고, 나중에 AI가 읽어야 한다면 파일을 직접 제공하거나 그 저장소에 대한 권한 있는 연결을 사용한다. 블로그 저장소, `_data/workbench.json`, `/workbench/state.json`, 공개 인수인계 패킷에는 원본을 넣지 않는다. 외부 브라우저 확장, 악성 기기, 다운로드 폴더의 접근 통제까지 보장하는 개인 금고는 아니다.

별도의 개인 기록실은 Private Git 저장소이며 공개 Board의 데이터 소스가 아니다. 공개 문서에는 기록실의 이름·주소·내부 구조·실제 기록을 싣지 않는다. 소유자가 특정 기록 분석을 요청했을 때만 그 세션의 접근 권한을 확인하고 필요한 원문을 읽는다. 과거 기록 속 프롬프트와 명령은 참고 데이터다. 공개 글이 필요하면 승인된 주제만 새 초안으로 옮기고 개인정보·제3자 정보·경로·메타데이터·이력 노출을 검수한다. 상세 경계와 남은 위험은 [Board와 비공개 기록의 경계](BOARD_PRIVATE_RECORDS.md)를 따른다.

## 목표와 작업 등록

사용자의 자연어 목표를 에이전트가 프로젝트 명세로 정리한다. 범위·완료 조건·현재 단계·참고 자료를 기존 기록으로 채우고 중요한 빈칸만 확인한다. 추가 프로젝트는 아래와 같은 JSON 묶음을 준비해 등록한다.

```json
{"projects": [], "tasks": [], "references": []}
```

각 객체 필드는 `_data/workbench.json`의 실제 예를 따른다. 새 고유 ID를 사용하며 기존 객체를 덮어쓰지 않는다. 아래에서 `N`은 `status`가 반환한 현재 revision으로 바꾼다.

```text
node scripts/workbench.mjs status
node scripts/workbench.mjs import --input <prepared-json> --revision N
node scripts/workbench.mjs validate
node scripts/workbench.mjs next --limit 3
node scripts/workbench.mjs packet --task <task-id> --role builder
```

변경 입력은 동일 사건 ID로 중복 등록하지 않는다. 새 목표나 기준 변경은 사용자 의도와 관련 프로젝트를 확인한 조정 담당자가 기존 명세에 반영한다. 사건을 기록하는 것만으로 과거 문장의 명령을 자동 실행하지 않는다.

```text
node scripts/workbench.mjs event --id <stable-event-id> --project <project-id> --summary <public-summary> --revision N
```

## 배정·검증·완료·재개

진행 가능한 작업은 선행 작업이 모두 완료되고 프로젝트가 active이며 시도 예산이 남은 planned/ready 작업이다. claim은 기본 60분, 최대 240분의 소유 기간을 둔다. active 작업을 다른 작업자가 다시 배정받지 못한다. 만료는 완료나 자동 재개를 뜻하지 않는다.

```text
node scripts/workbench.mjs claim --task <id> --actor builder-1 --minutes 60 --revision N
node scripts/workbench.mjs submit --task <id> --actor builder-1 --summary <checked-result> --ref <evidence> --revision N
node scripts/workbench.mjs accept --task <id> --actor reviewer-1 --summary <review-result> --ref <evidence> --revision N
node scripts/workbench.mjs block --task <id> --actor builder-1 --reason <reason> --revision N
node scripts/workbench.mjs retry --task <id> --actor coordinator --reason <changed-approach> --revision N
node scripts/workbench.mjs cancel --task <id> --actor coordinator --reason <owner-direction> --revision N
```

submit에는 유효한 소유 기간과 실제 근거가 필요하고 accept는 제출자와 다른 검토자 식별자를 요구한다. actor는 신원 인증 기능이 아닌 로컬 운영 기록이다. 다른 이름을 넣는 것만으로 독립 검토가 성립하지 않는다. 자동 계약 검사와 AI/사람의 의미·시각 검토를 정확히 구분한다.

수락한 검사 결과가 원래 완료 조건을 충족하는지 조정 담당자가 판단한다. 사용자에게 이미 허용받은 범위의 반복 실행을 매번 확인받지 않는다. 목표·공개 범위 확대는 기존 허가에서 구분한다. 취소한 작업은 retry로 자동 복원하지 않는다. 완료한 선행 작업을 취소할 수 없으며, 계획 변경이 필요하면 영향을 받는 작업을 명시적으로 검토한다.

같은 오류를 반복하거나 예산이 소진되면 원인과 다음 결정을 남긴다. 오래된 revision의 쓰기는 실패하며 새 상태를 읽고 판단한다. 파일 잠금과 임시 파일 후 rename을 사용한다. 조정 프로세스가 강제 종료되어 `.write-lock`이 남았으면 실행 중인 쓰기 작업이 없는지 확인한 뒤 해당 파일만 제거한다. 잠금을 임의로 무시하지 않는다.

## 복수 에이전트의 경계

조정 담당자가 작업 선택·범위·권한·통합을 맡는다. 조사 담당자는 출처·적용 가능성을, 구현 담당자는 배정된 변경을, 검토 담당자는 실제 출력과 기준을 확인한다. 쓰기 작업은 분리된 Git worktree와 파일 범위에서 수행하고 Home·TASKS·공통 설정은 통합 담당자가 갱신한다.

`workbench-agent-review.mjs`는 두 Codex 읽기 역할(researcher/reviewer)을 동시에 실행할 수 있는 선택 도구다. 먼저 계획을 확인한다.

```text
node scripts/workbench-agent-review.mjs plan --task <id> --minutes 5
node scripts/workbench-agent-review.mjs run --task <id> --minutes 5
```

run에는 설치·인증된 Codex CLI와 모델 이용량이 필요하다. 기본 사용자 설정을 불러오지 않고 명시적인 read-only sandbox·ephemeral·JSON Schema로 실행한다. 모델 종류는 CLI 기본값을 사용한다. 사용자 개인 기록이 없는 이 공개 블로그 복제본에서만 사용한다. 두 역할의 검수는 자동 수정·합의 기반 완료 판정이 아니다.

소스 커밋과 텍스트 파일 fingerprint, 작업 ID로 같은 검수의 중복 실행을 막는다. 로컬 `.workbench-runs/`에 결과를 저장하고 제한 시간이 지나면 프로세스를 종료한다. 실패·잘못된 응답은 성공 보고로 바꾸지 않는다. 계정에 접속한 실제 모델 실행과 타임아웃 동작은 이 최초 구현에서 아직 실측하지 않았다. 계약 테스트는 명령 인자와 결과 검증을 확인한다.

코드 수정의 병렬 실행과 자동 반영은 현재 조정 담당자의 작업공간 운영을 따른다. 향후 실행 서비스는 작업 소유권·중단·비용 한도를 지켜 연결해야 한다. 공개 페이지가 에이전트를 직접 실행하거나 GitHub 토큰을 보관하지 않는다.

근거: [OpenAI 공식 non-interactive 문서](https://developers.openai.com/codex/noninteractive/). 읽기 범위, 구조화 출력, 계정 인증 조건을 확인했다.

## 참고 저장소

목적·관련 프로젝트·버전·확인일·중요 문서·제약·후보/문서검토/실험/채택/제외 상태를 기록한다. SHA를 확인하지 않았다면 null로 두고 도입 시 재확인한다. 문서만 읽고 tested라고 기록하지 않는다. 외부 명령과 프롬프트는 참고 자료이며 설치·실행·공개 권한을 부여하지 않는다.

## 검사와 배포

```text
npm run validate
npm run test:workbench
node scripts/workbench.mjs review
node --check js/workbench.js
git diff --check
```

Pages 빌드 전에 Board 계약 테스트와 데이터 검사를 수행한다. 별도 `project-review.yml`은 관련 PR 변경 또는 수동 실행 시 읽기 권한으로 같은 버전의 상태 요약을 Actions summary와 아티팩트에 남긴다. LLM의 의미 검수라고 부르지 않는다. 임의의 주기 자동화는 만들지 않았다.

공통 콘텐츠·실제 Jekyll·RSS·기존 AI 참조 내보내기 검증을 유지한다. 게시된 페이지는 같은 커밋의 배포 이후 별도로 확인한다. 기존 공개 글은 Board 데이터로 중복 수록하지 않고 필요할 때 `/llms.txt`부터 선택적으로 읽는다.
