import { HeritageQuizQuestion } from '../types/museum';

export const HERITAGE_QUIZ_QUESTIONS: HeritageQuizQuestion[] = [
  {
    id: 'quiz-q1-angkor-wat-orientation',
    category: 'Kiến Trúc & Vũ Trụ Luận',
    question: 'Tại sao đền Angkor Wat quay mặt về hướng Tây, trái ngược với phần lớn các đền thờ Bà-la-môn giáo khác ở Angkor quay về hướng Đông?',
    questionKhmer: 'ហេតុអ្វីបានជាប្រាសាទអង្គរវត្តបែរមុខទៅទិសខាងលិច?',
    options: [
      'Để đón ánh hoàng hôn và tôn vinh thần Vishnu – vị thần gắn liền với phương Tây và lăng mộ hoàng gia của vua Suryavarman II',
      'Do địa hình đầm lầy phía Đông không cho phép xây dựng cổng chào',
      'Để hướng về vương quốc Champa cổ đại nhằm mục đích phòng thủ quân sự',
      'Theo chỉ dụ của các tu sĩ Phật giáo Theravada khi xây dựng ban đầu'
    ],
    correctAnswerIndex: 0,
    scholarlyExplanation: 'Angkor Wat được vua Suryavarman II xây dựng làm điện thờ tôn vinh thần bảo hộ Vishnu và cũng là lăng tẩm hoàng gia (Paramavishnuloka). Trong vũ trụ luận Hindu giáo, hướng Tây là phương vị ngự trị của thần Vishnu và tượng trưng cho thế giới bên kia, vì vậy các bức phù điêu hành lang được bố trí đọc ngược chiều kim đồng hồ (Prasavya) theo nghi thức tang lễ thiêng liêng.',
    academicCitation: 'Cœdès, G. (1968). The Indianized States of Southeast Asia. East-West Center Press, pp. 162-164.',
    relatedObjectId: 'kh-place-angkor-wat'
  },
  {
    id: 'quiz-q2-bayon-faces',
    category: 'Biểu Tượng Học & Phật Giáo',
    question: 'Hơn 200 gương mặt khổng lồ mỉm cười trên các ngọn tháp đền Bayon biểu trưng cho vị thần hoặc hình mẫu nào?',
    questionKhmer: 'តើព្រះភ័ក្ត្រទាំងឡាយនៅប្រាសាទបាយ័នតំណាងឱ្យអ្វី?',
    options: [
      'Thần sáng tạo Brahma 4 mặt của Ấn Độ giáo truyền thống',
      'Đức Phật Bồ Tát Quán Thế Âm (Avalokiteshvara / Lokeshvara) dung hợp với dung mạo vua Jayavarman VII',
      'Chân dung 54 vị tướng quân dũng cảm nhất của quân đội Khmer',
      'Hình mẫu Garuda tiêu diệt loài rắn Naga'
    ],
    correctAnswerIndex: 1,
    scholarlyExplanation: 'Dưới triều đại Đại đế Jayavarman VII, Phật giáo Đại thừa trở thành quốc giáo. Các ngọn tháp bốn mặt của đền Bayon mang gương mặt từ bi của Bồ Tát Lokeshvara – đấng cứu khổ cứu nạn nhìn thấu bốn phương, đồng thời phản chiếu thần thái an nhiên và uy quyền của chính đức vua trị vì.',
    academicCitation: 'Mus, P. (1937). "Chronique de l\'art khmer: Le symbolisme du Bayon." Bulletin de l\'École française d\'Extrême-Orient (BEFEO), 37(1), 57-98.',
    relatedObjectId: 'kh-place-bayon'
  },
  {
    id: 'quiz-q3-banteay-srei-material',
    category: 'Khảo Cổ & Điêu Khắc',
    question: 'Chất liệu đặc biệt nào đã tạo nên sắc hồng ngọc tráng lệ và những đường nét chạm khắc sắc sảo như ren thêu của đền Banteay Srei?',
    questionKhmer: 'តើប្រាសាទបន្ទាយស្រីត្រូវបានកសាងឡើងដោយថ្មប្រភេទណា?',
    options: [
      'Đá cẩm thạch trắng nhập khẩu từ Nam Á',
      'Đá sa thạch màu hồng tự nhiên (Pink Sandstone) có độ hạt mịn và độ cứng cao',
      'Đá hoa cương bazan núi lửa từ cao nguyên Khorat',
      'Gạch nung tráng men màu son đỏ hoàng gia'
    ],
    correctAnswerIndex: 1,
    scholarlyExplanation: 'Banteay Srei được xây dựng bằng sa thạch hồng quý hiếm khai thác từ các mỏ đá chân núi Kulen. Loại sa thạch này mềm khi mới khai thác giúp nghệ nhân chạm khắc chi tiết cực kỳ tinh vi, nhưng sẽ cứng lại theo thời gian khi tiếp xúc với không khí, bảo tồn nguyên vẹn các đường nét sắc lẹm sau hơn 1.000 năm.',
    academicCitation: 'Boisselier, J. (1966). Le Cambodge: Manuel d\'Archéologie d\'Extrême-Orient. Picard, Paris.',
    relatedObjectId: 'kh-place-banteay-srei'
  },
  {
    id: 'quiz-q4-west-mebon-vishnu',
    category: 'Kim Hoàn & Đúc Đồng Cổ Đại',
    question: 'Pho đại tượng Vishnu bằng đồng tìm thấy tại đền West Mebon tái hiện thần thoại kinh điển nào của Ấn Độ giáo?',
    questionKhmer: 'តើព្រះវិស្ណុសំរឹទ្ធនៅមេបុណ្យខាងលិចតំណាងឱ្យទេវកថាអ្វី?',
    options: [
      'Thần Vishnu hóa thân thành chàng Krishna nâng ngọn núi Govardhana',
      'Thần Vishnu trong giấc ngủ vũ trụ (Anantasayana) trên mình rắn thần Shesha giữa lòng đại dương',
      'Trận chiến tiêu diệt quỷ vương Ravana trong sử thi Ramayana',
      'Thần Vishnu bước 3 bước thu phục ba cõi (Trivikrama)'
    ],
    correctAnswerIndex: 1,
    scholarlyExplanation: 'Đại tượng Vishnu West Mebon (thế kỷ 11) được thiết kế nằm nghiêng trên mặt nước ở đền đảo giữa hồ Baray Tây rộng lớn. Tư thế này tái hiện thần thoại Anantasayana: thần Vishnu nằm ngủ thanh tịnh trên đại dương vũ trụ giữa hai chu kỳ sáng tạo và hủy diệt thế giới, ban phước cho nguồn nước tưới tiêu nông nghiệp.',
    academicCitation: 'Jessup, H. I., & Zephir, T. (1997). Sculpture of Angkor and Ancient Cambodia: Millennium of Glory. National Gallery of Art, Washington.',
    relatedObjectId: 'kh-art-vishnu-west-mebon'
  },
  {
    id: 'quiz-q5-kbal-spean-lingas',
    category: 'Hệ Thống Thủy Lợi & Tôn Giáo',
    question: 'Mục đích chính của việc chạm khắc hàng ngàn Linga và Yoni (Sahasralinga) dưới đáy lòng suối Kbal Spean là gì?',
    questionKhmer: 'តើការឆ្លាក់លិង្គ ១០០០ នៅក្បាលស្ពានមានគោលបំណងអ្វី?',
    options: [
      'Để tạo lực ma sát làm giảm tốc độ lũ quét mùa mưa',
      'Để thánh hóa và gia trì năng lượng phì nhiêu cho dòng nước trước khi chảy về đồng bằng Angkor',
      'Đánh dấu mốc ranh giới lãnh thổ giữa các vương triều Chân Lạp',
      'Làm bàn thờ hỏa táng bí mật của các cao tăng Bà-la-môn'
    ],
    correctAnswerIndex: 1,
    scholarlyExplanation: 'Dòng suối Kbal Spean trên núi Kulen được chạm khắc hơn 1.000 Linga và phù điêu thần thoại trực tiếp trên lòng đá sa thạch. Khi dòng nước tinh khiết từ trên núi chảy qua các Linga, nước được coi là đã biến thành "Nước Thánh Sáng Tạo" mang theo sinh lực của Shiva tưới tiêu cho các cánh đồng lúa bạt ngàn của kinh đô Angkor.',
    academicCitation: 'Boulbet, J., & Dagens, B. (1973). "Les sites archéologiques de la région du Bhnam Kulen." Arts Asiatiques, 27(1), 1-130.'
  }
];
