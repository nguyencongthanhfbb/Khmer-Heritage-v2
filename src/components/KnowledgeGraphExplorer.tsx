import React, { useState, useMemo, useRef, useEffect } from 'react';
import { HeritageObject } from '../types/museum';
import { 
  buildKnowledgeGraph, 
  GraphNode, 
  GraphEdge, 
  KnowledgeGraphData 
} from '../utils/explorationService';
import { MuseumImage } from './MuseumImage';
import { 
  Network, 
  Search, 
  Filter, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Layers, 
  Landmark, 
  MapPin, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Info, 
  ShieldCheck, 
  Compass, 
  Share2,
  ExternalLink,
  ChevronRight,
  Eye,
  SlidersHorizontal,
  ListFilter
} from 'lucide-react';

interface KnowledgeGraphExplorerProps {
  objects: HeritageObject[];
  onSelectObject: (id: string) => void;
  initialFocusId?: string | null;
  onNavigateTab?: (tab: string) => void;
}

export const KnowledgeGraphExplorer: React.FC<KnowledgeGraphExplorerProps> = ({
  objects,
  onSelectObject,
  initialFocusId,
  onNavigateTab,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNodeType, setSelectedNodeType] = useState<string>('all');
  const [selectedRelType, setSelectedRelType] = useState<string>('all');
  const [focusEntityId, setFocusEntityId] = useState<string | null>(initialFocusId || null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(initialFocusId || 'kh-met-38451');
  const [viewMode, setViewMode] = useState<'canvas' | 'matrix'>('canvas');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Sync initialFocusId if prop changes
  useEffect(() => {
    if (initialFocusId) {
      setFocusEntityId(initialFocusId);
      setSelectedNodeId(initialFocusId);
    }
  }, [initialFocusId]);

  // Compute graph data
  const graphData: KnowledgeGraphData = useMemo(() => {
    return buildKnowledgeGraph(objects, {
      nodeTypes: selectedNodeType === 'all' ? undefined : [selectedNodeType],
      relationshipTypes: selectedRelType === 'all' ? undefined : [selectedRelType],
      searchQuery: searchQuery.trim() || undefined,
      focusEntityId: focusEntityId || undefined,
      maxNodes: 85, // Cap for high FPS canvas rendering
    });
  }, [objects, selectedNodeType, selectedRelType, searchQuery, focusEntityId]);

  // Selected node inspection
  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return graphData.nodes[0] || null;
    return graphData.nodes.find((n) => n.id === selectedNodeId) || null;
  }, [selectedNodeId, graphData.nodes]);

  // Connected edges for selected node
  const selectedNodeEdges = useMemo(() => {
    if (!selectedNode) return [];
    return graphData.edges.filter(
      (e) => e.source === selectedNode.id || e.target === selectedNode.id
    );
  }, [selectedNode, graphData.edges]);

  // Node position calculation for SVG network canvas
  const nodePositions = useMemo(() => {
    const positions = new Map<string, { x: number; y: number }>();
    const count = graphData.nodes.length;
    if (count === 0) return positions;

    const width = 800;
    const height = 550;
    const centerX = width / 2;
    const centerY = height / 2;

    // Cluster centers by node type
    const clusterCenters: Record<string, { x: number; y: number }> = {
      artifact: { x: centerX, y: centerY },
      collection: { x: centerX - 260, y: centerY - 160 },
      institution: { x: centerX + 260, y: centerY - 160 },
      place: { x: centerX - 260, y: centerY + 160 },
      period: { x: centerX + 260, y: centerY + 160 },
      concept: { x: centerX, y: centerY - 200 },
    };

    // Calculate deterministic orbital layout
    graphData.nodes.forEach((node, idx) => {
      if (focusEntityId && node.id === focusEntityId) {
        positions.set(node.id, { x: centerX, y: centerY });
        return;
      }

      const cluster = clusterCenters[node.type] || { x: centerX, y: centerY };
      const sameTypeNodes = graphData.nodes.filter((n) => n.type === node.type);
      const indexInType = sameTypeNodes.findIndex((n) => n.id === node.id);
      const angle = (indexInType / (sameTypeNodes.length || 1)) * 2 * Math.PI;
      const radius = node.type === 'artifact' ? 140 + (indexInType % 3) * 50 : 60 + (indexInType % 2) * 30;

      const x = cluster.x + Math.cos(angle) * radius;
      const y = cluster.y + Math.sin(angle) * radius;

      positions.set(node.id, {
        x: Math.max(40, Math.min(width - 40, x)),
        y: Math.max(40, Math.min(height - 40, y)),
      });
    });

    return positions;
  }, [graphData.nodes, focusEntityId]);

  // Handle Drag / Pan
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setFocusEntityId(null);
    setSelectedNodeType('all');
    setSelectedRelType('all');
    setSearchQuery('');
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'artifact':
        return { bg: '#d97706', border: '#fbbf24', text: '#fef3c7', label: 'Hiện Vật' };
      case 'collection':
        return { bg: '#059669', border: '#34d399', text: '#d1fae5', label: 'Bộ Sưu Tập' };
      case 'institution':
        return { bg: '#0284c7', border: '#38bdf8', text: '#e0f2fe', label: 'Bảo Tàng' };
      case 'place':
        return { bg: '#e11d48', border: '#fb7185', text: '#ffe4e6', label: 'Địa Danh' };
      case 'period':
        return { bg: '#7c3aed', border: '#a78bfa', text: '#ede9fe', label: 'Thời Kỳ' };
      default:
        return { bg: '#57534e', border: '#a8a29e', text: '#f5f5f4', label: 'Khái Niệm' };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16" id="knowledge-graph-explorer">
      
      {/* Header Banner & Graph Stats */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Network className="w-6 h-6" />
              </span>
              <span className="text-xs uppercase tracking-widest font-mono text-amber-400">
                Đồ Thị Tri Thức Bảo Tàng Số • 562 Mối Quan Hệ
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100 tracking-tight">
              Khám Phá Mạng Lưới Di Sản Khmer
            </h1>
            <p className="mt-2 text-sm sm:text-base text-stone-300 max-w-3xl font-serif leading-relaxed">
              Trực quan hóa đồ thị tri thức đa chiều kết nối <strong>73 hiện vật xác thực</strong>, 
              <strong> 6 bộ sưu tập</strong>, <strong> 15 địa danh khảo cổ</strong> và 
              <strong> 8 viện bảo tàng quốc tế</strong> dựa trên bằng chứng tư liệu lịch sử.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 bg-stone-950/80 p-3 rounded-2xl border border-stone-800">
            <div className="text-center px-2 py-1">
              <div className="text-lg font-bold text-amber-400 font-mono">{graphData.stats.artifactNodes}</div>
              <div className="text-[10px] text-stone-400 uppercase">Hiện Vật</div>
            </div>
            <div className="text-center px-2 py-1 border-l border-stone-800">
              <div className="text-lg font-bold text-emerald-400 font-mono">{graphData.stats.collectionNodes}</div>
              <div className="text-[10px] text-stone-400 uppercase">Bộ Sưu Tập</div>
            </div>
            <div className="text-center px-2 py-1 border-l border-stone-800">
              <div className="text-lg font-bold text-sky-400 font-mono">{graphData.stats.institutionNodes}</div>
              <div className="text-[10px] text-stone-400 uppercase">Bảo Tàng</div>
            </div>
            <div className="text-center px-2 py-1 border-l border-stone-800">
              <div className="text-lg font-bold text-rose-400 font-mono">{graphData.stats.placeNodes}</div>
              <div className="text-[10px] text-stone-400 uppercase">Địa Danh</div>
            </div>
            <div className="text-center px-2 py-1 border-l border-stone-800 col-span-3 sm:col-span-1">
              <div className="text-lg font-bold text-amber-300 font-mono">{graphData.stats.totalEdges}</div>
              <div className="text-[10px] text-stone-400 uppercase">Liên Kết</div>
            </div>
          </div>
        </div>

        {/* Controls & Filter Bar */}
        <div className="mt-6 pt-6 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo hiện vật, đền đài, bảo tàng (Vishnu, Bayon, Met)..."
              className="w-full pl-9 pr-4 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 font-serif"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-200"
              >
                Xóa
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Node Type */}
            <select
              value={selectedNodeType}
              onChange={(e) => setSelectedNodeType(e.target.value)}
              className="bg-stone-950 border border-stone-700 text-stone-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 font-serif"
            >
              <option value="all">Mọi loại thực thể ({graphData.stats.totalNodes})</option>
              <option value="artifact">Hiện vật & Cổ vật</option>
              <option value="collection">Bộ sưu tập chủ đề</option>
              <option value="institution">Viện lưu trữ / Bảo tàng</option>
              <option value="place">Địa danh khảo cổ</option>
              <option value="period">Thời kỳ lịch sử</option>
            </select>

            {/* Filter Rel Type */}
            <select
              value={selectedRelType}
              onChange={(e) => setSelectedRelType(e.target.value)}
              className="bg-stone-950 border border-stone-700 text-stone-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 font-serif"
            >
              <option value="all">Mọi loại quan hệ</option>
              <option value="housed_at_institution">Lưu trữ tại Viện (Housed at)</option>
              <option value="created_in_period">Niên đại thời kỳ (Period)</option>
              <option value="located_at_place">Địa danh khảo cổ (Place)</option>
              <option value="belongs_to_collection">Thuộc Bộ sưu tập (Collection)</option>
              <option value="stylistically_related">Tương đồng phong cách (Style)</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-stone-950 rounded-xl p-1 border border-stone-700">
              <button
                onClick={() => setViewMode('canvas')}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                  viewMode === 'canvas' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Mạng Lưới 2D
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                  viewMode === 'matrix' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Danh Sách Liên Kết
              </button>
            </div>

            {/* Reset Filter Button */}
            <button
              onClick={handleResetView}
              title="Đặt lại góc nhìn"
              className="p-2 rounded-xl bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-amber-300 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Active Focus Pill */}
        {focusEntityId && (
          <div className="mt-4 flex items-center space-x-2 text-xs bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-xl w-fit">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Đang tập trung vào mạng lưới liên kết của thực thể: <strong>{selectedNode?.label}</strong></span>
            <button
              onClick={() => setFocusEntityId(null)}
              className="ml-2 text-stone-400 hover:text-stone-100 underline text-[11px]"
            >
              Bỏ tập trung
            </button>
          </div>
        )}
      </div>

      {/* Main Exploration Stage: Graph Canvas + Side Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Interactive Canvas or Relational Matrix */}
        <div className="lg:col-span-2 bg-stone-900/70 border border-stone-800 rounded-3xl p-4 overflow-hidden relative min-h-[560px] flex flex-col justify-between shadow-xl">
          
          {/* Canvas Controls Toolbar */}
          <div className="flex items-center justify-between text-xs text-stone-400 mb-3 px-2 z-10">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                <span>Hiện vật</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                <span>Bộ sưu tập</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
                <span>Bảo tàng</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                <span>Địa danh</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
                <span>Thời kỳ</span>
              </span>
            </div>

            {viewMode === 'canvas' && (
              <div className="flex items-center space-x-1 bg-stone-950/80 p-1 rounded-lg border border-stone-800">
                <button
                  onClick={() => setZoomLevel((prev) => Math.min(2.0, prev + 0.15))}
                  className="p-1 text-stone-300 hover:text-amber-400"
                  title="Phóng to"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-mono px-1">{Math.round(zoomLevel * 100)}%</span>
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(0.6, prev - 0.15))}
                  className="p-1 text-stone-300 hover:text-amber-400"
                  title="Thu nhỏ"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setZoomLevel(1);
                    setPanOffset({ x: 0, y: 0 });
                  }}
                  className="p-1 text-stone-300 hover:text-amber-400 ml-1"
                  title="Căn giữa"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Visual Canvas View */}
          {viewMode === 'canvas' ? (
            <div 
              className="flex-1 w-full h-[500px] sm:h-[540px] bg-[#0c0d0f] rounded-2xl relative overflow-hidden cursor-grab active:cursor-grabbing border border-stone-800/80 select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <svg
                ref={svgRef}
                viewBox="0 0 800 550"
                className="w-full h-full"
                style={{
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                  transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                }}
              >
                {/* Background Grid Accent */}
                <defs>
                  <pattern id="graph-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#23262d" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#graph-grid)" opacity="0.6" />

                {/* Edges */}
                <g className="edges">
                  {graphData.edges.map((edge) => {
                    const sourcePos = nodePositions.get(edge.source);
                    const targetPos = nodePositions.get(edge.target);
                    if (!sourcePos || !targetPos) return null;

                    const isHighlighted =
                      selectedNode &&
                      (edge.source === selectedNode.id || edge.target === selectedNode.id);

                    return (
                      <line
                        key={edge.id}
                        x1={sourcePos.x}
                        y1={sourcePos.y}
                        x2={targetPos.x}
                        y2={targetPos.y}
                        stroke={isHighlighted ? '#fbbf24' : '#383b42'}
                        strokeWidth={isHighlighted ? 2.5 : 1}
                        strokeDasharray={edge.relationshipType === 'stylistically_related' ? '4 2' : undefined}
                        opacity={isHighlighted ? 0.95 : 0.45}
                      />
                    );
                  })}
                </g>

                {/* Nodes */}
                <g className="nodes">
                  {graphData.nodes.map((node) => {
                    const pos = nodePositions.get(node.id);
                    if (!pos) return null;

                    const isSelected = selectedNodeId === node.id;
                    const isFocal = focusEntityId === node.id;
                    const colors = getNodeColor(node.type);
                    const radius = node.type === 'artifact' ? (node.dataRef?.isMasterpiece ? 16 : 13) : 18;

                    return (
                      <g
                        key={node.id}
                        transform={`translate(${pos.x}, ${pos.y})`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedNodeId(node.id);
                        }}
                        className="cursor-pointer group"
                      >
                        {/* Selected Glow Ring */}
                        {isSelected && (
                          <circle
                            r={radius + 8}
                            fill="none"
                            stroke="#fbbf24"
                            strokeWidth="2"
                            strokeDasharray="4 2"
                            className="animate-spin-slow"
                          />
                        )}

                        {/* Focal Double Ring */}
                        {isFocal && (
                          <circle
                            r={radius + 12}
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="1.5"
                            opacity="0.8"
                          />
                        )}

                        {/* Node Base Circle */}
                        <circle
                          r={radius}
                          fill={colors.bg}
                          stroke={isSelected ? '#ffffff' : colors.border}
                          strokeWidth={isSelected ? 3 : 1.5}
                          className="transition-transform duration-200 group-hover:scale-125"
                        />

                        {/* Inner icon or text */}
                        <text
                          textAnchor="middle"
                          dy=".3em"
                          fontSize={node.type === 'artifact' ? '8px' : '9px'}
                          fontWeight="bold"
                          fill={colors.text}
                          pointerEvents="none"
                        >
                          {node.type === 'artifact'
                            ? '🏛️'
                            : node.type === 'collection'
                            ? '📚'
                            : node.type === 'institution'
                            ? '🏛️'
                            : node.type === 'place'
                            ? '📍'
                            : '⏳'}
                        </text>

                        {/* Label Badge */}
                        <text
                          y={radius + 14}
                          textAnchor="middle"
                          fontSize="9px"
                          fontFamily="serif"
                          fill={isSelected ? '#fbbf24' : '#d6d3d1'}
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          className="pointer-events-none drop-shadow-md"
                        >
                          {node.label.length > 20 ? `${node.label.substring(0, 18)}...` : node.label}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>

              {/* Mobile interaction hint */}
              <div className="absolute bottom-2 left-3 text-[10px] text-stone-400 bg-stone-950/80 px-2 py-1 rounded-md border border-stone-800 pointer-events-none">
                Kéo để di chuyển • Nhấp vào điểm nút để xem chi tiết
              </div>
            </div>
          ) : (
            /* Relational Matrix Mode for Structured List / Mobile Fallback */
            <div className="flex-1 h-[500px] overflow-y-auto space-y-3 pr-2" id="relational-matrix-view">
              {graphData.nodes.map((node) => {
                const colors = getNodeColor(node.type);
                const edgesForNode = graphData.edges.filter(
                  (e) => e.source === node.id || e.target === node.id
                );

                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedNodeId === node.id
                        ? 'bg-amber-500/10 border-amber-500 shadow-md'
                        : 'bg-stone-950/70 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <span 
                          className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider"
                          style={{ backgroundColor: `${colors.bg}33`, color: colors.border }}
                        >
                          {colors.label}
                        </span>
                        <h4 className="font-serif font-semibold text-stone-100 text-sm">
                          {node.label}
                        </h4>
                      </div>
                      <span className="text-xs font-mono text-amber-400 bg-stone-900 px-2 py-0.5 rounded-md">
                        {edgesForNode.length} kết nối
                      </span>
                    </div>

                    {node.labelKhmer && (
                      <p className="text-xs text-amber-200/60 font-serif mt-1 pl-1">
                        {node.labelKhmer}
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {edgesForNode.slice(0, 4).map((e) => (
                        <span
                          key={e.id}
                          className="text-[10px] bg-stone-900 border border-stone-800 text-stone-300 px-2 py-0.5 rounded-md"
                        >
                          {e.label}: {e.source === node.id ? e.target : e.source}
                        </span>
                      ))}
                      {edgesForNode.length > 4 && (
                        <span className="text-[10px] text-stone-400 self-center">
                          +{edgesForNode.length - 4} liên kết khác
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Selected Node Detail & Relational Inspector */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 flex flex-col justify-between shadow-2xl backdrop-blur-md">
          {selectedNode ? (
            <div className="space-y-6">
              
              {/* Entity Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span 
                    className="px-2.5 py-1 rounded-full text-[10px] uppercase font-mono font-bold tracking-wider"
                    style={{
                      backgroundColor: `${getNodeColor(selectedNode.type).bg}33`,
                      color: getNodeColor(selectedNode.type).border,
                    }}
                  >
                    {getNodeColor(selectedNode.type).label}
                  </span>
                  
                  {selectedNode.type === 'artifact' && (
                    <button
                      onClick={() => onSelectObject(selectedNode.id)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-500 text-stone-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition-colors shadow-sm"
                    >
                      <span>Xem Hiện Vật</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <h3 className="text-xl font-serif font-bold text-stone-100 tracking-tight">
                  {selectedNode.label}
                </h3>
                {selectedNode.labelKhmer && (
                  <p className="text-xs text-amber-300/80 font-serif mt-0.5">
                    {selectedNode.labelKhmer}
                  </p>
                )}
              </div>

              {/* Entity Thumbnail or Icon Banner */}
              {selectedNode.imageUrl ? (
                <div className="w-full h-44 rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 relative group">
                  <MuseumImage
                    src={selectedNode.imageUrl}
                    alt={selectedNode.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3 text-[11px] text-stone-300 font-serif">
                    {selectedNode.institution || selectedNode.period || 'Tư liệu xác thực'}
                  </div>
                </div>
              ) : (
                <div className="w-full h-24 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-center p-4 text-center">
                  <span className="text-stone-400 text-xs font-serif">
                    {selectedNode.dataRef?.description || 'Thực thể chuẩn hóa trong Đồ thị Tri thức Khmer Heritage'}
                  </span>
                </div>
              )}

              {/* Connected Relationships List */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs uppercase font-mono tracking-wider text-stone-400 font-bold">
                    Liên Kết Trực Tiếp ({selectedNodeEdges.length})
                  </h4>
                  <button
                    onClick={() => setFocusEntityId(selectedNode.id)}
                    className="text-xs text-amber-400 hover:text-amber-300 font-serif flex items-center space-x-1"
                  >
                    <span>Tập trung nhánh này</span>
                    <Sparkles className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 text-xs">
                  {selectedNodeEdges.length === 0 ? (
                    <p className="text-stone-400 italic">Chưa có liên kết với bộ lọc hiện tại.</p>
                  ) : (
                    selectedNodeEdges.map((edge) => {
                      const otherNodeId = edge.source === selectedNode.id ? edge.target : edge.source;
                      const otherNode = graphData.nodes.find((n) => n.id === otherNodeId);

                      return (
                        <div
                          key={edge.id}
                          onClick={() => setSelectedNodeId(otherNodeId)}
                          className="p-2.5 rounded-xl bg-stone-950 border border-stone-800/80 hover:border-amber-500/50 cursor-pointer transition-all group"
                        >
                          <div className="flex items-center justify-between text-stone-300 font-medium">
                            <span className="text-amber-400/90 font-mono text-[10px]">
                              {edge.label}
                            </span>
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-stone-800 text-stone-400">
                              {edge.confidence}
                            </span>
                          </div>
                          <div className="text-stone-200 font-serif mt-1 font-semibold group-hover:text-amber-300 transition-colors">
                            {otherNode?.label || otherNodeId}
                          </div>
                          {edge.evidence && (
                            <p className="text-[10px] text-stone-400 mt-1 line-clamp-2 italic">
                              "{edge.evidence}"
                            </p>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-800 flex items-center justify-between gap-2">
                {selectedNode.type === 'artifact' && (
                  <button
                    onClick={() => onSelectObject(selectedNode.id)}
                    className="flex-1 py-2.5 bg-amber-500 text-stone-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition-colors text-center"
                  >
                    Chi Tiết Hiện Vật
                  </button>
                )}
                {selectedNode.type === 'collection' && onNavigateTab && (
                  <button
                    onClick={() => onNavigateTab('collections')}
                    className="flex-1 py-2.5 bg-emerald-600 text-stone-950 font-bold rounded-xl text-xs hover:bg-emerald-500 transition-colors text-center"
                  >
                    Mở Bộ Sưu Tập
                  </button>
                )}
                {selectedNode.type === 'place' && onNavigateTab && (
                  <button
                    onClick={() => onNavigateTab('map')}
                    className="flex-1 py-2.5 bg-rose-600 text-white font-bold rounded-xl text-xs hover:bg-rose-500 transition-colors text-center"
                  >
                    Xem Trên Bản Đồ
                  </button>
                )}
                {selectedNode.type === 'period' && onNavigateTab && (
                  <button
                    onClick={() => onNavigateTab('timeline')}
                    className="flex-1 py-2.5 bg-purple-600 text-white font-bold rounded-xl text-xs hover:bg-purple-500 transition-colors text-center"
                  >
                    Xem Trục Thời Gian
                  </button>
                )}
              </div>

            </div>
          ) : (
            <div className="text-center py-20 text-stone-400 text-sm">
              Chọn một điểm nút trên đồ thị để kiểm tra liên kết thực thể.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
