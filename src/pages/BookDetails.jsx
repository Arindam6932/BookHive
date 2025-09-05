import { useParams, Link } from 'react-router-dom'
import { books } from '../data/books.js'
import { currency, conditionColor } from '../utils/format.js'
import { ShieldCheck, Truck } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

export default function BookDetails() {
  const { isbn } = useParams()
  const book = books.find(b => b.isbn === isbn)
  const { add } = useCart()

  if (!book) return <div className="card bg-white dark:bg-gray-800 p-6 rounded-xl text-slate-700 dark:text-slate-300">Book not found.</div>

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="card bg-white dark:bg-gray-800 overflow-hidden rounded-xl shadow-soft">
        <img src={book.img} alt={book.title} className="w-full object-cover h-[380px]" />
      </div>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold leading-tight text-slate-800 dark:text-white">{book.title}</h1>
        <p className="text-slate-600 dark:text-slate-400">by {book.author}</p>
        <div className="flex flex-wrap items-center gap-3">
          <span className={`badge ${conditionColor(book.condition)}`}>{book.condition}</span>
          <span className="badge bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300">ISBN {book.isbn}</span>
          <span className="badge bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300">{book.semester}</span>
        </div>
        <p className="text-slate-700 dark:text-slate-300">{book.desc}</p>
        <div className="flex items-end gap-3">
          <div className="text-3xl font-bold text-slate-800 dark:text-white">{currency(book.price)}</div>
          <div className="text-slate-500 dark:text-slate-400 line-through">{currency(book.mrp)}</div>
        </div>
        <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Escrow: Payment released after buyer confirms condition.</div>
          <div className="flex items-center gap-2"><Truck className="h-4 w-4" /> Delivery: Pickup, local courier or intercity options at checkout.</div>
        </div>
        <div className="flex gap-3 pt-2">
          <button className="btn btn-primary" onClick={()=>{ add(book); location.assign('/checkout') }}>Buy via Escrow</button>
          <Link to="/browse" className="btn btn-ghost bg-slate-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">Back to Browse</Link>
        </div>
      </div>
    </div>
  )
}

