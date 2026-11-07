import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronRight, Minus, Plus, ShoppingCart, Truck, ShieldCheck, Check } from 'lucide-react'
import ProductImage from '../components/ProductImage'
import ProductCard from '../components/ProductCard'
import Stars from '../components/Stars'
import NotFound from './NotFound'
import { products, getProductBySlug, getDepartment, getCategory, formatPKR } from '../data/products'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)

  if (!product) return <NotFound />

  const dept = getDepartment(product.department)
  const cat = getCategory(product.department, product.category)
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0
  const inStock = product.stock > 0
  const related = products.filter((p) => p.category === product.category && p.id !== product.id)
    .concat(products.filter((p) => p.department === product.department && p.category !== product.category))
    .slice(0, 4)

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <nav className="mb-4 flex flex-wrap items-center gap-1 text-xs text-steel-500" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <ChevronRight size={12} />
        <Link to={`/shop?dept=${dept.key}`} className="hover:text-brand-600">{dept.name}</Link>
        <ChevronRight size={12} />
        <Link to={`/shop?dept=${dept.key}&cat=${cat.key}`} className="hover:text-brand-600">{cat.name}</Link>
      </nav>

      <div className="grid gap-8 rounded-xl border border-steel-200 bg-white p-4 md:grid-cols-2 md:p-6">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <ProductImage product={product} iconSize={120} />
          {discount > 0 && (
            <span className="absolute left-3 top-3 rounded bg-accent-500 px-2 py-1 text-sm font-bold text-white">-{discount}%</span>
          )}
        </div>

        <div className="flex flex-col">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-600">{product.brand}</p>
          <h1 className="mt-1 text-2xl font-bold leading-tight text-steel-900 md:text-3xl">{product.name}</h1>
          <div className="mt-2"><Stars rating={product.rating} reviews={product.reviews} size={16} /></div>

          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-extrabold text-brand-800">{formatPKR(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="text-lg text-steel-400 line-through">{formatPKR(product.oldPrice)}</span>
                <span className="text-sm font-semibold text-emerald-600">
                  You save {formatPKR(product.oldPrice - product.price)}
                </span>
              </>
            )}
          </div>

          <p className={`mt-2 text-sm font-semibold ${inStock ? 'text-emerald-600' : 'text-accent-600'}`}>
            {inStock ? (product.stock < 10 ? `Only ${product.stock} left in stock` : 'In stock') : 'Out of stock'}
          </p>

          <p className="mt-4 text-steel-700">{product.description}</p>

          {inStock && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-md border border-steel-200">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2.5 hover:bg-steel-100">
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-semibold" aria-live="polite">{qty}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="p-2.5 hover:bg-steel-100">
                  <Plus size={16} />
                </button>
              </div>
              <button
                type="button"
                onClick={() => addToCart(product, qty)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-accent-500 px-6 py-3 font-semibold text-white hover:bg-accent-600 sm:flex-none"
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button
                type="button"
                onClick={() => { addToCart(product, qty); navigate('/cart') }}
                className="inline-flex flex-1 items-center justify-center rounded-md bg-brand-700 px-6 py-3 font-semibold text-white hover:bg-brand-800 sm:flex-none"
              >
                Buy now
              </button>
            </div>
          )}

          <ul className="mt-6 space-y-2 border-t border-steel-100 pt-5 text-sm text-steel-700">
            <li className="flex items-center gap-2"><Truck size={18} className="text-brand-600" /> Delivery in 2-4 working days across Pakistan</li>
            <li className="flex items-center gap-2"><ShieldCheck size={18} className="text-brand-600" /> 7-day return on unused items</li>
            <li className="flex items-center gap-2"><Check size={18} className="text-brand-600" /> Cash on delivery available</li>
          </ul>
        </div>
      </div>

      <section className="mt-6 rounded-xl border border-steel-200 bg-white p-4 md:p-6">
        <h2 className="font-display text-xl font-bold uppercase tracking-wide text-brand-900">Specifications</h2>
        <dl className="mt-3 divide-y divide-steel-100 text-sm">
          {Object.entries(product.specs || {}).map(([k, v]) => (
            <div key={k} className="grid grid-cols-[140px_1fr] gap-4 py-2.5 sm:grid-cols-[200px_1fr]">
              <dt className="text-steel-500">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 font-display text-2xl font-bold uppercase tracking-wide text-brand-900">
            <span className="mr-2 inline-block h-5 w-1.5 bg-accent-500 align-middle" />
            You may also need
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}
