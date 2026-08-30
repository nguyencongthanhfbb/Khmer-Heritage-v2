import React, { useState, useEffect } from 'react';
import { HERITAGE_OBJECTS } from './data/museumData';
import { MUSEUM_COLLECTIONS } from './data/collectionsData';
import { TIMELINE_EPOCHS } from './data/timelineData';
import { Navbar } from './components/Navbar';
import { MuseumEntrance } from './components/MuseumEntrance';
import { HeritageObjectDetail } from './components/HeritageObjectDetail';
import { CollectionsView } from './components/CollectionsView';
import { ObjectDirectory } from './components/ObjectDirectory';
import { TimelineView } from './components/TimelineView';
import { HeritageMapExplorer } from './components/HeritageMapExplorer';
import { EpigraphyExplorer } from './components/EpigraphyExplorer';
import { VirtualTourGuide } from './components/VirtualTourGuide';
import { ArtStyleMatrix } from './components/ArtStyleMatrix';
import { PinpeatExperience } from './components/PinpeatExperience';
import { HeritageQuiz } from './components/HeritageQuiz';
import { SavedCurations } from './components/SavedCurations';
import { IngestionDashboard } from './components/IngestionDashboard';
import { CuratorAssistant } from './components/CuratorAssistant';
import { ProvenanceModal } from './components/ProvenanceModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { Footer } from './components/Footer';
import { HeritageObject } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('entrance');
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [initialPeriodFilter, setInitialPeriodFilter] = useState<string>('all');
  const [allObjects, setAllObjects] = useState<HeritageObject[]>(HERITAGE_OBJECTS);
  
  // Saved objects state with client-side localStorage persistence
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('khmer_heritage_saved_ids');
      return saved ? JSON.parse(saved) : ['kh-met-38451', 'kh-met-38160'];
    } catch {
      return ['kh-met-38451', 'kh-met-38160'];
    }
  });

  // Fetch unified museum objects (curated + ingested) from server API
  const refreshAllObjects = async () => {
    try {
      const res = await fetch('/api/objects');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setAllObjects(data);
        }
      }
    } catch (err) {
      console.warn('API fetch objects fallback to local curated:', err);
    }
  };

  useEffect(() => {
    refreshAllObjects();
  }, []);

  // Modal dialog states
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCuratorOpen, setIsCuratorOpen] = useState<boolean>(false);
  const [isProvenanceOpen, setIsProvenanceOpen] = useState<boolean>(false);
  const [curatorContextObjectId, setCuratorContextObjectId] = useState<string | null>(null);

  // Sync saved items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('khmer_heritage_saved_ids', JSON.stringify(savedIds));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [savedIds]);

  const handleToggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleClearAllSaved = () => {
    setSavedIds([]);
  };

  const handleSelectObject = (id: string) => {
    setSelectedObjectId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMuseum = () => {
    setSelectedObjectId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCollection = (id: string) => {
    setSelectedObjectId(null);
    setActiveTab('collections');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPeriod = (periodName: string) => {
    setSelectedObjectId(null);
    setInitialPeriodFilter(periodName);
    setActiveTab('directory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCuratorWithContext = (objectId: string) => {
    setCuratorContextObjectId(objectId);
    setIsCuratorOpen(true);
  };

  const handleTabChange = (tab: string) => {
    setSelectedObjectId(null);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (tab === 'directory' || tab === 'ingestion' || tab === 'entrance') {
      refreshAllObjects();
    }
  };

  // Find currently active object if any
  const currentObject = selectedObjectId
    ? allObjects.find((o) => o.id === selectedObjectId) || null
    : null;

  // Saved objects objects list
  const savedObjects = allObjects.filter((o) => savedIds.includes(o.id));

  return (
    <div className="min-h-screen bg-[#121316] text-stone-200 flex flex-col selection:bg-amber-500 selection:text-stone-950">
      
      {/* 1. Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        savedCount={savedIds.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCurator={() => {
          setCuratorContextObjectId(null);
          setIsCuratorOpen(true);
        }}
        onOpenProvenance={() => setIsProvenanceOpen(true)}
      />

      {/* 2. Main Content Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Render Single Object Deep Dive if an object is selected */}
        {currentObject ? (
          <HeritageObjectDetail
            object={currentObject}
            allObjects={allObjects}
            onBack={handleBackToMuseum}
            onSelectObject={handleSelectObject}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onOpenCuratorWithContext={handleOpenCuratorWithContext}
            onNavigateTab={handleTabChange}
          />
        ) : (
          /* Render Active View Tab */
          <>
            {activeTab === 'entrance' && (
              <MuseumEntrance
                objects={allObjects}
                collections={MUSEUM_COLLECTIONS}
                timeline={TIMELINE_EPOCHS}
                onSelectObject={handleSelectObject}
                onSelectCollection={handleSelectCollection}
                onSelectPeriod={handleSelectPeriod}
                onOpenCurator={() => {
                  setCuratorContextObjectId(null);
                  setIsCuratorOpen(true);
                }}
                savedIds={savedIds}
                onToggleSave={handleToggleSave}
                onNavigateTab={handleTabChange}
              />
            )}

            {activeTab === 'collections' && (
              <CollectionsView
                collections={MUSEUM_COLLECTIONS}
                objects={allObjects}
                onSelectObject={handleSelectObject}
                savedIds={savedIds}
                onToggleSave={handleToggleSave}
              />
            )}

            {activeTab === 'directory' && (
              <ObjectDirectory
                objects={allObjects}
                onSelectObject={handleSelectObject}
                savedIds={savedIds}
                onToggleSave={handleToggleSave}
                initialPeriodFilter={initialPeriodFilter}
              />
            )}

            {activeTab === 'ingestion' && (
              <IngestionDashboard
                onSelectObject={handleSelectObject}
              />
            )}

            {activeTab === 'epigraphy' && (
              <EpigraphyExplorer
                onSelectObject={handleSelectObject}
              />
            )}

            {activeTab === 'tours' && (
              <VirtualTourGuide
                onSelectObject={handleSelectObject}
              />
            )}

            {activeTab === 'styles' && (
              <ArtStyleMatrix />
            )}

            {activeTab === 'pinpeat' && (
              <PinpeatExperience />
            )}

            {activeTab === 'quiz' && (
              <HeritageQuiz
                onExploreObject={handleSelectObject}
              />
            )}

            {activeTab === 'timeline' && (
              <TimelineView
                timeline={TIMELINE_EPOCHS}
                objects={allObjects}
                onSelectObject={handleSelectObject}
                savedIds={savedIds}
                onToggleSave={handleToggleSave}
              />
            )}

            {activeTab === 'map' && (
              <HeritageMapExplorer
                objects={allObjects}
                onSelectObject={handleSelectObject}
              />
            )}

            {activeTab === 'saved' && (
              <SavedCurations
                savedObjects={savedObjects}
                onSelectObject={handleSelectObject}
                onRemoveSave={handleToggleSave}
                onClearAll={handleClearAllSaved}
              />
            )}
          </>
        )}

      </main>

      {/* 3. Global Footer */}
      <Footer
        onOpenProvenance={() => setIsProvenanceOpen(true)}
        onOpenCurator={() => {
          setCuratorContextObjectId(null);
          setIsCuratorOpen(true);
        }}
      />

      {/* 4. Global Modals */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        objects={allObjects}
        onSelectObject={handleSelectObject}
      />

      <CuratorAssistant
        isOpen={isCuratorOpen}
        onClose={() => setIsCuratorOpen(false)}
        currentObject={
          curatorContextObjectId
            ? allObjects.find((o) => o.id === curatorContextObjectId) || null
            : currentObject
        }
        onSelectObjectById={handleSelectObject}
      />

      <ProvenanceModal
        isOpen={isProvenanceOpen}
        onClose={() => setIsProvenanceOpen(false)}
      />

    </div>
  );
}
