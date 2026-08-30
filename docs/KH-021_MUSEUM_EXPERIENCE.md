# KH-021 — ĐẶC TẢ TRẢI NGHIỆM BẢO TÀNG SỐ DI SẢN KHMER (DIGITAL MUSEUM SPECIFICATION)

**Dự án:** Khmer Heritage (សារមន្ទីរបេតិកភណ្ឌខ្មែរ)  
**Mã Task:** KH-021  
**Mục tiêu:** Kiến trúc hóa trải nghiệm người dùng bảo tàng số dựa trên 73 hiện vật và di tích đã xác minh nguồn gốc độc lập từ KH-020R và KH-020R.1.

---

## 1. TRIẾT LÝ TRẢI NGHIỆM "OBJECT-FIRST" (CỐT LÕI HIỆN VẬT)

Khmer Heritage không xây dựng theo mô hình trang thông tin, blog bài viết hay tổng hợp bách khoa toàn thư mở. Trải nghiệm bảo tàng số được định nghĩa xoay quanh công thức chuẩn mực của các bảo tàng hàng đầu thế giới (The Met, British Museum, Louvre, Smithsonian):

$$\text{MUSEUM EXPERIENCE} = \text{OBJECT} + \text{MEDIA} + \text{PROVENANCE} + \text{RELATIONSHIPS} + \text{EXPLORATION}$$

### Năm Trụ Cột Trải Nghiệm:
1. **Object (Thực thể di sản độc bản):** Mỗi hiện vật là một bản thể có định danh chuẩn hóa (Canonical ID), tên nguyên bản tiếng Khmer, tiếng Việt, tiếng Anh và số kiểm kê bảo tàng gốc.
2. **Media (Hình ảnh phân giải cao & Tư liệu đa phương tiện):** Ảnh chụp chi tiết nguyên bản, hỗ trợ phóng to toàn màn hình, các góc chụp phụ bản trong bộ sưu tập (Gallery) và bản thu âm di sản.
3. **Provenance (Minh bạch ba tầng dữ liệu & Bản quyền):** Viện lưu trữ gốc, giấy phép (Public Domain / CC0 / CC BY-SA), đường dẫn truy xuất trực tiếp và hệ thống sinh trích dẫn học thuật tự động (APA, Chicago, EFEO, BibTeX).
4. **Relationships (Đồ thị tri thức liên kết):** Mối quan hệ hữu cơ giữa Hiện vật $\leftrightarrow$ Đền đài $\leftrightarrow$ Thời kỳ lịch sử $\leftrightarrow$ Phong cách nghệ thuật $\leftrightarrow$ Vua chúa trị vì.
5. **Exploration (Khám phá chuyên sâu):** Phân hệ trải nghiệm đa giác quan gồm Văn bia cổ (Epigraphy), Dàn nhạc hoàng gia Pinpeat, Bản đồ di tích không gian và Trục thời gian lịch sử.

---

## 2. KIẾN TRÚC PHÂN LOẠI 6 KHÔNG GIAN BẢO TÀNG CHUYÊN ĐỀ

Hệ thống 73 hiện vật đã được giám tuyển thành 6 không gian trưng bày chủ đề:

### 2.1. Khảo Cổ & Điêu Khắc Đá Sa Thạch (Sandstone Masterpieces of Angkor)
- **Đặc trưng:** Các pho tượng đá sa thạch nguyên khối thể hiện các vị thần Hindu giáo (Vishnu, Shiva, Brahma, Harihara, Ganesha) và chư Phật, Bồ Tát thời kỳ Angkor.
- **Hiện vật tiêu biểu:** Tượng Thần Vishnu Anantasayin (West Mebon), Tượng Vua Jayavarman VII ngồi thiền, Nữ thần Prajnaparamita.

### 2.2. Tượng Đồng Thần Thoại & Phật Giáo (Khmer Sacred Bronzes)
- **Đặc trưng:** Nghệ thuật đúc đồng tinh xảo với kỹ thuật sáp chảy (lost-wax casting), thể hiện nét thanh thoát và linh thiêng của điêu khắc kim loại Khmer.
- **Hiện vật tiêu biểu:** Thần Shiva đứng (Koh Ker style), Tượng Bồ Tát Avalokiteshvara 4 tay, Chuông đồng nghi lễ Angkor.

### 2.3. Kiến Trúc & Quần Thể Đền Đài (Monuments & Temple Architecture)
- **Đặc trưng:** Các kỳ quan đền núi sa thạch và đá ong mô phỏng núi thiêng Meru trung tâm vũ trụ luận.
- **Di tích tiêu biểu:** Angkor Wat, Đền Bayon (Angkor Thom), Banteay Srei, Preah Khan, Ta Prohm, Sambor Prei Kuk.

### 2.4. Văn Bia Cổ & Kinh Lá Buông (Epigraphy & Sacred Manuscripts)
- **Đặc trưng:** Di sản văn tự khắc trên đá và chép trên lá buông (Olan) bằng chữ Khmer cổ và Phạn ngữ, ghi lại các sắc lệnh hoàng gia, hiến tặng đền thờ và triết học tôn giáo.
- **Tư liệu tiêu biểu:** Văn bia K.292 Baphuon, Văn bia K.53 Sdok Kok Thom, Kinh Phật lá buông thế kỷ 18-19.

### 2.5. Di Sản Phi Vật Thể & Nhạc Cụ Pinpeat (Living Traditions & Traditional Music)
- **Đặc trưng:** Âm nhạc nghi lễ cung đình và nghệ thuật múa thiêng Apsara được UNESCO công nhận là Kiệt tác Di sản Truyền khẩu và Phi vật thể của nhân loại.
- **Nội dung:** Dàn nhạc Pinpeat với các nhạc cụ Roneat Ek, Sampho, Kong Vong Touch, Sralai cùng luồng âm thanh lưu trữ UNESCO 1968.

### 2.6. Tư Liệu Khảo Cứu Lịch Sử & Bản Đồ (Historical Archives & Cartography)
- **Đặc trưng:** Bản đồ cổ thế kỷ 17–19 và ảnh tư liệu khảo cổ đầu thế kỷ 20 từ Thư viện Quốc hội Mỹ (LOC) và Viện Viễn Đông Bác cổ (EFEO).
- **Tư liệu tiêu biểu:** Bản đồ Đông Nam Á của Sanson (1654), Ảnh tư liệu thám hiểm Angkor thế kỷ 19 của John Thomson.

---

## 3. CƠ CHẾ MINH BẠCH BA TẦNG DỮ LIỆU (3-TIER TRANSPARENCY)

| Tầng Dữ Liệu | Nguồn Gốc | Cơ Chế Kiểm Soát & Hiển Thị |
| :--- | :--- | :--- |
| **Tầng 1 (Source Original)** | The Met, Smithsonian, LOC, NMC/Wikimedia, Internet Archive/EFEO | Dữ liệu nguyên văn từ hồ sơ bảo tàng gốc. Hiển thị nhãn bảo chứng màu lục `Xác Thực Nguồn Bảo Tàng Gốc`, liên kết trực tiếp URL gốc và số kiểm kê. |
| **Tầng 2 (Derived & Normalized)** | Đội ngũ giám tuyển & Nhà nghiên cứu | Chuẩn hóa định danh, niên đại học thuật, bối cảnh lịch sử, liên kết đồ thị quan hệ và điểm chạm đồ tượng (hotspots). |
| **Tầng 3 (AI-Assisted)** | Gemini AI Curator Assistant | Trợ lý giám tuyển số hỗ trợ trả lời câu hỏi và so sánh đối chiếu đa chiều. Luôn dán nhãn minh bạch `AI-Assisted Exploration`. |

---

## 4. TÍNH NĂNG TƯƠNG TÁC ĐA PHƯƠNG TIỆN

1. **Trình Xem Ảnh Phân Giải Cao & Zoom Toàn Màn Hình:**
   - Hỗ trợ phóng to chi tiết từng đường chạm khắc hoa văn, nếp gấp y phục sa thạch.
2. **Điểm Chạm Đồ Tượng Học (Interactive Hotspots):**
   - Đính trực tiếp các điểm neo giải mã biểu tượng học trên bề mặt hiện vật (ấn quyết, linh vật tọa kỵ, mũ miện).
3. **Thuyết Minh Âm Thanh Học Thuật (Academic Audio Guide):**
   - Tích hợp giọng đọc thuyết minh chuyên sâu về bối cảnh lịch sử và ý nghĩa tâm linh.
4. **Trình Hòa Âm Dàn Nhạc Cung Đình Pinpeat:**
   - Bộ tổng hợp âm thanh đa sóng mô phỏng chính xác tần số và âm sắc tự nhiên của từng nhạc cụ gỗ, đồng thau và da thuộc truyền thống.
5. **Bộ Công Cụ Tạo Trích Dẫn Học Thuật 1-Click:**
   - Hỗ trợ đầy đủ 4 chuẩn trích dẫn quốc tế: APA 7th, Chicago 17th, EFEO Citation Standard và mã BibTeX.
