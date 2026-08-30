import React, { useState } from 'react';
import { TimelineEpoch, HeritageObject } from '../types/museum';
import { Clock, ArrowRight, Landmark, Crown, Sparkles, ChevronRight, Bookmark } from 'lucide-react';

interface TimelineViewProps {
  timeline: TimelineEpoch[];
  objects: HeritageObject[];
  onSelectObject: (id: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  timeline,
  objects,
  onSelectObject,
  savedIds,
  onToggleSave,
}) => {
  const [selectedEpochId, setSelectedEpochId] = useState<string>(timeline[2]?.id || timeline[0]?.id);

  const activeEpoch = timeline.find((e) => e.id === selectedEpochId) || timeline[0];
  const epochObjects = objects.filter((o) => 
    activeEpoch?.relatedObjectIds.includes(o.id) ||
    o.period === (activeEpoch.name.includes('Phù Nam') ? 'Funan' : activeEpoch.name.includes('Chân Lạp') ? 'Chenla' : activeEpoch.name.includes('Angkor') && !activeEpoch.name.includes('Hậu') ? 'Angkor' : activeEpoch.name.includes('Hậu') ? 'Post-Angkor' : 'Modern')
  );

  return (
    <div className="space-y-12 pb-24" id="timeline-view-root">
      
      {/* Header */}
      <div className="space-y-2 border-b border-stone-800 pb-6">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono tracking-widest uppercase">
          <Clock className="w-4 h-4" />
          <span>Biên Niên Sử & Kỷ Nguyên Văn Minh</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100">
          Trục Thời Gian Lịch Sử Campuchia
        </h1>
        <p className="text-stone-400 text-sm font-serif max-w-3xl">
          Hành trình hơn 2.000 năm lịch sử từ vương quốc Phù Nam, Chân Lạp, kỷ nguyên huy hoàng của Đế chế Angkor đến giai đoạn hồi sinh bảo tồn hiện đại.
        </p>
      </div>

      {/* Epochs Interactive Stepper Bar */}
      <div className="relative py-4" id="timeline-stepper-bar">
        {/* Connection Line */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-stone-800 -translate-y-1/2 z-0" />
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
          {timeline.map((epoch, idx) => {
            const isActive = epoch.id === selectedEpochId;
            return (
              <button
                key={epoch.id}
                id={`btn-epoch-step-${epoch.id}`}
                onClick={() => setSelectedEpochId(epoch.id)}
                className={`p-4 rounded-2xl text-left transition-all cursor-pointer space-y-2 flex flex-col justify-between ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xl shadow-amber-950/50 scale-105 border-2 border-amber-300'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-850 hover:text-stone-100 border border-stone-800'
                }`}
              >
                <div>
                  <div className={`text-[10px] font-mono uppercase tracking-wider ${
                    isActive ? 'text-stone-900' : 'text-amber-400'
                  }`}>
                    GIAI ĐOẠN 0{idx + 1}
                  </div>
                  <div className="font-serif text-sm font-bold mt-1 line-clamp-1">
                    {epoch.name.split('(')[0]}
                  </div>
                </div>
                <div className={`text-xs font-mono ${isActive ? 'text-stone-900' : 'text-stone-400'}`}>
                  {epoch.timeSpan}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Epoch Deep Dive Card */}
      {activeEpoch && (
        <div 
          className="rounded-3xl bg-stone-900 border border-stone-800 overflow-hidden shadow-2xl space-y-8 p-6 sm:p-10"
          id={`epoch-content-${activeEpoch.id}`}
        >
          {/* Epoch Title & Time Span */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                {activeEpoch.timeSpan}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100">
                {activeEpoch.name}
              </h2>
              <p className="text-sm font-serif text-amber-200/80">
                {activeEpoch.nameKhmer}
              </p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono text-stone-300">
              Phong cách nghệ thuật: <strong className="text-amber-400">{activeEpoch.representativeArtStyle}</strong>
            </div>
          </div>

          {/* Overview & Key Developments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Description & Key Milestones (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
                {activeEpoch.description}
              </p>

              <div className="space-y-3">
                <h4 className="font-mono text-xs text-amber-400 uppercase tracking-wider font-semibold">
                  Các Dấu Mốc Khảo Cổ & Bước Tiến Lịch Sử:
                </h4>
                <ul className="space-y-2.5">
                  {activeEpoch.keyDevelopments.map((dev, i) => (
                    <li key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-stone-300 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                      <span>{dev}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Rulers & Iconic Monuments (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Major Rulers */}
              <div className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-3">
                <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs uppercase tracking-wider font-semibold">
                  <Crown className="w-4 h-4" />
                  <span>Các Vị Vua & Lãnh Tụ Tiêu Biểu</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeEpoch.majorRulers.map((r, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-xs font-serif text-amber-200">
                      👑 {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Iconic Monuments */}
              <div className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-3">
                <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs uppercase tracking-wider font-semibold">
                  <Landmark className="w-4 h-4" />
                  <span>Công Trình & Kinh Đô Di Tích</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeEpoch.iconicMonuments.map((m, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-xs font-serif text-stone-200">
                      🏛️ {m}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Related Objects in Epoch */}
          {epochObjects.length > 0 && (
            <div className="pt-8 border-t border-stone-800 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-serif font-bold text-stone-100">
                  Hiện Vật Thuộc Thời Kỳ Này ({epochObjects.length})
                </h3>
                <span className="text-xs font-mono text-stone-400">
                  Hồ sơ lưu trữ chính thức
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {epochObjects.map((obj) => (
                  <div
                    key={obj.id}
                    id={`epoch-obj-card-${obj.id}`}
                    onClick={() => onSelectObject(obj.id)}
                    className="group rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-500/40 transition-all overflow-hidden flex flex-col cursor-pointer shadow-md hover:shadow-xl"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-stone-900">
                      <img
                        src={obj.media.primaryImage}
                        alt={obj.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <span className="text-[10px] font-mono text-amber-400">
                          {obj.category} • {obj.dateRange}
                        </span>
                        <h4 className="font-serif text-base font-bold text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-1 mt-0.5">
                          {obj.title}
                        </h4>
                        <p className="text-xs text-stone-400 font-light line-clamp-2 mt-1">
                          {obj.summary}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-stone-850 flex items-center justify-between text-xs font-mono text-amber-400">
                        <span>Chi tiết hiện vật</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
