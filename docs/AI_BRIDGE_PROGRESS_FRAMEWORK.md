# AI BRIDGE PROGRESS: FRAMEWORK (GIAI ĐOẠN 1)

## BẢNG THEO DÕI TIẾN ĐỘ KHUNG BẢO TÀNG SỐ (FRAMEWORK TRACKER)

| Hạng mục Phân hệ | Trạng thái | Ghi chú & Đánh giá |
| :--- | :---: | :--- |
| **1. App Metadata & Entry Point** | ✅ HOÀN THÀNH | Đồng bộ `metadata.json`, `index.html`, khai báo quyền `geolocation`. |
| **2. Quản trị & Quy tắc Agent (`AGENTS.md`)** | ✅ HOÀN THÀNH | Cấm tự ý xóa/đè file, cấm bịa đặt lịch sử, thiết lập luồng Device Credential. |
| **3. Bộ tài liệu Đặc tả & Kiến trúc (`/docs/`)** | ✅ HOÀN THÀNH | Đầy đủ 10+ tài liệu chuyên sâu về kiến trúc, schema, nguồn dữ liệu và bản quyền. |
| **4. Hệ thống TypeScript Type (`src/types/museum.ts`)** | ✅ HOÀN THÀNH | Định nghĩa đầy đủ `HeritageObject`, `MuseumCollection`, `TimelineEpoch`, `ProvenanceRecord`, `KnowledgeRelations`. |
| **5. Máy chủ Server-side Proxy (`server.ts`)** | ✅ HOÀN THÀNH | Express.js proxy bảo mật Gemini API Key, REST endpoints `/api/objects`, `/api/collections`, `/api/timeline`, `/api/places`, `/api/ai/ask-curator`. |
| **6. Giao diện Sảnh Bảo tàng (Digital Entrance)** | ✅ HOÀN THÀNH | Hero Exhibition với kiệt tác Angkor Wat / West Mebon, Carousel kiệt tác, Quick bar 5 thời kỳ, Lộ trình khám phá. |
| **7. Chi tiết Hiện vật (Heritage Object Detail)** | ✅ HOÀN THÀNH | Media viewer độ phân giải cao có zoom, thẻ danh xưng Khmer/Anh/Việt, Audio guide, Provenance & License Box, Đồ thị liên kết. |
| **8. Bộ sưu tập & Trục Thời gian (Collections & Timeline)**| ✅ HOÀN THÀNH | Phân loại chuyên khảo, Lời bình giám tuyển, Trục thời gian tương tác 5 kỷ nguyên (Phù Nam $\rightarrow$ Hiện đại). |
| **9. Bản đồ Di tích (Heritage Map Explorer)** | ✅ HOÀN THÀNH | Định vị không gian thực địa GPS, bộ lọc tỉnh thành, tính khoảng cách thực địa (Haversine). |
| **10. Tìm kiếm & Lưu trữ Cá nhân (Search & Favorites)** | ✅ HOÀN THÀNH | Faceted Search đa tiêu chí, Modal tìm kiếm nhanh (Ctrl+K), Lưu trữ nghiên cứu có xuất Markdown. |
| **11. Giám tuyển AI Học thuật (`CuratorAssistant.tsx`)** | ✅ HOÀN THÀNH | Trợ lý học thuật Gemini 3.7 Flash server-side grounding với dữ liệu lưu trữ, cấm bịa đặt lịch sử. |
| **12. Cổng Nguồn Lưu trữ & Bản quyền (`ProvenanceModal.tsx`)** | ✅ HOÀN THÀNH | Danh mục cơ quan viện bảo tàng (Met, EFEO, NMC, APSARA, UNESCO) và License Gate. |
