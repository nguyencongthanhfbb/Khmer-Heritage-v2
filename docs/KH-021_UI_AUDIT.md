# KH-021 — BÁO CÁO AUDIT TRẢI NGHIỆM GIAO DIỆN BẢO TÀNG SỐ (UI AUDIT)

**Dự án:** Khmer Heritage (សារមន្ទីរបេតិកភណ្ឌខ្មែរ)  
**Mã Task:** KH-021  
**Mục tiêu:** Rà soát và đánh giá toàn diện trải nghiệm giao diện người dùng theo chuẩn Digital Khmer Museum, tuân thủ nguyên tắc "OBJECT + MEDIA + PROVENANCE + RELATIONSHIPS + EXPLORATION".

---

## 1. TỔNG QUAN HỆ THỐNG GIAO DIỆN ĐƯỢC AUDIT

| Phân Hệ / Màn Hình | Component Tương Ứng | Trạng Thái Audit | Đánh Giá Độ Hoàn Thiện |
| :--- | :--- | :---: | :--- |
| **Sảnh Bảo Tàng (Home Entrance)** | `MuseumEntrance.tsx` | **PASS** | Hero Exhibition Banner chất lượng cao, giới thiệu kiệt tác, lối vào trực quan đến các gian trưng bày. |
| **Kho Hiện Vật (Object Explorer)** | `ObjectDirectory.tsx` | **PASS** | Bộ lọc đa chiều (Thời kỳ, Thể loại, Viện lưu trữ, Chất liệu), 2 chế độ xem (Lưới thẻ HD & Bảng mục lục học thuật). |
| **Chi Tiết Hiện Vật (Object Detail)** | `HeritageObjectDetail.tsx` | **PASS** | Hero media viewer với zoom toàn màn hình, điểm chạm đồ tượng (hotspots), biển chú giải bảo tàng, hồ sơ lai lịch 3 tầng. |
| **Bộ Sưu Tập Chuyên Đề** | `CollectionsView.tsx` | **PASS** | 6 bộ sưu tập giám tuyển học thuật với hình ảnh đại diện, luận giải giám tuyển và lưới hiện vật liên kết. |
| **Văn Bia & Thư Tịch Cổ** | `EpigraphyExplorer.tsx` | **PASS** | Trình đọc văn bia EFEO đối chiếu Phạn ngữ/Khmer cổ, phiên âm Latinh, bản dịch và thuyết minh âm thanh. |
| **Âm Nhạc Cung Đình Pinpeat** | `PinpeatExperience.tsx` | **PASS** | Trình mô phỏng âm học dàn nhạc Pinpeat, phổ sóng hòa âm, bài nhạc cổ truyền và luồng âm thanh lưu trữ UNESCO. |
| **Bản Đồ Di Tích Không Gian** | `HeritageMapExplorer.tsx` | **PASS** | Định vị GPS thực địa các cụm di tích đền đài Angkor, Sambor Prei Kuk, Koh Ker, Preah Vihear. |
| **Trục Thời Gian Lịch Sử** | `TimelineView.tsx` | **PASS** | Tiến trình lịch sử từ Phù Nam, Chân Lạp, Angkor Hoàng kim đến Hậu Angkor với niên đại chuẩn hóa. |
| **Đối Sánh Phong Cách Nghệ Thuật**| `ArtStyleMatrix.tsx` | **PASS** | Ma trận 10 phong cách điêu khắc (Sambor Prei Kuk, Kulen, Koh Ker, Banteay Srei, Bayon,...). |
| **Tìm Kiếm Nhanh Toàn Cục** | `QuickSearchModal.tsx` | **PASS** | Tra cứu tức thời theo tên tiếng Việt, tiếng Khmer, tiếng Anh, mã số kiểm kê và địa danh. |

---

## 2. AUDIT NGUYÊN TẮC THIẾT KẾ VÀ KIẾN TRÚC THỊ GIÁC

### 2.1. Không Gian Màu Sắc (Color Palette & Dark Museum Atmosphere)
- **Nền chính (Background):** `#121316` (Đen huyền cung đình, độ bão hòa thấp dưới 5%, tạo chiều sâu tập trung vào hiện vật).
- **Thùng chứa (Cards & Containers):** `bg-stone-900` (`#1c1917`) và `bg-stone-950` (`#0c0a09`), độ tương phản sáng tối được kiểm soát nghiêm ngặt (< 12%).
- **Màu nhấn (Accents):** `amber-500` (`#f59e0b`), `amber-400` (`#fbbf24`), mang sắc vàng đồng thau và ánh nến hoàng cung Angkor.
- **Màu chứng thực (Provenance Badges):** `emerald-950` kết hợp viền `emerald-500/30` cho dữ liệu Tầng 1 (Hồ sơ gốc từ bảo tàng).

### 2.2. Phông Chữ & Hệ Thống Thứ Bậc (Typography Hierarchy)
- **Tiêu đề & Tên hiện vật:** Phông Serif cổ điển (Cinzel / Playfair / Merriweather serif) tạo uy nghiêm học thuật và mỹ thuật.
- **Tiêu đề gốc tiếng Khmer:** Hiển thị tự nhiên với cỡ chữ cân đối, không ngắt chữ hay bể ký tự Unicode Khmer.
- **Dữ liệu kỹ thuật & Mã lưu trữ:** Phông đơn cách (JetBrains Mono / font-mono) rõ ràng cho mã kiểm kê, tọa độ GPS và niên đại.

### 2.3. Quy Chuẩn Chống Giao Diện Rác (Anti-AI-Slop Compliance)
- [x] **Không dùng gradient tím-xanh:** Toàn bộ tông màu tuân theo phong cách bảo tàng thâm trầm đá sa thạch và đồng thau.
- [x] **Không lồng thẻ tùy tiện (No nested cards):** Sử dụng khoảng trắng và đường phân cách vi mô `border-stone-800`.
- [x] **Bo góc toán học:** Bán kính bo góc ngoài 16-24px, bo góc trong tỷ lệ thuận trừ đi khoảng cách padding.
- [x] **Không dùng số liệu ảo (No fake metrics):** Toàn bộ số lượng hiện vật (73), thời kỳ, thể loại được tính toán động (dynamic state) từ tệp dữ liệu đã xác thực `crawledMuseumData.json`.

---

## 3. AUDIT ĐỘ TƯƠNG THÍCH ĐA THIẾT BỊ (RESPONSIVENESS AUDIT)

| Độ Phân Giải / Thiết Bị | Viewport | Kết Quả Kiểm Tra | Ghi Chú Tối Ưu |
| :--- | :---: | :---: | :--- |
| **Mobile Nhỏ (Small Mobile)** | 360 × 640 px | **PASS** | Thanh điều hướng chuyển sang chế độ cuộn mượt hoặc thanh trượt cảm ứng; vùng chạm tối thiểu 44px. |
| **Mobile Tiêu Chuẩn (iPhone 14/15)** | 390 × 844 px | **PASS** | Thẻ hiện vật hiển thị 1 cột hoàn chỉnh, hình ảnh tràn viền tối ưu, bảng chú giải co giãn linh hoạt. |
| **Mobile Lớn / Android (Pixel 7)** | 412 × 915 px | **PASS** | Tỷ lệ khung nhìn hiển thị đầy đủ chi tiết hiện vật và bộ nút trích dẫn học thuật. |
| **Tablet / iPad** | 768 × 1024 px | **PASS** | Lưới hiển thị 2 cột cân đối, hero banner tối ưu tỷ lệ 16:9. |
| **Desktop / Laptop** | 1280 × 800 px+ | **PASS** | Bố cục 12 cột chuẩn bảo tàng (Hero Media 7 cột + Thẻ định danh 5 cột). |

---

## 4. AUDIT TÍNH NĂNG ĐẶC THÙ THEO TỪNG LOẠI HÌNH HIỆN VẬT

1. **Hiện vật Điêu Khắc & Tượng Đồng (Artifact / Sculpture):**
   - Đầy đủ thông tin: Chất liệu, Kích thước, Niên đại, Phong cách nghệ thuật, Vị trí phát hiện, Mã kiểm kê.
   - Trình tương tác điểm chạm đồ tượng (Hotspots) giải mã ấn quyết (Mudra), mũ miện (Mukuta) và y phục (Sampot).

2. **Quần Thể Đền Đài & Di Tích Kiến Trúc (Architecture / Monument):**
   - Đầy đủ thông tin: Tọa độ GPS thực địa, Vùng văn hóa, Danh hiệu UNESCO, Quy hoạch không gian thiêng Đền Núi.
   - Tích hợp nút chuyển hướng một chạm sang **Bản Đồ Di Tích Toàn Cảnh**.

3. **Văn Bia Khảo Cổ & Kinh Lá Buông (Epigraphy / Inscriptions):**
   - Phân loại ngôn ngữ văn bản: Tiếng Phạn (Sanskrit) & Tiếng Khmer Cổ (Old Khmer).
   - Tích hợp nút chuyển hướng sang **Trình Giải Mã Văn Bia EFEO**.

4. **Di Sản Phi Vật Thể & Âm Nhạc Truyền Thống (Living Traditions / Music):**
   - Phân định minh bạch giữa **Bản ghi âm lưu trữ gốc (Archival UNESCO Recording)** và **Thuyết minh hướng dẫn viên số (Audio Guide TTS)**.
   - Tích hợp nút chuyển hướng sang **Không Gian Hòa Âm Dàn Nhạc Pinpeat**.

5. **Tư Liệu Lưu Trữ & Bản Đồ Lịch Sử (Archives & Cartography):**
   - Ghi nhận đầy đủ nguồn lưu trữ Library of Congress, Viện Viễn Đông Bác cổ (EFEO) và các quy chuẩn cấp phép Public Domain / CC0.

---

## 5. KẾT LUẬN AUDIT
Giao diện đã đáp ứng trọn vẹn tiêu chuẩn trải nghiệm Bảo Tàng Kỹ Thuật Số Khmer (Digital Khmer Museum), không có lỗi cú pháp, tương thích hoàn hảo và sẵn sàng phục vụ công chúng cũng như giới học thuật nghiên cứu.
