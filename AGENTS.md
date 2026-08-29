# KHMER HERITAGE — AGENT GOVERNANCE & EXECUTION CONTRACT

## 1. NGUYÊN TẮC BẤT BIẾN DÀNH CHO CÁC AGENT (IMMUTABLE RULES)

Mọi Agent (Antigravity, Gemini, Subagents, hoặc các quy trình tự động) khi làm việc trên kho mã nguồn **Khmer Heritage** BẮT BUỘC tuân thủ nghiêm ngặt các quy tắc sau:

1. **Tuyệt đối KHÔNG tự ý xóa file (NO UNAUTHORIZED FILE DELETION)**:
   - Nghiêm cấm sử dụng các lệnh xóa file (`delete_file`, `delete_dir`, `rm`) trừ khi có yêu cầu bằng văn bản rõ ràng từ User/Chủ dự án.
2. **Tuyệt đối KHÔNG tự ý đè, ghi đè phá hủy cấu trúc (NO OVERWRITING/DESTRUCTIVE EDITS)**:
   - Mọi thay đổi phải dựa trên nguyên tắc cập nhật gia tăng (incremental update), đọc kỹ nội dung trước khi chỉnh sửa (`view_file` trước `edit_file`).
   - Giữ nguyên vẹn các file cấu hình và dữ liệu đã được xác thực.
3. **Nghiêm cấm sáng tạo quá đà hoặc tự chế tính năng (NO UNSOLICITED CREATIVITY / NO SCOPE CREEP)**:
   - Chỉ xây dựng chính xác các tính năng trong phạm vi được định nghĩa trong tài liệu và yêu cầu của người dùng.
   - Không tự ý thêm các tab SaaS, các trang quảng cáo, blog bài viết, hoặc các tính năng không liên quan đến bảo tàng số.
4. **Nghiêm cấm nội dung AI tự bịa (NO AI-FABRICATED CONTENT)**:
   - Khmer Heritage là **Bảo tàng Kỹ thuật số (Digital Khmer Museum)**. Dữ liệu lịch sử, hiện vật, niên đại, tác giả, nơi khai quật BẮT BUỘC phải dựa trên nguồn lưu trữ có thật (Met Museum, EFEO, Gallica/BnF, NMC, APSARA, Smithsonian,...).
   - Nếu thông tin chưa rõ, ghi nhận `Không rõ` / `Chưa xác định`. Tuyệt đối không để AI tự tạo tiểu sử hoặc niên đại giả mạo.
5. **Minh bạch ba tầng dữ liệu (THREE-TIER TRANSPARENCY)**:
   - **Tầng 1 (Source Original)**: Dữ liệu nguyên gốc từ tổ chức lưu trữ.
   - **Tầng 2 (Derived Metadata)**: Dữ liệu chuẩn hóa định danh và liên kết đồ thị tri thức.
   - **Tầng 3 (AI-Assisted)**: Các tính năng AI bổ trợ phải được dán nhãn minh bạch, không được thay thế dữ liệu gốc.
6. **Xác thực và Quản lý Mã nguồn (Source Control & Credential Workflow)**:
   - Quy trình đẩy code lên GitHub tuân thủ xác thực thiết bị (Device Credential Flow), mọi thay đổi phải sẵn sàng để User chủ động review, xác thực và kiểm soát chất lượng.

---

## 2. BẢN ĐỒ TÀI LIỆU DỰ ÁN (DOCUMENTATION REGISTRY)

Tất cả tài liệu kỹ thuật và báo cáo tiến độ được lưu trữ tập trung tại thư mục `/docs/`:
- `docs/PROJECT_VISION.md`: Tầm nhìn, định vị sản phẩm và triết lý bảo tàng số.
- `docs/PRODUCT_SPEC.md`: Đặc tả chi tiết các phân hệ tính năng và trải nghiệm người dùng.
- `docs/ARCHITECTURE.md`: Kiến trúc kỹ thuật, luồng dữ liệu và tích hợp Google AI Studio.
- `docs/CONTENT_SCHEMA.md`: Định nghĩa cấu trúc dữ liệu cho tất cả các loại thực thể di sản.
- `docs/DATA_ARCHITECTURE.md`: Kiến trúc lưu trữ, định danh thực thể (Canonical Entities) và đồ thị quan hệ.
- `docs/CMS_SPEC.md`: Quy trình tiếp nhận, chuẩn hóa và kiểm duyệt dữ liệu di sản.
- `docs/CONTENT_SOURCES.md`: Danh mục các nguồn bảo tàng và viện nghiên cứu uy tín.
- `docs/LICENSING.md`: Quy chuẩn cấp phép bản quyền và cơ chế kiểm duyệt (License Gate).
- `docs/AI_BRIDGE.md`: Giao thức tương tác giữa các Agent và hệ thống AI.
- `docs/AI_BRIDGE_HISTORY.md`: Nhật ký thay đổi và lịch sử các phiên làm việc.
- `docs/AI_BRIDGE_PROGRESS_FRAMEWORK.md`: Nhật ký tiến độ Giai đoạn 1 (Framework).
- `docs/AI_BRIDGE_REPORT_FRAMEWORK.md`: Báo cáo đánh giá hoàn thành Giai đoạn 1.
- `docs/AI_BRIDGE_PROGRESS_CONTENT.md`: Nhật ký tiến độ Giai đoạn 2 (Content & Ingestion).
- `docs/AI_BRIDGE_REPORT_CONTENT.md`: Báo cáo đánh giá hoàn thành Giai đoạn 2.
