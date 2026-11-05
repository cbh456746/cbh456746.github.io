---
layout: default
title: Stock
description: Stars에 등록한 미국 상장 종목의 USD 시세와 분석 기록.
permalink: /stock/
---
{% assign stars = site.data['stock-stars'] %}
{% assign analyses = site.stock_analysis | sort: 'date' | reverse %}
<section class="stock-shell" data-stock-root aria-labelledby="stock-title">
  <header class="stock-intro">
    <p class="eyebrow">Stock / Stars</p>
    <h1 id="stock-title">관심 종목을 따라 읽는 기록</h1>
    <p>소유자가 Stars에 담은 미국 상장 주식·ADR·ETF만 살펴봅니다. 목록에서 종목을 고르면 차트와 그 종목에 관한 글을 함께 볼 수 있습니다.</p>
  </header>
  {% if stars.size > 0 %}
  <div class="stock-workspace">
    <aside class="stock-sidebar" aria-labelledby="stock-stars-title">
      <div class="stock-sidebar__heading"><div><p class="eyebrow">Watchlist</p><h2 id="stock-stars-title">Stars <span>{{ stars.size }}</span></h2></div><span class="stock-currency">USD</span></div>
      <p class="stock-sidebar__hint">종목을 선택하세요. 목록은 휠과 터치로 탐색할 수 있습니다.</p>
      <ol class="stock-stars" aria-label="Stars 종목">
        {% for star in stars %}
        {% assign ticker = star.symbol | split: ':' | last %}
        <li class="stock-star" data-stock-item="{{ star.symbol | escape }}">
          <a class="stock-star__select" href="{{ '/stock/' | relative_url }}?symbol={{ star.symbol | url_encode }}" data-stock-select="{{ star.symbol | escape }}"{% if forloop.first %} aria-current="true"{% endif %}>
            <span class="stock-star__name">{{ star.name | escape }}</span><span class="stock-star__ticker">{{ ticker | escape }}</span>
          </a>
          <div class="stock-star__quote" data-stock-quote="{{ star.symbol | escape }}"><span class="stock-quote-placeholder">시세 불러오는 중…</span></div>
        </li>
        {% endfor %}
      </ol>
      <p class="stock-data-note">시세 제공: <a href="https://www.tradingview.com/widget/" target="_blank" rel="noopener noreferrer">TradingView</a>. 미국 주식 위젯 시세는 지연 데이터입니다. 위젯을 열면 외부 서비스로 접속합니다.</p>
    </aside>
    <div class="stock-detail">
      {% for star in stars %}
      {% assign ticker = star.symbol | split: ':' | last %}
      <section class="stock-panel" data-stock-panel="{{ star.symbol | escape }}"{% unless forloop.first %} hidden{% endunless %} aria-labelledby="stock-panel-title-{{ forloop.index }}">
        <header class="stock-panel__heading"><div><p class="eyebrow">{{ star.symbol | escape }} · USD</p><h2 id="stock-panel-title-{{ forloop.index }}">{{ star.name | escape }}</h2></div><span class="stock-panel__badge">STAR {{ forloop.index }}</span></header>
        <div class="stock-chart" data-stock-chart="{{ star.symbol | escape }}"><p class="stock-chart__placeholder">차트를 불러오는 중…</p></div>
        <p class="stock-data-note">차트의 시세·당일 변동은 <a href="https://www.tradingview.com/symbols/{{ star.symbol | replace: ':', '-' | escape }}/" target="_blank" rel="noopener noreferrer">TradingView</a>가 제공하는 지연 데이터입니다. 거래 시간을 확인한 뒤 이용하세요.</p>
        <div class="stock-articles">
          <div class="stock-articles__heading"><p class="eyebrow">My notes</p><h3>이 종목에 관한 분석</h3></div>
          {% assign match_count = 0 %}
          {% for item in analyses %}{% if item.stock_symbol == star.symbol %}
          {% assign match_count = match_count | plus: 1 %}
          <article class="stock-article"><time datetime="{{ item.date | date: '%Y-%m-%d' }}">{{ item.date | date: '%Y.%m.%d' }}</time><h4><a href="{{ item.url | relative_url }}">{{ item.title | escape }}</a></h4>{% if item.subtitle %}<p>{{ item.subtitle | escape }}</p>{% endif %}</article>
          {% endif %}{% endfor %}
          {% if match_count == 0 %}<p class="stock-articles__empty">아직 공개한 분석 글이 없습니다.</p>{% endif %}
        </div>
      </section>
      {% endfor %}
    </div>
  </div>
  {% else %}
  <p class="empty-state">아직 Stars에 등록된 종목이 없습니다. 소유자가 종목을 지정하면 목록과 차트가 공개됩니다.</p>
  {% endif %}
</section>
<script src="{{ '/js/stock.js' | relative_url }}" defer></script>
