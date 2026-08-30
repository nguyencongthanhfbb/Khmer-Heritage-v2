import fs from 'fs';
import path from 'path';
import { HeritageObject, MuseumCollection } from '../../src/types/museum';
import { MediaManifestRecord, EntityRelationship } from '../../src/types/museum';
import { CorpusQualityReport, PilotMediaRecord } from './types';
import { MUSEUM_COLLECTIONS } from '../../src/data/collectionsData';

export class BundleExporter {
  private contentRoot = path.join(process.cwd(), 'content');
  private srcDataPath = path.join(process.cwd(), 'src', 'data', 'crawledMuseumData.json');

  public exportAll(params: {
    objects: HeritageObject[];
    mediaManifest: MediaManifestRecord[];
    pilotMedia: PilotMediaRecord[];
    relationships: EntityRelationship[];
    qualityReport: CorpusQualityReport;
    quarantineLog: any[];
  }): void {
    const { objects, mediaManifest, pilotMedia, relationships, qualityReport, quarantineLog } = params;

    // 1. Ensure directories
    const dirs = [
      path.join(this.contentRoot, 'objects'),
      path.join(this.contentRoot, 'objects', 'by_type'),
      path.join(this.contentRoot, 'objects', 'by_period'),
      path.join(this.contentRoot, 'collections'),
      path.join(this.contentRoot, 'places'),
      path.join(this.contentRoot, 'institutions'),
      path.join(this.contentRoot, 'media'),
      path.join(this.contentRoot, 'relationships'),
      path.join(this.contentRoot, 'manifests'),
      path.join(this.contentRoot, 'quarantine')
    ];

    dirs.forEach(d => {
      if (!fs.existsSync(d)) {
        fs.mkdirSync(d, { recursive: true });
      }
    });

    // 2. Export Objects Bundle
    const objectsBundle = {
      bundleVersion: '2.2.0',
      task: 'KH-022',
      generatedAt: new Date().toISOString(),
      totalObjects: objects.length,
      objects
    };
    fs.writeFileSync(path.join(this.contentRoot, 'objects', 'objects_bundle.json'), JSON.stringify(objectsBundle, null, 2), 'utf8');

    // Export partitions by type
    const byTypeMap = new Map<string, HeritageObject[]>();
    objects.forEach(o => {
      if (!byTypeMap.has(o.type)) byTypeMap.set(o.type, []);
      byTypeMap.get(o.type)!.push(o);
    });
    for (const [type, items] of byTypeMap.entries()) {
      fs.writeFileSync(
        path.join(this.contentRoot, 'objects', 'by_type', `${type}.json`),
        JSON.stringify({ type, count: items.length, objects: items }, null, 2),
        'utf8'
      );
    }

    // Export partitions by period
    const byPeriodMap = new Map<string, HeritageObject[]>();
    objects.forEach(o => {
      if (!byPeriodMap.has(o.period)) byPeriodMap.set(o.period, []);
      byPeriodMap.get(o.period)!.push(o);
    });
    for (const [period, items] of byPeriodMap.entries()) {
      fs.writeFileSync(
        path.join(this.contentRoot, 'objects', 'by_period', `${period.toLowerCase()}.json`),
        JSON.stringify({ period, count: items.length, objects: items }, null, 2),
        'utf8'
      );
    }

    // 3. Export Collections Bundle
    const collectionsBundle = {
      bundleVersion: '2.2.0',
      task: 'KH-022',
      generatedAt: new Date().toISOString(),
      totalCollections: MUSEUM_COLLECTIONS.length,
      collections: MUSEUM_COLLECTIONS.map(c => {
        const memberCount = objects.filter(o => o.relations?.relatedCollections?.includes(c.id) || (c.objectIds && c.objectIds.includes(o.id))).length;
        return {
          ...c,
          memberObjectCount: memberCount
        };
      })
    };
    fs.writeFileSync(path.join(this.contentRoot, 'collections', 'collections_bundle.json'), JSON.stringify(collectionsBundle, null, 2), 'utf8');

    // 4. Export Places Bundle
    const placesMap = new Map<string, { siteName: string; province: string; coordinates?: [number, number] | number[]; objectCount: number }>();
    objects.forEach(o => {
      if (o.location?.siteName) {
        const key = o.location.siteName;
        if (!placesMap.has(key)) {
          placesMap.set(key, {
            siteName: o.location.siteName,
            province: o.location.province,
            coordinates: o.location.coordinates,
            objectCount: 0
          });
        }
        placesMap.get(key)!.objectCount++;
      }
    });
    const placesBundle = {
      bundleVersion: '2.2.0',
      task: 'KH-022',
      generatedAt: new Date().toISOString(),
      totalPlaces: placesMap.size,
      places: Array.from(placesMap.values())
    };
    fs.writeFileSync(path.join(this.contentRoot, 'places', 'places_bundle.json'), JSON.stringify(placesBundle, null, 2), 'utf8');

    // 5. Export Institutions Bundle
    const instMap = new Map<string, { institution: string; license: string; sourceUrl: string; objectCount: number }>();
    objects.forEach(o => {
      const key = o.provenance.institution;
      if (!instMap.has(key)) {
        instMap.set(key, {
          institution: o.provenance.institution,
          license: o.provenance.license,
          sourceUrl: o.provenance.sourceUrl,
          objectCount: 0
        });
      }
      instMap.get(key)!.objectCount++;
    });
    const institutionsBundle = {
      bundleVersion: '2.2.0',
      task: 'KH-022',
      generatedAt: new Date().toISOString(),
      totalInstitutions: instMap.size,
      institutions: Array.from(instMap.values())
    };
    fs.writeFileSync(path.join(this.contentRoot, 'institutions', 'institutions_bundle.json'), JSON.stringify(institutionsBundle, null, 2), 'utf8');

    // 6. Export Media Manifests
    fs.writeFileSync(path.join(this.contentRoot, 'media', 'media_manifest.json'), JSON.stringify({
      manifestVersion: '2.2.0',
      task: 'KH-022',
      generatedAt: new Date().toISOString(),
      totalAssets: mediaManifest.length,
      assets: mediaManifest
    }, null, 2), 'utf8');

    fs.writeFileSync(path.join(this.contentRoot, 'media', 'pilot_media_manifest.json'), JSON.stringify({
      pilotBatchVersion: '1.0.0',
      task: 'KH-022',
      generatedAt: new Date().toISOString(),
      pilotAssetsCount: pilotMedia.length,
      pilotAssets: pilotMedia
    }, null, 2), 'utf8');

    // 7. Export Relationships Bundle
    fs.writeFileSync(path.join(this.contentRoot, 'relationships', 'relationships_bundle.json'), JSON.stringify({
      bundleVersion: '2.2.0',
      task: 'KH-022',
      generatedAt: new Date().toISOString(),
      totalEdges: relationships.length,
      relationships
    }, null, 2), 'utf8');

    // 8. Export Corpus Manifest & Quality Report
    const corpusManifest = {
      manifestVersion: '2.2.0',
      task: 'KH-022',
      title: 'Khmer Heritage Authentic Digital Museum Content Corpus',
      generatedAt: new Date().toISOString(),
      totalVerifiedObjects: objects.length,
      institutions: Array.from(instMap.keys()),
      licenseSummary: qualityReport.licenseCoverage,
      typeSummary: qualityReport.sourceCoverage,
      qualityVerdict: qualityReport.verdict
    };
    fs.writeFileSync(path.join(this.contentRoot, 'manifests', 'corpus_manifest.json'), JSON.stringify(corpusManifest, null, 2), 'utf8');
    fs.writeFileSync(path.join(this.contentRoot, 'manifests', 'quality_report.json'), JSON.stringify(qualityReport, null, 2), 'utf8');

    // 9. Export Quarantine Log
    fs.writeFileSync(path.join(this.contentRoot, 'quarantine', 'quarantine_log.json'), JSON.stringify({
      generatedAt: new Date().toISOString(),
      task: 'KH-022',
      totalQuarantined: quarantineLog.length,
      records: quarantineLog
    }, null, 2), 'utf8');

    // 10. Synchronize runtime data
    fs.writeFileSync(this.srcDataPath, JSON.stringify(objects, null, 2), 'utf8');
  }
}

export const bundleExporter = new BundleExporter();
