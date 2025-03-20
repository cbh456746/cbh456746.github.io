---
layout:     post
title:      "Confusion Matrix"
subtitle:   "Summary for concept of confusion matrix in case of binary classification"
date:       2025-03-20 12:00:00
author:     "BH CHOI"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - Data Science
---

# 혼동 행렬 (Confusion Matrix)

- **정의**: 분류 모델의 성능을 평가하기 위한 도구로, 실제 값과 모델의 예측 값을 비교하여 표로 나타냅니다.

## 1. 주요 개념 및 용어

혼동 행렬은 <u>이진 분류</u>에서 주로 2x2 행렬로 표현되며, 각 요소는 다음과 같은 의미를 가집니다:

- **TP (True Positive)**: 실제로 긍정(Positive)이고, 모델이 긍정으로 맞춘 경우
- **TN (True Negative)**: 실제로 부정(Negative)이고, 모델이 부정으로 맞춘 경우
- **FP (False Positive)**: 실제로 부정인데, 모델이 긍정으로 잘못 예측한 경우
- **FN (False Negative)**: 실제로 긍정인데, 모델이 부정으로 잘못 예측한 경우

### 혼동 행렬 표

| 예측 ↓ / 실제 → | Positive      | Negative      |
|-----------------|----------------|----------------|
| Positive        | TP             | FP             |
| Negative        | FN             | TN             |

---

## 2. 주요 지표

### 1) Accuracy (정확도)
- **정의**: 모델이 올바르게 예측한 비율
- **공식**:  
$$Accuracy = \frac{TP + TN}{TP + TN + FP + FN}$$

### 2) Precision (정밀도)
- **정의**: 긍정으로 예측한 것 중 실제로 긍정인 비율
- **공식**:  
$$Precision = \frac{TP}{TP + FP}$$

### 3) Recall (재현율)
- **정의**: 실제 긍정 중 모델이 긍정으로 맞춘 비율
- **공식**:  
$$Recall = \frac{TP}{TP + FN}$$

### 4) F1 Score (F1 스코어)
- **정의**: 정밀도와 재현율의 조화 평균으로, 두 지표의 균형을 평가
- **공식**:  
$$F1 = 2 \times \frac{Precision \cdot Recall}{Precision + Recall}$$

---

## 3. 예시
스팸 이메일 분류 모델을 가정합니다:  
- 총 100개 이메일 중 20개가 스팸(Positive), 80개가 일반 메일(Negative)
- 모델 예측 결과:  
  - TP = 15 (스팸을 스팸으로 맞춤)  
  - FN = 5 (스팸인데 일반 메일로 예측)  
  - FP = 10 (일반 메일인데 스팸으로 예측)  
  - TN = 70 (일반 메일을 일반 메일로 맞춤)

### 계산
1. **Accuracy**:  
$$\frac{TP + TN}{TP + TN + FP + FN} = \frac{15 + 70}{15 + 70 + 10 + 5} = \frac{85}{100} = 0.85 (85\%)$$

2. **Precision**:  
$$\frac{TP}{TP + FP} = \frac{15}{15 + 10} = \frac{15}{25} = 0.6 (60\%)$$

3. **Recall**:  
$$\frac{TP}{TP + FN} = \frac{15}{15 + 5} = \frac{15}{20} = 0.75 (75\%)$$

4. **F1 Score**:  
$$2 \cdot \frac{Precision \cdot Recall}{Precision + Recall} = 2 \cdot \frac{0.6 \cdot 0.75}{0.6 + 0.75} = 2 \cdot \frac{0.45}{1.35} = 0.667 (약 66.7\%)$$

## 4. 연습 문제
다음 혼동 행렬을 보고 각 지표를 계산하세요:

| 예측 ↓ / 실제 → | Positive | Negative |
|-----------------|----------|----------|
| Positive        | 8        | 3        |
| Negative        | 2        | 17       |

### 질문
1. Accuracy를 계산하세요.
2. Precision을 계산하세요.
3. Recall을 계산하세요.
4. F1 Score를 계산하세요.

#### 힌트
- TP = 8, FP = 3, FN = 2, TN = 17
- 결과는 소수점 둘째 자리까지 반올림하세요.
