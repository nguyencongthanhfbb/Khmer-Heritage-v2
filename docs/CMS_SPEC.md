# CMS & INGESTION SPECIFICATION — KHMER HERITAGE

## 1. NGUYÊN TẮC TIẾP NHẬN NỘI DUNG (INGESTION PROTOCOL)

Hệ thống tiếp nhận dữ liệu văn hóa theo quy trình 4 bước kiểm định nghiêm ngặt:

```
[ NGUỒN GỐC (Source) ]
        │
        ▼
[ 1. CỔNG BẢN QUYỀN (License Gate) ] ── (Vi phạm / Không rõ) ──► [ CÁCH LY (Quarantine) ]
        │ (Đạt chuẩn CC0 / CC BY / Public Domain)
        ▼
[ 2. CHUẨN HÓA THỰC THỂ (Entity Canonicalizer) ] ── Deduplication & Field Mapping
        │
        ▼
[ 3. XÁC THỰC HỌC THUẬT (Provenance & Citation Validator) ] ── Gắn nhãn số bảo tàng, URL gốc
        │
        ▼
[ 4. PHÁT HÀNH BẢO TÀNG SỐ (Museum Publishing) ] ── Sẵn sàng cho người dùng khám phá
```

---

## 2. QUY ĐỊNH BẢO VỆ DỮ LIỆU GỐC (ORIGINAL DATA PRESERVATION)
* Không ghi đè hoặc cắt ngắn thông tin trích dẫn của các bảo tàng.
* Tuyệt đối không thay thế thông tin gốc bằng nội dung AI tóm tắt khi chưa có sự đồng ý hoặc thiếu nhãn ghi chú rõ ràng.
