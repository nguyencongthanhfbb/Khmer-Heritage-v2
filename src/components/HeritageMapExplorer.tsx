import React, { useState, useEffect } from 'react';
import { HeritageObject } from '../types/museum';
import { MapPin, Navigation, Compass, ExternalLink, ArrowRight, Sparkles, LocateFixed } from 'lucide-react';

interface HeritageMapExplorerProps {
  objects: HeritageObject[];
  onSelectObject: (id: string) => void;
}

export const HeritageMapExplorer: React.FC<HeritageMapExplorerProps> = ({
  objects,
  onSelectObject,
}) => {
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [selectedSiteId, setSelectedSiteId] = useState<string>('kh-place-angkor-wat');
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoStatus, setGeoStatus] = useState<string>('idle');

  // Filter objects with location data
  const sites = objects.filter((o) => o.location && o.location.coordinates);

  const filteredSites = sites.filter((site) => {
    if (selectedProvince === 'all') return true;
    return site.location?.province === selectedProvince;
  });

  const activeSite = sites.find((s) => s.id === selectedSiteId) || sites[0];

  // Request user location for distance calculation
  const handleRequestLocation = () => {
    if ('geolocation' in navigator) {
      setGeoStatus('locating');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setGeoStatus('success');
        },
        (error) => {
          console.warn('Geolocation error:', error);
          setGeoStatus('error');
        }
      );
    } else {
      setGeoStatus('unsupported');
    }
  };

  // Calculate distance in km using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  return (
    <div className="space-y-10 pb-24" id="heritage-map-view">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono tracking-widest uppercase">
            <MapPin className="w-4 h-4" />
            <span>Địa Lý Khảo Cổ & Quần Thể Di Tích</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100">
            Bản Đồ Di Tích Lịch Sử Campuchia
          </h1>
          <p className="text-stone-400 text-sm font-serif max-w-2xl">
            Định vị không gian thực địa các đền đài, kinh đô cổ xưa và viện lưu trữ văn hóa trên khắp vương quốc Campuchia.
          </p>
        </div>

        {/* Geolocation Button */}
        <button
          id="btn-request-user-gps"
          onClick={handleRequestLocation}
          className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-mono border border-stone-700 flex items-center space-x-2 transition-colors cursor-pointer"
        >
          <LocateFixed className={`w-4 h-4 ${geoStatus === 'locating' ? 'animate-spin text-amber-400' : 'text-stone-400'}`} />
          <span>{userCoords ? 'Đã Nhận Diện Vị Trí Của Bạn' : 'Tính Khoảng Cách Thực Địa (GPS)'}</span>
        </button>
      </div>

      {/* Province Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar" id="map-province-filter">
        {[
          { id: 'all', label: 'Tất Cả Tỉnh Thành' },
          { id: 'Siem Reap', label: 'Siem Reap (Angkor)' },
          { id: 'Kampong Thom', label: 'Kampong Thom (Chân Lạp)' },
          { id: 'Phnom Penh', label: 'Phnom Penh (Thủ Đô)' },
        ].map((prov) => (
          <button
            key={prov.id}
            id={`filter-prov-${prov.id}`}
            onClick={() => setSelectedProvince(prov.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-mono transition-colors cursor-pointer ${
              selectedProvince === prov.id
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
            }`}
          >
            {prov.label}
          </button>
        ))}
      </div>

      {/* Main Interactive Map Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Visual Map Canvas / Grid of Sites (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 space-y-6 shadow-xl relative overflow-hidden">
            
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono">
                <Compass className="w-4 h-4" />
                <span>Bản Đồ Không Gian Văn Hóa (Geo-Spatial Index)</span>
              </div>
              <span className="text-[11px] font-mono text-stone-400">
                {filteredSites.length} Địa điểm được định vị
              </span>
            </div>

            {/* Simulated Satellite Terrain Map Grid */}
            <div className="relative rounded-2xl bg-stone-950 border border-stone-850 p-6 min-h-[380px] flex flex-col justify-between overflow-hidden">
              
              {/* Background Grid Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              {/* Tonle Sap Lake Decorative Area */}
              <div className="absolute top-1/3 left-1/4 w-48 h-28 rounded-full bg-blue-950/20 blur-xl pointer-events-none" />

              <div className="relative z-10 space-y-3">
                <div className="text-[11px] font-mono text-stone-400">
                  📍 Click chọn địa danh trên bản đồ để xem hồ sơ khảo cổ:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {filteredSites.map((site) => {
                    const isSelected = site.id === selectedSiteId;
                    const coords = site.location?.coordinates || [0, 0];
                    const dist = userCoords ? calculateDistance(userCoords.lat, userCoords.lng, coords[0], coords[1]) : null;

                    return (
                      <button
                        key={site.id}
                        id={`map-pin-${site.id}`}
                        onClick={() => setSelectedSiteId(site.id)}
                        className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border flex flex-col justify-between space-y-2 ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-500 text-amber-200 ring-2 ring-amber-500/30'
                            : 'bg-stone-900/80 hover:bg-stone-800 border-stone-800 text-stone-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-amber-400 uppercase">
                              {site.location?.province}
                            </span>
                            {site.location?.unescoStatus && (
                              <span className="text-[9px] font-mono bg-blue-950 text-blue-300 px-1.5 py-0.5 rounded">
                                UNESCO
                              </span>
                            )}
                          </div>
                          <div className="font-serif font-bold text-sm text-stone-100 line-clamp-1 mt-0.5">
                            {site.title}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 pt-1 border-t border-stone-800/80">
                          <span>{coords[0].toFixed(2)}°N, {coords[1].toFixed(2)}°E</span>
                          {dist !== null && (
                            <span className="text-amber-400 font-semibold">{dist.toLocaleString()} km</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Map Footer Info */}
              <div className="relative z-10 pt-4 border-t border-stone-850 flex items-center justify-between text-[11px] font-mono text-stone-400">
                <span>Hệ quy chiếu: WGS 84 / GPS Global Coordinates</span>
                <span>Vương quốc Campuchia</span>
              </div>
            </div>

          </div>
        </div>

        {/* Selected Site Information Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {activeSite && (
            <div 
              className="rounded-3xl bg-stone-900 border border-stone-800 overflow-hidden shadow-2xl p-6 space-y-5"
              id="selected-site-card"
            >
              <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-stone-950 relative">
                <img
                  src={activeSite.media.primaryImage}
                  alt={activeSite.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-stone-900/90 text-xs font-mono text-amber-300 border border-amber-500/30">
                  {activeSite.period}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-serif text-amber-200/90 block">
                  {activeSite.titleKhmer}
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-100">
                  {activeSite.title}
                </h3>
                <p className="text-xs font-serif italic text-stone-400">
                  {activeSite.titleEnglish} • {activeSite.dateRange}
                </p>
                <p className="text-xs text-stone-300 font-light leading-relaxed pt-1">
                  {activeSite.summary}
                </p>
              </div>

              {/* Location Coordinates Box */}
              {activeSite.location && (
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Tỉnh / Thành phố:</span>
                    <span className="text-stone-200 font-semibold">{activeSite.location.province}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Tọa Độ GPS:</span>
                    <span className="text-amber-400 font-semibold">
                      {activeSite.location.coordinates[0]}° N, {activeSite.location.coordinates[1]}° E
                    </span>
                  </div>
                  {activeSite.location.unescoStatus && (
                    <div className="flex items-center justify-between pt-1 border-t border-stone-850">
                      <span className="text-stone-400">Xếp Hạng:</span>
                      <span className="text-blue-300 font-semibold">{activeSite.location.unescoStatus}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Action Button */}
              <button
                id="btn-site-explore-full"
                onClick={() => onSelectObject(activeSite.id)}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs font-mono flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-lg"
              >
                <span>Xem Hồ Sơ Chi Tiết Di Tích Này</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
