"use client";

import { ShieldCheck, Globe, Zap, ChevronDown, MapPin, Search, Package, Truck, Ship, Plane, Clock, Phone, Mail, ArrowRight, Check, Train, Box, Award, Users, BarChart3, Layers, Compass, Cpu, Stethoscope, Sun, Factory, ShoppingBag, Quote, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import TrackingSearch from "@/components/TrackingSearch";

// FAQ Accordion Item Component
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
          transition={{ duration: 0.2 }}
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
            transition={{ duration: 0.25, ease: "easeInOut" }}
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
  const quickFeaturesRef = useRef<HTMLDivElement>(null);

  const scrollToQuickFeatures = () => {
    quickFeaturesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-20 md:pt-28 overflow-x-hidden">
      {/* 1. HERO SECTION - Clean 1:1 Parity with theglobalcargo.com */}
      <section className="relative min-h-[85vh] flex flex-col justify-center py-16 md:py-24 overflow-hidden bg-slate-950 text-white">
        {/* Bright Background Cargo Container Image with Subtle Light Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000"
            alt="SwiftLink Global Cargo Shipping"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/40 to-blue-950/40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full pt-4 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Hero Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg border border-blue-400/30">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  Locate Your Parcel Anywhere Anytime
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                  Welcome to Your Comprehensive <br className="hidden sm:inline" />
                  <span className="text-blue-400 bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                    Shipping and Logistics
                  </span> Solution!
                </h1>

                <p className="text-white text-base md:text-lg font-bold max-w-2xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  We offer a range of services including land, sea, and air freight, along with warehousing solutions. Let us simplify your logistics needs.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/usage"
                  className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-xs md:text-sm px-7 py-3.5 rounded-xl shadow-xl transition-all flex items-center gap-2.5 group cursor-pointer"
                >
                  <span>View Services</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/quote"
                  className="bg-slate-900/80 hover:bg-slate-900 text-white font-black text-xs md:text-sm px-7 py-3.5 rounded-xl border border-white/40 backdrop-blur-md transition-all cursor-pointer shadow-xl"
                >
                  Get a Free Quote
                </Link>
              </div>
            </motion.div>

            {/* Right Hero Consignment Search Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/90 shadow-2xl text-slate-900 space-y-4">
                <div className="space-y-1 border-b border-slate-100 pb-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                    Enter the Consignment No.
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight">Track Your Shipment</h3>
                  <p className="text-slate-500 text-xs font-medium">Ex: 12345 or VTX948210394</p>
                </div>

                <TrackingSearch />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative z-20 flex flex-col items-center justify-center pt-2 cursor-pointer"
          onClick={scrollToQuickFeatures}
        >
          <span className="text-[10px] font-black tracking-widest text-white uppercase drop-shadow mb-1 flex items-center gap-1">
            <span>Scroll Down</span>
            <ChevronDown size={12} className="animate-bounce text-blue-400" />
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-white/80 flex justify-center p-1 backdrop-blur-sm bg-slate-900/40">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-2 rounded-full bg-blue-400"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. OVERLAPPING 3 QUICK FEATURE CARDS */}
      <section ref={quickFeaturesRef} className="relative z-30 max-w-7xl mx-auto px-6 py-12">
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
              desc: "Experience seamless logistics from start to finish with our end-to-end transportation services. Trust us to handle your cargo with care.",
              icon: Truck,
              href: "/usage#road"
            },
            {
              title: "Contract Logistics",
              desc: "Delegate your logistics operations to the experts. With our contract logistics services, we manage your warehousing & fulfillment seamlessly.",
              icon: Box,
              href: "/usage#warehouse"
            }
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white p-7 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl hover:border-blue-200 transition-all space-y-4 group"
            >
              <div className="w-13 h-13 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shadow-md">
                <card.icon size={24} />
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

      {/* 3. DEDICATED "TRACK YOUR SHIPMENT" SECTION (1:1 Section Parity) */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-blue-200">REAL TIME CONSIGNMENT MONITORING</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">Track Your Shipment</h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Track your shipment easily! Enter your tracking number here to get real-time updates on your delivery status and GPS satellite coordinates.
          </p>
          
          <div className="max-w-xl mx-auto pt-4">
            <div className="bg-white p-4 rounded-2xl shadow-2xl text-slate-900">
              <TrackingSearch />
            </div>
          </div>
        </div>
      </section>

      {/* 4. DIVE INTO OUR COMPREHENSIVE SERVICE OFFERINGS (1:1 Section Parity) */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">WHO WE ARE</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Dive into Our Comprehensive Service Offerings
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              At SwiftLink Logistics, we are more than just a shipping and logistics company – we are your trusted partner in navigating the complexities of global trade and commerce. With a rich history and a forward-thinking approach, we strive to redefine industry standards and deliver innovative solutions that propel your business forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Global Service */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-6 hover:shadow-xl hover:border-blue-200 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
                <Globe size={28} />
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

            {/* Local Service */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-6 hover:shadow-xl hover:border-blue-200 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
                <Compass size={28} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">Local Service</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  Reliable domestic shipping services with last-mile delivery, expedited options, strategically located regional distribution centers, and personalized customer support, along with active community engagement initiatives.
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

      {/* 5. EMPOWER YOUR BUSINESS WITH BETTER LOGISTICS (8 Services Grid) */}
      <section className="py-20 bg-slate-100/70 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">SERVICE PORTFOLIO</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Empower your business with better logistics
            </h2>
            <p className="text-slate-600 text-base">Exploring Our Multifaceted Service Portfolio</p>
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (i % 4) * 0.08 }}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-slate-100 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 w-10 h-10 bg-white/95 rounded-2xl flex items-center justify-center text-blue-600 shadow-md backdrop-blur-md">
                      <service.icon size={20} />
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">{service.desc}</p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-1">
                  <Link href={service.href} className="inline-flex items-center gap-2 text-blue-600 font-extrabold text-xs group-hover:gap-3 transition-all">
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COMPETITIVE ADVANTAGES TO THE LARGEST COMPANIES! */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-xs font-black uppercase tracking-widest text-blue-400">EXCELLENCE & INNOVATION</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Competitive Advantages To The Largest Companies!
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
              At SwiftLink Logistics, our mission is simple yet profound: to provide unparalleled shipping and logistics services that exceed our customers’ expectations at every turn. Through a relentless pursuit of excellence, innovation, and customer satisfaction, we aim to empower businesses of all sizes to thrive in today’s dynamic marketplace.
            </p>
            <div className="pt-2">
              <Link href="/usage" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-7 py-3.5 rounded-xl shadow-xl transition-all">
                Discover More <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <div className="relative h-[340px] rounded-3xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200"
                alt="SwiftLink Logistics Excellence"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. EXPERIENCE THE BENEFITS OF SMOOTH MOVING */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">SMOOTH MOVING BENEFITS</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Experience the benefits of smooth moving
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Experience smooth logistics with us. Enjoy streamlined operations, cost savings, and efficiency. Discover how our solutions ensure reliable and hassle-free transportation for your goods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-100 space-y-4 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <Users size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Customer Satisfaction Tools</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                Enhance customer experience with our advanced tools, ensuring satisfaction at every touchpoint of the logistics process.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-100 space-y-4 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <BarChart3 size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Freight Payment Options</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                Choose from a range of flexible payment options tailored to your needs, simplifying the financial aspect of your logistics transactions.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-100 space-y-4 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Management & Reporting</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                Streamline operations with comprehensive management and reporting tools, providing insights to optimize efficiency and decision-making.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-100 space-y-4 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <Award size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Compliance Solutions</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                Stay compliant with industry regulations and standards using our tailored solutions, minimizing risk and ensuring smooth operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SPECIALIZED SECTORS SHOWCASE (Automotive, Technology, Healthcare, Renewable Energy, Industrial, Retail/Fashion) */}
      <section className="py-20 bg-slate-100/70 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">SPECIALIZED INDUSTRIES</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Tailored Logistics for Key Sectors
            </h2>
            <p className="text-slate-600 text-base">Providing domain-specific supply chain solutions across critical global industries.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Automotive", desc: "Just-in-time auto parts delivery, vehicle transport, and assembly line supply.", icon: Truck, href: "/quote" },
              { title: "Technology", desc: "High-security transit for microchips, server hardware, and consumer electronics.", icon: Cpu, href: "/quote" },
              { title: "Healthcare", desc: "Temperature-monitored cold-chain shipping for medical supplies and pharmaceuticals.", icon: Stethoscope, href: "/quote" },
              { title: "Renewable Energy", desc: "Heavy transport for wind turbine blades, solar equipment, and power grids.", icon: Sun, href: "/quote" },
              { title: "Industrial", desc: "Heavy machinery freight, raw material transport, and plant logistics.", icon: Factory, href: "/quote" },
              { title: "Retail / Fashion", desc: "Rapid e-commerce fulfillment, store distribution, and seasonal inventory logistics.", icon: ShoppingBag, href: "/quote" },
            ].map((sector, i) => (
              <motion.div
                key={sector.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-md space-y-4 hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <sector.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{sector.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">{sector.desc}</p>
                <Link href={sector.href} className="inline-flex items-center gap-2 text-blue-600 font-extrabold text-xs group-hover:gap-3 transition-all pt-2">
                  Read More <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. LOGISTICS THAT IS CONNECTING YOU TO ENDLESS POSSIBILITIES (1:1 Section Parity) */}
      <section className="py-20 bg-blue-600 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Logistics that is connecting you to endless possibilities
          </h2>
          <p className="text-blue-100 text-base max-w-3xl mx-auto leading-relaxed">
            Embark on a journey of endless possibilities with our comprehensive logistics solutions. From seamless supply chain management to efficient transportation services, we connect you to new opportunities and growth. Learn how our innovative approach and global network enable businesses to expand horizons, unlock potential, and achieve success in today’s dynamic marketplace.
          </p>
          <div className="pt-2">
            <Link
              href="/usage"
              className="bg-white text-blue-600 font-black text-xs md:text-sm px-8 py-4 rounded-xl shadow-lg hover:bg-slate-100 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              Discover More <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. LEARN HOW WE HELP OUR CUSTOMERS ACHIEVE THEIR GOALS (1:1 Section Parity) */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">CUSTOMER SUCCESS STORIES</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Learn how we help our customers achieve their goals
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Discover the transformative impact of our tailored solutions in helping customers reach their goals. From optimizing supply chains to delivering exceptional service, we empower businesses to thrive in their industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <div
                key={i}
                className="bg-slate-50 p-7 rounded-3xl border border-slate-100 space-y-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <Quote size={28} className="text-blue-600" />
                  <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">
                    "{test.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <div>
                    <p className="font-extrabold text-slate-900 text-sm">{test.name}</p>
                    <p className="text-xs font-semibold text-slate-400">{test.role}</p>
                  </div>
                  <Link href="/about" className="text-xs font-extrabold text-blue-600 hover:underline">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FREQUENTLY ASKED QUESTIONS SECTION */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Our FAQs</h2>
            <p className="text-slate-500 text-base">Find answers to common questions about SwiftLink Logistics tracking & consignment services.</p>
          </div>

          <div className="bg-white p-7 md:p-10 rounded-3xl border border-slate-100 shadow-xl">
            <FAQItem
              question="How do I track my shipment with SwiftLink Logistics?"
              answer="Simply enter your Consignment No. (e.g. 12345 or VTX948210394) into the search box at the top of this page and click 'Track Now' to see live status updates and satellite coordinates."
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
    </main>
  );
}
