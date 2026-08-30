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
- **Nhiệm vụ vừa hoàn thành**: `KH-019R` (Evidence-Level Corpus Audit & Source Purification).
- **Kết quả Kiểm định Cấp Trường**: `B — NEEDS CONTENT / DATA EXPANSION` (60/60 hiện vật có nền tảng hồ sơ bảo tàng The Met Open Access CC0; 100% tọa độ GPS là vị trí tâm đền đài được gán trong số hóa; 0 hiện vật hư cấu).
- **Trạng thái Kỹ thuật**: `lint_applet` PASS, `compile_applet` PASS.
- **Nhiệm vụ Đề xuất Tiếp theo**: `KH-020 — Multi-Institution Authentic Corpus Expansion` (Mở rộng kết nối đa nguồn bảo tàng quốc tế).

