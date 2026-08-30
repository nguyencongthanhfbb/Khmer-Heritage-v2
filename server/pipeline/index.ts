import fs from 'fs';
import path from 'path';
import { HeritageObject } from '../../src/types/museum';
import { RawDiscoveryRecord } from './types';
import { licenseGate } from './licenseGate';
import { normalizer } from './normalizer';
import { deduplicator } from './deduplicator';
import { relationshipEngine } from './relationshipEngine';
import { mediaPipeline } from './mediaPipeline';
import { qualityAuditor } from './qualityAuditor';
import { bundleExporter } from './bundleExporter';
import { SMITHSONIAN_AUTHENTIC_KHMER_RECORDS } from '../crawler/smithsonianAdapter';
import { LOC_AUTHENTIC_KHMER_RECORDS } from '../crawler/locAdapter';
import { WIKIMEDIA_AUTHENTIC_KHMER_RECORDS } from '../crawler/wikimediaAdapter';
import { ARCHIVE_AUTHENTIC_KHMER_RECORDS } from '../crawler/archiveAdapter';

export class MuseumCorpusPipeline {
  private outputDataPath = path.join(process.cwd(), 'src', 'data', 'crawledMuseumData.json');

  public runPipeline() {
    console.log('🏛️ === KHMER HERITAGE: MUSEUM CONTENT CORPUS EXPANSION PIPELINE (KH-022) ===');

    // Step 1: DISCOVERY & RAW RECORD AGGREGATION
    console.log('\n[Stage 1/7] Discovery: Aggregating authentic museum source records...');
    const rawRecords: RawDiscoveryRecord[] = [];
    const quarantineList: any[] = [];

    // 1.1 Load Met Museum verified objects
    let existingObjects: HeritageObject[] = [];
    if (fs.existsSync(this.outputDataPath)) {
      existingObjects = JSON.parse(fs.readFileSync(this.outputDataPath, 'utf8'));
    }
    const metObjects = existingObjects.filter(o => o.id.startsWith('kh-met-'));

    for (const obj of metObjects) {
      rawRecords.push({
        discoveryId: obj.id,
        institution: obj.provenance.institution,
        sourceRecordId: obj.provenance.accessionNumber || obj.id.replace('kh-met-', ''),
        sourceUrl: obj.provenance.sourceUrl,
        rawTitle: obj.titleEnglish || obj.title,
        rawDescription: obj.description,
        rawDate: obj.dateRange,
        rawMaterial: obj.material,
        rawDimensions: obj.dimensions,
        rawLocation: obj.location?.siteName,
        rawCreditLine: obj.provenance.citations?.[1] || 'The Metropolitan Museum of Art',
        rawAccessionNumber: obj.provenance.accessionNumber,
        rawObjectType: obj.type,
        rawLicenseString: obj.provenance.license,
        primaryImageUrl: obj.media.primaryImage,
        additionalImages: obj.media.gallery,
        audioUrl: obj.media.audioUrl,
        coordinates: obj.location?.coordinates,
        century: obj.century,
        period: obj.period,
        category: obj.category,
        titleKhmer: obj.titleKhmer,
        titleEnglish: obj.titleEnglish,
        titleVietnamese: obj.title,
        rawPayload: { isPublicDomain: true, metId: obj.id }
      });
    }

    // 1.2 Smithsonian records
    for (const si of SMITHSONIAN_AUTHENTIC_KHMER_RECORDS) {
      rawRecords.push({
        discoveryId: si.id,
        institution: 'Smithsonian National Museum of Asian Art (Freer & Sackler Galleries)',
        sourceRecordId: si.accessionNumber,
        sourceUrl: si.sourceUrl,
        rawTitle: si.titleEnglish,
        rawDescription: si.description,
        rawDate: si.dateRange,
        rawMaterial: si.material,
        rawDimensions: si.dimensions,
        rawLocation: 'Quần thể Di tích Lịch sử Angkor, Siem Reap',
        rawCreditLine: si.creditLine,
        rawAccessionNumber: si.accessionNumber,
        rawObjectType: 'artifact',
        rawLicenseString: 'CC0',
        primaryImageUrl: si.primaryImage,
        additionalImages: [si.primaryImage],
        coordinates: [13.4125, 103.867],
        century: si.century,
        period: si.period,
        category: si.category,
        titleKhmer: si.titleKhmer,
        titleEnglish: si.titleEnglish,
        titleVietnamese: si.title,
        rawPayload: { isPublicDomain: true, accessionNumber: si.accessionNumber }
      });
    }

    // 1.3 Library of Congress records
    for (const loc of LOC_AUTHENTIC_KHMER_RECORDS) {
      rawRecords.push({
        discoveryId: loc.id,
        institution: 'Library of Congress (Prints & Photographs Division)',
        sourceRecordId: loc.lccn,
        sourceUrl: loc.sourceUrl,
        rawTitle: loc.titleEnglish,
        rawDescription: loc.description,
        rawDate: loc.dateRange,
        rawMaterial: loc.material,
        rawDimensions: loc.dimensions,
        rawLocation: 'Siem Reap / Phnom Penh, Campuchia',
        rawCreditLine: loc.creditLine,
        rawAccessionNumber: loc.lccn,
        rawObjectType: loc.type,
        rawLicenseString: 'Public Domain',
        primaryImageUrl: loc.primaryImage,
        additionalImages: [loc.primaryImage],
        coordinates: [13.4413, 103.8587],
        century: loc.century,
        period: loc.period,
        category: loc.category,
        titleKhmer: loc.titleKhmer,
        titleEnglish: loc.titleEnglish,
        titleVietnamese: loc.title,
        rawPayload: { lccn: loc.lccn, rights: 'No known copyright restrictions' }
      });
    }

    // 1.4 Wikimedia Commons / National Museum of Cambodia
    for (const wiki of WIKIMEDIA_AUTHENTIC_KHMER_RECORDS) {
      rawRecords.push({
        discoveryId: wiki.id,
        institution: wiki.holdingInstitution,
        sourceRecordId: wiki.commonsFile,
        sourceUrl: wiki.sourceUrl,
        rawTitle: wiki.titleEnglish,
        rawDescription: wiki.description,
        rawDate: wiki.dateRange,
        rawMaterial: wiki.material,
        rawDimensions: wiki.dimensions,
        rawLocation: 'Bảo tàng Quốc gia Campuchia, Phnom Penh',
        rawCreditLine: wiki.author,
        rawAccessionNumber: wiki.commonsFile,
        rawObjectType: wiki.type,
        rawLicenseString: wiki.license,
        primaryImageUrl: wiki.primaryImage,
        additionalImages: [wiki.primaryImage],
        coordinates: [11.5662, 104.9292],
        century: wiki.century,
        period: wiki.period,
        category: wiki.category,
        titleKhmer: wiki.titleKhmer,
        titleEnglish: wiki.titleEnglish,
        titleVietnamese: wiki.title,
        rawPayload: { commonsFile: wiki.commonsFile, author: wiki.author }
      });
    }

    // 1.5 Internet Archive & EFEO records
    for (const ia of ARCHIVE_AUTHENTIC_KHMER_RECORDS) {
      rawRecords.push({
        discoveryId: ia.id,
        institution: 'Internet Archive & EFEO Archival Collection',
        sourceRecordId: ia.iaIdentifier,
        sourceUrl: ia.sourceUrl,
        rawTitle: ia.titleEnglish,
        rawDescription: ia.description,
        rawDate: ia.dateRange,
        rawMaterial: ia.material,
        rawDimensions: ia.dimensions,
        rawLocation: 'Phnom Penh & Siem Reap, Campuchia',
        rawCreditLine: ia.creditLine,
        rawAccessionNumber: ia.iaIdentifier,
        rawObjectType: ia.type,
        rawLicenseString: 'Public Domain',
        primaryImageUrl: ia.primaryImage,
        additionalImages: [ia.primaryImage],
        audioUrl: ia.audioUrl,
        coordinates: [13.4125, 103.867],
        century: ia.century,
        period: ia.period,
        category: ia.category,
        titleKhmer: ia.titleKhmer,
        titleEnglish: ia.titleEnglish,
        titleVietnamese: ia.title,
        rawPayload: { iaIdentifier: ia.iaIdentifier }
      });
    }

    console.log(`✓ Total discovery records collected: ${rawRecords.length}`);

    // Step 2: LICENSE GATE EVALUATION
    console.log('\n[Stage 2/7] License Gate: Evaluating production eligibility & quarantine policies...');
    const eligibleRecords: Array<{ raw: RawDiscoveryRecord; evalResult: any }> = [];

    for (const rec of rawRecords) {
      const evalResult = licenseGate.evaluate(rec);
      if (evalResult.eligible) {
        eligibleRecords.push({ raw: rec, evalResult });
      } else {
        quarantineList.push({
          recordId: rec.discoveryId,
          institution: rec.institution,
          title: rec.rawTitle,
          reason: evalResult.reason,
          quarantinedAt: new Date().toISOString()
        });
      }
    }
    console.log(`✓ Passed License Gate: ${eligibleRecords.length} records`);
    console.log(`✓ Quarantined: ${quarantineList.length} records`);

    // Step 3: NORMALIZATION
    console.log('\n[Stage 3/7] Normalization: Constructing Museum Objects with preserved source content...');
    const normalizedObjects: HeritageObject[] = [];
    for (const item of eligibleRecords) {
      const norm = normalizer.normalize(item.raw, item.evalResult);
      // Preserve existing hotspots, masterpieces, or rich relations if previously mapped
      const existing = existingObjects.find(e => e.id === norm.id);
      if (existing) {
        if (existing.hotspots && existing.hotspots.length > 0) {
          norm.hotspots = existing.hotspots;
        }
        if (existing.isMasterpiece) {
          norm.isMasterpiece = true;
        }
        if (existing.relations) {
          norm.relations = {
            relatedEntityIds: Array.from(new Set([...(norm.relations?.relatedEntityIds || []), ...(existing.relations.relatedEntityIds || [])])),
            relatedCollections: Array.from(new Set([...(norm.relations?.relatedCollections || []), ...(existing.relations.relatedCollections || [])])),
            associatedConcepts: Array.from(new Set([...(norm.relations?.associatedConcepts || []), ...(existing.relations.associatedConcepts || [])])),
            associatedPlaces: Array.from(new Set([...(norm.relations?.associatedPlaces || []), ...(existing.relations.associatedPlaces || [])])),
            associatedRulers: Array.from(new Set([...(norm.relations?.associatedRulers || []), ...(existing.relations.associatedRulers || [])])),
            artisticStyle: existing.relations.artisticStyle || norm.relations.artisticStyle
          };
        }
      }
      normalizedObjects.push(norm);
    }

    // Step 4: CANONICAL DEDUPLICATION
    console.log('\n[Stage 4/7] Deduplication: Merging cross-institutional duplicate records...');
    const dedupResult = deduplicator.deduplicate(normalizedObjects);
    const finalObjects = dedupResult.canonicalObjects;
    console.log(`✓ Canonical Heritage Objects: ${finalObjects.length} (Merged: ${dedupResult.mergedCount})`);

    // Step 5: RELATIONSHIP ENGINE
    console.log('\n[Stage 5/7] Relationship Engine: Generating verified knowledge graph connections...');
    const relResult = relationshipEngine.generateRelationships(finalObjects);
    console.log(`✓ Total Relational Edges Generated: ${relResult.relationshipCount}`);

    // Step 6: MEDIA PIPELINE & PILOT BATCH
    console.log('\n[Stage 6/7] Media Pipeline: Building media manifest & pilot asset batch...');
    const mediaResult = mediaPipeline.generateManifest(finalObjects);
    const pilotBatch = mediaPipeline.generatePilotBatch(finalObjects);
    console.log(`✓ Total Media Assets Cataloged: ${mediaResult.totalMediaAssets}`);
    console.log(`✓ Pilot Batch Prepared: ${pilotBatch.length} assets`);

    // Step 7: QUALITY AUDIT & BUNDLE EXPORT
    console.log('\n[Stage 7/7] Quality Audit & Delivery Bundle Export...');
    const qualityReport = qualityAuditor.auditCorpus({
      totalDiscovered: rawRecords.length,
      quarantinedCount: quarantineList.length,
      objects: finalObjects,
      mergedDuplicates: dedupResult.mergedCount
    });

    console.log(`\n📊 Quality Audit Verdict: ${qualityReport.verdict}`);
    qualityReport.qualityGates.forEach(g => {
      console.log(`  - [${g.passed ? 'PASS' : 'FAIL'}] ${g.gateName}: ${g.details}`);
    });

    bundleExporter.exportAll({
      objects: finalObjects,
      mediaManifest: mediaResult.manifest,
      pilotMedia: pilotBatch,
      relationships: relResult.relationships,
      qualityReport,
      quarantineLog: quarantineList
    });

    console.log('\n✅ KH-022 Pipeline execution completed successfully!');
    console.log(`📁 Bundles exported to: /content/`);
    console.log(`📁 Runtime data synchronized to: src/data/crawledMuseumData.json`);

    return {
      totalObjects: finalObjects.length,
      qualityReport,
      mediaCount: mediaResult.totalMediaAssets,
      relationshipCount: relResult.relationshipCount
    };
  }
}

export const museumCorpusPipeline = new MuseumCorpusPipeline();
