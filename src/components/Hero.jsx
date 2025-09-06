import { Link } from 'react-router-dom'
import { ScanBarcode, ShieldCheck, Truck } from 'lucide-react'
import booksImage from "/src/assets/books.png";

export default function Hero() {
  return (
    // UPDATE: Gradient now uses a more visible primary-100 shade.
    <section className="relative overflow-hidden rounded-3xl shadow-heavy border border-slate-200 bg-gradient-to-br from-white to-primary-100 dark:border-slate-700 dark:from-slate-900 dark:to-slate-800 dark:text-white">
      {/* UPDATE: Decorative blurs are more vibrant. */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary-300/30 blur-3xl dark:bg-primary-900/40" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary-200/40 blur-3xl dark:bg-primary-800/50" />
      <div className="relative p-8 sm:p-12 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">Buy & Sell Pre‑Owned Academic Books with Confidence</h1>
          <p className="text-slate-600 dark:text-slate-300">BookHive connects students and bookstores. Scan ISBNs, verify editions, pay via escrow, and save up to 70% every semester.</p>
          <div className="flex flex-wrap gap-3">
            {/* This button will now use the new vibrant primary color automatically */}
            <Link to="/browse" className="btn btn-primary bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600">Browse Books</Link>
            <Link to="/sell" className="btn btn-ghost bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white">Sell a Book</Link>
          </div>
          <div className="flex gap-6 pt-3 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2"><ScanBarcode className="h-5 w-5" /> ISBN & Edition Match</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5" /> Escrow‑Protected</div>
            <div className="flex items-center gap-2"><Truck className="h-5 w-5" /> Pickup or Delivery</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="card p-4 bg-white/60 dark:bg-slate-800/50 rounded-2xl">
            <img src={booksImage} alt="Bookshelf" className="rounded-xl shadow-md" />
          </div>
          <div className="card p-4 mt-8 bg-white/60 dark:bg-slate-800/50 rounded-2xl">
            <img src="https://images.unsplash.com/photo-1553729784-e91953dec042?q=80&w=800&auto=format&fit=crop" alt="Study" className="rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}