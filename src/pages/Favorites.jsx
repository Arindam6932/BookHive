import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { Heart, BookOpen } from 'lucide-react';

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="text-center p-10 rounded-2xl shadow-soft glass">
        <Heart className="mx-auto h-16 w-16 text-slate-400 dark:text-gray-500" />
        <h2 className="mt-4 text-2xl font-bold text-slate-800 dark:text-white">Your Favorites is Empty</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Click the heart icon on any book to save it here for later.
        </p>
        <Link to="/browse" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
          <BookOpen className="inline-block mr-2 -mt-1" size={20} />
          Start Browsing
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">My Favorites</h1>
      <div className="space-y-4">
        {favorites.map((book) => (
          <div key={book.id} className="flex items-center gap-4 p-4 rounded-2xl shadow-soft glass">
            <img src={book.imageUrl || 'https://api.dicebear.com/6.x/icons/svg?seed=book'} alt={book.title} className="w-16 h-20 object-cover rounded-md" />
            <div className="flex-grow">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">{book.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{book.author}</p>
            </div>
            <button onClick={() => toggleFavorite(book)} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-gray-700 rounded-full transition">
              <Heart className="fill-current" />
              <span className="sr-only">Remove from favorites</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}