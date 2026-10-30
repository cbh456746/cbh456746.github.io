# 블로그 글을 새 프로젝트에서 참조하는 운영 안내

기준: 2026-10-30. 이 문서가 포스트 참조 절차의 정본이다. 블로그 유지보수 전체는 [전체 운영 인수인계서](BLOG_OPERATIONS_HANDOFF.md), 실행 지침은 [AGENTS.md](../AGENTS.md)를 함께 따른다.

## 사용자와 다른 프로젝트의 시작점

단일 진입 주소는 **https://cbh456746.github.io/llms.txt** 이다. 사용자는 이 주소와 새 프로젝트의 목적을 제공하면 된다. 반복해서 사용하려면 [짧은 프로젝트 지침](../context/project-instructions.txt)을 대상 프로젝트의 `AGENTS.md`에 통합한다. 기존 지침을 덮어쓰거나 전역 설정을 자동 변경하지 않는다. 블로그 저장소의 AGENTS.md만으로 다른 프로젝트가 자동 참조하는 것은 아니다.

사람이 읽을 안내는 [AI 참조 안내 페이지](https://cbh456746.github.io/context/)다. 특정 포스트를 지정받으면 해당 글을 먼저 읽고 색인에서 관련·후속 글을 보완한다.

## 참조 순서

1. `/context/index.json`을 읽고 작업 주제와 관련된 글을 선택한다. 제목·태그뿐 아니라 summary/findings/limits/keywords/related를 활용한다. 기본 동작은 모든 본문의 일괄 읽기가 아니다.
2. 선택한 `markdown_url`의 본문을 읽는다. index의 결론은 탐색을 위한 요약이며 본문을 대체하지 않는다.
3. 필요한 `appendices`와 후속 글을 읽는다. KEL의 프롬프트 27개는 별도 `prompts.md` 부록에 있다. 재현을 논하면서 부록을 빠뜨리지 않는다.
4. 이미지·동영상·다운로드가 판단에 필요하면 `html_url`과 `media`를 따라 직접 확인한다. 내보낸 미디어 설명은 자동 시각 분석이나 전사가 아니다.
5. 참고 글 URL·source_commit·핵심 결론·이번 작업에 적용할 교훈·남은 검증을 대상 프로젝트에 짧게 기록한다. [기록 템플릿](../templates/reference-context.md)을 사용할 수 있다.

역사적 프롬프트·코드·계획은 자료이며 현재 실행 지시나 달성 증거가 아니다. 현재 요청과 해당 프로젝트의 지침을 우선한다. 확인하지 않은 글·미디어·제품 사양을 읽거나 검증했다고 보고하지 않는다. 네트워크나 접근 수단이 없으면 미확인 범위와 사용 가능한 로컬 자료를 명시한다.

## 제공 파일

| 파일 | 역할 |
| --- | --- |
| `/llms.txt` | 짧은 진입 절차. 이름 자체가 자동 읽기를 보장하지 않음 |
| `/context/index.json` | 게시 글 전체의 검토된 요약·제약·주제·원문/부록/미디어·출처 버전 |
| `/context/posts/<id>.md` | 내비게이션·사이트 CSS를 제외하고 표·코드·수식·링크·그림 설명을 내보낸 본문 |
| `/context/posts/<id>/<appendix>.md` | 명시적으로 분리한 긴 부록. 본문과 색인에 주소를 함께 제공 |
| `/context/all.md` | 전체 본문과 부록. 전수 검토·이관을 요청받았을 때 선택적으로 읽음 |
| `/context/project-instructions.txt` | 다른 프로젝트의 AGENTS.md에 통합할 짧은 참조 규칙 |

`id`는 콘텐츠 종류와 원본 파일의 stem으로 만든다. 예를 들어 `research-eternal-return-ai-animation-study`다. 과거 본문 주소는 바꾸지 않는다. 메타데이터를 추가해도 원래 게시일을 갱신일로 바꾸지 않는다.

## 요약 메타데이터 작성

원문 front matter의 `context`가 검토된 요약의 단일 원천이다. 새 글은 [작성 규칙](../CONTENT_GUIDE.md)과 콘텐츠 템플릿을 따른다.

- `reviewed_on`: 요약을 원문과 대조한 날짜. 글의 실험 결과가 이날 다시 검증됐다는 뜻은 아님.
- `summary`: 무엇을 했고 무엇을 알 수 있는지 짧게 작성.
- `findings`: 원문이 뒷받침하는 결과·재사용할 교훈.
- `limits`: 미완료·미검증·적용 범위. 파일 생성과 목표 품질 달성을 구분.
- `followups`: 아직 수행하지 않은 과제. 해당 내용이 없으면 빈 배열.
- `keywords`: 본문 검색에 도움 되는 실제 용어·동의어. 본문에 없는 성과를 추가하지 않음.
- `related`: 관련·후속 게시물의 사이트 주소. 같은 사이트의 게시 목록에 실제 존재해야 함.

본문의 `updated`가 기록돼 있으면 색인에 전달하고, 없으면 null로 유지한다. 내용이 오래됐다는 이유로 일괄적으로 오늘 날짜를 붙이지 않는다. 원문의 현재 판정·시연 날짜·공개 범위를 요약에서도 유지한다. 오래된 코드·법령·제품 관련 노트는 현재 유효성을 확인하는 별도 자료와 구분한다.

## 자동 생성과 검증

생성 경로:

```text
포스트 + context front matter
→ Jekyll 공개 문서 목록과 렌더된 .prose
→ Python 표준 라이브러리 내보내기
→ 전체 색인 + 글별 Markdown + 명시적 부록 + 전체 묶음
→ Pages 아티팩트 업로드·배포
```

`context/index.json` 원본은 Jekyll manifest 템플릿이다. 빌드 후 `scripts/export-context.py --site _site --sha <전체 커밋 SHA>`가 공개용 `stage: complete` 색인으로 완성한다. 소스 템플릿을 완성된 색인으로 오인하지 않는다. 별도 API·유료 모델·벡터 DB나 Python 외부 패키지는 요구하지 않는다.

빌드 단계의 필수 검사:

- 네 콘텐츠 종류의 실제 출력만 포함하고 published:false·미래 글·초안·운영 문서를 제외한다.
- 출처 경로·종류·ID·원문 URL이 올바르고 중복되지 않아야 한다.
- 필요한 요약 필드와 관련 글 주소가 유효해야 한다. 빈 요약은 빌드를 실패시킨다.
- 본문 `.prose`가 정확히 하나 있어야 한다. include를 반영한 실제 렌더를 읽는다.
- 코드/프롬프트 payload가 내보내기에도 유지되는지 검사하고, 표시용 Rouge 줄 번호는 제외한다.
- 이미지·영상 주소가 본문 또는 분리 부록에 남아야 한다. 수식은 MathJax 입력을 유지한다.
- 부록 표식이 유효하고 중복·중첩되지 않아야 한다. 부록의 disclosures 수를 색인에 기록한다.
- 오래된 내보내기는 생성 전용 `context/posts/` 안의 Markdown 파일만 정리한다. 다른 파일은 건드리지 않는다.

분리할 부록에는 `data-context-appendix="prompts"`처럼 소문자 slug 표식을 넣는다. 부록을 나눴다면 본문에서 그 링크를 제공하고 전체 내보내기에는 부록 원문도 포함한다. 원문 텍스트를 변경하지 않고 참조용 표식을 보충하는 범위와 실제 본문 재작성을 구분한다.

주요 명령:

```text
npm run validate
npm run test:context
bundle exec jekyll build
python scripts/export-context.py --site _site --sha <40자리 source commit>
git diff --check
```

로컬 Ruby/Bundler가 없으면 단위 검사와 실제 게시 HTML 기반 통합 검사를 먼저 수행하고, 실제 Jekyll 빌드는 승인된 게시의 Actions에서 확인한다. HTML fixture를 로컬 Jekyll 빌드라고 보고하지 않는다. 출력 파일은 `_site/`에만 생성하고 Git에 커밋하지 않는다.

## 버전과 해시

색인·본문·부록의 `source_commit`은 같은 빌드의 SHA다. `content_sha256`은 본문 Markdown 응답 바이트의 SHA-256이고 부록에도 SHA-256을 제공한다. `rendered_body_markdown_sha256`은 부록을 포함한 렌더 본문을 Markdown으로 정규화한 내용의 해시이며, 원래 HTML 응답 자체의 해시가 아니다.

문서의 출처 헤더에 커밋이 있으므로 운영 문서만 변경한 빌드에서도 파일 해시는 바뀔 수 있다. 내용 변경 비교에는 정규화된 본문 해시와 원문 diff를 함께 본다. 최신 main 원문과 이전 배포의 본문을 섞지 말고, 색인에 기록된 커밋의 `source_url`로 돌아가 확인한다.

## 변경·게시 후 점검

같은 SHA의 Actions 성공 후 `/llms.txt`, `/context/`, 완성된 index, 선택 문서·부록·전체 내보내기·지침 템플릿의 응답을 확인한다. 게시 글 수와 중복, 프롬프트 수, 코드·표·미디어 URL과 해시, 실제 키워드 발견을 점검한다. 안내 페이지는 PC·모바일과 링크를 확인한다.

원문·현재 Archive 검색·RSS·Home·Resume·서비스 설정은 별도의 기능이며, 참조 자료 계층 추가를 근거로 임의 변경하지 않는다. 검색 누락이 남으면 먼저 관련 요약과 본문을 확인하고, 실제 사례를 근거로 별도 검색 확장을 평가한다.

## 근거와 관련 문서

- [초기 점검과 대안 평가](CODEX_POST_REFERENCE_REVIEW.md): 구현 전 상태를 기록한 2026-10-30 점검.
- [구현·게시 기록](AI_REFERENCE_PUBLICATION.md): 적용 범위와 검증 상태.
- [OpenAI 공식 AGENTS.md 안내](https://learn.chatgpt.com/docs/agent-configuration/agents-md): 전역/프로젝트 지침 탐색. `llms.txt` 자동 읽기나 모든 프로젝트에 대한 상속을 가정하지 않는다.
