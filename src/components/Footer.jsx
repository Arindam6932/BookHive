import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-gray-800 border-t border-slate-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-slate-600 dark:text-slate-400">
        <p>© 2025 BookHive. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link to="/about" className="hover:underline">About Us</Link>
          {/* Change this link to point to the new page */}
          <Link to="/terms-of-service" className="hover:underline">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}