'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Bus, MapPin, Clock, Signal, Wifi } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBusById, cityCoords } from "@/lib/mockData";
import { useBusTracking } from "@/hooks/useBusTracking";

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(m => m.Polyline), { ssr: false });

function BusTrackingContent() {
  const params = useParams();
  const router = useRouter();
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    import('leaflet').then(leaflet => {
      delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });
      setL(leaflet);
    });
  }, []);

  const bus = getBusById(Number(params.id));
  const pos = useBusTracking(bus?.from || 'Colombo', bus?.to || 'Kandy');
  const startCoord = cityCoords[bus?.from || 'Colombo'] || cityCoords.Colombo;
  const endCoord = cityCoords[bus?.to || 'Kandy'] || cityCoords.Kandy;

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

  const center: [number, number] = [
    (startCoord[0] + endCoord[0]) / 2,
    (startCoord[1] + endCoord[1]) / 2,
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-6">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-slate-900/60 border-slate-800 overflow-hidden">
              <CardContent className="p-0">
                <div className="h-[500px] w-full relative">
                  {L && (
                    <MapContainer center={center} zoom={8} className="h-full w-full" zoomControl={false}>
                      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                      <Marker position={startCoord}>
                        <Popup>{bus.from} (Departure)</Popup>
                      </Marker>
                      <Marker position={endCoord}>
                        <Popup>{bus.to} (Arrival)</Popup>
                      </Marker>
                      <Polyline positions={[startCoord, endCoord]} pathOptions={{ color: '#3b82f6', weight: 3, opacity: 0.6, dashArray: '10 10' }} />
                      {pos && (
                        <Marker position={pos}>
                          <Popup>
                            <div className="text-sm font-bold">📍 {bus.name}</div>
                            <div className="text-xs text-slate-500">En route to {bus.to}</div>
                          </Popup>
                        </Marker>
                      )}
                    </MapContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="bg-slate-900/60 border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-green-400">Live Tracking Active</span>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex flex-col items-center justify-center bg-slate-950 border border-slate-700 rounded-lg w-14 h-14">
                    <span className="text-[9px] text-slate-500 font-bold uppercase">Route</span>
                    <span className="text-lg font-black">{bus.routeNo}</span>
                  </div>
                  <div>
                    <div className="font-bold text-lg">{bus.name}</div>
                    <Badge className="bg-blue-500/10 text-blue-400 text-[10px] border-none">{bus.operator}</Badge>
                  </div>
                </div>

                <div className="space-y-3 p-4 bg-slate-950/50 rounded-xl border border-slate-800/50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-blue-400" /> From
                    </span>
                    <span className="font-bold">{bus.from}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-cyan-400" /> To
                    </span>
                    <span className="font-bold">{bus.to}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Clock className="w-3 h-3 text-yellow-400" /> Duration
                    </span>
                    <span className="font-bold">{bus.duration}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Signal className="w-3 h-3 text-green-500" /> GPS Online
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi className="w-3 h-3 text-green-500" /> Real-time
                  </div>
                </div>
              </CardContent>
            </Card>

            <Link href={`/bus/${bus.id}`}>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12">
                <Bus className="w-4 h-4 mr-2" />
                Book This Route
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function BusTrackingPage() {
  return <BusTrackingContent />;
}
