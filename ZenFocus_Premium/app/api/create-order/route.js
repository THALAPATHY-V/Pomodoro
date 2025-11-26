import Razorpay from 'razorpay';
export async function POST(){
  try{
    const r = new Razorpay({ key_id: process.env.RAZORPAY_KEY, key_secret: process.env.RAZORPAY_SECRET });
    const order = await r.orders.create({ amount: 9900, currency: 'INR', receipt: 'rcpt_' + Date.now(), payment_capture: 1 });
    return Response.json(order);
  }catch(e){
    return Response.json({ error: e.message }, { status: 500 });
  }
}
