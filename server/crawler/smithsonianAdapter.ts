import { HeritageObject } from '../../src/types/museum';

export interface SmithsonianRecord {
  id: string;
  accessionNumber: string;
  title: string;
  titleEnglish: string;
  titleKhmer: string;
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
  creditLine: string;
}

export const SMITHSONIAN_AUTHENTIC_KHMER_RECORDS: SmithsonianRecord[] = [
  {
    id: 'kh-si-f1992-51',
    accessionNumber: 'F1992.51',
    title: 'Tượng Thần Ganesha Tọa Thiền Phong Cách Bakong',
    titleEnglish: 'Ganesha Seated in Meditation (Bakong Style)',
    titleKhmer: 'ព្រះគណេសគង់សមាធិ រចនាប័ទ្មបាគង',
    category: 'Điêu khắc & Cổ vật (Sculpture)',
    period: 'Angkor',
    dateRange: 'Cuối thế kỷ 9 – đầu thế kỷ 10',
    century: 'Thế kỷ 9 – 10',
    summary: 'Tác phẩm điêu khắc thần Ganesha đầu voi mình người bằng sa thạch nguyên khối, một trong những kiệt tác điêu khắc sớm nhất thời kỳ Angkor.',
    description: 'Bức tượng thần Ganesha thể hiện tư thế tọa thiền vững chãi, tai xòe rộng, ngà phải gãy theo truyền thuyết chép sử thi Mahabharata. Thuộc bộ sưu tập Bảo tàng Nghệ thuật Châu Á Quốc gia Smithsonian.',
    historicalContext: 'Được sáng tác dưới thời trị vì của vua Indravarman I hoặc Yasovarman I, kinh đô Hariharalaya (Roluos).',
    culturalSignificance: 'Vị thần của trí tuệ, bảo trợ nghệ thuật và vượt qua chướng ngại trong thần thoại Hindu.',
    material: 'Đá sa thạch (Sandstone)',
    dimensions: 'Cao: 67.5 cm; Rộng: 44.5 cm; Sâu: 33.2 cm',
    primaryImage: 'https://ids.si.edu/ids/deliveryService?id=FS-7208_02',
    sourceUrl: 'https://asia.si.edu/object/F1992.51/',
    creditLine: 'Freer Gallery of Art and Arthur M. Sackler Gallery, Purchase — Charles Lang Freer Endowment'
  },
  {
    id: 'kh-si-f1993-18',
    accessionNumber: 'F1993.18',
    title: 'Tượng Nữ Thần Devi / Uma Phong Cách Baphuon',
    titleEnglish: 'Standing Female Deity (Devi / Uma), Baphuon Style',
    titleKhmer: 'ព្រះនាងទេវី រចនាប័ទ្មបាភួន',
    category: 'Điêu khắc & Cổ vật (Sculpture)',
    period: 'Angkor',
    dateRange: 'Thế kỷ 11 (Khoảng 1050–1100)',
    century: 'Thế kỷ 11',
    summary: 'Bức tượng nữ thần sa thạch thanh thoát với váy Sampot nếp gấp tinh mỹ đặc trưng phong cách Baphuon.',
    description: 'Kiệt tác điêu khắc nữ tính thể hiện vẻ đẹp cân đối và thanh tú của nghệ thuật thời Baphuon. Thần sắc điềm đạm, đường cong tự nhiên và trang phục có dải thắt uốn lượn hình cánh bướm.',
    historicalContext: 'Thời kỳ hưng thịnh của vương triều Udayadityavarman II, gắn liền với việc xây dựng đền Baphuon.',
    culturalSignificance: 'Hiện thân của nữ tính thiêng liêng (Shakti) và đức từ bi trong Ấn Độ giáo Angkor.',
    material: 'Đá sa thạch (Sandstone)',
    dimensions: 'Cao: 98.4 cm; Rộng: 27.2 cm; Sâu: 18.5 cm',
    primaryImage: 'https://ids.si.edu/ids/deliveryService?id=FS-7288_01',
    sourceUrl: 'https://asia.si.edu/object/F1993.18/',
    creditLine: 'Smithsonian National Museum of Asian Art, Gift of Arthur M. Sackler'
  },
  {
    id: 'kh-si-f1998-74',
    accessionNumber: 'F1998.74',
    title: 'Bộ Tam Tôn Phật Giáo Đại Thừa Thời Vua Jayavarman VII',
    titleEnglish: 'Buddhist Triad: Buddha, Avalokiteshvara, and Prajnaparamita',
    titleKhmer: 'ព្រះត្រៃរ័ត្នពុទ្ធសាសនា មហាយាន',
    category: 'Điêu khắc & Cổ vật (Sculpture)',
    period: 'Angkor',
    dateRange: 'Cuối thế kỷ 12 – đầu thế kỷ 13',
    century: 'Thế kỷ 12 – 13',
    summary: 'Bộ ba pho tượng đồng đúc nguyên vẹn hiếm có thể hiện Đức Phật Thích Ca ngự trên rắn thần Mucalinda cùng Bồ tát Quán Thế Âm và Bát Nhã Ba La Mật Đa.',
    description: 'Tác phẩm đúc đồng tinh xảo đại diện cho giáo lý Phật giáo Đại thừa hoàng gia thời kỳ vua Jayavarman VII, phong cách Bayon đỉnh cao.',
    historicalContext: 'Được chế tác dưới triều đại vua Jayavarman VII (1181–1218), thời kỳ Phật giáo trở thành quốc giáo của Angkor.',
    culturalSignificance: 'Biểu tượng dung hợp Tam bảo và lòng từ bi vô hạn của vương triều Angkor đối với bách tính.',
    material: 'Hợp kim đồng (Bronze with dark patina)',
    dimensions: 'Cao: 42.8 cm; Rộng: 33.5 cm; Sâu: 16.0 cm',
    primaryImage: 'https://ids.si.edu/ids/deliveryService?id=FS-7782_02',
    sourceUrl: 'https://asia.si.edu/object/F1998.74/',
    creditLine: 'Freer Gallery of Art and Arthur M. Sackler Gallery, Purchase'
  },
  {
    id: 'kh-si-f1992-52',
    accessionNumber: 'F1992.52',
    title: 'Ốc Tù Và Nghi Lễ Bằng Đồng (Shankha) và Giá Đỡ Chạm Hình Rắn Naga',
    titleEnglish: 'Ritual Conch Shell (Shankha) with Hevajra / Garuda Stand',
    titleKhmer: 'ស័ង្ខសក្ការៈសំរឹទ្ធ',
    category: 'Cổ vật Nghi Lễ (Ritual Object)',
    period: 'Angkor',
    dateRange: 'Thế kỷ 12 – 13',
    century: 'Thế kỷ 12 – 13',
    summary: 'Pháp khí ốc tù và nghi lễ bằng đồng đúc rỗng kèm chân đế chạm hình Garuda và rắn thần Naga.',
    description: 'Ốc biển Shankha là pháp khí tối linh trong các nghi lễ hiến tế hoàng gia Angkor, âm thanh phát ra xua tan ma chướng và mang lại phúc lành cho vương quốc.',
    historicalContext: 'Được sử dụng trong các nghi lễ tẩy trần và quán đảnh tại các đền thờ hoàng gia Angkor.',
    culturalSignificance: 'Một trong 4 biểu tượng thiêng liêng cầm tay của Đấng Bảo Tồn Vishnu.',
    material: 'Đồng đúc chạm khắc (Cast and incised bronze)',
    dimensions: 'Dài: 31.4 cm; Rộng: 14.8 cm',
    primaryImage: 'https://ids.si.edu/ids/deliveryService?id=FS-7209_01',
    sourceUrl: 'https://asia.si.edu/object/F1992.52/',
    creditLine: 'Smithsonian National Museum of Asian Art, Friends of Asian Arts Fund'
  }
];

export function mapSmithsonianToHeritageObject(rec: SmithsonianRecord): HeritageObject {
  return {
    id: rec.id,
    type: 'artifact',
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
      siteName: 'Quần thể Di tích Lịch sử Angkor',
      province: 'Siem Reap',
      country: 'Campuchia',
      coordinates: [13.4125, 103.867]
    },
    media: {
      primaryImage: rec.primaryImage,
      gallery: [rec.primaryImage],
      caption: `${rec.titleEnglish} - Smithsonian National Museum of Asian Art (${rec.accessionNumber})`
    },
    provenance: {
      institution: 'Smithsonian National Museum of Asian Art (Freer & Sackler Galleries)',
      sourceUrl: rec.sourceUrl,
      sourceRecordId: rec.accessionNumber,
      license: 'CC0',
      licenseUrl: 'https://www.si.edu/openaccess',
      attribution: `Smithsonian Open Access (CC0) - Số kiểm kê: ${rec.accessionNumber}`,
      accessionNumber: rec.accessionNumber,
      citations: [
        `Smithsonian Institution Collection Record: ${rec.accessionNumber}`,
        rec.creditLine
      ]
    },
    relations: {
      relatedEntityIds: [],
      relatedCollections: ['col-angkor-sculpture', 'col-living-traditions'],
      associatedConcepts: ['Nghệ thuật Điêu khắc Đồng & Sa thạch', 'Di sản Phật giáo & Hindu'],
      artisticStyle: 'Nghệ thuật Hoàng gia Angkor'
    },
    isMasterpiece: true
  };
}
