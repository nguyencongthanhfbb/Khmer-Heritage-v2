import { HeritageObject } from '../../src/types/museum';

export interface DeduplicationResult {
  canonicalObjects: HeritageObject[];
  mergedCount: number;
  mergeLogs: Array<{
    canonicalId: string;
    mergedSourceIds: string[];
    reason: string;
  }>;
}

export class CanonicalDeduplicator {
  /**
   * Deduplicate records into canonical heritage objects.
   * Preserves all sourceRecordIds and combines alternate titles / galleries.
   */
  public deduplicate(objects: HeritageObject[]): DeduplicationResult {
    const canonicalMap = new Map<string, HeritageObject>();
    const mergeLogs: Array<{ canonicalId: string; mergedSourceIds: string[]; reason: string }> = [];
    let mergedCount = 0;

    for (const obj of objects) {
      // Deduplication key: Normalized accession number or canonical ID
      const canonicalKey = obj.id;

      if (!canonicalMap.has(canonicalKey)) {
        canonicalMap.set(canonicalKey, {
          ...obj,
          sourceRecordIds: obj.sourceRecordIds || [obj.provenance.sourceRecordId || obj.id]
        });
      } else {
        // Record exists, merge into canonical
        const existing = canonicalMap.get(canonicalKey)!;
        const combinedSourceIds = Array.from(new Set([
          ...(existing.sourceRecordIds || []),
          ...(obj.sourceRecordIds || []),
          obj.provenance.sourceRecordId || obj.id
        ]));

        const combinedAltTitles = Array.from(new Set([
          ...(existing.alternateTitles || []),
          ...(obj.alternateTitles || []),
          obj.title,
          obj.titleEnglish
        ])).filter(Boolean);

        const combinedGallery = Array.from(new Set([
          ...(existing.media.gallery || []),
          ...(obj.media.gallery || [])
        ]));

        existing.sourceRecordIds = combinedSourceIds;
        existing.alternateTitles = combinedAltTitles;
        existing.media.gallery = combinedGallery;

        mergedCount++;
        mergeLogs.push({
          canonicalId: canonicalKey,
          mergedSourceIds: combinedSourceIds,
          reason: `Unified duplicate source record under canonical ID ${canonicalKey}`
        });
      }
    }

    return {
      canonicalObjects: Array.from(canonicalMap.values()),
      mergedCount,
      mergeLogs
    };
  }
}

export const deduplicator = new CanonicalDeduplicator();
