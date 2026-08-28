"use client";

import { useState } from "react";
import { Package, MapPin, AlertCircle, User, FileText, Mail, Copy, Check, ChevronRight, Zap, Download, Sparkles, Clock, Truck, ShieldCheck, Headphones, Bell } from "lucide-react";
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
                    // Search localStorage fallback
                    const saved = localStorage.getItem("swiftlink_shipments");
                    const localShipments: Shipment[] = saved ? JSON.parse(saved) : [];
                    const found = localShipments.find(s =>
                        s.tracking_number.toLowerCase() === cleanQuery.toLowerCase() && !s.is_deleted
                    );
                    if (found) {
                        setResult(found);
                    } else {
                        setError(`TRACKING CODE "${cleanQuery}" NOT REGISTERED IN ACTIVE SWIFTLINK LOGISTICS NETWORK.`);
                    }
                } else {
                    throw sbError;
                }
            } else {
                setResult(data);
            }
        } catch (err) {
            console.error(err);
            setError("SWIFTLINK SATELLITE CONNECTION TEMPORARILY UNREACHABLE. RE-TRYING...");
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
            {/* Search Input Box - Matching Uploaded Reference Image */}
            <form onSubmit={handleSearchSubmit} className="relative">
                <div className="flex flex-col sm:flex-row items-center gap-3 p-2 md:p-3 bg-white rounded-2xl md:rounded-full shadow-2xl border border-slate-100 transition-all duration-300">
                    <div className="relative flex-grow w-full flex items-center pl-4">
                        <Package size={24} className="text-blue-600 shrink-0 mr-3" />
                        <input
                            type="text"
                            value={trackingNumber}
                            onChange={(e) => {
                                setTrackingNumber(e.target.value);
                                if (error) setError(null);
                            }}
                            placeholder="Enter Tracking Number"
                            className="w-full bg-transparent py-3 md:py-4 pr-4 text-slate-800 text-base md:text-lg font-bold uppercase tracking-wider focus:outline-none placeholder:text-slate-400 placeholder:normal-case placeholder:font-normal"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSearching}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base px-8 py-4 rounded-xl md:rounded-full transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-blue-500/25"
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
                    <span className="text-slate-300 font-medium">Popular carriers:</span>
                    <div className="flex items-center gap-5 font-black text-slate-400 tracking-wider">
                        <span className="hover:text-blue-600 transition-colors">DHL</span>
                        <span className="hover:text-blue-600 transition-colors">FedEx</span>
                        <span className="hover:text-blue-600 transition-colors">UPS</span>
                        <span className="hover:text-blue-600 transition-colors">Aramex</span>
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
                        className="mt-6 p-5 rounded-2xl bg-rose-50 border border-rose-100 flex items-start gap-4"
                    >
                        <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={20} />
                        <div>
                            <p className="font-bold text-xs text-rose-600 uppercase tracking-wider">TRACKING ALERT</p>
                            <p className="text-slate-600 mt-0.5 text-sm">{error}</p>
                        </div>
                    </motion.div>
                )}

                {/* Live Shipment Details Card */}
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-10 bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden text-slate-800"
                    >
                        {/* Status Header Banner */}
                        <div className="bg-slate-900 p-8 md:p-10 flex flex-wrap justify-between items-center gap-6 text-white">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.9)]" />
                                    <p className="text-blue-400 text-xs font-mono font-bold uppercase tracking-widest">SWIFTLINK LOGISTICS LIVE</p>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                                    {result.current_status || "IN TRANSIT"}
                                </h2>
                            </div>

                            <div className="flex flex-col items-start sm:items-end gap-2">
                                <p className="text-slate-400 text-[10px] font-mono font-bold uppercase tracking-wider">TRACKING NUMBER</p>
                                <div className="flex items-center gap-3 bg-white/10 border border-white/10 px-4 py-2 rounded-xl">
                                    <span className="text-white font-mono font-extrabold text-base md:text-lg tracking-wider">{result.tracking_number}</span>
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

                        <div className="p-8 md:p-12 space-y-10">
                            {/* Route Indicator */}
                            <div className="p-6 md:p-8 rounded-2xl bg-blue-50/60 border border-blue-100">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="text-center md:text-left space-y-1">
                                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">ORIGIN</p>
                                        <p className="text-slate-900 text-xl font-extrabold">{result.origin}</p>
                                    </div>

                                    <div className="flex-1 w-full max-w-md space-y-2">
                                        <div className="h-1.5 bg-blue-200/60 w-full rounded-full relative overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: "75%" }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className="h-full bg-blue-600 rounded-full"
                                            />
                                        </div>
                                        <div className="flex items-center justify-center gap-2 text-xs font-bold text-blue-600">
                                            <Truck size={14} className="animate-pulse" />
                                            En Route via SwiftLink Transit Network
                                        </div>
                                    </div>

                                    <div className="text-center md:text-right space-y-1">
                                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">DESTINATION</p>
                                        <p className="text-slate-900 text-xl font-extrabold">{result.destination}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Live Satellite GPS Map */}
                            <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md relative">
                                <div className="absolute top-4 left-4 z-[400] bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl text-white flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                                    <span className="text-xs font-bold uppercase tracking-wider">SWIFTLINK LIVE SATELLITE GPS</span>
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

                            {/* Shipment Details & Cargo Info */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                                            <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider pb-2 border-b border-slate-200">
                                                <User size={16} /> Sender Information
                                            </div>
                                            <p className="text-xs text-slate-400 font-medium">NAME</p>
                                            <p className="text-slate-900 font-bold text-base">{result.sender_name || 'N/A'}</p>
                                            <p className="text-slate-500 text-xs flex items-center gap-2 pt-1">
                                                <Mail size={13} className="text-blue-500" />
                                                {result.sender_email || 'N/A'}
                                            </p>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                                            <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider pb-2 border-b border-slate-200">
                                                <MapPin size={16} /> Recipient Information
                                            </div>
                                            <p className="text-xs text-slate-400 font-medium">RECIPIENT NAME</p>
                                            <p className="text-slate-900 font-bold text-base">{result.recipient_name || 'N/A'}</p>
                                            <p className="text-slate-600 text-xs leading-relaxed pt-1 font-medium">
                                                {result.recipient_address || 'Address registered'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                                        <div className="flex items-center gap-2 text-slate-700 text-xs font-bold uppercase tracking-wider">
                                            <FileText size={15} className="text-blue-600" /> Package Description & Content
                                        </div>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            {result.description || 'Standard high-value express shipment parcel.'}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                                        <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider pb-3 border-b border-slate-200">
                                            <Package size={16} /> Cargo Specifications
                                        </div>
                                        <div className="space-y-3 text-xs">
                                            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                                                <span className="text-slate-500 font-medium">WEIGHT</span>
                                                <span className="text-slate-900 font-bold">{result.weight} LBS</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                                                <span className="text-slate-500 font-medium">SERVICE TYPE</span>
                                                <span className="text-blue-600 font-bold">{result.item_type || 'EXPRESS'}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                                                <span className="text-slate-500 font-medium">ESTIMATED DELIVERY</span>
                                                <span className="text-slate-900 font-bold">
                                                    {result.estimated_delivery ? new Date(result.estimated_delivery).toLocaleDateString() : 'TBD'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-500 font-medium">PAYMENT STATUS</span>
                                                <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-700 font-bold">
                                                    {result.payment_status || 'PAID'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => window.print()} 
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                                    >
                                        <Download size={15} /> Download Waybill PDF
                                    </button>
                                </div>
                            </div>

                            {/* Tracking History Audit Trail */}
                            <div className="space-y-6 pt-6 border-t border-slate-100">
                                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                                    <Clock size={16} className="text-blue-600" />
                                    Tracking Status History
                                </h3>

                                <div className="space-y-6 pl-4 border-l-2 border-blue-100 ml-2">
                                    {result.updates && result.updates.length > 0 ? (
                                        result.updates.map((update: ShipmentUpdate, idx: number) => (
                                            <div key={idx} className="relative pl-6 space-y-1">
                                                <div className={`absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full border-2 ${idx === 0 ? 'bg-blue-600 border-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.8)]' : 'bg-white border-slate-300'}`} />
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <p className={`font-bold text-sm ${idx === 0 ? 'text-blue-600' : 'text-slate-800'}`}>{update.status}</p>
                                                    <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                                                        {new Date(update.created_at).toLocaleString()}
                                                    </span>
                                                </div>
                                                <p className="text-slate-600 text-xs leading-relaxed">{update.description}</p>
                                                <p className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                                                    <MapPin size={12} className="text-blue-500" /> Location: {update.location}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-xs text-slate-500 italic">Initial dispatch record created.</p>
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


