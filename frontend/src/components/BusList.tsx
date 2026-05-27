'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bus, Clock, Star, MapPin, Zap, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const cityTranslations: Record<string, { s: string, t: string }> = {
  "Colombo": { s: "කොළඹ", t: "கொழும்பு" },
  "Kandy": { s: "මහනුවර", t: "கண்டி" },
  "Galle": { s: "ගාල්ල", t: "ගාලේ" },
  "Matara": { s: "මාතර", t: "மாத்தறை" },
  "Jaffna": { s: "යාපනය", t: "யாழ்ப்பாணம்" }
};

export function BusList() {
  const { data: buses, isLoading } = useQuery({
    queryKey: ['buses'],
    queryFn: async () => [
      { id: 1, routeNo: "01", name: "Kandy Express", route: "Colombo - Kandy", time: "06:15 AM", price: 850, rating: 4.5, type: "A/C Intercity", gate: "Bastian Mawatha", operator: "Private" },
      { id: 2, routeNo: "EX-01", name: "Southern Luxury", route: "Colombo - Galle", time: "08:45 AM", price: 1250, rating: 4.9, type: "Expressway", gate: "Makumbura (MMC)", operator: "SLTB Luxury" },
      { id: 3, routeNo: "15", name: "Jaffna Night King", route: "Colombo - Jaffna", time: "08:00 PM", price: 2800, rating: 4.7, type: "Super Luxury", gate: "Pettah", operator: "Private" },
    ]
  });

  if (isLoading) return <div className="text-center py-20 text-slate-500">සොයමින් පවතී... Searching...</div>;

  return (
    <div className="grid gap-8">
      {buses?.map((bus, index) => {
        const [from, to] = bus.route.split(" - ");
        return (
          <motion.div
            key={bus.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-slate-900/40 border-slate-800 hover:border-blue-500/50 transition-all overflow-hidden relative group">
              {/* SL Unique Decor: Side Stripe */}
              <div className={`absolute top-0 left-0 w-1 h-full ${bus.operator.includes('SLTB') ? 'bg-blue-600' : 'bg-red-500'}`} />
              
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
                  
                  {/* Route & Route Number */}
                  <div className="flex items-center gap-5">
                    <div className="flex flex-col items-center justify-center bg-slate-950 border-2 border-slate-800 rounded-lg w-16 h-16 shadow-inner group-hover:border-blue-500/50 transition-colors">
                      <span className="text-xs text-slate-500 font-bold uppercase">Route</span>
                      <span className="text-xl font-black text-white">{bus.routeNo}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        {bus.name}
                        {bus.type === 'Expressway' && <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                      </h3>
                      <p className="text-sm text-slate-400 font-medium">{bus.operator}</p>
                    </div>
                  </div>

                  {/* Destiations with Local Language */}
                  <div className="flex items-center justify-between col-span-1 md:col-span-2 px-4 border-x border-slate-800/50">
                    <div className="text-left">
                      <div className="text-lg font-bold">{from}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-tighter">
                        {cityTranslations[from]?.s} • {cityTranslations[from]?.t}
                      </div>
                      <div className="text-xs text-blue-400 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {bus.gate}
                      </div>
                    </div>
                    <div className="flex flex-col items-center px-4">
                      <div className="w-12 h-[2px] bg-slate-800 relative">
                        <div className="absolute -right-1 -top-[4px] w-2 h-2 bg-slate-800 rounded-full" />
                      </div>
                      <div className="text-[10px] text-slate-500 mt-2 font-mono">{bus.type.toUpperCase()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{to}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-tighter">
                        {cityTranslations[to]?.s} • {cityTranslations[to]?.t}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">{bus.time} Arrival</div>
                    </div>
                  </div>

                  {/* Pricing & Booking */}
                  <div className="text-right flex flex-col items-end gap-3">
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-slate-500 font-bold">Starting from</span>
                      <span className="text-3xl font-black text-white tracking-tighter">
                        LKR {bus.price}
                      </span>
                    </div>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto shadow-lg shadow-blue-900/20">
                      Reserve Seat
                    </Button>
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
