"use client";

import { useState, useEffect } from "react";
import { 
    Package, 
    MapPin, 
    AlertCircle, 
    User, 
    FileText, 
    Mail, 
    Phone,
    Copy, 
    Check, 
    ChevronRight, 
    Zap, 
    Download, 
    Clock, 
    Truck, 
    ShieldCheck, 
    CreditCard,
    DollarSign,
    Box,
    Layers,
    Tag,
    Globe, 
    ChevronDown 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Shipment, ShipmentUpdate } from "@/types";
import dynamic from "next/dynamic";

const LiveMap = dynamic(() => import("@/components/LiveMap"), { ssr: false });

export default function TrackingSearch() {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [result, setResult] = useState<Shipment | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isCopying, setIsCopying] = useState(false);
    const [showMap, setShowMap] = useState(false);

    // Sample tracking numbers from active database for quick demo
    const sampleTrackingCodes = ["VTX948210394", "VTX104928172"];

    // Auto-detect tracking number from URL query parameters (e.g. /tracking?number=SWL822014363)
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const params = new URLSearchParams(window.location.search);
                const queryCode = params.get("number") || 
                                  params.get("tracking_number") || 
                                  params.get("id") || 
                                  params.get("code");
                if (queryCode) {
                    const clean = queryCode.trim();
                    setTrackingNumber(clean);
                    performSearch(clean);
                }
            } catch (e) {
                // Ignore URL parsing errors
            }
        }
    }, []);

    const handleCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        setIsCopying(true);
        setTimeout(() => setIsCopying(false), 2000);
    };

    const performSearch = async (query: string) => {
        // Strip leading hashes, spaces, and clean input
        const cleanQuery = query.trim().replace(/^#+/, '').trim();
        if (!cleanQuery) return;

        setIsSearching(true);
        setResult(null);
        setError(null);

        let found: Shipment | null = null;

        // 1. Query Supabase (case-insensitive tracking_number, non-deleted)
        try {
            const queryPromise = supabase
                .from('shipments')
                .select('*')
                .ilike('tracking_number', cleanQuery)
                .neq('is_deleted', true)
                .maybeSingle();

            const timeoutPromise = new Promise<{ data: any, error: any }>((resolve) =>
                setTimeout(() => resolve({ data: null, error: new Error("Timeout") }), 10000)
            );

            const { data, error: sbError } = await Promise.race([queryPromise, timeoutPromise]);

            if (!sbError && data) {
                found = data as Shipment;
            }
        } catch (err) {
            console.warn("Supabase query notice:", err);
        }

        // 1b. Try matching without internal spaces (e.g. "SWL 822014363" -> "SWL822014363")
        if (!found) {
            const noSpaceQuery = cleanQuery.replace(/\s+/g, '');
            if (noSpaceQuery !== cleanQuery) {
                try {
                    const { data: altData } = await supabase
                        .from('shipments')
                        .select('*')
                        .ilike('tracking_number', noSpaceQuery)
                        .neq('is_deleted', true)
                        .maybeSingle();

                    if (altData) {
                        found = altData as Shipment;
                    }
                } catch (e) {
                    // ignore
                }
            }
        }

        // 2. Query LocalStorage cache
        if (!found && typeof window !== "undefined") {
            try {
                const saved = localStorage.getItem("transglologistics_shipments");
                if (saved) {
                    const localShipments: Shipment[] = JSON.parse(saved);
                    const normTarget = cleanQuery.toLowerCase().replace(/[\s#]/g, '');

                    const match = localShipments.find(s => {
                        if (!s || s.is_deleted === true) return false;
                        const sNorm = (s.tracking_number || '').toLowerCase().replace(/[\s#]/g, '');
                        return sNorm === normTarget;
                    });

                    if (match) {
                        found = match;
                    }
                }
            } catch (e) {
                console.warn("LocalStorage cache lookup notice:", e);
            }
        }

        if (!found) {
            setError(`No active consignment record found matching "${cleanQuery}". Please verify your tracking number and try again, or contact Transglologistics Dispatch Support.`);
            setResult(null);
        } else {
            setResult(found);
            setError(null);
        }

        setIsSearching(false);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        performSearch(trackingNumber);
    };

    const handleSampleClick = (code: string) => {
        setTrackingNumber(code);
        performSearch(code);
    };

    return (
        <div className="w-full">
            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="relative">
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                    <div className="relative flex-grow w-full flex items-center px-4 bg-slate-50 border-2 border-slate-300 rounded-lg focus-within:border-blue-600 focus-within:bg-white transition-all">
                        <Package size={24} className="text-blue-600 shrink-0 mr-3" />
                        <input
                            type="text"
                            value={trackingNumber}
                            onChange={(e) => {
                                setTrackingNumber(e.target.value);
                                if (error) setError(null);
                            }}
                            placeholder="Enter Tracking Number (e.g. SWL822014363 or VTX948210394)"
                            className="w-full bg-transparent py-4 text-slate-900 text-base md:text-lg font-bold uppercase tracking-wider focus:outline-none placeholder:text-slate-400 placeholder:normal-case placeholder:font-normal"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSearching}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base px-8 py-4 rounded-xl md:rounded-full transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-blue-500/25 cursor-pointer"
                    >
                        {isSearching ? (
                            <>
                                <Zap size={18} className="animate-spin" />
                                Searching...
                            </>
                        ) : (
                            <>
                                Track Now
                                <ChevronRight size={20} />
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* Popular Carriers Bar */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 px-3 text-slate-400 text-xs font-semibold">
                <div className="flex items-center gap-4">
                    <span className="text-slate-400 font-medium">Quick sample:</span>
                    <div className="flex items-center gap-3">
                        {sampleTrackingCodes.map(code => (
                            <button
                                key={code}
                                type="button"
                                onClick={() => handleSampleClick(code)}
                                className="text-blue-600 hover:text-blue-800 font-mono font-bold text-xs bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md transition-colors"
                            >
                                {code}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="hidden sm:flex items-center gap-4 text-slate-400">
                    <span className="text-slate-400 font-medium">Global Network:</span>
                    <div className="flex items-center gap-4 font-black tracking-wider text-[11px]">
                        <span>AIR FREIGHT</span>
                        <span>OCEAN CARGO</span>
                        <span>EXPRESS GROUND</span>
                    </div>
                </div>
            </div>

            {/* Error Display */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-6 p-5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-4 text-slate-800"
                    >
                        <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={20} />
                        <div>
                            <p className="font-bold text-xs text-rose-600 uppercase tracking-wider">TRACKING NOTICE</p>
                            <p className="text-slate-700 mt-1 text-sm font-medium">{error}</p>
                        </div>
                    </motion.div>
                )}

                {/* Live Shipment Details Card */}
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-10 bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden text-slate-800"
                    >
                        {/* Status Header Banner */}
                        <div className="bg-slate-900 p-6 sm:p-8 md:p-10 flex flex-wrap justify-between items-center gap-6 text-white border-b border-slate-800">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.9)]" />
                                    <p className="text-blue-400 text-xs font-mono font-bold uppercase tracking-widest">
                                        TRANSGLOLOGISTICS REAL-TIME TELEMETRY
                                    </p>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase">
                                    {result.current_status || "IN TRANSIT"}
                                </h2>
                                <p className="text-slate-400 text-xs font-semibold">
                                    Carrier: <span className="text-slate-200">{result.carrier || "Transglologistics Air Express Fleet"}</span>
                                    {result.service_level && (
                                        <> &bull; Level: <span className="text-blue-400">{result.service_level}</span></>
                                    )}
                                </p>
                            </div>

                            <div className="flex flex-col items-start sm:items-end gap-2">
                                <p className="text-slate-400 text-[10px] font-mono font-bold uppercase tracking-wider">CONSIGNMENT TRACKING NUMBER</p>
                                <div className="flex items-center gap-3 bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl shadow-inner">
                                    <span className="text-white font-mono font-black text-lg md:text-xl tracking-wider">{result.tracking_number}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleCopy(result.tracking_number)}
                                        className={`p-1.5 rounded-lg transition-all cursor-pointer ${isCopying ? 'text-emerald-400 bg-emerald-500/20' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                                        title="Copy Tracking ID"
                                    >
                                        {isCopying ? <Check size={18} /> : <Copy size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 sm:p-6 md:p-10 space-y-8 sm:space-y-10">
                            {/* Route Indicator Card */}
                            <div className="p-5 sm:p-6 md:p-8 rounded-2xl bg-blue-50/70 border border-blue-100 shadow-sm">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="text-center md:text-left space-y-1 min-w-[140px]">
                                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">ORIGIN POINT</p>
                                        <p className="text-slate-900 text-lg sm:text-xl font-extrabold">{result.origin || "Origin Hub"}</p>
                                    </div>

                                    <div className="flex-1 w-full max-w-md space-y-2.5">
                                        <div className="h-2 bg-blue-200/60 w-full rounded-full relative overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ 
                                                    width: result.current_status === 'Delivered' ? '100%' :
                                                           result.current_status === 'Out for Delivery' ? '85%' :
                                                           result.current_status === 'In Delivery' ? '55%' : '20%'
                                                }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className="h-full bg-blue-600 rounded-full"
                                            />
                                        </div>
                                        <div className="flex items-center justify-center gap-2 text-xs font-bold text-blue-600 text-center">
                                            <Truck size={14} className="animate-pulse shrink-0" />
                                            <span>
                                                {result.current_status === 'Delivered' ? 'Cargo Successfully Delivered' :
                                                 `En Route via ${result.carrier || "Transglologistics Transit Network"}`}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-center md:text-right space-y-1 min-w-[140px]">
                                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">FINAL DESTINATION</p>
                                        <p className="text-slate-900 text-lg sm:text-xl font-extrabold">{result.destination || "Destination Terminal"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Optional Live Satellite GPS Map Toggle */}
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shrink-0">
                                            <Globe size={20} />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-extrabold text-slate-900 text-sm md:text-base leading-tight">Interactive Satellite GPS Map</h4>
                                            <p className="text-slate-500 text-xs font-medium mt-0.5 leading-snug">Real-time route telemetry & live GPS tracking</p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setShowMap(!showMap)}
                                        className={`w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-extrabold border transition-all cursor-pointer shadow-sm whitespace-nowrap ${
                                            showMap 
                                                ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' 
                                                : 'bg-white text-slate-700 border-slate-200 hover:border-blue-600 hover:text-blue-600'
                                        }`}
                                    >
                                        <MapPin size={14} />
                                        <span>{showMap ? "Hide Satellite Map" : "View Satellite Map"}</span>
                                        <ChevronDown size={14} className={`transition-transform duration-300 ${showMap ? "rotate-180" : ""}`} />
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {showMap && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="h-[340px] sm:h-[420px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md relative">
                                                <LiveMap
                                                    lat={result.latitude}
                                                    lng={result.longitude}
                                                    originLat={result.origin_lat}
                                                    originLng={result.origin_lng}
                                                    originName={result.origin}
                                                    destinationLat={result.destination_lat}
                                                    destinationLng={result.destination_lng}
                                                    destinationName={result.destination}
                                                    currentLocationName={result.updates?.[0]?.location || result.origin}
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Actual Parties & Cargo Information Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-6">
                                    {/* Sender & Recipient Information */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Sender Information Card */}
                                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-sm">
                                            <div className="flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-wider pb-2 border-b border-slate-200">
                                                <User size={16} /> Sender Information
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">FULL NAME</p>
                                                <p className="text-slate-900 font-extrabold text-base mt-0.5">{result.sender_name || 'N/A'}</p>
                                            </div>
                                            {result.sender_email && (
                                                <div>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">EMAIL ADDRESS</p>
                                                    <p className="text-slate-700 text-xs font-semibold flex items-center gap-1.5 mt-0.5">
                                                        <Mail size={13} className="text-blue-500 shrink-0" />
                                                        <span>{result.sender_email}</span>
                                                    </p>
                                                </div>
                                            )}
                                            {result.sender_phone && (
                                                <div>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">CONTACT PHONE</p>
                                                    <p className="text-slate-700 text-xs font-semibold flex items-center gap-1.5 mt-0.5">
                                                        <Phone size={13} className="text-emerald-500 shrink-0" />
                                                        <span>{result.sender_phone}</span>
                                                    </p>
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">DISPATCH ORIGIN</p>
                                                <p className="text-slate-700 text-xs font-medium leading-relaxed mt-0.5">
                                                    {result.sender_address || result.origin || 'Registered Origin Facility'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Recipient Information Card */}
                                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-sm">
                                            <div className="flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-wider pb-2 border-b border-slate-200">
                                                <MapPin size={16} /> Recipient Information
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">RECIPIENT NAME</p>
                                                <p className="text-slate-900 font-extrabold text-base mt-0.5">{result.recipient_name || 'N/A'}</p>
                                            </div>
                                            {result.recipient_email && (
                                                <div>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">RECIPIENT EMAIL</p>
                                                    <p className="text-slate-700 text-xs font-semibold flex items-center gap-1.5 mt-0.5">
                                                        <Mail size={13} className="text-blue-500 shrink-0" />
                                                        <span>{result.recipient_email}</span>
                                                    </p>
                                                </div>
                                            )}
                                            {result.recipient_phone && (
                                                <div>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">RECIPIENT PHONE</p>
                                                    <p className="text-slate-700 text-xs font-semibold flex items-center gap-1.5 mt-0.5">
                                                        <Phone size={13} className="text-emerald-500 shrink-0" />
                                                        <span>{result.recipient_phone}</span>
                                                    </p>
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">DELIVERY ADDRESS</p>
                                                <p className="text-slate-800 text-xs font-medium leading-relaxed mt-0.5 whitespace-pre-line">
                                                    {result.recipient_address || result.destination || 'Registered Destination Terminal'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description & Cargo Details */}
                                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-sm">
                                        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                                            <div className="flex items-center gap-2 text-slate-800 text-xs font-black uppercase tracking-wider">
                                                <FileText size={16} className="text-blue-600" /> Package Description & Content
                                            </div>
                                            <span className="text-[11px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                                                {result.item_type || "General Cargo"}
                                            </span>
                                        </div>
                                        <p className="text-slate-700 text-sm leading-relaxed font-medium">
                                            {result.description || 'Standard high-value priority transit cargo.'}
                                        </p>
                                        {result.special_notes && (
                                            <div className="pt-2 border-t border-slate-200/60 flex items-center gap-2">
                                                <Tag size={14} className="text-amber-500 shrink-0" />
                                                <p className="text-xs text-amber-800 font-bold">
                                                    Special Handling Instructions: <span className="font-medium text-slate-700">{result.special_notes}</span>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Cargo Specifications & Actions */}
                                <div className="space-y-6">
                                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm">
                                        <div className="flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-wider pb-3 border-b border-slate-200">
                                            <Package size={16} /> Cargo Specifications
                                        </div>
                                        <div className="space-y-3 text-xs">
                                            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                                                <span className="text-slate-500 font-semibold">WEIGHT</span>
                                                <span className="text-slate-900 font-bold">{result.weight ? `${result.weight} LBS` : 'Standard'}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                                                <span className="text-slate-500 font-semibold">DIMENSIONS</span>
                                                <span className="text-slate-900 font-bold">{result.dimensions || '12x12x12 IN'}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                                                <span className="text-slate-500 font-semibold">QUANTITY</span>
                                                <span className="text-slate-900 font-bold">{result.quantity ? `${result.quantity} PKG` : '1 PKG'}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                                                <span className="text-slate-500 font-semibold">SERVICE TYPE</span>
                                                <span className="text-blue-600 font-bold">{result.service_level || result.item_type || 'EXPRESS'}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                                                <span className="text-slate-500 font-semibold">CARRIER</span>
                                                <span className="text-slate-900 font-bold truncate max-w-[170px]" title={result.carrier}>
                                                    {result.carrier || 'Transglologistics Fleet'}
                                                </span>
                                            </div>
                                            {result.declared_value !== undefined && result.declared_value !== null && (
                                                <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                                                    <span className="text-slate-500 font-semibold">DECLARED VALUE</span>
                                                    <span className="text-slate-900 font-bold">${Number(result.declared_value).toFixed(2)}</span>
                                                </div>
                                            )}
                                            {result.payment_method && (
                                                <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                                                    <span className="text-slate-500 font-semibold">PAYMENT METHOD</span>
                                                    <span className="text-slate-900 font-bold">{result.payment_method}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                                                <span className="text-slate-500 font-semibold">PAYMENT STATUS</span>
                                                <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-700 font-bold text-[11px]">
                                                    {result.payment_status || 'PAID'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-500 font-semibold">ESTIMATED DELIVERY</span>
                                                <span className="text-slate-900 font-bold">
                                                    {result.estimated_delivery ? new Date(result.estimated_delivery).toLocaleDateString(undefined, {
                                                        weekday: 'short',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    }) : 'In Transit'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        type="button"
                                        onClick={() => window.print()} 
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                                    >
                                        <Download size={15} /> Download Waybill PDF
                                    </button>
                                </div>
                            </div>

                            {/* Tracking History Audit Trail */}
                            <div className="space-y-6 pt-6 border-t border-slate-200">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                                        <Clock size={16} className="text-blue-600" />
                                        Tracking Status History & Audit Trail
                                    </h3>
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                        {result.updates?.length || 0} Events Logged
                                    </span>
                                </div>

                                <div className="space-y-6 pl-4 border-l-2 border-blue-200 ml-2">
                                    {result.updates && result.updates.length > 0 ? (
                                        result.updates.map((update: ShipmentUpdate, idx: number) => (
                                            <div key={idx} className="relative pl-6 space-y-1">
                                                <div className={`absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full border-2 ${
                                                    idx === 0 
                                                        ? 'bg-blue-600 border-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.8)]' 
                                                        : 'bg-white border-slate-300'
                                                }`} />
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <p className={`font-black text-sm ${idx === 0 ? 'text-blue-600' : 'text-slate-800'}`}>
                                                        {update.status}
                                                    </p>
                                                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                                                        {new Date(update.created_at).toLocaleString(undefined, {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </span>
                                                </div>
                                                <p className="text-slate-600 text-xs leading-relaxed font-medium">{update.description}</p>
                                                {update.location && (
                                                    <p className="text-[11px] text-slate-500 flex items-center gap-1 font-semibold pt-0.5">
                                                        <MapPin size={12} className="text-blue-500" /> Location: {update.location}
                                                    </p>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-xs text-slate-500 italic">Initial dispatch record registered.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
