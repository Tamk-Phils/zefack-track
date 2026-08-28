"use client";

import { MoveRight, ShieldCheck, Globe, Zap, Star, ChevronDown, CheckCircle2, TrendingUp, Boxes, Briefcase, Camera, Play, Layers, Activity, Cpu, Radio, Radar, Shield, ArrowUpRight, BarChart3, Database, Truck, Ship, Plane, Clock, Phone, Mail, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import TrackingSearch from "@/components/TrackingSearch";

// FAQ Item Component
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left group transition-colors"
      >
        <span className="text-base md:text-lg font-bold font-display text-slate-200 group-hover:text-cyan-400 transition-colors tracking-tight flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400/50 group-hover:bg-cyan-400 transition-colors" />
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-slate-400 group-hover:text-cyan-400 transition-colors shrink-0 ml-4"
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
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-400 text-sm leading-relaxed max-w-3xl font-sans pl-5">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Home() {
  return (
    <main className="relative bg-[#090d16] min-h-screen overflow-hidden text-slate-100 font-sans bg-cyber-grid">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-cyan-500/15 via-indigo-500/10 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute top-[800px] right-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center pt-36 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 mb-14">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(0,242,254,0.2)]"
            >
              <Radar size={14} className="animate-spin-slow text-cyan-400" />
              <span>ZEFACK TELEMETRY ENGINE 4.0 ACTIVE</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black font-display leading-[1.05] tracking-tight text-white"
            >
              Next-Gen Global <br />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                Telemetry Freight
              </span> Matrix
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-slate-400 text-base md:text-xl font-normal max-w-2xl mx-auto leading-relaxed"
            >
              Seamless satellite dispatch, real-time GPS route surveillance, and autonomous package tracking across 180+ global transit hubs.
            </motion.p>
          </div>

          {/* Interactive Telemetry Search Bar Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <TrackingSearch />
          </motion.div>

          {/* Hero Live Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/10"
          >
            {[
              { value: "99.98%", label: "Precision Rate", icon: ShieldCheck, color: "text-cyan-400" },
              { value: "180+", label: "Global Hubs", icon: Globe, color: "text-indigo-400" },
              { value: "< 2ms", label: "Satellite Latency", icon: Zap, color: "text-emerald-400" },
              { value: "2.4M+", label: "Active Packages", icon: Truck, color: "text-violet-400" }
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3.5">
                <div className={`p-2.5 rounded-xl bg-white/5 ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <p className="text-lg md:text-xl font-extrabold font-display text-white">{stat.value}</p>
                  <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-28 relative border-t border-white/10">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-cyan-400">DISPATCH MODALITIES</span>
            <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tight">Autonomous Freight Fleet</h2>
            <p className="text-slate-400 text-base leading-relaxed">Multimodal logistics solutions engineered with satellite telemetry, AI route optimization, and end-to-end cargo insurance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: "Autonomous Ground Fleet",
                tag: "HIGH-SPEED ROAD RELAY",
                desc: "Real-time telemetry-monitored ground trucks operating across 50 US states with climate-controlled tracking.",
                img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1000"
              },
              {
                icon: Plane,
                title: "Orbital Air Express",
                tag: "SAME-DAY SATELLITE DISPATCH",
                desc: "Dedicated air transport corridors guaranteeing under-24-hour deliveries for time-critical express freight.",
                img: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=1000"
              },
              {
                icon: Ship,
                title: "Ocean Freight Cargo Matrix",
                tag: "GLOBAL MARITIME ROUTING",
                desc: "Containerized international sea freight connected with automated customs pass-through protocols.",
                img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000"
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="group rounded-3xl bg-[#0f172a]/80 border border-white/10 overflow-hidden shadow-2xl hover:border-cyan-500/40 hover:shadow-[0_15px_40px_rgba(0,242,254,0.2)] transition-all duration-500"
              >
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />
                  <div className="absolute top-4 left-4 bg-[#090d16]/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    {service.tag}
                  </div>
                  <div className="absolute bottom-4 left-6">
                    <div className="w-12 h-12 bg-cyan-400 text-[#090d16] rounded-2xl flex items-center justify-center shadow-lg font-bold">
                      <service.icon size={24} />
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <h3 className="text-2xl font-bold font-display text-white group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-sans">{service.desc}</p>
                  <div className="pt-2">
                    <Link href="/usage" className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider hover:gap-3 transition-all">
                      Explore Technical Spec <MoveRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Telemetry Works Section */}
      <section className="py-28 bg-[#090d16] relative border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[550px] rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?q=80&w=1000"
                alt="Telemetry Operations"
                fill
                className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  SATELLITE SYNC ONLINE
                </div>
                <p className="text-white font-bold text-lg">Continuous GPS Route Monitoring</p>
                <p className="text-slate-400 text-xs font-mono">Latitude / Longitude updates broadcasted directly to recipient portal.</p>
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-cyan-400">TELEMETRY PROTOCOL</span>
                <h2 className="text-4xl md:text-5xl font-black font-display text-white tracking-tight">Four-Stage Precision Tracking</h2>
              </div>

              <div className="space-y-6">
                {[
                  { step: "01", title: "Quantum Code Assignment", desc: "Every package receives an encrypted tracking code (e.g. VTX948210394) linked to real-time manifest data." },
                  { step: "02", title: "Automated Hub Scanning", desc: "Optical laser scanners at transit hubs record timestamped entry and exit vectors." },
                  { step: "03", title: "Satellite GPS Telemetry", desc: "En-route carriers stream location data every 3 seconds directly to your map dashboard." },
                  { step: "04", title: "Verified Handover", desc: "Digital recipient signature verification confirms final delivery completion." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors group">
                    <span className="text-lg font-mono font-black text-cyan-400 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 shrink-0">
                      {item.step}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold font-display text-white group-hover:text-cyan-400 transition-colors">{item.title}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed font-sans">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-400 to-indigo-500 text-[#090d16] font-display font-black text-sm px-8 py-4 rounded-xl hover:bg-white transition-all shadow-[0_0_25px_rgba(0,242,254,0.4)]"
                >
                  Generate Shipping Quote <MoveRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-28 bg-[#090d16] relative border-t border-white/10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-cyan-400">COMMAND SUPPORT</span>
            <h2 className="text-4xl md:text-5xl font-black font-display text-white tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="p-8 rounded-3xl bg-[#0f172a]/80 border border-white/10 shadow-2xl">
            <FAQItem
              question="How do I inspect a shipment telemetry code?"
              answer="Simply enter your tracking code (e.g., VTX948210394) into the search bar at the top of the page. You can also click any of our demo sample chips for an instant preview."
            />
            <FAQItem
              question="What is the precision of your live satellite map?"
              answer="Our live map tracks carrier coordinates with sub-meter GPS accuracy, updating vehicle velocity, current milestone, and estimated arrival in real time."
            />
            <FAQItem
              question="Can I schedule a home or corporate pickup?"
              answer="Yes! Registered account holders can request an automated driver pickup through our client portal, specifying package dimensions and desired pickup window."
            />
            <FAQItem
              question="Are high-value goods insured during transit?"
              answer="All shipments dispatched via Zefack Track include automatic base insurance up to $10,000, with optional extended coverage available upon request."
            />
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-r from-cyan-900/40 via-indigo-900/40 to-violet-900/40 border-t border-cyan-500/30">
        <div className="container mx-auto px-6 text-center relative z-10 space-y-8">
          <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tight">
            Ready to Dispatch Your Next Freight Order?
          </h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto font-sans">
            Join thousands of modern enterprises using Zefack Track for zero-latency freight dispatch and satellite route surveillance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="/signup"
              className="bg-cyan-400 hover:bg-white text-[#090d16] font-display font-black text-sm px-10 py-4.5 rounded-xl transition-all shadow-[0_0_30px_rgba(0,242,254,0.5)]"
            >
              Create Dispatch Account
            </Link>
            <Link
              href="/contact"
              className="bg-white/5 hover:bg-white/10 text-white font-display font-bold text-sm px-10 py-4.5 rounded-xl border border-white/20 transition-all"
            >
              Speak to Telemetry Desk
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

