"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Navigation, Globe, ChevronDown, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState("EN");
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Track Package", href: "/tracking" },
        { name: "Services", href: "/usage" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    const languages = ["EN", "ES", "FR", "DE"];

    return (
        <header className="fixed top-0 w-full z-[100] bg-white border-b border-slate-100 shadow-sm transition-all">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Brand Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                        <Navigation size={20} className="transform rotate-45" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-black tracking-tight text-slate-900 font-display">
                            SwiftLink <span className="text-blue-600">Logistics</span>
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest -mt-1">
                            Express Global Tracking
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-9">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-semibold transition-colors relative py-1 ${
                                    isActive ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-blue-600'
                                }`}
                            >
                                {link.name}
                                {isActive && (
                                    <motion.div 
                                        layoutId="activeNavHeader"
                                        className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 rounded-full"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Actions: Language Selector & Portal Login */}
                <div className="hidden md:flex items-center gap-5">
                    {/* Language Selector Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            <Globe size={16} className="text-slate-500" />
                            <span>{selectedLang}</span>
                            <ChevronDown size={14} className="text-slate-400" />
                        </button>

                        <AnimatePresence>
                            {isLangOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute right-0 mt-2 w-28 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50"
                                >
                                    {languages.map((lang) => (
                                        <button
                                            key={lang}
                                            onClick={() => {
                                                setSelectedLang(lang);
                                                setIsLangOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        >
                                            {lang} Language
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Login CTA */}
                    <Link
                        href="/login"
                        className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-600 px-4 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 transition-colors"
                    >
                        <User size={14} />
                        Client Portal
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-slate-700 p-2 rounded-lg hover:bg-slate-100"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-slate-100 overflow-hidden px-6 py-4 shadow-xl"
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`text-sm font-semibold transition-colors py-2 ${
                                        pathname === link.href ? 'text-blue-600 font-bold' : 'text-slate-700'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-xs font-semibold text-slate-500">Language: {selectedLang}</span>
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-xs font-bold text-white bg-blue-600 px-4 py-2 rounded-lg"
                                >
                                    Client Portal
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}


