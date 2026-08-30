import React, { useState, useMemo } from 'react';
import { HeritageObject } from '../types/museum';
import { getIconographyTaxonomy, IconographyTaxonomyItem } from '../utils/explorationService';
import { MuseumImage } from './MuseumImage';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Compass, 
  ShieldCheck, 
  Search, 
  Landmark,
  Layers
} from 'lucide-react';

interface IconographyExplorerProps {
  objects: HeritageObject[];
  onSelectObject: (id: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const IconographyExplorer: React.FC<IconographyExplorerProps> = ({
  objects,
  onSelectObject,
  onNavigateTab,
}) => {
  const motifs: IconographyTaxonomyItem[] = useMemo(() => {
    return getIconographyTaxonomy(objects);
  }, [objects]);

  const [activeMotifId, setActiveMotifId] = useState<string>(motifs[0]?.id || 'buddha-naga');
  const [selectedTheology, setSelectedTheology] = useState<string>('all');

  const filteredMotifs = useMemo(() => {
    if (selectedTheology === 'all') return motifs;
    return motifs.filter((m) => m.theology.includes(selectedTheology));
  }, [motifs, selectedTheology]);

  const selectedMotif = useMemo(() => {
    return motifs.find((m) => m.id === activeMotifId) || motifs[0];
  }, [motifs, activeMotifId]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16" id="iconography-explorer">
      
      {/* Header Banner */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="flex items-center space-x-3 mb-2">
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Sparkles className="w-6 h-6" />
          </span>
          <span className="text-xs uppercase tracking-widest font-mono text-amber-400">
            Biểu Tượng Học & Thần Thoại Khảo Cổ
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100 tracking-tight">
          Hệ Thống Biểu Tượng & Thần Điện Nghệ Thuật Khmer
        </h1>
        <p className="mt-2 text-sm sm:text-base text-stone-300 max-w-3xl font-serif leading-relaxed">
          Giải mã hệ thống thần thoại Ấn Độ giáo (Vishnu, Shiva, Harihara) và Phật giáo Đại thừa (Buddha Mucalinda, Lokeshvara) 
          cùng các linh thú thiêng Naga, Garuda qua các di vật bảo tàng xác thực.
        </p>

        {/* Theology Filter Tabs */}
        <div className="mt-6 pt-6 border-t border-stone-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTheology('all')}
            className={`px-4 py-2 rounded-xl text-xs font-serif font-medium transition-all ${
              selectedTheology === 'all'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            Tất Cả Biểu Tượng ({motifs.length})
          </button>
          <button
            onClick={() => setSelectedTheology('Phật Giáo')}
            className={`px-4 py-2 rounded-xl text-xs font-serif font-medium transition-all ${
              selectedTheology === 'Phật Giáo'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            Phật Giáo (Buddhism)
          </button>
          <button
            onClick={() => setSelectedTheology('Ấn Độ')}
            className={`px-4 py-2 rounded-xl text-xs font-serif font-medium transition-all ${
              selectedTheology === 'Ấn Độ'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            Ấn Độ Giáo (Hinduism)
          </button>
          <button
            onClick={() => setSelectedTheology('Biểu Tượng')}
            className={`px-4 py-2 rounded-xl text-xs font-serif font-medium transition-all ${
              selectedTheology === 'Biểu Tượng'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            Linh Thú & Hoàng Gia
          </button>
        </div>

        {/* Motif Selector Grid */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {filteredMotifs.map((m) => {
            const isActive = activeMotifId === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMotifId(m.id)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isActive
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                    : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-amber-400">
                  <span className="truncate">{m.nameSanskrit.split('/')[0]}</span>
                  <span className="px-1.5 py-0.2 rounded bg-stone-900 text-[10px]">
                    {m.matchingObjectIds.length}
                  </span>
                </div>
                <div className="font-serif font-semibold text-stone-100 text-xs mt-1 truncate">
                  {m.name.split('&')[0]}
                </div>
                <div className="text-[10px] text-amber-200/60 font-serif mt-0.5 truncate">
                  {m.nameKhmer}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Motif Deep Dive */}
      {selectedMotif && (
        <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6 border-b border-stone-800">
            <div className="lg:col-span-2 space-y-2">
              <div className="flex items-center space-x-2 text-xs text-amber-400 font-mono">
                <span>{selectedMotif.theology}</span>
                <span>•</span>
                <span>Sanskrit: {selectedMotif.nameSanskrit}</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-100">
                {selectedMotif.name} ({selectedMotif.nameKhmer})
              </h2>
              <p className="text-sm text-stone-300 font-serif leading-relaxed pt-1">
                {selectedMotif.description}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950/80 border border-amber-500/30 flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase font-mono text-amber-400 font-bold mb-1">
                  Ý Nghĩa Thần Học & Biểu Trưng
                </div>
                <p className="text-xs text-stone-300 font-serif leading-relaxed italic">
                  "{selectedMotif.symbolism}"
                </p>
              </div>
              <div className="mt-3 text-[11px] text-stone-400 font-mono">
                Xác thực trên {selectedMotif.matchingObjectIds.length} hiện vật bảo tàng
              </div>
            </div>
          </div>

          {/* Connected Objects Gallery */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-amber-400 font-bold mb-4">
              Hiện Vật Thể Hiện Biểu Tượng Này ({selectedMotif.sampleObjects.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {selectedMotif.sampleObjects.map((obj) => (
                <div
                  key={obj.id}
                  onClick={() => onSelectObject(obj.id)}
                  className="group bg-stone-950/80 rounded-2xl border border-stone-800 overflow-hidden hover:border-amber-500/60 transition-all duration-300 cursor-pointer shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/3] w-full overflow-hidden bg-stone-900 relative">
                      <MuseumImage
                        src={obj.media.primaryImage}
                        alt={obj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-sm rounded text-[10px] text-stone-300 font-mono">
                        {obj.period}
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="font-serif font-bold text-stone-100 text-sm group-hover:text-amber-300 transition-colors line-clamp-2">
                        {obj.title}
                      </h4>
                      <p className="text-xs text-stone-400 font-serif mt-1 line-clamp-2">
                        {obj.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-between text-xs text-stone-400 border-t border-stone-900 mt-2">
                    <span className="text-[11px] truncate max-w-[150px]">
                      {obj.provenance.institution.split('(')[0]}
                    </span>
                    <span className="text-amber-400 group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
