import fs from 'fs';
import path from 'path';
import { HeritageObject } from '../../src/types';

export interface MetObjectRaw {
  objectID: number;
  isHighlight?: boolean;
  accessionNumber?: string;
  accessionYear?: string;
  isPublicDomain?: boolean;
  primaryImage?: string;
  primaryImageSmall?: string;
  additionalImages?: string[];
  department?: string;
  objectName?: string;
  title?: string;
  culture?: string;
  period?: string;
  dynasty?: string;
  reign?: string;
  objectDate?: string;
  objectBeginDate?: number;
  objectEndDate?: number;
  medium?: string;
  dimensions?: string;
  creditLine?: string;
  country?: string;
  region?: string;
  classification?: string;
  repository?: string;
  objectURL?: string;
  tags?: Array<{ term: string; Wikidata_URL?: string }>;
}

export interface CrawlProgress {
  status: 'idle' | 'running' | 'completed' | 'error';
  totalFound: number;
  crawledCount: number;
  validPublicDomainCount: number;
  lastRun?: string;
  logs: string[];
  error?: string;
}

export class MetMuseumCrawler {
  private outputFilePath = path.join(process.cwd(), 'src', 'data', 'crawledMuseumData.json');
  private progress: CrawlProgress = {
    status: 'idle',
    totalFound: 0,
    crawledCount: 0,
    validPublicDomainCount: 0,
    logs: [],
  };

  public getProgress(): CrawlProgress {
    return { ...this.progress };
  }

  public getStoredObjects(): HeritageObject[] {
    try {
      if (fs.existsSync(this.outputFilePath)) {
        const raw = fs.readFileSync(this.outputFilePath, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.error('Error reading crawled data:', err);
    }
    return [];
  }

  private mapPeriod(periodStr?: string, beginDate?: number, endDate?: number): 'Pre-Angkor' | 'Funan' | 'Chenla' | 'Angkor' | 'Post-Angkor' | 'Modern' {
    const p = (periodStr || '').toLowerCase();
    const begin = beginDate || 0;
    const end = endDate || 0;

    if (p.includes('pre-angkor') || p.includes('funan') || p.includes('chenla')) {
      if (end > 0 && end <= 550) return 'Funan';
      if (begin >= 550 && end <= 802) return 'Chenla';
      return 'Pre-Angkor';
    }
    if (p.includes('angkor') || (begin >= 802 && begin <= 1431) || (end >= 802 && end <= 1431)) {
      return 'Angkor';
    }
    if (p.includes('post-angkor') || begin > 1431 || end > 1431) {
      return 'Post-Angkor';
    }
    if (end > 0 && end < 802) return 'Pre-Angkor';
    if (begin >= 802 && begin <= 1431) return 'Angkor';
    return 'Angkor';
  }

  private translateTitleToVietnamese(titleEn: string): string {
    let title = (titleEn || 'Hiện vật Khảo cổ Khmer').trim();
    
    title = title
      .replace(/Bodhisattva\s+Avaolkiteshvara/gi, 'Bồ Tát Quán Thế Âm (Avalokiteshvara)')
      .replace(/Bodhisattva\s+Avalokiteshvara/gi, 'Bồ Tát Quán Thế Âm (Avalokiteshvara)')
      .replace(/Avalokiteshvara/gi, 'Quán Thế Âm (Avalokiteshvara)')
      .replace(/Lokeshvara/gi, 'Quán Tự Tại (Lokeshvara)')
      .replace(/Prajnaparamita/gi, 'Bát Nhã Ba La Mật Đa (Prajnaparamita)')
      .replace(/Harihara/gi, 'Thần Harihara (Hợp nhất Shiva - Vishnu)')
      .replace(/Shiva\s+Ardhanarishvara/gi, 'Thần Shiva Bán Nữ Bán Nam (Ardhanarishvara)')
      .replace(/Five-Headed\s+Shiva/gi, 'Thần Shiva Ngũ Diện (Năm Đầu)')
      .replace(/Shiva/gi, 'Thần Shiva')
      .replace(/Vishnu\s+Resting\s+on\s+the\s+Serpent\s+Shesha\s+\(Vishnu\s+Anantashayin\)/gi, 'Thần Vishnu Tái Sinh Nằm Trên Rồng Shesha (Anantashayin)')
      .replace(/Vishnu\s+Anantashayin/gi, 'Thần Vishnu Nằm Trên Biển Sữa Anantashayin')
      .replace(/Standing\s+Four-Armed\s+Vishnu/gi, 'Tượng Thần Vishnu Đứng Bốn Tay')
      .replace(/Vishnu/gi, 'Thần Vishnu')
      .replace(/Standing\s+Ganesha/gi, 'Tượng Thần Ganesha Đứng')
      .replace(/Ganesha/gi, 'Thần Ganesha (Đầu Voi)')
      .replace(/Brahma/gi, 'Thần Phạm Thiên Brahma')
      .replace(/Enthroned\s+Buddha/gi, 'Tượng Phật Thích Ca Ngự Tòa Sen')
      .replace(/Seated\s+Buddha/gi, 'Tượng Phật Thích Ca Tọa Thiền')
      .replace(/Head\s+of\s+a\s+Buddha|Head\s+of\s+Buddha/gi, 'Thủ Tượng Phật Thích Ca')
      .replace(/Hand\s+of\s+a\s+Buddha|Hand\s+of\s+Buddha/gi, 'Thủ Ấn Tay Phật Cổ')
      .replace(/Hands/gi, 'Đôi Bàn Tay Điêu Khắc Cổ')
      .replace(/Buddha/gi, 'Tượng Phật Thích Ca')
      .replace(/Dancing\s+Apsaras/gi, 'Vũ Nữ Apsara Múa')
      .replace(/Apsara/gi, 'Tiên Nữ Apsara')
      .replace(/Pillar\s+Fragment\s+with\s+Dancing\s+Apsaras/gi, 'Đoạn Cột Đá Chạm Vũ Điệu Tiên Nữ Apsara')
      .replace(/Lintel\s+with\s+Carved\s+Figures/gi, 'Lanh-Tô Đá Chạm Khắc Nhân Thần Angkor')
      .replace(/Lintel\s+with/gi, 'Lanh-Tô Cửa Đền Chạm Khắc')
      .replace(/Pediment\s+with/gi, 'Trán Cửa Điêu Khắc')
      .replace(/Linga\s+\(Phallic\s+Emblem\s+of\s+Shiva\)\s+with\s+Architectural\s+Base/gi, 'Sinh Thực Khí Linga Thần Shiva Kèm Bệ Yoni Kiến Trúc')
      .replace(/Linga/gi, 'Linga Biểu Tượng Shiva')
      .replace(/Finial\s+with\s+the\s+Earth\s+Goddess,\s+Nan\s+Brah\s+Dharani,\s+and\s+Standing\s+Vishnu/gi, 'Đỉnh Trượng Nghi Lễ Khắc Nữ Thần Đất Phra Mae Thorani & Thần Vishnu')
      .replace(/Palanquin\s+Ring\s+with\s+Demon\s+Battling\s+a\s+Horse|Palanquin\s+Ring\s+with\s+a\s+Demon\s+Battling\s+a\s+Horse/gi, 'Vòng Đồng Móc Kiệu Rước Hoàng Gia Chạm Khắc Cảnh Dạ Xoa Đấu Ngựa')
      .replace(/Demons\s+on\s+an\s+Elephant\s+with\s+Adorant/gi, 'Phù Điêu Đoàn Quân Dạ Xoa Cưỡi Voi Chiến Cùng Tín Đồ Cầu Nguyện')
      .replace(/Seated\s+Vishvakarman,\s+the\s+Divine\s+Architect/gi, 'Tượng Thần Kiến Trúc Vũ Trụ Vishvakarman')
      .replace(/Standing\s+Female\s+Deity,\s+probably\s+Durga/gi, 'Tượng Nữ Thần Đứng (Nghi Nữ Thần Durga Chiến Thắng Quỷ Trâu)')
      .replace(/Standing\s+Four-Armed\s+Female\s+Deity/gi, 'Tượng Nữ Thần Bốn Tay Đứng Thẳng')
      .replace(/Standing\s+Four-Armed\s+Male\s+Deity/gi, 'Tượng Nam Thần Bốn Tay Đứng Thẳng')
      .replace(/Kneeling\s+Female\s+Deity/gi, 'Tượng Nữ Thần Quỳ Chầu')
      .replace(/Head\s+of\s+a\s+Warrior/gi, 'Thủ Tượng Chiến Binh Angkor')
      .replace(/Head\s+of\s+a\s+Deity\(\?\)/gi, 'Thủ Tượng Thiên Thần Deva')
      .replace(/Male\s+Adorant,\s+probably\s+from\s+a\s+Battle\s+Standard/gi, 'Tượng Tín Đồ Nam Quỳ Cầu Nguyện (Đỉnh Cờ Quân Kỳ Angkor)')
      .replace(/Pellet\s+Bangles\s+with\s+Textile\s+Remnants/gi, 'Vòng Đeo Tay Bằng Đồng Cổ Kèm Vết Tích Sợi Vải Dệt')
      .replace(/Bust\s+of/gi, 'Tượng Bán Thân')
      .replace(/Standing/gi, 'Tượng Đứng')
      .replace(/Seated/gi, 'Tượng Ngồi')
      .replace(/Head\s+of/gi, 'Thủ Tượng (Đầu Tượng)');

    return title;
  }

  private generateKhmerTitle(titleEn: string): string {
    const t = (titleEn || '').toLowerCase();
    if (t.includes('vishnu')) return 'ព្រះវិស្ណុ';
    if (t.includes('shiva') && t.includes('ardhanarishvara')) return 'ព្រះសិវៈ អឌ្ឍនារីស្វរ';
    if (t.includes('shiva')) return 'ព្រះសិវៈ';
    if (t.includes('harihara')) return 'ព្រះហរិហរៈ';
    if (t.includes('buddha')) return 'ព្រះពុទ្ធបដិមា';
    if (t.includes('lokeshvara') || t.includes('avalokiteshvara')) return 'ព្រះអវលោកិតេស្វរៈ / លោកេសូរ';
    if (t.includes('prajnaparamita')) return 'ព្រះប្រាជ្ញាបារមីតា';
    if (t.includes('ganesha')) return 'ព្រះគណេស';
    if (t.includes('apsara')) return 'ទេពអប្សរា';
    if (t.includes('lintel')) return 'ផ្តែរប្រាសាទបុរាណ';
    if (t.includes('linga')) return 'សិវលិង្គ';
    if (t.includes('vishvakarman')) return 'ព្រះវិស្សកម្ម';
    return 'វត្ថុបុរាណខ្មែរ';
  }

  public canonicalize(raw: MetObjectRaw): HeritageObject | null {
    if (!raw.isPublicDomain || !raw.primaryImage || !raw.title) {
      return null;
    }

    const period = this.mapPeriod(raw.period, raw.objectBeginDate, raw.objectEndDate);
    const titleVi = this.translateTitleToVietnamese(raw.title);
    const titleKh = this.generateKhmerTitle(raw.title);

    const dateRange = raw.objectDate || (raw.objectBeginDate && raw.objectEndDate 
      ? `Khoảng năm ${raw.objectBeginDate} – ${raw.objectEndDate} SCN`
      : 'Thời kỳ Angkor (Thế kỷ 9 - 13)');

    const canonicalId = `kh-met-${raw.objectID}`;
    const tags = (raw.tags || []).map((t) => t.term);

    const century = raw.objectBeginDate && raw.objectEndDate
      ? `Thế kỷ ${Math.floor(raw.objectBeginDate / 100) + 1} – ${Math.floor(raw.objectEndDate / 100) + 1}`
      : raw.objectDate || 'Thế kỷ 9 – 13';

    const summary = `${titleVi} có niên đại ${dateRange} (${period}), chế tác bằng ${raw.medium || 'sa thạch / hợp kim đồng'}, thuộc bộ sưu tập Nghệ thuật Châu Á của Bảo tàng Nghệ thuật Metropolitan (New York, Số kiểm kê: ${raw.accessionNumber || 'N/A'}).`;

    const description = `Hiện vật khảo cổ học chính quy "${raw.title}" được lưu trữ và bảo tồn tại Bảo tàng Nghệ thuật Metropolitan (The Met). Tác phẩm thuộc nền văn minh ${raw.culture || 'Khmer / Campuchia cổ'}, thể hiện kỹ thuật điêu khắc và tư duy mỹ thuật tinh tế của thời kỳ ${raw.period || period}. Kích thước: ${raw.dimensions || 'Theo hồ sơ bảo tàng'}. Nguồn gốc thu thập: ${raw.creditLine || 'The Met Open Access'}. Giấy phép sử dụng: CC0 (Phạm vi công cộng).`;

    const galleryImages = [raw.primaryImage];
    if (raw.additionalImages && Array.isArray(raw.additionalImages)) {
      galleryImages.push(...raw.additionalImages.filter(Boolean).slice(0, 4));
    }

    const obj: HeritageObject = {
      id: canonicalId,
      type: 'artifact',
      title: titleVi,
      titleKhmer: titleKh,
      titleEnglish: raw.title,
      alternateTitles: [raw.title, raw.objectName].filter(Boolean) as string[],
      category: raw.classification || 'Điêu khắc & Cổ vật (Sculpture)',
      period: period,
      dateRange: dateRange,
      century: century,
      summary: summary,
      description: description,
      historicalContext: `Hiện vật được định niên đại ${dateRange}, phản ánh sâu sắc giai đoạn ${raw.period || period} của nền văn minh Khmer, thể hiện sự hòa quyện giữa thế giới quan Ấn Độ giáo (Shiva, Vishnu) và Phật giáo cùng nghệ thuật tạc tượng bản địa đặc trưng.`,
      culturalSignificance: `Minh chứng hiện vật sống động về trình độ đúc đồng, chạm khắc đá sa thạch, y phục sampot cổ và hệ thống biểu tượng thần thoại Angkor.`,
      material: raw.medium || 'Đá sa thạch (Sandstone) / Đồng (Bronze)',
      dimensions: raw.dimensions || 'Theo hồ sơ kiểm kê',
      location: {
        siteName: raw.culture || raw.region || 'Vùng văn hóa Angkor / Chân Lạp cổ',
        province: raw.region || 'Siem Reap / Kandal',
        country: raw.country || 'Campuchia',
        coordinates: [13.4125, 103.867],
      },
      media: {
        primaryImage: raw.primaryImage,
        gallery: galleryImages,
        caption: `${raw.title} - The Metropolitan Museum of Art (Acc. ${raw.accessionNumber || 'N/A'})`,
      },
      provenance: {
        institution: 'The Metropolitan Museum of Art (The Met)',
        sourceUrl: raw.objectURL || `https://www.metmuseum.org/art/collection/search/${raw.objectID}`,
        license: 'CC0',
        licenseUrl: 'https://www.metmuseum.org/about-the-met/policies-and-documents/open-access',
        attribution: `The Metropolitan Museum of Art Open Access (CC0) - Số kiểm kê: ${raw.accessionNumber || 'N/A'}`,
        accessionNumber: raw.accessionNumber,
        citations: [
          `The Metropolitan Museum of Art Collection Database, ID: ${raw.objectID}`,
          `Credit Line: ${raw.creditLine || 'Metropolitan Museum Archive'}`,
        ],
      },
      relations: {
        relatedEntityIds: ['kh-art-001', 'kh-art-002', 'kh-art-005'],
        relatedCollections: ['col-sculpture', 'col-masterpieces'],
        associatedConcepts: tags.length > 0 ? tags : ['Điêu khắc Khmer', 'Nghệ thuật Angkor', 'Tôn giáo Cổ truyền'],
        artisticStyle: raw.period || 'Phong cách Điêu khắc Angkor',
      },
      isMasterpiece: raw.isHighlight || false,
    };

    return obj;
  }

  public async fetchObjectById(objectId: number): Promise<MetObjectRaw | null> {
    try {
      const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`;
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'KhmerHeritageDigitalMuseum/1.0 (Digital Cultural Archive)',
        },
      });
      if (!res.ok) return null;
      const text = await res.text();
      if (text.startsWith('<')) {
        // Returned HTML (e.g. rate limit page)
        return null;
      }
      return JSON.parse(text) as MetObjectRaw;
    } catch (err) {
      console.error(`Failed to fetch object ${objectId}:`, err);
      return null;
    }
  }

  public async searchObjects(query: string = 'Cambodia'): Promise<number[]> {
    try {
      const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=6&artistOrCulture=true&q=${encodeURIComponent(query)}`;
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'KhmerHeritageDigitalMuseum/1.0 (Digital Cultural Archive)',
        },
      });
      if (!res.ok) return [];
      const text = await res.text();
      if (text.startsWith('<')) return [];
      const data = JSON.parse(text);
      return (data.objectIDs || []) as number[];
    } catch (err) {
      console.error('Failed to search Met objects:', err);
      return [];
    }
  }

  public async runBatchCrawl(
    queries: string[] = ['Cambodia', 'Khmer', 'Angkor'],
    limit: number = 60
  ): Promise<HeritageObject[]> {
    if (this.progress.status === 'running') {
      throw new Error('Tiến trình thu thập dữ liệu đang chạy, vui lòng chờ trong giây lát.');
    }

    this.progress = {
      status: 'running',
      totalFound: 0,
      crawledCount: 0,
      validPublicDomainCount: 0,
      logs: [`[${new Date().toLocaleTimeString('vi-VN')}] 🚀 Khởi động bộ thu thập The Met Open Access API...`],
    };

    const allObjectIds = new Set<number>();

    // Specific famous verified Met Khmer object IDs list for guaranteed high-quality baseline
    const verifiedMetKhmerIds = [
      38159, 39092, 38297, 38160, 38303, 38295, 38620, 57343, 44965, 39772,
      38158, 38162, 39544, 53341, 39162, 39601, 39221, 53292, 39131, 78429,
      38550, 39157, 38875, 38879, 38874, 38878, 38880, 38877, 38886, 38881,
      38882, 38916, 38909, 38885, 38884, 39274, 39273, 38161, 38911, 38910,
      39104, 38455, 38896, 38890, 38888, 38889, 38298, 38454
    ];

    verifiedMetKhmerIds.forEach((id) => allObjectIds.add(id));

    try {
      for (const query of queries) {
        this.progress.logs.push(`🔍 Đang tìm kiếm hiện vật từ khóa "${query}" trong Phòng Cổ vật Châu Á (Asian Art Dept 6)...`);
        const ids = await this.searchObjects(query);
        this.progress.logs.push(`-> Tìm thấy ${ids.length} kết quả với từ khóa "${query}".`);
        for (const id of ids) {
          allObjectIds.add(id);
        }
        await new Promise((r) => setTimeout(r, 200));
      }

      const idList = Array.from(allObjectIds).slice(0, limit);
      this.progress.totalFound = idList.length;
      this.progress.logs.push(`📦 Bắt đầu nạp và thẩm định bản quyền (License Gate CC0) cho ${idList.length} hiện vật...`);

      const canonicalObjects: HeritageObject[] = [];
      const existingObjects = this.getStoredObjects();

      for (let i = 0; i < idList.length; i++) {
        const id = idList[i];
        this.progress.crawledCount = i + 1;

        const raw = await this.fetchObjectById(id);
        if (!raw) {
          await new Promise((r) => setTimeout(r, 250));
          continue;
        }

        // Validate culture match
        const cultureBlob = `${raw.culture || ''} ${raw.country || ''} ${raw.period || ''} ${raw.title || ''}`.toLowerCase();
        const isKhmer = /cambodia|khmer|angkor|chenla|funan|siam|phnom|banteay|preah|shiva|vishnu|harihara|buddha|lokeshvara|ganesha/i.test(cultureBlob);

        if (!isKhmer) {
          continue;
        }

        const canonical = this.canonicalize(raw);
        if (canonical) {
          this.progress.validPublicDomainCount++;
          canonicalObjects.push(canonical);
          this.progress.logs.push(
            `✅ [The Met ID ${raw.objectID}] ${canonical.title} | Số kiểm kê: ${canonical.provenance.accessionNumber || 'N/A'} | Giấy phép: CC0`
          );
        }

        // Polite delay
        await new Promise((r) => setTimeout(r, 180));
      }

      // Merge dataset
      const mergedMap = new Map<string, HeritageObject>();
      for (const obj of existingObjects) {
        mergedMap.set(obj.id, obj);
      }
      for (const obj of canonicalObjects) {
        mergedMap.set(obj.id, obj);
      }

      const finalDataset = Array.from(mergedMap.values());

      const dir = path.dirname(this.outputFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(this.outputFilePath, JSON.stringify(finalDataset, null, 2), 'utf-8');

      this.progress.status = 'completed';
      this.progress.lastRun = new Date().toISOString();
      this.progress.logs.push(
        `🎉 Hoàn thành xuất sắc! Đã chuẩn hóa và lưu trữ ${finalDataset.length} hiện vật khảo cổ học chính thức vào kho bảo tàng.`
      );

      return finalDataset;
    } catch (err: any) {
      this.progress.status = 'error';
      this.progress.error = err.message || String(err);
      this.progress.logs.push(`❌ Lỗi tiến trình cào: ${this.progress.error}`);
      console.error('Batch crawl error:', err);
      throw err;
    }
  }
}

export const metCrawler = new MetMuseumCrawler();
