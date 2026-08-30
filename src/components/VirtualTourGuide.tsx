import React, { useState, useEffect, useRef } from 'react';
import { VIRTUAL_TOURS } from '../data/toursData';
import { VirtualTour, VirtualTourStop } from '../types/museum';
import { MuseumImage } from './MuseumImage';
import { 
  Footprints, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  ChevronLeft, 
  Compass, 
  Landmark, 
  Sparkles, 
  Clock, 
  MapPin, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface VirtualTourGuideProps {
  onSelectObject: (id: string) => void;
}

export const VirtualTourGuide: React.FC<VirtualTourGuideProps> = ({
  onSelectObject,
}) => {
  const [selectedTourId, setSelectedTourId] = useState<string>(VIRTUAL_TOURS[0].id);
  const [activeStopIndex, setActiveStopIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isAutoTourActive, setIsAutoTourActive] = useState<boolean>(false);
  const [speechProgress, setSpeechProgress] = useState<number>(0);

  const activeTour = VIRTUAL_TOURS.find((t) => t.id === selectedTourId) || VIRTUAL_TOURS[0];
  const activeStop: VirtualTourStop = activeTour.stops[activeStopIndex] || activeTour.stops[0];

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  // Web Speech API Voice Narration with Progress Tracking
  const handleToggleNarration = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        setIsPlayingAudio(false);
        setSpeechProgress(0);
      } else {
        window.speechSynthesis.cancel();
        const text = `${activeStop.title}. ${activeStop.subtitle}. ${activeStop.narrationText} Ý nghĩa lịch sử: ${activeStop.historicalSignificance}`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'vi-VN';
        utterance.rate = 0.95;
        utteranceRef.current = utterance;

        setSpeechProgress(0);
        const startTime = Date.now();
        const estimatedDurationMs = Math.max(8000, text.length * 75);

        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = window.setInterval(() => {
          const elapsed = Date.now() - startTime;
          const pct = Math.min(99, Math.round((elapsed / estimatedDurationMs) * 100));
          setSpeechProgress(pct);
        }, 300);

        utterance.onend = () => {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          setSpeechProgress(100);
          setIsPlayingAudio(false);
          if (isAutoTourActive && activeStopIndex < activeTour.stops.length - 1) {
            setTimeout(() => {
              setActiveStopIndex((prev) => prev + 1);
            }, 1200);
          }
        };

        utterance.onerror = () => {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          setIsPlayingAudio(false);
        };

        setIsPlayingAudio(true);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setIsPlayingAudio(!isPlayingAudio);
    }
  };

  // Reset audio when stop changes
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    setIsPlayingAudio(false);
    setSpeechProgress(0);

    if (isAutoTourActive) {
      const timer = setTimeout(() => {
        handleToggleNarration();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [selectedTourId, activeStopIndex]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  const handleNextStop = () => {
    if (activeStopIndex < activeTour.stops.length - 1) {
      setActiveStopIndex((prev) => prev + 1);
    }
  };

  const handlePrevStop = () => {
    if (activeStopIndex > 0) {
      setActiveStopIndex((prev) => prev - 1);
    }
  };

  const handleToggleAutoTour = () => {
    if (isAutoTourActive) {
      setIsAutoTourActive(false);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      setIsAutoTourActive(true);
      if (!isPlayingAudio) {
        handleToggleNarration();
      }
    }
  };

  return (
    <div className="space-y-10 pb-24" id="virtual-tour-guide-view">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono tracking-widest uppercase">
            <Footprints className="w-4 h-4" />
            <span>Tuyến Tham Quan Bảo Tàng Số (Curated Virtual Tours)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100">
            Hải Trình Khám Phá & Thuyết Minh Âm Thanh
          </h1>
          <p className="text-stone-400 text-sm font-serif max-w-3xl">
            Trải nghiệm các tuyến tham quan học thuật chuyên đề được giám tuyển bởi các nhà nghiên cứu di sản. Tích hợp âm thanh thuyết minh và bản đồ trạm dừng chi tiết.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            id="btn-auto-tour-toggle"
            onClick={handleToggleAutoTour}
            className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold flex items-center space-x-2 transition-all cursor-pointer border ${
              isAutoTourActive
                ? 'bg-amber-400 text-stone-950 border-amber-300 ring-2 ring-amber-400/50 shadow-lg'
                : 'bg-stone-900 hover:bg-stone-850 text-stone-200 border-stone-700'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${isAutoTourActive ? 'animate-spin text-stone-950' : 'text-amber-400'}`} />
            <span>{isAutoTourActive ? 'Đang Tự Động Thuyết Minh' : 'Bật Thuyết Minh Tự Động'}</span>
          </button>

          <div className="flex items-center space-x-2 text-xs font-mono text-stone-400 bg-stone-900 border border-stone-800 px-3.5 py-2 rounded-2xl">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>{activeTour.estimatedDuration}</span>
          </div>
        </div>
      </div>

      {/* Tour Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="tours-selection-grid">
        {VIRTUAL_TOURS.map((tour) => {
          const isSelected = tour.id === selectedTourId;
          return (
            <div
              key={tour.id}
              id={`tour-card-${tour.id}`}
              onClick={() => {
                setSelectedTourId(tour.id);
                setActiveStopIndex(0);
              }}
              className={`p-5 rounded-3xl transition-all border cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-500/30 shadow-2xl scale-[1.01]'
                  : 'bg-stone-900/60 hover:bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                  {tour.theme}
                </span>
                <h3 className="font-serif font-bold text-base text-stone-100">
                  {tour.title}
                </h3>
                <p className="text-xs font-serif text-stone-400 line-clamp-2">
                  {tour.tagline}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-semibold">{tour.stopsCount} Trạm Dừng</span>
                {isSelected ? (
                  <span className="text-emerald-400 flex items-center space-x-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Đang tham quan</span>
                  </span>
                ) : (
                  <span className="text-stone-400">Chọn tuyến →</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Tour Stage */}
      <div className="rounded-3xl bg-stone-900 border border-stone-800 overflow-hidden shadow-2xl space-y-8">
        
        {/* Stage Media & Narration Overlay Banner */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-stone-950">
          <MuseumImage
            src={activeStop.image}
            alt={activeStop.title}
            title={activeStop.title}
            category="Sacred Architecture"
            period="Angkor & Pre-Angkor"
            className="w-full h-full object-cover object-center filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent" />

          {/* Top Info Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-mono">
              Trạm {activeStopIndex + 1} / {activeTour.stops.length}
            </span>

            {/* Audio Narration Toggle */}
            <button
              onClick={handleToggleNarration}
              className={`px-4 py-2 rounded-2xl font-mono text-xs flex items-center space-x-2 transition-all cursor-pointer backdrop-blur-md border ${
                isPlayingAudio
                  ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold animate-pulse shadow-lg'
                  : 'bg-stone-950/80 text-stone-200 border-stone-700 hover:bg-stone-850'
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isPlayingAudio ? `Đang thuyết minh (${speechProgress}%)` : 'Nghe Thuyết Minh (Audio)'}</span>
            </button>
          </div>

          {/* Progress bar on banner */}
          {isPlayingAudio && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-stone-800">
              <div 
                className="h-full bg-amber-400 transition-all duration-300"
                style={{ width: `${speechProgress}%` }}
              />
            </div>
          )}

          {/* Bottom Title on Image */}
          <div className="absolute bottom-6 left-6 right-6 space-y-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-100">
              {activeStop.title}
            </h2>
            <p className="text-xs sm:text-sm font-serif text-amber-200/90">
              {activeStop.subtitle}
            </p>
          </div>
        </div>

        {/* Stop Content & Scholarly Breakdown */}
        <div className="px-6 sm:px-8 pb-8 space-y-6">
          
          {/* Main Narration Body */}
          <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
              <Volume2 className="w-4 h-4" />
              <span>Nội Dung Thuyết Minh Học Thuật:</span>
            </div>
            <p className="text-sm sm:text-base font-serif text-stone-200 leading-relaxed">
              {activeStop.narrationText}
            </p>
          </div>

          {/* 2-Column Academic Deep-Dive */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-2">
              <span className="font-mono text-xs text-amber-400 uppercase font-semibold">
                Ý Nghĩa Lịch Sử & Khảo Cổ:
              </span>
              <p className="text-xs sm:text-sm font-serif text-stone-300 leading-relaxed">
                {activeStop.historicalSignificance}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-2">
              <span className="font-mono text-xs text-amber-400 uppercase font-semibold">
                Vị Trí Thần Học & Vũ Trụ Luận:
              </span>
              <p className="text-xs sm:text-sm font-serif text-stone-300 leading-relaxed">
                {activeStop.theologicalRole}
              </p>
            </div>
          </div>

          {/* Linked Object Link if available */}
          {activeStop.objectId && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Landmark className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <h3 className="font-serif font-bold text-sm text-stone-100">
                    Hiện vật / Di tích liên kết trong Bảo tàng:
                  </h3>
                  <p className="text-xs font-serif text-stone-400">
                    Xem hồ sơ chuyên sâu, hình ảnh 3D và tài liệu lưu trữ gốc.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onSelectObject(activeStop.objectId!)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer shrink-0"
              >
                <span>Xem Hồ Sơ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Tour Progress Ribbon & Navigation Controls */}
          <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Step Indicators */}
            <div className="flex items-center space-x-2">
              {activeTour.stops.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStopIndex(idx)}
                  className={`w-8 h-8 rounded-xl font-mono text-xs flex items-center justify-center transition-all cursor-pointer ${
                    idx === activeStopIndex
                      ? 'bg-amber-500 text-stone-950 font-bold scale-110 shadow-md'
                      : idx < activeStopIndex
                      ? 'bg-stone-800 text-amber-400 hover:bg-stone-700'
                      : 'bg-stone-850 text-stone-400 hover:bg-stone-800'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrevStop}
                disabled={activeStopIndex === 0}
                className="px-4 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 disabled:opacity-40 disabled:hover:bg-stone-950 text-stone-300 border border-stone-800 text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Trạm Trước</span>
              </button>

              <button
                onClick={handleNextStop}
                disabled={activeStopIndex === activeTour.stops.length - 1}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-stone-950 font-bold text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer shadow-md"
              >
                <span>Trạm Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
