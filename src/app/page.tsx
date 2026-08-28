"use client";

import { MoveRight, ShieldCheck, Globe, Zap, ChevronDown, MapPin, Bell, Headphones, Search, FileText, Package, Truck, Ship, Plane, Clock, Phone, Mail, ArrowRight, Check, Train, Box, Shield, Award, Users, BarChart3, Layers, Compass, Cpu, Stethoscope, Sun, Factory, ShoppingBag, Star, Quote, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import TrackingSearch from "@/components/TrackingSearch";

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = value / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-black">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

// FAQ Item Component with Smooth Expand Animation
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left group transition-colors cursor-pointer"
      >
        <span className="text-base md:text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0 group-hover:scale-125 transition-transform" />
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-slate-400 group-hover:text-blue-600 shrink-0 ml-4"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-slate-600 text-sm leading-relaxed pl-5 font-medium">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Home() {
  const [activeSectorTab, setActiveSectorTab] = useState("all");

  const marqueeItems = [
    "AIR FREIGHT EXPRESS",
    "OCEAN CONTAINER TRANSIT",
    "ROAD TRANSPORTATION",
    "RAIL BULK FREIGHT",
    "WAREHOUSING & FULFILLMENT",
    "REAL-TIME SATELLITE RADAR",
    "CUSTOMS CLEARANCE BROKERAGE",
    "CARGO RISK INSURANCE"
  ];

  const sectorData = [
    { title: "Automotive Logistics", desc: "Just-in-time auto parts delivery, vehicle transport, and assembly line supply.", icon: Truck, category: "industrial", href: "/quote" },
    { title: "Technology & Electronics", desc: "High-security transit for microchips, server hardware, and consumer electronics.", icon: Cpu, category: "tech", href: "/quote" },
    { title: "Healthcare & Pharma", desc: "Temperature-monitored cold-chain shipping for medical supplies and pharmaceuticals.", icon: Stethoscope, category: "medical", href: "/quote" },
    { title: "Renewable Energy", desc: "Heavy transport for wind turbine blades, solar equipment, and power grids.", icon: Sun, category: "energy", href: "/quote" },
    { title: "Industrial Manufacturing", desc: "Heavy machinery freight, raw material transport, and plant logistics.", icon: Factory, category: "industrial", href: "/quote" },
    { title: "Retail & Fashion", desc: "Rapid e-commerce fulfillment, store distribution, and seasonal inventory logistics.", icon: ShoppingBag, category: "retail", href: "/quote" },
  ];

  const filteredSectors = activeSectorTab === "all"
    ? sectorData
    : sectorData.filter(s => s.category === activeSectorTab);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-20 md:pt-28 overflow-x-hidden">
      {/* 1. HERO SECTION - Animated Ken Burns Zoom + Pulsing Radar */}
      <section className="relative min-h-[88vh] flex items-center py-20 overflow-hidden bg-slate-900 text-white">
        {/* Background Image with Ken Burns Parallax Animation */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000"
            alt="SwiftLink Global Cargo Logistics"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-blue-950/80" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/90 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg backdrop-blur-md"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                  </span>
                  Locate Your Parcel Anywhere Anytime
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white"
                >
                  Welcome to Your Comprehensive <br />
                  <span className="text-blue-400 bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">
                    Shipping & Logistics
                  </span> Solution!
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                  className="text-slate-200 text-base md:text-xl font-medium max-w-2xl leading-relaxed"
                >
                  We offer a range of services including land, sea, and air freight, along with warehousing solutions. Let us simplify your logistics needs.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    href="/usage"
                    className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-sm px-8 py-4 rounded-xl shadow-xl hover:shadow-blue-600/50 transition-all flex items-center gap-3 group cursor-pointer"
                  >
                    <span>View Services</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    href="/quote"
                    className="bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm px-8 py-4 rounded-xl border border-white/20 backdrop-blur-md transition-all cursor-pointer block"
                  >
                    Get a Free Quote
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Hero Tracking Consignment Search Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-5"
            >
              <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl border border-white/80 shadow-2xl text-slate-900 space-y-4 relative overflow-hidden">
                {/* Radar Ring Visual Accent */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-1 border-b border-slate-100 pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-blue-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                    ENTER CONSIGNMENT NO.
                  </span>
                  <h3 className="text-2xl font-black tracking-tight">Track Your Shipment</h3>
                  <p className="text-slate-500 text-xs font-medium">Ex: VTX948210394 or VTX104928172</p>
                </div>

                <TrackingSearch />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. INFINITE SCROLLING MARQUEE TICKER BAR */}
      <section className="bg-blue-600 text-white py-3.5 overflow-hidden border-y border-blue-500/30">
        <div className="flex w-full whitespace-nowrap">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-8 text-xs font-black uppercase tracking-widest shrink-0"
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-4">
                <span>{item}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-300/80" />
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. THREE QUICK FEATURE CARDS - Overlapping Below Hero */}
      <section className="relative z-30 max-w-7xl mx-auto px-6 -mt-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Supply Chain Solutions",
              desc: "Optimize your operations with our tailored supply chain solutions. From procurement to distribution, we streamline your logistics workflow.",
              icon: Layers,
              href: "/usage#logistics"
            },
            {
              title: "End-to-End Transportation",
              desc: "Experience seamless logistics from start to finish with our end-to-end transportation services across land, sea, and air corridors.",
              icon: Truck,
              href: "/usage#road"
            },
            {
              title: "Contract Logistics",
              desc: "Delegate your logistics operations to the experts. With our contract logistics services, we manage your warehousing & fulfillment.",
              icon: Box,
              href: "/usage#warehouse"
            }
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl hover:border-blue-200 transition-all space-y-4 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-md">
                <card.icon size={26} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{card.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-normal">
                {card.desc}
              </p>
              <Link href={card.href} className="inline-flex items-center gap-2 text-blue-600 font-extrabold text-xs group-hover:gap-3 transition-all pt-2">
                Learn More <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. ANIMATED LIVE STATISTICS COUNTER BANNER */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="text-3xl md:text-5xl font-black text-blue-600">
                <AnimatedCounter value={15000} suffix="+" />
              </p>
              <p className="text-slate-500 text-xs md:text-sm font-bold uppercase tracking-wider">Parcels Delivered</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl md:text-5xl font-black text-blue-600">
                <AnimatedCounter value={180} suffix="+" />
              </p>
              <p className="text-slate-500 text-xs md:text-sm font-bold uppercase tracking-wider">Countries Covered</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl md:text-5xl font-black text-blue-600">
                <AnimatedCounter value={99} suffix=".9%" />
              </p>
              <p className="text-slate-500 text-xs md:text-sm font-bold uppercase tracking-wider">On-Time Arrival Rate</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl md:text-5xl font-black text-blue-600">
                <AnimatedCounter value={24} suffix="/7" />
              </p>
              <p className="text-slate-500 text-xs md:text-sm font-bold uppercase tracking-wider">Satellite Monitoring Desk</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DIVE INTO OUR COMPREHENSIVE SERVICE OFFERINGS */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">WHO WE ARE</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Dive into Our Comprehensive Service Offerings
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              At SwiftLink Logistics, we are more than just a shipping and logistics company – we are your trusted partner in navigating the complexities of global trade and commerce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Global Service Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="p-8 md:p-10 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-6 hover:shadow-xl hover:border-blue-200 transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                <Globe size={32} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">Global Service</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  Comprehensive international shipping solutions with a vast network covering multiple continents, expertise in customs clearance, and multimodal transportation options.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs font-bold text-slate-700">
                <li className="flex items-center gap-2.5"><Check size={16} className="text-blue-600 shrink-0" /> Multimodal International Transit Corridors</li>
                <li className="flex items-center gap-2.5"><Check size={16} className="text-blue-600 shrink-0" /> Real-Time Satellite Waybill Surveillance</li>
                <li className="flex items-center gap-2.5"><Check size={16} className="text-blue-600 shrink-0" /> Automated Export Customs Clearance</li>
              </ul>
              <div className="pt-2">
                <Link href="/usage" className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 font-extrabold text-xs px-6 py-3 rounded-xl shadow-md transition-all">
                  Discover More <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            {/* Local Service Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="p-8 md:p-10 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-6 hover:shadow-xl hover:border-blue-200 transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                <Compass size={32} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">Local Service</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  Reliable domestic shipping services with last-mile delivery, expedited options, strategically located regional distribution centers, and personalized customer support.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs font-bold text-slate-700">
                <li className="flex items-center gap-2.5"><Check size={16} className="text-blue-600 shrink-0" /> Door-to-Door Last-Mile Delivery Scans</li>
                <li className="flex items-center gap-2.5"><Check size={16} className="text-blue-600 shrink-0" /> Regional Climate-Controlled Distribution</li>
                <li className="flex items-center gap-2.5"><Check size={16} className="text-blue-600 shrink-0" /> Dedicated Local Courier Specialists</li>
              </ul>
              <div className="pt-2">
                <Link href="/usage" className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 font-extrabold text-xs px-6 py-3 rounded-xl shadow-md transition-all">
                  Discover More <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. EMPOWER YOUR BUSINESS WITH BETTER LOGISTICS — 8 SERVICE PORTFOLIO CARDS */}
      <section className="py-24 bg-slate-100/70 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">SERVICE PORTFOLIO</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Empower Your Business with Better Logistics
            </h2>
            <p className="text-slate-600 text-base">Exploring Our Multifaceted Service Portfolio across air, road, ocean, rail, and warehousing.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Air Freight", desc: "Dedicated express air transport corridors guaranteeing rapid transit.", icon: Plane, img: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=800", href: "/usage#air" },
              { title: "Road Transport", desc: "Nationwide ground shipping with continuous GPS tracking.", icon: Truck, img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=800", href: "/usage#road" },
              { title: "Ocean Freight", desc: "International maritime container shipping with customs clearance.", icon: Ship, img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800", href: "/usage#ocean" },
              { title: "Rail Freight", desc: "Eco-friendly long-distance bulk rail transit solutions.", icon: Train, img: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=800", href: "/usage#rail" },
              { title: "Warehousing", desc: "Strategic climate-controlled storage & inventory fulfillment.", icon: Box, img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800", href: "/usage#warehouse" },
              { title: "Packaging", desc: "Industrial protective packaging & custom crating options.", icon: Package, img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800", href: "/usage#packaging" },
              { title: "Logistics Solution", desc: "End-to-end supply chain integration & route optimization.", icon: Layers, img: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=800", href: "/usage#logistics" },
              { title: "Cargo Insurance", desc: "Full transit policy coverage protecting high-value shipments.", icon: ShieldCheck, img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800", href: "/usage#insurance" },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-slate-100 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4 w-11 h-11 bg-white/95 rounded-2xl flex items-center justify-center text-blue-600 shadow-lg backdrop-blur-md group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <service.icon size={22} />
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">{service.desc}</p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <Link href={service.href} className="inline-flex items-center gap-2 text-blue-600 font-extrabold text-xs group-hover:gap-3 transition-all">
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. COMPETITIVE ADVANTAGES TO THE LARGEST COMPANIES */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-xs font-black uppercase tracking-widest text-blue-400">EXCELLENCE & INNOVATION</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Competitive Advantages To The Largest Companies!
            </h2>
            <p className="text-slate-300 text-base leading-relaxed font-medium">
              At SwiftLink Logistics, our mission is simple yet profound: to provide unparalleled shipping and logistics services that exceed our customers’ expectations at every turn. Through a relentless pursuit of excellence, innovation, and customer satisfaction, we aim to empower businesses of all sizes to thrive in today’s dynamic marketplace.
            </p>
            <div className="pt-2">
              <Link href="/about" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-8 py-4 rounded-xl shadow-xl hover:shadow-blue-600/40 transition-all">
                Discover More <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="relative h-[380px] rounded-3xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800 group">
              <img
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200"
                alt="SwiftLink Logistics Excellence"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. INTERACTIVE FILTERABLE INDUSTRY SECTORS SHOWCASE */}
      <section className="py-24 bg-slate-100/70 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">SPECIALIZED INDUSTRIES</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Tailored Logistics for Key Sectors
            </h2>
            <p className="text-slate-600 text-base">Providing domain-specific supply chain solutions across critical global industries.</p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: "all", label: "All Sectors" },
              { id: "industrial", label: "Automotive & Industrial" },
              { id: "tech", label: "Technology" },
              { id: "medical", label: "Healthcare & Pharma" },
              { id: "energy", label: "Renewable Energy" },
              { id: "retail", label: "Retail & E-Commerce" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSectorTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${activeSectorTab === tab.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filtered Grid with Layout Animations */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredSectors.map((sector, i) => (
                <motion.div
                  key={sector.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-4 hover:shadow-xl transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <sector.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{sector.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">{sector.desc}</p>
                  <Link href={sector.href} className="inline-flex items-center gap-2 text-blue-600 font-extrabold text-xs group-hover:gap-3 transition-all pt-2">
                    Read More <ArrowRight size={14} />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 9. TESTIMONIALS WITH HOVER SCALE */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">CUSTOMER SUCCESS STORIES</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Learn How We Help Our Customers Achieve Their Goals
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Discover the transformative impact of our tailored solutions in helping customers reach their goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "SwiftLink transformed our cross-border supply chain. Their real-time satellite tracking and customs brokerage eliminated our port clearance delays.",
                name: "Marcus Vance",
                role: "Global Supply VP, Apex Logistics"
              },
              {
                quote: "Their air freight express guarantees 24-hour turnaround for our urgent electronics cargo. The live map interface gives our clients total peace of mind.",
                name: "Sarah Jenkins",
                role: "Operations Director, TechExpress"
              },
              {
                quote: "Contract warehousing and fulfillment with SwiftLink reduced our storage overhead by 30% while improving last-mile delivery times.",
                name: "David Chen",
                role: "Logistics Manager, Oceanica Freight"
              }
            ].map((test, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-6 shadow-sm hover:shadow-xl transition-all"
              >
                <Quote size={32} className="text-blue-600" />
                <p className="text-slate-700 text-sm font-medium leading-relaxed">
                  "{test.quote}"
                </p>
                <div>
                  <p className="font-extrabold text-slate-900 text-sm">{test.name}</p>
                  <p className="text-xs font-semibold text-slate-400">{test.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ ACCORDION SECTION */}
      <section className="py-24 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Our FAQs</h2>
            <p className="text-slate-500 text-base">Find answers to common questions about SwiftLink Logistics tracking & consignment services.</p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-xl">
            <FAQItem
              question="How do I track my shipment with SwiftLink Logistics?"
              answer="Simply enter your Consignment No. (e.g. VTX948210394) into the search box at the top of this page and click 'Track Now' to see live status updates and satellite coordinates."
            />
            <FAQItem
              question="What shipping & freight services does SwiftLink offer?"
              answer="SwiftLink Logistics offers end-to-end transportation services including Air Freight, Ocean Freight, Road Express, Rail Transit, Warehouse Storage, Packaging, and Cargo Insurance."
            />
            <FAQItem
              question="How often is consignment tracking updated?"
              answer="Our satellite tracking system updates location coordinates and checkpoint scan events in real time as cargo moves through our global network."
            />
            <FAQItem
              question="How do I get a custom shipping quote?"
              answer="Click the 'Get a Quote' button in the navigation bar to submit your cargo weight, origin, and destination details for instant pricing."
            />
          </div>
        </div>
      </section>

      {/* 11. CALL TO ACTION BANNER */}
      <section className="py-20 bg-blue-600 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Logistics that is Connecting You to Endless Possibilities
          </h2>
          <p className="text-blue-100 text-base max-w-2xl mx-auto">
            Embark on a journey of endless possibilities with our comprehensive logistics solutions. Track your shipment easily or request a custom freight quote today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <Link
              href="/tracking"
              className="bg-white text-blue-600 font-extrabold text-sm px-8 py-4 rounded-xl shadow-lg hover:bg-slate-100 transition-all cursor-pointer"
            >
              Track Your Consignment Now
            </Link>
            <Link
              href="/contact"
              className="bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-sm px-8 py-4 rounded-xl border border-blue-500 transition-all cursor-pointer"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
