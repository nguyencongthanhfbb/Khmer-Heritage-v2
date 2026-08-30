# KH-022 — PROGRAMMATIC DATA QUALITY REPORT

**Dự án:** Khmer Heritage  
**Mã nhiệm vụ:** KH-022  
**Thời gian kiểm định:** 2026-08-30  
**Kết luận tổng thể:** **PASS (7/7 QUALITY GATES)**  

---

## 1. BẢNG TỔNG HỢP CHỈ SỐ ĐỊNH LƯỢNG (QUANTITATIVE METRICS)

Toàn bộ số liệu dưới đây được tạo hoàn toàn tự động thông qua `server/pipeline/qualityAuditor.ts`, không can thiệp thủ công:

```json
{
  "totalRecordsDiscovered": 73,
  "productionEligible": 73,
  "quarantinedCount": 0,
  "canonicalObjectsCount": 73,
  "duplicateRecordsMerged": 0,
  "objectsMissingMedia": 0,
  "objectsMissingMetadata": 0,
  "licenseCoverage": {
    "CC0": 64,
    "Public Domain": 6,
    "CC BY-SA": 1,
    "CC BY": 2
  },
  "sourceCoverage": {
    "The Metropolitan Museum of Art (The Met)": 60,
    "Smithsonian National Museum of Asian Art": 4,
    "Library of Congress": 3,
    "National Museum of Cambodia / Wikimedia": 4,
    "Internet Archive & EFEO": 2
  },
  "totalRelationalEdges": 562,
  "totalCatalogedMediaAssets": 224,
  "pilotMediaAssets": 20,
  "verdict": "PASS"
}
```

---

## 2. KẾT QUẢ KIỂM ĐỊNH TỪNG CỔNG CHẤT LƯỢNG (QUALITY GATES AUDIT)

| Cổng kiểm định (Quality Gate) | Số lượng kiểm tra | Lỗi phát hiện | Tỷ lệ đạt | Diễn giải kỹ thuật |
| :--- | :---: | :---: | :---: | :--- |
| **`SOURCE_EXISTS`** | 73 | 0 | **100%** | 100% đối tượng có nguồn viện bảo tàng và liên kết URL gốc hoạt động. |
| **`LICENSE_VERIFIED`** | 73 | 0 | **100%** | 100% đối tượng được cấp phép Open Access hợp lệ (CC0, PD, CC BY, CC BY-SA). |
| **`SCHEMA_VALID`** | 73 | 0 | **100%** | 100% đối tượng tuân thủ tuyệt đối cấu trúc giao diện `HeritageObject`. |
| **`NO_FAKE_CONTENT`** | 73 | 0 | **100%** | 0% nội dung chứa đoạn văn bản giả định, stub hoặc bịa đặt AI. |
| **`PROVENANCE_PRESENT`** | 73 | 0 | **100%** | 100% đối tượng có số kiểm kê, trích dẫn học thuật và cơ quan bảo hộ. |
| **`MEDIA_REFERENCE_VALID`** | 73 | 0 | **100%** | 100% đối tượng có liên kết ảnh độ phân giải cao xác thực. |
| **`NO_DUPLICATE_CANONICAL_OBJECT`** | 73 | 0 | **100%** | Không có mã định danh canonical trùng lặp trong toàn bộ kho dữ liệu. |

---

## 3. KIỂM DUYỆT BẢN QUYỀN & CHÍNH SÁCH CÁCH LY (LICENSE GATE & QUARANTINE)

- **Cơ chế kiểm soát:** Thẩm định theo danh sách trắng (Whitelist) các loại giấy phép tự do.
- **Nguyên tắc Fail-Closed:** Bất kỳ hồ sơ nào có quyền sao chép không rõ ràng hoặc điều khoản hạn chế thương mại/cấm phái sinh khắt khe đều bị chuyển vào `quarantine_log.json`.
- **Hiện trạng:** Đợt phát hành KH-022 gồm 73 hiện vật đều có xuất xứ từ các bộ sưu tập Open Access toàn cầu, tỷ lệ tuân thủ bản quyền đạt 100%.
