---
layout: post
title: "STOCK 페이지 제작기"
subtitle: "Stars 24개 종목에서 검색, 차트, 개인 순서 편집까지"
date: 2026-11-05 23:55:00 +0900
permalink: /play/stock-watchlist-build-log/
tags:
  - Play
context:
  reviewed_on: '2026-11-05'
  summary: 2026년 11월 5일 블로그 STOCK 페이지에 관심 종목 목록과 차트, 검색과 개인 순서 편집을 만들고 검증한 기록이다.
  findings:
    - 미국 상장 관심 종목 24개를 Stars에 표시하고 코스피 항목은 제외했다.
    - 종목 검색과 브라우저별 개인 순서 편집, 맨 아래 이동 및 초기화를 공개 화면에서 확인했다.
    - Watchlist 행 간격을 줄이고 320px·390px 모바일 화면을 점검했다.
  limits:
    - 시세와 차트는 TradingView가 제공하는 지연 데이터이며 캡처 속 가격은 현재 가격이 아니다.
    - 공개 Stars 추가·삭제는 저장소 갱신이 필요하고 종목별 분석 글은 아직 게시하지 않았다.
  followups:
    - Stars 종목별로 근거와 작성 시점을 밝힌 분석 글을 작성한다.
  keywords:
    - STOCK
    - Watchlist
    - Stars
    - 관심 종목
    - TradingView
  related: []
---

2026년 11월 5일, 블로그에 [STOCK 페이지]({{ '/stock/' | relative_url }})를 열었다. 관심 종목을 왼쪽에서 고르고, 오른쪽에서 차트와 그 종목에 관한 글을 함께 읽는 구조다. 오늘은 목록을 **찾고 정리하는 경험**까지 다듬었다.

<figure style="max-width:375px; margin:1.5rem 0">
  <img src="{{ '/assets/images/stock-watchlist-2026-11-05.jpg' | relative_url }}" width="375" height="769" loading="lazy" decoding="async" alt="모바일 STOCK 화면. Watchlist 검색창과 내 순서 편집 메뉴 아래에 종목별 위·아래·맨 아래 이동 버튼이 보인다.">
  <figcaption style="color:var(--muted); font-size:.8rem; line-height:1.6; margin-top:.5rem">2026.11.05 모바일 화면. 이미지 속 가격은 캡처 당시의 지연 시세이며 현재 가격이 아니다. 시세 위젯: <a href="https://www.tradingview.com/widget/">TradingView</a>.</figcaption>
</figure>

## 오늘 만든 것

| 작업 | 화면에서 달라진 점 |
| --- | --- |
| Stars 목록 | 미국 상장 주식·ADR 중 고른 24개 종목을 표시한다. 제공받은 목록의 코스피 종목은 제외했다. |
| 시세와 차트 | 가격과 당일 변동을 USD로 보고, 종목을 누르면 지난 1년 범위의 Area 차트와 해당 종목의 분석 글 목록으로 이동한다. |
| 찾기와 정렬 | 이름·티커 검색은 입력 중 바로 목록을 좁힌다. 기본·이름순·내 순서 중 고를 수 있다. |
| 내 순서 편집 | ↑·↓·⤓ 버튼으로 종목을 옮긴다. ⤓는 한 번에 맨 아래로 보낸다. 내 순서는 이 브라우저에 저장되고 **초기화**로 되돌릴 수 있다. |
| 읽기 편의 | 시세 카드 아래 빈 공간을 줄이고 작은 화면의 가로 스크롤을 고쳤다. |

## 확인한 결과

공개 페이지에서 검색 필터, 종목 선택, 맨 아래 이동, 새로고침 뒤 순서 유지와 초기화를 확인했다. 320px·390px 모바일 화면에서도 목록과 버튼이 표시되고 가로 스크롤이 생기지 않았다.

**Stars는 내 보유 주식 목록이 아니라 공개 관심 종목 목록이다.** 현재 방문자는 자기 브라우저에서만 순서를 바꿀 수 있다. 공개 목록의 종목 추가·삭제는 저장소를 검토해 갱신하는 방식이며, 페이지에 누구나 사용할 수 있는 수정 버튼은 두지 않았다. 종목별 분석 글은 아직 비어 있고 앞으로 작성할 예정이다.

시세와 차트는 외부 [TradingView 위젯](https://www.tradingview.com/widget/)을 사용하므로 데이터가 지연되거나 위젯이 열리지 않을 수 있다. [STOCK 페이지에서 직접 보기]({{ '/stock/' | relative_url }}) · [블로그 소스 저장소](https://github.com/cbh456746/cbh456746.github.io)
