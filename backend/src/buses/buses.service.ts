import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

@Injectable()
export class BusesService {
  private supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_KEY || ''
  );

  private NOTIFY_API_KEY = process.env.NOTIFY_API_KEY || 'YOUR_NOTIFY_LK_KEY';
  private NOTIFY_USER_ID = process.env.NOTIFY_USER_ID || 'YOUR_USER_ID';

  // ... previous search and booking methods ...

  async confirmBooking(bookingId: string) {
    // 1. Fetch booking details
    const { data: booking, error } = await this.supabase
      .from('bookings')
      .select('*, buses(*)')
      .eq('id', bookingId)
      .single();

    if (error || !booking) throw new Error('Booking not found');

    // 2. Format the Sri Lankan SMS message
    const message = `LankaRide: Booking Confirmed! 
Bus: ${booking.buses.route_number} (${booking.buses.operator})
Seats: ${booking.seat_numbers.join(', ')}
Date: ${booking.booking_date}
Thank you for traveling with us!`;

    // 3. Send SMS via Notify.lk (or other provider)
    try {
      await axios.get('https://app.notify.lk/api/v1/send', {
        params: {
          user_id: this.NOTIFY_USER_ID,
          api_key: this.NOTIFY_API_KEY,
          sender_id: 'NotifyDEMO', // Replace with your registered Sender ID
          to: booking.user_phone,
          message: message
        }
      });
      console.log(`SMS Sent to ${booking.user_phone}`);
    } catch (e) {
      console.error('Failed to send SMS', e);
    }

    return booking;
  }
}
