import React, { useState, useEffect, useRef } from 'react';
import { HeritageObject } from '../types/museum';
import { MuseumImage } from './MuseumImage';
import { getAuthenticFallbackImage } from '../utils/imageUtils';
import { 
  ArrowLeft, 
  Bookmark, 
  Check, 
  ExternalLink, 
  Landmark, 
  MapPin, 
  Clock, 
  Layers, 
  ShieldCheck, 
  Volume2, 
  Pause, 
  Play, 
  Sparkles, 
  Maximize2, 
  Info, 
  Compass,
  FileText,
  Share2,
  Copy,
  Radio
} from 'lucide-react';

interface HeritageObjectDetailProps {
  object: HeritageObject;
  allObjects: HeritageObject[];
  onBack: () => void;
  onSelectObject: (id: string) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onOpenCuratorWithContext: (id: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const HeritageObjectDetail: React.FC<HeritageObjectDetailProps> = ({
  object,
  allObjects,
  onBack,
  onSelectObject,
  savedIds,
  onToggleSave,
  onOpenCuratorWithContext,
  onNavigateTab,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(object.media.primaryImage);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [copiedCitation, setCopiedCitation] = useState<boolean>(false);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState<boolean>(false);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [citationFormat, setCitationFormat] = useState<'APA' | 'Chicago' | 'EFEO' | 'BibTeX'>('APA');

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const isSaved = savedIds.includes(object.id);
  const activeHotspot = object.hotspots?.find((h) => h.id === activeHotspotId) || null;

  // Audio Guide Speech Synthesis integration
  const handleToggleAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        window.speechSynthesis.cancel();
        const narrationText = `${object.title}. ${object.summary}. Bối cảnh lịch sử: ${object.historicalContext}. Ý nghĩa văn hóa: ${object.culturalSignificance}`;
        const utterance = new SpeechSynthesisUtterance(narrationText);
        utterance.lang = 'vi-VN';
        utterance.rate = 0.95;
        utteranceRef.current = utterance;

        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        setIsPlayingAudio(true);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setIsPlayingAudio(!isPlayingAudio);
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [object.id]);

  // Find related objects from knowledge graph
  const relatedObjects = allObjects.filter(
    (o) => o.id !== object.id && (
      object.relations.relatedEntityIds.includes(o.id) ||
      o.relations.relatedCollections.some((c) => object.relations.relatedCollections.includes(c)) ||
      o.period === object.period
    )
  ).slice(0, 4);

  const getFormattedCitation = () => {
    const year = object.provenance.discoveryYear || '2024';
    if (citationFormat === 'APA') {
      return `${object.provenance.institution}. (${year}). ${object.titleEnglish} [${object.category}]. ${object.location?.siteName || 'Angkor, Cambodia'}. Accession: ${object.provenance.accessionNumber || 'N/A'}. Retrieved from ${object.provenance.sourceUrl}`;
    }
    if (citationFormat === 'Chicago') {
      return `${object.provenance.institution}. "${object.titleEnglish}." ${object.period} Period, ${object.dateRange}. ${object.provenance.institution}, Accession no. ${object.provenance.accessionNumber || 'N/A'}. ${object.provenance.sourceUrl}.`;
    }
    if (citationFormat === 'EFEO') {
      return `École française d’Extrême-Orient & ${object.provenance.institution}, « ${object.titleEnglish} (${object.titleKhmer}) », Fonds Cambodge, Ref: ${object.provenance.sourceRecordId || object.id}.`;
    }
    // BibTeX
    return `@misc{${object.id.replace(/-/g, '_')},
  title = {${object.titleEnglish}},
  author = {{${object.provenance.institution}}},
  year = {${year}},
  howpublished = {\\url{${object.provenance.sourceUrl}}},
  note = {Accession: ${object.provenance.accessionNumber || 'N/A'}}
}`;
  };

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(getFormattedCitation());
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  return (
    <div className="space-y-12 pb-24" id="heritage-object-detail-view">
      
      {/* 1. TOP BREADCRUMB & ACTION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <button
          id="btn-detail-back"
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-stone-100 border border-stone-800 transition-colors text-sm font-medium cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay Lại Bảo Tàng</span>
        </button>

        <div className="flex items-center space-x-3">
          {/* Ask Curator about this Object */}
          <button
            id="btn-detail-ask-curator"
            onClick={() => onOpenCuratorWithContext(object.id)}
            className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-sm font-medium flex items-center space-x-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Hỏi Giám Tuyển Về Hiện Vật Này</span>
          </button>

          {/* Bookmark Button */}
          <button
            id={`btn-detail-save-${object.id}`}
            onClick={() => onToggleSave(object.id)}
            className={`px-4 py-2 rounded-xl border text-sm font-medium flex items-center space-x-2 transition-all cursor-pointer ${
              isSaved
                ? 'bg-amber-500 text-stone-950 border-amber-500 font-semibold'
                : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Đã Lưu Trữ</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span>Lưu Hiện Vật</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. HERO MEDIA & IDENTITY HEADER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: High-Resolution Media Viewer (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-stone-950 border border-stone-800 shadow-2xl group">
            <div className="aspect-[4/3] sm:aspect-[16/11] w-full relative">
              <img
                src={selectedImage}
                alt={object.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getAuthenticFallbackImage(object.title, object.category, object.period);
                }}
                className="w-full h-full object-contain sm:object-cover object-center cursor-zoom-in"
                onClick={() => setIsZoomModalOpen(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Interactive Iconography Hotspot Pins */}
              {object.hotspots && object.hotspots.length > 0 && object.hotspots.map((spot) => {
                const isActive = activeHotspotId === spot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHotspotId(isActive ? null : spot.id);
                    }}
                    style={{ left: `${spot.position.x}%`, top: `${spot.position.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer z-20 ${
                      isActive
                        ? 'bg-amber-400 text-stone-950 ring-4 ring-amber-400/50 scale-125'
                        : 'bg-stone-950/90 text-amber-300 border-2 border-amber-400 hover:scale-110 animate-pulse'
                    }`}
                    title={spot.label}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                );
              })}

              {/* Fullscreen Zoom Trigger */}
              <button
                id="btn-open-zoom-modal"
                onClick={() => setIsZoomModalOpen(true)}
                className="absolute top-4 right-4 p-2.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-200 backdrop-blur-md border border-stone-700 transition-all cursor-pointer"
                title="Xem toàn màn hình độ phân giải cao"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* 3-Tier Transparency Pill */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-medium flex items-center space-x-1.5 backdrop-blur-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Xác Thực Nguồn Bảo Tàng Gốc</span>
                </span>
              </div>

              {/* Media Caption */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs text-stone-300 font-light drop-shadow-md">
                  {object.media.caption || `${object.title} — Lưu trữ tại ${object.provenance.institution}`}
                </p>
                <p className="text-[10px] text-stone-400 font-mono">
                  {object.media.imageAttribution || object.provenance.attribution}
                </p>
              </div>
            </div>
          </div>

          {/* Iconography Hotspot Detail Drawer */}
          {activeHotspot && (
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h4 className="font-serif font-bold text-amber-200 text-sm">
                    {activeHotspot.label}
                  </h4>
                </div>
                <button
                  onClick={() => setActiveHotspotId(null)}
                  className="text-stone-400 hover:text-stone-200 text-xs font-mono"
                >
                  Đóng ✕
                </button>
              </div>

              {activeHotspot.labelSanskrit && (
                <div className="text-xs font-serif italic text-amber-400/80">
                  Phạn ngữ: {activeHotspot.labelSanskrit} {activeHotspot.labelKhmer && `• Khmer: ${activeHotspot.labelKhmer}`}
                </div>
              )}

              <p className="text-xs font-serif text-stone-300 leading-relaxed">
                {activeHotspot.description}
              </p>

              <div className="pt-2 border-t border-amber-500/20 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="font-mono text-amber-400 block font-medium">Ý Nghĩa Thần Học:</span>
                  <span className="text-stone-300">{activeHotspot.theologicalMeaning}</span>
                </div>
                <div>
                  <span className="font-mono text-amber-400 block font-medium">Biểu Tượng:</span>
                  <span className="text-stone-300">{activeHotspot.symbolism}</span>
                </div>
              </div>
            </div>
          )}

          {/* Gallery Thumbnails */}
          {object.media.gallery && object.media.gallery.length > 0 && (
            <div className="flex items-center space-x-3 overflow-x-auto pb-2 no-scrollbar">
              <button
                onClick={() => setSelectedImage(object.media.primaryImage)}
                className={`flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  selectedImage === object.media.primaryImage
                    ? 'border-amber-500 ring-2 ring-amber-500/30'
                    : 'border-stone-800 opacity-60 hover:opacity-100'
                }`}
              >
                <MuseumImage
                  src={object.media.primaryImage}
                  alt="Primary view"
                  title={object.title}
                  category={object.category}
                  period={object.period}
                  className="w-full h-full object-cover"
                />
              </button>
              {object.media.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === img
                      ? 'border-amber-500 ring-2 ring-amber-500/30'
                      : 'border-stone-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <MuseumImage
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    title={object.title}
                    category={object.category}
                    period={object.period}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Audio Guide Player */}
          {object.media.audioUrl && (
            <div 
              className="p-4 rounded-2xl bg-stone-900 border border-amber-500/30 flex items-center justify-between gap-4"
              id="audio-guide-player"
            >
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleToggleAudio}
                  className="w-10 h-10 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center hover:bg-amber-400 transition-colors cursor-pointer shadow-md shadow-amber-950/50"
                  title={isPlayingAudio ? 'Tạm dừng' : 'Nghe thuyết minh học thuật'}
                >
                  {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <div>
                  <div className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider flex items-center space-x-1.5">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Thuyết Minh Học Thuật (Audio Guide)</span>
                  </div>
                  <p className="text-xs text-stone-300 font-serif">
                    {object.title} • Thời lượng: {object.media.audioDuration || '3:45'}
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-stone-400 bg-stone-800 px-2.5 py-1 rounded-md">
                Khmer / English / Vi
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Object Identity Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Titles & Period */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-medium">
                {object.period} ({object.century})
              </span>
              <span className="px-3 py-1 rounded-full bg-stone-800 text-stone-300 border border-stone-700 text-xs font-mono">
                {object.category}
              </span>
              {object.isMasterpiece && (
                <span className="px-3 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-mono font-bold">
                  ★ Kiệt Tác Tiêu Biểu
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-serif text-amber-200/90 font-normal">
              {object.titleKhmer}
            </h2>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100 leading-tight">
              {object.title}
            </h1>
            <p className="text-sm font-serif italic text-stone-400">
              {object.titleEnglish}
            </p>
            {object.alternateTitles && object.alternateTitles.length > 0 && (
              <p className="text-xs text-stone-400 font-mono">
                Tên thay thế: {object.alternateTitles.join(' • ')}
              </p>
            )}
          </div>

          {/* Micro-Timeline Progression Ribbon */}
          <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between overflow-x-auto text-[11px] font-mono no-scrollbar gap-2">
            <div className="flex items-center space-x-1.5 shrink-0 text-stone-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{object.century}</span>
            </div>
            <span className="text-stone-600">→</span>
            <div className="flex items-center space-x-1.5 shrink-0 text-amber-300">
              <Landmark className="w-3.5 h-3.5" />
              <span>Thời kỳ {object.period}</span>
            </div>
            <span className="text-stone-600">→</span>
            <div className="flex items-center space-x-1.5 shrink-0 text-stone-300">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>{object.relations.artisticStyle?.split('(')[0]?.trim() || 'Nghệ thuật Khmer'}</span>
            </div>
            {object.relations.associatedRulers && object.relations.associatedRulers.length > 0 && (
              <>
                <span className="text-stone-600">→</span>
                <div className="flex items-center space-x-1.5 shrink-0 text-amber-200 font-semibold">
                  <span>👑 {object.relations.associatedRulers[0]}</span>
                </div>
              </>
            )}
          </div>

          {/* Museum Label Fact Matrix (Placard) */}
          <div className="rounded-2xl bg-stone-900 border border-stone-800 p-5 space-y-3.5 text-xs shadow-lg">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <h3 className="font-mono text-amber-400 uppercase tracking-wider font-semibold">
                Biển Chú Giải Hiện Vật (Museum Label)
              </h3>
              <span className="text-[10px] font-mono text-stone-400">
                Lưu trữ: {object.provenance.institution.split('(')[0]?.trim()}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-stone-400 block font-mono">Loại Hình:</span>
                <span className="text-stone-200 font-medium">{object.category}</span>
              </div>
              <div>
                <span className="text-stone-400 block font-mono">Niên Đại:</span>
                <span className="text-stone-200 font-medium">{object.dateRange}</span>
              </div>
              <div>
                <span className="text-stone-400 block font-mono">Số Kiểm Kê (Accession):</span>
                <span className="text-amber-300 font-mono font-semibold">
                  {object.provenance.accessionNumber || 'Không có trong hồ sơ gốc'}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block font-mono">Chất Liệu:</span>
                <span className="text-stone-200 font-medium">{object.material || 'Đá Sa thạch / Sa thạch nguyên khối'}</span>
              </div>
              <div>
                <span className="text-stone-400 block font-mono">Kích Thước:</span>
                <span className="text-stone-200 font-medium">{object.dimensions || 'Theo hồ sơ khai quật'}</span>
              </div>
              <div>
                <span className="text-stone-400 block font-mono">Phong Cách Nghệ Thuật:</span>
                <span className="text-stone-200 font-medium">
                  {object.relations.artisticStyle || 'Cổ điển Angkor'}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block font-mono">Tác Giả / Nghệ Nhân:</span>
                <span className="text-stone-200 font-medium">{object.creator || 'Nghệ nhân Hoàng gia Angkor'}</span>
              </div>
              <div>
                <span className="text-stone-400 block font-mono">Văn Hóa:</span>
                <span className="text-stone-200 font-medium">Khmer cổ đại</span>
              </div>
            </div>

            {object.location && (
              <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-stone-400 block font-mono">Vị Trí Khai Quật / Tọa Lạc:</span>
                  <span className="text-stone-200 font-medium flex items-center space-x-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>{object.location.siteName}, {object.location.province}, {object.location.country}</span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Summary Quote */}
          <div className="p-4 rounded-xl bg-amber-500/10 border-l-4 border-amber-500 text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
            "{object.summary}"
          </div>


        </div>
      </div>

      {/* 3. SCHOLARLY DESCRIPTION & HISTORICAL CONTEXT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-6">
        
        {/* Main Content: Description & Cultural Meaning (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Detailed Description */}
          <section className="rounded-3xl bg-stone-900/90 border border-stone-800 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center space-x-2 text-amber-400">
                <FileText className="w-5 h-5" />
                <h3 className="font-serif text-xl font-bold text-stone-100">
                  Mô Tả Hiện Vật Từ Hồ Sơ Lưu Trữ Gốc
                </h3>
              </div>
              <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Tầng 1: Bản Ghi Gốc ({object.provenance.institution.split('(')[0]?.trim()})
              </span>
            </div>
            <p className="text-stone-300 leading-relaxed font-light text-sm sm:text-base">
              {object.description}
            </p>
          </section>

          {/* Historical & Cultural Context */}
          <section className="rounded-3xl bg-stone-900/90 border border-stone-800 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center space-x-2 text-amber-400">
                <Clock className="w-5 h-5" />
                <h3 className="font-serif text-xl font-bold text-stone-100">
                  Bối Cảnh Lịch Sử & Ý Nghĩa Tôn Giáo
                </h3>
              </div>
              <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-500/30">
                Tầng 2: Chuẩn Hóa Tri Thức
              </span>
            </div>
            <div className="space-y-4 text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              <p>{object.historicalContext}</p>
              <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800/80 space-y-2">
                <span className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider block">
                  Giá Trị Văn Hóa & Tín Ngưỡng Linh Thiêng
                </span>
                <p className="text-stone-300 text-xs sm:text-sm">
                  {object.culturalSignificance}
                </p>
              </div>
            </div>
          </section>

          {/* Geographic Coordinates & Location Card */}
          {object.location && (
            <section className="rounded-3xl bg-stone-900/90 border border-stone-800 p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-amber-400">
                  <MapPin className="w-5 h-5" />
                  <h3 className="font-serif text-xl font-bold text-stone-100">
                    Vị Trí Thực Địa & Tọa Độ Địa Lý
                  </h3>
                </div>
                {object.location.unescoStatus && (
                  <span className="px-3 py-1 rounded-full bg-blue-950 text-blue-300 border border-blue-500/40 text-xs font-mono font-medium">
                    {object.location.unescoStatus}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="text-stone-400 block">Khu Di Tích:</span>
                  <span className="text-stone-200 font-semibold">{object.location.siteName}</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="text-stone-400 block">Tọa Độ GPS:</span>
                  <span className="text-amber-400 font-semibold">
                    {object.location.coordinates[0].toFixed(4)}° N, {object.location.coordinates[1].toFixed(4)}° E
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="text-stone-400 block">Vùng Văn Hóa:</span>
                  <span className="text-stone-200 font-semibold">
                    {object.location.historicalRegion || 'Yashodharapura'}
                  </span>
                </div>
              </div>

              {onNavigateTab && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => onNavigateTab('map')}
                    className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-mono flex items-center space-x-2 transition-all cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Định Vị Trên Bản Đồ Di Tích Toàn Cảnh →</span>
                  </button>
                </div>
              )}
            </section>
          )}

          {/* DEDICATED PANEL: ARCHITECTURE & MONUMENT SPECIFICS */}
          {object.type === 'place' && (
            <section className="rounded-3xl bg-stone-900/90 border border-stone-800 p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center space-x-2 text-amber-400">
                  <Landmark className="w-5 h-5" />
                  <h3 className="font-serif text-xl font-bold text-stone-100">
                    Đặc Điểm Kiến Trúc & Quy Hoạch Không Gian Thiêng
                  </h3>
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
                  Di Tích Kiến Trúc Quần Thể
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-2">
                  <span className="font-mono text-amber-400 font-semibold uppercase block">Bố Cục Đền Núi (Temple Mountain):</span>
                  <p className="text-stone-300 leading-relaxed">
                    Mô phỏng ngọn núi thiêng Meru trung tâm vũ trụ luận Ấn Độ giáo với hệ thống tháp trung tâm 5 đỉnh (Quincunx), hành lang bao quanh và hồ nước thiêng bao bọc.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-2">
                  <span className="font-mono text-amber-400 font-semibold uppercase block">Chất Liệu Xây Dựng:</span>
                  <p className="text-stone-300 leading-relaxed">
                    Sa thạch xám/hồng nguyên khối kết hợp lõi đá ong (Laterite) chịu lực và kỹ thuật ghép mộng đá không dùng vữa đặc trưng của nghệ nhân Khmer cổ đại.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* DEDICATED PANEL: EPIGRAPHY & ANCIENT SCRIPT */}
          {(object.type === 'manuscript' || object.category.toLowerCase().includes('văn bia') || object.category.toLowerCase().includes('bia ký') || object.category.toLowerCase().includes('kinh')) && (
            <section className="rounded-3xl bg-stone-900/90 border border-stone-800 p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center space-x-2 text-amber-400">
                  <FileText className="w-5 h-5" />
                  <h3 className="font-serif text-xl font-bold text-stone-100">
                    Khảo Cứu Văn Tự & Văn Bia Cổ Đại
                  </h3>
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-500/30">
                  Hồ Sơ Văn Bia EFEO
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                  <span className="font-mono text-amber-400 font-semibold block">Phân Loại Văn Tự:</span>
                  <p className="text-stone-300">
                    Chữ Khmer Cổ (Old Khmer) và Phạn ngữ (Sanskrit) khắc trên đá sa thạch hoặc ghi chép trên lá buông (Olan) với thể thơ thiêng (Sloka).
                  </p>
                </div>
                {onNavigateTab && (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => onNavigateTab('epigraphy')}
                      className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-mono flex items-center space-x-2 transition-all cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Chuyển Sang Trình Giải Mã Văn Bia Cổ →</span>
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* DEDICATED PANEL: LIVING TRADITIONS & MUSIC */}
          {(object.type === 'art_form' || object.type === 'event_tradition' || object.category.toLowerCase().includes('âm nhạc') || object.category.toLowerCase().includes('biểu diễn') || object.category.toLowerCase().includes('truyền thống')) && (
            <section className="rounded-3xl bg-stone-900/90 border border-stone-800 p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center space-x-2 text-amber-400">
                  <Radio className="w-5 h-5" />
                  <h3 className="font-serif text-xl font-bold text-stone-100">
                    Di Sản Sống & Nghệ Thuật Biểu Diễn Truyền Thống
                  </h3>
                </div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  Di Sản Phi Vật Thể
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <p className="text-stone-300 leading-relaxed">
                  Di sản văn hóa phi vật thể được trao truyền qua nhiều thế hệ nghệ nhân hoàng cung và các nghi lễ cúng dường chư thiên tại các ngôi đền Angkor cổ kính.
                </p>
                {onNavigateTab && (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => onNavigateTab('pinpeat')}
                      className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-mono flex items-center space-x-2 transition-all cursor-pointer"
                    >
                      <Radio className="w-3.5 h-3.5" />
                      <span>Mở Không Gian Hòa Âm Pinpeat Cung Đình →</span>
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

        </div>

        {/* Right Column: Provenance, Licensing & Knowledge Graph (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Provenance & Citation Box (MANDATORY PROVENANCE UI) */}
          <div className="rounded-3xl bg-stone-900 border border-amber-500/40 p-6 space-y-5 shadow-xl">
            <div className="flex items-center space-x-2 text-amber-400 border-b border-stone-800 pb-3">
              <Landmark className="w-5 h-5" />
              <h3 className="font-serif text-lg font-bold text-stone-100">
                Nguồn Gốc Lưu Trữ & Bản Quyền
              </h3>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <span className="text-stone-400 font-mono block">Tổ Chức Sở Hữu / Lưu Trữ:</span>
                <span className="text-stone-100 font-semibold text-sm">
                  {object.provenance.institution}
                </span>
                {object.provenance.institutionKhmer && (
                  <span className="text-amber-200/70 font-serif block text-xs">
                    {object.provenance.institutionKhmer}
                  </span>
                )}
              </div>

              <div>
                <span className="text-stone-400 font-mono block">Giấy Phép Công Bố:</span>
                <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-mono font-semibold mt-1">
                  {object.provenance.license}
                </span>
              </div>

              <div>
                <span className="text-stone-400 font-mono block">Ghi Công (Attribution):</span>
                <p className="text-stone-300 font-light mt-0.5">
                  {object.provenance.attribution}
                </p>
              </div>

              {object.provenance.excavationSite && (
                <div>
                  <span className="text-stone-400 font-mono block">Hồ Sơ Khảo Cổ:</span>
                  <p className="text-stone-300 font-light mt-0.5">
                    {object.provenance.excavationSite} (Năm: {object.provenance.discoveryYear || 'Lịch sử'})
                  </p>
                </div>
              )}

              {/* Direct View Original Source Link */}
              <div className="pt-2">
                <a
                  href={object.provenance.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`link-original-source-${object.id}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-md"
                >
                  <span>Xem Hồ Sơ Gốc Tại Viện Lưu Trữ</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Copy Scholarly Citation & Format Chooser */}
              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-stone-400 uppercase">Chuẩn Trích Dẫn:</span>
                  <div className="flex items-center space-x-1 bg-stone-950 p-1 rounded-lg border border-stone-800">
                    {(['APA', 'Chicago', 'EFEO', 'BibTeX'] as const).map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setCitationFormat(fmt)}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                          citationFormat === fmt
                            ? 'bg-amber-500 text-stone-950 font-bold'
                            : 'text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-850 text-[11px] font-mono text-stone-300 break-all select-all">
                  {getFormattedCitation()}
                </div>

                <button
                  onClick={handleCopyCitation}
                  className="w-full py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                >
                  {copiedCitation ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Đã Sao Chép ({citationFormat})!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao Chép Trích Dẫn ({citationFormat})</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Citations & Bibliography */}
            {object.provenance.citations && object.provenance.citations.length > 0 && (
              <div className="pt-4 border-t border-stone-800 space-y-2">
                <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block">
                  Tài Liệu Tham Khảo Học Thuật:
                </span>
                <ul className="space-y-1.5 text-[11px] text-stone-400 font-light">
                  {object.provenance.citations.map((cit, idx) => (
                    <li key={idx} className="border-l-2 border-amber-500/40 pl-2">
                      {cit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Knowledge Graph Connections Card */}
          <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 space-y-4">
            <div className="flex items-center space-x-2 text-amber-400 border-b border-stone-800 pb-3">
              <Compass className="w-5 h-5" />
              <h3 className="font-serif text-lg font-bold text-stone-100">
                Đồ Thị Tri Thức Liên Kết
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              {object.relations.associatedRulers && (
                <div>
                  <span className="text-stone-400 font-mono block">Vua Chúa / Triều Đại:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {object.relations.associatedRulers.map((r, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-stone-800 text-amber-300 font-medium">
                        👑 {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {object.relations.associatedPlaces && (
                <div>
                  <span className="text-stone-400 font-mono block">Di Tích / Địa Danh:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {object.relations.associatedPlaces.map((p, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-stone-800 text-stone-200">
                        📍 {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {object.relations.associatedConcepts && (
                <div>
                  <span className="text-stone-400 font-mono block">Thần Thoại & Biểu Tượng:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {object.relations.associatedConcepts.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-stone-800 text-stone-300">
                        ⚜️ {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* 4. RELATED OBJECTS SECTION */}
      {relatedObjects.length > 0 && (
        <section className="space-y-6 pt-12 border-t border-stone-800" id="related-objects-section">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-serif font-bold text-stone-100">
              Hiện Vật & Di Tích Cùng Liên Hệ
            </h3>
            <span className="text-xs font-mono text-stone-400">
              Khám Phá Mở Rộng Theo Đồ Thị Tri Thức
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedObjects.map((rel) => (
              <div
                key={rel.id}
                id={`rel-card-${rel.id}`}
                onClick={() => onSelectObject(rel.id)}
                className="group rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-all overflow-hidden flex flex-col cursor-pointer shadow-md hover:shadow-xl"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-950">
                  <MuseumImage
                    src={rel.media.primaryImage}
                    alt={rel.title}
                    title={rel.title}
                    category={rel.category}
                    period={rel.period}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400">
                      {rel.period} • {rel.category}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                      {rel.title}
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-stone-400 line-clamp-1">
                    🏛️ {rel.provenance.institution.split('(')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. FULLSCREEN ZOOM MODAL */}
      {isZoomModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 backdrop-blur-xl animate-in fade-in duration-200"
          id="high-res-zoom-modal"
        >
          <div className="flex items-center justify-between text-stone-200 pb-4 border-b border-stone-800">
            <div>
              <h3 className="font-serif text-lg font-bold text-amber-300">{object.title}</h3>
              <p className="text-xs font-mono text-stone-400">{object.provenance.institution} • {object.provenance.accessionNumber || 'NMC'}</p>
            </div>
            <button
              onClick={() => setIsZoomModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-sm font-mono cursor-pointer"
            >
              Đóng (ESC)
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
            <img
              src={selectedImage}
              alt={object.title}
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = getAuthenticFallbackImage(object.title, object.category, object.period);
              }}
              className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
          </div>

          <div className="text-center text-xs text-stone-400 font-light border-t border-stone-800 pt-3">
            {object.media.caption || object.title} • {object.provenance.attribution}
          </div>
        </div>
      )}

    </div>
  );
};
