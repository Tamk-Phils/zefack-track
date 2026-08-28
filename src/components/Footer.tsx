"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Facebook, Mail, ArrowRight, Instagram, Zap, Globe, ShieldCheck, Radar, Cpu, Truck, Activity } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#090d16] text-slate-300 border-t border-white/10 pt-24 pb-12 relative overflow-hidden bg-cyber-grid">
            {/* Ambient Background Blur */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand Column */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-3.5 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 p-[1px] shadow-lg">
                                <div className="w-full h-full bg-[#090d16] rounded-[11px] flex items-center justify-center text-cyan-400">
                                    <Radar size={22} className="animate-spin-slow" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-extrabold tracking-tight font-display text-white">
                                    ZEFACK <span className="text-cyan-400 font-black">TRACK</span>
                                </span>
                                <span className="text-[9px] font-mono font-semibold tracking-[0.25em] text-cyan-400/80 uppercase">
                                    Telemetry Logistics
                                </span>
                            </div>
                        </Link>
                        
                        <p className="text-slate-400 text-sm leading-relaxed font-sans">
                            Next-generation freight tracking & telemetry. We empower global supply chains with real-time GPS tracking and autonomous dispatch precision.
                        </p>

                        <div className="flex gap-3">
                            {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                                <Link key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-cyan-400 hover:text-[#090d16] hover:border-cyan-400 transition-all shadow-md">
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Freight Services */}
                    <div>
                        <h4 className="text-white font-mono font-bold uppercase tracking-wider text-xs mb-8 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            Freight Solutions
                        </h4>
                        <ul className="space-y-3.5">
                            {['Air Express Logistics', 'Autonomous Ground Fleet', 'Ocean Cargo Matrix', 'Smart Telemetry Hubs', 'Customs Automated Pass'].map(item => (
                                <li key={item}>
                                    <Link href="/usage" className="text-slate-400 hover:text-cyan-400 text-sm font-medium transition-all flex items-center gap-2 group">
                                        <ArrowRight size={13} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-cyan-400 transition-all" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Access */}
                    <div>
                        <h4 className="text-white font-mono font-bold uppercase tracking-wider text-xs mb-8 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                            Command Quick Links
                        </h4>
                        <ul className="space-y-3.5">
                            {[
                                { name: 'Live Telemetry Search', href: '/tracking' },
                                { name: 'System Alerts & Status', href: '/alerts' },
                                { name: 'Freight Quote Engine', href: '/quote' },
                                { name: 'Support Documentation', href: '/resources' },
                                { name: 'Contact Command Desk', href: '/contact' }
                            ].map(item => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-slate-400 hover:text-cyan-400 text-sm font-medium transition-all flex items-center gap-2 group">
                                        <ArrowRight size={13} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-cyan-400 transition-all" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Operational Telemetry Contact */}
                    <div>
                        <h4 className="text-white font-mono font-bold uppercase tracking-wider text-xs mb-8 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            Dispatch Hotline
                        </h4>
                        <div className="space-y-6">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">EMAIL SUPPORT</p>
                                <a href="mailto:support@swiftlinkshipping.com" className="text-white text-xs font-bold hover:text-cyan-400 transition-colors block break-all font-mono">
                                    support@swiftlinkshipping.com
                                </a>
                            </div>

                            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                                <Activity size={18} className="text-emerald-400 shrink-0 animate-pulse" />
                                <div>
                                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">TELEMETRY NETWORK</p>
                                    <p className="text-slate-300 text-xs font-semibold">24/7 Global Satellite Relay Active</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter & Copyright */}
                <div className="pt-12 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-8">
                    <div className="w-full lg:max-w-md">
                        <h5 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3">Subscribe to Telemetry Dispatch</h5>
                        <div className="flex gap-2 p-1.5 bg-white/5 border border-white/10 rounded-xl">
                            <input 
                                type="email" 
                                placeholder="Enter corporate email..." 
                                className="flex-1 bg-transparent py-2.5 px-4 text-white text-xs font-medium outline-none placeholder:text-slate-500 font-mono" 
                            />
                            <button className="bg-cyan-400 text-[#090d16] px-5 py-2.5 rounded-lg text-xs font-black font-display hover:bg-white transition-all shadow-[0_0_15px_rgba(0,242,254,0.4)]">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    <div className="text-center lg:text-right">
                        <p className="text-slate-500 font-mono text-xs mb-3">
                            © 2026 Zefack Track | Vortex Logistics Inc. All rights reserved.
                        </p>
                        <div className="flex gap-6 justify-center lg:justify-end text-xs font-medium text-slate-400">
                            <Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Telemetry</Link>
                            <Link href="/cookies" className="hover:text-cyan-400 transition-colors">System Diagnostics</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

