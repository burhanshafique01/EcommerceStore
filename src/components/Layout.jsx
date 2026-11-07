import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'
import { useCart } from '../context/CartContext'

function CartToast() {
  const { toast } = useCart()
  if (!toast) return null
  return (
    <div
      key={toast.key}
      role="status"
      className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center gap-3 rounded-lg bg-steel-900 px-4 py-3 text-sm text-white shadow-xl"
    >
      <CheckCircle2 size={20} className="shrink-0 text-emerald-400" />
      <span className="line-clamp-1 flex-1">Added: {toast.name}</span>
      <Link to="/cart" className="shrink-0 font-semibold text-accent-500 hover:underline">View cart</Link>
    </div>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartToast />
    </div>
  )
}
