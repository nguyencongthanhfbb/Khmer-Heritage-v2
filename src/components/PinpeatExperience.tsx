import React, { useState, useRef } from 'react';
import { PINPEAT_INSTRUMENTS } from '../data/pinpeatData';
import { PinpeatInstrument } from '../types/museum';
import { 
  Music, 
  Volume2, 
  VolumeX, 
  Play, 
  Square, 
  Sparkles, 
  Disc, 
  Landmark, 
  Flame, 
  Info,
  Layers
} from 'lucide-react';

export const PinpeatExperience: React.FC = () => {
  const [selectedInstId, setSelectedInstId] = useState<string>(PINPEAT_INSTRUMENTS[0].id);
  const [isPlayingTune, setIsPlayingTune] = useState<boolean>(false);
  const [activeNote, setActiveNote] = useState<number | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  const activeInstrument = PINPEAT_INSTRUMENTS.find((i) => i.id === selectedInstId) || PINPEAT_INSTRUMENTS[0];

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtxClass();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playTone = (freq: number, type: OscillatorType = 'sine', duration: number = 0.8) => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Acoustic envelope (Attack - Decay)
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context fallback
    }
  };

  const handleTestInstrument = (inst: PinpeatInstrument) => {
    playTone(inst.baseFrequencyHz, inst.soundType, 1.2);
  };

  // 7-tone Cambodian royal heptatonic scale notes
  const scaleMultipliers = [1, 1.122, 1.26, 1.335, 1.498, 1.682, 1.888];

  const handlePlayHeptatonicScale = () => {
    if (isPlayingTune) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsPlayingTune(false);
      setActiveNote(null);
      return;
    }

    setIsPlayingTune(true);
    let step = 0;

    const playNext = () => {
      if (step >= scaleMultipliers.length) {
        setIsPlayingTune(false);
        setActiveNote(null);
        return;
      }

      setActiveNote(step);
      const freq = activeInstrument.baseFrequencyHz * scaleMultipliers[step];
      playTone(freq, activeInstrument.soundType, 0.6);
      step++;
      timerRef.current = window.setTimeout(playNext, 450);
    };

    playNext();
  };

  return (
    <div className="space-y-10 pb-24" id="pinpeat-soundscape-view">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono tracking-widest uppercase">
            <Music className="w-4 h-4" />
            <span>Âm Nhạc Cung Đình & Nghi Lễ Hoàng Gia (Royal Pinpeat Orchestra)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100">
            Dàn Nhạc Lễ Pinpeat & Thanh Âm Angkor
          </h1>
          <p className="text-stone-400 text-sm font-serif max-w-3xl">
            Khám phá 5 nhạc cụ nghi lễ linh thiêng cấu thành dàn nhạc Pinpeat – linh hồn của nghệ thuật múa Cung đình Khmer (Robam Preah Reach Trop), được bảo tồn liên tục từ thời các vị vua thần Angkor.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-500/30 px-3 py-1.5 rounded-xl">
          <Sparkles className="w-4 h-4" />
          <span>Thang âm 7 cung đều cổ truyền (Heptatonic)</span>
        </div>
      </div>

      {/* Instrument Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" id="pinpeat-instrument-list">
        {PINPEAT_INSTRUMENTS.map((inst) => {
          const isSelected = inst.id === selectedInstId;
          return (
            <button
              key={inst.id}
              id={`inst-btn-${inst.id}`}
              onClick={() => {
                setSelectedInstId(inst.id);
                handleTestInstrument(inst);
              }}
              className={`p-4 rounded-3xl text-left transition-all border flex flex-col justify-between cursor-pointer space-y-3 relative overflow-hidden group ${
                isSelected
                  ? 'bg-stone-900 border-amber-500 ring-2 ring-amber-500/30 shadow-2xl'
                  : 'bg-stone-900/60 hover:bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                  {inst.category.split('(')[0]}
                </span>
                <h2 className="font-serif font-bold text-sm text-stone-100 group-hover:text-amber-300 transition-colors">
                  {inst.name}
                </h2>
                <div className="text-xs font-serif italic text-amber-400/80">
                  {inst.nameKhmer}
                </div>
              </div>

              <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] font-mono">
                <span className="text-stone-400">{inst.tuningPitch.split(',')[0]}</span>
                <Volume2 className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Soundboard & Instrument Detail Stage */}
      <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 space-y-8 shadow-2xl">
        
        {/* Top Control Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
              Trải Nghiệm Âm Học Khảo Cổ:
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
              {activeInstrument.name} ({activeInstrument.nameEnglish})
            </h2>
            <div className="text-sm font-serif italic text-amber-400/90 pt-0.5">
              Chữ Khmer: {activeInstrument.nameKhmer} • Tần số cơ bản: {activeInstrument.baseFrequencyHz} Hz
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            {/* Play Single Tone */}
            <button
              onClick={() => handleTestInstrument(activeInstrument)}
              className="px-4 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-200 border border-stone-800 text-xs font-mono flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>Gõ Thử 1 Nốt</span>
            </button>

            {/* Play 7-Tone Sequence */}
            <button
              onClick={handlePlayHeptatonicScale}
              className={`px-5 py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 transition-all cursor-pointer border ${
                isPlayingTune
                  ? 'bg-rose-500 text-stone-950 border-rose-400 animate-pulse'
                  : 'bg-amber-500 hover:bg-amber-400 text-stone-950 border-amber-400 shadow-md shadow-amber-950/50'
              }`}
            >
              {isPlayingTune ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlayingTune ? 'Dừng Diễn Tấu' : 'Diễn Tấu 7 Cung Bậc'}</span>
            </button>
          </div>
        </div>

        {/* 7-Note Interactive Scale Keys */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-stone-400 flex items-center space-x-1.5">
            <Disc className="w-3.5 h-3.5 text-amber-400" />
            <span>Thang 7 phím âm truyền thống (Nhấn trực tiếp vào từng thanh phím để phát âm thanh):</span>
          </span>

          <div className="grid grid-cols-7 gap-2 pt-1">
            {scaleMultipliers.map((mult, idx) => {
              const noteFreq = Math.round(activeInstrument.baseFrequencyHz * mult);
              const isActive = activeNote === idx;
              return (
                <button
                  key={idx}
                  onClick={() => playTone(noteFreq, activeInstrument.soundType, 0.7)}
                  className={`p-4 rounded-2xl text-center transition-all border cursor-pointer flex flex-col items-center justify-between space-y-2 ${
                    isActive
                      ? 'bg-amber-400 text-stone-950 font-bold border-amber-300 scale-105 shadow-xl ring-2 ring-amber-400/50'
                      : 'bg-stone-950 hover:bg-stone-850 text-stone-300 border-stone-800 hover:border-amber-500/50'
                  }`}
                >
                  <span className="text-xs font-mono">Bậc {idx + 1}</span>
                  <div className="w-2 h-10 rounded-full bg-stone-800 flex items-end overflow-hidden">
                    <div
                      className="w-full bg-amber-400 transition-all duration-150"
                      style={{ height: isActive ? '100%' : `${15 + idx * 12}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-mono text-stone-400">{noteFreq}Hz</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Deep Scholarly Descriptions (2 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-800">
          
          {/* Material & Construction */}
          <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
            <span className="font-mono text-xs text-amber-400 uppercase tracking-wider font-semibold flex items-center space-x-2">
              <Layers className="w-4 h-4" />
              <span>Chất Liệu & Cấu Tạo Cổ Truyền:</span>
            </span>
            <p className="text-sm font-serif text-stone-300 leading-relaxed">
              {activeInstrument.material}
            </p>
            <div className="pt-2 text-xs font-serif text-stone-400">
              {activeInstrument.description}
            </div>
          </div>

          {/* Ritual Role & Archaeology */}
          <div className="p-6 rounded-2xl bg-stone-950 border border-amber-500/20 space-y-3">
            <span className="font-mono text-xs text-amber-300 uppercase tracking-wider font-semibold flex items-center space-x-2">
              <Flame className="w-4 h-4" />
              <span>Vai Trò Nghi Lễ & Vị Trí Trong Vũ Trụ Luận:</span>
            </span>
            <p className="text-sm font-serif text-stone-200 leading-relaxed font-medium">
              "{activeInstrument.ritualRole}"
            </p>
            <div className="pt-2 text-xs font-mono text-stone-400 flex items-center space-x-1.5 border-t border-stone-850">
              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Khảo cổ học: {activeInstrument.scholarlyImportance}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
