import { EntityRelationship } from '../types/museum';
import bundleData from '../../content/relationships/relationships_bundle.json';

export interface RelationshipsBundle {
  bundleVersion: string;
  task: string;
  generatedAt: string;
  totalEdges: number;
  relationships: EntityRelationship[];
}

export const RELATIONSHIPS_BUNDLE: RelationshipsBundle = bundleData as RelationshipsBundle;
export const RELATIONSHIPS_DATA: EntityRelationship[] = (bundleData as RelationshipsBundle).relationships || [];
