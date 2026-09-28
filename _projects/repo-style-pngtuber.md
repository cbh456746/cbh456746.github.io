---
title: "뚜껑형 PNGTuber 에셋 제작 프로젝트"
subtitle: "기본 캐릭터의 개폐 동작을 만들고, 한 장의 참조 일러스트로 다른 캐릭터에 적용하기 위한 설계"
date: 2026-09-28 14:27:00 +0900
tags:
  - Projects
  - Play
  - Game
repository_url: "https://github.com/cbh456746/cbh456746.github.io/tree/main/docs/repo-style-pngtuber"
demo_url: ""
---

## 프로젝트 개요

게임 R.E.P.O.의 캐릭터와 뚜껑이 열리는 움직임에서 아이디어를 얻어, 방송 화면에서 쓸 수 있는 독자적인 PNGTuber 에셋을 제작하려 한다. 몸통은 안정적으로 유지하고, 음성에 따라 머리 뚜껑이 비스듬히 열리고 닫힌다. 눈 깜빡임은 별도 상태로 둔다.

## 제작 방법

첫 단계에서는 편집 가능한 몸통·머리·눈·목 안쪽·장식 레이어를 만든 뒤, 머리 개폐 3단계와 눈 상태 2단계를 조합한 투명 PNG 6장을 출력한다. 모든 프레임은 같은 크기와 기준점을 사용한다. 간단한 데모에서 마이크 입력을 개폐 상태로 변환하고 프레임 정렬을 검사한다.

다음 단계에서는 기본 에셋과 사용 권한이 있는 캐릭터 참조 일러스트 한 장을 입력으로 사용한다. 새 캐릭터의 색과 고유 장식을 반영하되, 힌지 위치와 몸통 기준점, 열림·닫힘의 동작 규칙은 유지하는 변형 과정을 실험한다. 생성 결과는 6상태를 한꺼번에 비교해 구조와 디자인의 일관성을 확인한다.

## 현재 상태와 다음 작업

현재는 착수 준비 단계다. 계획서, 개시용 프롬프트, 워크플로우·아키텍처, 제작 주의사항을 정리했고, 참고 이미지와 짧은 영상의 샘플 프레임을 검토했다. 작업 폴더와 상태 데이터 계약 초안도 준비했다. 기본 그림, 6상태 PNG, 실행 데모, AI 변형 모델은 아직 제작 전이다.

참고 자료에서는 열린 머리와 닫힌 머리 각각에서 눈 감김이 확인된다. 중간 열림은 부드러운 전환을 위한 설계 선택이며 참고 에셋의 내부 구현을 확인한 것은 아니다. 정확한 힌지 좌표와 마이크 임계값은 제작 과정에서 결정한다.

다음으로 독자적인 기본 캐릭터를 정하고 레이어 원본, 6상태 PNG, 구동 데모 순서로 제작한다. 동작 참고 이미지와 별도로 캐릭터 변형용 일러스트 한 장이 필요하다. 참고 원본, 영상 캡처, 음성, 개인 식별 정보는 공개하지 않는다.

## 착수 문서

- [프로젝트 계획서](https://github.com/cbh456746/cbh456746.github.io/blob/main/docs/repo-style-pngtuber/01-project-plan.md)
- [Codex 작업 개시용 프롬프트](https://github.com/cbh456746/cbh456746.github.io/blob/main/docs/repo-style-pngtuber/02-codex-kickoff-prompt.md)
- [워크플로우·아키텍처](https://github.com/cbh456746/cbh456746.github.io/blob/main/docs/repo-style-pngtuber/03-workflow-architecture.md)
- [제작 주의사항](https://github.com/cbh456746/cbh456746.github.io/blob/main/docs/repo-style-pngtuber/04-production-notes.md)

이 프로젝트는 비공식 창작 프로젝트이며 원작 및 참고 에셋 제작자와의 제휴를 의미하지 않는다. 완성 에셋의 배포 라이선스는 추후 정한다.
