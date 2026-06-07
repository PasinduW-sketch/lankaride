'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArmchairIcon, Armchair, User } from 'lucide-react';

interface Seat {
  id: number;
  status: 'available' | 'occupied' | 'selected';
}

interface SeatMapProps {
  seats: Seat[];
  maxSelect?: number;
  onSeatsChange?: (selected: number[]) => void;
}

const seatLayout = [
  { row: 1, left: [1, 2], right: [3, 4] },
  { row: 2, left: [5, 6], right: [7, 8] },
  { row: 3, left: [9, 10], right: [11, 12] },
  { row: 4, left: [13, 14], right: [15, 16] },
  { row: 5, left: [17, 18], right: [19, 20] },
  { row: 6, left: [21, 22], right: [23, 24] },
  { row: 7, left: [25, 26], right: [27, 28] },
  { row: 8, left: [29, 30], right: [31, 32] },
  { row: 9, left: [33, 34], right: [35, 36] },
  { row: 10, left: [37, 38], right: [39, 40] },
];

export function SeatMap({ seats, maxSelect = 4, onSeatsChange }: SeatMapProps) {
  const [selected, setSelected] = useState<number[]>([]);

  const seatMap = new Map(seats.map(s => [s.id, s]));

  const handleSeatClick = (seatId: number) => {
    const seat = seatMap.get(seatId);
    if (!seat || seat.status === 'occupied') return;

    setSelected(prev => {
      let next: number[];
      if (prev.includes(seatId)) {
        next = prev.filter(id => id !== seatId);
      } else if (prev.length < maxSelect) {
        next = [...prev, seatId];
      } else {
        return prev;
      }
      onSeatsChange?.(next);
      return next;
    });
  };

  const getSeatColor = (seat: Seat | undefined) => {
    if (!seat) return 'bg-slate-800/30 border-slate-700/30 cursor-default';
    if (seat.status === 'occupied') return 'bg-red-500/20 border-red-500/40 text-red-400 cursor-not-allowed';
    if (selected.includes(seat.id)) return 'bg-blue-500/30 border-blue-400/60 text-blue-300 shadow-lg shadow-blue-500/20';
    return 'bg-slate-800/60 border-slate-600/40 text-slate-400 hover:border-blue-500/50 hover:bg-slate-700/60 cursor-pointer';
  };

  return (
    <div className="flex flex-col items-center space-y-10">
      <div className="w-full max-w-md bg-slate-900/60 rounded-3xl border border-slate-800 p-8 relative overflow-hidden">
        <div className="w-full h-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mb-8" />
        <div className="text-center text-xs text-slate-500 uppercase tracking-widest mb-8 font-mono">
          Driver
        </div>

        <div className="flex justify-center gap-12">
          <div className="space-y-2">
            {seatLayout.map(({ row, left, right }) => (
              <div key={row} className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  {left.map(seatId => {
                    const seat = seatMap.get(seatId);
                    return (
                      <motion.button
                        key={seatId}
                        whileTap={seat?.status !== 'occupied' ? { scale: 0.9 } : undefined}
                        onClick={() => handleSeatClick(seatId)}
                        disabled={seat?.status === 'occupied'}
                        className={`w-9 h-9 rounded-lg border text-[10px] font-bold flex items-center justify-center transition-all duration-200 ${getSeatColor(seat)}`}
                        title={`Seat ${seatId}${seat?.status === 'occupied' ? ' (Occupied)' : ''}`}
                      >
                        {seatId}
                      </motion.button>
                    );
                  })}
                </div>
                <div className="w-4" />
                <div className="flex gap-1.5">
                  {right.map(seatId => {
                    const seat = seatMap.get(seatId);
                    return (
                      <motion.button
                        key={seatId}
                        whileTap={seat?.status !== 'occupied' ? { scale: 0.9 } : undefined}
                        onClick={() => handleSeatClick(seatId)}
                        disabled={seat?.status === 'occupied'}
                        className={`w-9 h-9 rounded-lg border text-[10px] font-bold flex items-center justify-center transition-all duration-200 ${getSeatColor(seat)}`}
                        title={`Seat ${seatId}${seat?.status === 'occupied' ? ' (Occupied)' : ''}`}
                      >
                        {seatId}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/50 flex items-center justify-center gap-8">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-4 h-4 rounded bg-slate-800/60 border border-slate-600/40" />
            Available
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-4 h-4 rounded bg-blue-500/30 border border-blue-400/60" />
            Selected
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-4 h-4 rounded bg-red-500/20 border border-red-500/40" />
            Booked
          </div>
        </div>
      </div>

      <div className="text-sm text-slate-400">
        {selected.length === 0 ? (
          'Select your seats'
        ) : (
          <span className="text-blue-400 font-bold">
            {selected.length} seat{selected.length > 1 ? 's' : ''} selected: Seats {selected.join(', ')}
          </span>
        )}
      </div>
    </div>
  );
}
