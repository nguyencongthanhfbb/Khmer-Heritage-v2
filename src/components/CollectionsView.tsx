import React, { useState } from 'react';
import { MuseumCollection, HeritageObject } from '../types/museum';
import { MuseumImage } from './MuseumImage';
import { Layers, ArrowRight, Bookmark, Landmark, Sparkles, Filter } from 'lucide-react';

interface CollectionsViewProps {
  collections: MuseumCollection[];
  objects: HeritageObject[];
  onSelectObject: (id: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  collections,
  objects,
  onSelectObject,
  savedIds,
  onToggleSave,
}) => {
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>(collections[0]?.id || '');

  const activeCollection = collections.find((c) => c.id === selectedCollectionId) || collections[0];
  const collectionObjects = objects.filter((o) => 
    activeCollection?.objectIds.includes(o.id) ||
    o.relations.relatedCollections.includes(activeCollection?.id)
  );

  return (
    <div className="space-y-10 pb-20" id="collections-view-root">
      
      {/* Header */}
      <div className="space-y-2 border-b border-stone-800 pb-6">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono tracking-widest uppercase">
          <Layers className="w-4 h-4" />
          <span>Không Gian Trưng Bày Chuyên Đề</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100">
          Bộ Sưu Tập Di Sản & Khảo Cổ
        </h1>
        <p className="text-stone-400 text-sm font-serif max-w-3xl">
          Các chuyên mục triển lãm được giám tuyển công phu, phân loại theo loại hình nghệ thuật, chất liệu và thời kỳ lịch sử.
        </p>
      </div>

      {/* Collection Tab Selector */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2 no-scrollbar" id="collection-tabs-bar">
        {collections.map((col) => {
          const isActive = col.id === selectedCollectionId;
          return (
            <button
              key={col.id}
              id={`tab-col-${col.id}`}
              onClick={() => setSelectedCollectionId(col.id)}
              className={`whitespace-nowrap px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center space-x-2.5 ${
                isActive
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-950/40'
                  : 'bg-stone-900 text-stone-300 hover:text-stone-100 hover:bg-stone-850 border border-stone-800'
              }`}
            >
              <span>{col.title}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                isActive ? 'bg-stone-950 text-amber-300' : 'bg-stone-800 text-stone-400'
              }`}>
                {col.objectIds.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Collection Spotlight Hero */}
      {activeCollection && (
        <div 
          className="rounded-3xl bg-stone-900 border border-stone-800 overflow-hidden shadow-xl"
          id={`col-detail-${activeCollection.id}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 aspect-[16/10] lg:aspect-auto overflow-hidden bg-stone-950">
              <MuseumImage
                src={activeCollection.representativeImage}
                alt={activeCollection.title}
                title={activeCollection.title}
                period={activeCollection.period}
                category={activeCollection.category}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono">
                    {activeCollection.period}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-stone-800 text-stone-300 border border-stone-700 text-xs font-mono">
                    {activeCollection.theme}
                  </span>
                </div>

                <h2 className="text-xl font-serif text-amber-200/90">
                  {activeCollection.titleKhmer}
                </h2>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
                  {activeCollection.title}
                </h3>
                <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
                  {activeCollection.description}
                </p>
              </div>

              {/* Curator Note */}
              <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 text-xs text-stone-300 font-light space-y-1.5">
                <div className="flex items-center space-x-1.5 text-amber-400 font-mono font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Lời Bình Giám Tuyển (Curator's Note)</span>
                </div>
                <p>{activeCollection.curatorNote}</p>
                <div className="pt-2 text-[10px] text-stone-400 font-mono">
                  {activeCollection.provenanceContext}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Objects Grid in Collection */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <h3 className="text-xl font-serif font-bold text-stone-100">
            Hiện Vật & Di Tích Thuộc Bộ Sưu Tập ({collectionObjects.length})
          </h3>
          <span className="text-xs font-mono text-stone-400">
            Hồ sơ kiểm định đầy đủ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collectionObjects.map((obj) => (
            <div
              key={obj.id}
              id={`col-obj-card-${obj.id}`}
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
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-stone-900/90 text-[11px] font-mono text-amber-300 border border-amber-500/30">
                  {obj.period}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(obj.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-all ${
                    savedIds.includes(obj.id)
                      ? 'bg-amber-500 text-stone-950'
                      : 'bg-stone-900/80 text-stone-300 hover:text-amber-300'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h4 
                    onClick={() => onSelectObject(obj.id)}
                    className="font-serif text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-1 cursor-pointer"
                  >
                    {obj.title}
                  </h4>
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
                    onClick={() => onSelectObject(obj.id)}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center space-x-1 cursor-pointer font-mono"
                  >
                    <span>Khám Phá</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
