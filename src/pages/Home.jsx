import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Headset, Car, Hammer } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { CATEGORY_ICONS, DEPARTMENT_ICONS } from '../components/categoryIcons'
import { DEPARTMENTS, products } from '../data/products'

const PERKS = [
  { icon: ShieldCheck, title: 'Genuine products', text: 'Sourced from trusted suppliers' },
  { icon: Truck, title: 'Nationwide delivery', text: 'Free over Rs 5,000' },
  { icon: RotateCcw, title: 'Easy returns', text: '7-day hassle-free returns' },
  { icon: Headset, title: 'Expert advice', text: 'Help choosing the right tool or part' },
]

export default function Home() {
  const popular = products.filter((p) => p.featured).slice(0, 8)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, #fff 0 2px, transparent 2px 22px)',
          }}
        />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <span className="inline-block rounded bg-accent-500 px-2 py-1 text-xs font-bold uppercase tracking-wider">
              Up to 20% off this week
            </span>
            <h1 className="mt-4 font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl">
              <span className="text-accent-500">Tools</span> for the job.
              <br />
              Parts for your car.
            </h1>
            <p className="mt-4 max-w-md text-brand-100">
              Pliers, wrenches, screwdrivers, tapes, adhesives and fasteners, plus brake pads, filters, batteries and
              lights for your car. Everything a DIYer or driver needs, in one shop.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {[
                { to: '/shop?dept=hardware', label: 'Shop Hardware & Tools', Icon: Hammer, cls: 'bg-accent-500 text-white hover:bg-accent-600' },
                { to: '/shop?dept=car', label: 'Shop Car Parts', Icon: Car, cls: 'bg-white text-brand-900 hover:bg-brand-50' },
              ].map(({ to, label, Icon, cls }) => (
                <Link
                  key={to}
                  to={to}
                  className={`group inline-flex items-center justify-between gap-4 rounded-md px-5 py-3.5 font-semibold shadow-lg shadow-black/20 transition ${cls}`}
                >
                  <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
                    <Icon size={20} strokeWidth={2} />
                    {label}
                  </span>
                  <ArrowRight size={18} className="shrink-0 transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden grid-cols-2 gap-4 md:grid">
            {DEPARTMENTS.map((d) => {
              const Icon = DEPARTMENT_ICONS[d.key]
              return (
                <Link
                  key={d.key}
                  to={`/shop?dept=${d.key}`}
                  className="group flex flex-col rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-white/10"
                >
                  <Icon size={44} strokeWidth={1.5} className="text-accent-500" />
                  <p className="mt-6 font-display text-2xl font-bold uppercase leading-tight">{d.name}</p>
                  <p className="mt-1 text-sm text-brand-200">
                    {products.filter((p) => p.department === d.key).length} products
                  </p>
                  <ArrowRight size={18} className="mt-auto pt-4 box-content transition group-hover:translate-x-1" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="border-b border-steel-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-5 lg:grid-cols-4">
          {PERKS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3">
              <Icon size={28} strokeWidth={1.6} className="shrink-0 text-brand-600" />
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-steel-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured categories */}
      <section className="mx-auto max-w-7xl px-4 pt-12">
        {DEPARTMENTS.map((d) => (
          <div key={d.key} className="mb-10">
            <div className="mb-4 flex items-end justify-between">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-brand-900">
                <span className="mr-2 inline-block h-5 w-1.5 bg-accent-500 align-middle" />
                {d.name}
              </h2>
              <Link to={`/shop?dept=${d.key}`} className="text-sm font-semibold text-brand-600 hover:underline">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {d.categories.map((c) => {
                const Icon = CATEGORY_ICONS[c.key]
                return (
                  <Link
                    key={c.key}
                    to={`/shop?dept=${d.key}&cat=${c.key}`}
                    className="group flex flex-col items-center gap-2 rounded-lg border border-steel-200 bg-white px-2 py-5 text-center transition hover:border-brand-500 hover:shadow-md"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
                      <Icon size={26} strokeWidth={1.6} />
                    </span>
                    <span className="text-xs font-semibold leading-tight sm:text-sm">{c.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Popular products */}
      <section className="mx-auto max-w-7xl px-4 pt-2">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-brand-900">
            <span className="mr-2 inline-block h-5 w-1.5 bg-accent-500 align-middle" />
            Popular products
          </h2>
          <Link to="/shop?sort=rating" className="text-sm font-semibold text-brand-600 hover:underline">
            See more
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {popular.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  )
}
