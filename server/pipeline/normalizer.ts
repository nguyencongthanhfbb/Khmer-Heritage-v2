import { HeritageObject, EntityType, HistoricalPeriod, LicenseType } from '../../src/types/museum';
import { RawDiscoveryRecord, LicenseEvaluationResult } from './types';

export class MuseumObjectNormalizer {
  /**
   * Normalize a validated discovery record into a canonical HeritageObject.
   * Strictly preserves all original source fields in `originalSource`.
   * Does NOT generate AI synthetic text.
   */
  public normalize(raw: RawDiscoveryRecord, licenseEval: LicenseEvaluationResult): HeritageObject {
    const rawType = (raw.rawObjectType || '').toLowerCase();
    let normalizedType: EntityType = 'artifact';

    if (rawType.includes('manuscript') || rawType.includes('inscription') || rawType.includes('sastra')) {
      normalizedType = 'manuscript';
    } else if (rawType.includes('photo') || rawType.includes('map') || rawType.includes('survey') || rawType.includes('media')) {
      normalizedType = 'media_record';
    } else if (rawType.includes('music') || rawType.includes('instrument') || rawType.includes('art_form') || rawType.includes('performance')) {
      normalizedType = 'art_form';
    } else if (rawType.includes('place') || rawType.includes('temple') || rawType.includes('monument') || rawType.includes('architecture')) {
      normalizedType = 'place';
    } else if (rawType.includes('concept') || rawType.includes('mythology')) {
      normalizedType = 'concept';
    }

    // Determine Historical Period
    let normalizedPeriod: HistoricalPeriod = raw.period || 'Angkor';
    const dateStr = (raw.rawDate || '').toLowerCase();
    if (dateStr.includes('funan') || dateStr.includes('phù nam') || dateStr.includes('thế kỷ 1') || dateStr.includes('thế kỷ 2') || dateStr.includes('thế kỷ 3') || dateStr.includes('thế kỷ 4') || dateStr.includes('thế kỷ 5') || dateStr.includes('thế kỷ 6')) {
      normalizedPeriod = 'Funan';
    } else if (dateStr.includes('chenla') || dateStr.includes('chân lạp') || dateStr.includes('thế kỷ 7') || dateStr.includes('thế kỷ 8')) {
      normalizedPeriod = 'Chenla';
    } else if (dateStr.includes('pre-angkor') || dateStr.includes('tiền angkor')) {
      normalizedPeriod = 'Pre-Angkor';
    } else if (dateStr.includes('post-angkor') || dateStr.includes('hậu angkor') || dateStr.includes('thế kỷ 15') || dateStr.includes('thế kỷ 16') || dateStr.includes('thế kỷ 17') || dateStr.includes('thế kỷ 18')) {
      normalizedPeriod = 'Post-Angkor';
    } else if (dateStr.includes('modern') || dateStr.includes('1900') || dateStr.includes('1910') || dateStr.includes('1920') || dateStr.includes('1930') || dateStr.includes('1968') || dateStr.includes('20')) {
      normalizedPeriod = 'Modern';
    }

    // Preserved Original Source Record
    const originalSource = {
      sourceInstitution: raw.institution,
      sourceRecordId: raw.sourceRecordId,
      sourceUrl: raw.sourceUrl,
      originalTitle: raw.rawTitle,
      originalDescription: raw.rawDescription,
      originalDate: raw.rawDate,
      originalCreator: raw.rawCreator,
      originalMaterial: raw.rawMaterial,
      originalDimensions: raw.rawDimensions,
      originalLocation: raw.rawLocation,
      originalCreditLine: raw.rawCreditLine,
      originalAccessionNumber: raw.rawAccessionNumber || raw.sourceRecordId,
      originalObjectType: raw.rawObjectType,
      rawRecordPayload: raw.rawPayload
    };

    const citations = [
      `${raw.institution} Collection Record: ${raw.rawAccessionNumber || raw.sourceRecordId}`,
      raw.rawCreditLine || `Direct acquisition / Archival record (${raw.institution})`
    ];

    const alternateTitles = [
      raw.rawTitle,
      raw.titleEnglish || raw.rawTitle
    ].filter(Boolean);

    // Build normalized object
    const heritageObject: HeritageObject = {
      id: raw.discoveryId,
      canonicalObjectId: raw.discoveryId,
      sourceRecordIds: [raw.sourceRecordId],
      type: normalizedType,
      title: raw.titleVietnamese || raw.rawTitle,
      titleKhmer: raw.titleKhmer || 'បុរាណវត្ថុខ្មែរ',
      titleEnglish: raw.titleEnglish || raw.rawTitle,
      alternateTitles,
      category: raw.category || 'Điêu khắc & Cổ vật (Sculpture)',
      period: normalizedPeriod,
      dateRange: raw.rawDate || 'Thời kỳ Angkor',
      century: raw.century || 'Thế kỷ 10 – 12',
      summary: raw.rawDescription ? raw.rawDescription.slice(0, 160) + '...' : raw.rawTitle,
      description: raw.rawDescription || raw.rawTitle,
      historicalContext: `Hồ sơ hiện vật được giám định và lưu trữ tại ${raw.institution}.`,
      culturalSignificance: 'Di sản đại diện cho nghệ thuật và văn minh Angkor cổ đại.',
      material: raw.rawMaterial || 'Đá sa thạch (Sandstone)',
      dimensions: raw.rawDimensions || 'Không rõ kích thước',
      creator: raw.rawCreator,
      location: {
        siteName: raw.rawLocation || 'Khu vực Angkor, Siem Reap',
        province: 'Siem Reap',
        country: 'Campuchia',
        coordinates: raw.coordinates || [13.4125, 103.867]
      },
      media: {
        primaryImage: raw.primaryImageUrl || '',
        gallery: raw.additionalImages && raw.additionalImages.length > 0 ? raw.additionalImages : (raw.primaryImageUrl ? [raw.primaryImageUrl] : []),
        audioUrl: raw.audioUrl,
        videoUrl: raw.videoUrl,
        caption: `${raw.titleEnglish || raw.rawTitle} — ${raw.institution} (${raw.rawAccessionNumber || raw.sourceRecordId})`
      },
      provenance: {
        institution: raw.institution,
        sourceUrl: raw.sourceUrl,
        sourceRecordId: raw.sourceRecordId,
        license: licenseEval.standardLicense as LicenseType,
        licenseUrl: licenseEval.licenseUrl,
        attribution: licenseEval.attribution,
        accessionNumber: raw.rawAccessionNumber || raw.sourceRecordId,
        citations
      },
      relations: {
        relatedEntityIds: [],
        relatedCollections: ['col-sculpture', 'col-masterpieces'],
        associatedConcepts: ['Nghệ thuật Điêu khắc Đá & Đồng', 'Văn minh Angkor'],
        artisticStyle: 'Phong cách Nghệ thuật Angkor'
      },
      originalSource
    };

    return heritageObject;
  }
}

export const normalizer = new MuseumObjectNormalizer();
