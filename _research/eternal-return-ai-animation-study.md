---
title: "이터널리턴 AI 애니메이션 실험: 원화와 동작 사이의 간극"
subtitle: "원화 8장과 로컬 영상 모델로 만든 15.67초를 RISE와 비교하고, 회전·궁술·타격이 성립하지 않은 이유를 살펴본 제작 연구"
date: 2026-10-30 00:00:00 +0900
tags:
  - Research
  - Play
  - Game
  - Machine-Learning
context:
  reviewed_on: '2026-10-30'
  summary: AI 원화8컷에서 로컬 영상 초안15.67초를 제작했지만 RISE 목표 품질에는 미달했다.
  findings:
  - 핵심 회전이 편집에서 생략됐고 활·시위·화살과 타격 연결이 불안정했다.
  - LTX 단일 패스와 CFG 1, Wan 재시도의 교란 조건을 구분해 해석했다.
  limits:
  - 자체평가이며 독립 관객 평가와 통제된 모델 비교를 수행하지 않았다.
  - 원화 생성의 정확한 백엔드·시드와 전체 공정 비용은 확인하지 못했다.
  followups:
  - 같은 화살을 유지한 준비·회전·발사·명중 한 동작부터 검증한다.
  keywords:
  - 이터널리턴
  - KEL
  - RISE
  - ComfyUI
  - LTX
  - Wan
  - CFG
  - 블링크
  - 점멸
  - 배면궁술
  related: []
---

<style>
.content-shell .content-header h1 { word-break:keep-all; overflow-wrap:break-word; text-wrap:balance; }
.kel-figure { margin:2rem 0; }
.kel-figure img,.kel-study-video { display:block; width:100%; height:auto; border-radius:.3rem; }
.kel-figure figcaption { margin-top:.7rem; color:var(--muted); font-size:.87rem; line-height:1.75; }
.kel-study-video { background:#10141b; }
.kel-note { margin:1.6rem 0; padding:1rem 1.2rem; border-left:3px solid var(--accent); background:var(--surface); }
.kel-note p { margin:.25rem 0; }
.kel-prompt { margin:.7rem 0; border:1px solid var(--line); border-radius:.35rem; background:var(--surface); }
.kel-prompt summary { padding:.85rem 1rem; cursor:pointer; font-size:.94rem; font-weight:600; line-height:1.65; overflow-wrap:anywhere; }
.kel-prompt summary:focus-visible { outline:3px solid var(--accent); outline-offset:3px; }
.kel-prompt .kel-hide { display:none; }
.kel-prompt[open] .kel-show { display:none; }
.kel-prompt[open] .kel-hide { display:inline; }
.prose .kel-prompt-meta { padding:0 1rem; font-size:.83rem; color:var(--muted); }
.prose .kel-prompt pre { margin:.6rem; max-height:28rem; overflow:auto; font-size:.8rem; line-height:1.75; }
.prose .kel-prompt pre code { white-space:pre-wrap; overflow-wrap:anywhere; word-break:normal; }
.kel-downloads { padding:1rem 1.2rem; border:1px solid var(--line); border-radius:.35rem; }
.kel-downloads p { margin:.4rem 0; }
.kel-inline { overflow-wrap:anywhere; }
.kel-gallery-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:1rem; padding:1rem; }
.kel-gallery-grid figure { margin:0; min-width:0; }
.kel-gallery-grid img { display:block; width:100%; height:auto; }
.kel-gallery-grid figcaption { margin:.4rem 0; font-size:.82rem; color:var(--muted); }
@media(max-width:720px) {
  .kel-prompt summary { padding:.8rem; }
  .prose .kel-prompt pre { margin:.4rem; padding:.8rem; }
  .kel-figure { margin:1.6rem 0; }
  .kel-gallery-grid { grid-template-columns:1fr; }
}
</style>

리오가 두 번째 화살을 당긴다. 리 다이린은 그 화살을 피하려고 점멸로 리오의 뒤를 잡는다. 리오는 잠시 눈을 감았다가 몸을 돌려, 이미 준비한 화살로 상대를 연구소 벽에 밀어붙인다. 계획한 하이라이트의 절정은 이 짧은 역전이었다.

최종 영상에서는 눈감기 클로즈업이 끝나는 순간 리오가 이미 뒤를 조준하고 있다. 회전 중의 발과 골반, 활을 잡은 손, 시위를 유지하는 팔은 보여주지 못했다. 화살도 때로는 길게 이어진 발광선처럼 보인다. **원화의 인상을 이어 붙이는 일과, 그 인물이 실제로 싸우는 동작을 만드는 일 사이에 남은 간극**이다.

이번 글은 이터널리턴 KEL 하이라이트를 시네마틱으로 재연하려던 소규모 제작 실험을 다룬다. 입력 플레이 클립에서 사건을 읽고, AI 원화 8장을 만든 뒤, 사용자 GPU에서 영상 모델을 실행해 15.67초로 편집했다. 목표는 *RISE* 같은 게임 시네마틱의 미술과 행동 가독성이었다. 자체평가의 결론은 **목표 미달**이다. 여기서는 사용한 설정과 실제 결과를 공개하고, 실패가 드러난 구간을 다음 제작의 검사 조건으로 바꿔 본다.

<figure class="kel-figure">
<video class="kel-study-video" controls playsinline preload="metadata" width="1920" height="1080" poster="/assets/images/kel-animation-study/poster.webp" aria-label="원화 여덟 장을 바탕으로 로컬 AI 모델이 생성한 15.67초 전투 영상 초안">
<source src="/assets/videos/kel-animation-study/kel-local-ai-v001.mp4" type="video/mp4">
<a href="/assets/videos/kel-animation-study/kel-local-ai-v001.mp4">동작 영상 초안 MP4 열기</a>
</video>
<figcaption>영상 1. 분석 대상인 AI 생성 동작 초안. 15.667초, 24fps, 376프레임이다. 생성 원본은 1024×576이고 위 파일은 1920×1080으로 확대 출력했다. 임시 합성 효과음이 포함돼 있다. 정상 재생을 확인했지만 완성 시네마틱으로 승인한 결과는 아니다.</figcaption>
</figure>

## 읽는 순서

- [플레이를 원화와 동작으로 옮긴 과정](#workflow)
- [사용한 모델과 실제 생성 방법](#methods)
- [목표로 삼은 RISE의 특징](#rise)
- [결과물에서 확인한 세 가지 문제](#results)
- [원인 진단과 다음 평가](#diagnosis)
- [재현 자료와 펼쳐 볼 수 있는 프롬프트](#prompts)
- [관찰의 한계와 출처](#limits)

<a class="article-anchor" id="workflow"></a>
## 플레이를 원화와 동작으로 옮긴 과정

### 전투의 사건과 영화적 연출을 나눴다

입력은 5.55초, 166프레임의 실제 플레이 클립이었다. 게임 화면에서는 위치 변화와 판정을 읽을 수 있지만, 인물의 표정이나 활을 당기는 손은 시네마틱에 필요한 크기로 보이지 않는다. 원본의 사건을 유지하면서 카메라와 연기를 다시 설계해야 했다.

계획한 사건은 돌격, 첫 화살의 작은 넉백, 두 번째 화살 준비, 점멸, 눈감기, 후방 사격, 벽 충돌, 승리의 암시다. 화살은 두 번 발사하며 두 번째 화살은 점멸 전에 준비한 것과 같은 화살이어야 한다. 눈감기는 단순한 멋내기보다 **상대의 점멸을 이미 예상했다는 행동 단서**로 사용하려 했다. 이 눈감기와 비사망 기절 엔딩은 별도로 정한 극화 연출이며, 플레이 화면에서 그대로 관측한 사실과 구분한다.

<figure class="kel-figure">
<a href="/assets/images/kel-animation-study/workflow.svg"><img src="/assets/images/kel-animation-study/workflow.svg" width="1120" height="230" loading="lazy" decoding="async" alt="플레이 분석에서 원화 8컷, 로컬 영상 생성 14회, 9구간 편집, 15.67초 결과 검수로 이어지는 제작 흐름"></a>
<figcaption>그림 1. 실제 진행한 공정. 사전 실행 가능성 시험 4회는 본 제작의 14회와 별도로 집계했다. 원화 단계는 내장 이미지 생성 도구를, 영상 단계는 로컬 GPU를 사용했다.</figcaption>
</figure>

### 원화에서는 야간과 캐릭터를 먼저 고정했다

미술 기준은 야간 연구소, 차가운 청색 주변광, 출입구의 절제된 따뜻한 빛이다. 얼굴과 머리카락은 큰 면으로 읽히고, 재질은 지나치게 반짝이지 않는 카툰 3D 표현을 지향했다. 리오의 은발·검정과 금색 의상·활, 리 다이린의 검은 머리·노란 무술복을 구별하는 기준도 정했다.

선택한 원화는 8장이다. KF03은 앞서 확정한 기준 원화를 재사용했고, 나머지 7장을 새로 만들었다. 후방 사격 원화의 조준과 불필요한 선을 고치는 작업이 두 번 더 있었다. 이 원화 확장 단계의 이미지 생성 호출은 9회이며, 최초 스타일 탐색의 전체 횟수는 이 수치에 포함하지 않았다.

<figure class="kel-figure">
<a href="/assets/images/kel-animation-study/keyframe-board.webp"><img src="/assets/images/kel-animation-study/keyframe-board.webp" width="1920" height="552" loading="lazy" decoding="async" alt="돌격부터 첫 넉백, 두 번째 화살 준비, 점멸 도착, 눈감기, 후방 사격, 벽 충돌, 승리까지의 AI 원화 여덟 장"></a>
<figcaption>그림 2. 영상의 입력이 된 AI 원화 8컷. 이야기와 미술의 기준 그림이며 동작의 중간 상태를 모두 정의한 키 포즈 세트는 아니다. 클릭하면 확대해 볼 수 있다.</figcaption>
</figure>

<details class="kel-prompt kel-gallery">
<summary>AI 입력 원화 8장 개별 확대 <span class="kel-show">— 펼치기</span><span class="kel-hide">— 접기</span></summary>
<div class="kel-gallery-grid">
<figure><a href="/assets/images/kel-animation-study/keyframe-01.webp"><img src="/assets/images/kel-animation-study/keyframe-01.webp" width="1280" height="720" loading="lazy" decoding="async" alt="AI 원화 KF01: 돌격"></a><figcaption>KF01 · 돌격 · AI 원화</figcaption></figure>
<figure><a href="/assets/images/kel-animation-study/keyframe-02.webp"><img src="/assets/images/kel-animation-study/keyframe-02.webp" width="1280" height="720" loading="lazy" decoding="async" alt="AI 원화 KF02: 첫 넉백"></a><figcaption>KF02 · 첫 넉백 · AI 원화</figcaption></figure>
<figure><a href="/assets/images/kel-animation-study/keyframe-03.webp"><img src="/assets/images/kel-animation-study/keyframe-03.webp" width="1280" height="720" loading="lazy" decoding="async" alt="AI 원화 KF03: 두 번째 화살 준비"></a><figcaption>KF03 · 두 번째 화살 준비 · AI 원화</figcaption></figure>
<figure><a href="/assets/images/kel-animation-study/keyframe-04.webp"><img src="/assets/images/kel-animation-study/keyframe-04.webp" width="1280" height="720" loading="lazy" decoding="async" alt="AI 원화 KF04: 점멸 후방 도착"></a><figcaption>KF04 · 점멸 후방 도착 · AI 원화</figcaption></figure>
<figure><a href="/assets/images/kel-animation-study/keyframe-05.webp"><img src="/assets/images/kel-animation-study/keyframe-05.webp" width="1280" height="720" loading="lazy" decoding="async" alt="AI 원화 KF05: 눈감기"></a><figcaption>KF05 · 눈감기 · AI 원화</figcaption></figure>
<figure><a href="/assets/images/kel-animation-study/keyframe-06.webp"><img src="/assets/images/kel-animation-study/keyframe-06.webp" width="1280" height="720" loading="lazy" decoding="async" alt="AI 원화 KF06: 후방 사격 자세"></a><figcaption>KF06 · 후방 사격 자세 · AI 원화</figcaption></figure>
<figure><a href="/assets/images/kel-animation-study/keyframe-07.webp"><img src="/assets/images/kel-animation-study/keyframe-07.webp" width="1280" height="720" loading="lazy" decoding="async" alt="AI 원화 KF07: 벽 충돌"></a><figcaption>KF07 · 벽 충돌 · AI 원화</figcaption></figure>
<figure><a href="/assets/images/kel-animation-study/keyframe-08.webp"><img src="/assets/images/kel-animation-study/keyframe-08.webp" width="1280" height="720" loading="lazy" decoding="async" alt="AI 원화 KF08: 승리의 암시"></a><figcaption>KF08 · 승리의 암시 · AI 원화</figcaption></figure>
</div>
</details>

### 동작 생성 뒤 편집으로 연결했다

같은 구도의 움직임은 시작·끝 원화를 조건으로 제공했고, 대기나 눈감기는 같은 이미지를 양 끝에 넣어 자세 유지를 유도했다. 이것은 결과 픽셀이나 손·발의 궤적을 정확히 고정한 것과는 다르다. 다른 카메라 구도는 컷으로 연결했다.

본 제작에서는 기본 8구간을 생성한 뒤 첫 발사를 두 번, 후방 사격을 한 번 보정했다. 다른 모델의 비교 2회와 짧은 도입 1회를 더해 총 14회가 됐다. 최종 편집에는 도입 재사용을 포함한 9구간을 선택했다. 점멸 경계의 청색 전환, 벽 충돌의 작은 화면 흔들림, 임시 효과음은 후반 작업에서 넣었다. **활·시위·화살을 별도 기구로 제어해 합성한 작업은 하지 않았다.**

<a class="article-anchor" id="methods"></a>
## 사용한 모델과 실제 생성 방법

### 원화와 영상에 사용한 도구는 다르다

| 단계 | 사용한 도구·모델 | 역할과 이번 실험의 범위 |
| --- | --- | --- |
| 원화 | 내장 이미지 생성 도구 `imagegen` | 확정 스타일을 참고한 원화 생성과 부분 보정. 기록에 정확한 백엔드 모델 식별자는 남아 있지 않아 특정 모델명으로 추정하지 않았다. |
| 사전 영상 시험 | LTX-Video 2B 0.9.8 distilled FP8 | 작은 모델의 실행 가능성과 형태 유지 확인. 본 제작 결과의 일부로 사용하지 않았다. |
| 최종 편집의 영상 원본 | LTX-Video 13B 0.9.8 distilled FP8 | 컷별 동작 생성. T5 XXL FP8 텍스트 인코더와 체크포인트에 포함된 VAE를 사용했다. |
| 비교 생성 | Wan2.2 TI2V 5B FP16 | 후방 사격 재시도 2회. UMT5 XXL FP8 scaled와 Wan2.2 VAE 사용. 이번 설정의 결과는 채택하지 않았다. |
| 실행·편집 | ComfyUI, FFmpeg, Python | 로컬 추론, 생성 프레임 저장, 구간 선택, 전환·임시 효과음, 영상 출력과 검사. |

여기서 FP8·FP16은 수치 표현의 정밀도, distilled는 적은 추론 단계로 생성하도록 증류된 모델을 뜻한다. VAE는 이미지와 영상 프레임을 압축된 표현으로 바꾸고 다시 복원하는 구성 요소다. LTX의 공개 모델 구성과 버전별 구분은 [공식 모델 카드](https://huggingface.co/Lightricks/LTX-Video/blob/main/README.md)에서 확인할 수 있다.

실행 PC는 RTX 4060 Ti 8GB, 시스템 메모리 약 32GB였다. ComfyUI의 메모리 오프로딩을 활용했으므로 13B 모델 전체가 8GB GPU 메모리에 동시에 들어갔다는 뜻은 아니다. 실험 환경은 Python 3.13.7, PyTorch 2.11.0+cu128, ComfyUI 0.43.0이며, [고정한 ComfyUI 소스](https://github.com/Comfy-Org/ComfyUI/tree/b5a432157de6b8884f81104cd02926adf4d597e4)와 가중치의 리비전·해시는 재현 자료에 기록했다.

영상 생성에는 외부 유료 생성 API를 사용하지 않았다. 다만 원화는 이미 내장 이미지 생성 도구로 만든 입력이었다. 원화 탐색의 과금이나 기존 구독, PC 전력·장비 비용까지 측정한 실험이 아니므로 **전체 제작 공정이 완전히 무료라고 입증한 결과로 소개하지 않는다.** 확인한 것은 준비된 원화에서 로컬 영상 생성과 편집을 실행할 수 있었다는 범위다.

### LTX는 단일 패스로 실행했다

최종 채택한 생성은 1024×576, 24fps, Euler 샘플러, CFG 1.0의 단일 패스다. 이미지 조건은 `LTXVAddGuide`, 샘플링 뒤 추가 안내 프레임 제거는 `LTXVCropGuides`, 복원은 `VAEDecodeTiled`를 사용했다. 여러 안내 이미지를 쓰는 방식 자체는 [ComfyUI의 LTX 예제](https://comfyanonymous.github.io/ComfyUI_examples/ltxv/)를 참고했다.

<details class="kel-prompt">
<summary>최종 LTX 구성과 노이즈 스케줄 <span class="kel-show">— 펼치기</span><span class="kel-hide">— 접기</span></summary>
<pre tabindex="0"><code>Checkpoint: ltxv-13b-0.9.8-distilled-fp8.safetensors
Text encoder: t5xxl_fp8_e4m3fn.safetensors
Canvas: 1024 × 576
Frame rate: 24
Guide strength: 1.0
Sampler: Euler
CFG: 1.0
Manual sigmas: 1, 0.9937, 0.9875, 0.9812, 0.975, 0.9094, 0.725, 0.4219, 0
Intervals / sampling steps: 8
VAE tiled decode: tile 256, overlap 64, temporal size 32, temporal overlap 8

Load model + encode text
→ EmptyLTXVLatentVideo
→ image guides at the requested frame positions
→ LTXVConditioning (24 fps)
→ SamplerCustomAdvanced
→ LTXVCropGuides
→ VAEDecodeTiled
→ SaveImage
→ select frame ranges and encode the movie</code></pre>
</details>

이 설정을 공식 권장 공정 전체의 재현으로 보아서는 안 된다. [공식 13B distilled FP8 설정](https://github.com/Lightricks/LTX-Video/blob/main/configs/ltxv-13b-0.9.8-distilled-fp8.yaml)은 공간 업스케일러를 포함한 다중 스케일 구성이다. 이번에는 가볍게 시험할 목적으로 한 단계의 수동 스케줄을 사용했으며, 그 선택의 품질 손실을 별도 통제 실험으로 측정하지 않았다.

CFG는 조건부 예측과 부정 조건 예측을 조합하는 강도다. 이번 LTX의 기본 샘플러 경로는 CFG가 1이면 조건부 예측을 사용하는 최적화를 적용한다. 따라서 그래프에 적힌 부정 프롬프트 목록을 손 변형이나 추가 화살을 막는 강제 규칙으로 해석할 수 없다. 이 부분은 [실제로 사용한 샘플러 코드](https://github.com/Comfy-Org/ComfyUI/blob/b5a432157de6b8884f81104cd02926adf4d597e4/comfy/samplers.py#L610)와 함께 읽어야 한다.

### 비교 시도의 실패를 모델 전체의 결론으로 확대하지 않았다

Wan2.2 TI2V 5B는 첫 이미지에서 출발하는 방식으로 512×288, 49프레임, 20단계, CFG 5, UniPC·simple, shift 8을 사용했다. [ComfyUI 공식 안내](https://docs.comfy.org/tutorials/video/wan/wan2_2)는 5B 모델의 네이티브 오프로딩과 8GB 환경을 설명한다. 이번 경로는 첫 이미지 입력이며 14B의 시작·끝 프레임 경로와 구분한다.

두 시도 모두 외형과 화면 품질이 불안정해 제외했다. 두 번째에는 타일 복원을 기본 복원으로 바꾸면서 부정 프롬프트도 바뀌었다. 따라서 **복원 노드 하나 때문에 손상이 생겼다고 확정할 수 없고, Wan이 LTX보다 나쁘다는 모델 비교도 성립하지 않는다.** 해상도·복원·조건을 고정한 추가 진단이 필요한 미채택 사례로 남겼다.

<a class="article-anchor" id="rise"></a>
## 목표로 삼은 RISE의 특징

기준은 [RISE 공식 영상의 00:42–01:08](https://www.youtube.com/watch?v=fB8TyLTD7EE&t=42s)이다. 이 구간을 참고한 이유는 그림체뿐 아니라, 표정과 공간을 바꾸어 보여 주면서 전투를 읽히게 하는 구성에 있었다.

<figure class="kel-figure">
<a href="/assets/images/kel-animation-study/rise-reference.webp"><img src="/assets/images/kel-animation-study/rise-reference.webp" width="1280" height="668" loading="lazy" decoding="async" alt="RISE의 집중한 얼굴 클로즈업, 전투 공간을 내려보는 구도, 표정이 드러난 돌진, 강한 빛과 실루엣의 네 표본"></a>
<figcaption>그림 3. League of Legends 공식 RISE의 비평·비교용 브라우저 표본. 원작 장면이며 이 프로젝트가 생성한 이미지가 아니다. 그림 안에 실제 캡처 시각을 표기했다. 원본과 생성본의 캡처 해상도는 달라 픽셀 선명도의 동등 비교에는 사용하지 않았다.</figcaption>
</figure>

46.8초 부근에서는 얼굴·눈·무기와 빛이 한 근접 구도에 묶인다. 50.7초 표본은 전투 공간을 위에서 보여 준다. 62.6초의 표정과 66.9–67.8초의 강한 빛·실루엣은 행동의 강조점을 바꾼다. 이 표본에서 눈여겨본 것은 장면마다 **무엇을 읽어야 하는지가 달라진다**는 점이다.

미술에서도 큰 명암 면과 무기·인물의 실루엣을 함께 보았다. 이를 특정 셰이더나 제작 내부 구조에 대한 확인으로 해석하지는 않는다. 이번 영상은 확정한 야간 연구소를 유지해야 하므로 참조의 황금빛 들판을 옮기는 것이 목표도 아니었다.

평가에는 세 기준을 적용했다. 첫째, 카메라가 바뀌어도 인물과 무기의 관계가 읽혀야 한다. 둘째, 공격과 반응이 같은 사건으로 이어져야 한다. 셋째, 표정과 자세가 인물의 선택을 설명해야 한다. 컷 전환이나 의도적인 과장·모션 블러 자체를 결함으로 보지는 않았다. 이런 표현을 허용하면서도 현재 결과가 이 기준을 만족하는지를 살폈다.

<a class="article-anchor" id="results"></a>
## 결과물에서 확인한 세 가지 문제

### 첫 화살: 빨리 움직이지만 무엇이 움직이는지가 흔들린다

첫 발사 구간은 0.667–1.333초다. 상대의 얼굴과 팔, 몸의 형태가 순간적으로 흔들리고 리오의 손·활·시위 관계를 안정적으로 추적하기 어렵다. 금색 선은 화살의 짧은 비행보다 길게 이어진 연결선처럼 읽히는 순간이 있다. 넉백의 크기뿐 아니라 어디에 체중을 싣고 밀려나는지도 충분히 설득하지 못한다.

<figure class="kel-figure">
<a href="/assets/images/kel-animation-study/first-release.webp"><img src="/assets/images/kel-animation-study/first-release.webp" width="1280" height="1182" loading="lazy" decoding="async" alt="첫 발사 0.667초에서 1.292초까지 여섯 프레임에 나타난 얼굴·팔 형태 변화와 길게 유지되는 금색 궤적"></a>
<figcaption>그림 4. 실제 최종 영상에서 추출한 첫 발사 표본. 시간과 0부터 시작하는 프레임 번호를 표시했다. 전체 16프레임도 검사했다. 한 장의 흐림이 아니라 연속된 형태와 무기 접촉 관계를 판정 대상으로 삼았다.</figcaption>
</figure>

정상적인 애니메이션에도 빠른 동작의 스미어와 블러가 있다. 그래서 정지 화면이 흐리다는 사실만으로 실패라고 판단하지 않았다. 이번에 문제 삼은 것은 같은 몸과 같은 무기의 구조가 유지되는지 확신하기 어렵다는 점이다. 짧게 편집해 노출을 줄여도 이 문제는 해결되지 않는다.

### 배면 사격: 회전의 결과 포즈가 회전을 대신한다

8.417–9.000초에는 눈감기 클로즈업이 들어간다. 다음 컷의 첫 프레임에서 리오는 이미 뒤를 조준하고 있다. 이어지는 사격은 9.000–9.583초다. 발과 골반의 방향 전환, 그 회전 중에 같은 화살의 장력을 유지하는 과정은 빠져 있다.

<figure class="kel-figure">
<a href="/assets/images/kel-animation-study/signature-sequence.webp"><img src="/assets/images/kel-animation-study/signature-sequence.webp" width="1728" height="1074" loading="lazy" decoding="async" alt="눈감기 다음에 이미 돌아선 자세가 나타나고, 상대가 움직인 뒤 발광선과 벽 충돌로 이어지는 8.417초부터 10.083초까지의 표본"></a>
<figcaption>그림 5. 핵심 시그니처 구간. 눈감기에서 조준 자세로 넘어가는 컷이 방향 전환을 생략한다. 뒤를 조준한 원화를 보여 준 것과 회전하며 사격하는 행동을 완성한 것을 구분해야 한다.</figcaption>
</figure>

영화적 생략 자체가 잘못은 아니다. 다만 이번 기획에서 흥미로운 부분은 상대의 점멸에도 당황하지 않고 준비한 화살을 유지한 채 대응하는 선택이었다. 그 행동의 대부분을 생략하면 눈감기가 전략적 확신인지 단순한 분위기 연출인지 판단할 근거도 약해진다. ‘이미 예측했다’는 문장을 프롬프트에 넣었어도, 그 이유가 화면에 만들어졌다고 볼 수는 없다.

원화에서 지운 문제도 동작 중 다시 생겼다. 후방 사격의 KF06-v3는 활 앞에서 끝나는 화살을 남기고 불필요한 조준선을 제거한 입력이었다. 그러나 영상에는 긴 발광선이 다시 나타났다.

<figure class="kel-figure">
<a href="/assets/images/kel-animation-study/reference-to-motion.webp"><img src="/assets/images/kel-animation-study/reference-to-motion.webp" width="1440" height="447" loading="lazy" decoding="async" alt="왼쪽의 보정된 후방 사격 원화에서는 화살이 활 앞에서 끝나지만 오른쪽 9.500초 생성 프레임에서는 밝은 선이 상대까지 길게 이어진다"></a>
<figcaption>그림 6. 같은 장면의 입력 원화와 생성 프레임. 정지 이미지의 구조를 수정한 일이 이후 영상에서 그 구조의 유지를 보장하지는 않았다. 두 그림은 수정 전후의 동등한 영상 A/B가 아니라 입력과 출력의 비교다.</figcaption>
</figure>

### 벽 충돌은 읽히지만 앞선 사격을 검증해 주지는 않는다

9.583–12.292초의 벽 접촉, 먼지, 몸이 내려가는 후속 동작은 상대적으로 기능한다. 이후 활을 내린 리오와 벽에 앉은 상대의 구도도 승패를 암시한다. 그러나 그 직전에 어느 순간 시위가 풀리고 화살이 맞았는지는 명료하지 않다. 충돌 효과가 있다는 이유로 발사부터 피격까지의 연결을 통과시킬 수는 없다.

<figure class="kel-figure">
<a href="/assets/images/kel-animation-study/aftermath.webp"><img src="/assets/images/kel-animation-study/aftermath.webp" width="1280" height="1182" loading="lazy" decoding="async" alt="벽에 부딪힌 리 다이린이 아래로 내려가고 마지막에는 활을 낮춘 리오와 벽에 앉은 상대가 보이는 후속 동작"></a>
<figcaption>그림 7. 벽 충돌과 후일담. 패배의 구도는 전달되지만, 살아서 기절했다는 세부 연기와 앞선 궁술 동작까지 완성됐다고 판정하지 않았다.</figcaption>
</figure>

## 어느 부분이 목표에 미달했는가

| 평가 항목 | 이번 결과의 판정과 근거 |
| --- | --- |
| 야간 미술과 원작 인상 | 부분 충족. 연구소, 주요 색과 복장, 청색 주변광과 출입구 빛은 유지된다. 움직일 때 정돈된 얼굴·머리카락 면은 약해진다. |
| 인체·무기 일관성 | 미달. 발사 순간에 손·시위·활과 상대의 형태가 불안정하다. |
| 체중 이동과 접지 | 미달. 돌격·작은 넉백·방향 전환에서 몸이 이동하는 이유가 충분히 읽히지 않는다. |
| 배면 궁술 | 미달. 결과 포즈는 있으나 핵심 회전과 그 과정의 활 제어를 생략했다. |
| 점멸 예측의 연기 | 부분 충족. 기다림과 눈감기는 있지만 미리 준비했다는 행동 단서와 관객 해석 검증이 부족하다. |
| 타격의 인과 | 미달. 화살 궤적과 발사·피격 반응의 관계가 불명료하다. |
| 공간·편집·마무리 | 부분 충족. 사건 순서와 승패는 전달되지만 중요한 행동의 생략을 편집이 대신한다. |

두 발사 컷의 합계는 1.25초다. 자세 유지·클로즈업·후일담 중심으로 설계한 다섯 구간은 9.00초, 전체의 57.4%다. 이 비율은 편집 의도의 분류이며 실제 움직임량이나 ‘정지 영상 비율’을 측정한 값은 아니다.

긴 대기나 짧은 발사 자체는 결함이 아니다. 문제는 짧은 시간 안에 필요한 구조가 읽히지 않고, 기다림에도 인물의 선택을 드러내는 변화가 충분하지 않다는 데 있다. 더 높은 프레임 수나 1080p 출력만으로 해결될 성질의 문제도 아니다.

<a class="article-anchor" id="diagnosis"></a>
## 원인 진단과 다음 평가

### 관찰한 실패와 추정한 원인을 구분한다

직접 관찰한 것은 형태 불안정, 생략된 회전, 발광선과 타격의 불명료함이다. 이에 대한 첫 가설은 **원화 사이의 동작 정보를 모델에 너무 많이 맡겼다**는 것이다. 여덟 장은 장소와 이야기의 방향을 제공했지만 회전 중의 지지 발, 골반, 양손, 시위와 화살의 관계를 규정하지 않았다.

입력 원화의 모호함도 원인 후보에 포함해야 한다. 첫 넉백의 KF02에는 이미 길게 그린 금색 궤적이 있다. 그 선이 화살·시위·잔상 중 어느 역할인지 시간에 따라 명시하지 않았으므로, 첫 발광선 문제를 모델이 새로 만든 오류로만 볼 수 없다. 반대로 KF06-v3에서 제거한 선이 영상에서 다시 늘어난 사례는 정지 원화의 보정만으로 충분하지 않았음을 보여 준다.

두 번째 가설은 동작을 확인하는 순서가 잘못됐다는 것이다. 생성한 클립에서 덜 깨진 부분을 선택하고 컷·효과를 넣어 연결본을 먼저 만들었다. 그 결과 회전을 완성하기보다 회전을 피하는 편집이 됐다. 이는 검토 가능한 파일을 만드는 방법이었지만 핵심 행동의 품질을 승인하는 방법은 아니었다.

세 번째는 실험 조건의 한계다. 공식 다중 스케일 공정과 이번 단일 패스의 차이, CFG와 조건 이미지, 해상도와 복원 방식의 효과를 분리하지 않았다. 따라서 결과를 곧바로 모델의 성능 상한으로 해석할 수 없다. 전문 원화가의 부재 하나로 설명하거나 원화 장수만 늘리면 해결된다고 판단할 근거도 부족하다.

### 다음에는 한 동작을 통과시킨 뒤 길이를 늘린다

다음 표는 이미 달성한 개선 결과가 아니라 **검증할 후속 실험과 평가 조건**이다. 원화·모델·시드·해상도를 고정하고 한 변수를 바꾸는 비교가 우선이다.

| 후속 실험 | 분리해서 바꿀 조건 | 평가할 결과 |
| --- | --- | --- |
| 안내 이미지의 효과 | 같은 모델·시드·길이에서 시작 이미지만 사용한 경우와 시작·끝 조건을 준 경우 | 끝 포즈 도달과 중간의 손·발·얼굴 일관성을 따로 판정한다. |
| 회전의 동작 가이드 | 같은 설정에서 중간 키 포즈나 단순한 몸동작 가이드만 추가 | 지지 발에서 골반·상체·양손으로 이어지는 방향 전환을 추적할 수 있는가. |
| 활과 화살의 별도 제어 | 인물 연기 조건을 유지하고 무기·투사체를 통제하는 공정 추가 | 준비한 두 번째 화살이 한 번 발사되고, 시위 풀림·비행·명중이 연결되는가. |
| 생성·복원의 설정 | LTX의 패스 구성, 또는 Wan의 복원 방식 중 한 요소만 변경 | 큰 명암·형태·접촉 관계가 좋아지는지 본다. 해상도만으로 합격시키지 않는다. |
| 예측의 연기 | 사전 준비 단서와 눈감기·회전의 연출만 변경 | 줄거리 설명 없는 첫 시청에서도 리오가 상대를 예상했다는 근거를 말할 수 있는가. |

평가 순서도 바꿔야 한다. 먼저 준비·회전·발사·명중의 기준 포즈를 확인한다. 그 다음 중간 동작에서 인체와 무기가 유지되는지 검사한다. 그 조건을 통과한 구간에 카메라, 머리카락과 옷의 후속 움직임, 효과·음향을 더한다. 표정·광량·편집으로 구조 오류를 가리는 접근은 합격 기준에서 제외한다.

컷은 사용할 수 있다. 다만 컷 사이에서도 같은 두 번째 화살과 양손의 역할, 공격 방향을 추적할 정보가 남아 있어야 한다. 의도적인 과장과 모션 블러도 허용하되, 물체가 추가되거나 분리·소멸하는 비의도적 변화와 구별해 본다. 관객 평가에서는 ‘멋있다’는 인상과 ‘왜 리오가 눈을 감았는지 이해했다’는 설명을 따로 수집하는 편이 맞다. 이번에는 그런 독립 관객 평가를 수행하지 않았다.

<a class="article-anchor" id="prompts"></a>
## 재현 자료와 사용한 프롬프트

아래에는 실제 기록의 원문을 실었다. 최종 편집에 사용한 9개 구간, 미채택한 본 제작 시도 5개, 원화 확장·보정 지시문 9개, 사전 시험 4개를 나눴다. 각 제목을 누르면 펼쳐지고 다시 누르면 접힌다. 원문의 ‘예측했다’, ‘같은 화살’, ‘정확한 손’이라는 지시는 제작 의도이며 결과가 그 조건을 충족했다는 증거는 아니다.

<div class="kel-downloads">
<p><strong><a href="/assets/files/kel-animation-study/reproduction.zip">입력 원화·API 그래프·프롬프트 묶음 내려받기</a></strong> · 약 14.2 MiB</p>
<p><a href="/assets/files/kel-animation-study/experiment.json">환경·모델 리비전과 해시</a> · <a href="/assets/files/kel-animation-study/runs.json">전체 실행 파라미터·프롬프트</a> · <a href="/assets/files/kel-animation-study/edit-selection.json">최종 프레임 선택표</a></p>
</div>

묶음의 PNG 8장은 메타데이터를 제거하면서 디코딩한 RGB 픽셀을 보존했다. 가중치는 포함하지 않았다. ComfyUI의 입력 폴더에 같은 이름으로 넣고, 필요한 모델을 준비한 뒤 JSON을 로컬 `/prompt` API에 제출하는 구성이다. 그래프는 API 형식이며 노드의 화면 위치를 담은 UI 레이아웃 파일과 다르다. 최종 편집의 `start`는 0부터 시작하는 프레임, `count`는 사용할 프레임 수다.

이 자료는 선택된 원화에서 영상 실험을 재시도하기 위한 것이다. 최초 원화 생성의 정확한 백엔드 모델·시드·원참조 이미지 전체는 제공하지 못하므로 동일한 원화를 다시 만드는 절차가 완전히 재현된다는 뜻은 아니다. 기기·라이브러리 차이에 따른 영상의 픽셀 동일성도 보장하지 않는다.

{% include kel-animation-prompts.html %}

<a class="article-anchor" id="limits"></a>
## 관찰의 한계와 남은 과제

비교에는 RISE의 42.817 / 46.777 / 50.737 / 54.697 / 58.657 / 62.617 / 66.892 / 67.814초 표본을 사용했다. 생성본은 첫 발사 16프레임과 두 번째 발사 14프레임 전체, 그 밖의 사건·전환 표본을 포함해 중복 없이 48프레임을 재검토했다. 모든 376프레임을 하나씩 시각 검사한 것은 아니다. 전체 디코딩 검사는 파일의 정상 재생을 확인하는 별도 검사다.

이 평가는 제작 과정과 결과를 함께 본 자체평가다. 같은 각도·같은 인물·같은 길이로 통제한 RISE와의 A/B도 아니며, 원작의 제작 내부나 모든 연속 프레임을 분석한 연구도 아니다. 음향의 전체 청취 비교, 독립 전문가·관객 테스트, 여러 게임 장면으로의 일반화는 수행하지 않았다. 따라서 ‘RISE의 몇 %’ 같은 숫자는 산정하지 않는다.

이번 실험에서는 무료 로컬 영상 생성의 실행 가능성과 목표 품질의 달성을 더 엄격하게 구분할 필요가 있었다. 핵심 회전을 생략하고 발사 오류가 남은 구간을 선택했으므로 **8컷의 연결 완료를 자연스러운 시그니처 동작의 완성으로 소개할 수 없다.** 다음 제작의 출발점은 같은 화살을 유지하며 돌아서 발사하는 한 행동을 검증하는 데 있다.

### 자료와 출처

이 글은 이터널리턴의 캐릭터·공간을 소재로 한 비공식 제작 연구다. 기준 원화와 결과 영상은 AI 생성물이며, RISE 그림은 원작 비교 표본으로 구분했다. 원본 게임 파일이나 모델 가중치를 추출·배포하는 글은 아니다. 원본 플레이 전체와 원작 캐릭터 자료, 비공개 작업 로그는 재현 묶음에 포함하지 않았다.

- [RISE 공식 영상 · League of Legends](https://www.youtube.com/watch?v=fB8TyLTD7EE&t=42s): 비교 범위 00:42–01:08.
- [이터널리턴 공식 사이트](https://playeternalreturn.com/): 캐릭터·세계관의 원작.
- [LTX-Video 공식 모델 카드](https://huggingface.co/Lightricks/LTX-Video/blob/main/README.md): 사용한 모델 계열과 버전 구분.
- [LTX 13B distilled FP8 공식 설정](https://github.com/Lightricks/LTX-Video/blob/main/configs/ltxv-13b-0.9.8-distilled-fp8.yaml): 이번 단일 패스와 구별해야 하는 다중 스케일 구성.
- [ComfyUI LTX 예제](https://comfyanonymous.github.io/ComfyUI_examples/ltxv/): 이미지 안내 조건의 참고.
- [ComfyUI Wan2.2 안내](https://docs.comfy.org/tutorials/video/wan/wan2_2): 5B 경로와 14B 경로의 구분.
- [실험 구성·해시·평가 범위 JSON](/assets/files/kel-animation-study/experiment.json): 이 글의 생성·편집·표본 기록.
