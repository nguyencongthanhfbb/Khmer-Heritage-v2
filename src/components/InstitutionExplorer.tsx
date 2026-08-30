import React, { useState, useMemo } from 'react';
import { HeritageObject } from '../types/museum';
import { INSTITUTIONS_DATA, InstitutionRecord } from '../data/institutionsData';
import { MuseumImage } from './MuseumImage';
import { 
  Landmark, 
  ExternalLink, 
  ShieldCheck, 
  ArrowRight, 
  MapPin, 
  Layers, 
  Sparkles,
  BookOpen
} from 'lucide-react';

interface InstitutionExplorerProps {
  objects: HeritageObject[];
  onSelectObject: (id: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const InstitutionExplorer: React.FC<InstitutionExplorerProps> = ({
  objects,
  onSelectObject,
  onNavigateTab,
}) => {
  const [selectedInstName, setSelectedInstName] = useState<string>(INSTITUTIONS_DATA[0]?.institution || '');

  const activeInstitution = useMemo(() => {
    return INSTITUTIONS_DATA.find((i) => i.institution === selectedInstName) || INSTITUTIONS_DATA[0];
  }, [selectedInstName]);

  const institutionObjects = useMemo(() => {
    if (!activeInstitution) return [];
    return objects.filter((o) =>
      o.provenance?.institution?.toLowerCase().includes(activeInstitution.institution.toLowerCase().substring(0, 10)) ||
      (activeInstitution.institution.includes('Metropolitan') && o.provenance?.institution?.includes('Metropolitan')) ||
      (activeInstitution.institution.includes('Smithsonian') && o.provenance?.institution?.includes('Smithsonian')) ||
      (activeInstitution.institution.includes('Congress') && o.provenance?.institution?.includes('Congress')) ||
      (activeInstitution.institution.includes('National Museum of Cambodia') && o.provenance?.institution?.includes('National Museum of Cambodia')) ||
      (activeInstitution.institution.includes('Internet Archive') && (o.provenance?.institution?.includes('Internet Archive') || o.provenance?.institution?.includes('EFEO')))
    );
  }, [objects, activeInstitution]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16" id="institution-explorer">
      
      {/* Header Banner */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="flex items-center space-x-3 mb-2">
          <span className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/30">
            <Landmark className="w-6 h-6" />
          </span>
          <span className="text-xs uppercase tracking-widest font-mono text-sky-400">
            Mạng Lưới Viện Bảo Tàng & Kho Lưu Trữ Quốc Tế
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100 tracking-tight">
          Hệ Thống Viện Bảo Tàng & Hồ Sơ Xuất Xứ (Provenance)
        </h1>
        <p className="mt-2 text-sm sm:text-base text-stone-300 max-w-3xl font-serif leading-relaxed">
          Tra cứu nguồn gốc xuất xứ, số hiệu kiểm kê (Accession Number) và giấy phép mở (Open Access / CC0) 
          từ 5 tổ chức lưu trữ học thuật hàng đầu thế giới.
        </p>

        {/* Institution Selector Grid */}
        <div className="mt-6 pt-6 border-t border-stone-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INSTITUTIONS_DATA.map((inst) => {
            const isActive = activeInstitution?.institution === inst.institution;
            return (
              <div
                key={inst.institution}
                onClick={() => setSelectedInstName(inst.institution)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isActive
                    ? 'bg-sky-500/15 border-sky-500 text-sky-300 shadow-lg'
                    : 'bg-stone-950/70 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono text-sky-400">
                  <span className="truncate max-w-[150px]">{inst.locationCity}</span>
                  <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-[10px] text-amber-400 font-bold">
                    {inst.objectCount} Hiện Vật
                  </span>
                </div>
                <h3 className="font-serif font-bold text-stone-100 text-sm mt-2 line-clamp-2">
                  {inst.institution}
                </h3>
                <p className="text-[11px] text-amber-200/60 font-serif mt-1 truncate">
                  {inst.khmerName}
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-900">
                  <span className="font-mono">{inst.license}</span>
                  <span className="text-sky-400 text-[10px] flex items-center space-x-1">
                    <span>Xem hồ sơ</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Institution Detail & Catalog */}
      {activeInstitution && (
        <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-6">
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-stone-800">
            <div>
              <div className="flex items-center space-x-2 text-xs text-sky-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>GIẤY PHÉP: {activeInstitution.license}</span>
                <span>•</span>
                <span>{activeInstitution.locationCity}</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-100 mt-1">
                {activeInstitution.institution}
              </h2>
              <p className="text-xs text-amber-300/80 font-serif mt-0.5">
                {activeInstitution.khmerName}
              </p>
              <p className="text-sm text-stone-300 font-serif mt-2 max-w-3xl leading-relaxed">
                {activeInstitution.description}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <a
                href={activeInstitution.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-sky-500/10 border border-sky-500/40 text-sky-300 hover:bg-sky-500/20 text-xs font-serif font-semibold transition-colors"
              >
                <span>Cổng Tra Cứu Gốc</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Objects from this institution */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-sky-400 font-bold mb-4">
              Danh Mục Hiện Vật Lưu Giữ Tại Viện ({institutionObjects.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {institutionObjects.map((obj) => (
                <div
                  key={obj.id}
                  onClick={() => onSelectObject(obj.id)}
                  className="group bg-stone-950/80 rounded-2xl border border-stone-800 overflow-hidden hover:border-sky-500/60 transition-all duration-300 cursor-pointer shadow-lg flex flex-col justify-between"
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
                      {obj.provenance.accessionNumber && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/80 backdrop-blur-sm rounded text-[9px] text-amber-300 font-mono">
                          #{obj.provenance.accessionNumber}
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h4 className="font-serif font-bold text-stone-100 text-sm group-hover:text-sky-300 transition-colors line-clamp-2">
                        {obj.title}
                      </h4>
                      <p className="text-xs text-stone-400 font-serif mt-1 line-clamp-2">
                        {obj.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-between text-xs text-stone-400 border-t border-stone-900 mt-2">
                    <span className="text-[10px] font-mono text-emerald-400">
                      {obj.provenance.license}
                    </span>
                    <span className="text-sky-400 group-hover:translate-x-1 transition-transform">
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
