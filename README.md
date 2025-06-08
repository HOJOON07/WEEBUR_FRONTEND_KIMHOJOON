# 실행 방법

1. git clone https://github.com/HOJOON07/WEEBUR_FRONTEND_KIMHOJOON.git
2. cd WEEBUR_FRONTEND_KIMHOJOON/
3. npm install
4. npm run dev

## 1. 요구사항 분석 및 기능 정의

- Product(상품) 리스트를 무한 스크롤로 로딩하는 기능 필요
- View 모드(그리드/리스트)를 쿠키 기반 랜덤 유지
- 상품 등록(폼), 유효성 검사, 실시간 가격 계산 등 UX 개선

## 2. 기술 스택 및 구조 설계

- **Next.js (App Router) + React + TypeScript**
- **Tanstack Query(useInfiniteQuery)**: 무한 스크롤 데이터 페칭

## 3. 구현 아이디어

### A. 미들웨어 기반 쿠키로 View Mode(그리드/리스트) 고정

- **문제**

  - 사용자가 상품 리스트 페이지(`/products`)에 최초 진입할 때
    50% 확률로 랜덤하게 'grid' 또는 'list' 뷰 모드가 배정되어야 하며,
    배정된 뷰 모드는 24시간 동안 유지되어야 함.

- **구현 아이디어**

  - **Next.js의 미들웨어**를 활용하여 `/products` 요청 시 동작하도록 설정
  - 미들웨어에서 브라우저 쿠키(`view-mode`)의 존재 여부를 확인
  - 쿠키가 없다면, 0.5 확률로 'grid' 또는 'list' 중 하나를 선택해
    `Set-Cookie`로 클라이언트에 저장(만료는 24시간 후)
  - 쿠키가 이미 존재하면, 기존 값을 계속 유지
  - 클라이언트 및 SSR에서는 이 쿠키 값을 기반으로 뷰 모드를 결정하며,
    사용자는 할당된 뷰 모드 외의 UI를 선택할 수 없음

- **장점**
  - SSR 단계에서 UI를 랜덤으로 고정할 수 있어 UX/테스트 일관성 확보
  - 프론트엔드 코드는 뷰 모드 변경 로직이 불필요해지고, 깔끔한 구조 유지
  - A/B 테스트, 실험적 UI 노출 등에도 쉽게 확장 가능

---

### B. 무한 스크롤 & React Query 결합

- **구현 아이디어**

  - 상품 목록은 한 번에 모두 불러오지 않고, 페이지 하단에 도달할 때마다 다음 데이터를 자동 요청
  - `useInfiniteQuery`(react-query)와 `IntersectionObserver`를 조합
  - 감지용 더미(div)를 스크롤 하단에 위치시키고, 해당 div가 화면에 보이면 `fetchNextPage()` 실행
  - 서버 데이터의 `skip`, `limit`, `total` 값을 기반으로 다음 페이지 요청을 정확하게 제어

- **장점**
  - 네트워크 부하를 줄이고, UX를 부드럽게 유지
  - 데이터, 네트워크, UI가 분리되어 유지보수에 강함

---

### C. FormField/Input 컴포넌트 추상화

- **구현 아이디어**

  - 각 입력 필드는 `FormField` 컴포넌트 하나에
    - label(라벨)
    - input(입력)
    - error text(에러 메시지)
    - help text(설명)
      를 조합하는 방식으로 설계
  - 유효성 검증(validation) 로직은 별도의 유틸 함수로 추출하여, 중복 없이 재사용

- **장점**
  - 일관성 있는 UI/UX 제공
  - 입력/에러/설명 등의 관리가 쉬워지고, 코드 중복 최소화
  - 유지보수성과 확장성이 높아짐

---
