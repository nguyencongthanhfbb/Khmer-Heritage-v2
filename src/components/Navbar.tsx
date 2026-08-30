import React from 'react';
import { 
  Landmark, 
  Compass, 
  Layers, 
  Clock, 
  MapPin, 
  Bookmark, 
  Sparkles, 
  Search,
  BookOpen,
  Volume2,
  ScrollText,
  Footprints,
  Columns3,
  Music,
  GraduationCap,
  Database,
  Network,
  SlidersHorizontal
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedCount: number;
  onOpenSearch: () => void;
  onOpenCurator: () => void;
  onOpenProvenance: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenSearch,
  onOpenCurator,
  onOpenProvenance,
}) => {
  const navItems = [
    { id: 'entrance', label: 'Sảnh Bảo Tàng', khmer: 'ច្រកចូល', icon: Landmark },
    { id: 'graph', label: 'Đồ Thị Tri Thức', khmer: 'ក្រាហ្វ', icon: Network },
    { id: 'explore', label: 'Khám Phá Đa Chiều', khmer: 'រុករក', icon: SlidersHorizontal },
    { id: 'collections', label: 'Bộ Sưu Tập', khmer: 'ការប្រមូល', icon: Layers },
    { id: 'directory', label: 'Kho Hiện Vật', khmer: 'វត្ថុបុរាណ', icon: Compass },
    { id: 'ingestion', label: 'Nạp Dữ Liệu & CMS', khmer: 'ទិន្នន័យ', icon: Database },
    { id: 'epigraphy', label: 'Văn Bia Cổ', khmer: 'សិលាចារឹក', icon: ScrollText },
    { id: 'tours', label: 'Tuyến Tham Quan', khmer: 'ទស្សនកិច្ច', icon: Footprints },
    { id: 'styles', label: 'Đối Sánh Phong Cách', khmer: 'រចនាប័ទ្ម', icon: Columns3 },
    { id: 'pinpeat', label: 'Âm Nhạc Pinpeat', khmer: 'ពិណពាទ្យ', icon: Music },
    { id: 'quiz', label: 'Trắc Nghiệm', khmer: 'សំណួរ', icon: GraduationCap },
    { id: 'timeline', label: 'Trục Thời Gian', khmer: 'បន្ទាត់ពេលវេលា', icon: Clock },
    { id: 'map', label: 'Bản Đồ Di Tích', khmer: 'ផែនទី', icon: MapPin },
    { id: 'saved', label: 'Mục Lưu Trữ', khmer: 'រក្សាទុក', icon: Bookmark, badge: savedCount },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#121316]/95 backdrop-blur-md border-b border-[#282a30] text-stone-200 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Museum Identity */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveTab('entrance')}
            id="nav-brand-logo"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-stone-900 flex items-center justify-center border border-amber-500/30 shadow-lg shadow-amber-950/40 group-hover:scale-105 transition-transform duration-300">
              <Landmark className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-xl font-bold tracking-wider text-stone-100 group-hover:text-amber-300 transition-colors">
                  KHMER HERITAGE
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase tracking-widest font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full">
                  Digital Museum
                </span>
              </div>
              <p className="text-xs text-amber-200/60 font-serif tracking-normal">
                សារមន្ទីរបេតិកភណ្ឌខ្មែរ • Bảo Tàng Kỹ Thuật Số
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1" id="nav-main-menu">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
                      : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] font-mono bg-amber-500 text-stone-950 font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Search Button */}
            <button
              id="btn-nav-search"
              onClick={onOpenSearch}
              className="p-2.5 rounded-lg bg-stone-800/80 hover:bg-stone-700/80 text-stone-300 hover:text-amber-300 border border-stone-700/60 transition-all flex items-center space-x-2"
              title="Tìm kiếm hiện vật và đền đài (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline text-xs font-mono text-stone-400">Tìm kiếm...</span>
            </button>

            {/* AI Curator Assistant */}
            <button
              id="btn-nav-curator-ai"
              onClick={onOpenCurator}
              className="px-3 py-2 rounded-lg bg-gradient-to-r from-amber-700/80 to-amber-600/80 hover:from-amber-600 hover:to-amber-500 text-stone-100 font-medium text-xs sm:text-sm flex items-center space-x-1.5 border border-amber-400/40 shadow-md shadow-amber-950/50 hover:shadow-amber-800/40 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
              <span className="hidden sm:inline">Giám Tuyển AI</span>
              <span className="sm:hidden">AI</span>
            </button>

            {/* Provenance & Sources Registry */}
            <button
              id="btn-nav-provenance"
              onClick={onOpenProvenance}
              className="p-2.5 rounded-lg bg-stone-800/80 hover:bg-stone-700/80 text-stone-400 hover:text-stone-200 border border-stone-700/60 transition-all"
              title="Nguồn lưu trữ & Cổng bản quyền"
            >
              <BookOpen className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Mobile Navigation Scrollbar */}
        <div className="lg:hidden flex items-center space-x-2 py-2.5 border-t border-stone-800/80 overflow-x-auto no-scrollbar" id="nav-mobile-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-mob-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-colors ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-stone-300 bg-stone-800/40 hover:bg-stone-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-1.5 py-0.2 text-[9px] font-mono bg-amber-500 text-stone-950 font-bold rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
