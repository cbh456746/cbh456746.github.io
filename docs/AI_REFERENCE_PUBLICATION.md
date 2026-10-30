# AI 포스트 참조 계층 구현·게시 기록

작업일: 2026-10-30, Asia/Seoul. 기준 main: `359a5152b6457fd33b370b664afff0fd36de11cc`. 사용자가 초기 점검 후 구현과 저장소 업로드, AGENTS.md 및 블로그 전체 운영·AI 참조 파일의 갱신을 명시했다. 승인 범위는 D-021에 기록한다.

## 구현 범위

- 19편의 원문을 대조해 `context` 요약·결론·제약·후속 과제·검색 용어·관련 글을 front matter에 추가했다. 원래 본문 바이트와 게시일은 보존한다.
- `/llms.txt`, `/context/`, `/context/index.json`, 글별 Markdown, 명시적 prompts 부록, 선택적인 `/context/all.md`를 제공한다.
- KEL 프롬프트 include에 부록 표식만 보충해 원문 27개를 별도로 연결한다. 본문에는 부록 링크가 남고 전체 내보내기에는 원문도 포함된다.
- Python 표준 라이브러리로 렌더된 `.prose`를 추출한다. 표시용 코드 줄 번호는 제거하고 실제 코드·프롬프트 payload, 수식 입력, 표·캡션과 미디어 주소를 보존한다.
- Pages 빌드에서 단위 검사·Jekyll·RSS 검사·참조 내보내기를 순서대로 실행한다. 요약 누락·잘못된 경로/버전·중복·미래/비공개 문서·부록/코드/미디어 누락을 실패로 처리한다.
- AGENTS·README·운영 정본·참조 정본·작성 규칙·네 콘텐츠 템플릿·프로젝트용 지침/기록 템플릿을 갱신했다. 초기 점검은 역사적 상태로 보존하고 현재 정본에 연결한다.

기존 글 본문·주소·Home·Resume·공통 CSS·Archive 검색·RSS 정책·외부 서비스를 개편 대상으로 확대하지 않는다. 다른 저장소나 전역 Codex 설정을 변경하지 않는다.

## 로컬 검사

19편 모두에서 원문 본문 바이트와 기존 해시의 일치를 확인했다. `npm run validate`, exporter 계약 검사 14개와 diff 검사가 통과했다. 현재 공개된 19편의 HTML에 작업 중 요약 메타데이터와 신규 부록 표식만 적용한 별도 로컬 fixture에서 19편·부록 1개·프롬프트 27개와 코드/미디어 보존을 통합 검사했다. 이 fixture는 로컬 Jekyll 빌드가 아니다.

초기 v1 fixture의 전체 요약 색인은 약47KB였다. 사용자의1,000편 이상 점검 요청 후 v2에서는 시작 색인·카탈로그·태그를 분리했다. 실제19편 fixture의 v2 시작 색인은1,585바이트이고 전체 본문·부록은 약280KB다. 이는 응답 텍스트 크기이며 모델 사용량이나 속도 개선률의 측정값이 아니다. 기존 검색에서 찾지 못한 CFG·국소 압축·WebSocket은 새 요약/키워드에서 각 관련 글을 찾을 수 있었다. 이 세 사례를 대표 검색 정확도로 확대하지 않는다.

추가된 규모·버전 혼합·큰 레코드 검사를 포함해 단위 검사17개가 통과했다. 로컬 합성1,205편/1,206태그에서 시작 색인1,535바이트, 최대 페이지31,280바이트, 마지막 글 검색과 축소 후 정리를 확인했다. 실제 Jekyll1,205편 검사를 CI에 추가했으며 [규모·실패 점검](AI_REFERENCE_SCALE_REVIEW.md)에 시험 조건과 한계를 기록한다.

Ruby/Bundler가 없는 로컬 환경이므로 실제 Jekyll manifest 렌더는 승인된 게시의 GitHub Actions에서 확인한다. 코드 줄 번호가 있는 Rouge wrapper를 별도 처리하는 회귀 검사를 추가했다. 테스트용 데이터·내보내기 결과·개인 경로는 공개 소스에 포함하지 않는다.

## 배포와 실제 파일 확인

첫 구현 커밋 `cb20bcd0ee7596ef84c4a0f8288da1764f832700`의 [Actions 실행](https://github.com/cbh456746/cbh456746.github.io/actions/runs/41017281212)은 콘텐츠·계약 검사·Jekyll·RSS가 통과한 뒤 내보내기 쓰기 권한에서 실패했다. Jekyll 컨테이너가 생성 폴더를 root 소유로 만들었기 때문이다. 배포는 실행되지 않았다. 후속 커밋에서 `_site/context`에만 runner 소유권을 적용한 뒤 일반 Python 생성기를 실행하도록 수정했다. 전체 작업 공간이나 서비스 권한을 변경하지 않는다.

v2 본체 커밋 [`924a496325b9562761707d53b101d26da76771a0`](https://github.com/cbh456746/cbh456746.github.io/commit/924a496325b9562761707d53b101d26da76771a0)의 [Actions 41020600569](https://github.com/cbh456746/cbh456746.github.io/actions/runs/41020600569)에서 단위 검사17개, 합성1,205편의 실제 Jekyll 렌더·내보내기, 본 사이트 Jekyll·RSS·참조 생성과 Pages 배포가 모두 성공했다.

배포 후 공개 파일에서 확인한 사항:

| 검사 | 결과 |
| --- | --- |
| 시작 색인 | schema_version 2, stage complete, source_commit 일치,1,585바이트 |
| 게시 목록 | 실제 search.json과 같은19편, 고유 ID19개 |
| Markdown·부록 |20개 응답의 SHA-256이 카탈로그와 모두 일치, text/markdown; charset=utf-8 |
| KEL | 프롬프트27개 보존, 본문에서 부록과 MP4 주소 연결, 긴 프롬프트는 본문에서 분리 |
| 전체 내보내기 | 모든 본문·부록 텍스트 포함 |
| 검색 | CFG/research → KEL, 국소 압축/Live2D 태그 → Hiyori 연구, WebSocket/projects → 방송 아바타 글 각각1개 |
| 진입점·지침 | llms.txt·프로젝트 템플릿·안내 HTML과 링크 확인 |

안내 페이지의 데스크톱 표시를 확인한 뒤 긴 제목의 단어 단위 줄바꿈과 URL 표시를 보완했다. Windows에서 검색 JSON의 한글이 도구에 올바르게 전달되도록 stdout을 UTF-8로 지정했다. 후속 배포의 PC/모바일 표시와 최신 source SHA는 별도로 확인한다.

보완 커밋 [`90f770d031cc71977c898ab5583eb3e5b99ef613`](https://github.com/cbh456746/cbh456746.github.io/commit/90f770d031cc71977c898ab5583eb3e5b99ef613)의 [Actions 41021282966](https://github.com/cbh456746/cbh456746.github.io/actions/runs/41021282966)도 전체 검사와 배포가 성공했다. 공개 색인 source_commit과20개 Markdown/부록 해시를 다시 확인했다. 저장소에서 읽은 AGENTS.md에도 first_page/next·검색 도구·1,205편/64KiB 규칙이 존재했다.

안내 페이지는 인앱 Chromium의1280px 데스크톱과390×844 모바일 viewport에서 제목·주소·목록·표·링크를 확인했다. 모바일 client/scroll width는 모두375px로 페이지 전체 가로 넘침이 없었다. 임시 viewport 설정은 복원했다. 실제 휴대전화 실기 검사는 아니다. 공개 응답과 URL 연결을 확인했으며, 전체 블로그 방문 트래픽이나 모든 과거 글의 시각 배치를 전수 검사한 결과로 확대하지 않는다.

M-10의 구현·게시·참조 계약 검증을 완료했다. 이 기록 자체의 후속 커밋은 본문 기능 변경과 구분하고, 최종 사용자 보고 전에는 그 SHA의 Actions와 공개 source_commit도 확인한다.

첫 v2 규모 실행 [41020358413](https://github.com/cbh456746/cbh456746.github.io/actions/runs/41020358413)은 단위 검사17개 통과 후 최소 Jekyll fixture의 빈 컬렉션 누락으로 실패했다. fixture에도 Projects·Notes 컬렉션을 명시해 실제 블로그 manifest가 요구하는 배열 조건을 맞췄다. 이 실행에서는 본 사이트 재빌드·배포가 시작되지 않았다.

## 운영과 남은 범위

참조 정본은 [AI_REFERENCE_GUIDE.md](AI_REFERENCE_GUIDE.md)다. 사용자는 `https://cbh456746.github.io/llms.txt`를 한 번 제공하거나 프로젝트 지침에서 연결한다. 이것을 자동 전역 기억이나 새 모델의 답변 품질 보장으로 소개하지 않는다. 이번 검사는 자료 생성·보존·접근 계약에 관한 것이며 독립적인 모델 답변 품질/속도/토큰 절감 A/B는 수행하지 않았다.
