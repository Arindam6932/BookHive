import { useCart } from '../context/CartContext.jsx'
import { currency } from '../utils/format.js'
import { Lock, Truck } from 'lucide-react'

export default function Checkout() {
  const { items, total, remove, clear } = useCart()

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 card p-6 space-y-4">
        <h1 className="text-2xl font-bold">Checkout</h1>
        {items.map(b => (
          <div key={b.isbn} className="flex items-center gap-4 border rounded-2xl p-3">
            <img src={b.img} className="h-16 w-16 rounded-xl object-cover" />
            <div className="flex-1">
              <div className="font-medium">{b.title}</div>
              <div className="text-sm text-slate-600">{b.author} • ISBN {b.isbn}</div>
            </div>
            <div className="font-semibold">{currency(b.price)}</div>
            <button className="btn btn-ghost" onClick={()=>remove(b.isbn)}>Remove</button>
          </div>
        ))}
        {items.length === 0 && <div className="text-slate-600">Your cart is empty.</div>}
      </div>
      <div className="card p-6 space-y-4 h-fit">
        <h2 className="font-semibold">Order Summary</h2>
        <div className="flex items-center justify-between">
          <span>Items</span><span>{currency(total)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Delivery</span><span>{currency(items.length ? 60 : 0)}</span>
        </div>
        <div className="border-t pt-2 flex items-center justify-between font-bold">
          <span>Total</span><span>{currency(items.length ? total + 60 : 0)}</span>
        </div>
        <div className="text-sm text-slate-700 space-y-2">
          <div className="flex items-center gap-2"><Lock className="h-4 w-4" /> Escrow: We hold the payment until you confirm book condition.</div>
          <div className="flex items-center gap-2"><Truck className="h-4 w-4" /> Delivery options at the next step.</div>
        </div>
        <button
          className="btn btn-primary w-full"
          disabled={!items.length}
          onClick={()=>{ clear(); alert('Demo: Escrow initialized. On production, Razorpay/UPI payment is captured into escrow until delivery confirmation.'); }}
        >
          Pay & Start Escrow
        </button>
      </div>
    </div>
  )
}
