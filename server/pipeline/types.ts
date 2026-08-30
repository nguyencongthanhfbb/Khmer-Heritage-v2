import { EntityType, HistoricalPeriod, LicenseType, HeritageObject, OriginalSourceRecord, MediaManifestRecord, EntityRelationship } from '../../src/types/museum';

export interface RawDiscoveryRecord {
  discoveryId: string;
  institution: string;
  sourceRecordId: string;
  sourceUrl: string;
  rawTitle: string;
  rawDescription?: string;
  rawDate?: string;
  rawCreator?: string;
  rawMaterial?: string;
  rawDimensions?: string;
  rawLocation?: string;
  rawCreditLine?: string;
  rawAccessionNumber?: string;
  rawObjectType?: string;
  rawLicenseString?: string;
  primaryImageUrl?: string;
  additionalImages?: string[];
  audioUrl?: string;
  videoUrl?: string;
  documentUrl?: string;
  coordinates?: [number, number] | number[];
  century?: string;
  period?: HistoricalPeriod;
  category?: string;
  titleKhmer?: string;
  titleEnglish?: string;
  titleVietnamese?: string;
  rawPayload?: Record<string, any>;
}

export type LicenseEvaluationResult = {
  eligible: boolean;
  standardLicense: LicenseType | 'Quarantine';
  reason: string;
  licenseUrl: string;
  attribution: string;
};

export interface QualityGateAuditResult {
  gateName: string;
  passed: boolean;
  checkedCount: number;
  failedCount: number;
  details: string;
}

export interface CorpusQualityReport {
  generatedAt: string;
  task: string;
  totalRecordsDiscovered: number;
  productionEligible: number;
  quarantinedCount: number;
  canonicalObjectsCount: number;
  duplicateRecordsMerged: number;
  objectsMissingMedia: number;
  objectsMissingMetadata: number;
  licenseCoverage: Record<string, number>;
  sourceCoverage: Record<string, number>;
  mediaTypeBreakdown: Record<string, number>;
  qualityGates: QualityGateAuditResult[];
  verdict: 'PASS' | 'FAIL';
}

export interface PilotMediaRecord {
  mediaId: string;
  objectId: string;
  sourceUrl: string;
  mediaType: 'image' | 'audio' | 'video' | 'document';
  mimeType: string;
  expectedResolution?: string;
  variants: {
    hero?: string;
    gallery?: string;
    thumbnail?: string;
  };
  license: LicenseType;
  attribution: string;
  pipelineStage: 'SOURCE_FETCH' | 'FORMAT_VALIDATE' | 'NORMALIZE_VARIANTS' | 'MANIFEST_ENTRY';
  status: 'VERIFIED' | 'READY';
}
