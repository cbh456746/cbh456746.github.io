---
layout: post
title: "GitHub Desktop에서 로컬 저장소 수정하기"
subtitle: "GitHub Desktop으로 로컬 변경을 확인하고 푸시하는 기본 절차"
date: 2025-03-17 12:00:00
author: "BH CHOI"
catalog: true
tags:
  - Notes
  - Git
  - GitHub-Desktop
context:
  reviewed_on: '2026-10-30'
  summary: GitHub Desktop 복제·수정·로컬 Jekyll 미리보기·커밋·푸시의 짧은 학습 노트다.
  findings:
  - 로컬 미리보기와 원격 공개 페이지 확인을 순서로 정리한다.
  limits:
  - 사용자명·주소는 예시다. 현재 블로그 운영에는 최신 AGENTS와 운영 인수인계서를 적용한다.
  followups: []
  keywords:
  - GitHub Desktop
  - Git
  - Jekyll
  - 커밋
  - 푸시
  related: []
---

# 로컬 github Desktop에서 레포지토리 수정하기

## 1. 깃허브 데스크톱에 레포지토리 클론 
- File -> Clone repository
수정사항 수정 (VS CODE 등 이용.)

## 2. 로컬 환경에서 미리보기 
(터미널) 
- Jekyll이 설치되어 있는지 확인
gem install bundler jekyll 

- 레포지토리 폴더로 이동 후 로컬 서버 실행
cd your-username.github.io
bundle install  # 의존성 설치
bundle exec jekyll serve

- 브라우저에서 미리보기 
http://127.0.0.1:4000/ 등에 접속하여 확인

## 3. 문제가 없으면 github에 푸시

- GitHub Desktop으로 이동
- 변경된 파일 확인 → Commit 메시지 작성 → Commit to main 클릭
- Push origin 버튼 클릭하여 GitHub에 업로드
- https://your-username.github.io/ 방문하여 최종 확인
