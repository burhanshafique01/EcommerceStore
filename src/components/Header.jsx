import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { Search, ShoppingCart, Menu, X, Phone, Truck } from 'lucide-react'
import Logo from './Logo'
import { DEPARTMENTS } from '../data/products'
import { useCart } from '../context/CartContext'

function SearchBar({ className = '' }) {
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') || '')
  const navigate = useNavigate()

  useEffect(() => {
    setQ(params.get('q') || '')
  }, [params])

  const submit = (e) => {
    e.preventDefault()
    const term = q.trim()
    navigate(term ? `/shop?q=${encodeURIComponent(term)}` : '/shop')
  }

  return (
    <form onSubmit={submit} role="search" className={`flex w-full ${className}`}>
      <label htmlFor="site-search" className="sr-only">Search products</label>
      <input
        id="site-search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search pliers, tape, wrenches, brake pads…"
        className="min-w-0 flex-1 rounded-l-md border border-r-0 border-steel-200 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-steel-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-r-md bg-brand-700 px-4 text-sm font-semibold text-white hover:bg-brand-800"
      >
        <Search size={18} />
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  )
}

export default function Header() {
  const { count } = useCart()
  const [open, setOpen] = useState(false)

  const navCls = ({ isActive }) =>
    `whitespace-nowrap px-3 py-2.5 text-sm font-semibold transition ${
      isActive ? 'text-white' : 'text-brand-100 hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      {/* Utility strip */}
      <div className="hidden bg-steel-900 text-xs text-steel-200 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5">
          <span className="flex items-center gap-1.5"><Truck size={14} /> Free delivery on orders over Rs 5,000</span>
          <span className="flex items-center gap-1.5"><Phone size={14} /> 0300-0000000 · Mon-Sat 9am-8pm</span>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:gap-6">
        <button
          type="button"
          className="-ml-1 rounded p-1.5 text-brand-800 md:hidden"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu size={24} />
        </button>
        <Link to="/" aria-label="Faisal Hardware home" className="shrink-0">
          <Logo className="h-9 w-auto md:h-11" />
        </Link>
        <SearchBar className="hidden md:flex" />
        <Link
          to="/cart"
          className="relative ml-auto inline-flex items-center gap-2 rounded-md px-2 py-2 text-brand-800 hover:bg-brand-50 md:ml-0"
          aria-label={`Cart, ${count} items`}
        >
          <ShoppingCart size={24} />
          <span className="hidden text-sm font-semibold lg:inline">Cart</span>
          {count > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-500 px-1 text-[11px] font-bold text-white">
              {count}
            </span>
          )}
        </Link>
      </div>
      <div className="px-4 pb-3 md:hidden">
        <SearchBar />
      </div>

      {/* Department nav */}
      <nav className="hidden bg-brand-800 md:block" aria-label="Departments">
        <div className="mx-auto flex max-w-7xl items-center px-2">
          <NavLink to="/" end className={navCls}>Home</NavLink>
          <NavLink to="/shop" end className={navCls}>All Products</NavLink>
          {DEPARTMENTS.map((d) => (
            <Link key={d.key} to={`/shop?dept=${d.key}`} className="whitespace-nowrap px-3 py-2.5 text-sm font-semibold text-brand-100 hover:text-white">
              {d.name}
            </Link>
          ))}
          <Link to="/shop?sort=discount" className="ml-auto whitespace-nowrap rounded bg-accent-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white hover:bg-accent-600">
            Deals
          </Link>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-steel-900/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85%] overflow-y-auto bg-white p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <Logo className="h-8 w-auto" />
              <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="p-1 text-steel-500">
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col text-sm" onClick={() => setOpen(false)}>
              <Link to="/" className="rounded px-2 py-2 font-semibold hover:bg-steel-100">Home</Link>
              <Link to="/shop" className="rounded px-2 py-2 font-semibold hover:bg-steel-100">All Products</Link>
              <Link to="/cart" className="rounded px-2 py-2 font-semibold hover:bg-steel-100">Cart ({count})</Link>
              {DEPARTMENTS.map((d) => (
                <div key={d.key} className="mt-3 border-t border-steel-100 pt-3">
                  <Link to={`/shop?dept=${d.key}`} className="block px-2 py-1 font-display text-base font-bold uppercase tracking-wide text-brand-800">
                    {d.name}
                  </Link>
                  {d.categories.map((c) => (
                    <Link key={c.key} to={`/shop?dept=${d.key}&cat=${c.key}`} className="block rounded px-2 py-1.5 text-steel-700 hover:bg-steel-100">
                      {c.name}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
