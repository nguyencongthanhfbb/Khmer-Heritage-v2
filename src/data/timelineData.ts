import { TimelineEpoch } from '../types/museum';

export const TIMELINE_EPOCHS: TimelineEpoch[] = [
  {
    id: 'epoch-funan',
    name: 'Thời Kỳ Phù Nam (Funan Kingdom)',
    nameKhmer: 'សម័យហ្វូណន (នគរភ្នំ)',
    timeSpan: 'Thế kỷ 1 – Thế kỷ 6 SCN',
    startYear: 50,
    endYear: 550,
    description: 'Nhà nước hàng hải thương mại đầu tiên ở Đông Nam Á, kiểm soát các tuyến thương lộ nối liền Ấn Độ, La Mã và Trung Hoa. Tiếp nhận chữ Phạn (Sanskrit), đạo Bà La Môn và Phật giáo.',
    keyDevelopments: [
      'Thành lập cảng thị quốc tế Óc Eo và kinh đô Angkor Borei',
      'Tiếp nhận hệ thống chữ viết Phạn ngữ cổ trên văn bia Võ Cạnh',
      'Định hình kỹ thuật luyện kim đồng và chạm khắc tượng Phật gỗ/đá phong cách Phnom Da sớm'
    ],
    majorRulers: ['Hỗn Điền (Kaundinya)', 'Liễu Diệp (Soma)', 'Phạm Sư Mạn (Fan Shiman)'],
    iconicMonuments: ['Thành lũy Angkor Borei', 'Đền Phnom Da'],
    representativeArtStyle: 'Phong cách Phnom Da Sớm (Early Phnom Da Style)',
    bannerImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85',
    relatedObjectIds: ['kh-art-harihara-prasat-andet'],
  },
  {
    id: 'epoch-chenla',
    name: 'Thời Kỳ Chân Lạp (Chenla Kingdom)',
    nameKhmer: 'សម័យចេនឡា',
    timeSpan: 'Thế kỷ 6 – Thế kỷ 8 SCN (550 – 802 SCN)',
    startYear: 550,
    endYear: 802,
    description: 'Giai đoạn phát triển rực rỡ của các tiểu quốc nông nghiệp nội địa. Sự ra đời của các kinh đô Isanapura (Sambor Prei Kuk), Bhavapura và nền điêu khắc đá độc lập thoát khỏi khuôn mẫu Ấn Độ cổ.',
    keyDevelopments: [
      'Xây dựng các cụm đền tháp gạch bát giác quy mô lớn tại Sambor Prei Kuk',
      'Đỉnh cao nghệ thuật tạc tượng Harihara (kết hợp Shiva và Vishnu) với giải phẫu cơ thể tự nhiên',
      'Sự xuất hiện rộng rãi của văn bia chữ Khmer cổ đầu tiên (Bia K.600)'
    ],
    majorRulers: ['Bhavavarman I', 'Mahendravarman (Citrasena)', 'Isanavarman I', 'Jayavarman I'],
    iconicMonuments: ['Sambor Prei Kuk', 'Prasat Andet', 'Vat Phou'],
    representativeArtStyle: 'Phong cách Sambor Prei Kuk & Prasat Andet',
    bannerImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    relatedObjectIds: ['kh-art-harihara-prasat-andet', 'kh-place-sambor-prei-kuk'],
  },
  {
    id: 'epoch-angkor-golden',
    name: 'Thời Kỳ Đế Chế Angkor Hoàng Kim',
    nameKhmer: 'សម័យមហានគរ (អាណាចក្រខ្មែរ)',
    timeSpan: 'Thế kỷ 9 – Thế kỷ 15 SCN (802 – 1431 SCN)',
    startYear: 802,
    endYear: 1431,
    description: 'Kỷ nguyên vĩ đại nhất của văn minh Khmer. Vua Jayavarman II lập lễ tấn phong Devaraja (Thần Vương) năm 802 tại Phnom Kulen. Xây dựng các kỳ quan Angkor Wat, Bayon, Banteay Srei và hệ thống thủy lợi Baray đồ sộ.',
    keyDevelopments: [
      'Xây dựng Angkor Wat — kỳ quan đền thờ tôn giáo bằng đá lớn nhất thế giới',
      'Quy hoạch kinh thành Angkor Thom và đền Bayon với hơn 200 gương mặt đá khổng lồ',
      'Đỉnh cao nghệ thuật đúc đồng đại quy mô (Tượng West Mebon Vishnu)',
      'Hệ thống chữ viết Aksar Mul và các điệu múa cung đình thiêng liêng Robam Preah Reach Trop'
    ],
    majorRulers: [
      'Jayavarman II (802–835)',
      'Yasovarman I (889–910)',
      'Suryavarman II (1113–1150)',
      'Jayavarman VII (1181–1218)'
    ],
    iconicMonuments: ['Angkor Wat', 'Bayon', 'Banteay Srei', 'Ta Prohm', 'Preah Khan', 'West Mebon'],
    representativeArtStyle: 'Kulen, Koh Ker, Banteay Srei, Angkor Wat, Bayon Styles',
    bannerImage: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=85',
    relatedObjectIds: [
      'kh-art-vishnu-west-mebon',
      'kh-place-angkor-wat',
      'kh-art-jayavarman-vii-head',
      'kh-place-bayon',
      'kh-place-banteay-srei',
      'kh-artform-royal-ballet',
      'kh-artform-pinpeat-ensemble'
    ],
  },
  {
    id: 'epoch-post-angkor',
    name: 'Thời Kỳ Hậu Angkor & Tái Thiết (Middle Period)',
    nameKhmer: 'សម័យក្រោយអង្គរ (សម័យកណ្តាល)',
    timeSpan: 'Thế kỷ 15 – Thế kỷ 19 SCN (1431 – 1863 SCN)',
    startYear: 1431,
    endYear: 1863,
    description: 'Chuyển dời trung tâm chính trị về Chaktomuk (Phnom Penh), Longvek và Oudong. Sự truyền bá sâu rộng của Phật giáo Thượng tọa bộ (Theravada), phát triển kinh sách lá buông (Sastra Slekrith) và nghệ thuật kịch rối bóng Sbek Thom.',
    keyDevelopments: [
      'Phát triển trường thiên sử thi Reamker (bản Khmer của sử thi Ramayana)',
      'Sao chép và lưu giữ kho tàng kinh Phật giáo trên lá buông Sastra Slekrith',
      'Trùng tu và biến Angkor Wat thành trung tâm hành hương Phật giáo quốc tế lớn'
    ],
    majorRulers: ['Ponhea Yat', 'Ang Duong', 'Norodom'],
    iconicMonuments: ['Kinh đô Oudong', 'Wat Phnom', 'Chùa Bạc (Wat Preah Keo Morakot)'],
    representativeArtStyle: 'Phong cách Nghệ thuật Hậu Angkor & Điêu khắc Gỗ Sơn Son Thếp Vàng',
    bannerImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=85',
    relatedObjectIds: ['kh-manuscript-sastra-slekrith'],
  },
  {
    id: 'epoch-modern',
    name: 'Kỷ Nguyên Bảo Tồn & Hồi Sinh Di Sản (Modern Era)',
    nameKhmer: 'សម័យទំនើប និង ការអភិរក្សបេតិកភណ្ឌ',
    timeSpan: 'Thế kỷ 19 đến Nay (1863 – Hiện tại)',
    startYear: 1863,
    endYear: 2026,
    description: 'Giai đoạn khảo sát học thuật quốc tế (EFEO, UNESCO), thành lập Bảo tàng Quốc gia Campuchia, hồi sinh các di sản phi vật thể và công nhận các Di sản Thế giới.',
    keyDevelopments: [
      'Công nhận Quần thể Di tích Angkor (1992), Đền Preah Vihear (2008), Sambor Prei Kuk (2017), Koh Ker (2023) là Di sản Thế giới',
      'Vinh danh Múa Hoàng gia Robam Preah Reach Trop (2003) và Nhạc cụ Chapei Dang Veng (2016) là Di sản Phi vật thể',
      'Ứng dụng số hóa 3D, bảo tàng kỹ thuật số và khảo cổ học vệ tinh LiDAR'
    ],
    majorRulers: ['Quốc vương Norodom Sihanouk', 'Quốc vương Norodom Sihamoni'],
    iconicMonuments: ['Bảo tàng Quốc gia Campuchia', 'Cung điện Hoàng gia Phnom Penh'],
    representativeArtStyle: 'Bảo tồn Di sản Cổ điển & Mỹ thuật Đương đại Khmer',
    bannerImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85',
    relatedObjectIds: [
      'kh-artform-royal-ballet',
      'kh-artform-pinpeat-ensemble',
      'kh-manuscript-sastra-slekrith'
    ],
  },
];
