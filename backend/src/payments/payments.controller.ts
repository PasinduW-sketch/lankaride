import { Controller, Post, Body, Req } from '@nestjs/common';
import * as crypto from 'crypto';

@Controller('payments')
export class PaymentsController {
  
  @Post('notify')
  async handleNotify(@Body() body: any) {
    const merchantId = body.merchant_id;
    const orderId = body.order_id;
    const payhereAmount = body.payhere_amount;
    const payhereCurrency = body.payhere_currency;
    const statusCode = body.status_code;
    const md5sig = body.md5sig;

    const merchantSecret = process.env.PAYHERE_SECRET || 'YOUR_PAYHERE_SECRET';
    
    // Generate secure hash to verify notification
    const hashedSecret = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
    const amountFormatted = parseFloat(payhereAmount).toFixed(2);
    
    const checkSig = crypto.createHash('md5')
      .update(merchantId + orderId + amountFormatted + payhereCurrency + statusCode + hashedSecret)
      .digest('hex')
      .toUpperCase();

    if (checkSig === md5sig && statusCode === '2') {
      // Payment Successful
      console.log(`Payment confirmed for Order ID: ${orderId}`);
      // Update booking status in database (Supabase)
      return { status: 'success' };
    }

    return { status: 'failed' };
  }
}
