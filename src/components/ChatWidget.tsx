"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Headset, Loader2, Bot, Sparkles, PhoneCall, Search, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface LocalMessage {
    id: string;
    sender: "bot" | "user" | "agent";
    text: string;
    time: string;
    actionLink?: { label: string; url: string };
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<LocalMessage[]>([
        {
            id: "1",
            sender: "bot",
            text: "Hello! Welcome to SwiftLink Logistics Support. How can we help with your cargo or parcel today?",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [unreadCount, setUnreadCount] = useState(1);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to latest message
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleOpen = () => {
        setIsOpen(true);
        setUnreadCount(0);
    };

    const handleQuickAction = (promptText: string) => {
        submitUserMessage(promptText);
    };

    const submitUserMessage = (text: string) => {
        if (!text.trim()) return;

        const userMsg: LocalMessage = {
            id: Date.now().toString(),
            sender: "user",
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        // Simulated AI / Agent Bot Response
        setTimeout(() => {
            setIsTyping(false);
            let botReply: LocalMessage = {
                id: (Date.now() + 1).toString(),
                sender: "agent",
                text: "Thank you for reaching out! A SwiftLink dispatch agent has received your request.",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            const lower = text.toLowerCase();
            if (lower.includes("track") || lower.includes("parcel") || lower.includes("vtx")) {
                botReply.text = "You can track any consignment instantly using your tracking number (e.g., VTX948210394) on our tracking radar.";
                botReply.actionLink = { label: "Go to Real Time Tracking", url: "/tracking" };
            } else if (lower.includes("quote") || lower.includes("price") || lower.includes("cost") || lower.includes("rate")) {
                botReply.text = "We offer instant customized quotes for Air, Ocean, Road, and Rail freight!";
                botReply.actionLink = { label: "Request a Freight Quote", url: "/quote" };
            } else if (lower.includes("contact") || lower.includes("phone") || lower.includes("agent") || lower.includes("help")) {
                botReply.text = "Our 24/7 hotline is +1 (800) 555-SWIFT or you can email support@swiftlinkshipping.com.";
                botReply.actionLink = { label: "View Support Options", url: "/contact" };
            }

            setMessages((prev) => [...prev, botReply]);
        }, 1200);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitUserMessage(inputValue);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.92 }}
                        className="mb-4 w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-900"
                    >
                        {/* Header */}
                        <div className="bg-slate-900 p-5 text-white flex justify-between items-center relative overflow-hidden">
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/40">
                                    <Headset size={20} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-extrabold text-sm tracking-tight">SwiftLink Support</h4>
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    </div>
                                    <p className="text-[11px] text-slate-300 font-medium">Online 24/7 Global Dispatch Desk</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-white cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Quick Prompts Bar */}
                        <div className="bg-slate-100/80 px-4 py-2 border-b border-slate-200/80 flex items-center gap-2 overflow-x-auto text-[11px] font-bold text-slate-700 no-scrollbar">
                            <span className="text-slate-400 shrink-0 font-extrabold uppercase tracking-wider text-[9px]">Quick:</span>
                            <button
                                onClick={() => handleQuickAction("Track my consignment")}
                                className="bg-white hover:bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-slate-200/80 hover:border-blue-200 whitespace-nowrap transition-colors shadow-2xs"
                            >
                                📦 Track Consignment
                            </button>
                            <button
                                onClick={() => handleQuickAction("Get a freight quote")}
                                className="bg-white hover:bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-slate-200/80 hover:border-blue-200 whitespace-nowrap transition-colors shadow-2xs"
                            >
                                💰 Request Quote
                            </button>
                            <button
                                onClick={() => handleQuickAction("Speak to support agent")}
                                className="bg-white hover:bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-slate-200/80 hover:border-blue-200 whitespace-nowrap transition-colors shadow-2xs"
                            >
                                🎧 Live Support
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50"
                        >
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3.5 rounded-2xl text-xs font-semibold leading-relaxed shadow-sm ${msg.sender === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-none'
                                            : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
                                            }`}
                                    >
                                        <p>{msg.text}</p>

                                        {msg.actionLink && (
                                            <div className="mt-2.5 pt-2 border-t border-slate-100">
                                                <Link
                                                    href={msg.actionLink.url}
                                                    onClick={() => setIsOpen(false)}
                                                    className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-[11px] font-extrabold transition-colors"
                                                >
                                                    <span>{msg.actionLink.label}</span>
                                                    <ArrowRight size={12} />
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-[10px] text-slate-400 mt-1 px-1 font-medium">{msg.time}</span>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold p-2 bg-white rounded-2xl border border-slate-200/60 w-fit">
                                    <Loader2 className="animate-spin text-blue-600" size={14} />
                                    <span>SwiftLink agent is typing...</span>
                                </div>
                            )}
                        </div>

                        {/* Input Footer */}
                        <form
                            onSubmit={handleSubmit}
                            className="p-3 border-t border-slate-200 bg-white flex items-center gap-2"
                        >
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 transition-colors"
                            />
                            <button
                                type="submit"
                                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl flex items-center justify-center transition-all shadow-md shrink-0 cursor-pointer"
                            >
                                <Send size={16} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Trigger Button */}
            <div className="relative">
                {unreadCount > 0 && !isOpen && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center shadow-lg border-2 border-white z-10 animate-bounce">
                        {unreadCount}
                    </span>
                )}
                <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={isOpen ? () => setIsOpen(false) : handleOpen}
                    className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all cursor-pointer ${isOpen ? 'bg-slate-900 text-white' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/40'
                        }`}
                >
                    {isOpen ? <X size={24} /> : <MessageCircle size={26} />}
                </motion.button>
            </div>
        </div>
    );
}
