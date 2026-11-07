import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import ProductImage from './ProductImage'
import Stars from './Stars'
import { formatPKR } from '../data/products'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0
  const outOfStock = !product.stock

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-steel-200 bg-white transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg">
      <Link to={`/product/${product.slug}`} className="relative block aspect-square">
        <ProductImage product={product} iconSize={52} />
        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded bg-accent-500 px-1.5 py-0.5 text-[11px] font-bold text-white">
            -{discount}%
          </span>
        )}
        {outOfStock && (
          <span className="absolute right-2 top-2 rounded bg-steel-900/80 px-1.5 py-0.5 text-[11px] font-semibold text-white">
            Out of stock
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <Link
          to={`/product/${product.slug}`}
          className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-5 text-steel-900 hover:text-brand-600"
        >
          {product.name}
        </Link>
        <Stars rating={product.rating} reviews={product.reviews} size={12} />
        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-1">
          <span className="text-base font-bold text-brand-800">{formatPKR(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-steel-400 line-through">{formatPKR(product.oldPrice)}</span>
          )}
        </div>
        <button
          type="button"
          disabled={outOfStock}
          onClick={() => addToCart(product)}
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-md bg-accent-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-accent-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-steel-200 disabled:text-steel-500"
        >
          <ShoppingCart size={16} />
          {outOfStock ? 'Sold out' : 'Add to Cart'}
        </button>
      </div>
    </article>
  )
}
