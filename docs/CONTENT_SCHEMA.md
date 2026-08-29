# CONTENT SCHEMA — KHMER HERITAGE

## 1. CÁC LOẠI THỰC THỂ DI SẢN (ENTITY TYPES)

Mọi thực thể trong bảo tàng số được phân loại chính xác theo các định dạng sau:

| Loại hình | Mã định danh | Mô tả |
| :--- | :--- | :--- |
| **Cổ vật / Điêu khắc** | `artifact` | Tượng đá, đồ đồng, pháp khí, gốm sứ, ngọc bích, trang sức khảo cổ. |
| **Địa danh / Di tích** | `place` | Đền đài (Angkor Wat, Bayon), thành quách, di chỉ khảo cổ, hồ chứa Baray. |
| **Nhân vật Lịch sử** | `person` | Vua chúa, hoàng hậu, học giả, kiến trúc sư, nghệ nhân dân gian tiêu biểu. |
| **Sự kiện & Nghi lễ** | `event_tradition` | Lễ hội Chôl Chnăm Thmây, Lễ hội Pchum Ben, Bon Om Touk, Lễ cày tịch điền. |
| **Loại hình Nghệ thuật** | `art_form` | Điệu múa cung đình (Apsara), Kịch rối bóng Sbek Thom, Họa tiết điêu khắc Kbach. |
| **Bản thảo & Văn bia** | `manuscript` | Kinh lá buông (Sastra Slekrith), Văn bia tiếng Phạn/Khmer cổ (Inscriptions). |
| **Bản ghi Đa phương tiện** | `media_record` | Bản thu âm nhạc cụ Pinpeat/Mohori, video biểu diễn dân gian, tư liệu ảnh chụp thế kỷ 19-20. |
| **Khái niệm Văn hóa** | `concept` | Biểu tượng thần thoại (Naga, Garuda, Apsara, Meru, Linga-Yoni). |

---

## 2. CẤU TRÚC DỮ LIỆU ĐỐI TƯỢNG (OBJECT SCHEMA DEFINITION)

Mỗi hồ sơ hiện vật (`HeritageObject`) có cấu trúc chuẩn như sau:

```typescript
export interface HeritageObject {
  id: string; // Canonical Entity ID (e.g. "kh-art-001")
  type: 'artifact' | 'place' | 'person' | 'event_tradition' | 'art_form' | 'manuscript' | 'media_record' | 'concept';
  
  // Danh xưng đa ngôn ngữ
  title: string;
  titleKhmer?: string;
  titleEnglish: string;
  alternateTitles?: string[];
  
  // Phân loại & Niên đại
  category: string;
  period: string; // "Pre-Angkor" | "Funan" | "Chenla" | "Angkor" | "Post-Angkor" | "Modern"
  dateRange: string;
  
  // Mô tả & Bối cảnh
  summary: string;
  description: string;
  historicalContext?: string;
  culturalSignificance?: string;
  
  // Thuộc tính kỹ thuật
  material?: string;
  dimensions?: string;
  accessionNumber?: string; // Mã danh mục bảo tàng (nếu có)
  
  // Địa lý & Tọa độ
  location?: {
    siteName: string;
    province: string;
    country: string;
    coordinates?: [number, number]; // [latitude, longitude]
  };
  
  // Phương tiện truyền thông (Media)
  media: {
    primaryImage: string;
    gallery?: string[];
    audioUrl?: string;
    videoUrl?: string;
    model3dUrl?: string;
    caption?: string;
  };
  
  // Nguồn gốc & Bản quyền (Provenance & Licensing)
  provenance: {
    institution: string;
    sourceUrl: string;
    license: 'CC0' | 'Public Domain' | 'CC BY' | 'CC BY-SA' | 'Institutional Open Access';
    licenseUrl?: string;
    attribution: string;
    citations?: string[];
  };
  
  // Quan hệ đồ thị tri thức (Knowledge Graph Relations)
  relations: {
    relatedEntityIds: string[];
    relatedCollections: string[];
    associatedRulers?: string[];
    associatedPlaces?: string[];
  };
}
```
