# AI BRIDGE SPECIFICATION — KHMER HERITAGE
*Giao thức Đồng bộ và Tương tác giữa các Agent & Hệ sinh thái Google AI Studio*

---

## 1. VAI TRÒ CỦA AI BRIDGE
AI Bridge là cơ chế kết nối giữa các phiên làm việc của các Agent, ghi nhận trạng thái hệ thống, cấu hình tham số mô hình AI, và đảm bảo mọi Agent kế thừa công việc đều hiểu rõ quy tắc và tiến độ dự án mà không phá vỡ mã nguồn.

---

## 2. QUY ĐỊNH PHÁT TRIỂN & XÁC THỰC MÃ NGUỒN (GITHUB CREDENTIAL DEVICE FLOW)

1. **Kiểm soát Thay đổi**:
   - Mọi thay đổi đều được kiểm tra cú pháp và tính tương thích thông qua `lint_applet` và `compile_applet`.
2. **Cơ chế Đẩy mã nguồn (GitHub Push via Device Credential)**:
   - Khi cần đẩy mã nguồn lên GitHub, hệ thống xuất cảnh báo và chuẩn bị commit sạch.
   - User là người trực tiếp xác thực thiết bị (Device Authentication / OAuth Confirm) để chủ động kiểm duyệt toàn bộ commit trước khi hòa vào nhánh chính.
3. **Quy tắc An toàn Dữ liệu**:
   - Không xóa bất kỳ file nào (`.md`, `.ts`, `.tsx`, `.json`, `.css`).
   - Mọi cải tiến đều theo mô hình gia số (Additive & Non-destructive).

---

## 3. TRẠNG THÁI NHIỆM VỤ HIỆN HÀNH (CURRENT TASK STATE)
- **Nhiệm vụ vừa hoàn thành**: `KH-022` (Museum Content Corpus Expansion).
- **Kết quả Thực hiện**: Đã thiết lập hoàn chỉnh Museum Content Corpus Pipeline độc lập, bảo tồn 100% trường thông tin gốc từ 5 viện bảo tàng quốc tế (The Met, Smithsonian, Library of Congress, Bảo tàng Quốc gia Campuchia / Wikimedia Commons, Internet Archive & EFEO). Đạt 7/7 Cổng kiểm định chất lượng (7/7 Quality Gates PASS), tạo 562 liên kết thực thể đồ thị tri thức, kê khai 224 tệp media trong `media_manifest.json` và xuất bản cây thư mục `/content/` tĩnh độc lập.
- **Trạng thái Kỹ thuật**: `lint_applet` PASS (0 errors), `compile_applet` PASS (Build Succeeded).
- **Hồ sơ Nghiệm thu**: `docs/KH-022_CONTENT_CORPUS.md`, `docs/KH-022_DATA_QUALITY_REPORT.md`, `docs/KH-022_MEDIA_PIPELINE.md`, `docs/AI_BRIDGE_PROGRESS_022.md`, `docs/AI_BRIDGE_REPORT_022.md`.
- **Nhiệm vụ Đề xuất Tiếp theo**: `KH-023` (Interactive Museum Experience & Exploration Layer).


