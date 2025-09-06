import { Link } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import { currency, conditionColor } from '../utils/format.js'
import { useCart } from '../context/CartContext.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx' // Import the new Favorites hook

export default function BookCard({ b }) {
  const { add } = useCart()
  // Use the global favorites state and functions from the context
  const { toggleFavorite, isFavorite } = useFavorites()

  // This function is for the "Buy Now" button
  const buyNow = () => {
    add(b)
    // In a real app, you might navigate to checkout here
  }

  // Use the book's ISBN as its unique ID
  const bookId = b.isbn;

  return (
    <div className="card overflow-hidden flex flex-col bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl">
      <img src={b.img} className="h-40 w-full object-cover" alt={b.title} loading="lazy" />
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold leading-snug line-clamp-2 dark:text-gray-100">{b.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{b.author}</p>
          </div>
          <span className={`badge ${conditionColor(b.condition)}`}>{b.condition}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-500 dark:text-slate-400 line-through">{currency(b.mrp)}</div>
            <div className="font-semibold dark:text-gray-100">{currency(b.price)}</div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="btn bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white" onClick={()=>add(b)}><ShoppingCart className="h-4 w-4 inline-block mr-1" /> Add to cart</button>
            <button className="btn btn-primary bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600" onClick={buyNow}>Buy now</button>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <span>{b.genre || b.semester}</span>
        <div className="flex items-center gap-3">
          {/* This button now uses the global context to manage its state */}
          <button 
            onClick={() => toggleFavorite({ ...b, id: bookId })} 
            className="inline-flex items-center gap-1 underline"
          >
            <Star className={`h-3 w-3 transition-colors ${isFavorite(bookId) ? 'text-yellow-400 fill-current' : 'text-slate-500'}`} /> 
            {isFavorite(bookId) ? 'Favorited' : 'Favorite'}
          </button>
          <Link to={`/book/${b.isbn}`} className="btn-link text-primary-700 dark:text-primary-400">View</Link>
        </div>
      </div>
    </div>
  )
}