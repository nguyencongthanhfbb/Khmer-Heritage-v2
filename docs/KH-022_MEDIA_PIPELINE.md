# KH-022 — MEDIA MANIFEST & PROCESSING PIPELINE SPECIFICATION

**Dự án:** Khmer Heritage — Digital Museum  
**Mã nhiệm vụ:** KH-022  
**Phiên bản Pipeline:** 1.0.0  
**Tệp kê khai chính:** `/content/media/media_manifest.json`  

---

## 1. MỤC ĐÍCH & KIẾN TRÚC PIPELINE (PIPELINE ARCHITECTURE)

Media Pipeline của KH-022 được thiết kế nhằm giải quyết bài toán quản lý tài nguyên đa phương tiện dung lượng lớn mà không gây quá tải tài nguyên lưu trữ hoặc vi phạm bản quyền:

```text
+---------------------+
|   DISCOVER MEDIA    | (Quét ảnh, gallery, audio, video từ source records)
+----------+----------+
           |
           v
+---------------------+
|  VALIDATE LICENSE   | (Kiểm định CC0, Public Domain, CC BY, CC BY-SA)
+----------+----------+
           |
           v
+---------------------+
|   CATALOG MANIFEST  | (Ghi nhận metadata, resolution, MIME type, role)
+----------+----------+
           |
           v
+---------------------+
| PILOT BATCH PROCESS | (Chuẩn hóa biến thể ảnh: Hero 1200px, Gallery 600px, Thumb 200px)
+----------+----------+
           |
           v
+---------------------+
|  DELIVERY BUNDLE    | (Xuất bản media_manifest.json và pilot_media_manifest.json)
+---------------------+
```

---

## 2. QUY CHUẨN BIẾN THỂ HÌNH ẢNH (IMAGE VARIANTS SPECIFICATION)

Để đảm bảo tốc độ tải trang tối ưu trên giao diện bảo tàng số:

| Biến thể (Variant) | Độ phân giải mục tiêu | Mục đích hiển thị | Định dạng nén |
| :--- | :---: | :--- | :--- |
| **Hero Image** | `1200 x 900` px | Trình xem chi tiết hiện vật độ nét cao (HD Viewer) | WebP / Progressive JPEG |
| **Gallery Image** | `800 x 600` px | Băng chuyền trình chiếu ảnh góc chụp đa chiều | WebP / JPEG |
| **Thumbnail** | `200 x 200` px | Thẻ hiện vật trong danh mục & lưới tìm kiếm | WebP |

---

## 3. TỔNG HỢP TÀI NGUYÊN ĐA PHƯƠNG TIỆN (MEDIA MANIFEST SUMMARY)

Tổng số tài nguyên đa phương tiện đã được kê khai trong `content/media/media_manifest.json`: **224 tệp**.

- **Hình ảnh chính (`primary`)**: 73 tệp (độ phân giải cao từ Met, Smithsonian, NMC, LOC).
- **Hình ảnh góc chụp chi tiết (`gallery`)**: 147 tệp.
- **Tư liệu âm thanh (`audio`)**: 3 tệp (Bản thu âm hòa tấu Pinpeat 1968, thuyết minh âm thanh).
- **Tư liệu nghe nhìn & phim tài liệu (`video`)**: 1 tệp.

Tất cả tài nguyên đều có `verificationStatus = "VERIFIED"` và `downloadStatus = "READY" / "DOWNLOADED"`.
