import React from 'react';

export default function TermsOfService() {
  return (
    <div className="prose dark:prose-invert max-w-4xl mx-auto py-8">
      <h1>BookHive Terms of Service</h1>
      <p className="text-sm text-gray-500">Last updated: September 5, 2025</p>
      
      <p>Welcome to BookHive! These Terms of Service ("Terms") govern your use of our platform and services. By creating an account or using BookHive, you agree to these terms for buying, selling, and delivering pre-owned academic books.</p>

      <hr />

      <h2>1. General Terms for All Users</h2>
      <ul>
        <li><strong>Account Registration:</strong> You must provide accurate and current information to register for an account. You are responsible for all activity that occurs under your account and for keeping your password secure.</li>
        <li><strong>Prohibited Conduct:</strong> You agree not to engage in any fraudulent activity, harass other users, violate any laws, or interfere with the operation of the platform.</li>
        <li><strong>Platform Content:</strong> BookHive owns the platform and its content, but you own the content you post (like book listings). You grant us a license to use your content to operate and promote the service.</li>
      </ul>

      <hr />

      <h2>2. Terms for Buyers 🛍️</h2>
      <ul>
        <li><strong>Purchasing:</strong> When you purchase a book, you are entering into a binding contract with the seller. You agree to pay the listed price and any applicable shipping fees.</li>
        <li><strong>Book Condition:</strong> While sellers are required to list books accurately, you understand that these are pre-owned items. Please review the description and photos carefully before purchasing.</li>
        <li><strong>Payments:</strong> All payments are processed through our secure payment gateway. Your payment information is encrypted and handled securely.</li>
        <li><strong>Refunds & Disputes:</strong> If a book is not as described or does not arrive, you may open a dispute through the platform. Refunds are issued based on the outcome of the dispute process.</li>
      </ul>

      <hr />

      <h2>3. Terms for Sellers 📚</h2>
      <ul>
        <li><strong>Listing Accuracy:</strong> You must provide truthful and accurate descriptions, photos, and condition details for every book you list. Misrepresentation may lead to account suspension.</li>
        <li><strong>Pricing:</strong> You are free to set the price for your books. BookHive will deduct a service fee from the final sale price, which will be clearly communicated to you.</li>
        <li><strong>Fulfillment:</strong> You are responsible for packaging the book securely and preparing it for pickup by a Delivery Partner in a timely manner after a sale is confirmed.</li>
        <li><strong>Payouts:</strong> Your earnings will be transferred to your designated account after the buyer confirms receipt of the book or after a set period has passed.</li>
      </ul>
      
      <hr />

      <h2>4. Terms for Delivery Partners 🚚</h2>
      <ul>
        <li><strong>Independent Contractor Status:</strong> You operate as an independent contractor. You are not an employee of BookHive and are responsible for your own vehicle, insurance, and taxes.</li>
        <li><strong>Responsibilities:</strong> You agree to handle packages with care, complete deliveries professionally and on time, and maintain clear communication through the platform.</li>
        <li><strong>Payment:</strong> You will be paid a fee for each completed delivery, as outlined in the app. Payments are disbursed on a regular schedule (e.g., weekly).</li>
        <li><strong>Liability:</strong> You must maintain valid vehicle insurance. You agree to indemnify BookHive from any claims or damages arising from your actions while performing deliveries.</li>
      </ul>
      
      <hr />

      <div className="mt-8 p-4 bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 rounded-r-lg">
        <h3 className="font-bold text-yellow-800 dark:text-yellow-300">Legal Disclaimer</h3>
        <p className="text-yellow-700 dark:text-yellow-200">
          <strong>Important:</strong> This is a general template and is <strong>not legal advice.</strong> You must consult with a qualified legal professional to customize these terms to be fully compliant with the laws and regulations in your specific location.
        </p>
      </div>
    </div>
  );
}