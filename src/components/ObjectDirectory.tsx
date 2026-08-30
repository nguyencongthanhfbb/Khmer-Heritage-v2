import React, { useState, useMemo } from 'react';
import { HeritageObject, HistoricalPeriod, EntityType } from '../types/museum';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  Bookmark, 
  ArrowRight, 
  Landmark, 
  Compass, 
  Sparkles,
  Layers,
  Check
} from 'lucide-react';

interface ObjectDirectoryProps {
  objects: HeritageObject[];
  onSelectObject: (id: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  initialPeriodFilter?: string;
}

export const ObjectDirectory: React.FC<ObjectDirectoryProps> = ({
  objects,
  onSelectObject,
  savedIds,
  onToggleSave,
  initialPeriodFilter,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>(initialPeriodFilter || 'all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedInstitution, setSelectedInstitution] = useState<string>('all');
  const [onlyMasterpieces, setOnlyMasterpieces] = useState<boolean>(false);

  const periods: { id: string; label: string }[] = [
    { id: 'all', label: 'Tất Cả Thời Kỳ' },
    { id: 'Funan', label: 'Phù Nam (Funan)' },
    { id: 'Chenla', label: 'Chân Lạp (Chenla)' },
    { id: 'Angkor', label: 'Angkor Hoàng Kim' },
    { id: 'Post-Angkor', label: 'Hậu Angkor' },
  ];

  const types: { id: string; label: string }[] = [
    { id: 'all', label: 'Tất Cả Thể Loại' },
    { id: 'artifact', label: 'Tượng & Điêu Khắc' },
    { id: 'place', label: 'Đền Đài & Di Tích' },
    { id: 'art_form', label: 'Di Sản Phi Vật Thể' },
    { id: 'manuscript', label: 'Kinh Lá Buông & Bia Ký' },
  ];

  const filteredObjects = useMemo(() => {
    return objects.filter((obj) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchSearch =
          obj.title.toLowerCase().includes(q) ||
          obj.titleKhmer.includes(q) ||
          obj.titleEnglish.toLowerCase().includes(q) ||
          obj.summary.toLowerCase().includes(q) ||
          obj.category.toLowerCase().includes(q) ||
          (obj.provenance.accessionNumber && obj.provenance.accessionNumber.toLowerCase().includes(q));
        if (!matchSearch) return false;
      }

      // Period filter
      if (selectedPeriod !== 'all' && obj.period !== selectedPeriod) {
        return false;
      }

      // Type filter
      if (selectedType !== 'all' && obj.type !== selectedType) {
        return false;
      }

      // Masterpieces filter
      if (onlyMasterpieces && !obj.isMasterpiece) {
        return false;
      }

      // Institution filter
      if (selectedInstitution !== 'all' && !obj.provenance.institution.includes(selectedInstitution)) {
        return false;
      }

      return true;
    });
  }, [objects, searchQuery, selectedPeriod, selectedType, onlyMasterpieces, selectedInstitution]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedPeriod('all');
    setSelectedType('all');
    setSelectedInstitution('all');
    setOnlyMasterpieces(false);
  };

  return (
    <div className="space-y-8 pb-20" id="object-directory-view">
      
      {/* Header */}
      <div className="space-y-2 border-b border-stone-800 pb-6">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono tracking-widest uppercase">
          <Compass className="w-4 h-4" />
          <span>Kho Lưu Trữ Hiện Vật & Di Tích</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100">
          Danh Mục Tổng Hợp Di Sản Campuchia
        </h1>
        <p className="text-stone-400 text-sm font-serif max-w-3xl">
          Tra cứu toàn diện các hiện vật điêu khắc, công trình đền đài, bản thảo kinh văn và nghệ thuật biểu diễn với dữ liệu gốc minh bạch.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="rounded-3xl bg-stone-900 border border-stone-800 p-5 space-y-4 shadow-lg">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="input-catalog-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên hiện vật, chữ Khmer, đền đài, niên đại hoặc mã bảo tàng (ví dụ: Vishnu, Bayon, ព្រះវិស្ណុ, Baphuon)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-stone-950 border border-stone-800 text-stone-100 placeholder-stone-400 text-sm focus:outline-none focus:border-amber-500/80 transition-colors font-serif"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-stone-400 hover:text-stone-200"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Period selector */}
            <select
              id="filter-period-select"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs font-mono focus:outline-none focus:border-amber-500/60"
            >
              {periods.map((p) => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>

            {/* Type selector */}
            <select
              id="filter-type-select"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs font-mono focus:outline-none focus:border-amber-500/60"
            >
              {types.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>

            {/* Masterpieces toggle */}
            <button
              id="filter-masterpieces-toggle"
              onClick={() => setOnlyMasterpieces(!onlyMasterpieces)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono flex items-center space-x-1.5 transition-all cursor-pointer ${
                onlyMasterpieces
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                  : 'bg-stone-950 text-stone-400 border border-stone-800 hover:text-stone-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chỉ Kiệt Tác Tiêu Biểu</span>
            </button>
          </div>

          {/* Reset Filters */}
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono text-stone-400">
              Tìm thấy <strong className="text-amber-400 font-bold">{filteredObjects.length}</strong> kết quả
            </span>
            <button
              id="btn-reset-filters"
              onClick={handleResetFilters}
              className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-400 hover:text-stone-200 text-xs font-mono flex items-center space-x-1 transition-colors cursor-pointer"
              title="Đặt lại bộ lọc"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đặt lại</span>
            </button>
          </div>

        </div>

      </div>

      {/* Objects Grid */}
      {filteredObjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="catalog-results-grid">
          {filteredObjects.map((obj) => (
            <div
              key={obj.id}
              id={`catalog-card-${obj.id}`}
              className="group rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-all duration-300 overflow-hidden flex flex-col shadow-md hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
                <img
                  src={obj.media.primaryImage}
                  alt={obj.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  <span className="px-2.5 py-1 rounded-md bg-stone-900/90 text-[11px] font-mono text-amber-300 border border-amber-500/30">
                    {obj.period}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-stone-900/90 text-[11px] font-mono text-stone-300 border border-stone-700">
                    {obj.category}
                  </span>
                </div>

                <button
                  id={`btn-cat-save-${obj.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(obj.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-all ${
                    savedIds.includes(obj.id)
                      ? 'bg-amber-500 text-stone-950'
                      : 'bg-stone-900/80 text-stone-300 hover:text-amber-300'
                  }`}
                  title="Lưu hiện vật"
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-xs font-serif text-amber-200/90 drop-shadow-md">
                    {obj.titleKhmer}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 
                    onClick={() => onSelectObject(obj.id)}
                    className="font-serif text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-1 cursor-pointer"
                  >
                    {obj.title}
                  </h3>
                  <p className="text-xs text-stone-400 font-serif italic line-clamp-1">
                    {obj.titleEnglish} • {obj.dateRange}
                  </p>
                  <p className="text-xs text-stone-300 font-light line-clamp-2 leading-relaxed">
                    {obj.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-stone-400 line-clamp-1 max-w-[180px]">
                    🏛️ {obj.provenance.institution.split('(')[0]}
                  </span>
                  <button
                    id={`btn-cat-view-${obj.id}`}
                    onClick={() => onSelectObject(obj.id)}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center space-x-1 cursor-pointer font-mono"
                  >
                    <span>Chi Tiết</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-stone-900/50 border border-stone-800 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg text-stone-200">Không Tìm Thấy Hiện Vật Phù Hợp</h3>
          <p className="text-xs text-stone-400 font-serif max-w-md mx-auto">
            Vui lòng thử tìm kiếm với từ khóa khác hoặc đặt lại bộ lọc thời kỳ và thể loại.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-semibold text-xs font-mono cursor-pointer"
          >
            Đặt Lại Bộ Lọc
          </button>
        </div>
      )}

    </div>
  );
};
