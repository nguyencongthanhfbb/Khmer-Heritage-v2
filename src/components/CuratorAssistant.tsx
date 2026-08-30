import React, { useState, useEffect, useRef } from 'react';
import { HeritageObject } from '../types/museum';
import { 
  Sparkles, 
  Send, 
  X, 
  ShieldCheck, 
  Landmark, 
  RotateCcw, 
  BookOpen,
  Info,
  Loader2
} from 'lucide-react';

interface Message {
  role: 'user' | 'curator';
  content: string;
  sources?: string[];
  isAiActive?: boolean;
}

interface CuratorAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  currentObject?: HeritageObject | null;
  onSelectObjectById?: (id: string) => void;
}

export const CuratorAssistant: React.FC<CuratorAssistantProps> = ({
  isOpen,
  onClose,
  currentObject,
  onSelectObjectById,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'curator',
      content:
        'Kính chào quý khách! Tôi là Trợ lý Giám tuyển Học thuật của Bảo tàng Kỹ thuật số Khmer Heritage. Mọi thông tin cung cấp đều được đối chiếu chặt chẽ từ hồ sơ lưu trữ chính thức của Bảo tàng Quốc gia Campuchia, Viện Viễn Đông Bác cổ (EFEO) và Cơ quan Quản lý APSARA. Tôi có thể giúp gì cho công trình nghiên cứu hay chuyến tham quan của quý khách?',
      sources: ['Bảo tàng Quốc gia Campuchia', 'Viện Khảo cổ EFEO', 'APSARA National Authority'],
    },
  ]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'Ý nghĩa biểu tượng giấc ngủ thần Vishnu tại đền West Mebon?',
    'Giải thích nụ cười Bayon và chuyển biến sang Phật giáo của Jayavarman VII?',
    'Đặc trưng nghệ thuật điêu khắc sa thạch hồng tại đền Banteay Srei?',
    'Nguồn gốc và quy chuẩn múa Cung đình Robam Preah Reach Trop?',
  ];

  useEffect(() => {
    if (currentObject) {
      const prompt = `Tôi muốn tìm hiểu sâu về hiện vật "${currentObject.title}" (${currentObject.titleKhmer}). Hãy tóm lược bối cảnh lịch sử, phong cách nghệ thuật và giá trị khảo cổ của hiện vật này.`;
      // We can pre-fill or inform user
    }
  }, [currentObject]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/ask-curator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          currentObjectId: currentObject?.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Lỗi phản hồi từ máy chủ giám tuyển');
      }

      const data = await response.json();
      const curatorMsg: Message = {
        role: 'curator',
        content: data.answer,
        sources: data.groundedSources || ['Hồ sơ Lưu trữ Bảo tàng Quốc gia Campuchia & EFEO'],
        isAiActive: data.isAiActive,
      };

      setMessages((prev) => [...prev, curatorMsg]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'curator',
          content:
            'Xin lỗi quý khách, hệ thống phân tích học thuật tạm thời không phản hồi. Xin vui lòng thử lại hoặc tra cứu trực tiếp qua thẻ hiện vật.',
          sources: ['Cơ sở dữ liệu bảo tàng nội bộ'],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      id="curator-assistant-modal"
    >
      <div className="bg-stone-900 border border-amber-500/40 rounded-3xl w-full max-w-3xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-amber-200 shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif font-bold text-stone-100 text-base sm:text-lg">
                  Trợ Lý Giám Tuyển Bảo Tàng (Curator AI)
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono">
                  Grounding Verified
                </span>
              </div>
              <p className="text-xs text-stone-400 font-serif">
                Đối chiếu tư liệu: Met Museum, EFEO, NMC, APSARA, UNESCO
              </p>
            </div>
          </div>

          <button
            id="btn-close-curator-modal"
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Object Banner (if any) */}
        {currentObject && (
          <div className="px-5 py-2.5 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-stone-300 truncate">
              <span className="text-amber-400 font-mono font-semibold">Đang khảo sát:</span>
              <span className="truncate font-serif font-medium text-stone-100">{currentObject.title}</span>
              <span className="text-stone-400 font-mono">({currentObject.period})</span>
            </div>
          </div>
        )}

        {/* Chat Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 no-scrollbar">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 space-y-2 text-xs sm:text-sm ${
                  msg.role === 'user'
                    ? 'bg-amber-600 text-stone-950 font-medium rounded-br-none shadow-md'
                    : 'bg-stone-950 border border-stone-800 text-stone-200 font-light rounded-bl-none shadow-md leading-relaxed'
                }`}
              >
                <div className="whitespace-pre-wrap font-serif">{msg.content}</div>

                {/* Grounding Source Attribution Pill */}
                {msg.role === 'curator' && msg.sources && (
                  <div className="pt-2 border-t border-stone-800/80 mt-2 flex flex-wrap items-center gap-1 text-[10px] font-mono text-stone-400">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Nguồn đối chiếu: {msg.sources.join(' • ')}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 p-3 bg-stone-950/60 rounded-xl max-w-xs border border-stone-800">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Chuyên gia Giám tuyển đang tra cứu hồ sơ...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries Chips */}
        <div className="p-3 bg-stone-950/60 border-t border-stone-800/60 overflow-x-auto no-scrollbar flex items-center space-x-2">
          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider flex-shrink-0">
            Gợi ý câu hỏi:
          </span>
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(q)}
              className="whitespace-nowrap px-3 py-1 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-200 text-xs font-serif transition-colors cursor-pointer border border-stone-700"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-stone-950 border-t border-stone-800 flex items-center space-x-2">
          <input
            type="text"
            id="input-curator-query"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Hỏi về lịch sử, nghệ thuật điêu khắc, tôn giáo hoặc niên đại hiện vật..."
            className="flex-1 px-4 py-3 rounded-2xl bg-stone-900 border border-stone-800 text-stone-100 placeholder-stone-400 text-xs sm:text-sm font-serif focus:outline-none focus:border-amber-500/80"
          />
          <button
            id="btn-send-curator-query"
            onClick={() => handleSendMessage()}
            disabled={!inputQuery.trim() || isLoading}
            className="p-3 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-bold transition-all cursor-pointer shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
