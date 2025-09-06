# BookHive – Frontend (Vite + React + Tailwind)

A clean, Microsoft‑inspired UI for a pre‑owned academic books marketplace. This repository demonstrates the Buyer, Seller and Payment (escrow) flows with mock data.

## Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Tech
- React 18 + Vite
- TailwindCSS (utility styling)
- React Router (routing)
- Lucide Icons (clean line icons)
- Recharts (vendor dashboard chart)

## Connect a Backend
Replace mock data from `src/data/books.js` with API calls (REST).
- Configure `.env` with your API base URL.
- Use `fetch` or `axios` in `useEffect` on pages that need data.
- Wire checkout to Razorpay/UPI and escrow status to your backend.
