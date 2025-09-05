import { Link } from 'react-router-dom'
import { BookmarkPlus, IndianRupee, ShoppingCart, Star } from 'lucide-react'
import { currency, conditionColor } from '../utils/format.js'
import { useCart } from '../context/CartContext.jsx'
import { useState, useEffect } from 'react'

export default function BookCard({ b }) {
  const { add } = useCart()
  const [fav, setFav] = useState(false)

  useEffect(()=> {
    const favs = JSON.parse(localStorage.getItem('bh_favs') || '[]')
    setFav(favs.includes(b.isbn))
  },[b.isbn])

  const toggleFav = () => {
    const favs = JSON.parse(localStorage.getItem('bh_favs') || '[]')
    if (favs.includes(b.isbn)) {
      const updated = favs.filter(x=>x!==b.isbn)
      localStorage.setItem('bh_favs', JSON.stringify(updated))
      setFav(false)
    } else {
      favs.push(b.isbn)
      localStorage.setItem('bh_favs', JSON.stringify(favs))
      setFav(true)
    }
  }

  const buyNow = () => {
    add(b)
    // navigate to checkout could be added; for now user can go to Checkout
  }

  return (
    // FIX: The card now has a dark background and border. Assuming `.card` in your CSS has `bg-white`.
    <div className="card overflow-hidden flex flex-col bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl">
      <img src={b.img} className="h-40 w-full object-cover" alt={b.title} loading="lazy" />
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            {/* FIX: Added dark mode text colors */}
            <h3 className="font-semibold leading-snug line-clamp-2 dark:text-gray-100">{b.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{b.author}</p>
          </div>
          {/* The badge color is handled by `conditionColor`, you may need to adjust that utility if it doesn't support dark mode */}
          <span className={`badge ${conditionColor(b.condition)}`}>{b.condition}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div>
            {/* FIX: Added dark mode text colors */}
            <div className="text-sm text-slate-500 dark:text-slate-400 line-through">{currency(b.mrp)}</div>
            <div className="font-semibold dark:text-gray-100">{currency(b.price)}</div>
          </div>
          <div className="flex flex-col gap-2">
            {/* FIX: Added dark mode styles to buttons. Assuming `.btn` styles in your CSS. */}
            <button className="btn bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white" onClick={()=>add(b)}><ShoppingCart className="h-4 w-4 inline-block mr-1" /> Add to cart</button>
            <button className="btn btn-primary bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600" onClick={buyNow}>Buy now</button>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <span>{b.genre || b.semester}</span>
        <div className="flex items-center gap-3">
          <button onClick={toggleFav} className="inline-flex items-center gap-1 underline">
            <Star className="h-3 w-3" /> {fav ? 'Favorited' : 'Favorite'}
          </button>
          <Link to={`/book/${b.isbn}`} className="btn-link text-primary-700 dark:text-primary-400">View</Link>
        </div>
      </div>
    </div>
  )
}
