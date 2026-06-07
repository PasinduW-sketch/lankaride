'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { QRCode } from 'react-qr-code';
import { CheckCircle, Bus, ArrowLeft, Printer } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBusById } from "@/lib/mockData";

function BookingContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId') || '';
  const busId = Number(searchParams.get('busId'));
  const seats = searchParams.get('seats') || '';
  const total = searchParams.get('total') || '0';
  const bus = getBusById(busId);

  return (
    <>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-12">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }}>
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        </motion.div>
        <h1 className="text-4xl font-black mb-3">Booking Confirmed!</h1>
        <p className="text-slate-400">Your e-ticket is ready. Show this QR code at boarding.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="bg-slate-900/60 border-slate-800 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-blue-600 to-cyan-500" />
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="bg-white p-4 rounded-2xl">
                <QRCode value={`LankaRide:${bookingId}`} size={160} />
              </div>
              <div className="flex-1 space-y-4 w-full">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Booking Ref</span>
                  <div className="text-lg font-mono font-bold text-blue-400">{bookingId}</div>
                </div>

                {bus && (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center justify-center bg-slate-950 border border-slate-700 rounded-lg w-14 h-14">
                        <span className="text-[9px] text-slate-500 font-bold uppercase">Route</span>
                        <span className="text-lg font-black">{bus.routeNo}</span>
                      </div>
                      <div>
                        <div className="font-bold">{bus.name}</div>
                        <Badge className="bg-blue-500/10 text-blue-400 text-[10px] border-none">{bus.operator}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-4 bg-slate-950/50 rounded-xl border border-slate-800/50">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase">From</div>
                        <div className="font-bold">{bus.from}</div>
                        <div className="text-xs text-slate-500">{bus.departureTime}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-500 uppercase">To</div>
                        <div className="font-bold">{bus.to}</div>
                        <div className="text-xs text-slate-500">{bus.arrivalTime}</div>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex justify-between text-sm border-t border-slate-800 pt-3">
                  <span className="text-slate-400">Seats</span>
                  <span className="font-bold">{seats}</span>
                </div>
                <div className="flex justify-between text-lg font-black border-t border-slate-800 pt-3">
                  <span>Total Paid</span>
                  <span className="text-green-400">LKR {Number(total).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex gap-4 mt-8 justify-center">
        <Button variant="outline" className="border-slate-700 bg-slate-900 hover:bg-slate-800">
          <Printer className="w-4 h-4 mr-2" />
          Print Ticket
        </Button>
        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Bus className="w-4 h-4 mr-2" />
            Book Another Trip
          </Button>
        </Link>
      </div>
    </>
  );
}

export default function BookingConfirmPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <Suspense fallback={
          <div className="text-center py-20 text-slate-500">Loading booking details...</div>
        }>
          <BookingContent />
        </Suspense>
      </div>
    </main>
  );
}
