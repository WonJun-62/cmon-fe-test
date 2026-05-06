# cmon Design Guide

## 1. Color Palette

| Token | Hex | Usage |

|---|---:|---|

| Primary | `#534AB7` | 선택된 네비게이션 표시 색 |

| Primary Lt | `#7F77DD` | 홈 화면 상단 색 |

| Primary Bg | `#EEEDFE` | 홈 화면 배경 색 |

| Success | `#1D9E75` | D-7 이상 |

| Success Bg | `#DCFCE7` | 바로 지원 가능한 상태 색 |

| D-day | `#EF9F27` | D-3 ~ D-7 색 |

| D-day Bg | `#FFEDD4` | 보완이 필요한 상태 색 |

| Muted | TBD | 보조 텍스트 색 |

| Dark Bg | TBD | 어두운 배경 색 |

---

## 2. Typography

### Font Weight

사용하는 font-weight는 아래 5개만 사용한다.

| Name | Weight |

|---|---:|

| Regular | 400 |

| Medium | 500 |

| SemiBold | 600 |

| Bold | 700 |

| Black | 900 |

---

## 3. Font Scale

기본 본문은 `16px` 기준으로 사용한다.  

모바일에서도 최소 텍스트는 `12px` 이상을 권장한다.

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

## 4. Border Radius

기본 모서리 둥글기는 `14px`를 많이 사용한다.

| Token | Value | Usage |

|---|---:|---|

| radius-xs | `4px` | 작은 배지, 태그 |

| radius-sm | `8px` | 작은 버튼, 칩 |

| radius-md | `12px` | 입력창, 작은 카드 |

| radius-base | `14px` | 기본 카드, 버튼 |

| radius-lg | `16px` | 큰 카드 |

| radius-xl | `24px` | 강조 카드, 큰 영역 |

| radius-full | `30px` | pill 버튼, 둥근 배지 |

---

## 5. Component Rules

### Button

- 기본 버튼 높이는 `48px` 권장
- 주요 버튼 배경은 `Primary`
- 버튼 텍스트는 흰색 사용
- 기본 radius는 `14px`
- font-weight는 `SemiBold`

### Card

- 기본 radius는 `14px`
- 내부 padding은 `16px` 권장
- 카드 간격은 `12px ~ 16px` 기준
- 중요한 카드나 홈 상단 카드는 `Primary Bg` 계열 사용 가능

### Badge

- D-7 이상: `Success` / `Success Bg`
- D-3 ~ D-7: `D-day` / `D-day Bg`
- radius는 `4px` 또는 `8px` 사용

---

## 6. Cursor Coding Rules

Cursor는 UI 코드를 생성할 때 반드시 이 문서를 우선 참고한다.

- Next.js App Router 기준으로 작성한다.
- TypeScript를 사용한다.
- Tailwind CSS를 사용한다.
- 색상은 위 Color Palette 기준으로 사용한다.
- font-size, line-height, font-weight는 Typography 기준을 따른다.
- 컴포넌트는 재사용 가능하게 분리한다.
- 모바일 화면 기준으로 먼저 구현한다.
- 임의의 색상, 임의의 font-size, 임의의 radius를 남발하지 않는다.