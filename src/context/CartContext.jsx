import { createContext, useContext, useMemo, useState } from 'react'

const CartCtx = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const add = (book) => {
    setItems((prev) => {
      const exists = prev.find(b => b.isbn === book.isbn)
      if (exists) return prev
      return [...prev, book]
    })
  }
  const remove = (isbn) => setItems(prev => prev.filter(b => b.isbn !== isbn))
  const clear = () => setItems([])
  const total = items.reduce((sum, b) => sum + b.price, 0)

  const value = useMemo(() => ({ items, add, remove, clear, total }), [items, total])
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export const useCart = () => useContext(CartCtx)
