'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Bus, Clock, Star, MapPin, Zap, ShieldCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SeatMap } from "@/components/SeatMap";
import { getBusById, generateSeats } from "@/lib/mockData";

export default function BusDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bus = getBusById(Number(params.id));
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  if (!bus) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Bus not found</h1>
          <Link href="/" className="text-blue-400 hover:underline">Back to home</Link>
        </div>
      </div>
    );
  }

  const bookedSeats = [3, 7, 11, 15, 19, 23, 28, 32, 35, 38];
  const seats = generateSeats(bus.totalSeats, bookedSeats);
  const totalPrice = selectedSeats.length * bus.price;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-slate-900/60 border-slate-800 overflow-hidden">
                <div className={`h-1 ${bus.operator.includes('SLTB') ? 'bg-blue-600' : 'bg-red-500'}`} />
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex flex-col items-center justify-center bg-slate-950 border border-slate-700 rounded-lg w-16 h-16">
                          <span className="text-[10px] text-slate-500 font-bold uppercase">Route</span>
                          <span className="text-xl font-black">{bus.routeNo}</span>
                        </div>
                        <div>
                          <h1 className="text-2xl font-bold">{bus.name}</h1>
                          <Badge className="bg-blue-500/10 text-blue-400 text-xs mt-1 border-none">{bus.operator}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-white">LKR {bus.price}</div>
                      <div className="text-xs text-slate-500">per seat</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 p-5 bg-slate-950/50 rounded-2xl border border-slate-800/50">
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">From</div>
                      <div className="text-lg font-bold">{bus.from}</div>
                      <div className="text-xs text-slate-500">{bus.departureTime}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Duration</div>
                      <div className="text-lg font-bold text-blue-400">{bus.duration}</div>
                      <div className="flex justify-center mt-1">
                        <div className="w-full max-w-[80px] h-[2px] bg-slate-700 relative">
                          <div className="absolute right-0 -top-[3px] w-2 h-2 bg-blue-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">To</div>
                      <div className="text-lg font-bold">{bus.to}</div>
                      <div className="text-xs text-slate-500">{bus.arrivalTime}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {bus.features.map(f => (
                      <Badge key={f} variant="secondary" className="bg-slate-800 text-slate-300 border-none">{f}</Badge>
                    ))}
                    <Badge className="bg-yellow-500/10 text-yellow-500 border-none">{bus.entertainment}</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Select Your Seats</h2>
                <span className="text-xs text-slate-500">Max 4 per booking</span>
              </div>
              <SeatMap seats={seats} maxSelect={4} onSeatsChange={setSelectedSeats} />
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-28">
              <Card className="bg-slate-900/60 border-slate-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-6">Booking Summary</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Route</span>
                      <span className="font-medium">{bus.route}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Operator</span>
                      <span className="font-medium">{bus.operator}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Departure</span>
                      <span className="font-medium">{bus.departureTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Seats</span>
                      <span className="font-medium">
                        {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Not selected'}
                      </span>
                    </div>
                    <div className="border-t border-slate-800 pt-4 flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-blue-400">LKR {totalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base font-bold"
                    disabled={selectedSeats.length === 0}
                    onClick={() => {
                      const bookingId = `LKR${Date.now()}`;
                      router.push(`/booking/confirm?bookingId=${bookingId}&busId=${bus.id}&seats=${selectedSeats.join(',')}&total=${totalPrice}`);
                    }}
                  >
                    {selectedSeats.length === 0 ? 'Select Seats to Continue' : `Continue to Payment`}
                    <Bus className="ml-2 w-4 h-4" />
                  </Button>

                  <div className="mt-6 flex items-center gap-2 text-xs text-slate-500 justify-center">
                    <ShieldCheck className="w-3 h-3 text-green-500" />
                    Secured with PayHere
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
