# ARCHITECTURE & TECHNOLOGY INTEGRATION — KHMER HERITAGE

## 1. TỔNG QUAN KIẾN TRÚC HỆ THỐNG (SYSTEM ARCHITECTURE)

Khmer Heritage sử dụng kiến trúc Full-Stack hiện đại, bảo mật và tuân thủ các quy chuẩn hạ tầng của **Google AI Studio / Cloud Run**:

```
[ BROWSER CLIENT (Vite + React 19 + Tailwind CSS v4) ]
  ├── Navigation, Museum Views, Object Detail, Faceted Search
  ├── Interactive Map (Leaflet / Dynamic Coordinates)
  ├── Audio/Video Player & High-Resolution Viewer
  └── Favorites & Local Museum State Persistence
         │
         │ (HTTP / JSON API)
         ▼
[ SERVER-SIDE PROXY (Express.js / Node.js on Port 3000) ]
  ├── API Routes (/api/objects, /api/collections, /api/timeline, /api/ai/enrich)
  ├── Security Layer: GEMINI_API_KEY hoàn toàn nằm tại Server, không lộ Client
  ├── Ingestion & License Gate Filter
  └── Cache & Normalized Data Engine
         │
         │ (Internal / Official APIs)
         ▼
[ GOOGLE AI STUDIO / CLOUD SERVICES & MUSEUM REGISTRY ]
  ├── Google Gemini API (@google/genai SDK): Hỗ trợ Semantic Search & Entity Linking
  ├── Google Search & Maps Grounding: Đối chiếu địa lý di tích thực tế
  └── Official Source Repositories (Met, BnF Gallica, EFEO, NMC, Wikimedia)
```

---

## 2. QUY CHUẨN KỸ THUẬT (TECHNICAL STANDARDS)

1. **Frontend**:
   - React 19 + TypeScript Strict Mode.
   - Tailwind CSS v4 với bảng màu bảo tàng trang nhã (Warm Stone, Heritage Gold, Deep Slate, Terracotta).
   - Icons: Chuẩn `lucide-react`.
   - Animations: Chuẩn `motion/react`.
2. **Backend**:
   - Node.js + Express.js chạy trên cổng cố định `3000` (host `0.0.0.0`).
   - Tích hợp `@google/genai` (SDK 2.x) lazy-loaded, xử lý bảo mật phía server.
3. **Cấu hình Môi trường**:
   - Khai báo đầy đủ trong `.env.example`. Không để lộ secret trong code.
