import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronRight, SlidersHorizontal, X, PackageSearch } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { DEPARTMENTS, products, getDepartment, formatPKR } from '../data/products'

const SORTS = [
  { key: 'relevance', label: 'Best match' },
  { key: 'price-asc', label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
  { key: 'rating', label: 'Top rated' },
  { key: 'discount', label: 'Biggest discount' },
]

const PRICE_PRESETS = [
  { label: 'Under Rs 1,000', min: '', max: '1000' },
  { label: 'Rs 1,000 to 5,000', min: '1000', max: '5000' },
  { label: 'Rs 5,000 to 20,000', min: '5000', max: '20000' },
  { label: 'Over Rs 20,000', min: '20000', max: '' },
]

const discountOf = (p) => (p.oldPrice ? 1 - p.price / p.oldPrice : 0)

function useFilters() {
  const [params, setParams] = useSearchParams()
  const f = {
    q: params.get('q') || '',
    dept: params.get('dept') || '',
    cats: (params.get('cat') || '').split(',').filter(Boolean),
    min: params.get('min') || '',
    max: params.get('max') || '',
    inStock: params.get('stock') === '1',
    sort: params.get('sort') || 'relevance',
  }
  const update = (patch) => {
    const next = new URLSearchParams(params)
    Object.entries(patch).forEach(([k, v]) => {
      if (v === '' || v == null || v === false || (Array.isArray(v) && !v.length)) next.delete(k)
      else next.set(k, Array.isArray(v) ? v.join(',') : v === true ? '1' : String(v))
    })
    setParams(next, { replace: true })
  }
  return [f, update, () => setParams({}, { replace: true })]
}

function FilterSidebar({ f, update, clear }) {
  const [min, setMin] = useState(f.min)
  const [max, setMax] = useState(f.max)
  useEffect(() => { setMin(f.min); setMax(f.max) }, [f.min, f.max])

  const visibleDepts = f.dept ? DEPARTMENTS.filter((d) => d.key === f.dept) : DEPARTMENTS
  const countFor = (cat) => products.filter((p) => p.category === cat).length

  const toggleCat = (key) =>
    update({ cat: f.cats.includes(key) ? f.cats.filter((c) => c !== key) : [...f.cats, key] })

  const setDept = (key) => {
    const dept = getDepartment(key)
    // keep only categories that belong to the chosen department
    const cats = dept ? f.cats.filter((c) => dept.categories.some((x) => x.key === c)) : f.cats
    update({ dept: key, cat: cats })
  }

  const section = 'border-b border-steel-200 px-4 py-4'
  const heading = 'mb-3 font-display text-sm font-bold uppercase tracking-wider text-brand-800'

  return (
    <div className="rounded-lg border border-steel-200 bg-white text-sm">
      <div className="flex items-center justify-between border-b border-steel-200 px-4 py-3">
        <span className="font-semibold">Filters</span>
        <button type="button" onClick={clear} className="text-xs font-semibold text-accent-600 hover:underline">
          Clear all
        </button>
      </div>

      <div className={section}>
        <h3 className={heading}>Department</h3>
        <div className="space-y-1.5">
          {[{ key: '', name: 'All departments' }, ...DEPARTMENTS].map((d) => (
            <label key={d.key || 'all'} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="dept"
                checked={f.dept === d.key}
                onChange={() => setDept(d.key)}
                className="accent-brand-600"
              />
              {d.name}
            </label>
          ))}
        </div>
      </div>

      {visibleDepts.map((d) => (
        <div key={d.key} className={section}>
          <h3 className={heading}>{d.name}</h3>
          <div className="space-y-1.5">
            {d.categories.map((c) => (
              <label key={c.key} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={f.cats.includes(c.key)}
                  onChange={() => toggleCat(c.key)}
                  className="h-4 w-4 accent-brand-600"
                />
                <span className="flex-1">{c.name}</span>
                <span className="text-xs text-steel-400">{countFor(c.key)}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className={section}>
        <h3 className={heading}>Price (PKR)</h3>
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            update({ min, max })
          }}
        >
          <input
            type="number" min="0" inputMode="numeric" placeholder="Min" value={min}
            onChange={(e) => setMin(e.target.value)}
            className="w-full min-w-0 rounded border border-steel-200 px-2 py-1.5 outline-none focus:border-brand-500"
            aria-label="Minimum price"
          />
          <span className="text-steel-400">to</span>
          <input
            type="number" min="0" inputMode="numeric" placeholder="Max" value={max}
            onChange={(e) => setMax(e.target.value)}
            className="w-full min-w-0 rounded border border-steel-200 px-2 py-1.5 outline-none focus:border-brand-500"
            aria-label="Maximum price"
          />
          <button type="submit" className="rounded bg-brand-700 px-3 py-1.5 font-semibold text-white hover:bg-brand-800">
            Go
          </button>
        </form>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {PRICE_PRESETS.map((p) => {
            const active = f.min === p.min && f.max === p.max
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => update(active ? { min: '', max: '' } : { min: p.min, max: p.max })}
                className={`rounded-full border px-2.5 py-1 text-xs ${
                  active ? 'border-brand-600 bg-brand-600 text-white' : 'border-steel-200 text-steel-700 hover:border-brand-500'
                }`}
              >
                {p.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="px-4 py-4">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={f.inStock}
            onChange={(e) => update({ stock: e.target.checked })}
            className="h-4 w-4 accent-brand-600"
          />
          In stock only
        </label>
      </div>
    </div>
  )
}

export default function Shop() {
  const [f, update, clear] = useFilters()
  const [drawer, setDrawer] = useState(false)

  const results = useMemo(() => {
    const q = f.q.toLowerCase()
    const min = f.min ? Number(f.min) : -Infinity
    const max = f.max ? Number(f.max) : Infinity
    const list = products.filter((p) => {
      if (f.dept && p.department !== f.dept) return false
      if (f.cats.length && !f.cats.includes(p.category)) return false
      if (p.price < min || p.price > max) return false
      if (f.inStock && !p.stock) return false
      if (q) {
        const hay = `${p.name} ${p.brand} ${p.category} ${p.description}`.toLowerCase()
        if (!q.split(/\s+/).every((w) => hay.includes(w))) return false
      }
      return true
    })
    const sorters = {
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
      discount: (a, b) => discountOf(b) - discountOf(a),
    }
    return sorters[f.sort] ? [...list].sort(sorters[f.sort]) : list
  }, [f.q, f.dept, f.cats.join(), f.min, f.max, f.inStock, f.sort])

  const dept = getDepartment(f.dept)
  const title = f.q ? `Results for “${f.q}”` : dept ? dept.name : 'All Products'

  const chips = [
    f.q && { label: `“${f.q}”`, clear: () => update({ q: '' }) },
    dept && { label: dept.short, clear: () => update({ dept: '' }) },
    ...f.cats.map((c) => {
      const cat = DEPARTMENTS.flatMap((d) => d.categories).find((x) => x.key === c)
      return cat && { label: cat.name, clear: () => update({ cat: f.cats.filter((x) => x !== c) }) }
    }),
    (f.min || f.max) && {
      label: `${f.min ? formatPKR(f.min) : 'Rs 0'} to ${f.max ? formatPKR(f.max) : 'any'}`,
      clear: () => update({ min: '', max: '' }),
    },
    f.inStock && { label: 'In stock', clear: () => update({ stock: false }) },
  ].filter(Boolean)

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <nav className="mb-3 flex items-center gap-1 text-xs text-steel-500" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <ChevronRight size={12} />
        <span className="text-steel-700">{dept ? dept.name : 'Shop'}</span>
      </nav>
      <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-brand-900">{title}</h1>

      <div className="mt-5 grid gap-6 md:grid-cols-[260px_1fr]">
        <aside className="hidden md:block">
          <div className="sticky top-36">
            <FilterSidebar f={f} update={update} clear={clear} />
          </div>
        </aside>

        <section>
          <div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg border border-steel-200 bg-white px-3 py-2.5">
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="inline-flex items-center gap-1.5 rounded-md border border-steel-200 px-3 py-1.5 text-sm font-semibold md:hidden"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
            <p className="text-sm text-steel-500">
              <span className="font-semibold text-steel-900">{results.length}</span> products
            </p>
            <label className="ml-auto flex items-center gap-2 text-sm">
              <span className="hidden text-steel-500 sm:inline">Sort by</span>
              <select
                value={f.sort}
                onChange={(e) => update({ sort: e.target.value === 'relevance' ? '' : e.target.value })}
                className="rounded-md border border-steel-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-500"
              >
                {SORTS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
              </select>
            </label>
          </div>

          {chips.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {chips.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={c.clear}
                  className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 hover:bg-brand-100"
                >
                  {c.label} <X size={12} />
                </button>
              ))}
            </div>
          )}

          {results.length ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-steel-200 bg-white px-6 py-16 text-center">
              <PackageSearch size={40} className="mx-auto text-steel-400" />
              <p className="mt-3 font-semibold">No products match these filters.</p>
              <button type="button" onClick={clear} className="mt-3 text-sm font-semibold text-accent-600 hover:underline">
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </div>

      {drawer && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-steel-900/50" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 right-0 flex w-80 max-w-[90%] flex-col bg-steel-50 shadow-xl">
            <div className="flex items-center justify-between border-b border-steel-200 bg-white px-4 py-3">
              <span className="font-semibold">Filter products</span>
              <button type="button" aria-label="Close filters" onClick={() => setDrawer(false)}><X size={22} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <FilterSidebar f={f} update={update} clear={clear} />
            </div>
            <div className="border-t border-steel-200 bg-white p-3">
              <button
                type="button"
                onClick={() => setDrawer(false)}
                className="w-full rounded-md bg-brand-700 py-2.5 font-semibold text-white"
              >
                Show {results.length} products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
