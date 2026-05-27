import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class BusesService {
  private supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_KEY || ''
  );

  async searchBuses(from: string, to: string) {
    let query = this.supabase.from('buses').select('*');

    if (from) query = query.eq('from_city', from);
    if (to) query = query.eq('to_city', to);

    const { data, error } = await query;
    
    if (error) {
      console.error('Supabase Error:', error);
      return [];
    }

    return data;
  }

  async createBooking(bookingData: any) {
    const { data, error } = await this.supabase
      .from('bookings')
      .insert([bookingData])
      .select();

    if (error) throw error;
    return data;
  }
}
