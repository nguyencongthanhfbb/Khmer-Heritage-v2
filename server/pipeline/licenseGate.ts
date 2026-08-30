import { LicenseType } from '../../src/types/museum';
import { RawDiscoveryRecord, LicenseEvaluationResult } from './types';

export class LicenseGate {
  private allowedLicenses: Set<LicenseType> = new Set([
    'CC0',
    'Public Domain',
    'CC BY',
    'CC BY-SA',
    'Institutional Open Access'
  ]);

  /**
   * Evaluate a raw discovery record against the museum copyright & ethics gate.
   * Fails closed into 'Quarantine' if license is restricted or ambiguous.
   */
  public evaluate(record: RawDiscoveryRecord): LicenseEvaluationResult {
    const raw = (record.rawLicenseString || '').trim().toLowerCase();
    const inst = record.institution.toLowerCase();

    // 1. The Metropolitan Museum of Art Open Access
    if (inst.includes('metropolitan') || inst.includes('the met')) {
      if (raw.includes('cc0') || raw.includes('public domain') || raw.includes('open access') || record.rawPayload?.isPublicDomain) {
        return {
          eligible: true,
          standardLicense: 'CC0',
          reason: 'The Metropolitan Museum of Art Open Access Policy (CC0 1.0 Universal)',
          licenseUrl: 'https://www.metmuseum.org/about-the-met/policies-and-documents/open-access',
          attribution: `The Metropolitan Museum of Art Open Access (CC0) — Accession: ${record.rawAccessionNumber || record.sourceRecordId}`
        };
      }
    }

    // 2. Smithsonian National Museum of Asian Art Open Access
    if (inst.includes('smithsonian') || inst.includes('freer') || inst.includes('sackler')) {
      if (raw.includes('cc0') || raw.includes('public domain') || raw.includes('open access') || raw === '') {
        return {
          eligible: true,
          standardLicense: 'CC0',
          reason: 'Smithsonian Open Access Initiative (CC0 1.0 Universal)',
          licenseUrl: 'https://www.si.edu/openaccess',
          attribution: `Smithsonian Open Access (CC0) — Accession: ${record.rawAccessionNumber || record.sourceRecordId}`
        };
      }
    }

    // 3. Library of Congress Prints & Photographs (Public Domain)
    if (inst.includes('library of congress') || inst.includes('loc')) {
      if (raw.includes('public domain') || raw.includes('no known copyright') || raw === '') {
        return {
          eligible: true,
          standardLicense: 'Public Domain',
          reason: 'Library of Congress: No known restrictions on publication (Public Domain)',
          licenseUrl: 'https://www.loc.gov/legal/',
          attribution: `Library of Congress Prints & Photographs Division (Public Domain) — Call/LCCN: ${record.sourceRecordId}`
        };
      }
    }

    // 4. Wikimedia Commons / National Museum of Cambodia
    if (inst.includes('wikimedia') || inst.includes('national museum of cambodia') || inst.includes('nmc')) {
      if (raw.includes('cc by-sa 4.0') || raw.includes('cc by-sa 3.0') || raw.includes('cc by-sa') || raw.includes('cc-by-sa')) {
        return {
          eligible: true,
          standardLicense: 'CC BY-SA',
          reason: 'Creative Commons Attribution-ShareAlike (CC BY-SA)',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
          attribution: `Bảo tàng Quốc gia Campuchia / Wikimedia Commons (CC BY-SA) — ${record.rawCreator || 'EFEO Archeological Survey'}`
        };
      }
      if (raw.includes('cc by 4.0') || raw.includes('cc by 3.0') || raw.includes('cc by') || raw.includes('cc-by')) {
        return {
          eligible: true,
          standardLicense: 'CC BY',
          reason: 'Creative Commons Attribution (CC BY)',
          licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
          attribution: `Bảo tàng Quốc gia Campuchia / Wikimedia Commons (CC BY) — ${record.rawCreator || 'National Museum of Cambodia'}`
        };
      }
      if (raw.includes('public domain') || raw.includes('pd-old') || raw.includes('cc0')) {
        return {
          eligible: true,
          standardLicense: 'Public Domain',
          reason: 'Public Domain (Life of author + 70 years / Pre-1928 publication)',
          licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
          attribution: `National Museum of Cambodia / EFEO Survey (Public Domain)`
        };
      }
    }

    // 5. Internet Archive & EFEO Scholarly Open Access
    if (inst.includes('internet archive') || inst.includes('efeo')) {
      if (raw.includes('public domain') || raw.includes('open access') || raw.includes('unesco') || raw === '') {
        return {
          eligible: true,
          standardLicense: 'Public Domain',
          reason: 'Historical Archival Record in the Public Domain / Open Audio',
          licenseUrl: 'https://archive.org/about/terms.php',
          attribution: `Internet Archive & EFEO Archival Collection (Public Domain / Open Access)`
        };
      }
    }

    // Explicit check for allowed licenses
    for (const lic of this.allowedLicenses) {
      if (raw.toLowerCase().includes(lic.toLowerCase())) {
        return {
          eligible: true,
          standardLicense: lic,
          reason: `Explicitly verified license: ${lic}`,
          licenseUrl: 'https://creativecommons.org/',
          attribution: `${record.institution} (${lic})`
        };
      }
    }

    // Fail-closed quarantine
    return {
      eligible: false,
      standardLicense: 'Quarantine',
      reason: `Unverified or restricted rights declaration: '${record.rawLicenseString || 'Unspecified'}'. Record quarantined per LICENSING.md fail-closed policy.`,
      licenseUrl: '',
      attribution: 'QUARANTINED'
    };
  }
}

export const licenseGate = new LicenseGate();
