# 창고 재고 시각화 시스템

창고의 Rack Location 별 재고를 시각화하는 웹 기반 시스템

## 기능

- **랙 시각화**: A~M 랙 13개 시각화
- **품목 검색**: Item No로 재고 위치 검색
- **색상 강조**: 수량에 따른 주황색 그라데이션
- **층별 상세보기**: 랙 선택 시 4x4 층별 레이아웃 표시
- **재고 목록**: 해당 랙의 재고 리스트 표시

## 기술 스택

- **프레임워크**: Next.js 16 + React 18 + TypeScript
- **스타일**: Tailwind CSS
- **데이터 파싱**: SheetJS (xlsx)
- **컨테이너**: Docker

## Docker 실행

### 빌드
```bash
docker build -t warehouse-visualization .
```

### 실행
```bash
docker run -d -p 8088:8088 --name warehouse-app warehouse-visualization
```

### Docker Compose 사용
```bash
docker-compose up --build
```

브라우저에서 `http://localhost:8088` 접속

## 개발 실행

```bash
npm install
npm run dev
```

## 데이터

- **데이터 파일**: `public/onhand.xlsx`
- **형식**: Location (랙-칸-층), item no, onhand

## 랙 구조

```
┌──────────────────────────────────────────────────────────┐
│  K-1  K-2  K-3  K-4   L-1  L-2  L-3  L-4   M-1  M-2  M-3  M-4  │
├──────────┬──────────────────┬───────────────────────────┤
│          │  A-1  A-2  A-3  A-4 │  E-1  E-2  E-3  E-4      │
│  I-1     │  B-1  B-2  B-3  B-4 │  F-1  F-2  F-3  F-4      │
│  I-2     │  C-1  C-2  C-3  C-4 │  G-1  G-2  G-3  G-4      │
│  I-3     │  D-1  D-2  D-3  D-4 │  H-1  H-2  H-3  H-4      │
│  I-4     │                      │                           │
│          │                      │                           │
└──────────┴──────────────────┴───────────────────────────┘
                                            │
                                        J-1~4
```
