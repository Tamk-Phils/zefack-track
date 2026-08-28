"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Facebook, Mail, ArrowRight, Instagram, Navigation, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-20 pb-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                                <Navigation size={20} className="transform rotate-45" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-black tracking-tight text-white font-display">
                                    SwiftLink <span className="text-blue-500">Logistics</span>
                                </span>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest -mt-1">
                                    Express Global Tracking
                                </span>
                            </div>
                        </Link>
                        
                        <p className="text-slate-400 text-sm leading-relaxed font-normal">
                            Fast, reliable and secure package tracking. Powered by real-time satellite GPS telemetry and connected with 180+ global carrier networks.
                        </p>

                        <div className="flex gap-3">
                            {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                                <Link key={i} href="#" className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                                    <Icon size={16} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Logistics Services */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">
                            Freight Services
                        </h4>
                        <ul className="space-y-3">
                            {['Road Express Freight', 'Air Cargo Transit', 'Ocean Container Lines', 'Express Parcel Tracking', 'Customs Brokerage'].map(item => (
                                <li key={item}>
                                    <Link href="/usage" className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-all flex items-center gap-2 group">
                                        <ArrowRight size={13} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-blue-400 transition-all" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Access */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { name: 'Track Package', href: '/tracking' },
                                { name: 'System Status', href: '/alerts' },
                                { name: 'Freight Quote', href: '/quote' },
                                { name: 'Support Center', href: '/resources' },
                                { name: 'Contact Support', href: '/contact' }
                            ].map(item => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-all flex items-center gap-2 group">
                                        <ArrowRight size={13} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-blue-400 transition-all" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">
                            Contact Support
                        </h4>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-1">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-400">EMAIL</p>
                                <a href="mailto:support@swiftlinkshipping.com" className="text-white text-xs font-bold hover:text-blue-400 transition-colors block break-all">
                                    support@swiftlinkshipping.com
                                </a>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 flex items-center gap-3">
                                <ShieldCheck size={20} className="text-emerald-400 shrink-0" />
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">NETWORK STATUS</p>
                                    <p className="text-slate-300 text-xs font-semibold">100% Operational Worldwide</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter & Copyright */}
                <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                    <p className="text-slate-500 text-xs font-medium">
                        © 2026 SwiftLink Logistics Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs font-medium text-slate-400">
                        <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-blue-400 transition-colors">Cookie Preferences</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}


