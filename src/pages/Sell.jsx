import { useState } from 'react'

export default function Sell() {
  const [form, setForm] = useState({ title: '', author: '', isbn: '', condition: 'Good', price: '', semester: '' })
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // Common styles for input elements
  const inputStyles = "input bg-white dark:bg-gray-700 border border-slate-300 dark:border-gray-600 rounded-lg dark:text-white dark:placeholder-gray-400 w-full";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Sell a Book</h1>
      <div className="card bg-white dark:bg-gray-800 p-6 space-y-4 rounded-xl shadow-soft">
        <div className="grid sm:grid-cols-2 gap-4">
          <input name="title" className={inputStyles} placeholder="Title" value={form.title} onChange={onChange} />
          <input name="author" className={inputStyles} placeholder="Author" value={form.author} onChange={onChange} />
          <input name="isbn" className={inputStyles} placeholder="ISBN (Scan or type)" value={form.isbn} onChange={onChange} />
          <select name="condition" className={inputStyles} value={form.condition} onChange={onChange}>
            <option>New</option><option>Like New</option><option>Good</option><option>Acceptable</option>
          </select>
          <input name="price" type="number" className={inputStyles} placeholder="Price (₹)" value={form.price} onChange={onChange} />
          <input name="semester" className={inputStyles} placeholder="Semester / Course" value={form.semester} onChange={onChange} />
        </div>
        <textarea name="desc" className={inputStyles} placeholder="Short description (edition, highlights, any writing...)" rows="3" onChange={onChange} />
        <div className="flex flex-wrap gap-3">
          <button className="btn btn-primary" onClick={()=>alert('This is a demo. In production, this would create a listing with escrow enabled.')}>List Book</button>
          <button className="btn btn-ghost bg-slate-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600" onClick={()=>alert('Bulk upload allows CSV with ISBN, price, condition, etc.')}>Bulk Upload (CSV)</button>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">Tip: Use the ISBN from the back cover to guarantee the correct edition for buyers.</p>
      </div>
    </div>
  )
}
