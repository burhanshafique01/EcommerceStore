import { Star } from 'lucide-react'

export default function Stars({ rating, reviews, size = 14 }) {
  return (
    <div className="flex items-center gap-1 text-xs text-steel-500">
      <div className="flex" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-steel-200 text-steel-200'}
          />
        ))}
      </div>
      {reviews != null && <span>({reviews})</span>}
    </div>
  )
}
