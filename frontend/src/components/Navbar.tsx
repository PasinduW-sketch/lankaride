'use client';

import React from 'react';
import Link from 'next/link';
import { Bus, User, Globe, Music } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Navbar() {
  
  const playChunPaan = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = [
      { f: 659.25, d: 200 }, // E5
      { f: 622.25, d: 200 }, // D#5
      { f: 659.25, d: 200 }, // E5
      { f: 622.25, d: 200 }, // D#5
      { f: 659.25, d: 200 }, // E5
      { f: 493.88, d: 200 }, // B4
      { f: 587.33, d: 200 }, // D5
      { f: 523.25, d: 200 }, // C5
      { f: 440.00, d: 400 }, // A4
    ];

    let time = audioCtx.currentTime;
    notes.forEach(note => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.f, time);
      gain.gain.setValueAtTime(0.1, time);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + note.d / 1000);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(time);
      osc.stop(time + note.d / 1000);
      time += note.d / 1000;
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto h-20 px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Bus className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter">LankaRide</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Routes</Link>
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Schedules</Link>
          <button 
            onClick={playChunPaan}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-black uppercase tracking-widest hover:bg-yellow-500/20 transition-all active:scale-95"
          >
            <Music className="w-3 h-3" />
            CHUN PAAN MODE
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold text-slate-500 border-r border-slate-800 pr-4 mr-2 uppercase tracking-widest">
            <Globe className="w-3 h-3" />
            SIN / TAM / ENG
          </div>
          <Button variant="ghost" size="icon" className="rounded-full bg-slate-900 border border-slate-800">
            <User className="w-5 h-5 text-slate-400" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
