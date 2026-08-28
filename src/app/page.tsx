"use client";

import { MoveRight, ShieldCheck, Globe, Zap, ChevronDown, MapPin, Bell, Headphones, Search, FileText, Package, Truck, Ship, Plane, Clock, Phone, Mail, ArrowRight, Check, Train, Box, Shield, Award, Users, BarChart3, Layers, Compass } from "lucide-react";
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
        className="w-full py-5 flex justify-between items-center text-left group transition-colors cursor-pointer"
      >
        <span className="text-base md:text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
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
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-20 md:pt-28">
      {/* Hero Section - Matching theglobalcargo layout with Blue Theme & Background Image */}
      <section className="relative min-h-[85vh] flex items-center py-20 overflow-hidden bg-slate-900 text-white">
        {/* Background Package Image with Subtle Blue Tint */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000"
            alt="SwiftLink Global Cargo Logistics"
            fill
            priority
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-blue-950/80" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/90 text-white font-bold text-xs uppercase tracking-wider shadow-lg">
                  <Zap size={14} className="fill-white" />
                  Locate Your Parcel Anywhere Anytime
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white">
                  Welcome to Your Comprehensive <br />
                  <span className="text-blue-400">Shipping & Logistics</span> Solution!
                </h1>

                <p className="text-slate-200 text-base md:text-xl font-medium max-w-2xl leading-relaxed">
                  We offer a complete range of global services including land, sea, and air freight, along with warehousing solutions. Let us simplify your logistics needs.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/usage"
                  className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-sm px-8 py-4 rounded-xl shadow-xl transition-all flex items-center gap-3 group"
                >
                  <span>View Services</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/quote"
                  className="bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm px-8 py-4 rounded-xl border border-white/20 backdrop-blur-md transition-all"
                >
                  Get a Free Quote
                </Link>
              </div>
            </div>

            {/* Right Tracking Input Container - Embedded in Hero */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl border border-white/80 shadow-2xl text-slate-900 space-y-4">
                <div className="space-y-1 border-b border-slate-100 pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-blue-600">INSTANT CONSIGNMENT SEARCH</span>
                  <h3 className="text-2xl font-black tracking-tight">Enter Consignment No.</h3>
                  <p className="text-slate-500 text-xs font-medium">Ex: VTX948210394 or VTX104928172</p>
                </div>

                <TrackingSearch />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Quick Supply Chain Feature Cards - Overlapping Below Hero */}
      <section className="relative z-30 max-w-7xl mx-auto px-6 -mt-12 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all space-y-4 group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-md">
              <Layers size={26} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Supply Chain Solutions</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-normal">
              Optimize your operations with our tailored supply chain solutions. From procurement to distribution, we streamline logistics.
            </p>
            <Link href="/usage" className="inline-flex items-center gap-2 text-blue-600 font-extrabold text-xs group-hover:gap-3 transition-all pt-2">
              Learn More <ArrowRight size={14} />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all space-y-4 group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-md">
              <Truck size={26} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">End-to-End Transportation</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-normal">
              Experience seamless logistics from start to finish with our end-to-end transportation services across land, sea, and air.
            </p>
            <Link href="/usage" className="inline-flex items-center gap-2 text-blue-600 font-extrabold text-xs group-hover:gap-3 transition-all pt-2">
              Learn More <ArrowRight size={14} />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all space-y-4 group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-md">
              <Box size={26} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Contract Logistics</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-normal">
              Delegate your logistics operations to the experts. With our contract logistics services, we manage warehousing & fulfillment.
            </p>
            <Link href="/usage" className="inline-flex items-center gap-2 text-blue-600 font-extrabold text-xs group-hover:gap-3 transition-all pt-2">
              Learn More <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* "Dive into Our Comprehensive Service Offerings" Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">WHO WE ARE</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Dive into Our Comprehensive Service Offerings
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              At SwiftLink Logistics, we are more than just a shipping company – we are your trusted partner in navigating the complexities of global trade and commerce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Global Service */}
            <div className="p-8 md:p-10 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-6 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
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
                <li className="flex items-center gap-2.5"><Check size={16} className="text-blue-600 shrink-0" /> Real-time Satellite Waybill Surveillance</li>
                <li className="flex items-center gap-2.5"><Check size={16} className="text-blue-600 shrink-0" /> Automated Export Customs Clearance</li>
              </ul>
              <div className="pt-2">
                <Link href="/usage" className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 font-extrabold text-xs px-6 py-3 rounded-xl shadow-md transition-all">
                  Discover More <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Local Service */}
            <div className="p-8 md:p-10 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-6 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
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
            </div>
          </div>
        </div>
      </section>

      {/* "Empower Your Business with Better Logistics" — 8 Service Portfolio Cards */}
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
              { title: "Rail Freight", desc: "Eco-friendly long-distance bulk rail transit solutions.", icon: Train, img: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=800", href: "/usage#rail" },
              { title: "Warehousing", desc: "Strategic climate-controlled storage & inventory fulfillment.", icon: Box, img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800", href: "/usage#warehouse" },
              { title: "Packaging", desc: "Industrial protective packaging & custom crating options.", icon: Package, iconColor: "text-blue-600", img: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?q=80&w=800", href: "/usage#packaging" },
              { title: "Logistics Solution", desc: "End-to-end supply chain integration & route optimization.", icon: Layers, img: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=800", href: "/usage#logistics" },
              { title: "Cargo Insurance", desc: "Full transit policy coverage protecting high-value shipments.", icon: ShieldCheck, img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800", href: "/usage#insurance" },
            ].map((service, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-slate-100 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.img}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 w-11 h-11 bg-white/95 rounded-2xl flex items-center justify-center text-blue-600 shadow-lg backdrop-blur-md">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "Experience the Benefits of Smooth Moving" Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">SMOOTH MOVING BENEFITS</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Experience the Benefits of Smooth Moving
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Experience smooth logistics with us. Enjoy streamlined operations, cost savings, and efficiency. Discover how our solutions ensure reliable transportation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-4 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Customer Satisfaction Tools</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                Enhance customer experience with our advanced tracking tools, ensuring satisfaction at every touchpoint of the process.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-4 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Freight Payment Options</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                Choose from a range of flexible payment options tailored to your needs, simplifying financial logistics transactions.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-4 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Management & Reporting</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                Streamline operations with comprehensive reporting tools, providing insights to optimize efficiency and decision-making.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-4 hover:border-blue-200 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <Award size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Compliance Solutions</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                Stay compliant with international trade regulations using our tailored solutions, minimizing risk and ensuring smooth delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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

      {/* Call to Action Banner */}
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
              className="bg-white text-blue-600 font-extrabold text-sm px-8 py-4 rounded-xl shadow-lg hover:bg-slate-100 transition-all"
            >
              Track Your Consignment Now
            </Link>
            <Link
              href="/contact"
              className="bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-sm px-8 py-4 rounded-xl border border-blue-500 transition-all"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
