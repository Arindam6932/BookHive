import { books } from '../data/books.js'
import { currency } from '../utils/format.js'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', sales: 24 },
  { name: 'Feb', sales: 18 },
  { name: 'Mar', sales: 32 },
  { name: 'Apr', sales: 40 },
  { name: 'May', sales: 28 },
  { name: 'Jun', sales: 35 },
]

export default function VendorDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <h2 className="font-semibold mb-3">Monthly Orders</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card p-6">
          <h2 className="font-semibold mb-3">Quick Stats</h2>
          <ul className="space-y-2 text-slate-700">
            <li>Active Listings: <b>{books.length}</b></li>
            <li>Avg. Discount: <b>48%</b></li>
            <li>Escrow Pending: <b>3</b></li>
            <li>Returns This Month: <b>0</b></li>
          </ul>
        </div>
      </div>
      <div className="card p-6">
        <h2 className="font-semibold mb-3">Your Listings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600 border-b">
                <th className="py-2 pr-4">Title</th>
                <th className="py-2 pr-4">ISBN</th>
                <th className="py-2 pr-4">Condition</th>
                <th className="py-2 pr-4">Price</th>
                <th className="py-2 pr-4">Location</th>
              </tr>
            </thead>
            <tbody>
              {books.map(b => (
                <tr key={b.isbn} className="border-b">
                  <td className="py-2 pr-4">{b.title}</td>
                  <td className="py-2 pr-4">{b.isbn}</td>
                  <td className="py-2 pr-4">{b.condition}</td>
                  <td className="py-2 pr-4">{currency(b.price)}</td>
                  <td className="py-2 pr-4">{b.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
