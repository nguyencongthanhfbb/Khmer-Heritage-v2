# BÁO CÁO TOÀN DIỆN KH-020 — MULTI-INSTITUTION AUTHENTIC CORPUS EXPANSION

**Dự án:** Khmer Heritage — Bảo Tàng Số Di Sản Văn Hóa Khmer
**Mã nhiệm vụ:** KH-020
**Trạng thái:** HOÀN THÀNH TOÀN DIỆN (100% PASS)
**Ngày thực hiện:** 30/08/2026

---

## 1. TỔNG QUAN MỤC TIÊU & KẾT QUẢ ĐẠT ĐƯỢC

Tiếp nối kết quả thẩm định nghiêm ngặt tại **KH-019R**, nhiệm vụ **KH-020** mở rộng quy mô kho lưu trữ di sản số Khmer từ đơn nguồn (*The Metropolitan Museum of Art*) sang **mô hình đa viện bảo tàng và viện nghiên cứu quốc tế (Multi-Institution Digital Heritage Corpus)**.

Tất cả các thực thể được nạp vào hệ thống đều tuân thủ nghiêm ngặt:
- **Nguyên tắc bản quyền mở & minh bạch**: 100% các đối tượng sở hữu giấy phép hợp lệ (*CC0 1.0 Universal, Public Domain Mark, CC BY-SA 4.0/3.0, CC BY 4.0*).
- **Cơ chế kiểm duyệt bản quyền tự động (License Gate)**: Chặn đứng mọi hiện vật hạn chế bản quyền thương mại (*NC*), không cho phép phái sinh (*ND*), hoặc không rõ nguồn gốc (*Unknown*).
- **Cơ chế khử trùng lặp (De-duplication & Entity Resolution)**: Định danh duy nhất theo mã chuẩn hóa tiền tố bảo tàng (`kh-met-*`, `kh-si-*`, `kh-loc-*`, `kh-nmc-*`, `kh-ia-*`).
- **Đa dạng hóa thể loại di sản**: Bổ sung đầy đủ 4 phân nhóm thực thể di sản (*artifact, place, art_form, manuscript, media_record*).

---

## 2. BẢNG TỔNG HỢP NGUỒN NẠP VÀ THỐNG KÊ QUY MÔ CORPUS

| Viện Bảo Tàng / Nguồn Lưu Trữ | Mã Tiền Tố | Số Lượng Hiện Vật | Phân Loại Giấy Phép | Tình Trạng Xác Thực |
| :--- | :---: | :---: | :---: | :---: |
| **The Metropolitan Museum of Art** (New York) | `kh-met-*` | **60** | CC0 1.0 Universal | 100% PASS |
| **Smithsonian National Museum of Asian Art** (Washington D.C.) | `kh-si-*` | **4** | CC0 Open Access | 100% PASS |
| **Library of Congress** (Washington D.C.) | `kh-loc-*` | **3** | Public Domain | 100% PASS |
| **Bảo tàng Quốc gia Campuchia / Wikimedia Commons** | `kh-nmc-*`, `kh-art-*`, `kh-tex-*`, `kh-ins-*` | **4** | CC BY-SA / CC BY / Public Domain | 100% PASS |
| **Internet Archive & EFEO Heritage Archives** | `kh-ia-*` | **2** | Public Domain | 100% PASS |
| **TỔNG CỘNG CORPUS HOÀN CHỈNH** | — | **73** | 100% Bản quyền mở | **100% PASS** |

---

## 3. CƠ CẤU THỂ LOẠI DI SẢN (CORPUS COMPOSITION)

1. **Điêu Khắc Tượng Tròn & Đồ Đồng Hoàng Gia (`artifact`)**: **66** hiện vật
   - *Bao gồm*: Tượng thần Shiva, Vishnu, Bồ tát Lokeshvara, Prajnaparamita, Phật thiền định Mucalinda, đầu tượng đồng khổng lồ West Mebon, trướng lụa thần thoại Pidan Hol.
2. **Kinh Sách Lá Buông & Văn Bia Khắc Đá Cổ (`manuscript`)**: **3** hồ sơ tư liệu
   - *Bao gồm*: Bản thảo kinh lá buông Sastra Slekrith (LOC), Văn bia đá cổ thế kỷ 7 K.904 (NMC/EFEO), Bộ tuyển tập khảo khắc bia ký Campuchia George Cœdès (EFEO/IA).
3. **Di Sản Phi Vật Thể & Nhạc Cụ Truyền Thống (`art_form`)**: **2** đối tượng
   - *Bao gồm*: Đàn mộc cầm Roneat Ek dàn đại nhạc Pinpeat, Khúc nhạc thiêng mở màn nghi lễ hoàng gia Sathukar (UNESCO/IA 1968 Audio Recording).
4. **Tư Liệu Bản Đồ Khảo Cổ & Nhiếp Ảnh Lịch Sử (`media_record`)**: **2** tài liệu
   - *Bao gồm*: Bản đồ khảo cổ học quần thể Angkor 1908 (LOC Geography & Map Division), Bộ ảnh tư liệu lịch sử Angkor Wat & Bayon 1920 (LOC Prints & Photographs Division).

---

## 4. KIẾN TRÚC INGESTION PIPELINE ĐA NGUỒN

Hệ thống crawler và adapter được tổ chức độc lập theo nguyên tắc hướng module:
- `server/crawler/smithsonianAdapter.ts`: Bộ chuyển đổi bản ghi Open Access từ Smithsonian National Museum of Asian Art.
- `server/crawler/locAdapter.ts`: Bộ chuyển đổi bản ghi tư liệu bản đồ, ảnh cổ và bản thảo lá buông từ Thư viện Quốc hội Mỹ (LOC).
- `server/crawler/wikimediaAdapter.ts`: Bộ chuyển đổi tư liệu ảnh mở có bản quyền CC BY/CC BY-SA về báu vật Bảo tàng Quốc gia Campuchia và nhạc cụ truyền thống.
- `server/crawler/archiveAdapter.ts`: Bộ chuyển đổi âm thanh nghi lễ và tài liệu khảo cứu học thuật EFEO từ Internet Archive.
- `server/crawler/multiSourceManager.ts`: Bộ điều phối trung tâm thực thi lọc trùng, kiểm duyệt License Gate, cập nhật chỉ mục tìm kiếm và đồng bộ hóa `crawledMuseumData.json`.

---

## 5. CÁC TÀI LIỆU VÀ ARTIFACT ĐÃ PHÁT HÀNH

- `content/discovery/discovery_log.json`: Nhật ký thu thập dữ liệu nguồn.
- `content/inventory/master_inventory.json`: Danh mục kiểm kê 73 đối tượng di sản với đầy đủ mã định danh, bảo tàng sở hữu, số đăng ký và liên kết nguồn.
- `content/manifests/corpus_manifest.json`: Bản kê phân bố bản quyền và thống kê toàn bộ corpus.
- `src/data/crawledMuseumData.json`: Tệp dữ liệu sản xuất đã đồng bộ 73 đối tượng.

---

## 6. KẾT LUẬN & SẴN SÀNG VẬN HÀNH

Nhiệm vụ **KH-020** đã hoàn thành xuất sắc toàn bộ chỉ tiêu, đưa **Khmer Heritage** trở thành một nền tảng bảo tàng số đích thực với sự kết nối đa viện bảo tàng quốc tế uy tín, dữ liệu sạch 100%, có bằng chứng chứng minh rõ ràng ở từng trường dữ liệu.
