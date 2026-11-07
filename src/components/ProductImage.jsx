import { CATEGORY_ICONS } from './categoryIcons'

/** Shows product.image if set; otherwise a branded placeholder with the category icon. */
export default function ProductImage({ product, className = '', iconSize = 56, showBrand = true }) {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }
  const Icon = CATEGORY_ICONS[product.category]
  const isCar = product.department === 'car'
  return (
    <div
      role="img"
      aria-label={product.name}
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${
        isCar ? 'bg-gradient-to-br from-brand-50 to-brand-100' : 'bg-gradient-to-br from-steel-100 to-steel-200'
      } ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(#10274e 1px, transparent 1px), linear-gradient(90deg, #10274e 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />
      {Icon && (
        <Icon
          size={iconSize}
          strokeWidth={1.4}
          className={isCar ? 'relative text-brand-600' : 'relative text-steel-700'}
        />
      )}
      {showBrand && (
        <span className="absolute bottom-2 right-3 font-display text-xs font-bold uppercase tracking-widest text-steel-400">
          {product.brand}
        </span>
      )}
    </div>
  )
}
