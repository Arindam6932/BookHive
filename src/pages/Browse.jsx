import { useMemo, useState } from 'react'
import { books as all } from '/src/data/books.js' // FIX: Absolute path
import BookCard from '/src/components/BookCard.jsx' // FIX: Absolute path

const genres = ['All', 'Fiction', 'Non-fiction', 'Science', 'Engineering', 'Mathematics', 'History', 'Business', 'Art', 'Reference']

export default function Browse() {
  const [q, setQ] = useState('')
  const [genre, setGenre] = useState('All')
  const [edition, setEdition] = useState('All')
  const [isbn, setIsbn] = useState('')

  const editions = useMemo(() => ['All', ...Array.from(new Set(all.map(b => b.edition || 'Unknown')))], [])
  const filtered = all.filter(b => {
    const okQ = [b.title, b.author, b.isbn].join(' ').toLowerCase().includes(q.toLowerCase())
    const okG = genre === 'All' || (b.genre || '').toLowerCase() === genre.toLowerCase()
    const okE = edition === 'All' || (b.edition || 'Unknown') === edition
    const okIsbn = !isbn || b.isbn === isbn
    return okQ && okG && okE && okIsbn
  })

  const scanIsbn = () => {
    // In a real app, you would replace this with a camera scanning library.
    const val = prompt('Simulated ISBN scanner: paste ISBN here')
    if (val) setIsbn(val.trim())
  }

  // Common styles for input elements for reusability
  const inputStyles = "input bg-white dark:bg-gray-700 border border-slate-300 dark:border-gray-600 rounded-lg dark:text-white dark:placeholder-gray-400";

  return (
    <div className="space-y-6">
      <div className="p-4 bg-slate-50 dark:bg-gray-800 rounded-xl space-y-4">
        <div className="grid sm:grid-cols-3 gap-3">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search title, author or ISBN" className={`${inputStyles} col-span-1 sm:col-span-2`} />
          <div className="flex gap-2">
             <button onClick={scanIsbn} className="btn bg-white dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 w-full sm:w-auto">Scan ISBN</button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
           <select className={inputStyles} value={genre} onChange={e=>setGenre(e.target.value)}>
             {genres.map(g => <option key={g}>{g}</option>)}
           </select>
           <select className={inputStyles} value={edition} onChange={e=>setEdition(e.target.value)}>
             {editions.map(e => <option key={e}>{e}</option>)}
           </select>
           <div className="text-sm text-slate-500 dark:text-slate-400">Results: {filtered.length}</div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(b => <BookCard key={b.isbn} b={b} />)}
      </div>
      {filtered.length === 0 && (
        <div className="card bg-white dark:bg-gray-800 p-8 text-center text-slate-600 dark:text-slate-300 rounded-xl">No results. Try a different search.</div>
      )}
    </div>
  )
}
