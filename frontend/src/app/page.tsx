'use client';

import { BusSearch } from "@/components/BusSearch";
import { BusList } from "@/components/BusList";
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Heart } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Sri Lankan Themed Background Accent */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full" />

      <div className="container mx-auto py-24 px-4 relative z-10">
        <header className="text-center mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest"
          >
            <ShieldCheck className="w-3 h-3" />
            Verified SLTB & NTC Services
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight">
            Travel <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Sri Lanka</span><br/> 
            Like Never Before
          </h1>
          
          <p className="text-slate-400 text-xl max-w-3xl mx-auto font-medium">
            Book Intercity, Expressway, and Normal services across the island. 
            Official partner for <span className="text-white">Lanka CTB</span> and private operators. 
            <br />
            ආයුබෝවන් • வணக்கம் • Welcome
          </p>
        </header>
        
        <BusSearch />
        
        <div className="mt-24 space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
              <h2 className="text-3xl font-black">Daily Departures</h2>
              <p className="text-slate-500">Real-time availability for major routes</p>
            </div>
            <div className="flex gap-4">
              <Badge variant="outline" className="px-4 py-2 bg-slate-900 border-slate-800">Colombo-Kandy (01)</Badge>
              <Badge variant="outline" className="px-4 py-2 bg-slate-900 border-slate-800">Colombo-Galle (EX-01)</Badge>
            </div>
          </div>
          <BusList />
        </div>

        {/* Local Features Section */}
        <section className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: <Zap className="text-yellow-500" />, title: "Instant Expressway", desc: "No more queues at Makumbura or Kadawatha. Book your ticket in seconds." },
            { icon: <ShieldCheck className="text-blue-500" />, title: "SLTB Verified", desc: "Official government bus schedules and fair pricing across all routes." },
            { icon: <Heart className="text-red-500" />, title: "Proudly Sri Lankan", desc: "Built with love for Sri Lankans, in English, Sinhala, and Tamil." }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </section>
      </div>

      {/* Footer Decoration */}
      <footer className="py-12 border-t border-slate-900 text-center text-slate-600 text-sm">
        © 2026 LankaRide (PVT) Ltd. All Rights Reserved. <br />
        සහතික කළ ශ්‍රී ලාංකික නිපැයුමකි
      </footer>
    </main>
  );
}
