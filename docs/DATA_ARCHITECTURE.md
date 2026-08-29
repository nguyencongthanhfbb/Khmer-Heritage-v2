# DATA ARCHITECTURE — KHMER HERITAGE

## 1. MÔ HÌNH DỮ LIỆU ĐỒ THỊ TRI THỨC (CULTURAL KNOWLEDGE GRAPH)

Mô hình dữ liệu của Khmer Heritage được tổ chức theo cấu trúc đồ thị liên kết, trong đó các đối tượng di sản không đứng riêng lẻ mà tương tác chặt chẽ với nhau:

```
[ THỜI KỲ (Period) ] ◄─── (thuộc thời kỳ) ───┐
                                              │
[ VUA / NHÂN VẬT (Ruler/Person) ] ◄── (xây dựng / bảo trợ) ───┤
                                                              │
[ THẦN THOẠI / BIỂU TƯỢNG (Concept) ] ◄── (thờ phụng / chạm khắc) ───┼──► [ DI TÍCH / ĐỀN ĐÀI (Place) ]
                                                              │            │
[ BỘ SƯU TẬP (Collection) ] ◄── (phân loại vào) ──────────────┼── (phát hiện tại)
                                                              │            │
[ BẢN THẢO / VĂN BIA (Manuscript) ] ◄── (ghi chép lịch sử) ───┤            ▼
                                                              │    [ HIỆN VẬT / ĐIÊU KHẮC (Artifact) ]
[ NGUỒN BẢO TÀNG (Provenance) ] ◄── (lưu trữ / cấp phép) ─────┘            │
                                                                           ▼
                                                              [ TƯ LIỆU ĐA PHƯƠNG TIỆN (Media) ]
```

---

## 2. QUY TRÌNH CHUẨN HÓA & TRUY XUẤT (CANONICAL DEDUPLICATION)

1. **Entity Deduplication**: Nhiều bảo tàng hoặc tài liệu có thể gọi cùng một ngôi đền hoặc bức tượng bằng các tên gọi khác nhau (ví dụ: *Banteay Srei* vs *Banteay Srey* vs *Citrasena*). Hệ thống gộp về một `Canonical Entity ID` duy nhất, lưu giữ tất cả các tên gọi thay thế (`alternateTitles`) cùng liên kết đến từng nguồn bảo tàng gốc.
2. **Indexing Layer**: Hệ thống tạo các bộ chỉ mục nhẹ (Indexes) theo: Thời kỳ, Địa điểm, Loại hình và Chất liệu, giúp tải ứng dụng tức thì mà không cần tải toàn bộ kho dữ liệu cùng lúc.
