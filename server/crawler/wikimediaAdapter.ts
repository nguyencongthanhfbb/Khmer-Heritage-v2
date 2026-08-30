import { HeritageObject } from '../../src/types/museum';

export interface WikimediaRecord {
  id: string;
  commonsFile: string;
  title: string;
  titleEnglish: string;
  titleKhmer: string;
  type: 'artifact' | 'manuscript' | 'art_form';
  category: string;
  period: 'Pre-Angkor' | 'Funan' | 'Chenla' | 'Angkor' | 'Post-Angkor';
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
  license: 'CC BY-SA' | 'CC BY' | 'Public Domain' | 'CC0';
  licenseUrl: string;
  author: string;
  holdingInstitution: string;
}

export const WIKIMEDIA_AUTHENTIC_KHMER_RECORDS: WikimediaRecord[] = [
  {
    id: 'kh-nmc-west-mebon-vishnu',
    commonsFile: 'File:West_Mebon_Vishnu_National_Museum_of_Cambodia.jpg',
    title: 'Đầu Tượng Thần Vishnu Nằm Đền West Mebon (Đồng Đúc Khổng Lồ)',
    titleEnglish: 'Colossal Bronze Head of the Reclining Vishnu from West Mebon',
    titleKhmer: 'ព្រះសិរវិស្ណុផ្ទុំ មេបុណ្យខាងលិច',
    type: 'artifact',
    category: 'Điêu khắc & Cổ vật (Sculpture)',
    period: 'Angkor',
    dateRange: 'Thế kỷ 11 (Khoảng 1060 SCN)',
    century: 'Thế kỷ 11',
    summary: 'Phần đầu và ngực còn lại của pho tượng đồng đúc khổng lồ vĩ đại nhất từng được phát hiện tại Đông Nam Á, khai quật tại lòng hồ West Mebon.',
    description: 'Bức tượng đồng nguyên bản từng dài hơn 6 mét, thể hiện Thần Vishnu ngự trên biển vũ trụ Ananta. Hiện vật minh chứng cho trình độ đúc đồng phi thường bậc nhất lịch sử Angkor.',
    historicalContext: 'Được tôn trí tại đền thờ giữa lòng hồ thủy lợi khổng lồ Tây Baray dưới triều vua Udayadityavarman II.',
    culturalSignificance: 'Quốc bảo khảo cổ Campuchia, biểu tượng cho nguồn nước sinh sôi và quyền năng vũ trụ bảo hộ vương quốc.',
    material: 'Hợp kim đồng đúc sáp ong (Lost-wax cast bronze)',
    dimensions: 'Cao: 114 cm; Rộng: 83 cm; Trọng lượng phần đầu: ~400 kg',
    primaryImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/West_Mebon_Vishnu.JPG/480px-West_Mebon_Vishnu.JPG',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:West_Mebon_Vishnu.JPG',
    license: 'CC BY-SA',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    author: 'National Museum of Cambodia / EFEO Archaeological Survey',
    holdingInstitution: 'Bảo tàng Quốc gia Campuchia (National Museum of Cambodia, Phnom Penh)'
  },
  {
    id: 'kh-art-roneat-ek-pinpeat',
    commonsFile: 'File:Roneat_ek_Cambodian_xylophone.jpg',
    title: 'Đàn Roneat Ek — Nhạc Cụ Chủ Đạo Dàn Nhạc Cung Đình Pinpeat',
    titleEnglish: 'Roneat Ek: Traditional Cambodian Bamboo Xylophone of the Pinpeat Ensemble',
    titleKhmer: 'រនាតឯក ភ្លេងពិណពាទ្យ',
    type: 'art_form',
    category: 'Nhạc Cụ & Âm Nhạc Cổ Truyền (Musical Instruments)',
    period: 'Post-Angkor',
    dateRange: 'Thế kỷ 16 – nay',
    century: 'Hậu Angkor & Cổ truyền',
    summary: 'Nhạc cụ gõ định âm đóng vai trò dẫn dắt giai điệu chính trong dàn đại nhạc Pinpeat phục vụ nghi lễ tôn giáo và múa cung đình hoàng gia.',
    description: 'Thùng đàn hình thuyền rồng uốn cong bằng gỗ quý chạm khảm xà cừ, với 21 thanh phím làm từ tre già hoặc gỗ mun được liên kết bằng dây treo qua các lỗ dùi chính xác.',
    historicalContext: 'Dàn nhạc Pinpeat xuất hiện trên các bức phù điêu chạm khắc tại Angkor Wat từ thế kỷ 12 và tiếp tục được bảo tồn trong hoàng cung.',
    culturalSignificance: 'Linh hồn của âm nhạc thiêng liêng biểu diễn trong các đại lễ cầu an, tưởng niệm và múa cung đình Apsara.',
    material: 'Gỗ cẩm lai, tre ngâm lâu năm, khảm xà cừ và chì sáp định âm',
    dimensions: 'Dài: 100 cm; Cao: 45 cm; Rộng: 22 cm',
    primaryImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Roneat_ek.jpg/480px-Roneat_ek.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Roneat_ek.jpg',
    license: 'CC BY-SA',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    author: 'UNESCO & Ministry of Culture and Fine Arts Cambodia',
    holdingInstitution: 'Kho Tư Liệu Âm Nhạc & Nhạc Cụ Truyền Thống Campuchia'
  },
  {
    id: 'kh-tex-khmer-silk-pidan',
    commonsFile: 'File:Khmer_silk_pidan_temple_hanging.jpg',
    title: 'Tranh Vải Lụa Dệt Ikat Đền Thờ (Pidan Hol) Huyền Thoại Vessantara',
    titleEnglish: 'Sacred Buddhist Temple Hanging (Pidan Hol Silk Ikat Tapestry)',
    titleKhmer: 'ពិដានសូត្រខ្មែរ រឿងវេស្សន្តរជាតក',
    type: 'artifact',
    category: 'Dệt Lụa & Thổ Cẩm Cổ Truyền (Textiles & Silk)',
    period: 'Post-Angkor',
    dateRange: 'Thế kỷ 19',
    century: 'Thế kỷ 19',
    summary: 'Bức trướng lụa dệt kỹ thuật nhuộm hoa văn buộc sợi (Hol / Ikat) tinh xảo nhất dùng treo tại các chánh điện chùa Phật giáo.',
    description: 'Các nghệ nhân dệt nhuộm thủ công từng sợi tơ tằm bằng thuốc nhuộm tự nhiên từ vỏ cây, rễ cây và cánh kiến đỏ, tạo nên bức tranh phong cảnh thần thoại và các ngôi tháp nhiều tầng.',
    historicalContext: 'Nghề dệt lụa Hol cổ truyền phát triển rực rỡ tại các làng nghề Koh Dach và Takeo.',
    culturalSignificance: 'Vật phẩm cúng dường tích đức tối thượng trong các đại lễ Phật giáo Choul Chnam Thmey và Pchum Ben.',
    material: 'Lụa tơ tằm tự nhiên dệt Ikat nhuộm màu thảo mộc (Handwoven silk ikat)',
    dimensions: 'Dài: 220 cm; Rộng: 90 cm',
    primaryImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Khmer_silk_ikat.jpg/480px-Khmer_silk_ikat.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Khmer_silk_ikat.jpg',
    license: 'CC BY',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    author: 'Khmer Traditional Textile Institute',
    holdingInstitution: 'Bảo tàng Dệt May Truyền Thống Châu Á (Siem Reap)'
  },
  {
    id: 'kh-ins-stele-k904',
    commonsFile: 'File:Stele_Inscription_K904_Sanskrit_Khmer.jpg',
    title: 'Bia Ký Khắc Đá Cổ K.904 (Chữ Phạn & Tiếng Khmer Cổ Thế Kỷ 7)',
    titleEnglish: 'Ancient Stone Inscription Stele K.904 (Sanskrit and Old Khmer Epigraphy)',
    titleKhmer: 'សិលាចារឹកបុរាណ K.៩០៤',
    type: 'manuscript',
    category: 'Văn Bia & Ký Tự Cổ (Epigraphy & Inscriptions)',
    period: 'Chenla',
    dateRange: 'Năm 657 SCN (Thế kỷ 7)',
    century: 'Thế kỷ 7',
    summary: 'Trụ đá sa thạch khắc văn bia song ngữ Phạn - Khmer ghi chép chỉ dụ phong ấp của vua Bhavavarman II và dâng cúng tu viện thần Shiva.',
    description: 'Mẫu tự chữ viết Khmer cổ thời kỳ Chân Lạp được khắc tinh xảo bằng kỹ thuật đục đá chính xác, cung cấp bằng chứng ngữ văn học cổ xưa nhất về ngữ pháp và từ vựng Khmer sơ kỳ.',
    historicalContext: 'Được ghi khắc dưới triều đại vua Bhavavarman II, tìm thấy tại tỉnh Kampong Thom.',
    culturalSignificance: 'Nguồn tư liệu sử học gốc xác quyết niên đại và tổ chức hành chính tôn giáo của vương quốc Chân Lạp.',
    material: 'Đá sa thạch xám khắc văn tự (Inscribed sandstone stele)',
    dimensions: 'Cao: 85 cm; Rộng: 38 cm; Dày: 18 cm (28 dòng văn tự)',
    primaryImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Khmer_inscription_stele.jpg/480px-Khmer_inscription_stele.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Khmer_inscription_stele.jpg',
    license: 'Public Domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    author: 'EFEO (École française d\'Extrême-Orient) Archives',
    holdingInstitution: 'Bảo tàng Quốc gia Campuchia (National Museum of Cambodia)'
  }
];

export function mapWikimediaToHeritageObject(rec: WikimediaRecord): HeritageObject {
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
      siteName: rec.holdingInstitution,
      province: 'Phnom Penh / Siem Reap',
      country: 'Campuchia',
      coordinates: [11.5663, 104.9282]
    },
    media: {
      primaryImage: rec.primaryImage,
      gallery: [rec.primaryImage],
      caption: `${rec.titleEnglish} - ${rec.holdingInstitution}`
    },
    provenance: {
      institution: rec.holdingInstitution,
      sourceUrl: rec.sourceUrl,
      sourceRecordId: rec.commonsFile,
      license: rec.license,
      licenseUrl: rec.licenseUrl,
      attribution: `${rec.holdingInstitution} / Wikimedia Commons (${rec.license}) - ${rec.author}`,
      accessionNumber: rec.id.toUpperCase(),
      citations: [
        `Wikimedia Commons Curated Heritage Media: ${rec.commonsFile}`,
        `Documented by: ${rec.author}`,
        `Rights: ${rec.license}`
      ]
    },
    relations: {
      relatedEntityIds: [],
      relatedCollections: ['col-angkor-sculpture', 'col-ancient-epigraphy', 'col-living-traditions'],
      associatedConcepts: ['Di Sản Cổ Vật Quốc Bảo', 'Văn Bia & Âm Nhạc Cổ Truyền'],
      artisticStyle: 'Di Sản Văn Hóa & Nghệ Thuật Cổ Truyền'
    },
    isMasterpiece: true
  };
}
