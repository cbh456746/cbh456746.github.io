---
layout: post
title: "뚜껑형 PNGTuber: 에셋부터 OBS 오버레이까지"
subtitle: "별씨 등불과 네온 선물봇의 좌우 12상태, 마이크 반응, 더블클릭 실행"
date: 2026-09-28 14:56:00 +0900
permalink: /play/repo-style-pngtuber-kickoff/
tags:
  - Play
  - Game
---

게임 R.E.P.O.에서 본 뚜껑처럼 열리는 움직임을 출발점으로 PNGTuber 에셋을 만들었다. 캐릭터의 몸통은 고정하고 머리가 비스듬히 열리면 어두운 안쪽이 입처럼 드러난다. 눈 깜빡임은 말하기 동작과 따로 처리한다. 디자인은 별도의 육각 등불 캐릭터 **별씨 등불**로 시작했다.

**2026년 9월 29일 업데이트:** 처음 목표였던 기본 에셋에 더해, 별도 폴더의 로봇형 캐릭터 **네온 선물봇**, 로컬 마이크 데모, OBS용 투명 오버레이, Windows 실행 창을 만들었다. 공개용 파일만 선별한 [프로젝트 저장소](https://github.com/cbh456746/repo-style-pngtuber)에서 코드를 보고 내려받을 수 있다.

## 한 장의 그림을 12개 상태로

몸통·머리·눈·입 안쪽·장식을 편집 가능한 SVG 레이어로 나눴다. 머리는 **닫힘·중간·열림**, 눈은 **뜸·감음**으로 만들고 머리가 열리는 방향은 **왼쪽·오른쪽** 중 선택할 수 있다. 이렇게 캐릭터마다 1024×1024 투명 PNG 12장을 같은 위치에 맞춰 출력한다.

[별씨 등불 12상태 보기](https://github.com/cbh456746/repo-style-pngtuber/blob/main/qa/twelve-state-contact-sheet.png) · [네온 선물봇 12상태 보기](https://github.com/cbh456746/repo-style-pngtuber/blob/main/assets/variants/cyan-gift-robot/contact-sheet.png)

## 마이크와 OBS

마이크 음량을 주변 소음과 비교해 입 상태를 바꾼다. 기본 말하기 문턱값은 주변 소음보다 **10 dB** 높음이다. 약 25 ms마다 로컬 음량을 확인하고, 새 샘플이 300 ms 넘게 오지 않으면 마지막 값을 버려 입이 열린 채 남지 않도록 했다. 이 수치는 마이크의 디지털 신호인 **dBFS 기준의 상대값**이며 소음계의 물리적인 dB와 다르다.

Windows에서는 `PNGTuber Launcher.exe`를 더블클릭해 미리보기를 열고 OBS 주소를 복사할 수 있다. 실행에는 Node.js와 FFmpeg가 필요하다. OBS의 브라우저 소스는 투명 캐릭터와 입 모양을 표시하며, **목소리 송출용 마이크는 OBS에 별도로 추가**해야 한다. 자세한 순서는 [OBS 안내](https://github.com/cbh456746/repo-style-pngtuber/blob/main/docs/obs-guide.md)에 적었다.

에셋 정렬과 음성 상태 로직의 자동 검사는 통과했다. 다만 실제 마이크 장치별 반응과 OBS 녹화는 아직 확인 중이다. 다음 단계는 입력 장치별 검수와, 캐릭터 참조의 색·무늬를 로봇 형태에 옮기는 재설계 실험이다. [재설계 가이드](https://github.com/cbh456746/repo-style-pngtuber/blob/main/docs/design-workflow.md)는 준비했지만, 임의의 이미지를 자동으로 12상태 에셋으로 변환하는 기능은 아직 없다.

참고 원본 이미지·영상과 개인 작업 자료는 공개하지 않았다. [프로젝트 개요](/projects/repo-style-pngtuber/)에서 현재 상태를 확인할 수 있다. 이 작업은 비공식 창작 프로젝트이며 원작 및 참고 에셋 제작자와의 제휴를 뜻하지 않는다.
