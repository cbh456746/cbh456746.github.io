# Mesh Avatar Board 등록 · 2026-11-05

## 요청과 범위

사용자 요청은 블로그 저장소의 Board 문서를 먼저 탐색하고, 현재 Mesh Avatar 프로젝트를 신규 Board 프로젝트로 정리하는 것이다. 기존 개발 프로젝트의 코드를 수정하거나 비공개 소재를 공개하는 작업은 포함하지 않는다.

`AGENTS.md`, 전체 운영서, `docs/PROJECT_WORKFLOW.md`, `docs/BOARD_PRIVATE_RECORDS.md`, Board 사용법, 작성·스타일 규칙과 실제 데이터를 읽었다. 현재 공개 소개·Hiyori 연구·LivLiv Notes를 대조하고 마지막 후보의 보관 검사 결과를 확인했다. 과거 프롬프트는 실행 지시로 재사용하지 않았다.

## 공개 프로젝트

- 프로젝트 ID: `mesh-avatar`. 공개 주소: `/workbench/?project=mesh-avatar`.
- 목표: Hiyori·Akari를 참고한 자연스러운 고개·목·시선·상체와 재현 가능한 AI 제작 흐름. 현재 목표 품질은 미달이다.
- 현황 정리 1건과 개발 단계 6건을 등록했다. 개발은 고정 입력 비교 → 소재 → 두상·목 → 복합 동작 → 실기 방송 → 재현·실행 안내의 의존관계를 갖는다.
- Mesh Avatar Studio, LivLiv Player, See-through, StdGEN은 확인 범위와 한계를 적은 참고 저장소다. 이번 등록은 설치·성능 시험·채택을 뜻하지 않는다.
- 처음 상태 revision 29에서 CLI import와 claim을 사용했다. 현황 정리에는 실제 제출 근거를 남기고, 자체 작업을 다른 actor 이름으로 바꿔 독립 검수 완료처럼 표시하지 않는다. 모델 개발 과제도 실행하지 않은 상태를 완료로 만들지 않는다.

## 근거와 검증 경계

[초기 소개](https://cbh456746.github.io/projects/mesh-avatar-studio/)는 독립 파츠, Windows 앱과 VTS 입력 연결의 기존 공개 기록이다. [Hiyori 회전 연구](https://cbh456746.github.io/research/hiyori-silver-braid-head-motion-study/)는 사진의 선택 자세와 국소 변형 분석이다. 사진은 동일 입력·각도 또는 연속 속도의 정답이 아니다. [LivLiv Notes](https://cbh456746.github.io/notes/livliv-player-getting-started/)와 공개 소스는 문서·예제 검토로 표시한다.

Rose Duet 후보의 2026-10-27 보관 결과에서 새 검사 13개, 정적 24자세, 합성 480프레임과 남은 턱·목·머리카락 문제를 확인했다. 이 확인을 새 모델 시험이나 Hiyori급 품질 승인으로 바꾸지 않는다. 초기 앱의 실기 연결은 새 후보의 VTS·OBS 검증과 별개다. 원화·분리 소재·시연 원본·로컬 경로·비공개 저장소 주소는 게시하지 않았다.

Board 미디어는 기존 공개 MP4/포스터와 Hiyori 비교 이미지의 경로를 재사용했다. 신규 바이너리나 사용자 원본은 추가하지 않았다. 기존 프로젝트·작업·참고 객체와 원래 소개글 날짜·본문을 보존하고, 후속 현황 절만 덧붙였다. Home의 Mesh Avatar 카드는 새 Board 선택 주소로 연결한다.

## 이번 변경

- `_data/workbench.json`: 새 프로젝트·작업·참고 자료·입력/배정 사건.
- `_projects/mesh-avatar-studio.md`: 현재 상태·제약·Board 연결과 검토 메타데이터.
- `index.md`: M-23 현재 작업 요약과 관련 프로젝트 카드.
- `TASKS.md`: 이번 등록과 배포 검증 기록.
- 이 문서: 공개 범위와 검증 경계.

## 검수 및 공개

콘텐츠/Board 계약 검사, 기존 Board 객체 보존, 데이터 크기·ID·의존관계·인수인계, 개인정보 패턴과 관련 링크를 확인한다. 실제 Jekyll은 기존 Pages workflow에서 같은 SHA의 build/deploy를 확인한다. 공개 Board에서 프로젝트 선택·카드·연결 흐름·참고 저장소·인수인계와 미디어를 확인하고, Home와 소개글의 연결 및 PC·좁은 화면의 가로 넘침을 검사한다. 검사 결과와 배포 SHA는 M-23에 후속 기록한다.

이번 작업은 Board 데이터와 글의 정리이며, 원래 아바타 코드·소재의 재검사, 새 VTS·OBS 실기, LivLiv 도입이나 자동 에이전트 실행을 완료한 작업이 아니다.
