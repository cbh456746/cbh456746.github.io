---
layout: note
title: "LivLiv Player 시작하기: 웹 아바타와 PNGTuber 체험"
subtitle: "공개 데모부터 그림 두 장, 로컬 실행까지 따라 하는 안내"
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
  summary: LivLiv Player의 공개 데모와 PNGTuber·2.5D 모델·VRM 재생 방식을 비교하고 첫 실행 절차를 정리했다.
  findings:
  - PNGTuber는 입을 닫은 그림과 연 그림 두 장부터 체험할 수 있다.
  - LivLiv 모델 재생과 얼굴 추적은 별도 모듈과 모델 파일을 사용한다.
  - 저장소의 코드와 동봉 캐릭터에는 서로 다른 이용 조건이 적용된다.
  limits:
  - 83ecd9c 커밋의 문서·예제·코드를 검토하고 공개 데모 주소 응답을 확인했다. 로컬 빌드와 실제 카메라·마이크 동작은 이 글에서 실측하지 않았다.
  - 이 플레이어만으로 한 장의 그림을 자동 리깅하거나 Live2D 모델을 재생할 수는 없다.
  followups:
  - 실제 제작에 적용할 때 정지 회전 자세와 부속물 움직임을 별도로 비교한다.
  keywords:
  - LivLiv Player
  - PNGTuber
  - 2.5D 아바타
  - 얼굴 추적
  - 입 모양
  related:
  - /research/vtuber-avatar-live2d-gap/
---

[LivLiv Player](https://github.com/livliv-dev/player)는 웹페이지의 캔버스에서 캐릭터를 재생하는 오픈소스 프로젝트다. 처음에는 [공개 예제 모음](https://livliv-dev.github.io/player/)에서 움직임을 보고, 이어서 그림 두 장으로 PNGTuber를 시험할 수 있다. 아래 설명은 **2026년 11월 5일, 저장소 [83ecd9c 커밋](https://github.com/livliv-dev/player/tree/83ecd9c48f33d9439411e596841193c24dc7b005)**을 기준으로 작성했다. 데모 주소의 응답은 확인했으며, 로컬 빌드와 카메라·마이크의 실제 동작은 별도로 시험하지 않았다.

## 먼저 어떤 방식인지 고르기

| 방식 | 준비물 | 화면에서 일어나는 일 |
| --- | --- | --- |
| PNGTuber | 입 닫힘·열림 그림 두 장, 선택적으로 눈 감김 그림 | 음성에 맞춰 그림을 바꾸고 전체 그림을 작게 흔들거나 기울인다. 정면 그림만으로 입체 회전이 생기지는 않는다. |
| LivLiv 모델 | `.livliv` 파일 또는 `model.json`과 텍스처 폴더 | 분리된 레이어·앵커·표정·선택적 회전 키포즈를 이용해 2.5D 움직임을 재생한다. |
| VRM | VRM 0.x/1.0 파일과 추가 웹 라이브러리 | 3D 모델의 머리·눈·입·스프링본을 이용한다. |

세 방식 모두 비슷한 재생 인터페이스를 제공하지만 **입력 파일과 표현 범위가 다르다**. LivLiv Player는 이미 만들어진 에셋을 재생한다. 한 장의 일러스트를 자동으로 분리하고 리깅하는 과정은 플레이어 기능이 아니다. [README](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/README.md), [API 설명](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/API.md)

## 1. 설치 없이 예제 열기

1. [예제 모음](https://livliv-dev.github.io/player/)을 연다. 먼저 **One character**에서 기본 캐릭터의 표정과 끄덕임을 본다.
2. **A PNGTuber**를 열면 [PNGTuber 예제](https://livliv-dev.github.io/player/example/png.html)가 나온다. 기본 그림이 움직이는지 확인한다.
3. 마이크나 카메라를 쓰고 싶을 때만 각각 **microphone**, **camera**를 누른다. 브라우저 권한 요청이 나타나면 사용할 기기를 확인한다. 다시 누르면 해당 추적을 중지한다.

예제의 버튼과 상태 메시지는 [실제 예제 코드](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/example/png.html)에 있다. 마이크·카메라 기능은 권한, 브라우저, 네트워크 상태에 따라 사용할 수 없을 수 있다.

## 2. 내 그림 두 장으로 PNGTuber 시험하기

같은 크기와 같은 위치에 캐릭터를 그린 이미지 두 장을 준비한다. 배경이 투명하면 방송 화면에 얹기 쉽다.

| 파일 이름 | 필수 여부 | 그림 |
| --- | --- | --- |
| `closed.png` | 필수 | 눈을 뜨고 입을 닫은 상태 |
| `open.png` | 필수 | 눈을 뜨고 입을 연 상태 |
| `blink.png` | 선택 | 눈을 감고 입을 닫은 상태 |
| `blink-open.png` | 선택 | 눈을 감고 입을 연 상태 |

1. [PNGTuber 예제](https://livliv-dev.github.io/player/example/png.html)에서 **open pictures…**를 누른다.
2. 준비한 파일을 **한 번에 여러 개 선택**한다. 파일 이름의 확장자 앞 부분이 위 표와 일치해야 한다.
3. 그림이 바뀌었는지 확인하고, 원하면 **microphone**을 켜서 말할 때 입 그림이 전환되는지 살핀다. 카메라 추적은 전체 그림의 움직임을 조금 보탠다.

입을 연 그림만 있거나 이름이 다르면 로드 오류가 난다. 눈 감김 파일이 없으면 기본 그림으로 대체된다. 이 방식은 별도의 얼굴 각도 그림을 생성하지 않으므로, 고개가 실제로 돌아가는 효과를 기대해서는 안 된다. [PNGTuber 구현](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/src/png.ts), [API의 PNGTuber 항목](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/API.md#characters-that-arent-livliv-models-livlivplayerbody)

## 3. 2.5D 모델이나 VRM 살펴보기

- [One character 예제](https://livliv-dev.github.io/player/example/demo.html)는 동봉 캐릭터를 보여준다. **open a .livliv…** 또는 **open a folder…**로 자신이 사용 권한을 가진 모델을 열 수 있다.
- `.livliv`은 모델 정보와 레이어 이미지가 들어 있는 패키지다. 압축을 풀었다면 `model.json`과 `textures/` 구조가 필요하다. 선택적으로 `keyforms.json`이 회전 자세를 보완한다. [포맷 설명](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/FORMAT.md)
- VRM은 [별도 예제](https://livliv-dev.github.io/player/example/vrm.html)에서 시험한다. VRM 재생에는 `three`와 `@pixiv/three-vrm`이 필요하다. [API 설명](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/API.md#characters-that-arent-livliv-models-livlivplayerbody)

LivLiv 웹 서비스에서 한 장의 이미지로 모델을 만드는 과정에는 생성 AI가 쓰인다. **플레이어 자체는 모델을 생성하지 않는다.** 무료 플랜 모델에는 표시 마크가 포함될 수 있으므로 각 패키지의 이용 조건을 확인한다. [README의 모델 제작 안내](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/README.md#characters-of-your-own)

## 4. 로컬에서 예제를 실행하려면

소스 코드를 직접 수정하거나 자신의 웹페이지에 넣을 때는 Git과 Node.js가 필요하다. 저장소는 현재 npm에 배포된 패키지가 아니므로, `npm install @livliv/player` 대신 저장소를 받아 빌드한다. 아래는 **macOS·Linux 계열 셸**에서 README가 안내하는 순서다. [README의 개발 절차](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/README.md#develop)

```sh
git clone https://github.com/livliv-dev/player.git
cd player
npm install
npm run build
npx vite --host 127.0.0.1
```

실행 후 브라우저에서 `http://127.0.0.1:5173/example/png.html`을 연다. 포트가 이미 사용 중이면 터미널에 표시된 실제 주소를 따른다. `file://`로 HTML을 직접 여는 대신 로컬 웹 서버를 사용하는 절차다.

Windows 기본 PowerShell에서 `npm run build`가 `rm -rf dist` 명령 때문에 실패할 수 있다. 이때는 같은 폴더에서 `npx vite build`, `npx tsc -p tsconfig.build.json`을 차례로 실행하는 방법이 있다. 이는 [package.json의 빌드 명령](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/package.json)을 분리한 **코드 기반 대안**이며, 이 글에서 Windows 실행을 검증한 결과는 아니다.

웹페이지에 PNGTuber를 직접 붙이려면, 빌드된 `dist/` 옆에 `images/closed.png`, `images/open.png`와 아래 `index.html`을 둔다. 같은 로컬 서버에서 `http://127.0.0.1:5173/`을 열면 두 그림을 재생한다.

```html
<canvas id="avatar" width="480" height="640"></canvas>
<script type="module">
  import { BodyPlayer } from './dist/body.js';
  import { PngBody } from './dist/png.js';

  const avatar = new BodyPlayer(document.querySelector('#avatar'), new PngBody());
  await avatar.load({ closed: './images/closed.png', open: './images/open.png' });
</script>
```

마이크는 사용자 클릭 안에서 `startLipSync()`를 시작해야 한다. 권한 오류 표시와 중지 버튼 처리까지는 [공식 PNG 예제](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/example/png.html)를 참고한다.

## 사용 전 확인할 한계와 권한

- **방송 활용:** 저장소는 웹 오버레이와 OBS Browser Source 사용을 안내한다. OBS 안의 마이크·카메라 권한 동작은 환경에 따라 달라질 수 있으므로 실제 송출 전에 따로 시험한다. [README의 임베드 예시](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/README.md#embed-without-code)
- **프라이버시:** 얼굴 추적의 영상 처리는 브라우저 안에서 이루어지지만, 기본 설정은 MediaPipe 실행 파일과 얼굴 모델을 외부 호스트에서 받고 Google로 사용 통계를 보낸다고 문서가 밝힌다. 외부 통신을 줄이려면 파일 자체 호스팅과 CSP를 함께 구성해야 한다. [API의 통신 설명](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/API.md#with-no-third-party)
- **라이선스:** 코드의 Apache 2.0과 동봉된 캐릭터 21종의 허가는 다르다. 동봉 캐릭터는 출처 표기를 전제로 한 개인·비상업 용도 등이 허용되지만, 별도 판매·상업 서비스 사용·AI 학습은 허용되지 않는다. 자신의 에셋과 서비스에서 만든 모델도 각각의 권리를 확인한다. [코드 LICENSE](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/LICENSE), [캐릭터 LICENSE](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/characters/LICENSE.md)
- **표현 범위:** PNGTuber는 그림 전환과 전체 흔들림에 가깝다. LivLiv 모델의 레이어·회전 키포즈나 VRM의 스프링본도 Live2D 리깅과 같지 않다. `.moc3` 파일은 지원하지 않는다. 우리 작업의 기준인 **정지 회전 자세의 자연스러움**과 **부속물이 따라오는 설득력**은 별도 모델·애니메이션 검증이 필요하다. [API의 형식 범위](https://github.com/livliv-dev/player/blob/83ecd9c48f33d9439411e596841193c24dc7b005/API.md#characters-that-arent-livliv-models-livlivplayerbody), [관련 연구 노트]({{ '/research/vtuber-avatar-live2d-gap/' | relative_url }})

**추천 순서:** 공개 PNG 예제에서 두 그림의 전환을 확인하고 → LivLiv 모델 예제에서 회전·표정의 차이를 본 다음 → 자신의 에셋으로 정지 자세와 움직임을 따로 비교한다. 재생기의 기능과 캐릭터 원본의 품질을 구분해 평가하는 것이 핵심이다.
