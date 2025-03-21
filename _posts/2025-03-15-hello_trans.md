---
layout:     post
title:      "안녕 2015"
subtitle:   " \"안녕하세요, 세상! 안녕하세요, 블로그!\""
date:       2015-01-29 12:00:00
author:     "Hux"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 메타
---

> “네, 시작됐습니다. ”


Hux의 블로그가 이렇게 개설되었습니다.

[잡담 건너뛰고, 바로 기술 구현 보기](#build) 

2015년, Hux는 드디어 제대로 글을 쓸 수 있는 공간을 갖게 되었습니다.


프로그래머로서, 블로그 같은 바퀴를 일반적인 블로그 플랫폼에 얹는 건 너무 재미없다고 생각했어요. 첫째, 대부분의 블로그 서비스가 너무 못생겼다고 느꼈고, 둘째, 자유롭게 커스터마이징할 수 없으면 재미없다고 생각했죠. 이전엔 너무 게을러서 손대지 않았던 탓에, 결국 블로그를 쓸 공간조차 없었네요.

[지후](https://www.zhihu.com/)에서 한동안 놀다가, 질문에 답하면서 느끼는 쾌감이 다시 블로그를 시작하고 싶게 만들었어요. 이전의 [개인 웹사이트](http://huangxuan.me/portfolio)는 포트폴리오 형식이었기 때문에 (지금은 여기 통합했어요) 블로그 포스트를 쓰기엔 적합하지 않았죠. 그래서 더 고민하지 않고, 하루 만에 만들어버리자고 결심했어요!


<p id = "build"></p>

## 본문

이제 이 블로그를 만든 기술적인 세부 사항을 이야기해 볼게요.  

마침 이전부터 [GitHub Pages](https://pages.github.com/) + [Jekyll](http://jekyllrb.com/)를 활용해 빠르게 블로그를 만드는 기술에 관심이 있었는데, 정말 쉽고 세련된 방법이에요.

장점은 매우 분명합니다:

* **Markdown**이 제공하는 우아한 글쓰기 경험
* 익숙한 Git 워크플로우, **Git Commit이 곧 블로그 포스트**
* GitHub Pages의 도메인과 무료 무제한 저장 공간 활용으로 직접 서버를 관리할 필요 없음
	* 커스텀 도메인이 필요하면 DNS에 CNAME만 추가하면 끝
* Jekyll은 커스터마이징이 매우 쉬움, 기본적으로 템플릿 엔진 역할

원래 단점이라 생각했던 건 GitHub가 국내에서 너무 느리다는 점이었는데, 다음 날 아침 일어나자마자 GitCafe(중국의 GitHub 복제판, 현재는 Coding에 인수됨)에 [미러](http://huxpro.coding.me)를 만들어 봤지만 여전히 느리더군요.

저는 프론트엔드 개발자잖아요! 당연히 Chrome DevTools를 열어 네트워크 요청을 확인했더니, **Google Fonts에서 요청이 멈춰 있었어요**. 페이지 렌더링이 요청 타임아웃까지 계속 막혀 있었던 거라 그만큼 느렸던 거죠.  
결국 아쉽지만 Web Fonts를 제거했어요 (어차피 타임아웃되면 fallback 폰트만 보이니까요). 그러자 바로 속도가 정상으로 돌아왔고, GitHub와 GitCafe의 속도 차이도 크게 느껴지지 않았어요. GitHub의 ping 값이 300ms로 높긴 했지만, DNSPOD로 최적화해서 속도를 조금 더 개선했죠.


---

설정 과정에서 큰 어려움은 없었어요. 기본적으로 Git 흐름을 따르니까 꽤 자연스럽게 진행됐습니다.

Jekyll 테마는 Clean Blog를 그대로 포크했어요 (이 테마는 꽤 유명해서 더 말하지 않겠습니다. 단점이라면 태그 기능이 없다는 건데, 제가 추가해 넣었죠.)

로컬 디버깅 환경을 위해 `gem install jekyll`을 했는데, rubygem 소스가 막혀 있어서… 나중에 타오바오의 미러 소스로 변경해서 성공했어요.

테마의 CSS는 Bootstrap 기반으로 커스터마이징된 거라, 마음에 안 드는 부분은 Less에서 직접 수정했어요 (평소엔 SCSS를 더 선호하지만요). **그런데 사실 Bootstrap은 모바일 경험에서 좀 별로라고 늘 느꼈어요. 제가 타오바오에서 참여했던 팀의 CSS 프레임워크보다 훨씬 못했거든요…** 그래서 경험을 개선하려고 CSS를 꽤 추가했죠.

마지막으로 시간이 가장 많이 걸린 **이미지 만들기와 글쓰기** 단계에 들어갔어요. 이걸로 **블로그 쓰기**의 본궤도에 오른 셈이죠. 이 사이트는 Hack Day처럼 급하게 만들었기 때문에, 정신없이 하다 보니 밤늦은 시간까지 갔네요.

다음 날은 중문 폰트 렌더링을 고려해서 [Type is Beautiful](http://www.typeisbeautiful.com/)의 `font` CSS를 포크해 와서 글자 크기를 조정하고, 윈도우의 형편없는 렌더링에 맞췄더니 중영문 혼합 배치 효과가 훨씬 나아졌어요.


## 후기

이 블로그의 탄생을 돌아보면, 순전히 개인적인 흥미에서 시작했어요. 지후에서 관련 질문에 답하고 어느 정도 별을 받은 후, 이 블로그 테마를 작은 오픈소스 프로젝트로 유지하기로 했죠.

v1.0에서 v1.5까지 변화를 거치며, 이 테마는 점점 더 완성도를 높여갔어요. UI 레벨에서 다양한 최적화(opinionated)를 추가했고, 코드 레벨에서는 더 풍부한 설정 옵션으로 유연성과 확장성을 개선했어요. 오픈소스 프로젝트로서 문서도 보완하고 이슈도 해결하며 적극적으로 관리했죠.

만약 당신이 여기를 우연히 방문했다면, 이 블로그 테마를 좋아해 주셨으면 좋겠네요.

—— Hux, 2015년 10월 후기
