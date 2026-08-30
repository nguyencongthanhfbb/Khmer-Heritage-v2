import placesBundle from '../../content/places/places_bundle.json';

export interface PlaceRecord {
  siteName: string;
  province: string;
  coordinates: [number, number] | number[];
  objectCount: number;
  khmerName?: string;
  historicalPeriod?: string;
  description?: string;
}

export const PLACES_DATA: PlaceRecord[] = placesBundle.places.map((place) => {
  let khmerName = 'ទីតាំងបុរាណវិទ្យា';
  let historicalPeriod = 'Angkor Era';
  let description = 'Khu di tích khảo cổ và thánh tích lịch sử thời kỳ Angkor và Tiền Angkor.';

  if (place.siteName.includes('Angkor Thom') || place.siteName.includes('Bayon')) {
    khmerName = 'ប្រាសាទបាយ័ន / អង្គរធំ';
    historicalPeriod = 'Cuối thế kỷ 12 (Vua Jayavarman VII)';
    description = 'Kinh đô hoàng gia Angkor Thom nổi tiếng với tháp 4 mặt cười từ bi của Bồ Tát Lokeshvara.';
  } else if (place.siteName.includes('Banteay Chhmar')) {
    khmerName = 'ប្រាសាទបន្ទាយឆ្មារ';
    historicalPeriod = 'Thế kỷ 12 – 13';
    description = 'Đại tự viện đồ sộ vùng biên viễn Tây Bắc với các bức phù điêu Bồ Tát Quan Âm nhiều tay độc nhất vô nhị.';
  } else if (place.siteName.includes('Banteay Srei') || place.siteName.includes('Pre Rup')) {
    khmerName = 'ប្រាសាទបន្ទាយស្រី';
    historicalPeriod = 'Thế kỷ 10 (Năm 967)';
    description = 'Tuyệt tác điêu khắc sa thạch hồng được ca ngợi là viên ngọc quý của nghệ thuật chạm khắc Khmer cổ điển.';
  } else if (place.siteName.includes('Koh Ker')) {
    khmerName = 'រាជធានីកោះកេរ្តិ៍';
    historicalPeriod = 'Thế kỷ 10 (Vua Jayavarman IV)';
    description = 'Kinh đô kim tự tháp 7 tầng Prasat Thom với các kiệt tác điêu khắc tượng chuyển động mạnh mẽ.';
  } else if (place.siteName.includes('Bakong') || place.siteName.includes('Roluos')) {
    khmerName = 'ប្រាសាទបាគង / រលួស';
    historicalPeriod = 'Thế kỷ 9 (Vua Indravarman I)';
    description = 'Ngôi đền núi bằng đá đầu tiên của thời kỳ Angkor, trung tâm của kinh đô Hariharalaya cổ xưa.';
  } else if (place.siteName.includes('Prasat Andet')) {
    khmerName = 'ប្រាសាទអណ្តែត';
    historicalPeriod = 'Thế kỷ 7 – 8 (Chân Lạp)';
    description = 'Ngôi đền gạch Tiền Angkor nổi tiếng với các pho tượng Thần Harihara có tỷ lệ điêu khắc mẫu mực.';
  } else if (place.siteName.includes('Phnom Da')) {
    khmerName = 'ភ្នំដា';
    historicalPeriod = 'Thế kỷ 6 (Phù Nam)';
    description = 'Thánh địa khởi nguồn của nền điêu khắc đá Khmer sơ khởi với phong cách tượng đứng mềm mại.';
  } else if (place.siteName.includes('Sambor Prei Kuk')) {
    khmerName = 'សម្បូរព្រៃគុក';
    historicalPeriod = 'Thế kỷ 7 (Kinh đô Isanapura)';
    description = 'Quần thể tháp bát giác bằng gạch Tiền Angkor, Di sản Văn hóa Thế giới UNESCO.';
  }

  return {
    ...place,
    khmerName,
    historicalPeriod,
    description
  };
});
