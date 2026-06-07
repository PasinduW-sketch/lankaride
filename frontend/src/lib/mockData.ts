export interface BusRoute {
  id: number;
  routeNo: string;
  name: string;
  route: string;
  from: string;
  to: string;
  time: string;
  price: number;
  rating: number;
  type: string;
  gate: string;
  operator: string;
  entertainment: string;
  features: string[];
  totalSeats: number;
  departureTime: string;
  arrivalTime: string;
  duration: string;
}

export const buses: BusRoute[] = [
  {
    id: 1, routeNo: "01", name: "Kandy Express", route: "Colombo - Kandy",
    from: "Colombo", to: "Kandy", time: "06:15 AM", price: 850,
    rating: 4.5, type: "A/C Intercity", gate: "Bastian Mawatha",
    operator: "Private", entertainment: "Full DJ 🎶",
    features: ["Fast Wi-Fi", "USB Charging"],
    totalSeats: 40, departureTime: "06:15 AM", arrivalTime: "11:00 AM",
    duration: "3h 00m"
  },
  {
    id: 2, routeNo: "EX-01", name: "Southern Luxury", route: "Colombo - Galle",
    from: "Colombo", to: "Galle", time: "08:45 AM", price: 1250,
    rating: 4.9, type: "Expressway", gate: "Makumbura (MMC)",
    operator: "SLTB Luxury", entertainment: "Classic FM 📻",
    features: ["Reclining Seats", "A/C"],
    totalSeats: 36, departureTime: "08:45 AM", arrivalTime: "11:00 AM",
    duration: "1h 30m"
  },
  {
    id: 3, routeNo: "15", name: "Jaffna Night King", route: "Colombo - Jaffna",
    from: "Colombo", to: "Jaffna", time: "08:00 PM", price: 2800,
    rating: 4.7, type: "Super Luxury", gate: "Pettah",
    operator: "Private", entertainment: "Non-stop Movies 🎬",
    features: ["Blankets", "Water Bottle"],
    totalSeats: 32, departureTime: "08:00 PM", arrivalTime: "05:00 AM",
    duration: "9h 00m"
  },
];

export const cityCoords: Record<string, [number, number]> = {
  "Colombo": [6.9271, 79.8612],
  "Kandy": [7.2906, 80.6337],
  "Galle": [6.0535, 80.2210],
  "Matara": [5.9549, 80.5550],
  "Jaffna": [9.6615, 80.0255]
};

export function getBusById(id: number): BusRoute | undefined {
  return buses.find(b => b.id === id);
}

export function generateSeats(total: number, booked: number[] = []): { id: number; status: 'available' | 'occupied' | 'selected' }[] {
  return Array.from({ length: total }, (_, i) => ({
    id: i + 1,
    status: booked.includes(i + 1) ? 'occupied' : 'available',
  }));
}
