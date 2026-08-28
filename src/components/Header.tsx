"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Radar, ShieldCheck, Zap, ArrowUpRight, Cpu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Live Telemetry", href: "/tracking" },
        { name: "Freight Solutions", href: "/usage" },
        { name: "About Network", href: "/about" },
        { name: "Support Hub", href: "/resources" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'py-3' : 'py-6'}`}>
            <div className="max-w-7xl mx-auto px-6">
                <nav className={`transition-all duration-500 rounded-2xl border ${
                    isScrolled 
                        ? 'bg-[#0f172a]/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] px-8 py-3.5 border-cyan-500/20' 
                        : 'bg-[#0f172a]/40 backdrop-blur-md px-6 py-4 border-white/10'
                }`}>
                    <div className="flex items-center justify-between">
                        {/* Brand */}
                        <Link href="/" className="flex items-center gap-3.5 group">
                            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 p-[1px] shadow-lg group-hover:scale-105 transition-transform">
                                <div className="w-full h-full bg-[#090d16] rounded-[11px] flex items-center justify-center text-cyan-400">
                                    <Radar size={22} className="animate-spin-slow" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-extrabold tracking-tight font-display text-white group-hover:text-cyan-400 transition-colors">
                                        ZEFACK <span className="text-cyan-400 font-black">TRACK</span>
                                    </span>
                                </div>
                                <span className="text-[9px] font-mono font-semibold tracking-[0.25em] text-cyan-400/80 uppercase">
                                    Telemetry Logistics
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`text-xs font-bold font-sans uppercase tracking-wider transition-all relative py-1 ${
                                            isActive ? 'text-cyan-400 font-extrabold' : 'text-slate-300 hover:text-white'
                                        }`}
                                    >
                                        {link.name}
                                        {isActive && (
                                            <motion.div 
                                                layoutId="activeNav"
                                                className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full shadow-[0_0_8px_rgba(0,242,254,0.8)]"
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Status & CTA */}
                        <div className="hidden lg:flex items-center gap-5">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold tracking-wider uppercase">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                Operational 99.9%
                            </div>

                            <Link href="/login" className="text-xs font-bold text-slate-300 hover:text-white transition-colors">
                                Portal Login
                            </Link>

                            <Link 
                                href="/signup" 
                                className="relative group overflow-hidden px-6 py-2.5 rounded-xl font-display font-extrabold text-xs text-[#090d16] bg-cyan-400 hover:bg-white transition-all shadow-[0_0_20px_rgba(0,242,254,0.4)] flex items-center gap-2"
                            >
                                Dispatch Order
                                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </div>

                        {/* Mobile Toggle */}
                        <button 
                            className="lg:hidden text-white p-2 rounded-lg bg-white/5 border border-white/10"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isMobileMenuOpen ? <X size={22} className="text-cyan-400" /> : <Menu size={22} />}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden bg-[#0f172a]/95 backdrop-blur-2xl border border-cyan-500/20 overflow-hidden mt-3 mx-6 rounded-2xl shadow-2xl"
                    >
                        <div className="p-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`text-base font-bold font-display tracking-wide transition-colors ${
                                        pathname === link.href ? 'text-cyan-400' : 'text-slate-200 hover:text-white'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                                <Link 
                                    href="/login" 
                                    className="text-center py-3 font-bold text-slate-300 bg-white/5 rounded-xl border border-white/10 text-sm"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Portal Login
                                </Link>
                                <Link 
                                    href="/signup"
                                    className="bg-gradient-to-r from-cyan-400 to-indigo-500 text-[#090d16] py-3.5 rounded-xl font-black text-center font-display text-sm shadow-[0_0_20px_rgba(0,242,254,0.4)]"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Dispatch Order
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

