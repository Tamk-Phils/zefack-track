"use client";

import { MoveRight, ShieldCheck, Globe, Zap, ChevronDown, MapPin, Bell, Headphones, Search, FileText, Package, Truck, Ship, Plane, Clock, Phone, Mail, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import TrackingSearch from "@/components/TrackingSearch";

// FAQ Item Component
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left group transition-colors"
      >
        <span className="text-base md:text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-slate-400 group-hover:text-blue-600 transition-colors shrink-0 ml-4"
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
            <p className="pb-5 text-slate-600 text-sm leading-relaxed pl-5 font-normal">
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
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Hero Section - Matching Uploaded Reference Image with Package Display */}
      <section className="relative min-h-[85vh] flex items-center pt-28 pb-24 overflow-hidden bg-slate-900">
        {/* Express Package Background Image for Mobile/Smaller Screens - Clean overlay without blur */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000"
            alt="SwiftLink Express Package Logistics"
            fill
            priority
            className="object-cover object-center opacity-40 lg:opacity-25"
          />
          {/* Pure dark gradient overlay without any blur coating */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b192c] via-[#0b192c]/90 to-[#0b192c]/80 z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
                  Track Your <br />
                  <span className="text-blue-500">Packages in Real Time</span>
                </h1>

                <p className="text-slate-300 text-base md:text-xl font-normal max-w-xl leading-relaxed">
                  Get real-time updates on your shipments. <br className="hidden sm:inline" />
                  Fast, reliable and secure tracking for your peace of mind.
                </p>
              </motion.div>

              {/* Search Box Component */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-2xl"
              >
                <TrackingSearch />
              </motion.div>
            </div>

            {/* Right Package Image Card (Desktop Showcase) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:block lg:col-span-5"
            >
              <div className="relative h-[440px] rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?q=80&w=1200"
                  alt="SwiftLink Express Parcel Package"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b192c] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-slate-900/90 border border-slate-700/60 space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                    <Package size={16} /> SWIFTLINK PARCEL EXPRESS
                  </div>
                  <p className="text-white font-extrabold text-base">Real-Time Package Surveillance</p>
                  <p className="text-slate-400 text-xs">Direct GPS sync across air, sea, and ground transit hubs.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating 4 Pillars Feature Card (Overlapping Hero) */}
      <section className="relative z-30 max-w-7xl mx-auto px-6 -mt-16 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pillar 1 */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <MapPin size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">Real-Time Tracking</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Get live updates on your shipment status.</p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">Secure & Reliable</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Your data is safe with us. We value your privacy.</p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Bell size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">Instant Notifications</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Receive instant alerts on every update.</p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Headphones size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">24/7 Support</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Our support team is here to help you anytime.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* How It Works Section - Matching Reference Image */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">How It Works</h2>
            <p className="text-slate-500 text-base">Track your packages across global carriers in 3 simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2 relative">
                <Search size={32} />
                <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-md">
                  1
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Enter Tracking Number</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                Enter your unique tracking code in the search bar above to fetch live data.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2 relative">
                <FileText size={32} />
                <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-md">
                  2
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Get Status Updates</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                We fetch real-time updates directly from satellite GPS and carrier networks.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2 relative">
                <Package size={32} />
                <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-md">
                  3
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Track Your Package</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                View real-time location, interactive map tracking, and estimated delivery dates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Freight & Logistics Services Grid */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">SWIFTLINK SERVICES</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Global Freight & Transport Solutions</h2>
            <p className="text-slate-600 text-base">Comprehensive transport solutions tailored for express cargo, commercial freight, and consumer parcels.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: "Road Freight Express",
                desc: "Nationwide ground shipping with continuous satellite tracking and climate-controlled cargo holds.",
                img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1000"
              },
              {
                icon: Plane,
                title: "Air Cargo Transit",
                desc: "Dedicated air transport corridors guaranteeing rapid express deliveries for time-sensitive packages.",
                img: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=1000"
              },
              {
                icon: Ship,
                title: "Ocean Container Lines",
                desc: "International maritime container shipping with streamlined customs processing and port tracking.",
                img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000"
              }
            ].map((service, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-slate-100 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-md">
                    <service.icon size={22} />
                  </div>
                </div>
                <div className="p-8 space-y-3">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
                  <div className="pt-2">
                    <Link href="/usage" className="inline-flex items-center gap-2 text-blue-600 font-bold text-xs hover:gap-3 transition-all">
                      Learn More <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14 space-y-3">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-base">Find answers to common questions about SwiftLink Logistics package tracking.</p>
          </div>

          <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-100">
            <FAQItem
              question="How do I track my package with SwiftLink Logistics?"
              answer="Simply enter your tracking number into the search box at the top of this page and click 'Track Now' to see live status updates and interactive satellite maps."
            />
            <FAQItem
              question="What carriers does SwiftLink Logistics support?"
              answer="SwiftLink Logistics integrates with major global carriers including DHL, FedEx, UPS, Aramex, and independent regional logistics networks."
            />
            <FAQItem
              question="How often is tracking information updated?"
              answer="Our satellite tracking updates location coordinates and milestone scan events in real-time as cargo moves through transit checkpoints."
            />
            <FAQItem
              question="What should I do if my package status isn't updating?"
              answer="In rare cases of transit delays between hubs, tracking status will update upon the next scan. Contact our 24/7 support team if your status remains static over 48 hours."
            />
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 bg-blue-600 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Ready to Dispatch or Track Your Freight?
          </h2>
          <p className="text-blue-100 text-base max-w-2xl mx-auto">
            Experience fast, reliable and secure package tracking across 180+ global logistics hubs with SwiftLink Logistics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <Link
              href="/tracking"
              className="bg-white text-blue-600 font-extrabold text-sm px-8 py-4 rounded-full shadow-lg hover:bg-slate-100 transition-all"
            >
              Track Package Now
            </Link>
            <Link
              href="/contact"
              className="bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-sm px-8 py-4 rounded-full border border-blue-500 transition-all"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


