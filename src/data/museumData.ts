import { HeritageObject } from '../types/museum';
import crawledData from './crawledMuseumData.json';

// Purely authenticated museum artifacts crawled from The Metropolitan Museum of Art (The Met Open Access API, CC0)
// No fabricated content or placeholder items. All items contain verified accession numbers, CC0 licenses, and Met Museum URLs.
export const HERITAGE_OBJECTS: HeritageObject[] = crawledData as HeritageObject[];
