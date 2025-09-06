import { Link } from 'react-router-dom'

export default function DeliveryPartners() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Join BookHive as a Delivery Partner</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Help students, teachers, and bookstores get their books delivered quickly and efficiently.
        </p>
        <Link
          to="/signup"
          className="inline-block mt-4 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Become a Partner
        </Link>
      </section>

      {/* Benefits Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Why Join Us?</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Flexible Hours</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Work when it suits you. Deliver books at your convenience.
            </p>
          </div>
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Earn Extra Income</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get paid per delivery and enjoy extra income every week.
            </p>
          </div>
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Support Students</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Help the community by making books accessible faster.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">How It Works</h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-700 dark:text-gray-300">
          <li>Sign up as a delivery partner through our application form.</li>
          <li>Complete identity verification and provide necessary documents.</li>
          <li>Receive delivery requests via our app.</li>
          <li>Pick up and deliver books safely and on time.</li>
          <li>Get paid for every successful delivery.</li>
        </ol>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          Ready to start your journey with BookHive?
        </p>
        <Link
          to="/signup"
          className="inline-block px-8 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          Apply Now
        </Link>
      </section>

    </div>
  )
}
