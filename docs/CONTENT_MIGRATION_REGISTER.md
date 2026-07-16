# 콘텐츠·URL 이관 등록부

> 상태: 계획안. 이 표는 아직 파일 이동이나 URL 변경을 수행하지 않는다.  
> 규칙: 공개 URL이 확인된 경우에만 리다이렉트를 추가하며, 확인되지 않은 URL을 추정하여 리다이렉트를 만들지 않는다.

## 1. 이관 절차

각 행은 다음 순서로 처리한다.

1. 원본 파일과 렌더링 여부를 보존한다.
2. 실제 공개 URL과 검색 엔진 인덱스 여부를 확인한다.
3. 목표 콘텐츠 유형·slug·태그·발행일을 확정한다.
4. 새 파일을 만들고 빌드 결과를 확인한다.
5. 이전 URL이 존재할 경우에만 리다이렉트를 추가한다.
6. 홈, 태그 인덱스, 검색, RSS에서 한 번씩 확인한다.

## 2. 기존 콘텐츠 목록

| 원본 파일 | 현재 상태 | 목표 유형 | 제안 태그 | 목표 slug | 이관 전 확인 |
|---|---|---|---|---|---|
| `2014-01-29-hello-2015.markdown` | 원 테마 샘플, 프런트매터 있음 | Legacy 또는 비공개 보관 | `Legacy` | `hello-2015` | 공개 유지 여부 |
| `2025-03-15-hello_trans.md` | 번역 샘플, 날짜는 2015 | Legacy 또는 비공개 보관 | `Legacy` | `hello-2015-ko` | 공개 유지 여부와 날짜 |
| `2025-03-17-로컬환경에서 깃허브 수정하기.md` | 프런트매터 없음 | Notes | `Notes`, `Git`, `GitHub-Desktop` | `github-desktop-local-workflow` | 실제 작성/발행일 |
| `25-03-15-# 네이버 금융 증권사 리포트 투자의견 크롤링 해보기.md` | 프런트매터 없음 | Projects | `Projects`, `Data-Science`, `Web-Scraping`, `Finance` | `naver-finance-report-crawler` | 작성일, 저장소 링크, 라이선스 |
| `25-03-15-Bugs 가사 크롤러.md` | 파일명과 날짜 불일치 | Projects | `Projects`, `Web-Scraping`, `Data-Collection`, `Music` | `bugs-lyrics-crawler` | 실제 날짜, 소스 공개 범위 |
| `25-03-15-인구 피라미드 시각화 프로젝트.md` | 프런트매터 없음 | Projects | `Projects`, `Data-Visualization`, `Statistics`, `Japan` | `japan-population-pyramid` | 결과 GIF·코드·데이터 출처 |
| `25-03-20-Confusion_matrix.md` | 정상 프런트매터, 잘못된 파일명 | Notes | `Notes`, `Data-Science`, `Statistics`, `Machine-Learning` | `confusion-matrix` | 수식 표기 점검 |
| `25-03-20-빅데이터분석기사 8회 기출.md` | 정상 프런트매터, 잘못된 파일명 | Notes | `Notes`, `Big-Data-Analyst`, `Exam` | `big-data-analyst-8th-exam` | 저작권·출처·정답 표기 |
| `25-03-21-1단원 예상문제.md` | 정상 프런트매터, 잘못된 파일명 | Notes | `Notes`, `Big-Data-Analyst`, `Exam` | `big-data-analyst-unit-1-practice` | 작성일과 출처 |
| `25-03-21-Hypothesis_test.md` | 파일명과 날짜 불일치, 초안 수준 | Notes | `Notes`, `Statistics`, `Hypothesis-Testing` | `hypothesis-testing-basics` | 확장 여부와 실제 날짜 |
| `25-03-21-Note.md` | 정상 프런트매터, 제목이 일반적 | Notes | `Notes`, `Data-Engineering`, `Data-Collection` | `data-collection-frameworks` | 제목 확정 |
| `25-03-21-PCA.md` | 제목 괄호 누락, 잘못된 파일명 | Notes | `Notes`, `Data-Science`, `Machine-Learning`, `PCA` | `principal-component-analysis` | 제목·코드 실행 여부 |
| `25-03-21-빅데이터분석기사 1단원 요약정리.md` | 정상 프런트매터, 잘못된 파일명 | Notes | `Notes`, `Big-Data-Analyst`, `Exam` | `big-data-analyst-unit-1-summary` | 출처와 갱신일 |

## 3. Play와 Game의 적용

현재 목록에는 `Game`으로 확실히 분류할 글이 없다. 향후 게임 관련 콘텐츠는 다음 규칙을 적용한다.

| 콘텐츠 예 | 유형 | 필수 태그 |
|---|---|---|
| 게임 플레이 후기, 스크린샷, 감상 | Play | `Play`, `Game` |
| 게임 데이터 분석 | Projects 또는 Research | `Game` + 분야 태그 |
| 게임용 자동화·도구 | Projects | `Projects`, `Game` |

`Blog` 태그는 새로 만들지 않는다. 기존에 Blog 태그가 발견되면 `Play`로 일괄 이관하되, 실제 적용 전 목록을 다시 검토한다.

## 4. URL 정책

- 목표 URL은 콘텐츠 유형을 드러낸다. 예: `/projects/naver-finance-report-crawler/`, `/notes/confusion-matrix/`.
- 현재 Jekyll 게시물 URL과 목표 URL이 다른 경우에만 리다이렉트를 만든다.
- 프런트매터가 없거나 Jekyll 표준 파일명이 아닌 글은 실제 공개 URL이 없을 수 있다. 이 경우 리다이렉트가 아니라 새 URL의 공개만 필요하다.
- 한글 파일명은 내부 파일명이 아니라 영문 slug로 정규화한다. 화면 제목은 한국어를 유지한다.
- URL 변경표는 `old URL`, `new URL`, `reason`, `verified date`, `status` 필드를 갖는다.

## 5. 승인 필요 항목

1. Legacy 샘플 두 글의 공개 유지 또는 보관
2. 각 콘텐츠의 실제 발행일
3. Projects에 연결할 GitHub 저장소·다운로드·이미지
4. 빅데이터 분석기사 기출/문제 콘텐츠의 공개 범위와 출처 표기
5. 게임 콘텐츠에서 사용할 세부 태그 목록
