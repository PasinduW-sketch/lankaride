'use client';

import React from 'react';
import Link from 'next/link';
import { Bus, User, MapPin, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto h-20 px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Bus className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter">LankaRide</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Routes</Link>
          <Link href="/" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">E-Way Schedule</Link>
          <Link href="/" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-2">
            <Globe className="w-4 h-4" />
            EN/සිං/த
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full bg-slate-900 border border-slate-800">
            <User className="w-5 h-5 text-slate-400" />
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 hidden sm:flex">
            My Bookings
          </Button>
        </div>
      </div>
    </nav>
  );
}
