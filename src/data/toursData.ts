import { VirtualTour } from '../types/museum';

export const VIRTUAL_TOURS: VirtualTour[] = [
  {
    id: 'tour-devaraja-path',
    title: 'Hành Trình Tôn Giáo & Điêu Khắc Đền Tháp Angkor',
    titleKhmer: 'មាគ៌ាទេវរាជ៖ ដំណើរនៃព្រះមហាក្សត្រអង្គរ',
    titleEnglish: 'Path of Devotion: Sacred Sculptures and Architecture',
    tagline: 'Khám phá triết lý vũ trụ luận và các kiệt tác sa thạch từ thời kỳ Angkor',
    theme: 'Thần Quyền, Vũ Trụ Luận & Điêu Khắc Sa Thạch',
    coverImage: 'https://images.metmuseum.org/CRDImages/as/web-large/36_96_5_F.JPG',
    estimatedDuration: '30 Phút (4 Trạm Dừng)',
    stopsCount: 4,
    stops: [
      {
        id: 'stop-naga-buddha',
        title: 'Trạm 1: Tượng Phật Thích Ca Ngự Tòa Rắn Thần Mucalinda',
        titleKhmer: 'ព្រះពុទ្ធប្រក់នាគ',
        subtitle: 'Kiệt tác sa thạch thế kỷ 12 phản ánh đỉnh cao tạo hình Phật giáo thời Angkor Wat & Bayon',
        objectId: 'kh-met-38451',
        image: 'https://images.metmuseum.org/CRDImages/as/web-large/36_96_5_F.JPG',
        narrationText: 'Tác phẩm điêu khắc tròn hoàn hảo miêu tả Đức Phật Thích Ca ngồi kiết già thiền định trên các cuộn thân của rắn thần Mucalinda, với 7 đầu rắn xòe rộng che chở cho Đức Phật khỏi cơn mưa bão vũ trụ.',
        audioDuration: '2:15',
        historicalSignificance: 'Hiện vật đỉnh cao đại diện cho nghệ thuật Phật giáo Angkorian thế kỷ 12.',
        theologicalRole: 'Sự dung hợp hài hòa giữa tín ngưỡng Naga bản địa và giáo lý giải thoát của Phật giáo.',
        coordinates: [13.4125, 103.867]
      },
      {
        id: 'stop-antefix-guardian',
        title: 'Trạm 2: Chóp Mái Đền Chạm Khắc Thần Hộ Vệ Quỳ (Antefix)',
        titleKhmer: 'ចុងដំបូលប្រាសាទ',
        subtitle: 'Cấu kiện kiến trúc đền tháp sa thạch thế kỷ 10 thời kỳ Banteay Srei & Pre Rup',
        objectId: 'kh-met-65095',
        image: 'https://images.metmuseum.org/CRDImages/as/web-large/2003.142.jpg',
        narrationText: 'Các chóp mái Antefix được đặt tại các góc mái đền tháp để bảo vệ không gian thiêng liêng khỏi tà khí. Bức tượng thể hiện thần hộ vệ quỳ một chân với tư thế dũng mãnh và trang phục Sampot xếp nếp tinh xảo.',
        audioDuration: '2:00',
        historicalSignificance: 'Minh chứng cho kỹ nghệ đục đá và ghép mộng kiến trúc của các kiến trúc sư Angkor.',
        theologicalRole: 'Hộ trì cổng trời và trục núi thiêng Meru nơi các thần ngự trị.',
        coordinates: [13.5989, 103.9631]
      },
      {
        id: 'stop-shiva-standing',
        title: 'Trạm 3: Tượng Thần Shiva Đứng Uy Dũng Thời Angkor Wat',
        titleKhmer: 'ព្រះសិវៈ',
        subtitle: 'Tượng sa thạch thần Shiva thế kỷ 12 với con mắt thứ ba trên trán',
        objectId: 'kh-met-38158',
        image: 'https://images.metmuseum.org/CRDImages/as/web-large/LK.1987.17_DP310113R1_25W.jpg',
        narrationText: 'Thần Shiva được miêu tả trong tư thế đứng thẳng trang nghiêm, tóc búi cao hình chóp Jatamukuta, trán có con mắt thứ ba biểu trưng cho tuệ giác hủy diệt vô minh và tái tạo trật tự vũ trụ.',
        audioDuration: '2:30',
        historicalSignificance: 'Tác phẩm tiêu biểu của thời kỳ hoàng kim Suryavarman II.',
        theologicalRole: 'Đấng tối cao của nhánh Shaivism trong tôn giáo cung đình Angkor.',
        coordinates: [13.4125, 103.867]
      },
      {
        id: 'stop-brahma-deity',
        title: 'Trạm 4: Tượng Thần Phạm Thiên Brahma Ngũ Diện',
        titleKhmer: 'ព្រះព្រហ្ម',
        subtitle: 'Đấng Sáng Tạo Vũ Trụ với các gương mặt hướng về bốn phương',
        objectId: 'kh-met-38450',
        image: 'https://images.metmuseum.org/CRDImages/as/web-large/1987_311.JPG',
        narrationText: 'Tác phẩm sa thạch quý hiếm tạc Thần Phạm Thiên Brahma với nhiều gương mặt nhìn về các hướng không gian, thể hiện trí tuệ toàn tri bao trùm toàn cõi nhân sinh.',
        audioDuration: '2:10',
        historicalSignificance: 'Hiện vật được sưu tầm và nghiên cứu tại The Metropolitan Museum of Art.',
        theologicalRole: 'Đấng Sáng Tạo trong Tam thần nhất thể Trimurti của Ấn Độ giáo.',
        coordinates: [13.4413, 103.8587]
      }
    ]
  },
  {
    id: 'tour-sacred-sculpture',
    title: 'Hải Trình Điêu Khắc Thiêng: Từ Tiền Angkor Đến Đồ Đồng Mật Tông',
    titleKhmer: 'ដំណើរទស្សនកិច្ចបដិមាវិទ្យាដ៏ពិសិដ្ឋ',
    titleEnglish: 'Sacred Sculpture: Masterpieces of Pre-Angkor to Tantric Bronze',
    tagline: 'Chiêm ngưỡng ngôn ngữ tạo hình thần linh qua các thế kỷ mỹ thuật Khmer',
    theme: 'Mỹ Thuật, Điêu Khắc & Biểu Tượng Học',
    coverImage: 'https://images.metmuseum.org/CRDImages/as/web-large/LK.1993.477.3_DP310135r1_25F.jpg',
    estimatedDuration: '30 Phút (3 Trạm Dừng)',
    stopsCount: 3,
    stops: [
      {
        id: 'sculpt-harihara-preangkor',
        title: 'Trạm 1: Tượng Thần Hợp Nhất Harihara (Phù Nam - Chân Lạp)',
        subtitle: 'Sự dung hợp nhị nguyên tuyệt mỹ giữa Shiva và Vishnu thế kỷ 7-8',
        objectId: 'kh-met-38160',
        image: 'https://images.metmuseum.org/CRDImages/as/web-large/LK.1993.477.3_DP310135r1_25F.jpg',
        narrationText: 'Bức tượng Harihara thời tiền Angkor thể hiện nửa thân bên phải là Shiva (với búi tóc Jatamukuta) và nửa thân bên trái là Vishnu (với mũ trụ Kirita-mukuta). Thân hình mềm mại, giải phẫu cân đối là đặc trưng kinh điển của thời kỳ này.',
        audioDuration: '2:20',
        historicalSignificance: 'Minh chứng cho giai đoạn giao thoa và hòa hợp tôn giáo sớm ở Đông Nam Á.',
        theologicalRole: 'Biểu tượng hòa giải tôn giáo giữa hai dòng Shaivism và Vaishnavism.',
        coordinates: [11.5662, 104.9282]
      },
      {
        id: 'sculpt-hevajra-tantric',
        title: 'Trạm 2: Tượng Bán Thân Thần Hộ Pháp Hevajra Bằng Đồng',
        subtitle: 'Đỉnh cao kỹ thuật đúc đồng Mật Tông thời kỳ Vua Jayavarman VII',
        objectId: 'kh-met-38304',
        image: 'https://images.metmuseum.org/CRDImages/as/web-large/DT5215.jpg',
        narrationText: 'Tượng đồng Hevajra thể hiện vị thần hộ pháp Kim Cương thừa với nhiều đầu và cánh tay dang rộng, đúc bằng phương pháp sáp ong với chi tiết trang sức và biểu cảm gương mặt uy nghiêm.',
        audioDuration: '2:15',
        historicalSignificance: 'Phản ánh sự phát triển rực rỡ của Phật giáo Mật Tông thế kỷ 12-13 tại triều đình Angkor.',
        theologicalRole: 'Thần hộ pháp tối cao bảo vệ chánh pháp và hành giả tu tập Mật tông.',
        coordinates: [13.4413, 103.8587]
      },
      {
        id: 'sculpt-ganesha-standing',
        title: 'Trạm 3: Tượng Thần Đầu Voi Ganesha Đứng Uy Nghiêm',
        subtitle: 'Vị Thần của Trí Tuệ và sự Hóa Giải Chướng Ngại',
        objectId: 'kh-met-38297',
        image: 'https://images.metmuseum.org/CRDImages/as/web-large/DP701415.jpg',
        narrationText: 'Tượng Thần Ganesha bằng sa thạch với thân người đầu voi, vòi cầm bát đồ ngọt, tượng trưng cho trí tuệ minh triết và điềm lành trong mọi khởi đầu mới.',
        audioDuration: '2:00',
        historicalSignificance: 'Một trong những pho tượng Ganesha sa thạch bảo tồn nguyên vẹn nhất.',
        theologicalRole: 'Vị thần mang lại may mắn, thành công và học vấn.',
        coordinates: [13.4125, 103.867]
      }
    ]
  }
];
