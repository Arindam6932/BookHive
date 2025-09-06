import { Link } from 'react-router-dom'
import { User, BookOpen, Truck, Info, Heart, Settings } from 'lucide-react'

export default function Sidebar({ open, onClose, onMouseLeave, showAuthModal, setShowAuthModal, user }) {
  return (
    <>
      {/* Overlay: Closes the sidebar when clicked */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-50 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* UPDATE: Added semi-transparent background and backdrop-blur effect. */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        } z-50`}
        onMouseLeave={onMouseLeave}
      >
        {/* UPDATE: Updated border color for dark mode consistency. */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center">
          <h3 className="font-bold text-lg text-slate-800 dark:text-white">BookHive Menu</h3>
        </div>

        {/* UPDATE: Updated hover and text colors for dark mode consistency. */}
        <nav className="p-4 space-y-2 text-sm">
          <Link to="/browse" onClick={onClose} className="block py-2 px-3 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
            <BookOpen className="inline-block mr-2" /> Buy a Book
          </Link>
          <Link to="/sell" onClick={onClose} className="block py-2 px-3 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
            <BookOpen className="inline-block mr-2" /> Sell a Book
          </Link>
          <Link to="/delivery-partners" onClick={onClose} className="block py-2 px-3 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
            <Truck className="inline-block mr-2" /> Join as Delivery Partner
          </Link>
          <Link to="/scan-isbn" onClick={onClose} className="block py-2 px-3 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
            <BookOpen className="inline-block mr-2" /> Scan ISBN
          </Link>

          <Link 
            to={user ? "/profile" : "/signin"}
            onClick={() => {
              if (!user && setShowAuthModal) {
                 // Modal logic remains here
              }
              onClose();
            }}
            className="flex items-center gap-2 w-full text-left py-2 px-3 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <User className="inline-block" />
            {user ? 'My Profile' : 'Profile / Sign In'}
          </Link>

          <Link to="/favorites" onClick={onClose} className="block py-2 px-3 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
            <Heart className="inline-block mr-2" /> Favorites
          </Link>
          
          {/* ADDED SETTINGS LINK */}
          <Link to="/settings" onClick={onClose} className="block py-2 px-3 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
            <Settings className="inline-block mr-2" /> Settings
          </Link>

          <Link to="/about" onClick={onClose} className="block py-2 px-3 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
            <Info className="inline-block mr-2" /> About Us
          </Link>

          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
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
