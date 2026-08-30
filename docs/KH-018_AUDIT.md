# KH-018 AUDIT REPORT — MUSEUM DEPTH & AUTHENTIC CORPUS INTEGRATION

**Project:** Khmer Heritage (Digital Khmer Museum)  
**Task:** KH-018  
**Audit Date:** 2026-08-30  
**Status:** COMPLETED — READY FOR CANONICAL HARDENING

---

## 1. HỆ THỐNG HIỆN HÀNH & BẢNG ĐÁNH GIÁ (SYSTEM STATUS AUDIT)

| Module / Phân Hệ | File Đường Dẫn | Trạng Thái Hiện Tại | Đánh Giá Học Thuật & Đề Xuất Nâng Cấp |
|---|---|---|---|
| **Museum Entrance** | `src/components/MuseumEntrance.tsx` | HOẠT ĐỘNG TỐT | Đạt chuẩn sảnh đón tiếp bảo tàng số; cần tăng cường liên kết trực tiếp vào các trạm di sản tâm điểm. |
| **Heritage Object Detail** | `src/components/HeritageObjectDetail.tsx` | CẦN NÂNG CẤP SÂU | Trung tâm của toàn bộ bảo tàng. Phải phân tách rõ ràng **Original Source Record** (từ Met/NMC/EFEO) và **Khmer Heritage Structured Metadata**. Hiển thị biển chú giải giám tuyển chuẩn mực (Museum Label Placard), đồ thị tri thức (Knowledge Graph), tọa độ thực địa, trích dẫn đa chuẩn (APA, Chicago, EFEO, BibTeX). |
| **Collections View** | `src/components/CollectionsView.tsx` | NÂNG CẤP | Đã có giao diện triển lãm chuyên đề; bổ sung thêm các bộ sưu tập đại diện về Văn bia cổ đại (Ancient Inscriptions) và Âm nhạc nghi lễ (Sacred Music). |
| **Map Explorer** | `src/components/HeritageMapExplorer.tsx` | HOẠT ĐỘNG TỐT | Tích hợp bản đồ tọa độ khảo cổ thực tế, bộ tính khoảng cách từ vị trí người dùng đến Angkor Wat, Banteay Srei, Sambor Prei Kuk. |
| **Timeline View** | `src/components/TimelineView.tsx` | HOẠT ĐỘNG TỐT | Trình bày 6 thời kỳ lịch sử lớn với các kiệt tác và đền đài tiêu biểu kết nối trực tiếp vào Object Detail. |
| **Quick Search Modal** | `src/components/QuickSearchModal.tsx` | HOẠT ĐỘNG TỐT | Tìm kiếm phân loại đa dạng theo Hiện vật, Địa danh, Thời kỳ, Bộ sưu tập, Văn bia, Phong cách mỹ thuật. |
| **Epigraphy Explorer** | `src/components/EpigraphyExplorer.tsx` | HOẠT ĐỘNG TỐT | Khảo cứu văn bia chữ Phạn và Khmer cổ đối chiếu bản dập lưu trữ EFEO. |
| **Pinpeat Experience** | `src/components/PinpeatExperience.tsx` | HOẠT ĐỘNG TỐT | Động cơ tổng hợp âm học vật lý (Physical Modeling Synthesizer) 5 nhạc cụ với tuyển tập nhạc lễ cung đình. |
| **Curator AI** | `src/components/CuratorAssistant.tsx` | GIỮ NGUYÊN VỊ TRÍ PHỤ TRỢ | Đã đóng vai trò trợ lý hỏi đáp có ngữ cảnh hiện vật, không thay thế dữ liệu gốc. |
| **Provenance Modal** | `src/components/ProvenanceModal.tsx` | HOẠT ĐỘNG TỐT | Minh bạch ba tầng dữ liệu và nguồn gốc lưu trữ của các viện bảo tàng quốc tế. |

---

## 2. AUDIT NGUỒN DỮ LIỆU & BẢN QUYỀN (SOURCE & LICENSE AUDIT)

1. **Cơ sở dữ liệu chính (`src/data/crawledMuseumData.json`)**:
   - 100% hiện vật đều có xuất xứ thực tế từ **The Metropolitan Museum of Art (Department of Asian Art)** thuộc diện **Open Access (CC0)**.
   - Có đầy đủ số kiểm kê bảo tàng (Accession Numbers: ví dụ `36.96.5`, `1993.477.3`, `2003.142`, `1987.142.1`).
   - Đường dẫn liên kết trực tiếp tới hồ sơ gốc của bảo tàng lưu trữ (`sourceUrl`).
   - Tọa độ địa lý GPS thực tế tại Campuchia và vùng Đông Nam Á cổ.

2. **Dữ liệu Điểm Chạm Biểu Tượng Học (Iconography Hotspots)**:
   - Các tác phẩm sa thạch và tượng đồng tiêu biểu đều có tọa độ điểm chạm phân tích hình tượng học Phật giáo và Hindu giáo chuẩn mực (Dhyana Mudra, 7 đầu rắn Mucalinda, mũ miện Jatamukuta, con mắt thứ ba Shiva, hợp nhất Harihara).

3. **Cơ chế Fallback Hình ảnh Đạt chuẩn Bảo Tàng (Museum Image Fallback)**:
   - Không dùng ảnh stock bừa bãi. Sử dụng ảnh chụp di tích cổ Angkor thực tế đã được chuẩn hóa khi kết nối mạng ngoại vi gặp gián đoạn.

---

## 3. KẾ HOẠCH TRIỂN KHAI CHO KH-018 (ACTION PLAN)

1. **Nâng cấp Data Schema & Multi-Source Support**:
   - Đảm bảo cấu trúc hỗ trợ đa nguồn lưu trữ (Met Museum, Bảo tàng Quốc gia Campuchia, EFEO, Smithsonian).
2. **Nâng cấp Chiều sâu Hiện vật (Museum-Grade Object Detail)**:
   - Tinh chỉnh thiết kế biển hiện vật (Placard) chuẩn bảo tàng quốc tế.
   - Phân định rành mạch giữa **Thông Tin Gốc Từ Viện Lưu Trữ** và **Dữ Liệu Chuẩn Hóa Của Bảo Tàng Số Khmer Heritage**.
   - Bổ sung thanh điều hướng dòng thời gian vi mô (Micro-Timeline) ngay trong chi tiết hiện vật: Niên đại $\rightarrow$ Thời kỳ $\rightarrow$ Phong cách $\rightarrow$ Vương triều.
   - Kết nối hai chiều với Bản đồ di tích và Bộ sưu tập liên quan.
3. **Mở rộng Bộ sưu tập Triển lãm (Curated Exhibitions)**:
   - Bổ sung 2 bộ sưu tập chuyên đề về *Văn Bia & Bản Thảo Cổ* và *Âm Nhạc Nghi Lễ*.
4. **Kiểm thử và Hoàn thiện Báo cáo**:
   - Chạy `lint`, `build` và viết báo cáo đầy đủ theo quy định của AGENTS.md và KH-018.
