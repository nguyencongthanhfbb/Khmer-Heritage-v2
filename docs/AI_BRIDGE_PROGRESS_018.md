# NHẬT KÝ TIẾN ĐỘ THỰC THI NHIỆM VỤ KH-018
**Dự án:** Khmer Heritage (Bảo tàng Kỹ thuật số Khmer & Đồ thị Tri thức Di sản)  
**Mã nhiệm vụ:** KH-018  
**Trọng tâm:** Chuẩn hóa Hiện vật Đa nguồn (Multi-Source Provenance), Biển chú giải bảo tàng chuẩn mực (Museum Label Placard) & Nâng tầm Chiều sâu Học thuật.

---

## 1. TIẾN TRÌNH THỰC HIỆN TỪNG BƯỚC (STEP-BY-STEP WORKFLOW)

- [x] **Bước 1: Khảo sát Hiện trạng & Audit (Phase A)**
  - Kiểm tra toàn bộ mã nguồn `src/types/museum.ts`, `src/data/crawledMuseumData.json`, `src/data/collectionsData.ts`, `src/data/timelineData.ts`.
  - Khảo sát các thành phần UI: `HeritageObjectDetail.tsx`, `MuseumEntrance.tsx`, `CollectionsView.tsx`, `HeritageMapExplorer.tsx`, `PinpeatExperience.tsx`, `EpigraphyExplorer.tsx`.
  - Lập tài liệu `docs/KH-018_AUDIT.md`.

- [x] **Bước 2: Củng cố Bộ sưu tập Chuyên đề (Phase B - Collections Enhancement)**
  - Cập nhật `src/data/collectionsData.ts` với đầy đủ các bộ sưu tập đại diện:
    1. Điêu Khắc Đá & Đồ Đồng Hoàng Gia Angkor (`col-angkor-sculpture`)
    2. Kiến Trúc Đền Đài & Thủy Lợi Thiêng Liêng (`col-sacred-temples`)
    3. Di Sản Tiền Angkor: Phù Nam & Chân Lạp (`col-pre-angkor-heritage`)
    4. Nghệ Thuật Đồng Đúc & Kim Hoàn Hoàng Gia (`col-living-traditions`)
    5. Văn Bia Đá Cổ & Ký Ức Văn Tự Phạn - Khmer (`col-ancient-epigraphy`)
    6. Âm Nhạc Nghi Lễ & Nhạc Khí Linh Thiêng Pinpeat (`col-traditional-music`)

- [x] **Bước 3: Nâng cấp Chi tiết Hiện vật Chuẩn Bảo Tàng (Phase C - Heritage Object Detail)**
  - Tích hợp **Micro-Timeline Bar** thể hiện chuỗi liên kết: `[Thế kỷ]` $\rightarrow$ `[Thời kỳ]` $\rightarrow$ `[Phong cách nghệ thuật]` $\rightarrow$ `[Vương triều / Quân vương]`.
  - Thiết kế **Biển Chú Giải Hiện Vật (Museum Label Placard)** với quy chuẩn thông số khảo cổ chuẩn mực, hiển thị minh bạch `Không có trong hồ sơ gốc` khi dữ liệu không xác định.
  - Phân định rõ **3 Tầng Minh Bạch Dữ Liệu**:
    - *Tầng 1 (Source Original)*: Hồ sơ bảo tàng gốc (The Met Open Access CC0 / NMC / EFEO).
    - *Tầng 2 (Derived Metadata)*: Chuẩn hóa đồ thị tri thức và bối cảnh khảo cổ.
    - *Tầng 3 (AI-Assisted)*: Phụ trợ thuyết minh và hỏi đáp có dán nhãn minh bạch.
  - Tích hợp liên kết điều hướng trực tiếp sang Bản đồ Di tích Thực địa (Heritage Map Explorer).
  - Trình tạo trích dẫn học thuật đa chuẩn (APA, Chicago, EFEO, BibTeX) kèm nút sao chép một chạm.

- [x] **Bước 4: Kiểm thử, Biên dịch & Đối chiếu Quy chuẩn AGENTS.md**
  - Chạy `lint_applet` và `compile_applet` để xác thực toàn bộ hệ thống.
  - Cập nhật tài liệu lịch sử `docs/AI_BRIDGE_HISTORY.md` và hoàn thiện báo cáo `docs/AI_BRIDGE_REPORT_018.md`.
