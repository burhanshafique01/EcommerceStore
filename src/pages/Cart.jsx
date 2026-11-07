import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react'
import ProductImage from '../components/ProductImage'
import { useCart } from '../context/CartContext'
import { formatPKR } from '../data/products'

const FREE_DELIVERY_OVER = 5000
const DELIVERY_FEE = 250

export default function Cart() {
  const { items, subtotal, count, setQty, remove, clear } = useCart()

  if (!items.length) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <ShoppingCart size={56} strokeWidth={1.3} className="mx-auto text-steel-400" />
        <h1 className="mt-4 font-display text-3xl font-bold uppercase text-brand-900">Your cart is empty</h1>
        <p className="mt-2 text-steel-500">Find the part or tool you need and it will show up here.</p>
        <Link to="/shop" className="mt-6 inline-block rounded-md bg-accent-500 px-6 py-3 font-semibold text-white hover:bg-accent-600">
          Start shopping
        </Link>
      </div>
    )
  }

  const delivery = subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE
  const total = subtotal + delivery
  const remaining = FREE_DELIVERY_OVER - subtotal

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-brand-900">
        Shopping cart <span className="text-steel-400">({count})</span>
      </h1>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_340px]">
        <section className="rounded-xl border border-steel-200 bg-white">
          <ul className="divide-y divide-steel-100">
            {items.map(({ id, qty, product }) => (
              <li key={id} className="flex gap-3 p-3 sm:gap-4 sm:p-4">
                <Link to={`/product/${product.slug}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-md sm:h-24 sm:w-24">
                  <ProductImage product={product} iconSize={32} showBrand={false} />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1">
                    <Link to={`/product/${product.slug}`} className="line-clamp-2 text-sm font-medium hover:text-brand-600">
                      {product.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-steel-500">{formatPKR(product.price)} each</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <div className="flex items-center rounded-md border border-steel-200">
                      <button type="button" aria-label="Decrease quantity" onClick={() => setQty(id, qty - 1)} className="p-1.5 hover:bg-steel-100" disabled={qty <= 1}>
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                      <button type="button" aria-label="Increase quantity" onClick={() => setQty(id, qty + 1)} className="p-1.5 hover:bg-steel-100" disabled={qty >= product.stock}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="w-24 text-right font-bold text-brand-800">{formatPKR(product.price * qty)}</span>
                    <button type="button" aria-label={`Remove ${product.name}`} onClick={() => remove(id)} className="p-1.5 text-steel-400 hover:text-accent-600">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between border-t border-steel-100 p-4 text-sm">
            <Link to="/shop" className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:underline">
              <ArrowLeft size={16} /> Continue shopping
            </Link>
            <button type="button" onClick={clear} className="font-semibold text-steel-500 hover:text-accent-600">
              Clear cart
            </button>
          </div>
        </section>

        <aside>
          <div className="sticky top-36 rounded-xl border border-steel-200 bg-white p-5">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-brand-900">Order summary</h2>
            {remaining > 0 && (
              <div className="mt-3 rounded-md bg-brand-50 p-3 text-xs text-brand-700">
                Add <b>{formatPKR(remaining)}</b> more for free delivery.
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-brand-100">
                  <div className="h-full bg-brand-600" style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY_OVER) * 100)}%` }} />
                </div>
              </div>
            )}
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-steel-500">Subtotal</dt><dd className="font-medium">{formatPKR(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-steel-500">Delivery</dt><dd className="font-medium">{delivery ? formatPKR(delivery) : 'Free'}</dd></div>
              <div className="flex justify-between border-t border-steel-100 pt-3 text-base"><dt className="font-semibold">Total</dt><dd className="font-extrabold text-brand-800">{formatPKR(total)}</dd></div>
            </dl>
            <button
              type="button"
              onClick={() => alert('Checkout is not connected yet. This is a demo storefront.')}
              className="mt-5 w-full rounded-md bg-accent-500 py-3 font-semibold text-white hover:bg-accent-600"
            >
              Proceed to checkout
            </button>
            <p className="mt-3 text-center text-xs text-steel-500">Cash on delivery · Bank transfer · JazzCash / Easypaisa</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
