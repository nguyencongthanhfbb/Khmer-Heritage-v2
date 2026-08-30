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
    bannerImage: 'https://images.metmuseum.org/CRDImages/as/web-large/LK.1993.477.3_DP310135r1_25F.jpg',
    relatedObjectIds: ['kh-met-38160', 'kh-met-39221'],
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
      'Sự xuất hiện rộng rãi của văn bia chữ Khmer cổ đầu tiên'
    ],
    majorRulers: ['Bhavavarman I', 'Mahendravarman (Citrasena)', 'Isanavarman I', 'Jayavarman I'],
    iconicMonuments: ['Sambor Prei Kuk', 'Prasat Andet', 'Vat Phou'],
    representativeArtStyle: 'Phong cách Sambor Prei Kuk & Prasat Andet',
    bannerImage: 'https://images.metmuseum.org/CRDImages/as/web-large/38.62.jpg',
    relatedObjectIds: ['kh-met-38160', 'kh-met-38620', 'kh-met-44965'],
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
      'Đỉnh cao nghệ thuật đúc đồng đại quy mô và tượng sa thạch tôn giáo',
      'Hệ thống biểu tượng thần thoại và nghệ thuật tạc tượng Phật ngự đài rắn Mucalinda'
    ],
    majorRulers: [
      'Jayavarman II (802–835)',
      'Yasovarman I (889–910)',
      'Suryavarman II (1113–1150)',
      'Jayavarman VII (1181–1218)'
    ],
    iconicMonuments: ['Angkor Wat', 'Bayon', 'Banteay Srei', 'Ta Prohm', 'Preah Khan', 'West Mebon'],
    representativeArtStyle: 'Kulen, Koh Ker, Banteay Srei, Angkor Wat, Bayon Styles',
    bannerImage: 'https://images.metmuseum.org/CRDImages/as/web-large/36_96_5_F.JPG',
    relatedObjectIds: [
      'kh-si-f1992-51',
      'kh-si-f1993-18',
      'kh-si-f1998-74',
      'kh-nmc-west-mebon-vishnu',
      'kh-met-38451',
      'kh-met-38304',
      'kh-met-38450',
      'kh-met-38297',
      'kh-met-38158',
      'kh-met-65095'
    ],
  },
  {
    id: 'epoch-post-angkor',
    name: 'Thời Kỳ Hậu Angkor & Tái Thiết (Middle Period)',
    nameKhmer: 'សម័យក្រោយអង្គរ (សម័យកណ្តាល)',
    timeSpan: 'Thế kỷ 15 – Thế kỷ 19 SCN (1431 – 1863 SCN)',
    startYear: 1431,
    endYear: 1863,
    description: 'Chuyển dời trung tâm chính trị về Chaktomuk (Phnom Penh), Longvek và Oudong. Sự truyền bá sâu rộng của Phật giáo Thượng tọa bộ (Theravada), phát triển các pho tượng Phật đồng và kinh sách lá buông.',
    keyDevelopments: [
      'Phát triển trường thiên sử thi Reamker (bản Khmer của sử thi Ramayana)',
      'Sao chép và lưu giữ kho tàng kinh Phật giáo trên lá buông Sastra Slekrith',
      'Đúc các pho tượng Phật Thích Ca bằng đồng thếp vàng với phong cách uyển chuyển'
    ],
    majorRulers: ['Ponhea Yat', 'Ang Duong', 'Norodom'],
    iconicMonuments: ['Kinh đô Oudong', 'Wat Phnom', 'Chùa Bạc (Wat Preah Keo Morakot)'],
    representativeArtStyle: 'Phong cách Nghệ thuật Hậu Angkor & Tượng Phật Đồng',
    bannerImage: 'https://images.metmuseum.org/CRDImages/as/web-large/38.90.3.jpg',
    relatedObjectIds: [
      'kh-loc-2021669412',
      'kh-tex-khmer-silk-pidan',
      'kh-art-roneat-ek-pinpeat',
      'kh-met-38903',
      'kh-met-38908'
    ],
  },
  {
    id: 'epoch-modern',
    name: 'Kỷ Nguyên Bảo Tồn & Hồi Sinh Di Sản (Modern Era)',
    nameKhmer: 'សម័យទំនើប និង ការអភិរក្សបេតិកភណ្ឌ',
    timeSpan: 'Thế kỷ 19 đến Nay (1863 – Hiện tại)',
    startYear: 1863,
    endYear: 2026,
    description: 'Thời kỳ nghiên cứu khảo cổ học khoa học của Viện EFEO, thành lập Bảo tàng Quốc gia Phnom Penh, ghi danh Di sản Thế giới UNESCO và số hóa lưu trữ bảo tàng toàn cầu.',
    keyDevelopments: [
      'Ghi danh Quần thể Angkor vào Danh mục Di sản Thế giới UNESCO (1992)',
      'Hồi hương các bảo vật bị thất lạc từ các bảo tàng và bộ sưu tập quốc tế',
      'Xây dựng cơ sở dữ liệu số hóa bảo tàng mở Open Access CC0 bảo tồn vĩnh cửu'
    ],
    majorRulers: ['Norodom Sihanouk', 'Norodom Sihamoni'],
    iconicMonuments: ['Bảo tàng Quốc gia Campuchia (Phnom Penh)', 'Bảo tàng Quốc gia Angkor (Siem Reap)'],
    representativeArtStyle: 'Bảo tồn Di sản Quốc tế & Số hóa 3D',
    bannerImage: 'https://images.metmuseum.org/CRDImages/as/web-large/DT5215.jpg',
    relatedObjectIds: [
      'kh-loc-2004667825',
      'kh-loc-2017648325',
      'kh-ia-manuscript-coedes-inscriptions',
      'kh-ia-audio-pinpeat-sathukar',
      'kh-met-38451',
      'kh-met-38304'
    ],
  }
];
