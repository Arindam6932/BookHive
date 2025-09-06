export default function About() {
  return (
    // COLOR UPDATE: The card now has a semi-transparent, blurred background.
    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-soft p-6 md:p-8 max-w-3xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">About BookHive</h1>
        
        <p className="text-slate-700 dark:text-slate-300">
          BookHive is a design-thinking led platform that tackles two core problems: unaffordable textbooks for students and unsold inventory for bookstores. The marketplace uses ISBN scanning for correct editions, condition grading for trust, smart pricing to keep books affordable, and an escrow payment flow to keep both sides safe.
        </p>
        
        <ul className="list-disc ml-6 space-y-1 text-slate-700 dark:text-slate-300">
          <li>Buyer experience: browse by course/semester, verify editions, and pay via escrow.</li>
          <li>Seller experience: easy uploads (and bulk CSV for vendors), transparent pricing, delivery options.</li>
          <li>Logistics: pickup, local courier and intercity delivery choices at checkout.</li>
        </ul>
        
        <p className="text-slate-600 dark:text-slate-400">
          This is a demo UI built with React, Vite and TailwindCSS. Swap the mock data with live APIs when your backend is ready.
        </p>
      </div>
    </div>
  )
}
