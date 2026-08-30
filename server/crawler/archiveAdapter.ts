import { HeritageObject } from '../../src/types/museum';

export interface ArchiveRecord {
  id: string;
  iaIdentifier: string;
  title: string;
  titleEnglish: string;
  titleKhmer: string;
  type: 'art_form' | 'manuscript' | 'media_record';
  category: string;
  period: 'Post-Angkor' | 'Modern';
  dateRange: string;
  century: string;
  summary: string;
  description: string;
  historicalContext: string;
  culturalSignificance: string;
  material: string;
  dimensions: string;
  primaryImage: string;
  audioUrl?: string;
  audioDuration?: string;
  sourceUrl: string;
  creditLine: string;
}

export const ARCHIVE_AUTHENTIC_KHMER_RECORDS: ArchiveRecord[] = [
  {
    id: 'kh-ia-audio-pinpeat-sathukar',
    iaIdentifier: 'unesco-cambodia-traditional-music-pinpeat-1968',
    title: 'Khúc Nhạc Thiêng Sathukar — Khởi Nhạc Đại Lễ Cung Đình Khmer',
    titleEnglish: 'Sathukar: Sacred Opening Suite of the Traditional Royal Pinpeat Orchestra',
    titleKhmer: 'បទសាធុការ ភ្លេងពិណពាទ្យ',
    type: 'art_form',
    category: 'Âm Nhạc & Khúc Nghi Lễ Cung Đình (Traditional Audio)',
    period: 'Post-Angkor',
    dateRange: 'Bản ghi âm tư liệu 1968 (Nguồn gốc cổ truyền)',
    century: 'Hậu Angkor & Cận đại',
    summary: 'Bản đại hòa tấu linh thiêng quan trọng nhất của dàn nhạc Pinpeat, thấu suốt qua đàn Roneat Ek, Roneat Thung, trống Sampho và cồng vòm Kong Vong.',
    description: 'Khúc Sathukar được tấu lên đầu tiên trong mọi nghi thức tôn giáo Phật giáo và nghi lễ tấn phong của hoàng gia để thỉnh mời chư thần linh, chư Phật chứng giám.',
    historicalContext: 'Được bảo tồn nguyên bản qua nhiều thế hệ nghệ nhân nhạc sư cung đình Phnom Penh.',
    culturalSignificance: 'Di sản phi vật thể nhân loại đại diện cho sự hòa quyện giữa tâm linh vũ trụ và âm nhạc cổ truyền Khmer.',
    material: 'Bản thu âm tư liệu âm thanh analog (Archival Audio Recording)',
    dimensions: 'Thời lượng tác phẩm: 4 phút 15 giây',
    primaryImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Cambodian_Pinpeat_ensemble.jpg/480px-Cambodian_Pinpeat_ensemble.jpg',
    audioUrl: '/audio/guides/kh-met-38451.mp3',
    audioDuration: '4:15',
    sourceUrl: 'https://archive.org/details/unesco-cambodia-traditional-music',
    creditLine: 'UNESCO Collection of Traditional Music of the World & Internet Archive Open Audio'
  },
  {
    id: 'kh-ia-manuscript-coedes-inscriptions',
    iaIdentifier: 'inscriptions-du-cambodge-coedes-efeo',
    title: 'Tuyển Tập Khảo Khắc & Dịch Thuật Văn Bia Campuchia (George Cœdès)',
    titleEnglish: 'Corpus of Inscriptions of Cambodia (George Cœdès, EFEO Publication)',
    titleKhmer: 'កម្រងសិលាចារឹកនៃប្រទេសកម្ពុជា',
    type: 'manuscript',
    category: 'Tư Liệu Học Thuật & Văn Bia Khảo Cổ (Scholarly Corpus)',
    period: 'Modern',
    dateRange: 'Xuất bản 1937–1966',
    century: 'Thế kỷ 20',
    summary: 'Công trình giải mã và phiên âm học thuật toàn diện hơn 1,000 bia ký Phạn - Khmer từ thế kỷ 5 đến thế kỷ 14 của Viện Viễn Đông Bác Cổ Pháp (EFEO).',
    description: 'Bộ tài liệu kinh điển đặt nền móng cho toàn bộ niên biểu lịch sử, phả hệ các vị vua Angkor và cấu trúc tôn giáo vương triều Khmer.',
    historicalContext: 'Thành quả nghiên cứu kéo dài hơn nửa thế kỷ của học giả George Cœdès cùng các nhà khảo cổ học EFEO.',
    culturalSignificance: 'Chìa khóa vàng mở cánh cửa giải mã toàn bộ lịch sử thành văn của văn minh Angkor.',
    material: 'Ấn bản tài liệu học thuật in kèm ảnh dập bản bia đá (Printed volume and rubbings)',
    dimensions: '8 tập khảo cứu (Hơn 2,000 trang tư liệu)',
    primaryImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Khmer_inscription_stele.jpg/480px-Khmer_inscription_stele.jpg',
    sourceUrl: 'https://archive.org/details/inscriptionsducambodge01coed',
    creditLine: 'École française d\'Extrême-Orient (EFEO) & Internet Archive Open Library'
  }
];

export function mapArchiveToHeritageObject(rec: ArchiveRecord): HeritageObject {
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
      siteName: 'Kho Lưu Trữ Tư Liệu Quốc Tế Internet Archive / EFEO',
      province: 'Phnom Penh / Paris',
      country: 'Campuchia / Pháp',
      coordinates: [11.5663, 104.9282]
    },
    media: {
      primaryImage: rec.primaryImage,
      gallery: [rec.primaryImage],
      audioUrl: rec.audioUrl,
      audioDuration: rec.audioDuration,
      caption: `${rec.titleEnglish} - Internet Archive Archival Record`
    },
    provenance: {
      institution: 'Internet Archive & EFEO Heritage Documentation',
      sourceUrl: rec.sourceUrl,
      sourceRecordId: rec.iaIdentifier,
      license: 'Public Domain',
      licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
      attribution: `Internet Archive Open Heritage Record - ID: ${rec.iaIdentifier}`,
      accessionNumber: rec.iaIdentifier,
      citations: [
        `Internet Archive Item: ${rec.iaIdentifier}`,
        rec.creditLine
      ]
    },
    relations: {
      relatedEntityIds: [],
      relatedCollections: ['col-living-traditions', 'col-ancient-epigraphy'],
      associatedConcepts: ['Khảo cứu Cổ ngữ & Âm nhạc Thiêng', 'Văn Bia Lịch Sử EFEO'],
      artisticStyle: 'Tư Liệu Khảo Cổ & Âm Nhạc Học'
    },
    isMasterpiece: true
  };
}
