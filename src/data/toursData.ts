import { VirtualTour } from '../types/museum';

export const VIRTUAL_TOURS: VirtualTour[] = [
  {
    id: 'tour-devaraja-path',
    title: 'Hành Trình Con Đường Devaraja: Phụng Thờ Thần Vương Angkor',
    titleKhmer: 'មាគ៌ាទេវរាជ៖ ដំណើរនៃព្រះមហាក្សត្រអង្គរ',
    titleEnglish: 'The Path of the Devaraja: Divine Kingship of Angkor',
    tagline: 'Khám phá triết lý thần quyền và các đền núi vũ trụ từ Phnom Kulen đến Bayon',
    theme: 'Thần Quyền, Vũ Trụ Luận & Đền Núi',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    estimatedDuration: '45 Phút (6 Trạm Dừng)',
    stopsCount: 6,
    stops: [
      {
        id: 'stop-kulen-initiation',
        title: 'Trạm 1: Đỉnh Thiêng Mahendraparvata (Phnom Kulen)',
        titleKhmer: 'ភ្នំគូលេន',
        subtitle: 'Khởi nguồn giáo phái Thần Vương năm 802 SCN dưới thời Jayavarman II',
        objectId: 'kh-place-angkor-wat',
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
        narrationText: 'Vào năm 802 SCN, trên đỉnh núi thiêng Mahendraparvata (nay là Phnom Kulen), vua Jayavarman II đã thực hiện nghi lễ Bà-la-môn giáo bí truyền nhằm cắt đứt sự phụ thuộc vào Java và tuyên bố nền độc lập cho đế chế Angkor. Đây là khởi điểm của tín ngưỡng Devaraja (Thần Vương) – nơi đức vua được đồng nhất với thần Shiva và sau này là Phật Lokeshvara.',
        audioDuration: '2:15',
        historicalSignificance: 'Thành lập Đế quốc Angkor độc lập và thống nhất các tiểu quốc Chân Lạp.',
        theologicalRole: 'Trục vũ trụ Meru trên cõi trần, dòng suối Kbal Spean với hàng ngàn Linga thánh hóa dòng nước tưới tiêu toàn vùng Angkor.',
        coordinates: [13.6167, 104.1167]
      },
      {
        id: 'stop-bakong-first-mountain',
        title: 'Trạm 2: Đền Núi Bakong (Hariharalaya)',
        titleKhmer: 'ប្រាសាទបាគង',
        subtitle: 'Ngôi đền núi bằng sa thạch 5 tầng đầu tiên của nền kiến trúc Khmer (881 SCN)',
        image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
        narrationText: 'Vua Indravarman I xây dựng Bakong làm trung tâm của kinh đô Hariharalaya cổ xưa. Đây là ngôi đền kim tự tháp bậc thang bằng đá sa thạch đầu tiên, tượng trưng cho 5 tầng vũ trụ: Nagas, Garudas, Rakshasas, Yakshas và Đỉnh cao nhất nơi Thần Shiva ngự trị.',
        audioDuration: '2:30',
        historicalSignificance: 'Khuôn mẫu khởi đầu cho toàn bộ truyền thống kiến trúc đền núi kim tự tháp Angkor.',
        theologicalRole: 'Hệ thống bậc thang 5 tầng tái hiện vũ trụ quan Ấn Độ giáo và sự kết nối giữa người phàm và thần linh.',
        coordinates: [13.3361, 103.9742]
      },
      {
        id: 'stop-bakheng-new-capital',
        title: 'Trạm 3: Phnom Bakheng – Tâm Điểm Kinh Đô Yasodharapura',
        titleKhmer: 'ភ្នំបាខែង',
        subtitle: 'Tượng đài thiên văn học với 108 tháp nhỏ tương ứng các chu kỳ chiêm tinh học cổ đại',
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
        narrationText: 'Khi vua Yasovarman I dời đô về vùng Angkor vào cuối thế kỷ 9, ngài chọn ngọn đồi tự nhiên Bakheng làm trung tâm kinh đô mới. Đền Phnom Bakheng được thiết kế như một bộ lịch thiên văn học bằng đá khổng lồ với 108 tháp nhỏ xung quanh tháp trung tâm, biểu trưng cho 108 giai đoạn chu kỳ của vũ trụ.',
        audioDuration: '2:45',
        historicalSignificance: 'Định hình vị trí trung tâm địa chính trị của quần thể Angkor trong suốt 5 thế kỷ kế tiếp.',
        theologicalRole: 'Thiên đài tế lễ chiêm tinh và nơi lưu giữ đệ nhất ngọc xá lợi Linga hoàng gia Yasodharesvara.',
        coordinates: [13.4239, 103.8561]
      },
      {
        id: 'stop-angkor-wat-apex',
        title: 'Trạm 4: Đền Angkor Wat – Đỉnh Cao Tôn Vinh Thần Vishnu',
        titleKhmer: 'ប្រាសាទអង្គរវត្ត',
        subtitle: 'Tác phẩm kiến trúc kỳ vĩ nhất lịch sử nhân loại xây dựng dưới thời Suryavarman II',
        objectId: 'kh-place-angkor-wat',
        image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
        narrationText: 'Khác với truyền thống thờ thần Shiva hướng về phía Đông, Angkor Wat quay mặt về phía Tây – hướng của thần bảo hộ Vishnu và phương vị của hoàng hôn vĩnh cửu. Toàn bộ hào nước rộng 190 mét tượng trưng cho Đại dương Sữa Nguyên thủy (Kshirasagara), và 5 ngọn tháp vươn cao là hiện thân của 5 đỉnh núi thiêng Meru.',
        audioDuration: '3:20',
        historicalSignificance: 'Di sản Văn hóa Thế giới UNESCO, kiệt tác đỉnh cao của nghệ thuật tạo hình và thủy lợi cổ đại.',
        theologicalRole: 'Lăng tẩm hoàng gia và điện thờ thần Vishnu của vua Suryavarman II (được tôn xưng là Paramavishnuloka).',
        coordinates: [13.4125, 103.867]
      },
      {
        id: 'stop-west-mebon-vishnu',
        title: 'Trạm 5: Đảo Thiêng West Mebon & Đại Tượng Vishnu Bằng Đồng',
        titleKhmer: 'មេបុណ្យខាងលិច',
        subtitle: 'Pho tượng đồng nghìn năm tuổi mô tả giấc ngủ vũ trụ Anantasayana giữa lòng hồ nhân tạo',
        objectId: 'kh-art-vishnu-west-mebon',
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
        narrationText: 'Tọa lạc trên một hòn đảo nhân tạo hình vuông giữa lòng hồ Baray Tây rộng lớn, bức đại tượng Vishnu bằng đồng thế kỷ 11 dài hơn 6 mét được bài trí để nằm tựa trên mặt nước. Nước từ hồ thiêng chảy qua các ống dẫn xuất phát từ bức tượng, ban phước lành và sự phì nhiêu cho toàn bộ cánh đồng lúa của vương quốc.',
        audioDuration: '2:50',
        historicalSignificance: 'Đỉnh cao đúc đồng cổ đại lớn nhất Đông Nam Á thời kỳ tiền hiện đại.',
        theologicalRole: 'Thần Vishnu Anantasayana ngủ trên đại dương vũ trụ giữa hai chu kỳ sáng tạo.',
        coordinates: [13.435, 103.805]
      },
      {
        id: 'stop-bayon-faces',
        title: 'Trạm 6: Đền Bayon & Đức Vua Phật Bồ Tát Lokeshvara',
        titleKhmer: 'ប្រាសាទបាយ័ន',
        subtitle: '216 gương mặt nụ cười bí ẩn giám sát tứ phương của Đại đế Jayavarman VII',
        objectId: 'kh-place-bayon',
        image: 'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?auto=format&fit=crop&w=1200&q=80',
        narrationText: 'Đại đế Jayavarman VII đã biến đổi triệt để ý thức hệ thần quyền Khmer sang Phật giáo Đại thừa. Tại tâm điểm thành Angkor Thom, ngài dựng nên đền Bayon với hàng chục tháp mang 216 gương mặt mỉm cười an nhiên của Quán Thế Âm (Avalokiteshvara/Lokeshvara), dung hợp hoàn hảo giữa diện mạo đức vua và tâm từ bi của Đức Phật.',
        audioDuration: '3:05',
        historicalSignificance: 'Kinh đô Phật giáo đầu tiên của nền văn minh Angkor, biểu tượng đỉnh cao của lòng từ bi và sự hồi sinh sau chiến tranh.',
        theologicalRole: 'Hóa thân Bồ Tát của đức vua thế gian cứu độ chúng sinh thoát khỏi luân hồi đau khổ.',
        coordinates: [13.4413, 103.8587]
      }
    ]
  },
  {
    id: 'tour-sacred-sculpture',
    title: 'Hải Trình Điêu Khắc Thiêng: Từ Đất Sét Pre-Angkor Đến Tuyệt Tác Sa Thạch',
    titleKhmer: 'ដំណើរទស្សនកិច្ចបដិមាវិទ្យាដ៏ពិសិដ្ឋ',
    titleEnglish: 'Sacred Sculpture: Masterpieces of Stone, Bronze and Clay',
    tagline: 'Chiêm ngưỡng ngôn ngữ giải phẫu học và tạo hình thần linh qua 8 thế kỷ mỹ thuật Khmer',
    theme: 'Mỹ Thuật, Điêu Khắc & Biểu Tượng Học',
    coverImage: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1600&q=85',
    estimatedDuration: '35 Phút (4 Trạm Dừng)',
    stopsCount: 4,
    stops: [
      {
        id: 'sculpt-harihara-prasat-andat',
        title: 'Trạm 1: Tượng Thần Harihara Phù Nam - Chân Lạp',
        subtitle: 'Sự dung hợp nhị nguyên tuyệt mỹ giữa Shiva và Vishnu thế kỷ 7-8',
        objectId: 'kh-art-harihara-prasat-andet',
        image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=1200&q=80',
        narrationText: 'Bức tượng Harihara từ Prasat Andet là một trong những kiệt tác tạo hình xuất sắc nhất thế giới cổ đại. Nửa thân bên phải mang búi tóc Jatamukuta và lưỡi liềm của Shiva; nửa thân bên trái đội mũ trụ Kirita-mukuta của Vishnu. Đường nét cơ bắp mềm mại và sinh động thể hiện tay nghề bậc thầy thời tiền Angkor.',
        audioDuration: '2:20',
        historicalSignificance: 'Di sản bảo vật quốc gia lưu giữ tại Bảo tàng Quốc gia Phnom Penh.',
        theologicalRole: 'Biểu tượng hòa giải tôn giáo giữa hai phái Shaivism và Vaishnavism.',
        coordinates: [11.5662, 104.9282]
      },
      {
        id: 'sculpt-banteay-srei-lintel',
        title: 'Trạm 2: Trán Cửa Sa Thạch Hồng Banteay Srei',
        subtitle: 'Trang sức quý giá bằng đá với chi tiết chạm khắc tinh vi như ren thêu thế kỷ 10',
        objectId: 'kh-place-banteay-srei',
        image: 'https://images.unsplash.com/photo-1509024644558-2f56ce76c490?auto=format&fit=crop&w=1200&q=80',
        narrationText: 'Đền Banteay Srei (Đền Nữ Nhân) được dựng bằng đá sa thạch hồng quý hiếm dưới sự bảo trợ của đại học giả Yajnavaraha. Các trán cửa Lanh-tô tại đây minh họa sống động các sử thi Mahabharata và Ramayana với độ tinh xảo chạm lộng ba chiều không đối thủ trong lịch sử kiến trúc phương Đông.',
        audioDuration: '2:40',
        historicalSignificance: 'Đỉnh cao của phong cách Banteay Srei – thời kỳ hoàng kim của nghệ thuật điêu khắc trang trí.',
        theologicalRole: 'Tôn vinh đấng cứu rỗi Tribhuvanamahesvara (Chúa Tể Ba Cõi).',
        coordinates: [13.5989, 103.9631]
      },
      {
        id: 'sculpt-aspara-reliefs',
        title: 'Trạm 3: Vũ Nữ Cung Đình Apsara Trên Vách Đá Angkor Wat',
        subtitle: 'Hơn 1.800 bức phù điêu tiên nữ với y phục, trang sức và kiểu tóc độc bản',
        objectId: 'kh-art-apsara-relief-angkor-wat',
        image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
        narrationText: 'Dọc theo các hành lang và chân tháp Angkor Wat, các nghệ nhân đã chạm khắc gần hai ngàn tiên nữ Apsara. Mỗi bức tượng sở hữu một kiểu tóc, nụ cười và dáng điệu hoàn toàn riêng biệt, minh chứng cho sự phong phú phi thường của thời trang và trang sức cung đình Angkor thế kỷ 12.',
        audioDuration: '2:15',
        historicalSignificance: 'Kho tư liệu nhân chủng học và mỹ học thị giác vô giá về đời sống triều đình cổ đại.',
        theologicalRole: 'Các linh hồn tiên giới sinh ra từ cuộc Khuấy Biển Sữa, nhảy múa hầu cận thần linh.',
        coordinates: [13.4125, 103.867]
      },
      {
        id: 'sculpt-jayavarman-head',
        title: 'Trạm 4: Thủ Tượng Chân Dung Vua Jayavarman VII',
        subtitle: 'Chân dung giải phẫu nhân vật chân thực đầu tiên và nụ cười thiền định',
        objectId: 'kh-art-jayavarman-vii-head',
        image: 'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?auto=format&fit=crop&w=1200&q=80',
        narrationText: 'Tác phẩm điêu khắc từ Krol Romeas không còn lý tưởng hóa hình ảnh thần thánh vô cảm mà khắc họa trực tiếp gương mặt thật của một vị vua đã cao tuổi: mắt nhắm nghiền trong tĩnh tọa thiền định, môi mỉm cười nhẹ nhàng và vầng trán rộng phản chiếu trí tuệ uyên thâm.',
        audioDuration: '2:30',
        historicalSignificance: 'Chuyển biến mang tính cách mạng từ chủ nghĩa duy tâm thần bí sang chủ nghĩa hiện thực tâm linh.',
        theologicalRole: 'Hóa thân sống của Đức Phật Dược Sư và Bồ Tát Quán Tự Tại.',
        coordinates: [11.5662, 104.9282]
      }
    ]
  },
  {
    id: 'tour-living-heritage',
    title: 'Hành Trình Di Sản Sống: Từ Vũ Điệu Apsara Đến Âm Nhạc Cung Đình',
    titleKhmer: 'បេតិកភណ្ឌរស់៖ របាំក្បាច់បុរាណ និងតន្ត្រីពិណពាទ្យ',
    titleEnglish: 'Living Heritage: Royal Ballet and Sacred Melodies',
    tagline: 'Khám phá sự tiếp nối sống động của các nghi thức và nghệ thuật biểu diễn ngàn năm',
    theme: 'Di Sản Phi Vật Thể & Thực Hành Văn Hóa',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85',
    estimatedDuration: '30 Phút (3 Trạm Dừng)',
    stopsCount: 3,
    stops: [
      {
        id: 'live-royal-ballet',
        title: 'Trạm 1: Vũ Điệu Hoàng Gia Robam Preah Reach Trop',
        subtitle: 'Kiệt tác Di sản Phi vật thể Đại diện của Nhân loại UNESCO (2003)',
        image: 'https://images.unsplash.com/photo-1509024644558-2f56ce76c490?auto=format&fit=crop&w=1200&q=80',
        narrationText: 'Vũ điệu cung đình Khmer không đơn thuần là giải trí mà là một nghi lễ thiêng liêng kết nối trời và đất. Các ngón tay uốn cong linh hoạt tượng trưng cho mầm cây đâm chồi, hoa nở và quả chín, mang theo lời nguyện cầu mưa thuận gió hòa cho muôn dân.',
        audioDuration: '2:15',
        historicalSignificance: 'Gìn giữ kỹ thuật vũ đạo truyền thừa trực tiếp từ các vũ nữ cung đình Angkor.',
        theologicalRole: 'Sứ giả thiêng liêng chuyển tải lời thỉnh cầu của vua chúa đến chư thiên bảo hộ.',
        coordinates: [11.5621, 104.9316]
      },
      {
        id: 'live-pinpeat-orchestra',
        title: 'Trạm 2: Dàn Nhạc Lễ Cung Đình Pinpeat',
        subtitle: 'Thanh âm chuông đồng, cồng chiêng và đàn mộc cầm vang vọng qua ngàn năm',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
        narrationText: 'Dàn nhạc Pinpeat gồm các nhạc cụ gõ bằng đồng (Kong Vong), đàn phiến gỗ (Roneat Ek), kèn dăm đôi (Sralai) và trống đôi linh thiêng (Sampho). Cấu trúc âm nhạc sử dụng thang âm 7 cung đều cổ truyền, giữ nhịp cho tất cả các đại lễ Phật giáo và nghi thức triều đình.',
        audioDuration: '2:25',
        historicalSignificance: 'Nhạc cụ đã được chạm khắc chi tiết trên các phù điêu đá đền Angkor Wat và Bayon.',
        theologicalRole: 'Thanh âm tế lễ thức tỉnh thần linh và tạo nên không gian linh thánh cho nghi thức.',
        coordinates: [11.5621, 104.9316]
      },
      {
        id: 'live-shadow-theatre',
        title: 'Trạm 3: Kịch Bóng Lớn Sbek Thom',
        subtitle: 'Nghệ thuật trình diễn múa rối da bò thiêng liêng trong đêm lửa rừng',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
        narrationText: 'Sbek Thom là hình thức sân khấu kịch bóng với những hình nhân da bò lớn cao tới 2 mét được đục lỗ tinh xảo. Buổi diễn diễn ra ngoài trời sau màn chiếu trắng được thắp sáng bằng lửa gáo dừa, kể lại những trường đoạn kịch tính trong sử thi Reamker.',
        audioDuration: '2:10',
        historicalSignificance: 'Được UNESCO vinh danh Di sản Phi vật thể thế giới năm 2005.',
        theologicalRole: 'Nghi thức trừ tà và tôn vinh công lý, lòng trung thành theo giáo lý Phật giáo và sử thi Hindu.',
        coordinates: [13.3671, 103.8448]
      }
    ]
  }
];
