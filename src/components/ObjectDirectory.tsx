import React, { useState, useMemo } from 'react';
import { HeritageObject, HistoricalPeriod, EntityType } from '../types/museum';
import { MuseumImage } from './MuseumImage';
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
  Check,
  LayoutGrid,
  List,
  ShieldCheck,
  MapPin,
  Clock
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
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [onlyMasterpieces, setOnlyMasterpieces] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const categoryTabs: { id: string; label: string; count: number }[] = useMemo(() => [
    { id: 'all', label: 'Tất Cả Hiện Vật', count: objects.length },
    { id: 'artifact', label: 'Điêu Khắc & Tượng Đồng', count: objects.filter((o) => o.type === 'artifact').length },
    { id: 'place', label: 'Đền Đài & Di Tích', count: objects.filter((o) => o.type === 'place').length },
    { id: 'manuscript', label: 'Văn Bia & Kinh Lá Buông', count: objects.filter((o) => o.type === 'manuscript' || o.category.toLowerCase().includes('văn bia')).length },
    { id: 'art_form', label: 'Di Sản Phi Vật Thể & Âm Nhạc', count: objects.filter((o) => o.type === 'art_form' || o.type === 'event_tradition' || o.category.toLowerCase().includes('âm nhạc')).length },
    { id: 'media_record', label: 'Tư Liệu & Bản Đồ Khảo Cứu', count: objects.filter((o) => o.type === 'media_record' || o.category.toLowerCase().includes('bản đồ')).length },
  ], [objects]);

  const periods: { id: string; label: string }[] = [
    { id: 'all', label: 'Tất Cả Thời Kỳ' },
    { id: 'Funan', label: 'Phù Nam (Funan)' },
    { id: 'Chenla', label: 'Chân Lạp (Chenla)' },
    { id: 'Angkor', label: 'Angkor Hoàng Kim' },
    { id: 'Post-Angkor', label: 'Hậu Angkor' },
  ];

  const institutions: { id: string; label: string }[] = [
    { id: 'all', label: 'Tất Cả Viện Bảo Tàng' },
    { id: 'Metropolitan', label: 'The Met (New York)' },
    { id: 'Smithsonian', label: 'Smithsonian (Washington)' },
    { id: 'Library of Congress', label: 'Thư Viện Quốc Hội Mỹ (LOC)' },
    { id: 'Wikimedia', label: 'Wikimedia Commons / NMC' },
    { id: 'National Museum of Cambodia', label: 'Bảo Tàng Quốc Gia Campuchia' },
    { id: 'Internet Archive', label: 'Internet Archive / EFEO' }
  ];

  const materials: { id: string; label: string }[] = [
    { id: 'all', label: 'Tất Cả Chất Liệu' },
    { id: 'Sa thạch', label: 'Đá Sa Thạch (Sandstone)' },
    { id: 'Đồng', label: 'Đồng Thau (Bronze)' },
    { id: 'Gỗ', label: 'Gỗ Quý (Wood)' },
    { id: 'Vàng', label: 'Kim Loại Quý / Vàng (Gold)' },
    { id: 'Lá buông', label: 'Lá Buông (Palm-leaf / Olan)' },
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
      if (selectedType !== 'all') {
        if (selectedType === 'manuscript') {
          if (obj.type !== 'manuscript' && !obj.category.toLowerCase().includes('văn bia')) return false;
        } else if (selectedType === 'art_form') {
          if (obj.type !== 'art_form' && obj.type !== 'event_tradition' && !obj.category.toLowerCase().includes('âm nhạc')) return false;
        } else if (selectedType === 'media_record') {
          if (obj.type !== 'media_record' && !obj.category.toLowerCase().includes('bản đồ')) return false;
        } else if (obj.type !== selectedType) {
          return false;
        }
      }

      // Material filter
      if (selectedMaterial !== 'all') {
        if (!obj.material || !obj.material.toLowerCase().includes(selectedMaterial.toLowerCase())) {
          return false;
        }
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
  }, [objects, searchQuery, selectedPeriod, selectedType, selectedMaterial, onlyMasterpieces, selectedInstitution]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedPeriod('all');
    setSelectedType('all');
    setSelectedInstitution('all');
    setSelectedMaterial('all');
    setOnlyMasterpieces(false);
  };

  return (
    <div className="space-y-8 pb-20" id="object-directory-view">
      
      {/* Header */}
      <div className="space-y-2 border-b border-stone-800 pb-6">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono tracking-widest uppercase">
          <Compass className="w-4 h-4" />
          <span>Kho Lưu Trữ Hiện Vật & Di Tích (Museum Collection Explorer)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100">
          Danh Mục Tổng Hợp Di Sản Campuchia
        </h1>
        <p className="text-stone-400 text-sm font-serif max-w-3xl">
          Tra cứu toàn diện {objects.length} hiện vật điêu khắc, công trình đền đài, bản thảo kinh văn và nghệ thuật biểu diễn với dữ liệu gốc minh bạch từ 5 bảo tàng và viện nghiên cứu quốc tế.
        </p>
      </div>

      {/* Quick Category Tabs Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar" id="directory-category-tabs">
        {categoryTabs.map((tab) => {
          const isActive = selectedType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer flex items-center space-x-2 border ${
                isActive
                  ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold shadow-md shadow-amber-950/40'
                  : 'bg-stone-900 text-stone-300 hover:text-stone-100 hover:bg-stone-850 border-stone-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                isActive ? 'bg-stone-950 text-amber-300 font-bold' : 'bg-stone-800 text-stone-400'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
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

            {/* Institution selector */}
            <select
              id="filter-institution-select"
              value={selectedInstitution}
              onChange={(e) => setSelectedInstitution(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs font-mono focus:outline-none focus:border-amber-500/60"
            >
              {institutions.map((inst) => (
                <option key={inst.id} value={inst.id}>{inst.label}</option>
              ))}
            </select>

            {/* Material selector */}
            <select
              id="filter-material-select"
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs font-mono focus:outline-none focus:border-amber-500/60"
            >
              {materials.map((m) => (
                <option key={m.id} value={m.id}>{m.label}</option>
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

          {/* View Mode & Reset Filters */}
          <div className="flex items-center space-x-3">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-stone-950 p-1 rounded-xl border border-stone-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-200'
                }`}
                title="Dạng lưới thẻ"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-200'
                }`}
                title="Dạng danh mục học thuật"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <span className="text-xs font-mono text-stone-400">
              <strong className="text-amber-400 font-bold">{filteredObjects.length}</strong> hiện vật
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

      {/* Objects Content (Grid or Table) */}
      {filteredObjects.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="catalog-results-grid">
            {filteredObjects.map((obj) => (
              <div
                key={obj.id}
                id={`catalog-card-${obj.id}`}
                className="group rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-all duration-300 overflow-hidden flex flex-col shadow-md hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
                  <MuseumImage
                    src={obj.media.primaryImage}
                    alt={obj.title}
                    title={obj.title}
                    category={obj.category}
                    period={obj.period}
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
                    className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-all cursor-pointer ${
                      savedIds.includes(obj.id)
                        ? 'bg-amber-500 text-stone-950 font-bold'
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
          /* Scholarly Catalog Table View */
          <div className="rounded-3xl bg-stone-900 border border-stone-800 overflow-hidden shadow-xl" id="catalog-results-table">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-serif border-collapse">
                <thead>
                  <tr className="bg-stone-950 border-b border-stone-800 text-stone-400 font-mono uppercase text-[11px]">
                    <th className="py-3 px-4">Hiện Vật</th>
                    <th className="py-3 px-4">Thời Kỳ & Niên Đại</th>
                    <th className="py-3 px-4">Loại Hình & Chất Liệu</th>
                    <th className="py-3 px-4">Viện Lưu Trữ</th>
                    <th className="py-3 px-4">Số Kiểm Kê</th>
                    <th className="py-3 px-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60 text-stone-300">
                  {filteredObjects.map((obj) => (
                    <tr 
                      key={obj.id} 
                      onClick={() => onSelectObject(obj.id)}
                      className="hover:bg-stone-800/50 transition-colors cursor-pointer group"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-950 shrink-0">
                            <MuseumImage
                              src={obj.media.primaryImage}
                              alt={obj.title}
                              title={obj.title}
                              category={obj.category}
                              period={obj.period}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                              {obj.title}
                            </div>
                            <div className="text-[11px] text-amber-200/70">{obj.titleKhmer}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono">
                        <div>{obj.period}</div>
                        <div className="text-stone-500 text-[10px]">{obj.dateRange}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div>{obj.category}</div>
                        <div className="text-stone-500 font-mono text-[10px]">{obj.material || 'N/A'}</div>
                      </td>
                      <td className="py-3 px-4 font-mono text-stone-400">
                        {obj.provenance.institution.split('(')[0]}
                      </td>
                      <td className="py-3 px-4 font-mono text-amber-400">
                        {obj.provenance.accessionNumber || 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectObject(obj.id);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 font-mono text-[11px]"
                        >
                          Khám Phá →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
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
