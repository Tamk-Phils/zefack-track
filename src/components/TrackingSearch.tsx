"use client";

import { useState } from "react";
import { Search, Package, MapPin, Truck, Clock, AlertCircle, User, Calendar, FileText, Mail, Phone, Copy, Check, Radar, Zap, ShieldCheck, ArrowRight, Download, Sparkles } from "lucide-react";
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

    // Preset sample codes for instant demo testing
    const sampleTrackingCodes = ["VTX948210394", "VTX104928172"];

    const handleCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        setIsCopying(true);
        setTimeout(() => setIsCopying(false), 2000);
    };

    const performSearch = async (query: string) => {
        const cleanQuery = query.trim();
        if (!cleanQuery) return;

        setIsSearching(true);
        setResult(null);
        setError(null);

        try {
            const { data, error: sbError } = await supabase
                .from('shipments')
                .select('*')
                .eq('tracking_number', cleanQuery)
                .eq('is_deleted', false)
                .single();

            if (sbError) {
                if (sbError.code === 'PGRST116') {
                    // Not found in Supabase, search localStorage fallback
                    const saved = localStorage.getItem("swiftlink_shipments");
                    const localShipments: Shipment[] = saved ? JSON.parse(saved) : [];
                    const found = localShipments.find(s =>
                        s.tracking_number.toLowerCase() === cleanQuery.toLowerCase() && !s.is_deleted
                    );
                    if (found) {
                        setResult(found);
                    } else {
                        setError(`TELEMETRY CODE "${cleanQuery}" NOT REGISTERED IN ACTIVE REPOSITORY.`);
                    }
                } else {
                    throw sbError;
                }
            } else {
                setResult(data);
            }
        } catch (err) {
            const errorObj = err as { message?: string };
            console.error(errorObj);
            setError("TELEMETRY SATELLITE UPLINK TEMPORARILY UNREACHABLE. RE-TRYING CONNECTION...");
        } finally {
            setIsSearching(false);
        }
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
            {/* Telemetry Input Box */}
            <form onSubmit={handleSearchSubmit} className="relative group">
                <div className="flex flex-col md:flex-row items-stretch gap-3 p-3 bg-[#0f172a]/90 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] group-focus-within:border-cyan-400 group-focus-within:shadow-[0_0_30px_rgba(0,242,254,0.3)] transition-all duration-500">
                    <div className="relative flex-grow flex items-center">
                        <div className="absolute left-5 flex items-center pointer-events-none text-cyan-400">
                            <Radar size={22} className="animate-spin-slow" />
                        </div>
                        <input
                            type="text"
                            value={trackingNumber}
                            onChange={(e) => {
                                setTrackingNumber(e.target.value);
                                if (error) setError(null);
                            }}
                            placeholder="ENTER TRACKING CODE (e.g. VTX948210394)..."
                            className="w-full bg-transparent py-4 pl-14 pr-4 text-white text-sm md:text-base font-mono font-extrabold uppercase tracking-wider focus:outline-none placeholder:text-slate-500 placeholder:normal-case placeholder:font-sans placeholder:font-medium"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSearching}
                        className="bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-[#090d16] font-display font-black text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shrink-0 shadow-[0_0_20px_rgba(0,242,254,0.4)]"
                    >
                        {isSearching ? (
                            <>
                                <Zap size={16} className="animate-spin" />
                                SCANNING...
                            </>
                        ) : (
                            <>
                                Inspect Telemetry
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* Quick Demo Sample Code Chips */}
            <div className="mt-4 flex flex-wrap items-center gap-2 px-2">
                <span className="text-[11px] font-mono text-slate-400 font-semibold flex items-center gap-1">
                    <Sparkles size={12} className="text-cyan-400" /> Demo Sample Codes:
                </span>
                {sampleTrackingCodes.map((code) => (
                    <button
                        key={code}
                        type="button"
                        onClick={() => handleSampleClick(code)}
                        className="px-3 py-1 rounded-lg bg-white/5 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-400 hover:text-[#090d16] font-mono text-xs font-bold transition-all"
                    >
                        {code}
                    </button>
                ))}
            </div>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-6 p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-4"
                    >
                        <AlertCircle className="text-rose-400 shrink-0 mt-0.5" size={20} />
                        <div>
                            <p className="font-mono text-xs font-bold text-rose-400 uppercase tracking-wider">TELEMETRY WARNING</p>
                            <p className="text-slate-300 mt-1 font-sans text-sm">{error}</p>
                        </div>
                    </motion.div>
                )}

                {/* Live Telemetry Result Card */}
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-10 bg-[#0f172a]/95 backdrop-blur-2xl rounded-3xl border border-cyan-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden"
                    >
                        {/* Header Banner */}
                        <div className="bg-[#090d16] p-8 md:p-10 flex flex-wrap justify-between items-center gap-6 border-b border-cyan-500/20">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(0,242,254,0.9)]" />
                                    <p className="text-cyan-400 text-xs font-mono font-bold uppercase tracking-[0.25em]">LIVE SHIPMENT TELEMETRY</p>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight">
                                    {result.current_status || "IN TRANSIT"}
                                </h2>
                            </div>

                            <div className="flex flex-col items-start sm:items-end gap-2">
                                <p className="text-slate-400 text-[10px] font-mono font-bold uppercase tracking-wider">TELEMETRY TRACKING CODE</p>
                                <div className="flex items-center gap-3 bg-white/5 border border-cyan-500/30 px-4 py-2 rounded-xl">
                                    <span className="text-cyan-400 font-mono font-extrabold text-base md:text-lg tracking-wider">{result.tracking_number}</span>
                                    <button
                                        onClick={() => handleCopy(result.tracking_number)}
                                        className={`p-1.5 rounded-lg transition-all ${isCopying ? 'text-emerald-400 bg-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
                                        title="Copy Tracking ID"
                                    >
                                        {isCopying ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 md:p-12 space-y-12">
                            {/* Route Indicator */}
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                                    <div className="text-center md:text-left space-y-1">
                                        <p className="text-slate-400 text-[10px] font-mono font-bold uppercase tracking-widest">ORIGIN HUB</p>
                                        <p className="text-white text-xl font-bold font-display">{result.origin}</p>
                                    </div>

                                    <div className="flex-1 w-full max-w-lg space-y-3">
                                        <div className="h-1 bg-white/10 w-full rounded-full relative overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: "70%" }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(0,242,254,0.8)]"
                                            />
                                        </div>
                                        <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-cyan-400">
                                            <Zap size={14} className="animate-pulse" />
                                            EN ROUTE - REAL-TIME SATELLITE RELAY
                                        </div>
                                    </div>

                                    <div className="text-center md:text-right space-y-1">
                                        <p className="text-slate-400 text-[10px] font-mono font-bold uppercase tracking-widest">DESTINATION HUB</p>
                                        <p className="text-white text-xl font-bold font-display">{result.destination}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Live GPS Map Window */}
                            <div className="h-[420px] w-full rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl relative group">
                                <div className="absolute top-4 left-4 z-[400] bg-[#090d16]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-cyan-500/40 flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(0,242,254,0.9)]" />
                                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">LIVE GPS SATELLITE FEED</span>
                                </div>
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

                            {/* Metadata Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-8">
                                    {/* Sender & Receiver Card */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                                            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider pb-3 border-b border-white/10">
                                                <User size={16} /> SENDER SPECIFICATION
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-xs text-slate-400 font-mono">CLIENT NAME</p>
                                                <p className="text-white font-bold text-base">{result.sender_name || 'N/A'}</p>
                                                <p className="text-slate-400 text-xs flex items-center gap-2 pt-1">
                                                    <Mail size={13} className="text-cyan-400" />
                                                    {result.sender_email || 'N/A'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                                            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider pb-3 border-b border-white/10">
                                                <MapPin size={16} /> DESTINATION DETAILS
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-xs text-slate-400 font-mono">RECIPIENT NAME</p>
                                                <p className="text-white font-bold text-base">{result.recipient_name || 'N/A'}</p>
                                                <p className="text-slate-300 text-xs leading-relaxed pt-1 bg-white/5 p-3 rounded-xl border border-white/5 font-mono">
                                                    {result.recipient_address || 'Address registered'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                                        <div className="flex items-center gap-2 text-slate-300 text-xs font-mono font-bold uppercase tracking-wider">
                                            <FileText size={15} className="text-cyan-400" /> FREIGHT CONTENTMANIFEST
                                        </div>
                                        <p className="text-slate-300 text-sm leading-relaxed font-sans">
                                            {result.description || 'Standard high-value express cargo item.'}
                                        </p>
                                    </div>
                                </div>

                                {/* Sidebar Metrics */}
                                <div className="space-y-6">
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-5">
                                        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider pb-4 border-b border-white/10">
                                            <Package size={16} /> CARGO MATRIX
                                        </div>
                                        <div className="space-y-4 text-xs font-mono">
                                            <div className="flex justify-between items-center pb-2 border-b border-white/5">
                                                <span className="text-slate-400">WEIGHT</span>
                                                <span className="text-white font-bold">{result.weight} LBS</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-2 border-b border-white/5">
                                                <span className="text-slate-400">SERVICE</span>
                                                <span className="text-cyan-400 font-bold">{result.item_type || 'EXPRESS'}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-2 border-b border-white/5">
                                                <span className="text-slate-400">EST. DELIVERY</span>
                                                <span className="text-white font-bold">
                                                    {result.estimated_delivery ? new Date(result.estimated_delivery).toLocaleDateString() : 'TBD'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-400">STATUS</span>
                                                <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                                                    {result.payment_status || 'PAID'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => window.print()} 
                                        className="w-full bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                                    >
                                        <Download size={15} /> Export Waybill PDF
                                    </button>
                                </div>
                            </div>

                            {/* Delivery History Log */}
                            <div className="space-y-6 pt-6 border-t border-white/10">
                                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest flex items-center gap-3">
                                    <span className="w-8 h-[2px] bg-cyan-400" />
                                    TELEMETRY AUDIT TRAIL
                                </h3>

                                <div className="space-y-6 pl-4 border-l border-white/10 ml-2">
                                    {result.updates && result.updates.length > 0 ? (
                                        result.updates.map((update: ShipmentUpdate, idx: number) => (
                                            <div key={idx} className="relative pl-6 space-y-1.5 group">
                                                <div className={`absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 ${idx === 0 ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_10px_rgba(0,242,254,0.9)]' : 'bg-[#090d16] border-slate-600'}`} />
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <p className={`font-mono font-bold text-sm uppercase ${idx === 0 ? 'text-cyan-400' : 'text-white'}`}>{update.status}</p>
                                                    <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-md border border-white/5">
                                                        {new Date(update.created_at).toLocaleString()}
                                                    </span>
                                                </div>
                                                <p className="text-slate-300 text-xs font-sans leading-relaxed">{update.description}</p>
                                                <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                                                    <MapPin size={12} className="text-cyan-400" /> Location: {update.location}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-xs text-slate-500 font-mono italic">Initial dispatch log registered.</p>
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

