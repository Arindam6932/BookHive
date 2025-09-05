import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, Menu, Sun, Moon, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import logo from '../assets/logo.svg'
import { useState } from 'react'
import Sidebar from './Sidebar.jsx'

const NavItem = ({ to, children }) => {
  const { theme, primaryColor } = useTheme();

  const bgMap = {
    blue: 'bg-theme-blue-500 hover:bg-theme-blue-600',
    green: 'bg-theme-green-500 hover:bg-theme-green-600',
    pink: 'bg-theme-pink-500 hover:bg-theme-pink-600',
    purple: 'bg-theme-purple-500 hover:bg-theme-purple-600',
  }
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-2xl transition border border-transparent hidden md:block ${
          isActive
            ? `${theme === 'light' ? bgMap[primaryColor] : 'bg-gray-700'} shadow-soft border-slate-200 ${
                theme === 'light' ? 'text-black' : 'text-white'
              }`
            : `hover:shadow-soft ${theme === 'light' ? 'hover:' + bgMap[primaryColor] : 'hover:bg-gray-700'} ${
                theme === 'light' ? 'text-black' : 'text-white'
              }`
        }`
      }
    >
      {children}
    </NavLink>
  )
}

export default function Navbar() {
  const { items } = useCart()
  const { user } = useAuth()
  const { theme, setTheme, primaryColor, setPrimaryColor } = useTheme();
  const [open, setOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  const bgMap = {
    blue: 'bg-theme-blue-500',
    green: 'bg-theme-green-500',
    pink: 'bg-theme-pink-500',
    purple: 'bg-theme-purple-500',
  }

  return (
    <>
      <Sidebar open={open} onClose={() => setOpen(false)} />

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-2 right-2 p-1 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="text-lg font-bold mb-4 text-black dark:text-white">Welcome</h2>
            <div className="flex flex-col gap-3">
              <Link
                to="/signin"
                onClick={() => setShowAuthModal(false)}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white text-center hover:bg-blue-600"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setShowAuthModal(false)}
                className="px-4 py-2 rounded-lg bg-green-500 text-white text-center hover:bg-green-600"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-2 w-full z-40">
        <div
          className={`mx-auto max-w-[95%] rounded-3xl shadow-heavy ${
            theme === 'dark' ? 'bg-gray-800 text-white' : `${bgMap[primaryColor]} text-black`
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between relative z-50">
            <div className="flex items-center gap-3">
              <button
                className={`p-2 rounded-md hover:bg-white/20`}
                onClick={() => setOpen(!open)}
                aria-label="Toggle sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>
              <Link to="/" className="flex items-center gap-2 font-bold">
                <img src={logo} alt="logo" className="h-8" />
                <span>BookHive</span>
              </Link>
            </div>

            <div className="flex items-center gap-3 relative z-50">
              <NavItem to="/browse">Browse</NavItem>
              <NavItem to="/sell">Sell</NavItem>
              <NavItem to="/delivery-partners">Delivery Partner</NavItem>
              
              <Link to="/checkout" className="relative p-2 rounded-md hover:bg-white/20">
                <ShoppingCart className="h-5 w-5" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{items.length}</span>
                )}
              </Link>

              <button
                onClick={() => {
                  if (!user) setShowAuthModal(true)
                }}
                className="flex items-center gap-2 focus:outline-none p-1 rounded-md hover:bg-white/20"
              >
                {user ? (
                  <>
                    <img
                      src={user.photoURL || 'https://api.dicebear.com/6.x/initials/svg?seed=' + (user.displayName || user.email)}
                      alt="avatar"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="hidden sm:inline">{user.displayName || user.email}</span>
                  </>
                ) : (
                  <span className="px-2 py-1">Profile</span>
                )}
              </button>
              
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="p-2 rounded-full hover:bg-white/20"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </button>

              {/* This entire select block will now only render if the theme is 'light' */}
              {theme === 'light' && (
                <select
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="px-2 py-1 rounded border-none focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/20 text-current"
                >
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="pink">Pink</option>
                  <option value="purple">Purple</option>
                </select>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}