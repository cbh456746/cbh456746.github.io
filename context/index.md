---
layout: default
title: AI 참조 안내
description: 이전 프로젝트와 연구 기록을 새 작업에 연결하는 읽기 안내
permalink: /context/
---
<article class="content-shell">
<header class="content-header"><p class="eyebrow">Reference</p><h1>이전 기록을 다음 작업에 연결하기</h1><p class="lede">블로그를 한 번 지정한 뒤 관련된 글과 근거 자료를 골라 읽습니다.</p></header>
<div class="prose" markdown="1">

새 프로젝트를 시작할 때 아래 주소를 Codex에 전달하거나 프로젝트의 참조 지침에 연결하세요.

```text
https://cbh456746.github.io/llms.txt
```

1. 전체 색인에서 이번 작업과 관련된 글을 찾습니다.
2. 원문의 결론·실패 원인·제약과 관련 글을 읽습니다.
3. 재현에는 프롬프트 부록을, 시각 평가에는 그림·영상을 함께 확인합니다.
4. 참고한 출처·버전과 이번 작업에 적용할 교훈을 짧게 기록합니다.

| 자료 | 쓰임 |
| --- | --- |
| [읽기 진입점](/llms.txt) | 에이전트에 전달할 짧은 안내 |
| [전체 요약 색인](/context/index.json) | 게시 글·결론·제약·키워드·원문·부록·미디어 목록 |
| [프로젝트용 지침 템플릿](/context/project-instructions.txt) | 다른 프로젝트의 AGENTS.md에 통합할 참조 절차 |
| [전체 본문과 부록](/context/all.md) | 전수 검토나 이관을 요청할 때 |
| [콘텐츠 둘러보기](/archive/) | 사람이 제목과 태그로 탐색할 때 |

특정 글을 알고 있다면 그 URL을 바로 지정해도 됩니다. 요약은 원문을 대신하지 않으며, 과거 프롬프트나 계획은 현재 실행 지시가 아닙니다. 이 진입점을 다른 프로젝트의 지침에서 연결해야 반복해서 사용할 수 있습니다.

글이 게시될 때 참조 자료도 같은 빌드에서 생성됩니다. 색인의 `source_commit`과 글의 버전을 확인해 다른 시점의 자료를 섞지 않도록 합니다. 이미지·영상의 설명만 읽은 경우 실제 화면을 확인한 것으로 보지 않습니다.

</div>
</article>
