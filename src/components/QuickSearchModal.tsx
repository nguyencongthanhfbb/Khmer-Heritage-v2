import React, { useState, useEffect } from 'react';
import { HeritageObject } from '../types/museum';
import { MuseumImage } from './MuseumImage';
import { Search, X, ArrowRight, Landmark, Clock, Sparkles } from 'lucide-react';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  objects: HeritageObject[];
  onSelectObject: (id: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  objects,
  onSelectObject,
}) => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? objects.filter((o) => {
        const q = query.toLowerCase();
        return (
          o.title.toLowerCase().includes(q) ||
          o.titleKhmer.includes(q) ||
          o.titleEnglish.toLowerCase().includes(q) ||
          o.summary.toLowerCase().includes(q) ||
          o.category.toLowerCase().includes(q) ||
          o.period.toLowerCase().includes(q)
        );
      })
    : objects.slice(0, 5);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 animate-in fade-in duration-150"
      id="quick-search-modal"
    >
      <div className="bg-stone-900 border border-stone-700 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Search Header */}
        <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center space-x-3">
          <Search className="w-5 h-5 text-amber-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm hiện vật, đền đài, vua chúa, chữ Khmer (ví dụ: Vishnu, Bayon, ព្រះវិស្ណុ)..."
            className="flex-1 bg-transparent text-stone-100 placeholder-stone-400 text-sm font-serif focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-xs text-stone-400 hover:text-stone-200">
              Xóa
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-2 no-scrollbar">
          <div className="text-[11px] font-mono text-stone-400 px-3 py-1 uppercase tracking-wider">
            {query ? `Kết quả tìm kiếm (${results.length})` : 'Hiện vật đề xuất nổi bật'}
          </div>

          {results.map((obj) => (
            <div
              key={obj.id}
              onClick={() => {
                onSelectObject(obj.id);
                onClose();
              }}
              className="p-3 rounded-2xl bg-stone-950/60 hover:bg-stone-800/80 border border-stone-850 hover:border-amber-500/40 transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-stone-900">
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
                  <div className="flex items-center space-x-2">
                    <span className="font-serif font-bold text-sm text-stone-100 group-hover:text-amber-300 transition-colors">
                      {obj.title}
                    </span>
                    <span className="text-[10px] font-mono text-amber-400 bg-stone-900 px-1.5 py-0.5 rounded">
                      {obj.period}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 font-serif line-clamp-1">
                    {obj.titleKhmer} • {obj.titleEnglish}
                  </p>
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-400 transform group-hover:translate-x-1 transition-transform" />
            </div>
          ))}

          {results.length === 0 && (
            <div className="p-8 text-center text-xs text-stone-400 font-serif">
              Không tìm thấy hiện vật phù hợp với từ khóa "{query}".
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-stone-950 border-t border-stone-800/80 flex items-center justify-between text-[11px] font-mono text-stone-400">
          <span>Khmer Heritage Digital Museum</span>
          <span>Bấm ESC để đóng</span>
        </div>

      </div>
    </div>
  );
};
