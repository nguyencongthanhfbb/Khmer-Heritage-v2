import React, { useState } from 'react';
import { InscriptionStela, EPIGRAPHY_STELAE } from '../data/epigraphyData';
import { 
  ScrollText, 
  BookOpen, 
  Languages, 
  Quote, 
  ShieldCheck, 
  Copy, 
  Check, 
  ArrowRight,
  Volume2,
  VolumeX,
  Landmark,
  Sparkles
} from 'lucide-react';

interface EpigraphyExplorerProps {
  onSelectObject: (id: string) => void;
}

export const EpigraphyExplorer: React.FC<EpigraphyExplorerProps> = ({ onSelectObject }) => {
  const [selectedStelaId, setSelectedStelaId] = useState<string>(EPIGRAPHY_STELAE[0].id);
  const [selectedPassageIndex, setSelectedPassageIndex] = useState<number>(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const activeStela = EPIGRAPHY_STELAE.find((s) => s.id === selectedStelaId) || EPIGRAPHY_STELAE[0];
  const activePassage = activeStela.samplePassages[selectedPassageIndex] || activeStela.samplePassages[0];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleToggleSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'vi-VN';
        utterance.rate = 0.9;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div className="space-y-10 pb-24" id="epigraphy-explorer-view">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono tracking-widest uppercase">
            <ScrollText className="w-4 h-4" />
            <span>Thư Tịch & Văn Bia Khảo Cổ (Epigraphic Decipherer)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100">
            Giải Mã Văn Bia Khắc Đá Cổ Đại
          </h1>
          <p className="text-stone-400 text-sm font-serif max-w-3xl">
            Khảo cứu văn bản gốc tiếng Phạn (Sanskrit) và chữ Khmer Cổ (Old Khmer) trên các văn bia hoàng triều Angkor đối chiếu theo bản dập lưu trữ của Viện Viễn Đông Bác cổ (EFEO).
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
          <ShieldCheck className="w-4 h-4" />
          <span>EFEO Corpus des Inscriptions du Cambodge</span>
        </div>
      </div>

      {/* Stela Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="epigraphy-stela-tabs">
        {EPIGRAPHY_STELAE.map((stela) => {
          const isSelected = stela.id === selectedStelaId;
          return (
            <button
              key={stela.id}
              id={`stela-tab-${stela.id}`}
              onClick={() => {
                setSelectedStelaId(stela.id);
                setSelectedPassageIndex(0);
                if (isSpeaking) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }
              }}
              className={`p-5 rounded-2xl text-left transition-all cursor-pointer border flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-amber-500/15 border-amber-500 text-amber-200 ring-2 ring-amber-500/30 shadow-xl'
                  : 'bg-stone-900 hover:bg-stone-850 border-stone-800 text-stone-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-400 font-bold">
                    {stela.inventoryNumber}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-950 text-stone-400">
                    {stela.period}
                  </span>
                </div>
                <div className="font-serif font-bold text-base text-stone-100 mt-1 line-clamp-1">
                  {stela.title.split('(')[0]}
                </div>
                <div className="text-xs font-serif text-amber-300/80 mt-0.5 line-clamp-1">
                  {stela.titleKhmer}
                </div>
              </div>

              <div className="text-[11px] font-mono text-stone-400 pt-2 border-t border-stone-800/80 flex items-center justify-between">
                <span>{stela.language}</span>
                <span>{stela.dateRange.split('(')[0]}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stela Main Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Stela Metadata & Passage Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Stela Meta Card */}
          <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4 shadow-xl">
            <div className="space-y-1">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                Mã Định Danh: {activeStela.inventoryNumber}
              </span>
              <h2 className="text-xl font-serif font-bold text-stone-100">
                {activeStela.title}
              </h2>
              <p className="text-xs font-serif italic text-stone-400">
                {activeStela.titleEnglish}
              </p>
            </div>

            <p className="text-xs text-stone-300 font-light leading-relaxed">
              {activeStela.summary}
            </p>

            <div className="space-y-2 pt-3 border-t border-stone-800 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-stone-400">Thời gian khắc:</span>
                <span className="text-amber-300">{activeStela.dateRange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Ngôn ngữ & Chữ viết:</span>
                <span className="text-stone-200">{activeStela.script}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Nơi phát hiện:</span>
                <span className="text-stone-200 text-right">{activeStela.discoveredLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Cơ quan lưu giữ:</span>
                <span className="text-stone-200 text-right">{activeStela.currentPreservation}</span>
              </div>
            </div>

            {/* Historical impact box */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1.5">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                Giá Trị Khảo Cổ & Lịch Sử:
              </span>
              <p className="text-xs text-stone-300 font-light leading-relaxed">
                {activeStela.historicalImportance}
              </p>
            </div>
          </div>

          {/* Passage Navigator */}
          <div className="p-5 rounded-3xl bg-stone-900 border border-stone-800 space-y-3">
            <h3 className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
              Các Trích Đoạn Bia Ký Tiêu Biểu ({activeStela.samplePassages.length})
            </h3>
            <div className="space-y-2">
              {activeStela.samplePassages.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedPassageIndex(idx);
                    if (isSpeaking) {
                      window.speechSynthesis.cancel();
                      setIsSpeaking(false);
                    }
                  }}
                  className={`w-full p-3 rounded-xl text-left text-xs font-serif transition-all cursor-pointer border ${
                    selectedPassageIndex === idx
                      ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-md'
                      : 'bg-stone-950 text-stone-300 hover:bg-stone-800 border-stone-850'
                  }`}
                >
                  <div className="line-clamp-1">{p.sectionTitle}</div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Comparative Inscription Deciphering Workspace (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* Action Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                  Khảo Cứu Văn Bản Đối Chiếu
                </span>
                <h3 className="text-lg font-serif font-bold text-stone-100">
                  {activePassage.sectionTitle}
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                {/* Audio voice narration */}
                <button
                  onClick={() => handleToggleSpeech(activePassage.vietnameseTranslation)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer border ${
                    isSpeaking 
                      ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold animate-pulse'
                      : 'bg-stone-950 hover:bg-stone-800 text-stone-300 border-stone-800'
                  }`}
                  title="Nghe giọng đọc thuyết minh bản dịch"
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                  <span>{isSpeaking ? 'Dừng Đọc' : 'Nghe Thuyết Minh'}</span>
                </button>

                {/* Copy Translation Button */}
                <button
                  onClick={() => handleCopy(
                    `[${activeStela.inventoryNumber}] ${activeStela.title}\n\nNguyên tác Phạn/Khmer: ${activePassage.originalScript}\nPhiên âm Latin: ${activePassage.romanization}\nBản dịch tiếng Việt: ${activePassage.vietnameseTranslation}\nNguồn: ${activeStela.citation}`,
                    'full'
                  )}
                  className="px-3 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  {copiedText === 'full' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Đã Sao Chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-stone-400" />
                      <span>Sao Chép Tư Liệu</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 1. Original Epigraphic Script (Khmer / Sanskrit) */}
            <div className="p-6 rounded-2xl bg-stone-950 border border-amber-500/20 space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-mono text-amber-400">
                <span className="uppercase tracking-widest">VĂN TỰ KHẮC ĐÁ NGUYÊN BẢN ({activeStela.script})</span>
                <Languages className="w-4 h-4" />
              </div>
              <div className="text-xl sm:text-2xl font-serif text-amber-200 tracking-wide leading-loose pt-2">
                {activePassage.originalScript}
              </div>
            </div>

            {/* 2. EFEO Latin Romanization */}
            <div className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2">
              <span className="text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                PHIÊN ÂM CHỮ LA-TINH HỌC THUẬT (EFEO ROMANIZATION)
              </span>
              <p className="text-sm font-serif italic text-stone-300 font-light leading-relaxed">
                "{activePassage.romanization}"
              </p>
            </div>

            {/* 3. Vietnamese Translation */}
            <div className="p-6 rounded-2xl bg-stone-950 border-l-4 border-amber-500 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
                <Quote className="w-4 h-4" />
                <span>Bản Dịch Tiếng Việt (Khảo cứu đối chiếu):</span>
              </div>
              <p className="text-base sm:text-lg font-serif text-stone-100 font-normal leading-relaxed">
                {activePassage.vietnameseTranslation}
              </p>
            </div>

            {/* 4. English Translation */}
            <div className="p-5 rounded-2xl bg-stone-950/60 border border-stone-850 space-y-1.5 text-xs">
              <span className="font-mono text-stone-400 uppercase tracking-wider">
                English Translation (Scholarly Corpus):
              </span>
              <p className="font-serif italic text-stone-400 font-light leading-relaxed">
                "{activePassage.englishTranslation}"
              </p>
            </div>

            {/* 5. Scholarly Commentary */}
            <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4" />
                <span>Bình Luận Giám Tuyển & Dấu Ấn Khảo Cổ:</span>
              </span>
              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                {activePassage.scholarlyCommentary}
              </p>
              <div className="pt-2 text-[11px] font-mono text-stone-400">
                Trích dẫn học thuật: {activeStela.citation}
              </div>
            </div>

            {/* Related Objects in Museum */}
            {activeStela.associatedObjectIds && activeStela.associatedObjectIds.length > 0 && (
              <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                <span className="text-xs font-mono text-stone-400">
                  Hiện vật & Di tích liên quan trực tiếp:
                </span>
                <div className="flex items-center space-x-2">
                  {activeStela.associatedObjectIds.map((objId) => (
                    <button
                      key={objId}
                      onClick={() => onSelectObject(objId)}
                      className="px-3 py-1.5 rounded-lg bg-stone-950 hover:bg-stone-800 border border-stone-800 text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center space-x-1 transition-colors cursor-pointer"
                    >
                      <Landmark className="w-3.5 h-3.5" />
                      <span>Xem Hồ Sơ Hiện Vật</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
