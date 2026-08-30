import React, { useState } from 'react';
import { HeritageObject } from '../types/museum';
import { KnowledgeGraphExplorer } from './KnowledgeGraphExplorer';
import { MaterialExplorer } from './MaterialExplorer';
import { IconographyExplorer } from './IconographyExplorer';
import { InstitutionExplorer } from './InstitutionExplorer';
import { 
  Network, 
  Layers, 
  Sparkles, 
  Landmark, 
  Compass, 
  Filter, 
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react';

interface ExplorationHubProps {
  objects: HeritageObject[];
  onSelectObject: (id: string) => void;
  initialSubTab?: 'graph' | 'materials' | 'iconography' | 'institutions';
  initialFocusId?: string | null;
  onNavigateTab?: (tab: string) => void;
}

export const ExplorationHub: React.FC<ExplorationHubProps> = ({
  objects,
  onSelectObject,
  initialSubTab = 'graph',
  initialFocusId,
  onNavigateTab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'graph' | 'materials' | 'iconography' | 'institutions'>(
    initialSubTab
  );

  return (
    <div className="space-y-6" id="exploration-hub">
      
      {/* Sub-navigation Tabs */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-4 overflow-x-auto">
        <div className="flex items-center space-x-2 min-w-max">
          <button
            onClick={() => setActiveSubTab('graph')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-serif font-bold transition-all ${
              activeSubTab === 'graph'
                ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-950/40'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800 hover:text-stone-100'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Đồ Thị Tri Thức (562 Quan Hệ)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('materials')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-serif font-bold transition-all ${
              activeSubTab === 'materials'
                ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-950/40'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800 hover:text-stone-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Chất Liệu & Điêu Khắc</span>
          </button>

          <button
            onClick={() => setActiveSubTab('iconography')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-serif font-bold transition-all ${
              activeSubTab === 'iconography'
                ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-950/40'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800 hover:text-stone-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Biểu Tượng Học & Thần Điện</span>
          </button>

          <button
            onClick={() => setActiveSubTab('institutions')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-serif font-bold transition-all ${
              activeSubTab === 'institutions'
                ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-950/40'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800 hover:text-stone-100'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Viện Bảo Tàng & Nguồn Gốc</span>
          </button>
        </div>
      </div>

      {/* Dynamic Sub-Views */}
      <div>
        {activeSubTab === 'graph' && (
          <KnowledgeGraphExplorer
            objects={objects}
            onSelectObject={onSelectObject}
            initialFocusId={initialFocusId}
            onNavigateTab={onNavigateTab}
          />
        )}

        {activeSubTab === 'materials' && (
          <MaterialExplorer
            objects={objects}
            onSelectObject={onSelectObject}
            onNavigateTab={onNavigateTab}
          />
        )}

        {activeSubTab === 'iconography' && (
          <IconographyExplorer
            objects={objects}
            onSelectObject={onSelectObject}
            onNavigateTab={onNavigateTab}
          />
        )}

        {activeSubTab === 'institutions' && (
          <InstitutionExplorer
            objects={objects}
            onSelectObject={onSelectObject}
            onNavigateTab={onNavigateTab}
          />
        )}
      </div>

    </div>
  );
};
