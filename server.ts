import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { HERITAGE_OBJECTS } from './src/data/museumData';
import { MUSEUM_COLLECTIONS } from './src/data/collectionsData';
import { TIMELINE_EPOCHS } from './src/data/timelineData';
import { EPIGRAPHY_STELAE } from './src/data/epigraphyData';
import { metCrawler } from './server/crawler/metCrawler';
import { HeritageObject } from './src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getAllMuseumObjects(): HeritageObject[] {
  const crawled = metCrawler.getStoredObjects();
  const map = new Map<string, HeritageObject>();
  // Base curated masterpieces have precedence for rich commentary/hotspots
  for (const obj of crawled) {
    map.set(obj.id, obj);
  }
  for (const obj of HERITAGE_OBJECTS) {
    map.set(obj.id, obj);
  }
  return Array.from(map.values());
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Lazy-loaded Gemini AI client for server-side curation
  let aiClient: GoogleGenAI | null = null;
  function getAI(): GoogleGenAI | null {
    if (!aiClient && process.env.GEMINI_API_KEY) {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return aiClient;
  }

  // ==========================================
  // MUSEUM REST API ENDPOINTS
  // ==========================================

  // 1. Health check & Archive Stats
  app.get('/api/health', (req: Request, res: Response) => {
    const allObjects = getAllMuseumObjects();
    res.json({
      status: 'ok',
      service: 'Khmer Heritage Digital Museum Engine',
      version: '1.2.0',
      totalObjects: allObjects.length,
      curatedMasterpieces: HERITAGE_OBJECTS.length,
      crawledOpenAccess: metCrawler.getStoredObjects().length,
      totalCollections: MUSEUM_COLLECTIONS.length,
    });
  });

  // 2. Get all heritage objects (Curated + Ingested from Met Open Access)
  app.get('/api/objects', (req: Request, res: Response) => {
    const { type, period, collection, search, source } = req.query;
    let results = getAllMuseumObjects();

    if (type && typeof type === 'string') {
      results = results.filter((obj) => obj.type === type);
    }
    if (period && typeof period === 'string') {
      results = results.filter((obj) => obj.period === period);
    }
    if (collection && typeof collection === 'string') {
      results = results.filter((obj) => obj.relations.relatedCollections?.includes(collection));
    }
    if (source && typeof source === 'string') {
      if (source === 'curated') {
        results = results.filter((obj) => HERITAGE_OBJECTS.some((h) => h.id === obj.id));
      } else if (source === 'met') {
        results = results.filter((obj) => obj.provenance.institution.includes('Metropolitan'));
      }
    }
    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      results = results.filter(
        (obj) =>
          obj.title.toLowerCase().includes(q) ||
          (obj.titleKhmer && obj.titleKhmer.includes(q)) ||
          obj.titleEnglish.toLowerCase().includes(q) ||
          obj.summary.toLowerCase().includes(q) ||
          obj.category.toLowerCase().includes(q) ||
          (obj.provenance.accessionNumber && obj.provenance.accessionNumber.toLowerCase().includes(q))
      );
    }

    res.json(results);
  });

  // 3. Get single heritage object by canonical ID
  app.get('/api/objects/:id', (req: Request, res: Response) => {
    const allObjects = getAllMuseumObjects();
    const object = allObjects.find((item) => item.id === req.params.id);
    if (!object) {
      return res.status(404).json({ error: 'Heritage object not found in archive registry' });
    }
    res.json(object);
  });

  // 4. Get all museum collections
  app.get('/api/collections', (req: Request, res: Response) => {
    res.json(MUSEUM_COLLECTIONS);
  });

  // 5. Get all timeline epochs
  app.get('/api/timeline', (req: Request, res: Response) => {
    res.json(TIMELINE_EPOCHS);
  });

  // 6. Get places with coordinates for map explorer
  app.get('/api/places', (req: Request, res: Response) => {
    const allObjects = getAllMuseumObjects();
    const places = allObjects
      .filter((obj) => obj.location && obj.location.coordinates)
      .map((obj) => ({
        id: obj.id,
        title: obj.title,
        titleKhmer: obj.titleKhmer,
        titleEnglish: obj.titleEnglish,
        type: obj.type,
        period: obj.period,
        category: obj.category,
        location: obj.location,
        primaryImage: obj.media.primaryImage,
        summary: obj.summary,
        unescoStatus: obj.location?.unescoStatus,
      }));
    res.json(places);
  });

  // 7. Get epigraphy stelae inscriptions
  app.get('/api/epigraphy', (req: Request, res: Response) => {
    res.json(EPIGRAPHY_STELAE);
  });

  // ==========================================
  // CRAWLER & INGESTION PIPELINE ENDPOINTS
  // ==========================================

  // 8. Crawler status & statistics
  app.get('/api/crawler/stats', (req: Request, res: Response) => {
    const stored = metCrawler.getStoredObjects();
    const progress = metCrawler.getProgress();
    res.json({
      progress,
      storedCount: stored.length,
      curatedMasterpiecesCount: HERITAGE_OBJECTS.length,
      totalUnifiedCount: getAllMuseumObjects().length,
      sourcesBreakdown: {
        metMuseumOpenAccess: stored.filter((s) => s.provenance.institution.includes('Metropolitan')).length,
        curatedCore: HERITAGE_OBJECTS.length,
      },
      licenseBreakdown: {
        cc0: stored.filter((s) => s.provenance.license === 'CC0').length,
        publicDomain: HERITAGE_OBJECTS.filter((s) => s.provenance.license === 'Public Domain').length,
      },
    });
  });

  // 9. Run crawler batch job
  app.post('/api/crawler/run', async (req: Request, res: Response) => {
    try {
      const { queries, limit } = req.body;
      const queryList = Array.isArray(queries) && queries.length > 0 ? queries : ['Cambodia', 'Khmer', 'Angkor'];
      const limitNum = typeof limit === 'number' ? limit : 50;

      // Start crawl in background and return immediate acceptance
      metCrawler
        .runBatchCrawl(queryList, limitNum)
        .then((items) => {
          console.log(`[Crawler] Hoàn tất nạp ${items.length} hiện vật từ The Met API.`);
        })
        .catch((err) => {
          console.error('[Crawler] Lỗi khi cào dữ liệu:', err);
        });

      res.json({
        status: 'started',
        message: 'Đã khởi động tiến trình nạp dữ liệu từ The Met Open Access API.',
        queries: queryList,
        limit: limitNum,
      });
    } catch (err: any) {
      res.status(400).json({ error: err.message || String(err) });
    }
  });

  // 10. Live Search The Met Open Access API in real time
  app.get('/api/crawler/live-search', async (req: Request, res: Response) => {
    try {
      const q = typeof req.query.q === 'string' ? req.query.q : 'Cambodia';
      const ids = await metCrawler.searchObjects(q);
      const topIds = ids.slice(0, 12);
      
      const details = await Promise.all(
        topIds.map(async (id) => {
          const raw = await metCrawler.fetchObjectById(id);
          if (!raw) return null;
          return {
            objectID: raw.objectID,
            title: raw.title,
            culture: raw.culture,
            period: raw.period,
            objectDate: raw.objectDate,
            medium: raw.medium,
            primaryImage: raw.primaryImage,
            primaryImageSmall: raw.primaryImageSmall,
            isPublicDomain: raw.isPublicDomain,
            accessionNumber: raw.accessionNumber,
            objectURL: raw.objectURL,
          };
        })
      );

      res.json({
        query: q,
        totalFound: ids.length,
        items: details.filter(Boolean),
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Lỗi khi tra cứu The Met Open Access API', details: err.message });
    }
  });

  // 11. Ingest single Met Object on demand
  app.post('/api/crawler/ingest-single', async (req: Request, res: Response) => {
    try {
      const { objectId } = req.body;
      if (!objectId || typeof objectId !== 'number') {
        return res.status(400).json({ error: 'objectId (number) is required' });
      }

      const raw = await metCrawler.fetchObjectById(objectId);
      if (!raw) {
        return res.status(404).json({ error: 'Không tìm thấy hiện vật trên The Met API' });
      }

      const canonical = metCrawler.canonicalize(raw);
      if (!canonical) {
        return res.status(400).json({
          error: 'Hiện vật không thỏa mãn License Gate (Phải là Public Domain/CC0 và có ảnh chất lượng cao)',
        });
      }

      // Save to storage
      const existing = metCrawler.getStoredObjects();
      const updated = [canonical, ...existing.filter((x) => x.id !== canonical.id)];
      const fs = await import('fs');
      const filePath = path.join(process.cwd(), 'src', 'data', 'crawledMuseumData.json');
      fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf-8');

      res.json({
        success: true,
        message: `Đã nạp thành công hiện vật "${canonical.title}" (Số kiểm kê: ${canonical.provenance.accessionNumber}) vào bảo tàng.`,
        object: canonical,
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Lỗi nạp hiện vật đơn lẻ', details: err.message });
    }
  });

  // 12. Ask Curator AI (Grounding with museum archive & Gemini 3.7 Flash)
  app.post('/api/ai/ask-curator', async (req: Request, res: Response) => {
    try {
      const { question, currentObjectId } = req.body;
      if (!question || typeof question !== 'string') {
        return res.status(400).json({ error: 'A question string is required' });
      }

      const ai = getAI();
      if (!ai) {
        return res.json({
          answer:
            'Xin chào! Tôi là Trợ lý Học thuật Bảo tàng Khmer Heritage. Hiện tại hệ thống đang chạy ở chế độ cơ sở dữ liệu nội bộ. Bạn có thể tra cứu thông tin chi tiết của các hiện vật, đền đài, văn bia và thời kỳ lịch sử trực tiếp qua các thẻ thông tin và nguồn lưu trữ chính thống.',
          groundedSources: ['Bảo tàng Quốc gia Campuchia', 'Viện Viễn Đông Bác cổ (EFEO)', 'The Met Open Access'],
          isAiActive: false,
        });
      }

      const allObjects = getAllMuseumObjects();

      // Prepare museum context from archive
      let contextSnippet = allObjects
        .slice(0, 30)
        .map(
          (obj) =>
            `[ID: ${obj.id}] ${obj.title} (${obj.titleKhmer} / ${obj.titleEnglish}) | Loại: ${obj.type} | Niên đại: ${obj.dateRange} (${obj.period}) | Vị trí: ${obj.location?.siteName || 'N/A'}, ${obj.location?.province || ''} | Nguồn: ${obj.provenance.institution} (Số kiểm kê: ${obj.provenance.accessionNumber || 'N/A'}) (${obj.provenance.license}) | Tóm tắt: ${obj.summary}`
        )
        .join('\n\n');

      let epigraphySnippet = EPIGRAPHY_STELAE.map(
        (stela) =>
          `[VĂN BIA ${stela.inventoryNumber}] ${stela.title} (${stela.dateRange}) | Ngôn ngữ: ${stela.language} | Tóm tắt: ${stela.summary} | Ý nghĩa lịch sử: ${stela.historicalImportance}`
      ).join('\n\n');

      let targetObjectContext = '';
      if (currentObjectId) {
        const targetObj = allObjects.find((o) => o.id === currentObjectId);
        if (targetObj) {
          targetObjectContext = `\nNgười dùng đang trực tiếp xem hiện vật: ${targetObj.title} (${targetObj.titleKhmer}). Chi tiết: ${targetObj.description} - Nguồn lưu trữ: ${targetObj.provenance.institution} (Số hiệu: ${targetObj.provenance.accessionNumber || 'N/A'}).`;
        }
      }

      const systemInstruction = `Bạn là Trợ lý Học thuật và Chuyên gia Giám tuyển Cao cấp của Bảo tàng Kỹ thuật số Khmer Heritage (Digital Khmer Museum).
Tôn chỉ tối cao của bạn:
1. Tuyệt đối TRUNG THỰC VỚI NGUỒN GỐC LỊCH SỬ. Chỉ trả lời dựa trên các dữ liệu khảo cổ và bảo tàng có thật (Met Museum, EFEO, National Museum of Cambodia, APSARA, UNESCO, BnF Gallica).
2. Tuyệt đối KHÔNG tự ý bịa đặt năm sinh, niên đại khảo cổ, hoặc tiểu sử giả mạo. Nếu một thông tin chưa rõ trong văn bia hoặc hồ sơ khảo cổ, hãy ghi rõ "Hồ sơ lưu trữ hiện chưa xác định" hoặc "Tài liệu khảo cổ chưa ghi nhận".
3. Giọng văn trang trọng, học thuật, trang nhã, thể hiện sự tôn kính với di sản văn hóa và tôn giáo Campuchia.
4. Trình bày súc tích, làm nổi bật các mối quan hệ (ví dụ: liên hệ giữa vua Jayavarman VII và đền Bayon, hoặc thần Vishnu và đền Angkor Wat).

Dưới đây là cơ sở dữ liệu lưu trữ đã được kiểm định của Bảo tàng Khmer Heritage (Gồm các hiện vật Kiệt tác và Hiện vật chính thức nạp từ The Met Open Access CC0):
${contextSnippet}

Cơ sở dữ liệu Văn bia khảo cổ học (EFEO Corpus):
${epigraphySnippet}
${targetObjectContext}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: question,
        config: {
          systemInstruction,
          temperature: 0.2, // Low temperature for high factual accuracy
        },
      });

      const answerText = response.text || 'Không nhận được phản hồi từ chuyên gia giám tuyển.';

      res.json({
        answer: answerText,
        groundedSources: [
          'The Metropolitan Museum of Art Open Access (CC0)',
          'Bảo tàng Quốc gia Campuchia (National Museum of Cambodia)',
          'Viện Khảo cổ Viễn Đông Pháp (EFEO)',
          'Cơ quan Quản lý Di tích APSARA',
        ],
        isAiActive: true,
      });
    } catch (error: any) {
      console.error('Error in /api/ai/ask-curator:', error);
      res.status(500).json({
        error: 'Lỗi khi kết nối tới Trợ lý Học thuật Bảo tàng',
        details: error?.message || String(error),
      });
    }
  });

  // ==========================================
  // VITE & PRODUCTION STATIC MIDDLEWARE
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🏛️ Khmer Heritage Digital Museum Server running on http://localhost:${PORT}`);
  });
}

startServer();
