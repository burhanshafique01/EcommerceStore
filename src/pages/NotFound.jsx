import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <Logo iconOnly className="mx-auto h-16 w-16" />
      <h1 className="mt-4 font-display text-3xl font-bold uppercase text-brand-900">Page not found</h1>
      <p className="mt-2 text-steel-500">That page or product doesn’t exist (anymore).</p>
      <Link to="/shop" className="mt-6 inline-block rounded-md bg-accent-500 px-6 py-3 font-semibold text-white hover:bg-accent-600">
        Browse products
      </Link>
    </div>
  )
}
