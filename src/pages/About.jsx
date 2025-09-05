export default function About() {
  return (
    // To be consistent with other pages, we'll wrap this in a card-like container
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6 md:p-8 max-w-3xl mx-auto">
      <div className="space-y-4">
        {/* FIX: Added dark mode text color */}
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">About BookHive</h1>
        
        {/* FIX: Added dark mode text color */}
        <p className="text-slate-700 dark:text-slate-300">
          BookHive is a design-thinking led platform that tackles two core problems: unaffordable textbooks for students and unsold inventory for bookstores. The marketplace uses ISBN scanning for correct editions, condition grading for trust, smart pricing to keep books affordable, and an escrow payment flow to keep both sides safe.
        </p>
        
        {/* FIX: Added dark mode text color for the list items */}
        <ul className="list-disc ml-6 space-y-1 text-slate-700 dark:text-slate-300">
          <li>Buyer experience: browse by course/semester, verify editions, and pay via escrow.</li>
          <li>Seller experience: easy uploads (and bulk CSV for vendors), transparent pricing, delivery options.</li>
          <li>Logistics: pickup, local courier and intercity delivery choices at checkout.</li>
        </ul>
        
        {/* FIX: Added dark mode text color */}
        <p className="text-slate-600 dark:text-slate-400">
          This is a demo UI built with React, Vite and TailwindCSS. Swap the mock data with live APIs when your backend is ready.
        </p>
      </div>
    </div>
  )
}
