'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { CreditCard } from 'lucide-react';

interface PayHereProps {
  orderId: string;
  items: string;
  amount: number;
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
}

export function PayHereButton({ orderId, items, amount, customer }: PayHereProps) {
  const handlePayment = () => {
    // PayHere Sandbox Configuration
    const payment = {
      sandbox: true,
      merchant_id: "1211149", // Replace with your Merchant ID
      return_url: `${window.location.origin}/payment/success`,
      cancel_url: `${window.location.origin}/payment/cancel`,
      notify_url: `https://your-backend.railway.app/payments/notify`, // Your NestJS notify endpoint
      order_id: orderId,
      items: items,
      amount: amount.toFixed(2),
      currency: "LKR",
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      country: "Sri Lanka",
    };

    // PayHere JS Integration
    (window as any).payhere.onCompleted = function onCompleted(orderId: string) {
      console.log("Payment completed. OrderID:" + orderId);
      window.location.href = `/payment/success?order_id=${orderId}`;
    };

    (window as any).payhere.onDismissed = function onDismissed() {
      console.log("Payment dismissed");
    };

    (window as any).payhere.onError = function onError(error: string) {
      console.log("Error:" + error);
    };

    (window as any).payhere.startPayment(payment);
  };

  return (
    <Button onClick={handlePayment} className="w-full bg-orange-500 hover:bg-orange-600 font-bold">
      <CreditCard className="mr-2 h-4 w-4" />
      Pay via PayHere
    </Button>
  );
}
