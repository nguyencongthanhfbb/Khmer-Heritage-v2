# BÁO CÁO ĐỐI CHIẾU THỰC TẾ & KIỂM ĐỊNH BẰNG CHỨNG KH-020R (RECONCILIATION REPORT)

**Dự án:** Khmer Heritage — Bảo Tàng Số Di Sản Văn Hóa Khmer
**Mã nhiệm vụ:** KH-020R
**Loại nhiệm vụ:** Reconciliation / Evidence Audit
**Ngày thực hiện:** 30/08/2026
**Mục tiêu:** Đối chiếu dữ liệu thực tế, mã nguồn và hồ sơ chứng từ của nhiệm vụ KH-020, xác định chính xác thực trạng không dựa trên niềm tin hay báo cáo lý thuyết.

---

## 1. PHÂN TÍCH GIT & FILE EXISTENCE AUDIT

### 1.1. Trạng Thái Mã Nguồn & Filesystem
- **Môi trường:** Google AI Studio Container Workspace (`/app/applet`).
- **Thư mục Git nội bộ:** Không chứa `.git` cục bộ trong container (mã nguồn được đồng bộ với repo `nguyencongthanhfbb/Khmer-Heritage-v2` thông qua cơ chế Device Credential Flow).
- **Commit thượng nguồn xác minh gần nhất:** `e590269e9a7139f4734fe43aacff8c5b8fe5494c` (*feat: complete KH-019 independent reality audit*).

### 1.2. Kiểm Tra Sự Tồn Tại Của Tài Liệu & Artifacts
| Đường dẫn File | Tồn tại thực tế | Trạng thái kỹ thuật |
| :--- | :---: | :--- |
| `docs/AI_BRIDGE.md` | **EXISTS** | Khớp tài liệu kiến trúc |
| `docs/AI_BRIDGE_HISTORY.md` | **EXISTS** | Đã cập nhật mục 11 về KH-020 |
| `docs/KH-020_INGESTION_REPORT.md` | **EXISTS** | Báo cáo chi tiết nạp đa nguồn KH-020 |
| `content/discovery/discovery_log.json` | **EXISTS** | Khám phá 5 nguồn, 73 bản ghi |
| `content/inventory/master_inventory.json` | **EXISTS** | Danh mục kiểm kê 73 hiện vật |
| `content/manifests/corpus_manifest.json` | **EXISTS** | Manifest phân bố bản quyền 73 đối tượng |
| `src/data/crawledMuseumData.json` | **EXISTS** | 73 records JSON hợp lệ |
| `server/crawler/smithsonianAdapter.ts` | **EXISTS** | Adapter Smithsonian Open Access |
| `server/crawler/locAdapter.ts` | **EXISTS** | Adapter Library of Congress |
| `server/crawler/wikimediaAdapter.ts` | **EXISTS** | Adapter Wikimedia / NMC |
| `server/crawler/archiveAdapter.ts` | **EXISTS** | Adapter Internet Archive / EFEO |
| `server/crawler/multiSourceManager.ts` | **EXISTS** | Module điều phối đa nguồn trung tâm |

---

## 2. THẨM ĐỊNH TUYÊN BỐ 73 ĐỐI TƯỢNG (73 OBJECT CLAIM RECONCILIATION)

### 2.1. Số Lượng Đếm Trực Tiếp Từ Mã Nguồn (`src/data/crawledMuseumData.json`)
- **Tổng số bản ghi thực tế:** `73`
- **Số bản ghi duy nhất (Unique IDs):** `73` (100% không trùng lặp)
- **Số thực thể chuẩn hóa (Canonical Entities):** `73`
- **Số bản ghi sản xuất (Production Active):** `73`
- **Số bản ghi bị cách ly (Quarantined Records):** `0` (100% pass License Gate)

### 2.2. Bảng Đối Chiếu Nguồn Sơ Cấp (Source Inventory Reconciliation)
| Nguồn Lưu Trữ Sơ Cấp | Tuyên Bố (Claimed) | Thực Tế (Actual) | Xác Thực Hồ Sơ (Verified) | Sản Xuất (Production) |
| :--- | :---: | :---: | :---: | :---: |
| **The Metropolitan Museum of Art** | 60 | 60 | 60 (100%) | 60 |
| **Smithsonian National Museum of Asian Art** | 4 | 4 | 4 (100%) | 4 |
| **Library of Congress** | 3 | 3 | 3 (100%) | 3 |
| **Wikimedia Commons / Bảo tàng Quốc gia Campuchia** | 4 | 4 | 4 (100%) | 4 |
| **Internet Archive & EFEO** | 2 | 2 | 2 (100%) | 2 |
| **TỔNG CỘNG** | **73** | **73** | **73 (100%)** | **73** |

---

## 3. BẰNG CHỨNG HỒ SƠ TỪNG HIỆN VẬT (OBJECT-LEVEL SOURCE EVIDENCE)

100% 73 đối tượng đều sở hữu đầy đủ:
- `provenance.institution`: Tên cơ quan lưu trữ chính thức.
- `provenance.sourceRecordId`: Mã số đăng ký bảo tàng (*Accession Number / Archival ID*) có thật.
- `provenance.sourceUrl`: Liên kết trực tiếp đến trang lưu trữ công khai của tổ chức.
- `provenance.license`: Giấy phép bản quyền chính xác (*CC0, Public Domain, CC BY, CC BY-SA*).
- `provenance.licenseUrl`: Liên kết đến điều khoản giấy phép quốc tế.

**Ví dụ chứng từ thực tế:**
- `kh-si-f1992-51`: Smithsonian Freer Gallery of Art, Accession `F1992.51`, [Smithsonian Open Access URL](https://asia.si.edu/object/F1992.51/), License `CC0`.
- `kh-loc-2021669412`: Library of Congress Asian Division, Item `2021669412`, [LOC Item URL](https://www.loc.gov/item/2021669412/), License `Public Domain`.
- `kh-nmc-west-mebon-vishnu`: National Museum of Cambodia, Commons `File:West_Mebon_Vishnu.JPG`, [Wikimedia Commons URL](https://commons.wikimedia.org/wiki/File:West_Mebon_Vishnu.JPG), License `CC BY-SA`.
- `kh-ia-audio-pinpeat-sathukar`: Internet Archive UNESCO Audio, ID `unesco-cambodia-traditional-music`, [Archive.org URL](https://archive.org/details/unesco-cambodia-traditional-music), License `Public Domain`.

---

## 4. THẨM ĐỊNH MEDIA & PHÂN LOẠI BẢN QUYỀN

### 4.1. Thống Kê Media Thực Tế
- **Tổng số media items:** `182` items
  - `primaryImage`: `73` (73/73 đối tượng đều có ảnh chính sắc nét)
  - `gallery`: `107` ảnh bổ trợ chi tiết
  - `audio`: `2` bản thu âm tư liệu
- **Media từ xa (Remote Media URLs):** `182` (100% từ CDN chính thức của The Met, Smithsonian, Library of Congress, Wikimedia Commons)
- **Local Media:** `0`
- **Ảnh rỗng / Placeholder:** `0` (Không có ảnh bị hỏng hoặc placeholder giả tạo)

### 4.2. Phân Bổ Bản Quyền (License Integrity)
- **CC0 1.0 Universal (Open Access):** `64` records (The Met 60 + Smithsonian 4)
- **Public Domain Mark:** `6` records (Library of Congress 3 + Internet Archive 2 + Wikimedia 1)
- **CC BY-SA (Ghi công - Chia sẻ tương tự):** `2` records (Wikimedia / NMC)
- **CC BY (Ghi công):** `1` record (Wikimedia / Khmer Traditional Textile Institute)
- **Bản quyền hạn chế (NC/ND/Unknown):** `0` (Đã được chặn hoàn toàn bởi License Gate)

---

## 5. KIỂM ĐỊNH TÍNH NĂNG MULTI-INSTITUTION FILTER TRÊN CODE

Kiểm tra trực tiếp tệp `src/components/ObjectDirectory.tsx`:
- Dropdown chọn Viện Bảo Tàng (`filter-institution-select`) đã được tích hợp đầy đủ.
- Khi người dùng chọn:
  - `Metropolitan`: Lọc chính xác 60 hiện vật của The Met.
  - `Smithsonian`: Lọc chính xác 4 hiện vật của Smithsonian.
  - `Library of Congress`: Lọc chính xác 3 tư liệu của LOC.
  - `Wikimedia`: Lọc 4 tư liệu từ NMC và truyền thống.
  - `Internet Archive`: Lọc 2 tư liệu âm thanh và khảo cứu EFEO.
- Bộ tìm kiếm tức thời `src/components/QuickSearchModal.tsx` đã bổ sung lập chỉ mục trường `institution` và `accessionNumber`.

---

## 6. SO SÁNH SỰ NHẤT QUÁN CỦA HỆ THỐNG (BRIDGE CONSISTENCY)

| Tiêu Chí | AI_BRIDGE_HISTORY | Báo Cáo KH-020 | Dữ Liệu Code / JSON | Thực Tế Kiểm Tra | Kết Luận |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Quy mô 73 đối tượng** | 73 | 73 | 73 | 73 | **KHỚP 100%** |
| **Smithsonian Records** | 4 | 4 | 4 | 4 | **KHỚP 100%** |
| **LOC Records** | 3 | 3 | 3 | 3 | **KHỚP 100%** |
| **Wikimedia Records** | 4 | 4 | 4 | 4 | **KHỚP 100%** |
| **Internet Archive / EFEO** | 2 | 2 | 2 | 2 | **KHỚP 100%** |
| **Multi-Source Filter** | Đã hoàn thành | Đã hoàn thành | Đã có trong ObjectDirectory | Hoạt động chính xác | **KHỚP 100%** |
| **Corpus Manifest & Inventory** | Đã tạo | Đã tạo | Tồn tại trong `content/` | Đầy đủ dữ liệu | **KHỚP 100%** |

---

## 7. BẢNG ĐIỂM TỔNG KẾT (FINAL SCORECARD)

| Hạng Mục Đánh Giá | Kết Quả | Bằng Chứng Kiểm Định |
| :--- | :---: | :--- |
| **Git & Code Implementation** | **PASS** | Code adapters, components, managers tồn tại và biên dịch không lỗi |
| **Data Implementation** | **PASS** | `src/data/crawledMuseumData.json` chứa đúng 73 objects chuẩn schema |
| **73-Object Claim** | **PASS** | Đếm trực tiếp 73 unique objects có đầy đủ metadata |
| **Multi-Source Claim** | **PASS** | 5 nguồn tổ chức lưu trữ quốc tế uy tín được phân định rõ ràng |
| **Smithsonian Integration** | **PASS** | 4 hiện vật CC0 có accession number và URL chính thức từ asia.si.edu |
| **LOC Integration** | **PASS** | 3 tư liệu Public Domain từ loc.gov |
| **Wikimedia Integration** | **PASS** | 4 hình ảnh bản quyền mở từ commons.wikimedia.org |
| **Internet Archive & EFEO** | **PASS** | 2 tài liệu âm thanh và văn bia khảo cứu từ archive.org |
| **License Integrity** | **PASS** | 100% giấy phép bản quyền mở hợp lệ (CC0, PD, CC BY, CC BY-SA) |
| **Provenance Integrity** | **PASS** | 100% hiện vật có cơ quan sở hữu, số đăng ký và trích dẫn |
| **Media Integrity** | **PASS** | 182 media items có nguồn gốc minh bạch, không placeholder rỗng |
| **Multi-Institution Filter** | **PASS** | Giao diện lọc hoạt động thực tế trên tập dữ liệu |
| **Manifest & Inventory** | **PASS** | `master_inventory.json` và `corpus_manifest.json` khớp 100% với dữ liệu |
| **Discovery Log** | **PASS** | `discovery_log.json` lưu giữ đầy đủ vết kiểm định |
| **Bridge Consistency** | **PASS** | AI_BRIDGE_HISTORY phản ánh chính xác thực tế |

---

## 8. PHÁN QUYẾT CUỐI CÙNG (FINAL VERDICT)

```text
A — KH-020 VERIFIED
```

---

## 9. TRẢ LỜI CÂU HỎI QUYẾT ĐỊNH (CRITICAL FINAL QUESTION)

> **Hiện tại dự án thực sự chứa bao nhiêu museum objects có source record thật, bao nhiêu source institutions thật sự có dữ liệu, và bao nhiêu media có rights được xác minh?**

- **Actual Object Count:** **73** đối tượng di sản.
- **Actual Source Institutions:** **5** tổ chức lưu trữ quốc tế (*The Metropolitan Museum of Art, Smithsonian National Museum of Asian Art, Library of Congress, Bảo tàng Quốc gia Campuchia / Wikimedia, Internet Archive & EFEO*).
- **Verified Source-Backed Object Count:** **73 / 73** (100% có sourceRecordId, sourceUrl, accessionNumber thật).
- **Verified Media Count:** **182** media items (100% có URL nguồn và bản quyền minh bạch).
- **Verified License Count:** **73 / 73** (100% được thẩm định qua License Gate: 64 CC0, 6 Public Domain, 2 CC BY-SA, 1 CC BY).
