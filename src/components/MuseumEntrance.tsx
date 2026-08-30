import React from 'react';
import { HeritageObject, MuseumCollection, TimelineEpoch } from '../types/museum';
import { 
  Compass, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Landmark, 
  Clock, 
  Layers, 
  Bookmark, 
  Check, 
  ExternalLink,
  Volume2,
  Footprints,
  Columns3,
  Music,
  GraduationCap
} from 'lucide-react';

interface MuseumEntranceProps {
  objects: HeritageObject[];
  collections: MuseumCollection[];
  timeline: TimelineEpoch[];
  onSelectObject: (id: string) => void;
  onSelectCollection: (id: string) => void;
  onSelectPeriod: (periodName: string) => void;
  onOpenCurator: () => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const MuseumEntrance: React.FC<MuseumEntranceProps> = ({
  objects,
  collections,
  timeline,
  onSelectObject,
  onSelectCollection,
  onSelectPeriod,
  onOpenCurator,
  savedIds,
  onToggleSave,
  onNavigateTab,
}) => {
  const heroMasterpiece = objects.find((o) => o.id === 'kh-place-angkor-wat') || objects[0];
  const masterpieces = objects.filter((o) => o.isMasterpiece);

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO EXHIBITION BANNER */}
      {heroMasterpiece && (
        <section 
          className="relative rounded-3xl overflow-hidden border border-amber-500/20 bg-stone-900 shadow-2xl"
          id="hero-exhibition-section"
        >
          {/* Background Image with Dark Overlay Gradient */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroMasterpiece.media.primaryImage}
              alt={heroMasterpiece.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center scale-105 transform transition-transform duration-1000 hover:scale-100 opacity-40 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#121316] via-[#121316]/60 to-transparent" />
          </div>

          <div className="relative z-10 p-6 sm:p-10 lg:p-14 max-w-4xl space-y-6">
            
            {/* Museum Verification Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kiệt Tác Bảo Vật Quốc Gia • {heroMasterpiece.period}</span>
            </div>

            {/* Title in Khmer, Vietnamese & English */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-serif text-amber-200/80 font-normal tracking-wide">
                {heroMasterpiece.titleKhmer}
              </h2>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-100 leading-tight">
                {heroMasterpiece.title}
              </h1>
              <p className="text-sm font-serif italic text-stone-400">
                {heroMasterpiece.titleEnglish} — {heroMasterpiece.dateRange}
              </p>
            </div>

            {/* Summary Text */}
            <p className="text-base sm:text-lg text-stone-300 font-light leading-relaxed max-w-3xl line-clamp-3">
              {heroMasterpiece.summary}
            </p>

            {/* Provenance Micro-Info */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-stone-400 pt-2 border-t border-stone-800">
              <span className="flex items-center space-x-1">
                <Landmark className="w-3.5 h-3.5 text-amber-400" />
                <span>Nguồn: {heroMasterpiece.provenance.institution}</span>
              </span>
              <span className="text-stone-600">•</span>
              <span>Giấy phép: {heroMasterpiece.provenance.license}</span>
              {heroMasterpiece.location && (
                <>
                  <span className="text-stone-600">•</span>
                  <span>{heroMasterpiece.location.province}, {heroMasterpiece.location.country}</span>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="btn-hero-explore"
                onClick={() => onSelectObject(heroMasterpiece.id)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-semibold text-sm flex items-center space-x-2 shadow-lg shadow-amber-950/60 hover:shadow-amber-600/40 transition-all cursor-pointer"
              >
                <span>Khám Phá Chi Tiết Hiện Vật</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-hero-curator"
                onClick={onOpenCurator}
                className="px-5 py-3 rounded-xl bg-stone-800/80 hover:bg-stone-700/80 text-stone-200 font-medium text-sm flex items-center space-x-2 border border-stone-700/80 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Hỏi Giám Tuyển AI Về Hiện Vật</span>
              </button>

              <button
                id={`btn-hero-save-${heroMasterpiece.id}`}
                onClick={() => onToggleSave(heroMasterpiece.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  savedIds.includes(heroMasterpiece.id)
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                    : 'bg-stone-800/60 text-stone-400 border-stone-700 hover:text-stone-200'
                }`}
                title="Lưu vào danh mục nghiên cứu"
              >
                {savedIds.includes(heroMasterpiece.id) ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </button>
            </div>

          </div>
        </section>
      )}

      {/* 2. HISTORICAL EPOCHS QUICK BAR */}
      <section className="space-y-4" id="epochs-navigation-section">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-serif font-bold text-stone-100">
              Các Thời Kỳ Lịch Sử Trọng Điểm
            </h2>
          </div>
          <span className="text-xs font-mono text-stone-400">5 Kỷ Nguyên Di Sản</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {timeline.map((epoch) => (
            <div
              key={epoch.id}
              id={`epoch-card-${epoch.id}`}
              onClick={() => onSelectPeriod(epoch.name.includes('Phù Nam') ? 'Funan' : epoch.name.includes('Chân Lạp') ? 'Chenla' : epoch.name.includes('Angkor') && !epoch.name.includes('Hậu') ? 'Angkor' : epoch.name.includes('Hậu') ? 'Post-Angkor' : 'Modern')}
              className="group p-4 rounded-2xl bg-stone-900/90 border border-stone-800 hover:border-amber-500/50 hover:bg-stone-850 transition-all cursor-pointer space-y-2 shadow-sm"
            >
              <div className="text-[11px] font-mono text-amber-400/90 tracking-wider">
                {epoch.timeSpan}
              </div>
              <h3 className="font-serif font-semibold text-sm text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                {epoch.name}
              </h3>
              <p className="text-xs text-amber-200/60 font-serif line-clamp-1">
                {epoch.nameKhmer}
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400 group-hover:text-stone-300 font-mono">
                <span>{epoch.relatedObjectIds.length} Hiện vật</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform text-amber-400" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED MASTERPIECES SPOTLIGHT */}
      <section className="space-y-6" id="masterpieces-spotlight-section">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono tracking-widest uppercase mb-1">
              <Landmark className="w-4 h-4" />
              <span>Bảo Vật Quốc Gia & Hồ Sơ Lưu Trữ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
              Kiệt Tác Điêu Khắc & Kiến Trúc Tiêu Biểu
            </h2>
          </div>
          <p className="text-xs font-mono text-stone-400">
            Dữ liệu đối chiếu từ Met Museum, EFEO, NMC & APSARA
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {masterpieces.map((obj) => (
            <div
              key={obj.id}
              id={`masterpiece-card-${obj.id}`}
              className="group rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-all duration-300 overflow-hidden flex flex-col shadow-lg hover:shadow-2xl hover:shadow-amber-950/30"
            >
              {/* Media Thumbnail with Badges */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
                <img
                  src={obj.media.primaryImage}
                  alt={obj.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
                
                {/* Period & Category Badge */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-stone-900/90 backdrop-blur-md text-[11px] font-mono text-amber-300 border border-amber-500/30">
                    {obj.period}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-stone-900/90 backdrop-blur-md text-[11px] font-mono text-stone-300 border border-stone-700">
                    {obj.category}
                  </span>
                </div>

                {/* Bookmark Toggle Button */}
                <button
                  id={`btn-card-save-${obj.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(obj.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-all ${
                    savedIds.includes(obj.id)
                      ? 'bg-amber-500 text-stone-950'
                      : 'bg-stone-900/80 text-stone-300 hover:text-amber-300 hover:bg-stone-800'
                  }`}
                  title="Lưu hiện vật"
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                {/* Khmer Subtitle Overlay */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-xs font-serif text-amber-200/90 drop-shadow-md">
                    {obj.titleKhmer}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
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

                {/* Provenance Institution & CTA */}
                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-stone-400 line-clamp-1 max-w-[180px]">
                    🏛️ {obj.provenance.institution.split('(')[0]}
                  </span>

                  <button
                    id={`btn-view-${obj.id}`}
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
      </section>

      {/* 4. SPECIALIZED IMMERSIVE EXPERIENCE HUBS */}
      <section className="space-y-6" id="immersive-hubs-section">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono tracking-widest uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Phân Hệ Nghiên Cứu & Trải Nghiệm Học Thuật</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
              Không Gian Khám Phá Chuyên Đề
            </h2>
          </div>
          <p className="text-xs font-mono text-stone-400">
            Tương tác đa phương tiện • Âm thanh khảo cổ • Ma trận so sánh
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Virtual Tours */}
          <div
            onClick={() => onNavigateTab && onNavigateTab('tours')}
            className="group p-5 rounded-3xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 hover:bg-stone-850 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-lg hover:shadow-2xl"
          >
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Footprints className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-100 group-hover:text-amber-300 transition-colors">
                Tuyến Tham Quan Ảo
              </h3>
              <p className="text-xs font-serif text-stone-400 leading-relaxed">
                3 hải trình có thuyết minh âm thanh: Con Đường Devaraja, Điêu Khắc Thiêng và Di Sản Sống.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-amber-400 pt-2 border-t border-stone-800">
              <span>Bắt đầu hành trình</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Art Style Matrix */}
          <div
            onClick={() => onNavigateTab && onNavigateTab('styles')}
            className="group p-5 rounded-3xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 hover:bg-stone-850 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-lg hover:shadow-2xl"
          >
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Columns3 className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-100 group-hover:text-amber-300 transition-colors">
                Đối Sánh Phong Cách
              </h3>
              <p className="text-xs font-serif text-stone-400 leading-relaxed">
                Ma trận so sánh 8 thời kỳ mỹ thuật Khmer: Sambor Prei Kuk, Kulen, Banteay Srei, Angkor Wat, Bayon...
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-amber-400 pt-2 border-t border-stone-800">
              <span>Mở ma trận</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pinpeat Soundscape */}
          <div
            onClick={() => onNavigateTab && onNavigateTab('pinpeat')}
            className="group p-5 rounded-3xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 hover:bg-stone-850 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-lg hover:shadow-2xl"
          >
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Music className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-100 group-hover:text-amber-300 transition-colors">
                Nhạc Lễ Pinpeat
              </h3>
              <p className="text-xs font-serif text-stone-400 leading-relaxed">
                Khám phá âm học 5 nhạc cụ cung đình và diễn tấu thang âm 7 cung bậc Heptatonic cổ truyền.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-amber-400 pt-2 border-t border-stone-800">
              <span>Thử âm sắc</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Heritage Quiz */}
          <div
            onClick={() => onNavigateTab && onNavigateTab('quiz')}
            className="group p-5 rounded-3xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 hover:bg-stone-850 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-lg hover:shadow-2xl"
          >
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-100 group-hover:text-amber-300 transition-colors">
                Trắc Nghiệm Di Sản
              </h3>
              <p className="text-xs font-serif text-stone-400 leading-relaxed">
                Thử tài kiến thức khảo cổ học và văn minh Khmer qua bộ câu hỏi kèm trích dẫn tài liệu viện nghiên cứu.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-amber-400 pt-2 border-t border-stone-800">
              <span>Bắt đầu thi tài</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* 5. FEATURED CURATED COLLECTIONS */}
      <section className="space-y-6" id="curated-collections-section">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <h2 className="text-2xl font-serif font-bold text-stone-100">
              Không Gian Các Bộ Sưu Tập Chuyên Khảo
            </h2>
          </div>
          <span className="text-xs font-mono text-stone-400">4 Bộ Sưu Tập Chính</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((col) => (
            <div
              key={col.id}
              id={`collection-card-${col.id}`}
              onClick={() => onSelectCollection(col.id)}
              className="group relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 hover:border-amber-500/50 transition-all cursor-pointer shadow-md flex flex-col sm:flex-row"
            >
              <div className="sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden bg-stone-950">
                <img
                  src={col.representativeImage}
                  alt={col.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 sm:w-3/5 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                    <span>{col.period}</span>
                    <span>•</span>
                    <span>{col.objectIds.length} Hiện vật</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs text-amber-200/70 font-serif">
                    {col.titleKhmer}
                  </p>
                  <p className="text-xs text-stone-300 font-light line-clamp-2 leading-relaxed pt-1">
                    {col.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-mono text-amber-400">
                  <span>Khám phá bộ sưu tập</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. THREE-TIER TRANSPARENCY & SCHOLARLY TRUST BANNER */}
      <section 
        className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-stone-900 via-[#181a20] to-stone-900 border border-stone-800 space-y-6"
        id="provenance-trust-banner"
      >
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <h3 className="font-serif text-xl font-bold text-stone-100">
            Nguyên Tắc Minh Bạch 3 Tầng Dữ Liệu & Nguồn Gốc Bảo Tàng
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>TẦNG 1: SOURCE ORIGINAL</span>
            </div>
            <p className="text-stone-300 leading-relaxed">
              Dữ liệu nguyên bản từ các bảo tàng uy tín (Met Museum, EFEO, NMC, APSARA, BnF Gallica). Giữ nguyên số danh mục và trích dẫn.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>TẦNG 2: DERIVED METADATA</span>
            </div>
            <p className="text-stone-300 leading-relaxed">
              Chuẩn hóa định danh thực thể (Canonical Entities), thời kỳ niên đại và đồ thị liên kết tri thức văn hóa (Knowledge Graph).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-2">
            <div className="flex items-center space-x-2 text-purple-400 font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>TẦNG 3: AI-ASSISTED</span>
            </div>
            <p className="text-stone-300 leading-relaxed">
              Trợ lý Học thuật hỗ trợ tìm kiếm và đối chiếu. Mọi nội dung AI đều được dán nhãn minh bạch và đối chiếu nguồn, cấm tự tạo thông tin giả mạo.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
