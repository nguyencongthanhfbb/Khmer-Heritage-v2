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
- **Nhiệm vụ vừa hoàn thành**: `KH-021` (Digital Museum Experience & Authentic Content Layer).
- **Kết quả Thực hiện**: Đã hoàn thiện toàn diện tầng trải nghiệm bảo tàng số trên 73 hiện vật và di tích đa nguồn bảo tàng; tích hợp điều hướng liên kết chuyên sâu (Bản đồ di tích, Văn bia EFEO, Dàn nhạc Pinpeat); bổ sung bộ lọc chất liệu và chế độ xem Bảng mục lục học thuật.
- **Trạng thái Kỹ thuật**: `lint_applet` PASS, `compile_applet` PASS (Build Succeeded, 0 error).
- **Hồ sơ Nghiệm thu**: `docs/KH-021_UI_AUDIT.md`, `docs/KH-021_MUSEUM_EXPERIENCE.md`, `docs/AI_BRIDGE_REPORT_021.md`.

