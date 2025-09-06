import { books } from '/src/data/books.js'
import BookCard from '/src/components/BookCard.jsx'
import Hero from '/src/components/Hero.jsx'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="space-y-8">
      <Hero />
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold dark:text-gray-100">Popular right now</h2>
          <Link to="/browse" className="text-primary-700 hover:underline dark:text-primary-400">See all</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map(b => <BookCard key={b.isbn} b={b} />)}
        </div>
      </section>
    </div>
  )
}

