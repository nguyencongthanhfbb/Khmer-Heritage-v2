import { HeritageObject } from '../../src/types/museum';

export interface LOCRecord {
  id: string;
  lccn: string;
  title: string;
  titleEnglish: string;
  titleKhmer: string;
  type: 'media_record' | 'place' | 'manuscript';
  category: string;
  period: 'Angkor' | 'Post-Angkor' | 'Modern';
  dateRange: string;
  century: string;
  summary: string;
  description: string;
  historicalContext: string;
  culturalSignificance: string;
  material: string;
  dimensions: string;
  primaryImage: string;
  sourceUrl: string;
  creditLine: string;
}

export const LOC_AUTHENTIC_KHMER_RECORDS: LOCRecord[] = [
  {
    id: 'kh-loc-2004667825',
    lccn: '2004667825',
    title: 'Bản Đồ Học & Khảo Sát Bình Đồ Kiến Trúc Đền Angkor Wat (1900)',
    titleEnglish: 'Architectural Ground Plan and Survey of Angkor Wat Temple Complex',
    titleKhmer: 'ប្លង់ស្ថាបត្យកម្មប្រាសាទអង្គរវត្ត',
    type: 'media_record',
    category: 'Tư Liệu & Bản Đồ Lịch Sử (Historical Maps & Survey)',
    period: 'Modern',
    dateRange: 'Khoảng 1890–1910',
    century: 'Đầu thế kỷ 20',
    summary: 'Bản đồ đo đạc trắc địa và bình đồ kiến trúc chi tiết đầu tiên của quần thể Angkor Wat do các đoàn khảo sát Pháp và quốc tế thực hiện.',
    description: 'Tài liệu đồ họa lịch sử ghi nhận chuẩn xác tỷ lệ hào nước, các tầng tháp trung tâm và hệ thống hành lang chạm khắc phù điêu của Angkor Wat trước khi trùng tu lớn.',
    historicalContext: 'Thời kỳ các đoàn khảo cổ học phương Tây bắt đầu giải mã và ghi nhận quy mô toàn cảnh của nền văn minh Angkor.',
    culturalSignificance: 'Tư liệu quý giá đối chiếu hiện trạng bảo tồn và quy hoạch không gian thiêng của đền Angkor Wat.',
    material: 'Bản vẽ in thạch bản trên giấy (Lithograph print on paper)',
    dimensions: '65 x 90 cm',
    primaryImage: 'https://tile.loc.gov/storage-services/service/pnp/ppmsca/09800/09845_150px.jpg',
    sourceUrl: 'https://www.loc.gov/item/2004667825/',
    creditLine: 'Library of Congress, Prints & Photographs Division, Washington, D.C.'
  },
  {
    id: 'kh-loc-2017648325',
    lccn: '2017648325',
    title: 'Ảnh Tư Liệu Lịch Sử: Tháp Mặt Phật Đền Bayon (Khoảng 1910)',
    titleEnglish: 'Historical Photograph: Smiling Stone Faces of the Bayon Central Towers',
    titleKhmer: 'រូបថតប្រវត្តិសាស្ត្រ៖ ប្រាសាទបាយ័ន',
    type: 'media_record',
    category: 'Nhiếp Ảnh Lịch Sử (Historical Photography)',
    period: 'Modern',
    dateRange: 'Khoảng 1910–1920',
    century: 'Đầu thế kỷ 20',
    summary: 'Bức ảnh chụp phim bạc gelatin nguyên bản ghi lại vẻ đẹp trầm mặc của các tháp mặt đá 4 hướng tại đền Bayon trong rừng già Siem Reap.',
    description: 'Tác phẩm nhiếp ảnh tư liệu lịch sử nắm bắt ánh sáng và nét chạm khắc đá sa thạch biểu tượng nụ cười Bayon huyền thoại trước các đợt phát lộ rừng rậm quy mô lớn.',
    historicalContext: 'Giai đoạn khám phá và ghi nhận hình ảnh Angkor đầu thế kỷ 20.',
    culturalSignificance: 'Minh chứng sống động về sự trường tồn của kiệt tác kiến trúc Phật giáo thời vua Jayavarman VII.',
    material: 'Ảnh phim bạc Gelatin (Gelatin silver photographic print)',
    dimensions: '18 x 24 cm',
    primaryImage: 'https://tile.loc.gov/storage-services/service/pnp/cph/3c20000/3c28000/3c28900/3c28965_150px.jpg',
    sourceUrl: 'https://www.loc.gov/item/2017648325/',
    creditLine: 'Library of Congress Prints and Photographs Division, Frank and Frances Carpenter Collection'
  },
  {
    id: 'kh-loc-2021669412',
    lccn: '2021669412',
    title: 'Bản Thảo Kinh Lá Buông Khmer Cổ (Sastra Slek Reit)',
    titleEnglish: 'Trai Phum Buddhist Cosmological Treatise on Palm-Leaf (Sastra Slek Reit)',
    titleKhmer: 'សាស្រ្តាស្លឹករឹត រឿងត្រៃភូមិ',
    type: 'manuscript',
    category: 'Bản Thảo & Kinh Lá Buông (Palm-Leaf Manuscripts)',
    period: 'Post-Angkor',
    dateRange: 'Thế kỷ 18 – 19',
    century: 'Thế kỷ 18 – 19',
    summary: 'Tập kinh lá buông chép tay bằng chữ Khmer cổ ghi chép vũ trụ luận Tam giới (Trai Phum) và giới luật Phật giáo Thượng tọa bộ (Theravada).',
    description: 'Kinh lá buông được khắc bằng bút kim sắt trên các phiến lá cọ buông đã xử lý nhiệt, quét muội than để làm nổi chữ và xâu dây chỉ cố định giữa hai thanh bìa gỗ chạm khắc.',
    historicalContext: 'Thời kỳ Phục hưng Phật giáo Thượng tọa bộ tại các tu viện Phật giáo Hoàng gia Campuchia.',
    culturalSignificance: 'Di sản văn tự vô giá lưu truyền giáo lý đạo đức và thế giới quan Phật giáo cổ truyền của người Khmer.',
    material: 'Lá buông sấy khô, mực muội than và gỗ quý (Inscribed palm leaf and lacquered wood)',
    dimensions: 'Dài: 55 cm; Rộng: 5.5 cm; Dày: 4.2 cm (68 lá kinh)',
    primaryImage: 'https://tile.loc.gov/storage-services/service/asian/2021/2021669412/2021669412_0001_150px.jpg',
    sourceUrl: 'https://www.loc.gov/item/2021669412/',
    creditLine: 'Library of Congress, Asian Division, Southeast Asian Rare Book Collection'
  }
];

export function mapLOCToHeritageObject(rec: LOCRecord): HeritageObject {
  return {
    id: rec.id,
    type: rec.type,
    title: rec.title,
    titleKhmer: rec.titleKhmer,
    titleEnglish: rec.titleEnglish,
    alternateTitles: [rec.titleEnglish],
    category: rec.category,
    period: rec.period,
    dateRange: rec.dateRange,
    century: rec.century,
    summary: rec.summary,
    description: rec.description,
    historicalContext: rec.historicalContext,
    culturalSignificance: rec.culturalSignificance,
    material: rec.material,
    dimensions: rec.dimensions,
    location: {
      siteName: 'Quần thể Di sản Văn hóa Angkor',
      province: 'Siem Reap',
      country: 'Campuchia',
      coordinates: [13.4125, 103.867]
    },
    media: {
      primaryImage: rec.primaryImage,
      gallery: [rec.primaryImage],
      caption: `${rec.titleEnglish} - Library of Congress (LCCN: ${rec.lccn})`
    },
    provenance: {
      institution: 'Library of Congress (Washington, D.C.)',
      sourceUrl: rec.sourceUrl,
      sourceRecordId: rec.lccn,
      license: 'Public Domain',
      licenseUrl: 'https://www.loc.gov/legal/',
      attribution: `Library of Congress Public Domain - Mã tư liệu: ${rec.lccn}`,
      accessionNumber: rec.lccn,
      citations: [
        `Library of Congress Catalog Item: ${rec.lccn}`,
        rec.creditLine
      ]
    },
    relations: {
      relatedEntityIds: [],
      relatedCollections: ['col-sacred-temples', 'col-ancient-epigraphy'],
      associatedConcepts: ['Tư liệu Khảo sát Lịch sử', 'Kinh văn & Bản đồ Cổ'],
      artisticStyle: 'Tư liệu Lưu trữ Lịch sử'
    },
    isMasterpiece: false
  };
}
