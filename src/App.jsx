import { Routes, Route } from 'react-router-dom';

// Component & Page Imports
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Browse from './pages/Browse.jsx';
import Sell from './pages/Sell.jsx';
import BookDetails from './pages/BookDetails.jsx';
import VendorDashboard from './pages/VendorDashboard.jsx';
import Checkout from './pages/Checkout.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import About from './pages/About.jsx';
import Profile from './pages/Profile.jsx';
import DeliveryPartners from './pages/DeliveryPartners.jsx';
import ScanIsbn from './pages/ScanIsbn.jsx';
import TermsOfService from './pages/TermsOfService.jsx';
import Favorites from './pages/Favorites.jsx';
import Settings from './pages/Settings.jsx';

// Context Imports
import { CartProvider } from './context/CartContext.jsx';
import { useTheme } from './context/ThemeContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';

export default function App() {
  const { theme, primaryColor } = useTheme();

  const backgroundMap = {
    teal: 'bg-theme-teal-50',
    indigo: 'bg-theme-indigo-50',
    rose: 'bg-theme-rose-50',
    amber: 'bg-theme-amber-50',
  };

  const lightModeBg = backgroundMap[primaryColor] || 'bg-slate-50';

  return (
    <CartProvider>
      <FavoritesProvider>
        <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
            theme === 'dark' 
              ? 'bg-slate-900 text-slate-200' 
              : `${lightModeBg} text-slate-800`
          }`}
        >
          <Navbar />
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/sell" element={<Sell />} />
              <Route path="/delivery-partners" element={<DeliveryPartners />} />
              <Route path="/book/:isbn" element={<BookDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/scan-isbn" element={<ScanIsbn />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/vendor" element={<ProtectedRoute><VendorDashboard /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </FavoritesProvider>
    </CartProvider>
  );
}

