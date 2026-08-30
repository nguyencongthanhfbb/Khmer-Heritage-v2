import React from 'react';
import { Landmark, ShieldCheck, Heart, ExternalLink, BookOpen } from 'lucide-react';

interface FooterProps {
  onOpenProvenance: () => void;
  onOpenCurator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenProvenance, onOpenCurator }) => {
  return (
    <footer className="bg-[#0e0f12] border-t border-stone-800 text-stone-300 pt-16 pb-12 font-serif" id="museum-global-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-stone-900 flex items-center justify-center border border-amber-500/40">
                <Landmark className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-stone-100 tracking-wider">
                  KHMER HERITAGE
                </span>
                <p className="text-xs text-amber-200/70">
                  សារមន្ទីរបេតិកភណ្ឌខ្មែរ • Digital Khmer Museum
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-md">
              Bảo tàng kỹ thuật số và đồ thị tri thức văn hóa Campuchia, tôn vinh các kiệt tác điêu khắc cổ đại, kỳ quan kiến trúc đền núi Angkor, cùng kho tàng di sản phi vật thể sống động.
            </p>

            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Dữ liệu học thuật đối chiếu: Met Museum, EFEO, NMC & APSARA</span>
            </div>
          </div>

          {/* Archival Partners */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-amber-400 uppercase tracking-wider font-semibold">
              Cơ Quan Lưu Trữ Học Thuật
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-light">
              <li>
                <a href="https://www.cambodiamuseum.info/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors flex items-center space-x-1">
                  <span>Bảo tàng Quốc gia Campuchia</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.efeo.fr/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors flex items-center space-x-1">
                  <span>Viện Viễn Đông Bác cổ (EFEO)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://apsaraauthority.gov.kh/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors flex items-center space-x-1">
                  <span>Cơ quan Quản lý APSARA</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://whc.unesco.org/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors flex items-center space-x-1">
                  <span>UNESCO World Heritage</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-amber-400 uppercase tracking-wider font-semibold">
              Khám Phá & Học Thuật
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-light">
              <li>
                <button onClick={onOpenProvenance} className="hover:text-amber-300 transition-colors cursor-pointer flex items-center space-x-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Cổng Bản Quyền & Nguồn Gốc</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenCurator} className="hover:text-amber-300 transition-colors cursor-pointer">
                  <span>Trợ Lý Giám Tuyển AI Học Thuật</span>
                </button>
              </li>
              <li>
                <span className="text-stone-400 font-mono">Phiên bản: 1.0.0 (Production)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 font-light gap-4">
          <p>© 2026 Khmer Heritage Project. Phục vụ mục đích nghiên cứu, giáo dục và bảo tồn văn hóa phi thương mại.</p>
          <div className="flex items-center space-x-1 font-mono text-[11px]">
            <span>Xây dựng với sự tôn kính văn hóa Khmer</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
