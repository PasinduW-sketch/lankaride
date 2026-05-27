'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bus, Clock, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";

async function fetchBuses() {
  // This will call our NestJS backend eventually
  // const { data } = await axios.get('http://localhost:3001/buses');
  // return data;
  
  // Mock data for now
  return [
    { id: 1, name: "SLTB Express", route: "Colombo - Kandy", time: "08:30 AM", price: 1200, rating: 4.8, type: "Luxury" },
    { id: 2, name: "Super Line", route: "Colombo - Galle", time: "09:45 AM", price: 1500, rating: 4.9, type: "Super Luxury" },
  ];
}

export function BusList() {
  const { data: buses, isLoading } = useQuery({
    queryKey: ['buses'],
    queryFn: fetchBuses
  });

  if (isLoading) return <div className="text-center py-10">Loading buses...</div>;

  return (
    <div className="grid gap-6">
      {buses?.map((bus: any) => (
        <Card key={bus.id} className="bg-slate-900 border-slate-800 hover:border-blue-500/50 transition-all">
          <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <Bus className="text-blue-500 w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{bus.name}</h3>
                <p className="text-slate-400">{bus.route}</p>
              </div>
            </div>
            
            <div className="flex gap-8 text-center text-sm text-slate-400">
              <div>
                <Clock className="w-4 h-4 mx-auto mb-1" />
                {bus.time}
              </div>
              <div>
                <Star className="w-4 h-4 mx-auto mb-1 text-yellow-500" />
                {bus.rating}
              </div>
              <Badge variant="outline" className="h-fit">{bus.type}</Badge>
            </div>

            <div className="text-right">
              <div className="text-2xl font-black mb-2">LKR {bus.price}</div>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Book Now</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
