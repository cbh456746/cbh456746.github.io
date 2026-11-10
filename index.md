---
layout: soul
title: Home
description: BH CHOI의 프로젝트, 탐구, 학습과 취향을 담는 개인 기록 공간.
home_design: garden
home_current:
  task_id: M-31
  updated_on: '2026-11-10'
  summary: '좌상단의 달·해 버튼으로 밝은 화면과 어두운 화면을 전환할 수 있게 했습니다. 선택한 화면은 이 브라우저에 저장됩니다.'
---

<section class="home-hero" aria-labelledby="home-title">
  <img class="home-hero__image" src="{{ '/assets/images/home-garden.webp' | relative_url }}" alt="푸른 나무 사이로 먼 건물의 지붕이 보이는 고요한 풍경" width="1920" height="902" fetchpriority="high" decoding="async">
  <div class="home-hero__copy">
    <p class="home-kicker">A personal space by BH CHOI</p>
    <h1 id="home-title">Hanasaka</h1>
    <a class="home-text-link" href="{{ '/archive/' | relative_url }}">기록 둘러보기 <span aria-hidden="true">↗</span></a>
  </div>
</section>

<div class="home-sections" aria-label="기록의 네 가지 갈래">
  <a href="{{ '/projects/' | relative_url }}"><span class="home-section__number" aria-hidden="true">01</span><span class="home-section__title">Projects <span aria-hidden="true">↗</span></span></a>
  <a href="{{ '/research/' | relative_url }}"><span class="home-section__number" aria-hidden="true">02</span><span class="home-section__title">Research <span aria-hidden="true">↗</span></span></a>
  <a href="{{ '/notes/' | relative_url }}"><span class="home-section__number" aria-hidden="true">03</span><span class="home-section__title">Notes <span aria-hidden="true">↗</span></span></a>
  <a href="{{ '/play/' | relative_url }}"><span class="home-section__number" aria-hidden="true">04</span><span class="home-section__title">Play <span aria-hidden="true">↗</span></span></a>
</div>

<section class="home-current" aria-labelledby="home-current-title">
  <div class="home-current__heading"><p class="home-kicker">Currently exploring</p><h2 id="home-current-title">지금 만들어가는 것들</h2><p><time datetime="{{ page.home_current.updated_on }}">{{ page.home_current.updated_on | date: '%Y.%m.%d' }}</time><br>{{ page.home_current.summary }}</p></div>
  <div class="home-current__list">
    <a class="home-project" href="{{ '/stock/' | relative_url }}"><span class="home-project__tag">Stock · Stars</span><h3>관심 종목과 분석을 한 화면에 <span aria-hidden="true">↗</span></h3><p>미국 상장 관심 종목의 USD 시세와 차트를 살펴보고, 종목별 분석 기록을 이어갑니다.</p><span class="home-project__status">검색·맨 아래 이동을 포함한 개인 순서 편집 공개 · 분석 글은 준비 중</span></a>
    <a class="home-project" href="{{ '/workbench/' | relative_url }}"><span class="home-project__tag">Operations · Board</span><h3>목표와 기록을 다음 작업으로 <span aria-hidden="true">↗</span></h3><p>목표·작업·근거와 공개 미디어를 블록으로 살펴봅니다. 사용법과 별도 개인 대화 파일 도구도 이용할 수 있습니다.</p><span class="home-project__status">사용성 개편 공개 · 자율 실행은 단계별 검증</span></a>
    <a class="home-project" href="{{ '/research/avatar-head-targets-and-visual-editing/' | relative_url }}"><span class="home-project__tag">Projects · Mesh Avatar Studio</span><h3>한 장의 그림을 움직이는 아바타로 <span aria-hidden="true">↗</span></h3><p>원화를 지키는 방향별 목표 얼굴과 사람의 시각 편집·재생 검수로 다음 머리 시제품을 준비합니다.</p><span class="home-project__status">좌표 연구 정리 · 편집 도구 설계 단계 · 저장소 비공개</span></a>
    <a class="home-project" href="{{ '/projects/mopago/' | relative_url }}"><span class="home-project__tag">Projects · Mopago</span><h3>한글 모아모아의 다음 수 찾기 <span aria-hidden="true">↗</span></h3><p>게임판과 보유 조각을 입력하면 다음 배치를 추천하는 독립 웹 도구.</p></a>
    <a class="home-project" href="{{ '/projects/repo-style-pngtuber/' | relative_url }}"><span class="home-project__tag">Projects · PNGTuber</span><h3>목소리에 반응하는 작은 캐릭터 <span aria-hidden="true">↗</span></h3><p>두 캐릭터의 뚜껑 개폐·눈 깜빡임 에셋과 마이크 반응형 OBS 오버레이.</p></a>
  </div>
</section>

{% include visitor-stats.html %}
