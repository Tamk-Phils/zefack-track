"use client";

import React, { Component, ErrorInfo, ReactNode, useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getCoordsFromLocationName } from '@/lib/geocoding';
import { Maximize2, Minimize2, Navigation, Compass, AlertCircle, RefreshCw } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Safely parse any latitude or longitude to a valid finite number
function parseCoord(val: any, fallback: number): number {
    if (val === null || val === undefined) return fallback;
    const num = typeof val === 'number' ? val : parseFloat(String(val));
    return Number.isFinite(num) ? num : fallback;
}

interface LiveMapProps {
    lat?: number | string | null;
    lng?: number | string | null;
    originLat?: number | string | null;
    originLng?: number | string | null;
    originName?: string;
    destinationLat?: number | string | null;
    destinationLng?: number | string | null;
    destinationName?: string;
    currentLocationName?: string;
    zoom?: number;
}

// Map Controller for smooth view changes and invalidation on resize/fullscreen
function MapFocusController({ 
    currentCoords, 
    viewMode, 
    bounds, 
    isFullscreen 
}: { 
    currentCoords: [number, number]; 
    viewMode: 'package' | 'route'; 
    bounds: L.LatLngBounds;
    isFullscreen: boolean;
}) {
    const map = useMap();

    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                map.invalidateSize();
                if (viewMode === 'package') {
                    map.flyTo(currentCoords, 13, { duration: 1 });
                } else if (viewMode === 'route' && bounds && bounds.isValid()) {
                    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
                }
            } catch (err) {
                console.warn("Map focus transition notice:", err);
            }
        }, 180);

        return () => clearTimeout(timer);
    }, [viewMode, currentCoords[0], currentCoords[1], isFullscreen, map]);

    return null;
}

// Moving delivery truck marker with isolated animation state
function MovingTruckMarker({
    start,
    current,
    dest,
    icon,
    locationName
}: {
    start: [number, number];
    current: [number, number];
    dest: [number, number];
    icon: L.DivIcon;
    locationName?: string;
}) {
    const [pos, setPos] = useState<[number, number]>(start);

    useEffect(() => {
        let progress = 0;
        const speed = 0.005;

        const interval = setInterval(() => {
            progress += speed;
            if (progress > 1) progress = 0;

            let newLat: number, newLng: number;
            if (progress <= 0.65) {
                const t = progress / 0.65;
                newLat = start[0] + (current[0] - start[0]) * t;
                newLng = start[1] + (current[1] - start[1]) * t;
            } else {
                const t = (progress - 0.65) / 0.35;
                newLat = current[0] + (dest[0] - current[0]) * t;
                newLng = current[1] + (dest[1] - current[1]) * t;
            }

            if (Number.isFinite(newLat) && Number.isFinite(newLng)) {
                setPos([newLat, newLng]);
            }
        }, 80);

        return () => clearInterval(interval);
    }, [start[0], start[1], current[0], current[1], dest[0], dest[1]]);

    return (
        <Marker position={pos} icon={icon}>
            <Popup>
                <div className="font-bold text-xs uppercase text-slate-900">
                    Current Location: {locationName || "In Transit"}
                </div>
            </Popup>
        </Marker>
    );
}

// Error Boundary to prevent any client-side map crash from breaking the page
interface ErrorBoundaryProps {
    children: ReactNode;
}
interface ErrorBoundaryState {
    hasError: boolean;
}

class MapErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.warn("LiveMap Error Boundary caught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-full min-h-[300px] bg-slate-900 rounded-2xl flex flex-col items-center justify-center p-6 text-center text-white border border-slate-800">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
                        <AlertCircle size={24} />
                    </div>
                    <h4 className="font-bold text-sm uppercase tracking-wider text-slate-200">Satellite Map Telemetry Active</h4>
                    <p className="text-slate-400 text-xs mt-1 max-w-sm">
                        GPS telemetry is active. Click below to reconnect to the live satellite feed.
                    </p>
                    <button
                        type="button"
                        onClick={() => this.setState({ hasError: false })}
                        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
                    >
                        <RefreshCw size={14} /> Reconnect Feed
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

function LiveMapInner({
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

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Handle ESC key to exit fullscreen
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isFullscreen) {
                setIsFullscreen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFullscreen]);

    // Prevent body scroll during fullscreen mode
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

    // Resolve Origin Coordinates with complete validation
    const startCoords: [number, number] = useMemo(() => {
        const parsedLat = parseCoord(originLat, NaN);
        const parsedLng = parseCoord(originLng, NaN);
        if (Number.isFinite(parsedLat) && Number.isFinite(parsedLng)) {
            return [parsedLat, parsedLng];
        }
        if (originName) {
            const resolved = getCoordsFromLocationName(originName);
            if (resolved) return resolved;
        }
        return [32.7767, -96.7970]; // Safe fallback: Dallas Hub
    }, [originLat, originLng, originName]);

    // Resolve Destination Coordinates with complete validation
    const destCoords: [number, number] = useMemo(() => {
        const parsedLat = parseCoord(destinationLat, NaN);
        const parsedLng = parseCoord(destinationLng, NaN);
        if (Number.isFinite(parsedLat) && Number.isFinite(parsedLng)) {
            return [parsedLat, parsedLng];
        }
        if (destinationName) {
            const resolved = getCoordsFromLocationName(destinationName);
            if (resolved) return resolved;
        }
        return [40.7128, -74.0060]; // Safe fallback: New York Hub
    }, [destinationLat, destinationLng, destinationName]);

    // Resolve Current Package Location Coordinates
    const currentCoords: [number, number] = useMemo(() => {
        const parsedLat = parseCoord(lat, NaN);
        const parsedLng = parseCoord(lng, NaN);
        if (Number.isFinite(parsedLat) && Number.isFinite(parsedLng)) {
            return [parsedLat, parsedLng];
        }
        if (currentLocationName) {
            const resolved = getCoordsFromLocationName(currentLocationName);
            if (resolved) return resolved;
        }
        // Midpoint fallback
        return [
            (startCoords[0] + destCoords[0]) / 2,
            (startCoords[1] + destCoords[1]) / 2
        ];
    }, [lat, lng, currentLocationName, startCoords, destCoords]);

    // Memoize custom Leaflet icons
    const icons = useMemo(() => {
        const origin = L.divIcon({
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

        const dest = L.divIcon({
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

        const movingTruck = L.divIcon({
            html: `
                <div class="relative flex items-center justify-center">
                    <div class="absolute w-12 h-12 bg-blue-500/30 rounded-full animate-ping"></div>
                    <div class="relative w-10 h-10 bg-blue-600 text-white border-2 border-white rounded-full flex items-center justify-center shadow-2xl text-lg">
                        🚚
                    </div>
                    <div class="absolute -top-9 bg-slate-900 text-blue-400 text-[9px] font-black px-2.5 py-1 rounded shadow-xl whitespace-nowrap uppercase tracking-widest border border-blue-500/40 flex items-center gap-1">
                        <span class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
                        LIVE PACKAGE
                    </div>
                </div>
            `,
            className: 'custom-moving-icon',
            iconSize: [40, 40],
            iconAnchor: [20, 20],
        });

        return { origin, dest, movingTruck };
    }, []);

    // Memoize LatLngBounds safely
    const bounds = useMemo(() => {
        try {
            return L.latLngBounds([
                L.latLng(startCoords[0], startCoords[1]),
                L.latLng(destCoords[0], destCoords[1]),
                L.latLng(currentCoords[0], currentCoords[1])
            ]);
        } catch {
            return L.latLngBounds([
                L.latLng(32.7767, -96.7970),
                L.latLng(40.7128, -74.0060)
            ]);
        }
    }, [startCoords, destCoords, currentCoords]);

    if (!isMounted) {
        return <div className="w-full h-full min-h-[300px] bg-slate-100 animate-pulse rounded-2xl" />;
    }

    return (
        <div className={`transition-all duration-300 ${
            isFullscreen 
                ? 'fixed inset-0 z-[99999] bg-slate-950 flex flex-col w-screen h-[100dvh]' 
                : 'w-full h-full relative overflow-hidden rounded-2xl z-0'
        }`}>
            {/* Top Control Bar */}
            <div className={`absolute left-3 right-3 z-[450] flex items-center justify-between gap-2 pointer-events-none ${
                isFullscreen ? 'top-4 px-2' : 'top-3'
            }`}>
                {/* Live Status Badge */}
                <div className="bg-slate-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl text-white flex items-center gap-1.5 shadow-lg border border-white/10 shrink-0 pointer-events-auto">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shrink-0" />
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        <span className="hidden sm:inline">TRANSGLOLOGISTICS </span>LIVE GPS
                    </span>
                </div>

                {/* Map Controls */}
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
                        onClick={() => setIsFullscreen(prev => !prev)}
                        className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1 transition-all shadow-md backdrop-blur-md border ${
                            isFullscreen 
                                ? 'bg-rose-600 text-white border-rose-500 hover:bg-rose-700' 
                                : 'bg-slate-900/80 text-slate-300 border-white/10 hover:bg-slate-900 hover:text-white'
                        }`}
                        title={isFullscreen ? "Exit Fullscreen" : "Open Fullscreen Map"}
                    >
                        {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                        <span>{isFullscreen ? "Close" : "Expand"}</span>
                    </button>
                </div>
            </div>

            {/* Map Body */}
            <div className="flex-1 w-full h-full relative z-0">
                <MapContainer
                    center={currentCoords}
                    zoom={zoom}
                    style={{ width: "100%", height: "100%" }}
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
                        pathOptions={{ color: '#0070F3', weight: 5, opacity: 0.85 }}
                    />

                    {/* Remaining Path: Current Location -> Destination */}
                    <Polyline
                        positions={[currentCoords, destCoords]}
                        pathOptions={{ color: '#64748B', weight: 4, dashArray: '8, 10', opacity: 0.6 }}
                    />

                    {/* Origin Marker */}
                    <Marker position={startCoords} icon={icons.origin}>
                        <Popup>
                            <div className="font-bold text-xs uppercase text-slate-900">
                                Origin: {originName || "Start Location"}
                            </div>
                        </Popup>
                    </Marker>

                    {/* Destination Marker */}
                    <Marker position={destCoords} icon={icons.dest}>
                        <Popup>
                            <div className="font-bold text-xs uppercase text-slate-900">
                                Destination: {destinationName || "Final Destination"}
                            </div>
                        </Popup>
                    </Marker>

                    {/* Moving Package Marker */}
                    <MovingTruckMarker 
                        start={startCoords} 
                        current={currentCoords} 
                        dest={destCoords} 
                        icon={icons.movingTruck} 
                        locationName={currentLocationName} 
                    />

                    <MapFocusController 
                        currentCoords={currentCoords} 
                        viewMode={viewMode} 
                        bounds={bounds} 
                        isFullscreen={isFullscreen} 
                    />
                </MapContainer>
            </div>
        </div>
    );
}

export default function LiveMap(props: LiveMapProps) {
    return (
        <MapErrorBoundary>
            <LiveMapInner {...props} />
        </MapErrorBoundary>
    );
}
