import { Injectable } from '@nestjs/common';

@Injectable()
export class BusesService {
  private mockBuses = [
    { id: 1, name: "SLTB Express", route: "Colombo - Kandy", time: "08:30 AM", price: 1200, rating: 4.8, type: "Luxury" },
    { id: 2, name: "Super Line", route: "Colombo - Galle", time: "09:45 AM", price: 1500, rating: 4.9, type: "Super Luxury" },
    { id: 3, name: "NTC Private", route: "Colombo - Jaffna", time: "10:00 PM", price: 2500, rating: 4.5, type: "Super Luxury" },
  ];

  searchBuses(from: string, to: string) {
    if (!from || !to) return this.mockBuses;
    return this.mockBuses.filter(b => b.route.includes(from) && b.route.includes(to));
  }

  // Placeholder for real SLTB API integration
  async fetchSltbData() {
    // try {
    //   const response = await axios.get('https://api.sltb.lk/v1/schedules');
    //   return response.data;
    // } catch (e) {
    //   return [];
    // }
  }
}
