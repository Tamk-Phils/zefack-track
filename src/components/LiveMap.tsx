"use client";

import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getCoordsFromLocationName } from '@/lib/geocoding';
import { Maximize2, Minimize2, Navigation, MapPin, Compass } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Origin Icon (Start Point)
const originIcon = L.divIcon({
    html: `
        <div class="relative flex items-center justify-center">
            <div class="w-8 h-8 bg-emerald-500/20 rounded-full animate-ping absolute"></div>
            <div class="w-7 h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white font-black text-[10px]">
                A
            </div>
            <div class="absolute -bottom-8 bg-slate-900 text-emerald-400 text-[9px] font-black px-2 py-0.5 rounded shadow-md whitespace-nowrap uppercase tracking-wider border border-emerald-500/30">
                START
            </div>
        </div>
    `,
    className: 'custom-origin-icon',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
});

// Destination Icon (End Point)
const destinationIcon = L.divIcon({
    html: `
        <div class="relative flex items-center justify-center">
            <div class="w-8 h-8 bg-indigo-500/20 rounded-full animate-ping absolute"></div>
            <div class="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white font-black text-[10px]">
                B
            </div>
            <div class="absolute -bottom-8 bg-slate-900 text-indigo-400 text-[9px] font-black px-2 py-0.5 rounded shadow-md whitespace-nowrap uppercase tracking-wider border border-indigo-500/30">
                FINISH
            </div>
        </div>
    `,
    className: 'custom-dest-icon',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
});

// Moving Package Icon
const movingTruckIcon = L.divIcon({
    html: `
        <div class="relative flex items-center justify-center">
            <div class="absolute w-12 h-12 bg-primary/30 rounded-full animate-ping"></div>
            <div class="relative w-10 h-10 bg-primary text-white border-2 border-white rounded-full flex items-center justify-center shadow-2xl text-lg">
                🚚
            </div>
            <div class="absolute -top-9 bg-slate-900 text-primary text-[9px] font-black px-2.5 py-1 rounded shadow-xl whitespace-nowrap uppercase tracking-widest border border-primary/40 flex items-center gap-1">
                <span class="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                LIVE PACKAGE
            </div>
        </div>
    `,
    className: 'custom-moving-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

interface LiveMapProps {
    lat?: number;
    lng?: number;
    originLat?: number;
    originLng?: number;
    originName?: string;
    destinationLat?: number;
    destinationLng?: number;
    destinationName?: string;
    currentLocationName?: string;
    zoom?: number;
}

// Map Controller Component for view switching and size handling
function MapFocusController({ 
    currentCoords, 
    viewMode, 
    bounds, 
    isFullscreen 
}: { 
    currentCoords: [number, number]; 
    viewMode: 'package' | 'route'; 
    bounds: L.LatLngBoundsExpression;
    isFullscreen: boolean;
}) {
    const map = useMap();

    useEffect(() => {
        const timer = setTimeout(() => {
            map.invalidateSize();
            if (viewMode === 'package') {
                map.flyTo(currentCoords, 13, { duration: 1.2 });
            } else if (viewMode === 'route' && bounds) {
                map.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 });
            }
        }, 150);
        return () => clearTimeout(timer);
    }, [viewMode, currentCoords, bounds, isFullscreen, map]);

    return null;
}

export default function LiveMap({
    lat,
    lng,
    originLat,
    originLng,
    originName,
    destinationLat,
    destinationLng,
    destinationName,
    currentLocationName,
    zoom = 13
}: LiveMapProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [viewMode, setViewMode] = useState<'package' | 'route'>('package');
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Resolve Origin Coordinates
    let startCoords: [number, number] = [32.7767, -96.7970]; // Default Dallas
    if (originLat && originLng) {
        startCoords = [originLat, originLng];
    } else if (originName) {
        const resolved = getCoordsFromLocationName(originName);
        if (resolved) startCoords = resolved;
    }

    // Resolve Destination Coordinates
    let destCoords: [number, number] = [40.7128, -74.0060]; // Default NY
    if (destinationLat && destinationLng) {
        destCoords = [destinationLat, destinationLng];
    } else if (destinationName) {
        const resolved = getCoordsFromLocationName(destinationName);
        if (resolved) destCoords = resolved;
    }

    // Resolve Current Package Location Coordinates
    let currentCoords: [number, number];
    if (lat && lng) {
        currentCoords = [lat, lng];
    } else if (currentLocationName) {
        const resolved = getCoordsFromLocationName(currentLocationName);
        currentCoords = resolved || [(startCoords[0] + destCoords[0]) / 2, (startCoords[1] + destCoords[1]) / 2];
    } else {
        // Calculate midpoint
        currentCoords = [(startCoords[0] + destCoords[0]) / 2, (startCoords[1] + destCoords[1]) / 2];
    }

    // Animated moving position along the route
    const [movingPos, setMovingPos] = useState<[number, number]>(startCoords);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Animate moving package icon along route
    useEffect(() => {
        if (!isMounted) return;

        let progress = 0;
        const speed = 0.005;

        const interval = setInterval(() => {
            progress += speed;
            if (progress > 1) progress = 0;

            let newLat: number, newLng: number;
            if (progress <= 0.65) {
                const t = progress / 0.65;
                newLat = startCoords[0] + (currentCoords[0] - startCoords[0]) * t;
                newLng = startCoords[1] + (currentCoords[1] - startCoords[1]) * t;
            } else {
                const t = (progress - 0.65) / 0.35;
                newLat = currentCoords[0] + (destCoords[0] - currentCoords[0]) * t;
                newLng = currentCoords[1] + (destCoords[1] - currentCoords[1]) * t;
            }

            setMovingPos([newLat, newLng]);
        }, 60);

        return () => clearInterval(interval);
    }, [isMounted, startCoords, currentCoords, destCoords]);

    if (!isMounted) return <div className="w-full h-full bg-slate-100 animate-pulse rounded-sm" />;

    const bounds: L.LatLngBoundsExpression = [
        startCoords,
        currentCoords,
        destCoords
    ];

    const toggleFullscreen = () => {
        setIsFullscreen(prev => !prev);
    };

    // Prevent body scrolling when map is in fullscreen portal
    useEffect(() => {
        if (isFullscreen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isFullscreen]);

    const renderMapContent = (inFullscreen: boolean) => (
        <MapContainer
            center={currentCoords}
            zoom={13}
            className="w-full h-full z-0"
            scrollWheelZoom={true}
            doubleClickZoom={true}
            touchZoom={true}
            zoomControl={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Traversed Path: Origin -> Current Location */}
            <Polyline
                positions={[startCoords, currentCoords]}
                pathOptions={{ color: '#0070F3', weight: 6, opacity: 0.85 }}
            />

            {/* Remaining Path: Current Location -> Destination */}
            <Polyline
                positions={[currentCoords, destCoords]}
                pathOptions={{ color: '#64748B', weight: 4, dashArray: '8, 10', opacity: 0.6 }}
            />

            {/* Start Marker */}
            <Marker position={startCoords} icon={originIcon}>
                <Popup>
                    <div className="font-bold text-xs uppercase text-slate-900">
                        Origin: {originName || "Start Location"}
                    </div>
                </Popup>
            </Marker>

            {/* Destination Marker */}
            <Marker position={destCoords} icon={destinationIcon}>
                <Popup>
                    <div className="font-bold text-xs uppercase text-slate-900">
                        Destination: {destinationName || "Final Destination"}
                    </div>
                </Popup>
            </Marker>

            {/* Moving Package Marker */}
            <Marker position={movingPos} icon={movingTruckIcon}>
                <Popup>
                    <div className="font-bold text-xs uppercase text-slate-900">
                        Current Location: {currentLocationName || "In Transit"}
                    </div>
                </Popup>
            </Marker>

            <MapFocusController 
                currentCoords={currentCoords} 
                viewMode={viewMode} 
                bounds={bounds} 
                isFullscreen={inFullscreen} 
            />
        </MapContainer>
    );

    return (
        <>
            {/* Inline Map View */}
            <div className="w-full h-full relative overflow-hidden rounded-2xl">
                {/* Unified Responsive Top Overlay Bar */}
                <div className="absolute top-2.5 left-2.5 right-2.5 z-[450] flex items-center justify-between gap-2 pointer-events-none">
                    {/* Live Status Badge */}
                    <div className="bg-slate-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl text-white flex items-center gap-1.5 shadow-lg border border-white/10 shrink-0 pointer-events-auto">
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shrink-0" />
                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                            <span className="hidden sm:inline">TRANSGLOLOGISTICS </span>LIVE GPS
                        </span>
                    </div>

                    {/* Controls Bar */}
                    <div className="flex items-center gap-1 sm:gap-1.5 pointer-events-auto shrink-0">
                        <button
                            type="button"
                            onClick={() => setViewMode('package')}
                            className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1 transition-all shadow-md backdrop-blur-md border ${
                                viewMode === 'package' 
                                    ? 'bg-blue-600 text-white border-blue-500 shadow-blue-500/30' 
                                    : 'bg-slate-900/80 text-slate-300 border-white/10 hover:bg-slate-900 hover:text-white'
                            }`}
                            title="Focus on package location"
                        >
                            <Navigation size={12} className={viewMode === 'package' ? 'animate-bounce' : ''} />
                            <span>Focus</span>
                        </button>
                        
                        <button
                            type="button"
                            onClick={() => setViewMode('route')}
                            className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1 transition-all shadow-md backdrop-blur-md border ${
                                viewMode === 'route' 
                                    ? 'bg-blue-600 text-white border-blue-500 shadow-blue-500/30' 
                                    : 'bg-slate-900/80 text-slate-300 border-white/10 hover:bg-slate-900 hover:text-white'
                            }`}
                            title="Show entire route"
                        >
                            <Compass size={12} />
                            <span>Route</span>
                        </button>

                        <button
                            type="button"
                            onClick={toggleFullscreen}
                            className="p-1.5 sm:p-2 rounded-xl bg-slate-900/80 text-slate-300 border border-white/10 hover:bg-slate-900 hover:text-white transition-all shadow-md backdrop-blur-md flex items-center gap-1"
                            title="Open Fullscreen Map"
                        >
                            <Maximize2 size={14} />
                            <span className="hidden sm:inline text-[10px] font-bold uppercase">Expand</span>
                        </button>
                    </div>
                </div>

                {renderMapContent(false)}
            </div>

            {/* True Edge-to-Edge Fullscreen Portal */}
            {isFullscreen && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[999999] bg-slate-950 flex flex-col w-screen h-[100dvh]">
                    {/* Fullscreen Top Header */}
                    <div className="bg-slate-900/95 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between z-[1000] shrink-0">
                        <div className="flex items-center gap-2.5 text-white">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                            <span className="font-extrabold text-xs sm:text-sm uppercase tracking-wider">
                                TRANSGLOLOGISTICS SATELLITE RADAR
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <button
                                type="button"
                                onClick={() => setViewMode('package')}
                                className={`px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                                    viewMode === 'package' ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-300 hover:text-white'
                                }`}
                            >
                                <Navigation size={13} />
                                <span>Focus</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode('route')}
                                className={`px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                                    viewMode === 'route' ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-300 hover:text-white'
                                }`}
                            >
                                <Compass size={13} />
                                <span>Route</span>
                            </button>
                            <button
                                type="button"
                                onClick={toggleFullscreen}
                                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
                            >
                                <Minimize2 size={13} />
                                <span>Close</span>
                            </button>
                        </div>
                    </div>

                    {/* Fullscreen Map Body */}
                    <div className="flex-1 w-full h-full relative">
                        {renderMapContent(true)}
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
