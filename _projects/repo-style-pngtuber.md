---
title: "뚜껑형 PNGTuber 에셋 제작"
subtitle: "좌우 개폐·눈 깜빡임·마이크 반응을 갖춘 두 캐릭터와 로컬 OBS 오버레이"
date: 2026-09-28 14:27:00 +0900
tags:
  - Projects
  - Play
  - Game
repository_url: "https://github.com/cbh456746/repo-style-pngtuber"
demo_url: ""
---

게임 R.E.P.O.의 뚜껑처럼 열리는 움직임에서 아이디어를 얻어, 방송 장면에 올릴 수 있는 **독자적인 PNGTuber 시제품**을 만들었다. 머리가 열리면 몸통의 어두운 안쪽이 입처럼 보이고, 눈은 말하기와 별도로 깜빡인다. 실제 게임 모델이나 참고 판매 에셋의 이미지 파일은 사용하지 않았다.

## 지금 사용할 수 있는 것

| 캐릭터 | 디자인 | 제공 파일 |
| --- | --- | --- |
| **별씨 등불** | 육각 등불 몸통과 별 장식 | 편집 가능한 SVG, 좌우 개폐 12개 투명 PNG |
| **네온 선물봇** | 흰 원통형 몸통, 검은 바이저, 청록색 표시등 | 별도 SVG, 좌우 개폐 12개 투명 PNG |

한 방향마다 **닫힘·중간·열림 3단계 × 눈 뜸·감음 2상태**를 만든다. 왼쪽과 오른쪽을 합쳐 캐릭터당 12장이며 모두 1024×1024 투명 캔버스에 정렬돼 있다. [별씨 등불 비교 시트](https://github.com/cbh456746/repo-style-pngtuber/blob/main/qa/twelve-state-contact-sheet.png)와 [네온 선물봇 비교 시트](https://github.com/cbh456746/repo-style-pngtuber/blob/main/assets/variants/cyan-gift-robot/contact-sheet.png)에서 전체 상태를 볼 수 있다.

## 말소리와 방송 화면 연결

Windows의 `PNGTuber Launcher.exe`를 더블클릭하면 로컬 서버와 미리보기가 열린다. 실행 창에서 캐릭터, 입이 열리는 방향, 말하기 문턱값을 선택하고 **OBS 주소 복사**로 투명 브라우저 소스를 추가할 수 있다. Node.js와 FFmpeg는 별도 설치가 필요하다.

마이크의 디지털 음량인 **dBFS**를 주변 소음과 비교해 입을 닫힘·중간·열림으로 전환한다. 기본 문턱값은 주변 소음보다 **10 dB** 높음이며 조정할 수 있다. 로컬 음량 조회 간격은 약 25 ms이고, 입력 샘플이 300 ms 넘게 갱신되지 않으면 이전 음량을 버린다. 오디오 원음을 저장하거나 외부로 전송하지 않는다. OBS에서 실제 목소리도 보내려면 마이크 오디오 소스를 별도로 설정해야 한다.

## 내려받기와 사용 안내

- [프로젝트 저장소와 Windows 시작 안내](https://github.com/cbh456746/repo-style-pngtuber)
- [OBS 설정과 문제 해결](https://github.com/cbh456746/repo-style-pngtuber/blob/main/docs/obs-guide.md)
- [후속 캐릭터의 로봇 재설계 기준](https://github.com/cbh456746/repo-style-pngtuber/blob/main/docs/design-workflow.md)

현재 자동 검사는 두 캐릭터의 투명 여백·몸통 정렬·눈 상태·좌우 개폐 차이와 음성 상태 로직을 확인했다. **실제 마이크 장치별 감도와 OBS 녹화 품질은 아직 검증 중**이다. 임의의 캐릭터 참조 이미지 한 장에서 12상태를 자동 생성하는 AI 변환 기능도 아직 구현되지 않았다.

참고 원본 이미지·영상, 음성 녹음과 로컬 작업 기록은 공개 저장소에 넣지 않았다. 이 프로젝트는 비공식 창작물이며 원작 또는 참고 에셋 제작자와 제휴하지 않는다. 코드와 에셋의 재배포 라이선스는 아직 결정하지 않았다.

## 얼굴 추적 방송 예제와 비교

[브라우저/VTube Studio 아바타 예제](/projects/browser-vtuber-avatar-project/)에서 얼굴 방향과 눈·입 상태에 따라 이미지를 전환하는 방송 화면을 볼 수 있다. 뚜껑형 PNGTuber는 마이크 음량 기반 12상태이고, 해당 예제는 얼굴 추적 브라우저 아바타로 구성과 입력이 다르다. 두 방식의 설정 절차와 관찰 가능한 범위를 예제 글에 정리했다.
