import React, { useState } from 'react';
import { HeritageObject } from '../types/museum';
import { Bookmark, Trash2, ArrowRight, Download, FileText, Share2, Check, BookOpen } from 'lucide-react';

interface SavedCurationsProps {
  savedObjects: HeritageObject[];
  onSelectObject: (id: string) => void;
  onRemoveSave: (id: string) => void;
  onClearAll: () => void;
}

export const SavedCurations: React.FC<SavedCurationsProps> = ({
  savedObjects,
  onSelectObject,
  onRemoveSave,
  onClearAll,
}) => {
  const [copiedExport, setCopiedExport] = useState<boolean>(false);

  const handleExportMarkdown = () => {
    let md = `# BẢO TÀNG KHMER HERITAGE — DANH MỤC HIỆN VẬT NGHIÊN CỨU\n\n`;
    md += `*Thời gian xuất:* ${new Date().toLocaleDateString('vi-VN')} ${new Date().toLocaleTimeString('vi-VN')}\n`;
    md += `*Tổng số hiện vật lưu trữ:* ${savedObjects.length}\n\n---\n\n`;

    savedObjects.forEach((obj, idx) => {
      md += `### ${idx + 1}. ${obj.title} (${obj.titleKhmer})\n`;
      md += `- **Tiêu đề tiếng Anh:** ${obj.titleEnglish}\n`;
      md += `- **Thời kỳ & Niên đại:** ${obj.period} | ${obj.dateRange}\n`;
      md += `- **Thể loại & Chất liệu:** ${obj.category} | ${obj.material || 'N/A'}\n`;
      md += `- **Viện lưu trữ:** ${obj.provenance.institution} (Mã: ${obj.provenance.accessionNumber || 'N/A'})\n`;
      md += `- **Giấy phép:** ${obj.provenance.license}\n`;
      md += `- **Tóm tắt:** ${obj.summary}\n`;
      md += `- **Nguồn gốc:** ${obj.provenance.sourceUrl}\n\n`;
    });

    navigator.clipboard.writeText(md);
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 3000);
  };

  return (
    <div className="space-y-10 pb-24" id="saved-curations-view">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono tracking-widest uppercase">
            <Bookmark className="w-4 h-4" />
            <span>Kho Lưu Trữ Cá Nhân & Hồ Sơ Nghiên Cứu</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100">
            Hiện Vật & Di Tích Đã Lưu Trữ ({savedObjects.length})
          </h1>
          <p className="text-stone-400 text-sm font-serif max-w-2xl">
            Danh mục các hiện vật bạn đã đánh dấu để tra cứu, nghiên cứu học thuật hoặc tham quan thực địa.
          </p>
        </div>

        {savedObjects.length > 0 && (
          <div className="flex items-center space-x-3">
            <button
              id="btn-export-saved-markdown"
              onClick={handleExportMarkdown}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs font-mono flex items-center space-x-2 transition-colors cursor-pointer shadow-md"
            >
              {copiedExport ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Đã Sao Chép Danh Mục (Markdown)</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Xuất Trích Dẫn Nghiên Cứu</span>
                </>
              )}
            </button>

            <button
              id="btn-clear-all-saved"
              onClick={onClearAll}
              className="p-2.5 rounded-xl bg-stone-900 hover:bg-red-950/40 text-stone-400 hover:text-red-400 border border-stone-800 transition-colors cursor-pointer"
              title="Xóa toàn bộ mục đã lưu"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {savedObjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedObjects.map((obj) => (
            <div
              key={obj.id}
              id={`saved-card-${obj.id}`}
              className="group rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-all overflow-hidden flex flex-col shadow-md hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
                <img
                  src={obj.media.primaryImage}
                  alt={obj.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-stone-900/90 text-[11px] font-mono text-amber-300 border border-amber-500/30">
                  {obj.period}
                </div>

                <button
                  id={`btn-remove-saved-${obj.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveSave(obj.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-stone-900/80 hover:bg-red-900 text-stone-300 hover:text-red-200 transition-colors cursor-pointer"
                  title="Bỏ lưu hiện vật"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
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
                    onClick={() => onSelectObject(obj.id)}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center space-x-1 cursor-pointer font-mono"
                  >
                    <span>Xem Chi Tiết</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 rounded-3xl bg-stone-900/50 border border-stone-800 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center mx-auto text-amber-400">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-200">
            Chưa Có Hiện Vật Nào Được Lưu Trữ
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 font-serif max-w-md mx-auto">
            Khi duyệt qua sảnh bảo tàng hoặc danh mục hiện vật, hãy bấm vào biểu tượng Bookmark để lưu lại những hiện vật bạn quan tâm.
          </p>
        </div>
      )}

    </div>
  );
};
