'use client';
import {useState} from 'react';
export default function Purchase(){
  const [loading,setLoading]=useState(false);
  async function buy(){ setLoading(true);
    try{
      const res = await fetch('/api/create-order', { method:'POST' });
      const j = await res.json();
      if(!res.ok) throw new Error(j.error||'Order failed');
      const { id: orderId, amount } = j;
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || '',
        amount,
        currency: 'INR',
        name: 'ZenFocus Premium',
        description: 'One-time unlock',
        order_id: orderId,
        handler: function(response){
          alert('Payment success: ' + response.razorpay_payment_id);
        }
      };
      if(!window.Razorpay){
        await new Promise((resolve,reject)=>{ const s=document.createElement('script'); s.src='https://checkout.razorpay.com/v1/checkout.js'; s.onload=resolve; s.onerror=reject; document.body.appendChild(s); });
      }
      const rzp = new window.Razorpay(options);
      rzp.open();
    }catch(e){ alert('Error: '+(e.message||e)); } finally{ setLoading(false); }
  }
  return <div><button className="btn btn-primary" onClick={buy} disabled={loading}>{loading?'Processing…':'Buy Premium — ₹99'}</button></div>;
}
