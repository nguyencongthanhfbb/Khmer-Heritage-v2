import React, { useState } from 'react';
import { ART_STYLES } from '../data/artStylesData';
import { 
  Columns3, 
  Sparkles, 
  Layers, 
  Landmark, 
  Calendar, 
  ArrowRight, 
  Check, 
  Eye, 
  Compass
} from 'lucide-react';

interface ArtStyleMatrixProps {
  onExploreMonuments?: (monumentName: string) => void;
}

export const ArtStyleMatrix: React.FC<ArtStyleMatrixProps> = () => {
  const [selectedStyleId, setSelectedStyleId] = useState<string>(ART_STYLES[5].id); // Default to Angkor Wat
  const [comparisonStyleId, setComparisonStyleId] = useState<string>(ART_STYLES[6].id); // Default to Bayon
  const [viewMode, setViewMode] = useState<'single' | 'compare'>('compare');

  const activeStyle = ART_STYLES.find((s) => s.id === selectedStyleId) || ART_STYLES[0];
  const compareStyle = ART_STYLES.find((s) => s.id === comparisonStyleId) || ART_STYLES[1];

  return (
    <div className="space-y-10 pb-24" id="art-styles-matrix-view">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono tracking-widest uppercase">
            <Columns3 className="w-4 h-4" />
            <span>Đối Sánh Phong Cách Nghệ Thuật (Khmer Art Style Matrix)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100">
            Hệ Thống Phong Cách Mỹ Thuật 8 Thời Kỳ
          </h1>
          <p className="text-stone-400 text-sm font-serif max-w-3xl">
            Ma trận phân tích và đối chiếu các đặc trưng tạo hình (trán cửa Lanh-tô, diện mạo thần tượng, y phục Sampot và cấu trúc đền tháp) theo phân loại của các nhà khảo cổ học EFEO (Philippe Stern, Jean Boisselier, George Cœdès).
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-stone-900 border border-stone-800 rounded-2xl p-1 shrink-0">
          <button
            onClick={() => setViewMode('single')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              viewMode === 'single'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Chi Tiết Từng Thời Kỳ
          </button>
          <button
            onClick={() => setViewMode('compare')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              viewMode === 'compare'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Đối Chiếu Song Song
          </button>
        </div>
      </div>

      {/* Style Chronological Ribbon */}
      <div className="space-y-3">
        <div className="text-xs font-mono text-stone-400 flex items-center space-x-1.5">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>Trục diễn tiến các phong cách nghệ thuật cổ điển:</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {ART_STYLES.map((style) => {
            const isMainSelected = style.id === selectedStyleId;
            const isCompareSelected = viewMode === 'compare' && style.id === comparisonStyleId;

            let borderClass = 'border-stone-800 bg-stone-900/60 text-stone-400 hover:bg-stone-900 hover:text-stone-200';
            if (isMainSelected) {
              borderClass = 'border-amber-500 bg-amber-500/15 text-amber-300 ring-2 ring-amber-500/40 font-bold';
            } else if (isCompareSelected) {
              borderClass = 'border-emerald-500 bg-emerald-500/15 text-emerald-300 ring-2 ring-emerald-500/40 font-bold';
            }

            return (
              <button
                key={style.id}
                onClick={() => {
                  if (viewMode === 'single') {
                    setSelectedStyleId(style.id);
                  } else {
                    if (selectedStyleId !== style.id) {
                      setComparisonStyleId(style.id);
                    }
                  }
                }}
                className={`p-3 rounded-2xl text-left text-xs font-mono transition-all border flex flex-col justify-between cursor-pointer space-y-1.5 ${borderClass}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-stone-400">{style.periodRange.split('(')[0]}</span>
                  {isMainSelected && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                  {isCompareSelected && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                </div>
                <div className="font-serif font-bold text-xs truncate">
                  {style.name.split('(')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison or Single View Stage */}
      {viewMode === 'compare' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Column: Style A */}
            <div className="rounded-3xl bg-stone-900 border-2 border-amber-500/40 p-6 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                    Phong Cách Chuẩn A (Standard Style)
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-100">
                    {activeStyle.name}
                  </h2>
                  <span className="text-xs font-mono text-stone-400">{activeStyle.periodRange}</span>
                </div>
                <select
                  value={selectedStyleId}
                  onChange={(e) => setSelectedStyleId(e.target.value)}
                  aria-label="Chọn phong cách chuẩn A"
                  className="bg-stone-950 text-stone-200 border border-stone-800 rounded-xl px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-amber-500"
                >
                  {ART_STYLES.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Attributes Comparison */}
              <div className="space-y-4 text-xs">
                
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1.5">
                  <span className="font-mono text-amber-400 uppercase font-semibold flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Trán Cửa / Lanh-tô (Lintels):</span>
                  </span>
                  <p className="text-stone-300 font-serif leading-relaxed">{activeStyle.keyFeatures.lintels}</p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1.5">
                  <span className="font-mono text-amber-400 uppercase font-semibold flex items-center space-x-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Diện Mạo & Gương Mặt Tượng (Facial Features):</span>
                  </span>
                  <p className="text-stone-300 font-serif leading-relaxed">{activeStyle.keyFeatures.facialFeatures}</p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1.5">
                  <span className="font-mono text-amber-400 uppercase font-semibold flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Y Phục & Thắt Lưng (Sampot Garments):</span>
                  </span>
                  <p className="text-stone-300 font-serif leading-relaxed">{activeStyle.keyFeatures.garments}</p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1.5">
                  <span className="font-mono text-amber-400 uppercase font-semibold flex items-center space-x-1.5">
                    <Landmark className="w-3.5 h-3.5" />
                    <span>Cấu Trúc Kiến Trúc (Architecture):</span>
                  </span>
                  <p className="text-stone-300 font-serif leading-relaxed">{activeStyle.keyFeatures.architecturalStructure}</p>
                </div>

                <div className="pt-2">
                  <span className="font-mono text-[11px] text-stone-400 uppercase block mb-2">Công Trình Tiêu Biểu:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeStyle.iconicMonuments.map((mon, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-stone-800 text-stone-300 text-[11px] font-mono">
                        {mon}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Style B */}
            <div className="rounded-3xl bg-stone-900 border-2 border-emerald-500/40 p-6 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                    Phong Cách Đối Chiếu B (Comparative Style)
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-100">
                    {compareStyle.name}
                  </h2>
                  <span className="text-xs font-mono text-stone-400">{compareStyle.periodRange}</span>
                </div>
                <select
                  value={comparisonStyleId}
                  onChange={(e) => setComparisonStyleId(e.target.value)}
                  aria-label="Chọn phong cách đối chiếu B"
                  className="bg-stone-950 text-stone-200 border border-stone-800 rounded-xl px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-emerald-500"
                >
                  {ART_STYLES.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Attributes Comparison */}
              <div className="space-y-4 text-xs">
                
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1.5">
                  <span className="font-mono text-emerald-400 uppercase font-semibold flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Trán Cửa / Lanh-tô (Lintels):</span>
                  </span>
                  <p className="text-stone-300 font-serif leading-relaxed">{compareStyle.keyFeatures.lintels}</p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1.5">
                  <span className="font-mono text-emerald-400 uppercase font-semibold flex items-center space-x-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Diện Mạo & Gương Mặt Tượng (Facial Features):</span>
                  </span>
                  <p className="text-stone-300 font-serif leading-relaxed">{compareStyle.keyFeatures.facialFeatures}</p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1.5">
                  <span className="font-mono text-emerald-400 uppercase font-semibold flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Y Phục & Thắt Lưng (Sampot Garments):</span>
                  </span>
                  <p className="text-stone-300 font-serif leading-relaxed">{compareStyle.keyFeatures.garments}</p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1.5">
                  <span className="font-mono text-emerald-400 uppercase font-semibold flex items-center space-x-1.5">
                    <Landmark className="w-3.5 h-3.5" />
                    <span>Cấu Trúc Kiến Trúc (Architecture):</span>
                  </span>
                  <p className="text-stone-300 font-serif leading-relaxed">{compareStyle.keyFeatures.architecturalStructure}</p>
                </div>

                <div className="pt-2">
                  <span className="font-mono text-[11px] text-stone-400 uppercase block mb-2">Công Trình Tiêu Biểu:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {compareStyle.iconicMonuments.map((mon, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-stone-800 text-stone-300 text-[11px] font-mono">
                        {mon}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Key Evolution Contrast Card */}
          <div className="rounded-3xl bg-stone-950 border border-stone-800 p-6 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
              <Compass className="w-4 h-4" />
              <span>Ghi Nhận Giám Tuyển về Bước Chuyển Dịch Phong Cách:</span>
            </div>
            <p className="text-sm sm:text-base font-serif text-stone-300 leading-relaxed">
              Từ <span className="text-amber-300 font-semibold">{activeStyle.name.split('(')[0]}</span> đến <span className="text-emerald-300 font-semibold">{compareStyle.name.split('(')[0]}</span>: {activeStyle.comparisonNotes} Ngược lại, {compareStyle.comparisonNotes}
            </p>
          </div>
        </div>
      ) : (
        /* Single View Mode */
        <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="border-b border-stone-800 pb-4">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
              Hồ Sơ Phong Cách Nghệ Thuật
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
              {activeStyle.name}
            </h2>
            <div className="text-sm font-mono text-stone-400 pt-1">
              Niên đại thịnh hành: {activeStyle.periodRange}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
              <span className="font-mono text-xs text-amber-400 uppercase font-semibold">
                1. Trán Cửa & Lanh-tô Điêu Khắc (Lintels):
              </span>
              <p className="text-sm font-serif text-stone-200 leading-relaxed">
                {activeStyle.keyFeatures.lintels}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
              <span className="font-mono text-xs text-amber-400 uppercase font-semibold">
                2. Gương Mặt Tượng & Điêu Khắc Nhân Thần:
              </span>
              <p className="text-sm font-serif text-stone-200 leading-relaxed">
                {activeStyle.keyFeatures.facialFeatures}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
              <span className="font-mono text-xs text-amber-400 uppercase font-semibold">
                3. Y Phục Sampot & Trang Sức Hoàng Gia:
              </span>
              <p className="text-sm font-serif text-stone-200 leading-relaxed">
                {activeStyle.keyFeatures.garments}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
              <span className="font-mono text-xs text-amber-400 uppercase font-semibold">
                4. Bình Đồ Kiến Trúc & Vật Liệu Xây Dựng:
              </span>
              <p className="text-sm font-serif text-stone-200 leading-relaxed">
                {activeStyle.keyFeatures.architecturalStructure}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-stone-950 border-l-4 border-amber-500 space-y-2">
            <span className="font-mono text-xs text-amber-400 uppercase font-semibold">
              Bình Luận Khảo Cổ Học:
            </span>
            <p className="text-sm font-serif text-stone-300 leading-relaxed">
              {activeStyle.comparisonNotes}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
