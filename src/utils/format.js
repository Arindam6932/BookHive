export const currency = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
export const conditionColor = (cond) => ({
  "New": "bg-emerald-50 border-emerald-200 text-emerald-700",
  "Like New": "bg-teal-50 border-teal-200 text-teal-700",
  "Good": "bg-amber-50 border-amber-200 text-amber-800",
  "Acceptable": "bg-rose-50 border-rose-200 text-rose-700",
}[cond] || "bg-slate-50 border-slate-200 text-slate-700")
