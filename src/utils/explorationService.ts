import { HeritageObject, EntityRelationship } from '../types/museum';
import { RELATIONSHIPS_DATA } from '../data/relationshipsData';
import { INSTITUTIONS_DATA, InstitutionRecord } from '../data/institutionsData';
import { PLACES_DATA, PlaceRecord } from '../data/placesData';
import { MUSEUM_COLLECTIONS } from '../data/collectionsData';
import { TIMELINE_EPOCHS } from '../data/timelineData';

export interface GraphNode {
  id: string;
  label: string;
  labelKhmer?: string;
  type: 'artifact' | 'collection' | 'institution' | 'place' | 'period' | 'concept';
  category?: string;
  period?: string;
  imageUrl?: string;
  institution?: string;
  objectCount?: number;
  dataRef?: any;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relationshipType: string;
  label: string;
  evidence: string;
  confidence: string;
}

export interface KnowledgeGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  stats: {
    totalNodes: number;
    totalEdges: number;
    artifactNodes: number;
    collectionNodes: number;
    institutionNodes: number;
    placeNodes: number;
    periodNodes: number;
  };
}

export interface CategorizedRelations {
  directRelationships: {
    object: HeritageObject;
    relationshipType: string;
    evidence: string;
    confidence: string;
  }[];
  sharedCollection: HeritageObject[];
  sharedPeriod: HeritageObject[];
  sharedInstitution: HeritageObject[];
  sharedMaterial: HeritageObject[];
  sharedPlace: HeritageObject[];
}

export interface MaterialTaxonomyItem {
  id: string;
  name: string;
  nameKhmer: string;
  nameEnglish: string;
  description: string;
  objectCount: number;
  sampleObjects: HeritageObject[];
  periods: string[];
}

export interface IconographyTaxonomyItem {
  id: string;
  name: string;
  nameKhmer: string;
  nameSanskrit: string;
  theology: 'Phật Giáo (Buddhism)' | 'Ấn Độ Giáo (Hinduism)' | 'Biểu Tượng Tự Nhiên & Hoàng Gia';
  description: string;
  symbolism: string;
  matchingObjectIds: string[];
  sampleObjects: HeritageObject[];
}

// 1. Build Dynamic Knowledge Graph
export function buildKnowledgeGraph(
  objects: HeritageObject[],
  filters?: {
    nodeTypes?: string[];
    relationshipTypes?: string[];
    searchQuery?: string;
    focusEntityId?: string;
    maxNodes?: number;
  }
): KnowledgeGraphData {
  const nodeMap = new Map<string, GraphNode>();
  const rawEdges = RELATIONSHIPS_DATA;

  // Add Artifact Nodes
  objects.forEach((obj) => {
    nodeMap.set(obj.id, {
      id: obj.id,
      label: obj.title,
      labelKhmer: obj.titleKhmer,
      type: 'artifact',
      category: obj.category,
      period: obj.period,
      imageUrl: obj.media.primaryImage,
      institution: obj.provenance.institution,
      dataRef: obj,
    });
  });

  // Add Collection Nodes
  MUSEUM_COLLECTIONS.forEach((col) => {
    nodeMap.set(col.id, {
      id: col.id,
      label: col.title,
      labelKhmer: col.titleKhmer,
      type: 'collection',
      objectCount: col.objectIds?.length || 0,
      imageUrl: col.representativeImage,
      dataRef: col,
    });
  });

  // Add Institution Nodes
  INSTITUTIONS_DATA.forEach((inst) => {
    const slug = `inst-${inst.institution.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
    nodeMap.set(slug, {
      id: slug,
      label: inst.institution,
      labelKhmer: inst.khmerName,
      type: 'institution',
      objectCount: inst.objectCount,
      dataRef: inst,
    });
  });

  // Add Place Nodes
  PLACES_DATA.forEach((place) => {
    const slug = `place-${place.siteName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
    nodeMap.set(slug, {
      id: slug,
      label: place.siteName,
      labelKhmer: place.khmerName,
      type: 'place',
      objectCount: place.objectCount,
      dataRef: place,
    });
  });

  // Add Historical Period Nodes
  TIMELINE_EPOCHS.forEach((epoch) => {
    const slug = `period-${epoch.id.toLowerCase()}`;
    nodeMap.set(slug, {
      id: slug,
      label: `${epoch.name} (${epoch.timeSpan})`,
      labelKhmer: epoch.nameKhmer,
      type: 'period',
      objectCount: epoch.relatedObjectIds?.length || 0,
      dataRef: epoch,
    });
  });

  // Also include base periods like period-funan, period-chenla, period-angkor, period-post-angkor
  ['Funan', 'Chenla', 'Angkor', 'Post-Angkor', 'Modern', 'Pre-Angkor'].forEach((p) => {
    const slug = `period-${p.toLowerCase()}`;
    if (!nodeMap.has(slug)) {
      nodeMap.set(slug, {
        id: slug,
        label: `Thời kỳ ${p}`,
        type: 'period',
      });
    }
  });

  // Process and link edges
  const edges: GraphEdge[] = [];
  rawEdges.forEach((rel, idx) => {
    if (nodeMap.has(rel.sourceId) && nodeMap.has(rel.targetId)) {
      let relationshipLabel = 'Liên kết';
      if (rel.relationshipType === 'housed_at_institution') relationshipLabel = 'Lưu trữ tại Viện';
      else if (rel.relationshipType === 'created_in_period') relationshipLabel = 'Chế tác trong Thời kỳ';
      else if (rel.relationshipType === 'located_at_place') relationshipLabel = 'Khai quật / Tọa lạc tại';
      else if (rel.relationshipType === 'belongs_to_collection') relationshipLabel = 'Thuộc Bộ sưu tập';
      else if (rel.relationshipType === 'stylistically_related') relationshipLabel = 'Tương đồng phong cách';
      else if (rel.relationshipType === 'associated_with_ruler') relationshipLabel = 'Liên hệ Triều đại / Vua';
      else if (rel.relationshipType === 'contextually_related') relationshipLabel = 'Bối cảnh Văn hóa';

      edges.push({
        id: `edge-${idx}-${rel.sourceId}-${rel.targetId}`,
        source: rel.sourceId,
        target: rel.targetId,
        relationshipType: rel.relationshipType,
        label: relationshipLabel,
        evidence: rel.evidence,
        confidence: rel.confidence || 'HIGH',
      });
    }
  });

  let filteredNodes = Array.from(nodeMap.values());
  let filteredEdges = edges;

  // Filter by Focus Entity ID (Neighborhood subgraph)
  if (filters?.focusEntityId) {
    const focalId = filters.focusEntityId;
    const connectedNodeIds = new Set<string>([focalId]);

    edges.forEach((edge) => {
      if (edge.source === focalId) connectedNodeIds.add(edge.target);
      if (edge.target === focalId) connectedNodeIds.add(edge.source);
    });

    filteredNodes = filteredNodes.filter((n) => connectedNodeIds.has(n.id));
    filteredEdges = filteredEdges.filter(
      (e) => connectedNodeIds.has(e.source) && connectedNodeIds.has(e.target)
    );
  }

  // Filter by Node Types
  if (filters?.nodeTypes && filters.nodeTypes.length > 0 && !filters.nodeTypes.includes('all')) {
    const allowed = new Set(filters.nodeTypes);
    filteredNodes = filteredNodes.filter((n) => allowed.has(n.type));
    const validIds = new Set(filteredNodes.map((n) => n.id));
    filteredEdges = filteredEdges.filter(
      (e) => validIds.has(e.source) && validIds.has(e.target)
    );
  }

  // Filter by Relationship Types
  if (filters?.relationshipTypes && filters.relationshipTypes.length > 0 && !filters.relationshipTypes.includes('all')) {
    const allowedRels = new Set(filters.relationshipTypes);
    filteredEdges = filteredEdges.filter((e) => allowedRels.has(e.relationshipType));
    const activeConnectedIds = new Set<string>();
    filteredEdges.forEach((e) => {
      activeConnectedIds.add(e.source);
      activeConnectedIds.add(e.target);
    });
    filteredNodes = filteredNodes.filter((n) => activeConnectedIds.has(n.id));
  }

  // Search filter
  if (filters?.searchQuery && filters.searchQuery.trim()) {
    const q = filters.searchQuery.toLowerCase();
    const matchingNodeIds = new Set<string>();
    filteredNodes.forEach((n) => {
      if (
        n.label.toLowerCase().includes(q) ||
        (n.labelKhmer && n.labelKhmer.includes(q)) ||
        (n.period && n.period.toLowerCase().includes(q)) ||
        (n.category && n.category.toLowerCase().includes(q))
      ) {
        matchingNodeIds.add(n.id);
      }
    });

    // Also include 1-hop connected nodes to the matched search results
    const fullMatchedIds = new Set(matchingNodeIds);
    filteredEdges.forEach((e) => {
      if (matchingNodeIds.has(e.source)) fullMatchedIds.add(e.target);
      if (matchingNodeIds.has(e.target)) fullMatchedIds.add(e.source);
    });

    filteredNodes = filteredNodes.filter((n) => fullMatchedIds.has(n.id));
    filteredEdges = filteredEdges.filter(
      (e) => fullMatchedIds.has(e.source) && fullMatchedIds.has(e.target)
    );
  }

  // Node cap limit for rendering performance if specified
  if (filters?.maxNodes && filteredNodes.length > filters.maxNodes) {
    const topNodes = filteredNodes.slice(0, filters.maxNodes);
    const topIds = new Set(topNodes.map((n) => n.id));
    filteredNodes = topNodes;
    filteredEdges = filteredEdges.filter((e) => topIds.has(e.source) && topIds.has(e.target));
  }

  return {
    nodes: filteredNodes,
    edges: filteredEdges,
    stats: {
      totalNodes: filteredNodes.length,
      totalEdges: filteredEdges.length,
      artifactNodes: filteredNodes.filter((n) => n.type === 'artifact').length,
      collectionNodes: filteredNodes.filter((n) => n.type === 'collection').length,
      institutionNodes: filteredNodes.filter((n) => n.type === 'institution').length,
      placeNodes: filteredNodes.filter((n) => n.type === 'place').length,
      periodNodes: filteredNodes.filter((n) => n.type === 'period').length,
    },
  };
}

// 2. Get Categorized Related Objects for Object Detail
export function getCategorizedRelatedObjects(
  targetObject: HeritageObject,
  allObjects: HeritageObject[]
): CategorizedRelations {
  const directRelMap = new Map<string, { relationshipType: string; evidence: string; confidence: string }>();

  // Find explicit links from RELATIONSHIPS_DATA
  RELATIONSHIPS_DATA.forEach((rel) => {
    if (rel.sourceId === targetObject.id && rel.targetType === 'artifact') {
      directRelMap.set(rel.targetId, {
        relationshipType: rel.relationshipType,
        evidence: rel.evidence,
        confidence: rel.confidence || 'HIGH',
      });
    } else if (rel.targetId === targetObject.id && rel.sourceType === 'artifact') {
      directRelMap.set(rel.sourceId, {
        relationshipType: rel.relationshipType,
        evidence: rel.evidence,
        confidence: rel.confidence || 'HIGH',
      });
    }
  });

  // Also check object.relations.relatedEntityIds
  if (targetObject.relations?.relatedEntityIds) {
    targetObject.relations.relatedEntityIds.forEach((id) => {
      if (!directRelMap.has(id)) {
        directRelMap.set(id, {
          relationshipType: 'stylistically_related',
          evidence: 'Liên kết thực thể cùng phong cách nghệ thuật hoặc niên đại khai quật.',
          confidence: 'HIGH',
        });
      }
    });
  }

  const directRelationships = Array.from(directRelMap.entries())
    .map(([id, info]) => {
      const obj = allObjects.find((o) => o.id === id);
      return obj ? { object: obj, ...info } : null;
    })
    .filter(Boolean) as {
      object: HeritageObject;
      relationshipType: string;
      evidence: string;
      confidence: string;
    }[];

  // Shared metadata calculations
  const otherObjects = allObjects.filter((o) => o.id !== targetObject.id);

  const sharedCollection = otherObjects.filter((o) =>
    o.relations?.relatedCollections?.some((c) => targetObject.relations?.relatedCollections?.includes(c))
  );

  const sharedPeriod = otherObjects.filter((o) => o.period === targetObject.period);

  const sharedInstitution = otherObjects.filter(
    (o) => o.provenance?.institution === targetObject.provenance?.institution
  );

  const targetMaterial = (targetObject.material || targetObject.originalSource?.originalMaterial || '').toLowerCase();
  const sharedMaterial = otherObjects.filter((o) => {
    const oMat = (o.material || o.originalSource?.originalMaterial || '').toLowerCase();
    if (targetMaterial.includes('sa thạch') || targetMaterial.includes('sandstone') || targetMaterial.includes('đá')) {
      return oMat.includes('sa thạch') || oMat.includes('sandstone') || oMat.includes('đá');
    }
    if (targetMaterial.includes('đồng') || targetMaterial.includes('bronze')) {
      return oMat.includes('đồng') || oMat.includes('bronze');
    }
    if (targetMaterial.includes('gỗ') || targetMaterial.includes('wood')) {
      return oMat.includes('gỗ') || oMat.includes('wood');
    }
    if (targetMaterial.includes('vàng') || targetMaterial.includes('gold')) {
      return oMat.includes('vàng') || oMat.includes('gold');
    }
    return false;
  });

  const sharedPlace = otherObjects.filter(
    (o) =>
      targetObject.location?.siteName &&
      o.location?.siteName &&
      (o.location.siteName === targetObject.location.siteName ||
        o.location.province === targetObject.location.province)
  );

  return {
    directRelationships,
    sharedCollection: sharedCollection.slice(0, 6),
    sharedPeriod: sharedPeriod.slice(0, 6),
    sharedInstitution: sharedInstitution.slice(0, 6),
    sharedMaterial: sharedMaterial.slice(0, 6),
    sharedPlace: sharedPlace.slice(0, 6),
  };
}

// 3. Material Taxonomy & Explorer Service
export function getMaterialTaxonomy(objects: HeritageObject[]): MaterialTaxonomyItem[] {
  const taxonomy: {
    id: string;
    name: string;
    nameKhmer: string;
    nameEnglish: string;
    description: string;
    matcher: (o: HeritageObject) => boolean;
  }[] = [
    {
      id: 'stone',
      name: 'Đá Sa Thạch & Đá Quý',
      nameKhmer: 'ថ្មភក់ (Sandstone)',
      nameEnglish: 'Sandstone & Stone Sculpture',
      description: 'Chất liệu chủ đạo tạo nên sự hùng vĩ của nền kiến trúc và điêu khắc Khmer từ sa thạch xám, hồng và xanh khai thác từ núi Kulen.',
      matcher: (o) => {
        const m = ((o.material || '') + ' ' + (o.originalSource?.originalMaterial || '')).toLowerCase();
        return m.includes('sa thạch') || m.includes('sandstone') || m.includes('đá') || m.includes('stone') || m.includes('quartzite');
      },
    },
    {
      id: 'bronze',
      name: 'Đồng Thau & Kim Khí',
      nameKhmer: 'សំរិទ្ធ (Bronze)',
      nameEnglish: 'Bronze & Cast Alloys',
      description: 'Nghệ thuật đúc đồng sáp ong (lost-wax casting) đạt đỉnh cao với các pho tượng Bồ Tát Maitreya, Phật Thích Ca và nhạc cụ thiêng.',
      matcher: (o) => {
        const m = ((o.material || '') + ' ' + (o.originalSource?.originalMaterial || '')).toLowerCase();
        return m.includes('đồng') || m.includes('bronze') || m.includes('hợp kim') || m.includes('alloy');
      },
    },
    {
      id: 'wood',
      name: 'Gỗ Quý Chạm Khắc',
      nameKhmer: 'ឈើឆ្លាក់ (Carved Wood)',
      nameEnglish: 'Polychrome & Carved Wood',
      description: 'Các tác phẩm phù điêu bao lơn, tượng thờ Phật giáo Thập bát La hán và nhạc cụ truyền thống như đàn Roneat Ek.',
      matcher: (o) => {
        const m = ((o.material || '') + ' ' + (o.originalSource?.originalMaterial || '')).toLowerCase();
        return m.includes('gỗ') || m.includes('wood') || m.includes('teak') || m.includes('sơn son');
      },
    },
    {
      id: 'precious_metals',
      name: 'Vàng, Bạc & Trang Sức Hoàng Gia',
      nameKhmer: 'មាស និងប្រាក់ (Gold & Silver)',
      nameEnglish: 'Gold, Silver & Royal Jewelry',
      description: 'Vương miện, hoa tai, pháp khí nạm ngọc phục vụ các nghi lễ đăng quang và cúng dường thánh thần.',
      matcher: (o) => {
        const m = ((o.material || '') + ' ' + (o.originalSource?.originalMaterial || '')).toLowerCase();
        return m.includes('vàng') || m.includes('gold') || m.includes('bạc') || m.includes('silver') || m.includes('mạ vàng');
      },
    },
    {
      id: 'palm_leaf',
      name: 'Lá Buông & Bản Thảo Cổ',
      nameKhmer: 'ស្លឹករឹត (Palm-Leaf Manuscripts)',
      nameEnglish: 'Palm-leaf Manuscripts & Epigraphy',
      description: 'Kinh điển Phật giáo Olan được khắc chữ Pali - Khmer cổ trên lá cây buông đã qua xử lý bí truyền, lưu giữ qua hàng trăm năm.',
      matcher: (o) => {
        const m = ((o.material || '') + ' ' + (o.originalSource?.originalMaterial || '') + ' ' + o.category).toLowerCase();
        return m.includes('lá buông') || m.includes('palm') || m.includes('kinh lá') || m.includes('manuscript') || o.type === 'manuscript';
      },
    },
    {
      id: 'silk_textile',
      name: 'Lụa Tơ Tằm & Dệt Ikat Hol',
      nameKhmer: 'សូត្រខ្មែរ (Khmer Silk Ikat)',
      nameEnglish: 'Traditional Silk Ikat (Pidarn)',
      description: 'Kỹ thuật dệt hoa văn hình học và tích truyện Phật giáo Pidarn tinh xảo bậc nhất Đông Nam Á.',
      matcher: (o) => {
        const m = ((o.material || '') + ' ' + (o.originalSource?.originalMaterial || '') + ' ' + o.category).toLowerCase();
        return m.includes('lụa') || m.includes('silk') || m.includes('ikat') || m.includes('dệt') || m.includes('textile');
      },
    },
  ];

  return taxonomy.map((tax) => {
    const matching = objects.filter(tax.matcher);
    const periods = Array.from(new Set(matching.map((o) => o.period))).filter(Boolean);
    return {
      id: tax.id,
      name: tax.name,
      nameKhmer: tax.nameKhmer,
      nameEnglish: tax.nameEnglish,
      description: tax.description,
      objectCount: matching.length,
      sampleObjects: matching.slice(0, 8),
      periods,
    };
  }).filter((item) => item.objectCount > 0);
}

// 4. Iconography & Theological Motifs Taxonomy
export function getIconographyTaxonomy(objects: HeritageObject[]): IconographyTaxonomyItem[] {
  const motifs: {
    id: string;
    name: string;
    nameKhmer: string;
    nameSanskrit: string;
    theology: 'Phật Giáo (Buddhism)' | 'Ấn Độ Giáo (Hinduism)' | 'Biểu Tượng Tự Nhiên & Hoàng Gia';
    description: string;
    symbolism: string;
    keywords: string[];
  }[] = [
    {
      id: 'buddha-naga',
      name: 'Đức Phật Tọa Thiền Trên Thân Rắn Naga (Mucalinda)',
      nameKhmer: 'ព្រះពុទ្ធប្រក់នាគ',
      nameSanskrit: 'Buddha Mucalinda',
      theology: 'Phật Giáo (Buddhism)',
      description: 'Biểu tượng Phật giáo đỉnh cao thời kỳ vua Jayavarman VII. Rắn thần Naga 7 đầu vươn mang che mưa bão cho Đức Phật khi Ngài đang thiền định.',
      symbolism: 'Sự che chở của giáo pháp, sự dung hợp giữa tín ngưỡng bản địa thờ rắn nước và Phật giáo Đại thừa.',
      keywords: ['phật', 'buddha', 'naga', 'mucalinda', 'thiền định', 'bảo hộ'],
    },
    {
      id: 'vishnu-anantasayin',
      name: 'Thần Vishnu & Tư Thế Yên Nghỉ Trên Đại Dương Vũ Trụ',
      nameKhmer: 'ព្រះវិស្ណុ',
      nameSanskrit: 'Vishnu Anantasayin / Narayana',
      theology: 'Ấn Độ Giáo (Hinduism)',
      description: 'Đấng bảo hộ vũ trụ với 4 tay cầm vỏ ốc Shankha, đĩa luân Chakra, bảo trùy Gada và búp sen Padma.',
      symbolism: 'Quyền năng bảo tồn trật tự cõi thế gian (Dharma), chu kỳ sinh diệt và tái sinh của vũ trụ.',
      keywords: ['vishnu', 'vi-snu', 'narayana', 'anantasayin', 'bảo hộ', '4 tay', 'đĩa luân'],
    },
    {
      id: 'shiva-linga',
      name: 'Thần Shiva & Ngẫu Tượng Linga - Yoni',
      nameKhmer: 'ព្រះសិវៈ / លិង្គ',
      nameSanskrit: 'Shiva Mahadeva / Linga',
      theology: 'Ấn Độ Giáo (Hinduism)',
      description: 'Đấng Hủy Diệt và Tái Thiết. Hiện thân qua ngọn lửa thứ ba trên trán, trăng khuyết và biểu tượng Linga biểu thị nguồn năng lượng vũ trụ sáng tạo.',
      symbolism: 'Sự sáng tạo vô biên, nguồn cội của sự sống và quyền uy thiêng liêng của các vị vua thần Devaraja.',
      keywords: ['shiva', 'si-va', 'linga', 'yoni', 'mắt thứ ba', 'hủy diệt', 'tái sinh'],
    },
    {
      id: 'apsara-devata',
      name: 'Tiên Nữ Vũ Công Apsara & Nữ Thần Devata',
      nameKhmer: 'អប្សរា / ទេវតា',
      nameSanskrit: 'Apsara & Devata',
      theology: 'Biểu Tượng Tự Nhiên & Hoàng Gia',
      description: 'Những linh hồn thiêng liêng sinh ra từ cuộc Khuấy Biển Sữa, với nụ cười bí ẩn và vũ điệu uyển chuyển dẫn dắt cõi tiên.',
      symbolism: 'Cái đẹp thanh cao, ân sủng thiên đình và sự hòa hợp giữa cõi trời và cõi người.',
      keywords: ['apsara', 'devata', 'vũ công', 'tiên nữ', 'khuấy biển sữa'],
    },
    {
      id: 'harihara',
      name: 'Thần Hợp Thể Harihara (Vishnu + Shiva)',
      nameKhmer: 'ព្រះហរិហរៈ',
      nameSanskrit: 'Harihara Syncretism',
      theology: 'Ấn Độ Giáo (Hinduism)',
      description: 'Sự kết hợp hoàn hảo trên cùng một pho tượng: Nửa bên phải là Shiva (với búi tóc jatamukuta, đinh ba, mắt thứ ba), nửa bên trái là Vishnu (với mũ trụ kirita, vỏ ốc).',
      symbolism: 'Sự hòa hợp tôn giáo tuyệt đối giữa hai phái Vaishnavism và Shaivism trong giai đoạn Tiền Angkor.',
      keywords: ['harihara', 'hợp thể', 'đồng nhất', 'tiền angkor', 'phnom da', 'prasat andet'],
    },
    {
      id: 'garuda',
      name: 'Kim Sí Điểu Garuda — Thần Thú Cưỡi Của Vishnu',
      nameKhmer: 'គ្រុឌ (Garuda)',
      nameSanskrit: 'Garuda Vahana',
      theology: 'Ấn Độ Giáo (Hinduism)',
      description: 'Loài chim ưng thần thoại mang sức mạnh dũng mãnh, khắc tinh của loài rắn Naga và là vật cưỡi của thần Vishnu.',
      symbolism: 'Sức mạnh bầu trời, chiến thắng trước bóng tối và sự trung thành tuyệt đối.',
      keywords: ['garuda', 'kim sí điểu', 'chim thần', 'đôi cánh', 'kẻ thù naga'],
    },
    {
      id: 'ganesha',
      name: 'Thần Đầu Voi Ganesha — Đấng Trí Tuệ & May Mắn',
      nameKhmer: 'ព្រះគណេស',
      nameSanskrit: 'Ganesha / Ganapati',
      theology: 'Ấn Độ Giáo (Hinduism)',
      description: 'Con trai của thần Shiva và nữ thần Parvati, với thân hình đầy đặn, đầu voi và một chiếc ngà gãy, biểu tượng của sự vượt qua chướng ngại.',
      symbolism: 'Trí tuệ uyên bác, may mắn trong học vấn và khởi đầu những công trình kiến trúc mới.',
      keywords: ['ganesha', 'đầu voi', 'trí tuệ', 'may mắn', 'chướng ngại'],
    },
    {
      id: 'lintel-kala',
      name: 'Phù Điêu Lanh-tô & Quái Thú Thời Gian Kala / Rahu',
      nameKhmer: 'ផ្តែរប្រាសាទ និងកាលា',
      nameSanskrit: 'Lintel & Kirtimukha / Kala',
      theology: 'Biểu Tượng Tự Nhiên & Hoàng Gia',
      description: 'Mặt quái thú Kala há miệng phun ra các dải hoa lá cuộn xoắn trên vòm cửa đền đài, xua đuổi tà khí và bảo vệ không gian thánh tích.',
      symbolism: 'Sức mạnh thời gian nuốt chửng vạn vật, ranh giới giữa cõi trần và cõi thiêng.',
      keywords: ['lanh-tô', 'lintel', 'kala', 'rahu', 'kirtimukha', 'vòm cửa', 'phù điêu'],
    },
  ];

  return motifs.map((motif) => {
    const matching = objects.filter((o) => {
      const text = (
        o.title + ' ' +
        o.titleEnglish + ' ' +
        o.titleKhmer + ' ' +
        o.summary + ' ' +
        (o.historicalContext || '') + ' ' +
        (o.culturalSignificance || '') + ' ' +
        (o.relations?.associatedConcepts || []).join(' ') + ' ' +
        (o.hotspots || []).map((h) => h.label + ' ' + h.theologicalMeaning + ' ' + h.description).join(' ')
      ).toLowerCase();

      return motif.keywords.some((kw) => text.includes(kw));
    });

    return {
      id: motif.id,
      name: motif.name,
      nameKhmer: motif.nameKhmer,
      nameSanskrit: motif.nameSanskrit,
      theology: motif.theology,
      description: motif.description,
      symbolism: motif.symbolism,
      matchingObjectIds: matching.map((m) => m.id),
      sampleObjects: matching.slice(0, 8),
    };
  }).filter((m) => m.matchingObjectIds.length > 0);
}
