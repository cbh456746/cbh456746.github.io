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
    <a class="home-project" href="{{ '/play/repo-style-pngtuber-kickoff/' | relative_url }}"><span class="home-project__tag">Play · PNGTuber</span><h3>목소리에 반응하는 작은 로봇 <span aria-hidden="true">↗</span></h3><p>뚜껑형 캐릭터 에셋부터 마이크 반응, 좌우 개폐와 OBS 오버레이까지.</p></a>
    <a class="home-project" href="{{ '/projects/browser-vtuber-avatar-project/' | relative_url }}"><span class="home-project__tag">Projects · Avatar</span><h3>화면 속 캐릭터에 움직임을 <span aria-hidden="true">↗</span></h3><p>브라우저 아바타의 표정·방향 변화 예제와 VTube Studio 방송 구성 안내.</p></a>
  </div>
</section>
