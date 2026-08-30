# KH-022 — MUSEUM CONTENT CORPUS ARCHITECTURE & INVENTORY SPECIFICATION

**Dự án:** Khmer Heritage — Digital Museum  
**Mã nhiệm vụ:** KH-022  
**Phiên bản Bundle:** 2.2.0  
**Trạng thái:** COMPLETED & VERIFIED  

---

## 1. TỔNG QUAN & NGUYÊN TẮC BẢO TÀNG SỐ (CORE PRINCIPLES)

Giai đoạn KH-022 mở rộng Digital Museum từ 73 hiện vật xác thực thành một **Museum Content Corpus** có chiều sâu thực tế, tuân thủ nghiêm ngặt 5 nguyên tắc cốt lõi:

1. **Original Content First**: Mọi hiện vật đều bảo lưu toàn vẹn các trường thông tin nguyên gốc từ viện bảo tàng lưu trữ (`original_title`, `original_description`, `original_date`, `original_creator`, `original_material`, `original_dimensions`, `original_location`, `original_collection`, `original_credit_line`, `original_accession`, `original_source_url`).
2. **Real Media Only**: Không sử dụng ảnh AI tổng hợp hay ảnh minh họa giả. 100% hình ảnh, bản đồ và bản ghi âm là tư liệu bảo tàng thực từ các kho lưu trữ công khai uy tín.
3. **Strict License Gate**: Áp dụng cơ chế Fail-Closed. Chỉ các giấy phép đạt chuẩn Open Access / Public Domain (`CC0`, `Public Domain`, `CC BY`, `CC BY-SA`, `Institutional Open Access`) mới được công bố. Dữ liệu hạn chế bản quyền được chuyển vào khu vực cách ly (`Quarantine`).
4. **Data-Driven Relationships**: Toàn bộ liên kết trong Đồ thị Tri thức (Knowledge Graph) được xây dựng dựa trên bằng chứng dữ liệu thực tế (niên đại, phong cách, địa danh khảo cổ, cơ quan lưu trữ), không suy đoán lịch sử.
5. **No Mass Crawling / No Storage Explosion**: Xây dựng danh mục Media Manifest định hướng khai thác, không thực hiện tải hàng loạt hàng trăm nghìn tệp dữ liệu không kiểm soát.

---

## 2. PHÂN BỐ NGUỒN BẢO TÀNG & GIẤY PHÉP (PROVENANCE & LICENSING BREAKDOWN)

Corpus bao gồm **73 hiện vật xác thực** được chuẩn hóa từ 5 hệ thống bảo tàng và viện nghiên cứu quốc tế:

| Tổ chức lưu trữ | Số lượng hiện vật | Loại hình giấy phép | Trạng thái thẩm định |
| :--- | :---: | :---: | :---: |
| **The Metropolitan Museum of Art (The Met)** | 60 | CC0 1.0 Universal | 100% Verified Open Access |
| **Smithsonian National Museum of Asian Art** | 4 | CC0 1.0 Universal | 100% Verified Open Access |
| **Library of Congress (Prints & Photographs)** | 3 | Public Domain | 100% Verified No Restrictions |
| **Bảo tàng Quốc gia Campuchia & Wikimedia** | 4 | CC BY-SA / CC BY / PD | 100% Verified Attribution |
| **Internet Archive & EFEO Archival Collection** | 2 | Public Domain / Open Audio | 100% Verified Scholarly Open |
| **TỔNG CỘNG** | **73** | **100% Open / Free** | **7/7 QUALITY GATES PASS** |

---

## 3. PHÂN LOẠI THỂ LOẠI DI SẢN (TAXONOMY BREAKDOWN)

Corpus được phân bổ cân đối qua các nhánh thể loại di sản văn hóa Khmer:

- **Điêu khắc đá & Cổ vật kim loại (`artifact`)**: 66 hiện vật (Tượng Phật Naga, tượng Thần Vishnu, tượng Nữ thần Devi, phù điêu Lanh-tô, pháp khí đồ đồng).
- **Tư liệu khảo sát & Nhiếp ảnh lịch sử (`media_record`)**: 2 tài liệu (Bản đồ trắc địa Angkor Wat 1900, ảnh phim chụp đền Bayon 1910 từ Library of Congress).
- **Văn bia & Khảo cứu hàn lâm (`manuscript`)**: 3 tài liệu (Tuyển tập văn bia Khmer cổ George Cœdès - EFEO, bản thảo Phật giáo).
- **Âm nhạc & Di sản sống (`art_form`)**: 2 hồ sơ (Đại hòa tấu Sathukar - Dàn nhạc Pinpeat 1968, Đàn Roneat Ek).

---

## 4. CẤU TRÚC GÓI DỮ LIỆU ĐỘC LẬP (CONTENT BUNDLE ARCHITECTURE)

Toàn bộ corpus được đóng gói dạng tệp tĩnh (Static Content Bundles) trong thư mục `/content/`, cho phép ứng dụng vận hành mượt mà không phụ thuộc trực tiếp vào cơ sở dữ liệu:

```text
content/
├── objects/
│   ├── objects_bundle.json         # Danh mục 73 hiện vật đầy đủ
│   ├── by_type/                    # Phân vùng theo loại hình (artifact, media_record, manuscript, art_form)
│   └── by_period/                  # Phân vùng theo thời kỳ (funan, chenla, angkor, post-angkor, modern)
├── collections/
│   └── collections_bundle.json     # 6 bộ sưu tập chuyên đề với liên kết thành viên
├── places/
│   └── places_bundle.json          # 15 địa danh khảo cổ và tọa độ GPS
├── institutions/
│   └── institutions_bundle.json    # 8 tổ chức bảo tồn và chính sách bản quyền
├── media/
│   ├── media_manifest.json         # 224 tệp media xác thực
│   └── pilot_media_manifest.json   # 20 tệp thử nghiệm pipeline
├── relationships/
│   └── relationships_bundle.json   # 562 liên kết đồ thị tri thức
├── manifests/
│   ├── corpus_manifest.json        # Bản kê tổng hợp siêu dữ liệu
│   └── quality_report.json         # Báo cáo kiểm định chất lượng tự động
└── quarantine/
    └── quarantine_log.json         # Nhật ký cách ly bản quyền
```
