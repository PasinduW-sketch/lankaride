'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bus, Clock, Star, MapPin, Zap, Music, Volume2, Film, LocateFixed } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const cityTranslations: Record<string, { s: string, t: string }> = {
  "Colombo": { s: "කොළඹ", t: "කොළඹ" },
  "Kandy": { s: "මහනුවර", t: "கண்டி" },
  "Galle": { s: "ගාල්ල", t: "ගාලේ" },
  "Matara": { s: "මාතර", t: "மாத்தறை" },
  "Jaffna": { s: "යාපනය", t: "யாழ்ப்பாணம்" }
};

export function BusList() {
  const { data: buses, isLoading } = useQuery({
    queryKey: ['buses'],
    queryFn: async () => [
      { 
        id: 1, routeNo: "01", name: "Kandy Express", route: "Colombo - Kandy", time: "06:15 AM", price: 850, rating: 4.5, 
        type: "A/C Intercity", gate: "Bastian Mawatha", operator: "Private",
        entertainment: "Full DJ 🎶", features: ["Fast Wi-Fi", "USB Charging"]
      },
      { 
        id: 2, routeNo: "EX-01", name: "Southern Luxury", route: "Colombo - Galle", time: "08:45 AM", price: 1250, rating: 4.9, 
        type: "Expressway", gate: "Makumbura (MMC)", operator: "SLTB Luxury",
        entertainment: "Classic FM 📻", features: ["Reclining Seats", "A/C"]
      },
      { 
        id: 3, routeNo: "15", name: "Jaffna Night King", route: "Colombo - Jaffna", time: "08:00 PM", price: 2800, rating: 4.7, 
        type: "Super Luxury", gate: "Pettah", operator: "Private",
        entertainment: "Non-stop Movies 🎬", features: ["Blankets", "Water Bottle"]
      },
    ]
  });

  if (isLoading) return <div className="text-center py-20 text-slate-500 italic">අපි බස් හොයනවා... Looking for buses...</div>;

  return (
    <div className="grid gap-8">
      {buses?.map((bus, index) => {
        const [from, to] = bus.route.split(" - ");
        return (
          <motion.div
            key={bus.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-slate-900/40 border-slate-800 hover:border-blue-500/50 transition-all overflow-hidden relative group">
              <div className={`absolute top-0 left-0 w-1 h-full ${bus.operator.includes('SLTB') ? 'bg-blue-600' : 'bg-red-500'}`} />
              
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
                  
                  <div className="flex items-center gap-5">
                    <div className="flex flex-col items-center justify-center bg-slate-950 border-2 border-slate-800 rounded-lg w-20 h-20 shadow-inner group-hover:border-blue-500/50 transition-colors">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Route</span>
                      <span className="text-2xl font-black text-white">{bus.routeNo}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        {bus.name}
                        {bus.type === 'Expressway' && <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 text-[10px] py-0 border-none">
                          {bus.operator}
                        </Badge>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                           <Volume2 className="w-3 h-3" /> {bus.entertainment}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between col-span-1 lg:col-span-2 px-6 border-x border-slate-800/50">
                    <div className="text-left">
                      <div className="text-lg font-bold">{from}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-tighter">
                        {cityTranslations[from]?.s} • {cityTranslations[from]?.t}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center px-4 w-full max-w-[150px]">
                      <div className="flex items-center gap-2 mb-2">
                         <div className="p-1 rounded-full bg-slate-800"><Music className="w-3 h-3 text-slate-400" /></div>
                         <div className="p-1 rounded-full bg-slate-800"><Film className="w-3 h-3 text-slate-400" /></div>
                      </div>
                      <div className="w-full h-[1px] bg-slate-800 relative">
                        <div className="absolute right-0 -top-[2px] w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                      </div>
                      <div className="text-[9px] text-slate-500 mt-2 font-mono uppercase tracking-widest">{bus.type}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold">{to}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-tighter">
                        {cityTranslations[to]?.s} • {cityTranslations[to]?.t}
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end gap-3">
                    <div className="flex flex-col items-end leading-none">
                      <span className="text-2xl font-black text-white tracking-tighter">
                        LKR {bus.price}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold mt-1 uppercase italic">Only 4 seats left!</span>
                    </div>
                    <div className="flex gap-2 w-full">
                      <Link href={`/bus/${bus.id}`} className="flex-1">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full shadow-lg shadow-blue-900/20 group">
                          Book Now
                          <Bus className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      <Link href={`/track/${bus.id}`}>
                        <Button size="icon" variant="outline" className="border-slate-700 hover:bg-slate-800 h-11 w-11">
                          <LocateFixed className="w-4 h-4 text-slate-400" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
