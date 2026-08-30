export interface InscriptionStela {
  id: string;
  inventoryNumber: string; // e.g. K.235, K.908
  title: string;
  titleKhmer: string;
  titleEnglish: string;
  period: 'Pre-Angkor' | 'Chenla' | 'Angkor' | 'Post-Angkor';
  dateRange: string;
  language: 'Sanskrit & Old Khmer' | 'Sanskrit' | 'Old Khmer';
  script: 'Khmer Cổ (Old Khmer)' | 'Phạn ngữ (Sanskrit Pallava-Grantha)' | 'Aksar Mul';
  discoveredLocation: string;
  currentPreservation: string;
  accessionNumber: string;
  license: string;
  summary: string;
  historicalImportance: string;
  linesCount: number;
  samplePassages: {
    sectionTitle: string;
    originalScript: string;
    romanization: string;
    vietnameseTranslation: string;
    englishTranslation: string;
    scholarlyCommentary: string;
  }[];
  associatedRulers: string[];
  associatedPlaces: string[];
  associatedObjectIds: string[];
  citation: string;
}

export const EPIGRAPHY_STELAE: InscriptionStela[] = [
  {
    id: 'stela-sdok-kok-thom-k235',
    inventoryNumber: 'K.235',
    title: 'Văn Bia Sdok Kok Thom (Biên Niên Sử Hoàng Triều Angkor)',
    titleKhmer: 'សិលាចារឹកស្ដុកកក់ធំ (K.235)',
    titleEnglish: 'Stele of Sdok Kok Thom (Chronicle of the Devaraja Cult)',
    period: 'Angkor',
    dateRange: 'Năm 1052 SCN (Thời vua Udayadityavarman II)',
    language: 'Sanskrit & Old Khmer',
    script: 'Khmer Cổ (Old Khmer)',
    discoveredLocation: 'Đền Sdok Kok Thom (Tỉnh Sa Kaeo / Biên giới Campuchia - Thái Lan)',
    currentPreservation: 'Bảo tàng Quốc gia Bangkok (Lưu trữ hồ sơ bản dập EFEO)',
    accessionNumber: 'EFEO-EST-K235 / NMC-ARCH-1052',
    license: 'Public Domain / Scholarly Archive',
    summary: 'Văn bia quan trọng bậc nhất của lịch sử Angkor, ghi chép lại phả hệ các thế hệ pháp sư hoàng gia và thiết lập niên đại chính xác cho 250 năm lịch sử từ vua Jayavarman II (802 SCN).',
    historicalImportance: 'Là tài liệu bia ký duy nhất cung cấp mô tả chi tiết về nghi lễ lập quốc Devaraja (Thần vương) trên đỉnh núi Phnom Kulen năm 802 SCN, mở đầu đế chế Angkor độc lập.',
    linesCount: 340,
    samplePassages: [
      {
        sectionTitle: 'Khổ thơ thiết lập Thần quyền Devaraja (Phần chữ Phạn Sanskrit)',
        originalScript: 'សិទ្ធិស្វស្តិ វ្រះបាទជយវម៌្មទេវ អាទ្យង្កោររាជ្យ សេដ្ឋបុរ...',
        romanization: 'Siddhir astu. Vrah pada Kamrateng An Sri Jayavarmmadeva svargata Paramesvara...',
        vietnameseTranslation: 'Nguyện cầu mọi điều tốt lành! Đức Vua Tôn kính Jayavarman (sau khi băng hà có tôn hiệu Paramesvara) đã đến từ xứ Javā để trị vì kinh đô Indrapura. Sau đó Ngài đến Hariharalaya và tiến lên đỉnh núi Mahendraparvata (Phnom Kulen) để cử hành đại lễ Thần Vương...',
        englishTranslation: 'May success be achieved! His Majesty the King Sri Jayavarman, who after death received the name Paramesvara, came from Java to rule at Indrapura, then moved to Hariharalaya and established the sacred cult of Devaraja upon Mahendraparvata...',
        scholarlyCommentary: 'Đoạn bia ký chứng thực cột mốc năm 802 SCN là thời điểm khởi đầu của Đế chế Angkor thống nhất dưới sự trị vì của vua Jayavarman II.'
      },
      {
        sectionTitle: 'Quy định về việc gìn giữ đền thờ gia tộc (Phần chữ Khmer Cổ Old Khmer)',
        originalScript: 'នុវ វ្រះ គម្វុជទេស ត គិ កម្លុង ភទ្រនិកេតន...',
        romanization: 'Man vrah pada Kamraten An Sri Udayadityavarmmadeva thve rajya...',
        vietnameseTranslation: 'Khi Đức Vua Udayadityavarman II lên ngôi báu, ngài phong cho giáo sĩ Sadasiva làm Viện trưởng và ban tặng đất đai Bhadraniketana cùng các vật phẩm thờ cúng bằng vàng, bạc để vĩnh viễn phụng sự đền Sdok Kok Thom.',
        englishTranslation: 'When His Majesty King Udayadityavarman II assumed the throne, he appointed the high priest Sadasiva as Royal Preceptor and endowed the sanctuary of Bhadraniketana with silver and golden sacred vessels...',
        scholarlyCommentary: 'Phần chữ Khmer cổ mô tả chi tiết các giao dịch đất đai, nô lệ đền thờ và ranh giới lãnh thổ với giá trị ngôn ngữ học cổ truyền vô giá.'
      }
    ],
    associatedRulers: ['Vua Jayavarman II', 'Vua Suryavarman I', 'Vua Udayadityavarman II'],
    associatedPlaces: ['Phnom Kulen (Mahendraparvata)', 'Hariharalaya (Roluos)', 'Sdok Kok Thom'],
    associatedObjectIds: ['kh-art-vishnu-west-mebon', 'kh-place-angkor-wat'],
    citation: 'Coedès, George & Dupont, Pierre (1943). "Les stèles de Sdok Kak Thom, Phnom Sandak et Prah Vihar", BEFEO XLIII, pp. 56–154.'
  },
  {
    id: 'stela-preah-khan-k908',
    inventoryNumber: 'K.908',
    title: 'Văn Bia Đền Preah Khan (Bản Tuyên Ngôn của Vua Jayavarman VII)',
    titleKhmer: 'សិលាចារឹកប្រាសាទព្រះខ័ន (K.908)',
    titleEnglish: 'Stele of Preah Khan Temple (The Edicts of Jayavarman VII)',
    period: 'Angkor',
    dateRange: 'Năm 1191 SCN (Thời vua Jayavarman VII)',
    language: 'Sanskrit',
    script: 'Phạn ngữ (Sanskrit Pallava-Grantha)',
    discoveredLocation: 'Góc đông bắc hành lang đền Preah Khan, Angkor',
    currentPreservation: 'Bảo tàng Quốc gia Campuchia (Phnom Penh)',
    accessionNumber: 'EFEO-K908 / NMC-ST-1191',
    license: 'Institutional Open Access / Public Domain',
    summary: 'Tấm bia đá sa thạch 4 mặt tuyệt mỹ gồm 179 khổ thơ chữ Phạn, ghi chép lại việc vua Jayavarman VII xây dựng đền tưởng nhớ vua cha Dharanindravarman II.',
    historicalImportance: 'Cung cấp danh mục 102 bệnh viện miễn phí (Arogyasala) và 121 nhà nghỉ chân có lửa (Dharmasala) phủ khắp các nẻo đường hoàng gia trên toàn đế chế Angkor.',
    linesCount: 179,
    samplePassages: [
      {
        sectionTitle: 'Lời thề Trắc ẩn của Vua Phật (Tâm từ bi Bồ Tát Avalokiteshvara)',
        originalScript: 'ទេហិនាមភវត្សោៜស្យ កាយិកោ ន មនោព្យថាម...',
        romanization: 'Dehinam abhavat so syah kayiko na mano vyatha | Prajasukhena sukham rajnah prajanam ca hite hitam...',
        vietnameseTranslation: 'Nỗi khổ đau của bách tính trong nhân gian chính là nỗi đau đớn trong tâm can của đấng quân vương, chứ không phải nỗi đau của thể xác ngài. Niềm hạnh phúc của muôn dân mới thực sự là niềm hạnh phúc của nhà vua.',
        englishTranslation: 'The bodily pain of his subjects became in him a spiritual agony, far more unbearable than his own physical pain. The happiness of the king lies in the happiness of his subjects; their welfare is his welfare...',
        scholarlyCommentary: 'Đây là câu châm ngôn kinh điển thể hiện triết lý Bồ Tát Đạo (Mahayana Bodhisattva) của vua Jayavarman VII, giải thích động lực xây dựng hệ thống phúc lợi xã hội toàn diện.'
      },
      {
        sectionTitle: 'Thống kê mạng lưới 102 Viện Y tế Arogyasala',
        originalScript: 'អារោគ្យសាលាះ សន្ត្យេតាះ សតំ ទ្វេ សមធិកានិ...',
        romanization: 'Arogyasalah santyetah satam dve samadhikani ca...',
        vietnameseTranslation: 'Một trăm lẻ hai viện y tế (Arogyasala) được thiết lập tại các tỉnh thành, cùng với các thầy thuốc tài giỏi, dược liệu và tượng thần Phật Dược Sư Bhaisajyaguru ban phước lành chữa lành tật bệnh cho dân chúng.',
        englishTranslation: 'There are one hundred and two hospitals established in various provinces, provided with medicines, qualified physicians, and shrines dedicated to the Medicine Buddha Bhaisajyaguru...',
        scholarlyCommentary: 'Tư liệu khảo cổ học chứng minh mạng lưới đường giao thông và y tế công cộng tiên tiến bậc nhất thế giới vào thế kỷ 12.'
      }
    ],
    associatedRulers: ['Vua Jayavarman VII', 'Hoàng hậu Indradevi'],
    associatedPlaces: ['Preah Khan', 'Angkor Thom', 'Bayon'],
    associatedObjectIds: ['kh-art-jayavarman-vii-portrait', 'kh-place-bayon'],
    citation: 'Coedès, George (1941). "La stèle du Prah Khan d’Ankor", BEFEO XLI, pp. 255–301.'
  },
  {
    id: 'stela-banteay-srei-k842',
    inventoryNumber: 'K.842',
    title: 'Văn Bia Đền Banteay Srei (Tribhuvanamahesvara)',
    titleKhmer: 'សិលាចារឹកប្រាសាទបន្ទាយស្រី (K.842)',
    titleEnglish: 'Inscription of Banteay Srei (Shrine of the Three Worlds Lord)',
    period: 'Angkor',
    dateRange: 'Năm 968 SCN (Thời vua Rajendravarman & Jayavarman V)',
    language: 'Sanskrit & Old Khmer',
    script: 'Phạn ngữ (Sanskrit Pallava-Grantha)',
    discoveredLocation: 'Gian điện trung tâm đền Banteay Srei (Ishvarapura)',
    currentPreservation: 'Bảo tàng Quốc gia Campuchia (Phnom Penh) & Tại hiện trường',
    accessionNumber: 'EFEO-K842 / NMC-BS-0968',
    license: 'Institutional Open Access',
    summary: 'Văn bia ghi dấu sự hoàn thành của ngôi đền sa thạch hồng Banteay Srei bởi học giả Bà-la-môn uyên bác Yajnavaraha, thầy dạy của vua Jayavarman V.',
    historicalImportance: 'Minh chứng cho giai đoạn văn hóa và thi ca chữ Phạn đạt đến độ tinh tế và hoàn mỹ nhất trong lịch sử văn học Campuchia cổ đại.',
    linesCount: 120,
    samplePassages: [
      {
        sectionTitle: 'Tán dương học giả Yajnavaraha và thần Shiva',
        originalScript: 'យជ្ជ្នវរាហះ សុធិយាម វរះ ស្រីវិទ្យាធរោ...',
        romanization: 'Yajnavaraha sudhiyam varah Sri Vidyadharo guru...',
        vietnameseTranslation: 'Tôn giả Yajnavaraha, bậc lỗi lạc nhất trong hàng ngũ trí giả, người thông suốt các bộ kinh Veda, thiên văn học, y lý và nghệ thuật, đã dựng nên ngôi đền linh thiêng này để tôn kính Chúa tể Ba cõi Shiva...',
        englishTranslation: 'The noble scholar Yajnavaraha, foremost among the wise, master of the sacred Vedas, astronomy, and the arts, established this holy sanctuary to honor Shiva Tribhuvanamahesvara...',
        scholarlyCommentary: 'Banteay Srei là ngôi đền lớn duy nhất ở Angkor không do nhà vua trực tiếp xây dựng, mà do một học giả hoàng gia khởi xướng.'
      }
    ],
    associatedRulers: ['Vua Rajendravarman II', 'Vua Jayavarman V'],
    associatedPlaces: ['Banteay Srei (Ishvarapura)', 'Angkor'],
    associatedObjectIds: ['kh-place-banteay-srei'],
    citation: 'Finot, Louis; Parmentier, Henri; Goloubew, Victor (1926). Le Temple d’Içvarapura (Banteay Srei). EFEO Mémoires Archéologiques I, Paris.'
  }
];
