import { Link } from 'react-router-dom'
import { MapPin, Phone } from 'lucide-react'
import Logo from './Logo'
import { DEPARTMENTS } from '../data/products'

export default function Footer() {
  return (
    <footer className="mt-16 bg-brand-900 text-sm text-brand-100">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="dark" className="h-10 w-auto" />
          <p className="mt-3 max-w-xs text-brand-200">
            Dependable hardware and tools, plus genuine car parts and accessories, at fair prices, delivered across Pakistan.
          </p>
        </div>
        {DEPARTMENTS.map((d) => (
          <div key={d.key}>
            <h3 className="font-display text-base font-bold uppercase tracking-wide text-white">{d.name}</h3>
            <ul className="mt-3 space-y-1.5">
              {d.categories.map((c) => (
                <li key={c.key}>
                  <Link to={`/shop?dept=${d.key}&cat=${c.key}`} className="hover:text-white">{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="font-display text-base font-bold uppercase tracking-wide text-white">Contact</h3>
          <ul className="mt-3 space-y-2">
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> Shop address goes here</li>
            <li className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0" /> 0300-0000000</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-brand-200">
        © {new Date().getFullYear()} Faisal Hardware. All rights reserved.
      </div>
    </footer>
  )
}
