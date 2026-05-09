# cmon Design Guide

## 1) 기본 원칙
- Next.js App Router + TypeScript + Tailwind CSS 기준
- 모바일 우선 구현
- 임의 값 남발 금지, 아래 토큰/스케일 우선 사용

---

## 2) Color Tokens

| Token | Hex | 용도 |
|---|---:|---|
| Primary | `#534AB7` | 주요 액션, 활성 상태 |
| Primary Light | `#7F77DD` | 보조 강조, 활성 배경 |
| Primary Background | `#EEEDFE` | 앱 기본 배경, 서브 영역 |
| Success | `#1D9E75` | 성공/긍정 상태 |
| Success Background | `#DCFCE7` | 성공 상태 배경 |
| Warning | `#EF9F27` | 주의/마감 임박 |
| Warning Background | `#FFEDD4` | 주의 상태 배경 |
| Alert | `#F2A6A4` | 경고 강조 상태 |
| Urgent | `#E74340` | 임박/긴급 상태 |
| Surface | `#FFFFFF` | 카드/패널 배경 |
| Border | `rgba(0,0,0,0.1)` | 기본 경계선 |
| Text Primary | `#1e2939` | 주요 텍스트 |
| Text Secondary | `#6a7282` | 보조 텍스트 |

---

## 3) Typography

### Font Weight
- Regular: `400`
- Medium: `500`
- SemiBold: `600`
- Bold: `700`
- Black: `900`

### Type Scale

| Name | Size | Line Height | Weight |
|---|---:|---:|---|
| Caption | `10px` | auto | Regular |
| Detail | `12px` | auto | Regular |
| Body2 | `14px` | `16px` | Regular |
| Body2 Strong | `14px` | `16px` | SemiBold |
| Body1 | `16px` | `20px` | Regular |
| Body1 Medium | `16px` | `20px` | Medium |
| Body1 Strong | `16px` | `20px` | SemiBold |
| SubHead | `18px` | `20px` | Regular |
| SubHead Strong | `18px` | `20px` | SemiBold |
| Head | `20px` | `24px` | Medium |
| Head Strong | `20px` | `24px` | SemiBold |
| Title2 | `24px` | `28px` | Bold |
| Title1 | `36px` | `44px` | Bold |

---

## 4) Border Radius

| Token | Value |
|---|---:|
| radius-xs | `4px` |
| radius-sm | `8px` |
| radius-md | `12px` |
| radius-base | `14px` |
| radius-lg | `16px` |
| radius-xl | `24px` |
| radius-full | `9999px` |

---

## 5) Button Guidelines

- 주요 버튼 배경은 `Primary`
- 버튼 텍스트는 흰색 사용
- 기본 radius는 `14px`
- font-weight는 `SemiBold`

---

## 6) Spacing Guidelines

- 화면 기본 좌우 여백: `16px`
- 카드 내부 패딩: `16px`
- 요소 간 간격: `8px`, `12px`, `16px` 우선 사용

---

## 7) 적용 규칙

- 색상은 Color Tokens 내에서만 선택
- 폰트 크기/줄간격/굵기는 Typography 표 기준
- radius는 Border Radius 토큰 기준
- 새 컴포넌트도 동일 규칙 재사용