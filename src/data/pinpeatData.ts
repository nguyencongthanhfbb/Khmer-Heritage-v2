import { PinpeatInstrument } from '../types/museum';

export const PINPEAT_INSTRUMENTS: PinpeatInstrument[] = [
  {
    id: 'inst-roneat-ek',
    name: 'Đàn Mộc Cầm Roneat Ek',
    nameKhmer: 'រនាតឯក',
    nameEnglish: 'High-Pitched Bamboo/Hardwood Xylophone',
    category: 'Bộ Gõ Thanh Phiến (Idiophone)',
    material: 'Thanh đàn bằng gỗ mun (Mai Neang) hoặc tre già phơi khô, máng đàn hình thuyền bằng gỗ chạm khắc mạ vàng.',
    baseFrequencyHz: 440,
    soundType: 'triangle',
    tuningPitch: 'Thang 21 phím âm, định âm A4 (La chuẩn), âm vực 3 quãng tám.',
    ritualRole: 'Nhạc cụ lĩnh xướng giai điệu chính trong tất cả các bản đại hòa tấu cung đình Robam Preah Reach Trop.',
    description: 'Roneat Ek dẫn dắt toàn bộ dàn nhạc Pinpeat bằng các chuỗi nốt rải hoa mỹ với tốc độ nhanh và kỹ thuật vê dùi điêu luyện.',
    scholarlyImportance: 'Xuất hiện liên tục trên các bức bích họa hoàng cung và văn bia thế kỷ 16 miêu tả đại lễ cầu an.'
  },
  {
    id: 'inst-kong-vong-touch',
    name: 'Dàn Cồng Vòng Kong Vong Touch',
    nameKhmer: 'គងវង់តូច',
    nameEnglish: 'Small Gong Circle (16 Bronze Gongs)',
    category: 'Bộ Gõ Kim Loại Cung Tròn (Metallophone)',
    material: 'Khung vòng mây uốn cong bán nguyệt, 16 chiêng đồng có núm đúc thủ công tinh xảo treo bằng dây da.',
    baseFrequencyHz: 523,
    soundType: 'sine',
    tuningPitch: '16 núm chiêng theo thang âm 7 cung đều (C5 đến D7).',
    ritualRole: 'Tạo nên trục khung sườn giai điệu nền tảng cho bản nhạc nghi lễ cúng dường chư thiên.',
    description: 'Nghệ nhân ngồi xếp bằng ở tâm vòng chiêng, dùng hai dùi bọc da mềm để gõ giai điệu cốt lõi mượt mà và vang xa.',
    scholarlyImportance: 'Hình ảnh vòng chiêng tròn đã được chạm khắc rõ nét trên vách đá đền Angkor Wat thế kỷ 12.'
  },
  {
    id: 'inst-sampho',
    name: 'Trống Nghi Lễ Sampho',
    nameKhmer: 'សម្ភោរ',
    nameEnglish: 'Sacred Double-Headed Barrel Drum',
    category: 'Bộ Gõ Màng Da (Membranophone)',
    material: 'Thân rỗng bằng gỗ xoan rừng nguyên khối, hai mặt bọc da bò đực và da bê tơ, đặt trên giá gỗ mạ sơn son.',
    baseFrequencyHz: 130,
    soundType: 'square',
    tuningPitch: 'Mặt lớn định âm trầm (bass), mặt nhỏ âm cao; gắn một miếng sáp cơm nếp (Chhat) ở tâm để chỉnh cao độ.',
    ritualRole: 'Nhạc cụ linh thiêng tối cao – người giữ nhịp chủ trì bắt đầu và kết thúc mọi buổi lễ thiêng.',
    description: 'Trước mỗi buổi biểu diễn, nghệ nhân Sampho luôn thắp hương khấn nguyện thần nhạc Krông Peali ban phước.',
    scholarlyImportance: 'Được coi là hiện thân sống của tổ nghiệp nghệ thuật biểu diễn Khmer từ thời tiền sử.'
  },
  {
    id: 'inst-sralai',
    name: 'Kèn Dăm Đôi Sralai',
    nameKhmer: 'ស្រឡៃ',
    nameEnglish: 'Quadruple-Reed Oboe',
    category: 'Bộ Hơi Dăm Lá (Aerophone)',
    material: 'Thân kèn bằng gỗ trắc tiện phình ở giữa, 6 lỗ bấm, dăm kèn làm từ 4 lá thốt nốt khô xếp lớp.',
    baseFrequencyHz: 330,
    soundType: 'sawtooth',
    tuningPitch: 'Âm sắc cao vút, réo rắt, có khả năng lướt âm (glissando) vô tận nhờ kỹ thuật thở vòng liên tục.',
    ritualRole: 'Âm thanh duy nhất của bộ hơi, mô phỏng tiếng kêu của chim muông tiên giới và tiếng gió vũ trụ.',
    description: 'Nghệ nhân Sralai sử dụng kỹ thuật lấy hơi qua mũi trong khi miệng vẫn thổi khí liên tục không ngắt quãng.',
    scholarlyImportance: 'Nhạc cụ cổ kính nhất Đông Nam Á phản ánh kỹ nghệ chế tác màng rung tự nhiên từ cây thốt nốt.'
  },
  {
    id: 'inst-skor-thom',
    name: 'Cặp Đại Cổ Skor Thom',
    nameKhmer: 'ស្គរធំ',
    nameEnglish: 'Pair of Giant Barrel Drums',
    category: 'Bộ Gõ Đại Màng (Membranophone)',
    material: 'Thân trống đại bằng thân cây gỗ lim cổ thụ, hai mặt bịt da trâu rừng già nẹp bằng đinh chốt gỗ gõ.',
    baseFrequencyHz: 85,
    soundType: 'square',
    tuningPitch: 'Trống Đực (Skor Chhmol) âm vang dội đanh thép, Trống Cái (Skor Gné) âm trầm sâu lắng.',
    ritualRole: 'Tạo nên tiếng sấm sét vũ trụ uy nghi trong các màn múa chiến trận sử thi Reamker.',
    description: 'Cặp trống được dựng nghiêng trên hai giá đỡ vững chắc, nghệ nhân dùng hai dùi gỗ nặng đánh dồn dập đầy uy lực.',
    scholarlyImportance: 'Biểu tượng của sức mạnh vương triều và vũ bão trong các cuộc duyệt binh hoàng gia Angkor.'
  }
];
