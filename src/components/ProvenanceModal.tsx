import React from 'react';
import { X, ShieldCheck, Landmark, BookOpen, ExternalLink, Scale, CheckCircle2 } from 'lucide-react';

interface ProvenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProvenanceModal: React.FC<ProvenanceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const institutions = [
    {
      name: 'Bảo Tàng Quốc Gia Campuchia (National Museum of Cambodia)',
      khmer: 'សារមន្ទីរជាតិកម្ពុជា',
      role: 'Kho tàng lưu giữ hiện vật điêu khắc đá, đồng và khảo cổ học Khmer lớn nhất thế giới tại Phnom Penh.',
      url: 'https://www.cambodiamuseum.info/',
      city: 'Phnom Penh, Campuchia',
    },
    {
      name: 'Viện Khảo Cổ Viễn Đông Bác Cổ (EFEO)',
      khmer: 'សាលាបារាំងចុងបូព៌ា (EFEO)',
      role: 'Viện nghiên cứu học thuật tiên phong hơn một thế kỷ trong việc khai quật, bảo tồn và dịch thuật văn bia Angkor.',
      url: 'https://www.efeo.fr/',
      city: 'Paris & Siem Reap',
    },
    {
      name: 'Cơ Quan Quản Lý Di Tích APSARA (APSARA National Authority)',
      khmer: 'អាជ្ញាធរជាតិអប្សរា',
      role: 'Cơ quan quốc gia phụ trách bảo vệ và quản lý toàn diện Quần thể Di tích Lịch sử Angkor.',
      url: 'https://apsaraauthority.gov.kh/',
      city: 'Siem Reap, Campuchia',
    },
    {
      name: 'Tổ Chức Giáo Dục, Khoa Học & Văn Hóa Liên Hợp Quốc (UNESCO)',
      khmer: 'យូណេស្កូ (UNESCO)',
      role: 'Công nhận và bảo trợ các Di sản Thế giới (Angkor, Preah Vihear, Sambor Prei Kuk, Koh Ker) và Di sản Phi vật thể.',
      url: 'https://whc.unesco.org/',
      city: 'Paris, Pháp',
    },
    {
      name: 'The Metropolitan Museum of Art (The Met Open Access)',
      khmer: 'សារមន្ទីរ The Met (New York)',
      role: 'Cung cấp tư liệu hình ảnh và hồ sơ mở đối với các hiện vật nghệ thuật cổ đại Đông Nam Á.',
      url: 'https://www.metmuseum.org/',
      city: 'New York, USA',
    },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      id="provenance-registry-modal"
    >
      <div className="bg-stone-900 border border-amber-500/40 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-100 text-lg">
                Cổng Nguồn Lưu Trữ & Quy Chuẩn Cấp Phép Bản Quyền
              </h3>
              <p className="text-xs font-serif text-stone-400">
                Institutional Provenance Registry & License Gate
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 no-scrollbar text-xs sm:text-sm">
          
          {/* Section 1: Ethical Pledge */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border-l-4 border-amber-500 space-y-2">
            <h4 className="font-serif font-bold text-stone-100 text-base">
              Cam Kết Đạo Đức Bảo Tàng & Chống Bịa Đặt Dữ Liệu
            </h4>
            <p className="text-stone-300 leading-relaxed font-light">
              Dự án <strong>Khmer Heritage</strong> tuân thủ nguyên tắc tôn trọng tuyệt đối tính xác thực của lịch sử văn hóa Campuchia. Mọi hiện vật, niên đại, tác giả và hình ảnh đều được đối chiếu từ các nguồn bảo tàng học thuật có thẩm quyền. Hệ thống nghiêm cấm việc sử dụng trí tuệ nhân tạo để tự bịa đặt tiểu sử hay thông số khảo cổ.
            </p>
          </div>

          {/* Section 2: Participating Institutions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-amber-400 font-mono font-semibold uppercase tracking-wider text-xs border-b border-stone-800 pb-2">
              <Landmark className="w-4 h-4" />
              <span>Danh Mục Các Cơ Quan & Viện Lưu Trữ Đối Chiếu</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {institutions.map((inst, i) => (
                <div key={i} className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 flex flex-col justify-between">
                  <div>
                    <h5 className="font-serif font-bold text-stone-200">{inst.name}</h5>
                    <span className="text-xs text-amber-300/80 font-serif block">{inst.khmer}</span>
                    <p className="text-xs text-stone-400 font-light mt-1.5 leading-relaxed">
                      {inst.role}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-stone-850 flex items-center justify-between text-xs">
                    <span className="text-stone-400 font-mono">{inst.city}</span>
                    <a
                      href={inst.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:text-amber-300 font-mono flex items-center space-x-1"
                    >
                      <span>Trang chủ</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Licensing Standards */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-amber-400 font-mono font-semibold uppercase tracking-wider text-xs border-b border-stone-800 pb-2">
              <Scale className="w-4 h-4" />
              <span>Quy Chuẩn Cấp Phép & Bản Quyền Tư Liệu (License Gate)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="font-mono text-emerald-400 font-bold block">Public Domain / CC0</span>
                <p className="text-stone-400 font-light">Hiện vật cổ đại thuộc phạm vi công cộng toàn cầu, tự do tra cứu và nghiên cứu.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="font-mono text-cyan-400 font-bold block">CC BY / CC BY-SA</span>
                <p className="text-stone-400 font-light">Tư liệu mở kèm điều kiện ghi công chính xác cơ quan lưu trữ và tác giả khảo sát.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="font-mono text-purple-400 font-bold block">Institutional Access</span>
                <p className="text-stone-400 font-light">Hồ sơ khảo cứu và văn bia phục vụ mục đích giáo dục phi thương mại.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs font-mono transition-colors cursor-pointer"
          >
            Đã Hiểu & Đóng Cửa Sổ
          </button>
        </div>

      </div>
    </div>
  );
};
