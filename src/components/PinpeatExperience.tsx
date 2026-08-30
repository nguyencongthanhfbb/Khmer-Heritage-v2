import React, { useState, useRef, useEffect } from 'react';
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
  Layers,
  Radio,
  Sliders,
  CheckCircle2
} from 'lucide-react';

interface RoyalSong {
  id: string;
  name: string;
  nameKhmer: string;
  description: string;
  notes: number[]; // Index in scaleMultipliers (0-6)
  durations: number[]; // in seconds
  tempo: number; // BPM
}

const ROYAL_SONGS: RoyalSong[] = [
  {
    id: 'sathukar',
    name: 'Sathukar (Điệu Khởi Lễ Thiêng)',
    nameKhmer: 'បទសាធុការ',
    description: 'Điệu nhạc linh thiêng nhất của nghi lễ Hoàng cung Angkor mở đầu mọi buổi cúng dường chư thiên.',
    notes: [0, 2, 4, 4, 3, 2, 1, 0, 2, 4, 5, 6, 5, 4, 2, 0],
    durations: [0.4, 0.4, 0.6, 0.4, 0.4, 0.4, 0.4, 0.8, 0.4, 0.4, 0.6, 0.4, 0.4, 0.6, 0.4, 1.0],
    tempo: 120
  },
  {
    id: 'robam-apsara',
    name: 'Robam Apsara (Vũ Khúc Tiên Nữ)',
    nameKhmer: 'របាំទេពអប្សរា',
    description: 'Âm điệu thanh thoát, uyển chuyển đệm cho các vũ nữ Apsara dâng hoa sen chúc phúc.',
    notes: [2, 4, 5, 4, 2, 0, 1, 2, 4, 5, 4, 2, 1, 2, 0],
    durations: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1.0],
    tempo: 100
  },
  {
    id: 'tep-monorom',
    name: 'Tep Monorom (Cung Đình Hoan Ca)',
    nameKhmer: 'ទេពមនោរម្យ',
    description: 'Giai điệu rộn ràng, uy nghiêm thể hiện niềm hân hoan thái bình thịnh trị thời Angkor.',
    notes: [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 0, 2, 4, 0],
    durations: [0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.5, 0.35, 0.35, 0.35, 0.35, 0.35, 0.6, 0.4, 0.4, 0.8],
    tempo: 135
  }
];

export const PinpeatExperience: React.FC = () => {
  const [selectedInstId, setSelectedInstId] = useState<string>(PINPEAT_INSTRUMENTS[0].id);
  const [isPlayingTune, setIsPlayingTune] = useState<boolean>(false);
  const [activeNote, setActiveNote] = useState<number | null>(null);
  const [activeSongId, setActiveSongId] = useState<string | null>(null);
  const [soundVolume, setSoundVolume] = useState<number>(0.8);
  const [visualRipple, setVisualRipple] = useState<number>(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const songTimerRef = useRef<number | null>(null);

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

  // Advanced Acoustic & Harmonic Synthesizer Engine
  const playAcousticInstrument = (freq: number, instrumentId: string, customDuration: number = 0.8) => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      setVisualRipple((prev) => prev + 1);

      // Master Gain for volume
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(soundVolume, now);
      masterGain.connect(ctx.destination);

      if (instrumentId.includes('sampho')) {
        // SACRED DRUM: Pitch drop envelope + sub-bass body + skin attack
        const osc = ctx.createOscillator();
        const drumGain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * 1.8, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + 0.12);

        drumGain.gain.setValueAtTime(0.9, now);
        drumGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

        osc.connect(drumGain);
        drumGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.7);

        // Click / stick strike
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.type = 'triangle';
        clickOsc.frequency.setValueAtTime(450, now);
        clickGain.gain.setValueAtTime(0.4, now);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        clickOsc.connect(clickGain);
        clickGain.connect(masterGain);
        clickOsc.start(now);
        clickOsc.stop(now + 0.04);

      } else if (instrumentId.includes('kong-vong')) {
        // GONG CIRCLE: Multi-harmonic metallic chime + resonant ring
        const partials = [1, 2.02, 3.01, 4.2];
        const partialGains = [0.6, 0.3, 0.15, 0.08];

        partials.forEach((part, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = idx === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq * part, now);

          gain.gain.setValueAtTime(partialGains[idx], now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + customDuration * 1.5);

          osc.connect(gain);
          gain.connect(masterGain);

          osc.start(now);
          osc.stop(now + customDuration * 1.6);
        });

      } else if (instrumentId.includes('roneat')) {
        // BAMBOO XYLOPHONE: Fundamental + wood harmonic + mallet strike
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(freq, now);
        gain1.gain.setValueAtTime(0.7, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + customDuration);
        osc1.connect(gain1);
        gain1.connect(masterGain);
        osc1.start(now);
        osc1.stop(now + customDuration);

        // Overtone
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(freq * 2.76, now);
        gain2.gain.setValueAtTime(0.25, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + customDuration * 0.4);
        osc2.connect(gain2);
        gain2.connect(masterGain);
        osc2.start(now);
        osc2.stop(now + customDuration * 0.45);

      } else if (instrumentId.includes('sralai')) {
        // REED OBOE: Sawtooth + resonant low-pass filter + vibrato
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(freq * 3.5, now);
        filter.Q.setValueAtTime(3, now);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.45, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + customDuration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + customDuration);

      } else {
        // Standard idiophone fallback
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + customDuration);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + customDuration);
      }
    } catch {
      // Audio context catch
    }
  };

  // 7-tone Cambodian royal heptatonic scale notes
  const scaleMultipliers = [1, 1.122, 1.26, 1.335, 1.498, 1.682, 1.888];
  const noteNamesKhmer = ['ចាត់ (Ka)', 'ខ (Kha)', 'គ (Ko)', 'ឃ (Kho)', 'ង (Ngo)', 'ច (Ca)', 'ឆ (Cha)'];

  const handleTestInstrument = (inst: PinpeatInstrument) => {
    playAcousticInstrument(inst.baseFrequencyHz, inst.id, 1.0);
  };

  const handlePlaySingleNote = (stepIdx: number) => {
    setActiveNote(stepIdx);
    const freq = activeInstrument.baseFrequencyHz * scaleMultipliers[stepIdx];
    playAcousticInstrument(freq, activeInstrument.id, 0.7);
    setTimeout(() => setActiveNote(null), 300);
  };

  const handleStopAnySong = () => {
    if (songTimerRef.current) {
      clearTimeout(songTimerRef.current);
      songTimerRef.current = null;
    }
    setIsPlayingTune(false);
    setActiveNote(null);
    setActiveSongId(null);
  };

  const handlePlaySong = (song: RoyalSong) => {
    if (isPlayingTune && activeSongId === song.id) {
      handleStopAnySong();
      return;
    }

    handleStopAnySong();
    setIsPlayingTune(true);
    setActiveSongId(song.id);

    let noteIdx = 0;

    const playNextNote = () => {
      if (noteIdx >= song.notes.length) {
        setIsPlayingTune(false);
        setActiveNote(null);
        setActiveSongId(null);
        return;
      }

      const currentScaleStep = song.notes[noteIdx];
      const duration = song.durations[noteIdx] || 0.4;
      const freq = activeInstrument.baseFrequencyHz * scaleMultipliers[currentScaleStep];

      setActiveNote(currentScaleStep);
      playAcousticInstrument(freq, activeInstrument.id, duration * 1.2);

      noteIdx++;
      songTimerRef.current = window.setTimeout(playNextNote, duration * 1000);
    };

    playNextNote();
  };

  useEffect(() => {
    return () => {
      if (songTimerRef.current) clearTimeout(songTimerRef.current);
    };
  }, []);

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
            Tương tác trực tiếp với 5 nhạc cụ nghi lễ linh thiêng cấu thành dàn nhạc Pinpeat – được tái tạo bằng bộ tổng hợp âm học vật lý (Physical Modeling Web Audio Synthesizer).
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-500/30 px-3.5 py-2 rounded-2xl">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Âm Học Vật Lý Thời Gian Thực</span>
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
                  ? 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-500/30 shadow-2xl scale-[1.02]'
                  : 'bg-stone-900/80 hover:bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
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
                <Volume2 className={`w-4 h-4 ${isSelected ? 'text-amber-400 animate-bounce' : 'text-stone-500'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 space-y-8 shadow-2xl">
        
        {/* Top Control Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
              Nhạc Cụ Đang Tương Tác:
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
              {activeInstrument.name} ({activeInstrument.nameEnglish})
            </h2>
            <div className="text-sm font-serif italic text-amber-400/90 pt-0.5">
              Chữ Khmer: {activeInstrument.nameKhmer} • Tần số chuẩn: {activeInstrument.baseFrequencyHz} Hz • Âm sắc: {activeInstrument.soundType}
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            {/* Play Single Tone */}
            <button
              onClick={() => handleTestInstrument(activeInstrument)}
              className="px-4 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-200 border border-stone-700 text-xs font-mono flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>Gõ Thử Âm Mẫu</span>
            </button>
          </div>
        </div>

        {/* 7-Note Interactive Scale Keys */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-amber-400 flex items-center space-x-1.5 font-semibold">
              <Disc className="w-4 h-4 text-amber-400" />
              <span>BÀN PHÍM TƯƠNG TÁC THANG 7 CUNG ĐỀU (Click trực tiếp vào từng thanh phím):</span>
            </span>
            <span className="text-xs font-mono text-stone-400">
              Phím 1 → 7 (Heptatonic Tuning)
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 pt-1">
            {scaleMultipliers.map((mult, idx) => {
              const noteFreq = Math.round(activeInstrument.baseFrequencyHz * mult);
              const isActive = activeNote === idx;
              return (
                <button
                  key={idx}
                  id={`pinpeat-key-${idx}`}
                  onClick={() => handlePlaySingleNote(idx)}
                  className={`p-4 sm:p-5 rounded-2xl text-center transition-all border cursor-pointer flex flex-col items-center justify-between space-y-3 group ${
                    isActive
                      ? 'bg-amber-400 text-stone-950 font-bold border-amber-300 scale-105 shadow-xl ring-4 ring-amber-400/50'
                      : 'bg-stone-950 hover:bg-stone-850 text-stone-200 border-stone-800 hover:border-amber-500/60 hover:scale-[1.02]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-xs sm:text-sm font-bold font-mono block">Cung {idx + 1}</span>
                    <span className="text-[10px] font-serif opacity-80 block">{noteNamesKhmer[idx]}</span>
                  </div>

                  <div className="w-3 h-14 rounded-full bg-stone-800 flex items-end overflow-hidden">
                    <div
                      className="w-full bg-gradient-to-t from-amber-600 to-amber-300 transition-all duration-150"
                      style={{ height: isActive ? '100%' : `${20 + idx * 11}%` }}
                    />
                  </div>

                  <span className="text-[10px] sm:text-xs font-mono text-amber-400 font-semibold">{noteFreq} Hz</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Royal Court Songbook Section */}
        <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-850 pb-3">
            <div className="flex items-center space-x-2">
              <Radio className="w-4 h-4 text-amber-400" />
              <h3 className="font-serif font-bold text-stone-100 text-base">
                Tuyển Tập Khúc Nhạc Lễ Hoàng Cung (Royal Court Songbook)
              </h3>
            </div>
            <span className="text-xs font-mono text-stone-400">
              Nhấn để nghe dàn nhạc tự động diễn tấu
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ROYAL_SONGS.map((song) => {
              const isPlayingThisSong = isPlayingTune && activeSongId === song.id;
              return (
                <div
                  key={song.id}
                  id={`song-card-${song.id}`}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                    isPlayingThisSong
                      ? 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-500/40'
                      : 'bg-stone-900/70 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-[11px] font-mono text-amber-400 font-semibold">
                      {song.nameKhmer}
                    </div>
                    <h4 className="font-serif font-bold text-sm text-stone-100">
                      {song.name}
                    </h4>
                    <p className="text-xs font-serif text-stone-400 line-clamp-2">
                      {song.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handlePlaySong(song)}
                    className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer border ${
                      isPlayingThisSong
                        ? 'bg-rose-500 text-stone-950 border-rose-400 animate-pulse'
                        : 'bg-amber-500 hover:bg-amber-400 text-stone-950 border-amber-400 shadow-md shadow-amber-950/40'
                    }`}
                  >
                    {isPlayingThisSong ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlayingThisSong ? 'Dừng Tấu' : 'Tự Động Diễn Tấu'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Deep Scholarly Descriptions (2 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-stone-800">
          
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
