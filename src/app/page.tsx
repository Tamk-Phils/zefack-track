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
        <div className={`text-slate-400 group-hover:text-blue-600 transition-transform duration-200 shrink-0 ml-4 ${isOpen ? 'rotate-180 text-blue-600' : ''}`}>
          <ChevronDown size={20} />
        </div>
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

// Feature Dropdown Component for Pillars
const FeatureDropdownItem = ({
  icon: Icon,
  title,
  shortDesc,
  fullDesc,
  defaultOpen = false
}: {
  icon: any;
  title: string;
  shortDesc: string;
  fullDesc: string;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-200/80 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 md:p-6 flex items-center justify-between text-left group hover:bg-slate-50/80 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            <Icon size={22} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base md:text-lg group-hover:text-blue-600 transition-colors">{title}</h3>
            <p className="text-slate-500 text-xs md:text-sm font-normal mt-0.5">{shortDesc}</p>
          </div>
        </div>
        <div className={`p-2 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all shrink-0 ml-4 transform ${isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : ''}`}>
          <ChevronDown size={18} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <p className="font-medium text-slate-700">{fullDesc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Hero Section - Completely Bright & Clean without Dark Layer */}
      <section className="relative min-h-[80vh] flex items-center pt-28 pb-24 overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-slate-50 border-b border-slate-100">
        {/* Background Graphic Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-700 font-bold text-xs uppercase tracking-wider">
                  <Zap size={14} className="text-blue-600 fill-blue-600" />
                  SwiftLink Express Network
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
                  Track Your <br />
                  <span className="text-blue-600">Packages in Real Time</span>
                </h1>

                <p className="text-slate-600 text-base md:text-xl font-medium max-w-xl leading-relaxed">
                  Get real-time updates on your shipments. <br className="hidden sm:inline" />
                  Fast, reliable and secure tracking for your peace of mind.
                </p>
              </div>

              {/* Search Box Component */}
              <div className="max-w-2xl">
                <TrackingSearch />
              </div>
            </div>

            {/* Right Package Image Showcase - Crisp Clean Image without dark overlay */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative h-[460px] rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl group bg-white">
                <Image
                  src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?q=80&w=1200"
                  alt="SwiftLink Express Parcel Package"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-xl space-y-1.5">
                  <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
                    <Package size={16} /> SWIFTLINK PARCEL EXPRESS
                  </div>
                  <p className="text-slate-900 font-extrabold text-base">Real-Time Package Surveillance</p>
                  <p className="text-slate-500 text-xs font-medium">Direct GPS sync across air, sea, and ground transit hubs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillar Dropdown Section - Realtime Tracking, Secure & Reliable, Instant Notification */}
      <section className="relative z-30 max-w-7xl mx-auto px-6 -mt-10 mb-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">Key Logistics Features</span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-0.5">SwiftLink Service Capabilities</h2>
            </div>
            <span className="text-slate-400 text-xs font-semibold flex items-center gap-1">
              <ChevronDown size={14} className="text-blue-600" /> Click any feature to toggle dropdown
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeatureDropdownItem
              icon={MapPin}
              title="Real-Time Tracking"
              shortDesc="Get live updates on your shipment status."
              fullDesc="Continuous satellite GPS tracking provides real-time geographic location coordinates, speed telemetry, and precise estimated time of arrival updates for every parcel."
              defaultOpen={true}
            />
            <FeatureDropdownItem
              icon={ShieldCheck}
              title="Secure & Reliable"
              shortDesc="Your data is safe with us. We value your privacy."
              fullDesc="End-to-end encrypted waybill verification ensures tamper-proof logistics records, protected by enterprise-grade security protocols across all international hubs."
            />
            <FeatureDropdownItem
              icon={Bell}
              title="Instant Notifications"
              shortDesc="Receive instant alerts on every update."
              fullDesc="Automated dispatch alerts notify senders and recipients immediately upon customs clearance, flight departures, transit check-ins, and final delivery scans."
            />
            <FeatureDropdownItem
              icon={Headphones}
              title="24/7 Support"
              shortDesc="Our support team is here to help you anytime."
              fullDesc="Dedicated logistics specialist support available around-the-clock to assist with route updates, address modifications, customs paperwork, and delivery inquiries."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
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
