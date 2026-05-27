'use client';

import { useState, useEffect } from 'react';

// Real locations for major Sri Lankan cities for the simulation
const cityCoords = {
  "Colombo": [6.9271, 79.8612],
  "Kandy": [7.2906, 80.6337],
  "Galle": [6.0535, 80.2210],
  "Matara": [5.9549, 80.5550],
  "Jaffna": [9.6615, 80.0255]
};

export function useBusTracking(from: string, to: string) {
  const [currentPos, setCurrentPos] = useState<[number, number] | null>(null);
  const start = (cityCoords as any)[from] || cityCoords.Colombo;
  const end = (cityCoords as any)[to] || cityCoords.Kandy;

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.01;
      if (progress > 1) progress = 0;
      
      const lat = start[0] + (end[0] - start[0]) * progress;
      const lng = start[1] + (end[1] - start[1]) * progress;
      setCurrentPos([lat, lng]);
    }, 2000);

    return () => clearInterval(interval);
  }, [from, to]);

  return currentPos;
}
