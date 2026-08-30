import React, { useState, useEffect } from 'react';
import {
  Database,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Building2,
  Sparkles,
  Layers,
  Terminal,
  FileCheck,
  PlusCircle,
  Clock,
  ArrowRight,
  Filter
} from 'lucide-react';
import { HeritageObject } from '../types';

interface IngestionStats {
  storedCount: number;
  curatedMasterpiecesCount: number;
  totalUnifiedCount: number;
  sourcesBreakdown: {
    metMuseumOpenAccess: number;
    curatedCore: number;
  };
  licenseBreakdown: {
    cc0: number;
    publicDomain: number;
  };
  progress: {
    status: 'idle' | 'running' | 'completed' | 'error';
    totalFound: number;
    crawledCount: number;
    validPublicDomainCount: number;
    logs: string[];
    lastRun?: string;
  };
}

interface MetLiveItem {
  objectID: number;
  title: string;
  culture: string;
  period: string;
  objectDate: string;
  medium: string;
  primaryImage: string;
  primaryImageSmall: string;
  isPublicDomain: boolean;
  accessionNumber: string;
  objectURL: string;
}

interface IngestionDashboardProps {
  onSelectObject: (id: string) => void;
}

export const IngestionDashboard: React.FC<IngestionDashboardProps> = ({ onSelectObject }) => {
  const [stats, setStats] = useState<IngestionStats | null>(null);
  const [crawledObjects, setCrawledObjects] = useState<HeritageObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCrawling, setIsCrawling] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'crawler' | 'live-search' | 'repository'>('overview');

  // Live search state
  const [searchQuery, setSearchQuery] = useState('Cambodia');
  const [isSearching, setIsSearching] = useState(false);
  const [liveResults, setLiveResults] = useState<MetLiveItem[]>([]);
  const [ingestingId, setIngestingId] = useState<number | null>(null);
  const [ingestNotice, setIngestNotice] = useState<string | null>(null);

  // Filter state for repository tab
  const [repoFilter, setRepoFilter] = useState('');
  const [periodFilter, setPeriodFilter] = useState('ALL');

  const fetchStatsAndData = async () => {
    try {
      setLoading(true);
      const [statsRes, objectsRes] = await Promise.all([
        fetch('/api/crawler/stats'),
        fetch('/api/objects?source=met')
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
        if (statsData.progress?.status === 'running') {
          setIsCrawling(true);
        }
      }

      if (objectsRes.ok) {
        const objectsData = await objectsRes.json();
        setCrawledObjects(objectsData);
      }
    } catch (err) {
      console.error('Failed to load crawler stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatsAndData();
  }, []);

  // Poll progress if crawling
  useEffect(() => {
    let interval: any = null;
    if (isCrawling) {
      interval = setInterval(async () => {
        try {
          const res = await fetch('/api/crawler/stats');
          if (res.ok) {
            const data = await res.json();
            setStats(data);
            if (data.progress?.status === 'completed' || data.progress?.status === 'error') {
              setIsCrawling(false);
              // Refetch objects
              const objectsRes = await fetch('/api/objects?source=met');
              if (objectsRes.ok) {
                const obs = await objectsRes.json();
                setCrawledObjects(obs);
              }
            }
          }
        } catch (e) {
          console.error(e);
        }
      }, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCrawling]);

  const handleStartCrawl = async () => {
    try {
      setIsCrawling(true);
      const res = await fetch('/api/crawler/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          queries: ['Cambodia', 'Khmer', 'Angkor', 'Harihara', 'Jayavarman', 'Buddha'],
          limit: 50
        })
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Không thể khởi động crawler');
        setIsCrawling(false);
      }
    } catch (err) {
      console.error('Failed to start crawler:', err);
      setIsCrawling(false);
    }
  };

  const handleLiveSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    try {
      setIsSearching(true);
      const res = await fetch(`/api/crawler/live-search?q=${encodeURIComponent(searchQuery)}`);
      if (res.ok) {
        const data = await res.json();
        setLiveResults(data.items || []);
      }
    } catch (err) {
      console.error('Live search failed:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleIngestSingle = async (objectId: number) => {
    try {
      setIngestingId(objectId);
      setIngestNotice(null);
      const res = await fetch('/api/crawler/ingest-single', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ objectId })
      });

      const data = await res.json();
      if (res.ok) {
        setIngestNotice(`✅ ${data.message}`);
        fetchStatsAndData();
      } else {
        setIngestNotice(`❌ ${data.error || 'Nạp hiện vật thất bại'}`);
      }
    } catch (err: any) {
      setIngestNotice(`❌ Lỗi kết nối: ${err.message}`);
    } finally {
      setIngestingId(null);
    }
  };

  const filteredStored = crawledObjects.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(repoFilter.toLowerCase()) ||
      item.titleEnglish.toLowerCase().includes(repoFilter.toLowerCase()) ||
      (item.provenance.accessionNumber && item.provenance.accessionNumber.toLowerCase().includes(repoFilter.toLowerCase())) ||
      (item.material && item.material.toLowerCase().includes(repoFilter.toLowerCase()));

    const matchesPeriod = periodFilter === 'ALL' || item.period === periodFilter;

    return matchesSearch && matchesPeriod;
  });

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="border-b border-stone-800 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
                <Database className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
                    Khmer Heritage CMS
                  </span>
                  <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> License Gate: CC0 Verified
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 mt-1">
                  Trung Tâm Nạp & Chuẩn Hóa Dữ Liệu Di Sản (Content Ingestion)
                </h1>
              </div>
            </div>
            <p className="text-stone-400 text-sm mt-2 max-w-3xl">
              Phân hệ thu thập, thẩm định giấy phép (CC0 / Public Domain) và chuẩn hóa dữ liệu khảo cổ học thực tế từ The Metropolitan Museum of Art Open Access API, bảo đảm 100% dữ liệu có nguồn gốc lưu trữ xác thực và không bịa đặt.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchStatsAndData}
              disabled={loading}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Làm mới kho
            </button>
            <button
              onClick={handleStartCrawl}
              disabled={isCrawling}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all shadow-lg flex items-center gap-2 ${
                isCrawling
                  ? 'bg-amber-600/50 text-amber-200 cursor-not-allowed border border-amber-500/30'
                  : 'bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold shadow-amber-600/20'
              }`}
            >
              {isCrawling ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Đang cào dữ liệu The Met...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Chạy Ingestion Tự Động
                </>
              )}
            </button>
          </div>
        </div>

        {/* Real-time Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-stone-900/80 border border-stone-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs uppercase tracking-wider font-medium">Tổng Hiện Vật Đã Nạp</span>
              <Database className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-bold font-serif text-amber-400">
              {stats?.totalUnifiedCount || 0}
            </div>
            <div className="text-xs text-stone-400 flex items-center justify-between">
              <span>Kiệt tác chọn lọc: {stats?.curatedMasterpiecesCount || 10}</span>
              <span className="text-amber-300">The Met: {stats?.storedCount || 0}</span>
            </div>
          </div>

          <div className="p-5 bg-stone-900/80 border border-stone-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs uppercase tracking-wider font-medium">Nguồn Lưu Trữ Trực Tiếp</span>
              <Building2 className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-xl font-bold text-stone-100 truncate">
              The Met (New York)
            </div>
            <div className="text-xs text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Met Open Access API v1
            </div>
          </div>

          <div className="p-5 bg-stone-900/80 border border-stone-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs uppercase tracking-wider font-medium">Tuân Thủ Bản Quyền</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-emerald-400">
              100%
            </div>
            <div className="text-xs text-stone-400">
              {stats?.licenseBreakdown?.cc0 || 0} CC0 + {stats?.licenseBreakdown?.publicDomain || 0} Public Domain
            </div>
          </div>

          <div className="p-5 bg-stone-900/80 border border-stone-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-stone-400">
              <span className="text-xs uppercase tracking-wider font-medium">Trạng Thái Crawler</span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${isCrawling ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'}`} />
              <span className="text-lg font-semibold text-stone-200 uppercase tracking-wide text-sm">
                {isCrawling ? 'Đang Xử Lý Batch' : 'Sẵn Sàng (Idle)'}
              </span>
            </div>
            <div className="text-xs text-stone-500">
              Lần chạy gần nhất: {stats?.progress?.lastRun ? new Date(stats.progress.lastRun).toLocaleString('vi-VN') : 'Vừa xong'}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-800 gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-t-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-stone-900 text-amber-400 border-t-2 border-amber-500 border-x border-stone-800'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Layers className="w-4 h-4" /> Tổng Quan Nạp Dữ Liệu
          </button>
          <button
            onClick={() => setActiveTab('repository')}
            className={`px-4 py-2.5 rounded-t-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'repository'
                ? 'bg-stone-900 text-amber-400 border-t-2 border-amber-500 border-x border-stone-800'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Database className="w-4 h-4" /> Kho Hiện Vật Nạp ({crawledObjects.length})
          </button>
          <button
            onClick={() => setActiveTab('live-search')}
            className={`px-4 py-2.5 rounded-t-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'live-search'
                ? 'bg-stone-900 text-amber-400 border-t-2 border-amber-500 border-x border-stone-800'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Search className="w-4 h-4" /> Tra Cứu Trực Tiếp The Met API
          </button>
          <button
            onClick={() => setActiveTab('crawler')}
            className={`px-4 py-2.5 rounded-t-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'crawler'
                ? 'bg-stone-900 text-amber-400 border-t-2 border-amber-500 border-x border-stone-800'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Terminal className="w-4 h-4" /> Nhật Ký Crawler (Logs)
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Architecture & Workflow */}
              <div className="lg:col-span-2 p-6 bg-stone-900/60 border border-stone-800 rounded-xl space-y-4">
                <h3 className="text-lg font-serif font-bold text-amber-400 flex items-center gap-2">
                  <FileCheck className="w-5 h-5" /> Quy Trình Nạp Dữ Liệu 4 Bước (Ingestion Pipeline)
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-3 p-3 bg-stone-950/60 border border-stone-800/80 rounded-lg">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/30">
                      1
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-stone-200">Truy Vấn Nguồn Bảo Tàng Mở (The Met API)</h4>
                      <p className="text-xs text-stone-400 mt-0.5">
                        Tìm kiếm trong phòng Cổ vật Châu Á (Asian Art Dept 6) các từ khóa: <em>Cambodia, Khmer, Angkor, Pre-Angkor, Harihara, Jayavarman</em>.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 p-3 bg-stone-950/60 border border-stone-800/80 rounded-lg">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/30">
                      2
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-stone-200">Kiểm Duyệt Bản Quyền (License Gate CC0)</h4>
                      <p className="text-xs text-stone-400 mt-0.5">
                        Chỉ chấp thuận hiện vật có <code>isPublicDomain: true</code> và hình ảnh độ phân giải cao phục vụ nghiên cứu phi thương mại.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 p-3 bg-stone-950/60 border border-stone-800/80 rounded-lg">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/30">
                      3
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-stone-200">Chuẩn Hóa Thực Thể & Niên Đại (Canonicalization)</h4>
                      <p className="text-xs text-stone-400 mt-0.5">
                        Chuyển đổi sang lược đồ chuẩn <code>HeritageObject</code>, tự động phân loại kỷ nguyên (Funan, Chenla, Pre-Angkor, Angkor), dịch danh xưng học thuật và tạo ID quy chuẩn.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 p-3 bg-stone-950/60 border border-stone-800/80 rounded-lg">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/30">
                      4
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-stone-200">Lưu Trữ & Tích Hợp Vào Bảo Tàng Số</h4>
                      <p className="text-xs text-stone-400 mt-0.5">
                        Dữ liệu được lưu trữ tại <code>src/data/crawledMuseumData.json</code> và phục vụ trực tiếp cho bộ lọc tra cứu, bản đồ di tích và AI Giám tuyển.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Source Verification Box */}
              <div className="p-6 bg-stone-900/60 border border-stone-800 rounded-xl space-y-4">
                <h3 className="text-lg font-serif font-bold text-amber-400 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" /> Cam Kết Nguồn Gốc Học Thuật
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Bảo tàng Kỹ thuật số Khmer Heritage tuân thủ nghiêm ngặt nguyên tắc minh bạch:
                </p>
                <ul className="text-xs text-stone-400 space-y-2 list-disc list-inside">
                  <li>Mọi hiện vật đều có <strong>Số kiểm kê bảo tàng (Accession Number)</strong> rõ ràng.</li>
                  <li>Ảnh hiện vật được phân giải trực tiếp từ máy chủ ảnh của bảo tàng lưu trữ.</li>
                  <li>Không sử dụng hình ảnh AI tự chế tạo hoặc thông tin lịch sử giả mạo.</li>
                  <li>Cung cấp liên kết đối chiếu trực tiếp về bản ghi gốc trên website của The Met.</li>
                </ul>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('live-search')}
                    className="w-full py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4 text-amber-400" /> Thử nghiệm tra cứu trực tiếp API
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Repository of Ingested Artifacts */}
        {activeTab === 'repository' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-xl flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-3 text-stone-500" />
                <input
                  type="text"
                  placeholder="Tìm theo tên, số kiểm kê, chất liệu..."
                  value={repoFilter}
                  onChange={(e) => setRepoFilter(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-stone-950 border border-stone-700 rounded-lg text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-stone-400" />
                <select
                  value={periodFilter}
                  onChange={(e) => setPeriodFilter(e.target.value)}
                  className="bg-stone-950 border border-stone-700 text-stone-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500"
                >
                  <option value="ALL">Tất cả thời kỳ ({crawledObjects.length})</option>
                  <option value="Pre-Angkor">Tiền Angkor (Pre-Angkor)</option>
                  <option value="Angkor">Kỷ nguyên Angkor</option>
                  <option value="Post-Angkor">Hậu Angkor (Post-Angkor)</option>
                </select>
              </div>
            </div>

            {/* Artifacts Grid */}
            {filteredStored.length === 0 ? (
              <div className="p-12 text-center bg-stone-900/40 border border-stone-800 rounded-xl space-y-3">
                <Database className="w-10 h-10 mx-auto text-stone-600" />
                <p className="text-stone-400 text-sm">Chưa có hiện vật phù hợp với bộ lọc.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredStored.map((item) => (
                  <div
                    key={item.id}
                    className="bg-stone-900 border border-stone-800 hover:border-amber-500/50 rounded-xl overflow-hidden flex flex-col transition-all group hover:shadow-xl hover:shadow-black/60"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] bg-stone-950 overflow-hidden">
                      <img
                        src={item.media.primaryImage}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-stone-950/80 text-amber-400 border border-amber-500/30 rounded backdrop-blur-sm">
                          {item.period}
                        </span>
                      </div>
                      <div className="absolute top-2.5 right-2.5">
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 rounded backdrop-blur-sm">
                          {item.provenance.license}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="text-[11px] text-stone-500 font-mono">
                          Số kiểm kê: {item.provenance.accessionNumber || 'N/A'}
                        </div>
                        <h4 className="font-serif font-bold text-stone-100 text-base line-clamp-2 mt-0.5 group-hover:text-amber-400 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-stone-400 italic line-clamp-1 mt-0.5">
                          {item.titleEnglish}
                        </p>
                        <div className="mt-2 text-xs text-stone-400 line-clamp-2">
                          {item.summary}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                        <span className="text-[11px] text-stone-500 truncate">
                          {item.material || 'Đá sa thạch/Đồng'}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {item.provenance.sourceUrl && (
                            <a
                              href={item.provenance.sourceUrl}
                              target="_blank"
                              rel="noreferrer"
                              title="Xem bản ghi gốc The Met"
                              className="p-1.5 text-stone-400 hover:text-amber-400 bg-stone-800 rounded transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button
                            onClick={() => onSelectObject(item.id)}
                            className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded text-xs font-medium transition-colors flex items-center gap-1"
                          >
                            Chi tiết <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Live Search The Met API */}
        {activeTab === 'live-search' && (
          <div className="space-y-6">
            <div className="p-6 bg-stone-900/80 border border-stone-800 rounded-xl space-y-4">
              <h3 className="text-lg font-serif font-bold text-amber-400 flex items-center gap-2">
                <Search className="w-5 h-5" /> Tra Cứu Trực Tiếp Từ Máy Chủ The Met Open Access API
              </h3>
              <p className="text-xs text-stone-400">
                Gửi truy vấn trực tiếp đến máy chủ của The Metropolitan Museum of Art (New York) để xem các hiện vật nghệ thuật Khmer có sẵn, kèm số kiểm kê và ảnh gốc trước khi nạp vào kho lưu trữ số.
              </p>

              <form onSubmit={handleLiveSearch} className="flex gap-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Nhập từ khóa (e.g. Cambodia, Khmer, Angkor, Vishnu, Buddha, Shiva)..."
                  className="flex-1 px-4 py-2.5 bg-stone-950 border border-stone-700 rounded-lg text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-semibold text-sm rounded-lg transition-colors flex items-center gap-2"
                >
                  <Search className={`w-4 h-4 ${isSearching ? 'animate-spin' : ''}`} />
                  {isSearching ? 'Đang truy vấn...' : 'Tra cứu API'}
                </button>
              </form>

              {ingestNotice && (
                <div className="p-3 bg-stone-950 border border-amber-500/40 rounded-lg text-xs font-medium text-amber-300">
                  {ingestNotice}
                </div>
              )}
            </div>

            {/* Live Search Results */}
            {liveResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {liveResults.map((item) => (
                  <div
                    key={item.objectID}
                    className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] bg-stone-950">
                      {item.primaryImageSmall || item.primaryImage ? (
                        <img
                          src={item.primaryImageSmall || item.primaryImage}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-600 text-xs">
                          Không có ảnh công khai
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${item.isPublicDomain ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-red-950 text-red-300'}`}>
                          {item.isPublicDomain ? 'CC0 Public Domain' : 'Copyrighted'}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] text-stone-500 font-mono">
                          ID: {item.objectID} | Acc: {item.accessionNumber || 'N/A'}
                        </div>
                        <h4 className="font-serif font-bold text-stone-200 text-sm line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-stone-400 mt-1">
                          {item.culture || 'Cambodia'} • {item.objectDate || 'Cổ vật'}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-2">
                        <a
                          href={item.objectURL}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                        >
                          Xem tại Met <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          onClick={() => handleIngestSingle(item.objectID)}
                          disabled={ingestingId === item.objectID || !item.isPublicDomain || !item.primaryImage}
                          className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 disabled:opacity-40 text-amber-300 border border-amber-500/30 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          {ingestingId === item.objectID ? 'Đang nạp...' : 'Nạp vào Kho'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              !isSearching && (
                <div className="p-10 text-center bg-stone-900/40 border border-stone-800 rounded-xl space-y-2">
                  <Search className="w-8 h-8 mx-auto text-stone-600" />
                  <p className="text-stone-400 text-xs">
                    Nhập từ khóa và bấm <strong>"Tra cứu API"</strong> để tải dữ liệu trực tiếp từ The Met Museum.
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {/* Tab 4: Logs & Terminal */}
        {activeTab === 'crawler' && (
          <div className="p-6 bg-stone-950 border border-stone-800 rounded-xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-amber-400" />
                <h3 className="font-mono text-sm font-semibold text-stone-200">
                  Nhật Ký Thu Thập Dữ Liệu Thời Gian Thực (Crawler Stream)
                </h3>
              </div>
              <div className="text-xs text-stone-500 font-mono">
                Status: <span className="text-amber-400 uppercase">{stats?.progress?.status || 'IDLE'}</span>
              </div>
            </div>

            <div className="bg-stone-900/90 rounded-lg p-4 font-mono text-xs text-stone-300 space-y-1.5 max-h-96 overflow-y-auto border border-stone-800">
              {stats?.progress?.logs && stats.progress.logs.length > 0 ? (
                stats.progress.logs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">
                    <span className="text-stone-600 select-none mr-2">[{idx + 1}]</span>
                    <span className={log.includes('✅') ? 'text-emerald-400' : log.includes('❌') ? 'text-red-400' : log.includes('🔍') ? 'text-blue-400' : 'text-stone-300'}>
                      {log}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-stone-500 italic">
                  Chưa có nhật ký gần đây. Bấm "Chạy Ingestion Tự Động" để thực thi tiến trình.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
