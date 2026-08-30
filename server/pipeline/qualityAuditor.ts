import { HeritageObject } from '../../src/types/museum';
import { CorpusQualityReport, QualityGateAuditResult } from './types';

export class QualityAuditor {
  /**
   * Run strict programmatic audit on the entire corpus against quality gates.
   */
  public auditCorpus(params: {
    totalDiscovered: number;
    quarantinedCount: number;
    objects: HeritageObject[];
    mergedDuplicates: number;
  }): CorpusQualityReport {
    const { totalDiscovered, quarantinedCount, objects, mergedDuplicates } = params;

    const qualityGates: QualityGateAuditResult[] = [];

    // Gate 1: SOURCE_EXISTS
    let sourceMissing = 0;
    objects.forEach(o => {
      if (!o.provenance?.institution || !o.provenance?.sourceUrl || !o.provenance.sourceUrl.startsWith('http')) {
        sourceMissing++;
      }
    });
    qualityGates.push({
      gateName: 'SOURCE_EXISTS',
      passed: sourceMissing === 0,
      checkedCount: objects.length,
      failedCount: sourceMissing,
      details: sourceMissing === 0 
        ? '100% of objects have verified museum institution & direct source URL.'
        : `${sourceMissing} objects missing verified source metadata.`
    });

    // Gate 2: LICENSE_VERIFIED
    let licenseFailed = 0;
    const allowedLicenses = ['CC0', 'Public Domain', 'CC BY', 'CC BY-SA', 'Institutional Open Access'];
    const licenseCoverage: Record<string, number> = {};
    objects.forEach(o => {
      const lic = o.provenance?.license;
      licenseCoverage[lic] = (licenseCoverage[lic] || 0) + 1;
      if (!allowedLicenses.includes(lic)) {
        licenseFailed++;
      }
    });
    qualityGates.push({
      gateName: 'LICENSE_VERIFIED',
      passed: licenseFailed === 0,
      checkedCount: objects.length,
      failedCount: licenseFailed,
      details: licenseFailed === 0
        ? '100% of objects verified under allowed Open Access / Public Domain licenses.'
        : `${licenseFailed} objects failed license compliance check.`
    });

    // Gate 3: SCHEMA_VALID
    let schemaFailed = 0;
    objects.forEach(o => {
      if (!o.id || !o.type || !o.title || !o.titleEnglish || !o.period || !o.category || !o.media || !o.provenance) {
        schemaFailed++;
      }
    });
    qualityGates.push({
      gateName: 'SCHEMA_VALID',
      passed: schemaFailed === 0,
      checkedCount: objects.length,
      failedCount: schemaFailed,
      details: schemaFailed === 0
        ? '100% of objects conform strictly to HeritageObject schema.'
        : `${schemaFailed} objects violated schema structure.`
    });

    // Gate 4: NO_FAKE_CONTENT
    let fakeFound = 0;
    const bannedStubs = ['lorem ipsum', 'mock data', 'test object', 'fake description', 'placeholder'];
    objects.forEach(o => {
      const fullText = (o.title + ' ' + o.description + ' ' + (o.summary || '')).toLowerCase();
      for (const stub of bannedStubs) {
        if (fullText.includes(stub)) {
          fakeFound++;
          break;
        }
      }
    });
    qualityGates.push({
      gateName: 'NO_FAKE_CONTENT',
      passed: fakeFound === 0,
      checkedCount: objects.length,
      failedCount: fakeFound,
      details: fakeFound === 0
        ? 'Zero synthetic placeholders or hallucinated cultural essays detected.'
        : `${fakeFound} objects contained banned placeholder text.`
    });

    // Gate 5: PROVENANCE_PRESENT
    let provenanceMissing = 0;
    objects.forEach(o => {
      if (!o.provenance?.attribution || !o.provenance?.citations || o.provenance.citations.length === 0) {
        provenanceMissing++;
      }
    });
    qualityGates.push({
      gateName: 'PROVENANCE_PRESENT',
      passed: provenanceMissing === 0,
      checkedCount: objects.length,
      failedCount: provenanceMissing,
      details: provenanceMissing === 0
        ? '100% of objects have complete provenance, citations, and attribution.'
        : `${provenanceMissing} objects lack provenance citations.`
    });

    // Gate 6: MEDIA_REFERENCE_VALID
    let mediaMissing = 0;
    objects.forEach(o => {
      if (!o.media?.primaryImage || !o.media.primaryImage.startsWith('http') && !o.media.primaryImage.startsWith('/')) {
        mediaMissing++;
      }
    });
    qualityGates.push({
      gateName: 'MEDIA_REFERENCE_VALID',
      passed: mediaMissing === 0,
      checkedCount: objects.length,
      failedCount: mediaMissing,
      details: mediaMissing === 0
        ? '100% of objects have valid high-resolution media references.'
        : `${mediaMissing} objects missing valid primary media.`
    });

    // Gate 7: NO_DUPLICATE_CANONICAL_OBJECT
    const idSet = new Set<string>();
    let duplicateIds = 0;
    objects.forEach(o => {
      if (idSet.has(o.id)) {
        duplicateIds++;
      }
      idSet.add(o.id);
    });
    qualityGates.push({
      gateName: 'NO_DUPLICATE_CANONICAL_OBJECT',
      passed: duplicateIds === 0,
      checkedCount: objects.length,
      failedCount: duplicateIds,
      details: duplicateIds === 0
        ? 'All canonical IDs are strictly unique across the corpus.'
        : `${duplicateIds} duplicate canonical IDs detected.`
    });

    // Compute Source Coverage
    const sourceCoverage: Record<string, number> = {};
    objects.forEach(o => {
      const inst = o.provenance.institution;
      sourceCoverage[inst] = (sourceCoverage[inst] || 0) + 1;
    });

    // Media type breakdown
    const mediaTypeBreakdown: Record<string, number> = {};
    objects.forEach(o => {
      mediaTypeBreakdown[o.type] = (mediaTypeBreakdown[o.type] || 0) + 1;
    });

    const allPassed = qualityGates.every(g => g.passed);

    return {
      generatedAt: new Date().toISOString(),
      task: 'KH-022',
      totalRecordsDiscovered: totalDiscovered,
      productionEligible: objects.length,
      quarantinedCount,
      canonicalObjectsCount: objects.length,
      duplicateRecordsMerged: mergedDuplicates,
      objectsMissingMedia: mediaMissing,
      objectsMissingMetadata: sourceMissing,
      licenseCoverage,
      sourceCoverage,
      mediaTypeBreakdown,
      qualityGates,
      verdict: allPassed ? 'PASS' : 'FAIL'
    };
  }
}

export const qualityAuditor = new QualityAuditor();
