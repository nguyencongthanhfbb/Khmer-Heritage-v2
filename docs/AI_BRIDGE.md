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
- **Nhiệm vụ vừa hoàn thành**: `KH-021R` (Reconciliation & Implementation Reality Audit for KH-021).
- **Kết quả Thực hiện**: Đã rà soát và kiểm chứng thực tế toàn bộ 15/15 phân hệ trải nghiệm bảo tàng số trên mã nguồn TypeScript, liên kết dữ liệu thật 73 hiện vật `crawledMuseumData.json`, tính năng âm học Web Audio API, đối chiếu văn bia EFEO, bản đồ GPS và hệ thống trích dẫn học thuật. Kết quả đánh giá: **100% VERIFIED (Verdict A)**.
- **Trạng thái Kỹ thuật**: `lint_applet` PASS (0 errors), `compile_applet` PASS (Build Succeeded).
- **Hồ sơ Nghiệm thu**: `docs/KH-021R_CLAIM_MATRIX.json`, `docs/KH-021R_FEATURE_MATRIX.json`, `docs/KH-021R_IMPLEMENTATION_AUDIT.md`, `docs/AI_BRIDGE_REPORT_021R.md`.


