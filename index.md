---
layout: soul
title: Home
description: BH CHOI의 프로젝트, 탐구, 학습과 취향을 담는 개인 기록 공간.
home_design: garden
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
  <div class="home-current__heading"><p class="home-kicker">Currently exploring</p><h2 id="home-current-title">지금 만들어가는 것들</h2></div>
  <div class="home-current__list">
    <a class="home-project" href="{{ '/projects/mesh-avatar-studio/' | relative_url }}"><span class="home-project__tag">Projects · Mesh Avatar Studio</span><h3>한 장의 그림을 움직이는 아바타로 <span aria-hidden="true">↗</span></h3><p>독립 파츠 리깅, 얼굴 추적과 Windows 실행 앱. 15초 시연과 남은 과제를 기록합니다.</p><span class="home-project__status">개발 중 · 저장소 비공개</span></a>
    <a class="home-project" href="{{ '/projects/mopago/' | relative_url }}"><span class="home-project__tag">Projects · Mopago</span><h3>한글 모아모아의 다음 수 찾기 <span aria-hidden="true">↗</span></h3><p>게임판과 보유 조각을 입력하면 다음 배치를 추천하는 독립 웹 도구.</p></a>
    <a class="home-project" href="{{ '/projects/repo-style-pngtuber/' | relative_url }}"><span class="home-project__tag">Projects · PNGTuber</span><h3>목소리에 반응하는 작은 캐릭터 <span aria-hidden="true">↗</span></h3><p>두 캐릭터의 뚜껑 개폐·눈 깜빡임 에셋과 마이크 반응형 OBS 오버레이.</p></a>
  </div>
</section>

{% include visitor-stats.html %}
