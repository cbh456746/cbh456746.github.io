---
layout: note
title: "LivLiv Player 처음 써보기: PNGTuber에서 2.5D까지"
subtitle: "그림 두 장을 넣어 보고, 움직임의 차이를 직접 확인하는 순서"
date: 2026-11-05 22:30:00 +0900
author: "BH CHOI"
catalog: true
tags:
  - Notes
  - VTuber
  - PNGTuber
  - Web
context:
  reviewed_on: '2026-11-05'
  summary: LivLiv Player의 PNGTuber 예제를 그림과 함께 따라 해 보고 2.5D·VRM과의 차이를 살펴보는 튜토리얼이다.
  findings:
  - 공개 PNG 예제는 입 닫힘과 열림 그림 두 장부터 시험할 수 있다.
  - LivLiv 모델과 VRM은 PNGTuber와 입력 파일 및 움직임의 범위가 다르다.
  - 실제 예제 화면과 공식 움직임 GIF를 필요한 위치에서 보여준다.
  limits:
  - 83ecd9c 커밋의 문서·코드와 공개 데모를 검토했다. 로컬 빌드와 실제 마이크·카메라 성능은 실측하지 않았다.
  - 플레이어는 한 장의 그림을 자동 리깅하지 않으며 Live2D 파일을 재생하지 않는다.
  followups:
  - 자신의 에셋으로 정지 회전 자세와 움직이는 부속물을 별도로 비교한다.
  keywords:
  - LivLiv Player
  - PNGTuber
  - 2.5D 아바타
  - 얼굴 추적
  - 입 모양
  related:
  - /research/vtuber-avatar-live2d-gap/
---

**가장 쉬운 시작은 그림 두 장이다.** [PNGTuber 예제](https://livliv-dev.github.io/player/example/png.html)를 열고 입을 닫은 그림과 연 그림을 넣으면, 웹에서 바로 캐릭터를 볼 수 있다. 이 글은 그 화면에서 시작해 LivLiv의 2.5D 모델과 VRM이 무엇을 더 하는지 살펴본다.

<figure class="tutorial-figure">
  <img src="{{ '/assets/images/livliv-player-png-demo.jpg' | relative_url }}" width="1280" height="720" loading="lazy" decoding="async" alt="LivLiv PNGTuber 예제 화면. 왼쪽 위에 open pictures, microphone, camera 버튼이 있고 가운데에 기본 얼굴이 보인다.">
  <figcaption>실제 <a href="https://livliv-dev.github.io/player/example/png.html">공개 PNGTuber 예제</a> 화면. 위쪽의 세 버튼만 알면 첫 체험을 시작할 수 있다. 화면 캡처: 2026.11.05 · 예제 출처: <a href="https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/example/png.html">LivLiv Player</a>.</figcaption>
</figure>

## 3분 안에 해 보기

1. [PNGTuber 예제](https://livliv-dev.github.io/player/example/png.html)를 연다. 기본 얼굴이 보이면 재생기가 작동한 것이다.
2. **open pictures…**를 눌러 `closed.png`와 `open.png`를 **동시에 선택**한다. 내 캐릭터로 바뀌는지 확인한다.
3. 말할 때 입이 바뀌는지 보고 싶다면 **microphone**을 누른다. 카메라 움직임은 필요할 때만 **camera**를 누른다. 버튼을 다시 누르면 해당 기능이 멈춘다.

마이크·카메라는 브라우저의 권한을 허용해야 한다. 먼저 그림 바꾸기만 시험해도 된다. 버튼 동작은 [공식 예제 코드](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/example/png.html)에서 확인할 수 있다.

## 내 그림은 이렇게 준비한다

두 그림의 **캔버스 크기와 캐릭터 위치를 같게** 맞춘다. 입을 제외한 부분이 흔들리지 않아야 말할 때 자연스럽다. 투명 배경은 방송 화면에 얹기 편하다.

| 파일 | 역할 |
| --- | --- |
| `closed.png` · 필수 | 눈을 뜨고 입을 닫은 상태 |
| `open.png` · 필수 | 같은 위치에서 입만 연 상태 |
| `blink.png` · 선택 | 눈을 감고 입을 닫은 상태 |
| `blink-open.png` · 선택 | 눈을 감고 입을 연 상태 |

확장자 앞의 이름을 맞춰 한 번에 선택한다. 눈 감김 그림이 없으면 기본 그림으로 대체된다. **입 그림 두 장만으로 고개가 입체적으로 회전하지는 않는다.** PNG 방식은 그림을 전환하고 전체 이미지를 살짝 움직이는 방식이다. [PNG 재생 코드](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/src/png.ts)

## 더 움직이는 모델은 무엇이 다를까?

| 방식 | 필요한 파일 | 기대할 움직임 |
| --- | --- | --- |
| PNGTuber | 위의 PNG 두 장부터 | 입 그림 전환, 깜빡임 그림 전환, 전체 이미지의 작은 흔들림 |
| LivLiv 2.5D | `.livliv` 패키지 또는 `model.json`과 레이어 이미지 | 레이어·앵커·표정, 모델에 따라 회전 키포즈와 흔들리는 부속물 |
| VRM | VRM 0.x/1.0 모델 | 3D 머리·눈·입·스프링본 움직임 |

아래는 원본 저장소가 제공하는 **실제 움직임 예시**다. 필요할 때만 열어 본다. 외부 GIF를 불러오며 약 3.7 MB다.

<details class="tutorial-motion">
  <summary>2.5D 움직임 보기 · 공식 데모 GIF 열기</summary>
  <figure class="tutorial-figure">
    <img src="https://raw.githubusercontent.com/livliv-dev/player/83ecd9c48f33d9439411e596841193c24dc7b005/media/demo.gif" width="720" height="450" loading="lazy" decoding="async" alt="LivLiv가 공개한 세 캐릭터가 표정과 몸을 움직이는 애니메이션">
    <figcaption>움직임: <a href="https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/media/demo.gif">LivLiv Player 공식 데모</a>. 캐릭터: LivLiv (livliv.ai). <a href="https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/characters/LICENSE.md">동봉 캐릭터 이용 조건</a>이 별도로 적용된다. 움직이는 이미지가 불편하면 이 영역을 닫을 수 있다.</figcaption>
  </figure>
</details>

[One character 예제](https://livliv-dev.github.io/player/example/demo.html)에서는 동봉 캐릭터의 표정과 동작을 볼 수 있고, 사용 권한이 있는 `.livliv` 파일이나 모델 폴더를 열 수 있다. [VRM 예제](https://livliv-dev.github.io/player/example/vrm.html)는 별도다. `.livliv`은 레이어와 리깅 정보가 들어 있는 패키지이며, 회전 키포즈가 있는 모델은 `keyforms.json`을 포함한다. [포맷 설명](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/FORMAT.md)

**한 장의 일러스트를 움직이는 모델로 만드는 일은 플레이어 밖의 작업**이다. LivLiv 웹 서비스의 모델 제작에는 생성 AI가 사용되지만, 이 저장소의 Player는 만들어진 모델을 재생한다. Live2D의 `.moc3` 파일도 지원하지 않는다. [README](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/README.md), [API](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/API.md)

## 내 컴퓨터에서 실행하기

공개 예제를 체험하는 데 설치는 필요 없다. **예제를 수정하거나 내 웹페이지에 넣을 때** 아래 절차를 사용한다. 현재 패키지는 npm에 배포되지 않았으므로 저장소를 받아 빌드해야 한다. [공식 개발 안내](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/README.md#develop)

```sh
git clone https://github.com/livliv-dev/player.git
cd player
npm install
npm run build
npx vite --host 127.0.0.1
```

터미널이 알려주는 주소에서 `/example/png.html`을 연다. 기본 포트라면 `http://127.0.0.1:5173/example/png.html`이다. Windows 기본 PowerShell에서는 빌드 명령의 `rm -rf dist`가 실패할 수 있다. 그런 경우 `npx vite build`와 `npx tsc -p tsconfig.build.json`을 순서대로 실행하는 방법이 있다. 이는 [빌드 스크립트](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/package.json)를 나눠 적은 대안으로, 이 글에서 Windows 실행을 실측한 결과는 아니다.

직접 만든 페이지에서는 `BodyPlayer`와 `PngBody`에 두 이미지의 경로를 전달한다. 마이크 시작·중지와 오류 표시는 [공식 PNG 예제](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/example/png.html)의 버튼 구현을 참고한다.

## 사용 전에 기억할 세 가지

- **방송:** 저장소는 OBS Browser Source 사용을 안내한다. OBS 안의 카메라·마이크 권한은 방송 전에 따로 시험한다. [OBS 예시](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/README.md#embed-without-code)
- **개인정보:** 얼굴 영상은 브라우저 안에서 처리되지만, 기본 얼굴 추적 설정은 실행 파일·모델을 외부에서 받아 오고 Google로 사용 통계를 보낸다고 문서가 설명한다. 외부 통신을 줄이려면 자체 호스팅과 CSP를 함께 검토한다. [통신 설명](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/API.md#with-no-third-party)
- **권리:** 플레이어 코드는 Apache 2.0이지만, 동봉 캐릭터는 별도 조건이다. 출처 표기가 필요한 개인·비상업 사용 범위, 별도 판매·상업 서비스·AI 학습 제한을 확인한다. [캐릭터 이용 조건](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/characters/LICENSE.md)

**다음 비교 기준:** PNG 그림 전환을 본 뒤 2.5D 예제의 회전 자세를 멈춰 본다. 정지한 자세가 자연스러운지, 움직일 때 머리카락과 장식이 설득력 있게 따라오는지를 분리해서 평가한다. [관련 연구 노트]({{ '/research/vtuber-avatar-live2d-gap/' | relative_url }})

<small>검토 기준: 상위 저장소 83ecd9c · 공개 예제 화면 캡처. 로컬 빌드와 실제 카메라·마이크 성능은 이 글에서 실측하지 않았다.</small>
