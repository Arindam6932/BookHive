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

// Context Imports
import { CartProvider } from './context/CartContext.jsx';
import { useTheme } from './context/ThemeContext.jsx';

export default function App() {
  const { theme } = useTheme();

  return (
    <CartProvider>
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
        <Navbar />
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            {/* --- Main Pages --- */}
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/delivery-partners" element={<DeliveryPartners />} />
            <Route path="/book/:isbn" element={<BookDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/scan-isbn" element={<ScanIsbn />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />

            {/* --- Authentication --- */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* --- Protected Routes --- */}
            <Route path="/vendor" element={<ProtectedRoute><VendorDashboard /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}