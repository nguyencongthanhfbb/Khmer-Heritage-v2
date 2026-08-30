import institutionsBundle from '../../content/institutions/institutions_bundle.json';

export interface InstitutionRecord {
  institution: string;
  license: string;
  sourceUrl: string;
  objectCount: number;
  khmerName?: string;
  locationCity?: string;
  description?: string;
}

export const INSTITUTIONS_DATA: InstitutionRecord[] = institutionsBundle.institutions.map((inst) => {
  let khmerName = 'សារមន្ទីរ';
  let locationCity = 'Quốc tế';
  let description = 'Viện lưu trữ và bảo tồn di sản nghệ thuật Khmer cổ đại.';

  if (inst.institution.includes('Metropolitan')) {
    khmerName = 'សារមន្ទីរសិល្បៈ Metropolitan (The Met)';
    locationCity = 'New York, Hoa Kỳ';
    description = 'Một trong những bảo tàng lớn nhất thế giới với bộ sưu tập điêu khắc Đông Nam Á đồ sộ theo chính sách Open Access CC0.';
  } else if (inst.institution.includes('Smithsonian')) {
    khmerName = 'សារមន្ទីរសិល្បៈអាស៊ីជាតិ Smithsonian';
    locationCity = 'Washington D.C., Hoa Kỳ';
    description = 'Phòng trưng bày Freer & Sackler lưu giữ các kiệt tác đồ đồng và điêu khắc đá Khmer quý hiếm.';
  } else if (inst.institution.includes('Library of Congress')) {
    khmerName = 'បណ្ណាល័យសភាអាមេរិក';
    locationCity = 'Washington D.C., Hoa Kỳ';
    description = 'Lưu trữ bản đồ trắc địa lịch sử và tư liệu nhiếp ảnh khảo cổ đầu thế kỷ 20 về Angkor.';
  } else if (inst.institution.includes('National Museum of Cambodia') || inst.institution.includes('Quốc gia Campuchia')) {
    khmerName = 'សារមន្ទីរជាតិកម្ពុជា';
    locationCity = 'Phnom Penh, Campuchia';
    description = 'Bảo tàng lịch sử và khảo cổ hàng đầu của Vương quốc Campuchia, nơi lưu giữ bảo vật quốc gia.';
  } else if (inst.institution.includes('Internet Archive') || inst.institution.includes('EFEO')) {
    khmerName = 'បណ្ណសារបារាំងចុងបូព៌ា (EFEO)';
    locationCity = 'Paris & Siem Reap';
    description = 'Viện Viễn Đông Bác Cổ Pháp và kho tư liệu âm học truyền thống Khmer UNESCO.';
  }

  return {
    ...inst,
    khmerName,
    locationCity,
    description
  };
});
