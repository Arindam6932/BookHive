import { Link } from 'react-router-dom'
import { User, BookOpen, Truck, Info, Heart } from 'lucide-react'

export default function Sidebar({ open, onClose, showAuthModal, setShowAuthModal, user }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-50 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        } z-50`}
      >
        <div className="p-4 border-b border-slate-200 dark:border-gray-700 flex items-center">
          <h3 className="font-bold text-lg text-slate-800 dark:text-white">BookHive Menu</h3>
        </div>

        <nav className="p-4 space-y-2 text-sm">
          <Link to="/browse" onClick={onClose} className="block py-2 px-3 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-700">
            <BookOpen className="inline-block mr-2" /> Buy a Book
          </Link>
          <Link to="/sell" onClick={onClose} className="block py-2 px-3 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-700">
            <BookOpen className="inline-block mr-2" /> Sell a Book
          </Link>
          <Link to="/delivery-partners" onClick={onClose} className="block py-2 px-3 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-700">
            <Truck className="inline-block mr-2" /> Join as Delivery Partner
          </Link>
          <Link to="/scan-isbn" onClick={onClose} className="block py-2 px-3 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-700">
            <BookOpen className="inline-block mr-2" /> Scan ISBN
          </Link>

          <button
            onClick={() => {
              if (!user) setShowAuthModal(true)
              onClose()
            }}
            className="flex items-center gap-2 w-full text-left py-2 px-3 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-700 focus:outline-none"
          >
            <User className="inline-block" />
            {user ? 'My Profile' : 'Profile'}
          </button>

          <Link to="/favorites" onClick={onClose} className="block py-2 px-3 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-700">
            <Heart className="inline-block mr-2" /> Favorites
          </Link>
          <Link to="/about" onClick={onClose} className="block py-2 px-3 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-700">
            <Info className="inline-block mr-2" /> About Us
          </Link>

          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-gray-700 text-xs text-slate-500 dark:text-slate-400">
            <strong className="text-slate-600 dark:text-slate-300">About BookHive</strong>
            <p className="mt-2">
              BookHive is a community marketplace for students, teachers and bookstores to buy & sell books.
              Earn points, manage listings and get books delivered.
            </p>
          </div>
        </nav>
      </div>
    </>
  )
}
