export type EntityType = 
  | 'artifact' 
  | 'place' 
  | 'person' 
  | 'event_tradition' 
  | 'art_form' 
  | 'manuscript' 
  | 'media_record' 
  | 'concept';

export type HistoricalPeriod = 
  | 'Pre-Angkor' 
  | 'Funan' 
  | 'Chenla' 
  | 'Angkor' 
  | 'Post-Angkor' 
  | 'Modern';

export type LicenseType = 
  | 'CC0' 
  | 'Public Domain' 
  | 'CC BY' 
  | 'CC BY-SA' 
  | 'Institutional Open Access';

export interface LocationData {
  siteName: string;
  historicalRegion?: string;
  province: string;
  country: string;
  coordinates: [number, number]; // [lat, lng]
  elevation?: string;
  unescoStatus?: string;
}

export interface MediaAsset {
  primaryImage: string;
  highResImage?: string;
  thumbnail?: string;
  gallery?: string[];
  audioUrl?: string;
  audioDuration?: string;
  videoUrl?: string;
  model3dUrl?: string;
  caption?: string;
  imageAttribution?: string;
}

export interface ProvenanceRecord {
  institution: string;
  institutionKhmer?: string;
  sourceUrl: string;
  sourceRecordId?: string;
  license: LicenseType;
  licenseUrl: string;
  attribution: string;
  accessionNumber?: string;
  discoveryYear?: string;
  excavationSite?: string;
  citations: string[];
}

export interface KnowledgeRelations {
  relatedEntityIds: string[];
  relatedCollections: string[];
  associatedRulers?: string[];
  associatedPlaces?: string[];
  associatedConcepts?: string[];
  artisticStyle?: string;
}

export interface IconographyHotspot {
  id: string;
  label: string;
  labelKhmer?: string;
  labelSanskrit?: string;
  position: { x: number; y: number }; // percentage coords (0-100)
  description: string;
  theologicalMeaning: string;
  symbolism: string;
}

export interface HeritageObject {
  id: string; // Canonical ID, e.g. "kh-art-vishnu-west-mebon"
  type: EntityType;
  title: string;
  titleKhmer: string;
  titleEnglish: string;
  alternateTitles?: string[];
  
  category: string;
  period: HistoricalPeriod;
  dateRange: string;
  century: string;
  
  summary: string;
  description: string;
  historicalContext: string;
  culturalSignificance: string;
  
  material?: string;
  dimensions?: string;
  technique?: string;
  creator?: string;
  
  location?: LocationData;
  media: MediaAsset;
  provenance: ProvenanceRecord;
  relations: KnowledgeRelations;
  
  hotspots?: IconographyHotspot[];
  isMasterpiece?: boolean;
  featuredOrder?: number;
}

export interface MuseumCollection {
  id: string;
  title: string;
  titleKhmer: string;
  titleEnglish: string;
  description: string;
  curatorNote: string;
  representativeImage: string;
  period: string;
  category: string;
  theme: string;
  objectIds: string[];
  provenanceContext: string;
}

export interface TimelineEpoch {
  id: string;
  name: string;
  nameKhmer: string;
  timeSpan: string;
  startYear: number;
  endYear: number;
  description: string;
  keyDevelopments: string[];
  majorRulers: string[];
  iconicMonuments: string[];
  representativeArtStyle: string;
  bannerImage: string;
  relatedObjectIds: string[];
}

export interface FilterState {
  searchQuery: string;
  selectedType: string;
  selectedPeriod: string;
  selectedCategory: string;
  selectedInstitution: string;
  selectedMaterial: string;
  onlyMasterpieces: boolean;
  hasAudio: boolean;
}

export interface VirtualTourStop {
  id: string;
  title: string;
  titleKhmer?: string;
  subtitle: string;
  objectId?: string;
  image: string;
  narrationText: string;
  audioDuration?: string;
  historicalSignificance: string;
  theologicalRole: string;
  coordinates?: [number, number];
}

export interface VirtualTour {
  id: string;
  title: string;
  titleKhmer: string;
  titleEnglish: string;
  tagline: string;
  description?: string;
  theme: string;
  coverImage: string;
  estimatedDuration: string;
  stopsCount: number;
  stops: VirtualTourStop[];
}

export interface ArtStyleRecord {
  id: string;
  name: string;
  periodRange: string;
  historicalEra: string;
  keyFeatures: {
    lintels: string;
    facialFeatures: string;
    garments: string;
    architecturalStructure: string;
  };
  iconicMonuments: string[];
  comparisonNotes: string;
}

export interface PinpeatInstrument {
  id: string;
  name: string;
  nameKhmer: string;
  nameEnglish: string;
  category: string;
  material: string;
  baseFrequencyHz: number;
  soundType: 'sine' | 'triangle' | 'square' | 'sawtooth';
  tuningPitch: string;
  ritualRole: string;
  description: string;
  scholarlyImportance: string;
}

export interface HeritageQuizQuestion {
  id: string;
  category: string;
  question: string;
  questionKhmer?: string;
  options: string[];
  correctAnswerIndex: number;
  scholarlyExplanation: string;
  academicCitation: string;
  relatedObjectId?: string;
}

