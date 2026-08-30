import React, { useState, useMemo } from 'react';
import { HeritageObject } from '../types/museum';
import { getMaterialTaxonomy, MaterialTaxonomyItem } from '../utils/explorationService';
import { MuseumImage } from './MuseumImage';
import { 
  Layers, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Landmark, 
  ShieldCheck, 
  Info, 
  Check, 
  Search,
  Filter
} from 'lucide-react';

interface MaterialExplorerProps {
  objects: HeritageObject[];
  onSelectObject: (id: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const MaterialExplorer: React.FC<MaterialExplorerProps> = ({
  objects,
  onSelectObject,
  onNavigateTab,
}) => {
  const materials: MaterialTaxonomyItem[] = useMemo(() => {
    return getMaterialTaxonomy(objects);
  }, [objects]);

  const [activeMaterialId, setActiveMaterialId] = useState<string>(materials[0]?.id || 'stone');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedMaterial = useMemo(() => {
    return materials.find((m) => m.id === activeMaterialId) || materials[0];
  }, [materials, activeMaterialId]);

  // Filter objects for the active material
  const filteredObjects = useMemo(() => {
    if (!selectedMaterial) return [];
    let items = objects.filter((o) => {
      const text = ((o.physical?.medium || '') + ' ' + (o.originalSource?.originalMaterial || '') + ' ' + o.category).toLowerCase();
      if (selectedMaterial.id === 'stone') {
        return text.includes('sa thạch') || text.includes('sandstone') || text.includes('đá') || text.includes('stone') || text.includes('quartzite');
      }
      if (selectedMaterial.id === 'bronze') {
        return text.includes('đồng') || text.includes('bronze') || text.includes('hợp kim');
      }
      if (selectedMaterial.id === 'wood') {
        return text.includes('gỗ') || text.includes('wood') || text.includes('teak');
      }
      if (selectedMaterial.id === 'precious_metals') {
        return text.includes('vàng') || text.includes('gold') || text.includes('bạc') || text.includes('silver');
      }
      if (selectedMaterial.id === 'palm_leaf') {
        return text.includes('lá buông') || text.includes('palm') || text.includes('kinh lá') || o.type === 'manuscript';
      }
      if (selectedMaterial.id === 'silk_textile') {
        return text.includes('lụa') || text.includes('silk') || text.includes('ikat') || text.includes('dệt');
      }
      return false;
    });

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.titleKhmer.includes(q) ||
          o.titleEnglish.toLowerCase().includes(q) ||
          o.period.toLowerCase().includes(q)
      );
    }

    return items;
  }, [objects, selectedMaterial, searchQuery]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16" id="material-explorer">
      
      {/* Header Banner */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="flex items-center space-x-3 mb-2">
          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Layers className="w-6 h-6" />
          </span>
          <span className="text-xs uppercase tracking-widest font-mono text-amber-400">
            Khảo Cứu Vật Liệu & Kỹ Nghệ Chế Tác
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100 tracking-tight">
          Chất Liệu & Nghệ Thuật Điêu Khắc Khmer
        </h1>
        <p className="mt-2 text-sm sm:text-base text-stone-300 max-w-3xl font-serif leading-relaxed">
          Khám phá nghệ thuật điêu khắc từ sa thạch Kulen, nghệ thuật đúc đồng sáp ong đến 
          kinh lá buông cổ truyền qua lăng kính phân loại vật lý học và khảo cổ học.
        </p>

        {/* Material Selection Tabs */}
        <div className="mt-6 pt-6 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {materials.map((mat) => {
            const isActive = activeMaterialId === mat.id;
            return (
              <button
                key={mat.id}
                onClick={() => setActiveMaterialId(mat.id)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isActive
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg shadow-amber-950/40'
                    : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-950'
                }`}
              >
                <div className="text-xs font-mono font-bold uppercase flex items-center justify-between">
                  <span>{mat.id}</span>
                  <span className="px-1.5 py-0.5 rounded bg-stone-900 text-amber-400 text-[10px]">
                    {mat.objectCount}
                  </span>
                </div>
                <div className="font-serif font-semibold text-stone-100 text-sm mt-1">
                  {mat.name.split('&')[0]}
                </div>
                <div className="text-[10px] text-amber-300/60 font-serif truncate mt-0.5">
                  {mat.nameKhmer}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Material Deep Dive Section */}
      {selectedMaterial && (
        <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-stone-800">
            <div>
              <div className="flex items-center space-x-2 text-xs text-amber-400 font-mono">
                <span>PHÂN LOẠI CHẤT LIỆU XÁC THỰC</span>
                <span>•</span>
                <span>{selectedMaterial.periods.join(', ')}</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-100 mt-1">
                {selectedMaterial.name} ({selectedMaterial.nameKhmer})
              </h2>
              <p className="text-sm text-stone-300 font-serif mt-2 max-w-3xl leading-relaxed">
                {selectedMaterial.description}
              </p>
            </div>

            {/* Quick Search inside material */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Tìm trong ${filteredObjects.length} hiện vật...`}
                className="w-full pl-9 pr-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 font-serif"
              />
            </div>
          </div>

          {/* Objects Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredObjects.length === 0 ? (
              <div className="col-span-full py-16 text-center text-stone-400">
                Không tìm thấy hiện vật nào phù hợp với từ khóa trong chất liệu này.
              </div>
            ) : (
              filteredObjects.map((obj) => (
                <div
                  key={obj.id}
                  onClick={() => onSelectObject(obj.id)}
                  className="group bg-stone-950/80 rounded-2xl border border-stone-800/90 overflow-hidden hover:border-amber-500/60 transition-all duration-300 cursor-pointer shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/3] w-full overflow-hidden bg-stone-900 relative">
                      <MuseumImage
                        src={obj.media.primaryImage}
                        alt={obj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {obj.isMasterpiece && (
                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-amber-500 text-stone-950 font-bold text-[10px] rounded-full uppercase tracking-wider font-mono shadow-md">
                          Bảo Vật
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-sm rounded text-[10px] text-stone-300 font-mono">
                        {obj.period}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-serif font-bold text-stone-100 text-sm group-hover:text-amber-300 transition-colors line-clamp-2">
                        {obj.title}
                      </h3>
                      {obj.titleKhmer && (
                        <p className="text-xs text-amber-200/60 font-serif mt-0.5 line-clamp-1">
                          {obj.titleKhmer}
                        </p>
                      )}
                      <p className="text-xs text-stone-400 font-serif mt-2 line-clamp-2">
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
              ))
            )}
          </div>

        </div>
      )}

    </div>
  );
};
