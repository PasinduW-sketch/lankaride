'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { setSearchQuery } from '@/lib/slices/busSlice';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar, Search, ArrowRightLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const cities = ["Colombo", "Kandy", "Galle", "Matara", "Jaffna"];

export function BusSearch() {
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.bus.searchQuery);
  const [localSearch, setLocalSearch] = useState(search);

  const handleSearch = () => {
    dispatch(setSearchQuery(localSearch));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto"
    >
      <Card className="bg-slate-900 shadow-2xl border-slate-800">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4" />
                <Select onValueChange={(v) => setLocalSearch({...localSearch, from: v})}>
                  <SelectTrigger className="pl-10 bg-slate-950 border-slate-800">
                    <SelectValue placeholder="Origin" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900">
                    {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setLocalSearch({ ...localSearch, from: localSearch.to, to: localSearch.from })}
              >
                <ArrowRightLeft className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500 w-4 h-4" />
                <Select onValueChange={(v) => setLocalSearch({...localSearch, to: v})}>
                  <SelectTrigger className="pl-10 bg-slate-950 border-slate-800">
                    <SelectValue placeholder="Destination" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900">
                    {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Button 
                onClick={handleSearch}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Search className="w-4 h-4 mr-2" />
                Find Buses
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
