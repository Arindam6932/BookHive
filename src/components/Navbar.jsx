import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, Menu, Sun, Moon, X, User } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import logo from '../assets/logo.svg'
import { useState, useRef, useEffect } from 'react'
import Sidebar from './Sidebar.jsx'

const NavItem = ({ to, children, onClick }) => {
  const { theme, primaryColor } = useTheme();

  // UPDATE: Refreshed color palette for active links
  const activeBgMap = {
    teal: 'bg-teal-500 hover:bg-teal-600',
    indigo: 'bg-indigo-500 hover:bg-indigo-600',
    rose: 'bg-rose-500 hover:bg-rose-600',
    amber: 'bg-amber-500 hover:bg-amber-600',
  }
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `px-3 py-2 rounded-2xl transition border border-transparent hidden md:block ${
          isActive
            ? `${theme === 'light' ? activeBgMap[primaryColor] : 'bg-slate-700'} shadow-soft border-slate-200 text-white`
            : `hover:shadow-soft ${theme === 'light' ? 'hover:' + activeBgMap[primaryColor] + ' hover:text-white' : 'hover:bg-slate-700'} ${
                theme === 'light' ? 'text-slate-800' : 'text-white'
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
  const { user, signOut } = useAuth()
  const { theme, setTheme, primaryColor, setPrimaryColor } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  
  const [sidebarOpenMethod, setSidebarOpenMethod] = useState('none');

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sidebarOpenMethod === 'none' && e.clientX < 20) {
        setSidebarOpenMethod('hover');
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [sidebarOpenMethod]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // UPDATE: Refreshed color palette for the navbar background in light mode
  const navbarBgMap = {
    teal: 'bg-teal-50/80 backdrop-blur-sm',
    indigo: 'bg-indigo-50/80 backdrop-blur-sm',
    rose: 'bg-rose-50/80 backdrop-blur-sm',
    amber: 'bg-amber-50/80 backdrop-blur-sm',
  }
  
  const handleMenuClick = () => {
    setSidebarOpenMethod(prev => (prev === 'click' ? 'none' : 'click'));
  };

  const handleSidebarClose = () => {
    setSidebarOpenMethod('none');
  };

  const handleSidebarMouseLeave = () => {
    if (sidebarOpenMethod === 'hover') {
      setSidebarOpenMethod('none');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut()
      setShowDropdown(false)
    } catch (error) {
      console.error("Failed to log out:", error)
    }
  }

  return (
    <>
      <Sidebar 
        open={sidebarOpenMethod !== 'none'} 
        onClose={handleSidebarClose}
        onMouseLeave={handleSidebarMouseLeave} 
        user={user}
        setShowAuthModal={() => {}} 
      />

      <header className="sticky top-2 w-full z-40">
        <div
          // UPDATE: Using new navbarBgMap and a cooler slate color for dark mode
          className={`mx-auto max-w-[98%] rounded-3xl shadow-heavy ${
            theme === 'dark' ? 'bg-slate-900/80 backdrop-blur-sm text-white' : `${navbarBgMap[primaryColor]} text-slate-800`
          }`}
        >
          <div className="px-4 py-3 flex items-center justify-between relative z-50 text-lg">
            <div className="flex items-center gap-3">
              <button
                className={`p-2 rounded-md hover:bg-white/20`}
                onClick={handleMenuClick}
                aria-label="Toggle sidebar"
              >
                <Menu className="h-6 w-6" />
              </button>
              <Link to="/" className="flex items-center gap-2 font-bold">
                <img src={logo} alt="logo" className="h-8" />
                <span>BookHive</span>
              </Link>
            </div>

            <div className="flex items-center gap-3 relative z-50">
              <NavItem to="/browse" onClick={handleSidebarClose}>Browse</NavItem>
              <NavItem to="/sell" onClick={handleSidebarClose}>Sell</NavItem>
              <NavItem to="/delivery-partners" onClick={handleSidebarClose}>Delivery</NavItem>
              
              <Link to="/checkout" className="relative p-2 rounded-md hover:bg-white/20">
                <ShoppingCart className="h-6 w-6" />
                {items.length > 0 && (
                  // UPDATE: Using a vibrant rose color for the notification badge
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{items.length}</span>
                )}
              </Link>

              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 focus:outline-none p-1 rounded-md hover:bg-white/20"
                  >
                    <img
                      src={user.photoURL || 'https://api.dicebear.com/6.x/initials/svg?seed=' + (user.displayName || user.email)}
                      alt="avatar"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  </button>
                  {showDropdown && (
                    // UPDATE: Dark mode dropdown uses slate
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50 text-base">
                      <Link
                        to="/profile"
                        onClick={() => setShowDropdown(false)}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                      >
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/signin" className="p-2 rounded-md hover:bg-white/20 flex items-center gap-1">
                  <User className="h-6 w-6" />
                  <span className="hidden sm:inline">Log In</span>
                </Link>
              )}
              
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="p-2 rounded-full hover:bg-white/20"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>

              {theme === 'light' && (
                <select
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="px-2 py-1 rounded border-none focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/20 text-current text-base"
                >
                  {/* UPDATE: More attractive color options */}
                  <option value="teal">Teal</option>
                  <option value="indigo">Indigo</option>
                  <option value="rose">Rose</option>
                  <option value="amber">Amber</option>
                </select>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

