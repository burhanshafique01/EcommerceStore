import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { products } from '../data/products'

const CartContext = createContext(null)
const STORAGE_KEY = 'faisal-hardware-cart'

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    // Drop items whose product no longer exists in products.js
    return Array.isArray(parsed) ? parsed.filter((i) => products.some((p) => p.id === i.id)) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart) // [{ id, qty }]
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable, cart stays in memory */
    }
  }, [items])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(t)
  }, [toast])

  const value = useMemo(() => {
    const detailed = items
      .map((i) => ({ ...i, product: products.find((p) => p.id === i.id) }))
      .filter((i) => i.product)
    const count = detailed.reduce((s, i) => s + i.qty, 0)
    const subtotal = detailed.reduce((s, i) => s + i.qty * i.product.price, 0)
    const clampQty = (product, qty) => Math.max(1, Math.min(qty, product.stock || 1))

    return {
      items: detailed,
      count,
      subtotal,
      toast,
      addToCart(product, qty = 1) {
        if (!product.stock) return
        setItems((prev) => {
          const found = prev.find((i) => i.id === product.id)
          if (found) return prev.map((i) => (i.id === product.id ? { ...i, qty: clampQty(product, i.qty + qty) } : i))
          return [...prev, { id: product.id, qty: clampQty(product, qty) }]
        })
        setToast({ key: Date.now(), name: product.name })
      },
      setQty(id, qty) {
        const product = products.find((p) => p.id === id)
        if (!product) return
        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: clampQty(product, qty) } : i)))
      },
      remove(id) {
        setItems((prev) => prev.filter((i) => i.id !== id))
      },
      clear() {
        setItems([])
      },
    }
  }, [items, toast])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
